const removeUserBT = document.getElementById('removeUserBT');
const UserLogin = document.getElementById('beforelogin');
const UserID = document.getElementById('userID');
const UserPW = document.getElementById('userPW');
const checklogin = document.getElementById('logincheck');
const errormsg = document.getElementById('errmsg');
const logOut = document.getElementById('LogoutBT');

const userList = document.getElementById('userList');
const adminMenu = document.getElementById('adminMenu');

const loadUser = document.getElementById('loadUser');
const usercontainer = document.getElementById('usercontainer');


async function UserLoginEvent(event){
    event.preventDefault()
    
    errormsg.textContent = "";
    checklogin.textContent="";

    const id = UserID.value;
    const pw = UserPW.value;
    
    if(id === '' ||pw === ''){
        errormsg.textContent = "아이디와 비번을 입력하세요";
        setTimeout(clearmsg,3000);
        return;       
    }
    try {
        const response = await fetch('http://localhost:3000/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, pw})
        });

        const data = await response.json();

        if(!data.success){
            checklogin.textContent = data.message;
            setTimeout(clearmsg, 3000);
            return;
        }

        UserLogin.classList.add("hidden");
        logOut.classList.remove("hidden");

        localStorage.setItem("user", data.user.id);
        localStorage.setItem("role", data.user.role);

        checklogin.textContent = `환영합니다. ${data.user.role} ${data.user.id}님`;

        if (data.user.role === "admin"){
            adminMenu.classList.remove("hidden");
        }

        UserID.value = "";
        UserPW.value = "";
    } catch (error) {
        checklogin.textContent ="서버연결실패";
        console.log(error);
    }


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
UserLogin.addEventListener("submit", UserLoginEvent);
logOut.addEventListener("click", UserLogOutEvent);
registerBTOpen.addEventListener("click", registerOpen);