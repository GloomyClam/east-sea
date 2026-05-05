const admin = [
    {id: 'admin1',pw: '1234'},
    {id: 'admin2',pw: '2345'},
    {id: 'admin3',pw: '3456'}
];

if(!localStorage.getItem("users")){
    localStorage.setItem("users",JSON.stringify(admin));
};

let users = JSON.parse(localStorage.getItem('users'))||admin;// 유저라는 공간을 할당해서 아이디 목록을 가져온다 만약 없다면 어드민 배열을 집어넣는다


function getUsers(){
   return JSON.parse(localStorage.getItem('users'));
}