const registermain = document.getElementById('registeruser');
const registerID = document.getElementById('registeruserID');
const registerPW = document.getElementById('registeruserPW');
const registercheck = document.getElementById('registercheck');
const registerBTOpen = document.getElementById('registerBTOpen');
const registerBT = document.getElementById('registerBT');

async function register(event){
    event.preventDefault();
    
    const id = registerID.value;
    const pw = registerPW.value;

if( id === '' || pw === ''){
    registercheck.textContent="아이디와 패스워드를 입력하세요";
    setTimeout(clearmsg,3000);
    return;
} 

try{
    const response = await fetch('http://localhost:3000/signup',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        }, 
        body:JSON.stringify({id,pw})
    });
    const data = await response.json();

    if(!data.success){
        registercheck.textContent = data.message;
        setTimeout(clearmsg,3000);
        return;
    }
    registercheck.textContent= data.message;
    UserLogin.classList.remove("hidden");
    registermain.classList.add("hidden");
    registerBT.classList.add("hidden");
    registerBTOpen.classList.remove("hidden");

    registerID.value="";
    registerPW.value="";
} catch (error){
    registercheck .textContent = "서버 연결 실패";
    console.log(error);
}}

registerBT.addEventListener("click",register);