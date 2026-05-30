async function connectServer(){
    const response = await fetch("http://localhost:3000/users");

    const data = await response.json();

    console.log(data);
}

connectServer();


if(localStorage.getItem("user")){
    const role = localStorage.getItem("role");
    const Username = localStorage.getItem("user");
    checklogin.textContent=`환영합니다.${role} ${Username}님`;
    UserLogin.classList.add("hidden");
    logOut.classList.remove("hidden");
    if(role === "admin"){
            adminMenu.classList.remove("hidden");
        }

}

const res =await fetch('http://localhost:3000/api/emergency-beds');
const data = await res.text();

console.log(data);

// function randerUser(){
//     let currentUsers = getUsers();
    
//     userList.innerHTML="";
//     currentUsers.forEach(user => {
//         const userDiv = document.createElement('div')
        
//         if(user.role === "admin"){
//             userDiv.innerHTML = `<span>${user.id} (관리자)</span>`;
//         }
//         else{
//             userDiv.innerHTML = `<span>${user.id}</span> <button onclick="removeUser('${user.id}')" >삭제</button>`;
            
//         }
//         userList.appendChild(userDiv);
//     });
// }



//randerUser();

