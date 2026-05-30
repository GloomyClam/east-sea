require('dotenv').config();

const xml2js = require('xml2js');
const express = require('express');
const cors = require('cors'); // 브라우저 주소가 다른 상황에서 서버가 보안이슈를 막아주는 코드

const app = express();



app.use(cors());  //보안이슈를 막아주는 도구를 사용함
app.use(express.json());  //?ㄴ

let users = [
    { id:'admin1', pw:'1234', role:'admin'},
    { id:'admin2', pw:'2345', role:'admin'},
    { id:'admin3', pw:'3456', role:'admin'}
];

// 유저 목록 보내기
app.get('/users', (req,res) => {
    res.json(users);
});
//로그인
app.post('/login', (req,res) => {
    const { id, pw} =req.body;

    const findUser = users.find(user => user.id ===id );

    if (!findUser){
        return res.status(404).json({
            success: false,
            message: '존재하지 않는 아이디 입니다'
        });
    }

    if (findUser.pw !== pw){
        return res.status(401).json({
            success: false,
            message: '비밀번호가 일치하지 않습니다'
        });
    }
    res.json({
        success: true,
        message: '로그인 성공',
        user: {
            id: findUser.id,
            role: findUser.role
        }
    });
});

//회원가입
app.post('/signup', (req,res) => {
    const { id,pw } = req.body;

    const exist = users.find(user => user.id === id);

    if (exist) {
        return res.status(409).json({
            success: false,
            message: '이미등록된 아이디 입니다'
        });
    }
    const newUser = {
        id,
        pw,
        role: 'user'
    };

    users.push(newUser);

    res.json({
        success: true,
        message:'가입 성공',
        user: {
            id: newUser.id,
            role: newUser.role
        }
    });
});

app.get('/api/emergency-beds', async (req, res) => {
    try {
        const serviceKey = process.env.EMERGENCY_API_KEY;

        const url =
            `http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEmrrmRltmUsefulSckbdInfoInqire` +
            `?serviceKey=${serviceKey}` +
            `&STAGE1=${encodeURIComponent('부산광역시')}` +
            `&STAGE2=${encodeURIComponent('수영구')}` +
            `&pageNo=1` +
            `&numOfRows=10`;

        const response = await fetch(url);

        // 1. XML을 문자열로 받기
        const xmlText = await response.text();

        // 2. XML 문자열을 JS 객체로 변환
        const result = await xml2js.parseStringPromise(xmlText, {
            explicitArray: false
        });

        // 3. 실제 병원 목록 꺼내기
        const items = result.response.body.items.item;

        // 4. 병원이 하나만 올 때도 배열로 맞춰주기
        const hospitalList = Array.isArray(items) ? items : [items];

        // 5. 필요한 데이터만 정리하기
        const cleanedData = hospitalList.map(hospital => {
            return {
                hospitalName: hospital.dutyName,
                hospitalCode: hospital.hpid,
                phone: hospital.dutyTel3,
                emergencyBeds: hospital.hvec,
                operationRoom: hospital.hvoc,
                ventilator: hospital.hvventiayn,
                ct: hospital.hvctayn,
                mri: hospital.hvmriayn,
                updatedAt: hospital.hvidate
            };
        });

        // 6. 프론트에서 쓰기 좋게 JSON으로 보내기
        res.json({
            success: true,
            count: cleanedData.length,
            hospitals: cleanedData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: '응급실 정보를 불러오지 못했습니다.'
        });
    }
});

app.listen(3000, () =>{
    console.log('서버실행중:http://localhost:3000 ');
});