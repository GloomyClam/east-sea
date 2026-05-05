


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

function randerUser(){
    let currentUsers = getUsers();
    
    userList.innerHTML="";
    currentUsers.forEach(user => {
        const userDiv = document.createElement('div')
        
        if(isAdmin(user.id)){
            userDiv.innerHTML = `<span>${user.id} (관리자)</span>`;
        }
        else{
            userDiv.innerHTML = `<span>${user.id}</span> <button onclick="removeUser('${user.id}')" >삭제</button>`;
            
        }
        userList.appendChild(userDiv);
    });
}

randerUser();


