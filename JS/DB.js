

const hospitalList = [
    {id:"h1", name:"온종합병원", bed:5, distance:1.2 },
    {id:"h2", name:"부산의료원", bed:0, distance:0.9},
    {id:"h3", name:"부산대병원", bed:10, distance:3.7},
];

function initDB(){
    if(!localStorage.getItem("hospital")){
    localStorage.setItem("hospital",JSON.stringify(hospitalList))
    };
    
}
initDB();

function getHospitals(){ return JSON.parse(localStorage.getItem('hospital'));}
