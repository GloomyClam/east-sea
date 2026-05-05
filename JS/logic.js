const removeUserBT = document.getElementById('removeUserBT');
const UserLogin = document.getElementById('beforelogin');
const UserID = document.getElementById('userID');
const UserPW = document.getElementById('userPW');
const checklogin = document.getElementById('logincheck');
const errormsg = document.getElementById('errmsg');
const logOut = document.getElementById('LogoutBT');
const registermain = document.getElementById('registeruser');
const registerID = document.getElementById('registeruserID');
const registerPW = document.getElementById('registeruserPW');
const registercheck = document.getElementById('registercheck');
const registerBTOpen = document.getElementById('registerBTOpen');
const registerBT = document.getElementById('registerBT');
const userList = document.getElementById('userList');
const adminMenu = document.getElementById('adminMenu');

const loadUser = document.getElementById('loadUser');
const usercontainer = document.getElementById('usercontainer');

function UserLoginEvent(event){
    event.preventDefault()
    
    const currentUsers = getUsers();
    errormsg.textContent = "";
    checklogin.textContent="";

    const finduser = currentUsers.find(users => users.id === UserID.value );

    if(UserID.value === '' ||UserPW.value === ''){
        errormsg.textContent = "아이디 비번";
        setTimeout(clearmsg,3000);
        return;       
    }


    if(!finduser){
        checklogin.textContent="존재하지 않는 아이디입니다";
    }
    else if(finduser.pw !== UserPW.value){
        checklogin.textContent="비밀번호가 틀렸습니다 다시 확인하세요";
    }
    else if(finduser.pw === UserPW.value){
        UserLogin.classList.add("hidden");
        logOut.classList.remove("hidden");

        localStorage.setItem("user",UserID.value);
        const userRole = getRole(UserID.value);
        localStorage.setItem("role",userRole);

        checklogin.textContent=`환영합니다.${userRole} ${UserID.value}님`;
        if(userRole === "admin"){
            adminMenu.classList.remove("hidden");
        }
    }
        setTimeout(clearmsg,3000);

    

    
    UserID.value="";
    UserPW.value="";
    

};

function UserLogOutEvent(){
    localStorage.removeItem("user");
    checklogin.textContent="로그아웃됨"

    setTimeout(clearmsg,3000);
    UserLogin.classList.remove("hidden")
    logOut.classList.add("hidden");
    adminMenu.classList.add("hidden");
    localStorage.removeItem("role");
}

function clearmsg(){
    errormsg.textContent = "";
    checklogin.textContent="";
    registercheck.textContent="";
}
function registerOpen(event){
    event.preventDefault();
    UserLogin.classList.add("hidden");
    registermain.classList.remove("hidden");
    registerBT.classList.remove("hidden");
    registerBTOpen.classList.add("hidden");


}

function register(event){
    event.preventDefault();
    
    const IDvalue = registerID.value;
    const PWvalue = registerPW.value;

if( IDvalue === '' || PWvalue === ''){
    registercheck.textContent="아이디와 패스워드를 입력하세요";
    setTimeout(clearmsg,3000);
    return;
} 

const currentUsers = getUsers();
const exist = currentUsers.find(users => users.id === IDvalue );

if(exist){
    registercheck.textContent="이미 등록된 아이디 입니다";
    setTimeout(clearmsg,3000);

}else{
    const newUser = {id: IDvalue, pw: PWvalue};
    currentUsers.push(newUser);

    localStorage.setItem('users',JSON.stringify(currentUsers));

    registercheck.textContent='가입성공';
    randerUser();

    setTimeout(clearmsg,3000);


    UserLogin.classList.remove("hidden");
    registermain.classList.add("hidden");
    registerBT.classList.add("hidden");
    registerBTOpen.classList.remove("hidden");

    registerID.value="";
    registerPW.value="";
}};

function isAdmin(Targetid){ // 어드민 아이디만 리스트로 추려서 놔둔다
    const adminID = 'admin';
    return admin.some(a => a.id === Targetid);
    }

function removeUser(Targetid){    
    let currentUsers = getUsers();

    
    if(isAdmin(Targetid)){
    alert("어드민 계정은 삭제할 수 없습니다");
    return;
    }

    if(confirm('정말로 삭제 하시겠습니까')){
    const updateUsers = currentUsers.filter(user => user.id !=Targetid );
    localStorage.setItem('users',JSON.stringify(updateUsers));
    randerUser()};
};

// 권한

    function getRole(UserID){
        if(isAdmin(UserID)){
        return "admin";    
        }
    return "user";    
    }

    async function userload(){
        try{
            const Response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await Response.json();

            usercontainer.innerHTML="";

            const loadUsers = data.map(user => ({
            username: user.name,
            useremail: user.email
        }));
            loadUsers.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.innerHTML = `이름 ${user.username} 이메일 ${user.useremail}`
                usercontainer.appendChild(userDiv);
            });
        } catch(error){
            usercontainer.innerHTML = "데이터 불러오기 실패,";
            console.log(error);
        }
    }

loadUser.addEventListener('click',userload);
registerBTOpen.addEventListener('click',registerOpen);
registerBT.addEventListener('click',register);
logOut.addEventListener('click',UserLogOutEvent);
UserLogin.addEventListener('submit',UserLoginEvent);