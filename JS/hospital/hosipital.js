const hospitalLoad = document.getElementById('loadHospital');
const hospitalContainer = document.getElementById('hospitalContainer');
let hospitals = JSON.parse(localStorage.getItem('hospital'));



function randerhospital(){
    
    hospitalContainer.innerHTML = "병원 현황"
    
    if(!hospitals) return;

    hospitals.sort((a,b) => {
        if(Number(a.distance) !== (b.distance)){
            return Number(a.distance) - Number(b.distance);
        }
        return Number(b.bed) - Number(a.bed);
    });






    hospitals.forEach(hos=>{
        const hosDiv = document.createElement('div');
    
    hosDiv.innerHTML = `
    병원 id ${hos.id} 
    병원이름 ${hos.name} 
    거리 ${hos.distance} 
    <span class='bed-count'> 병상수 ${hos.bed} </span>

    <button class='edit-btn hidden' data-id='${hos.id}' data-type='plus'>+</button>

    <button class='edit-btn hidden' data-id='${hos.id}' data-type='minus'>-</button>`;
    
    if(Number(hos.bed) == 0){
                hosDiv.classList.add('red');
    };

    hospitalContainer.appendChild(hosDiv);
    });
    hospitalEvent();
};

function hospitalEvent(){
const editBtn = document.querySelectorAll('.edit-btn');

editBtn.forEach(btn => {
        btn.classList.toggle('hidden');
    });
editBtn.forEach(btn => {
        btn.addEventListener('click',() => {
        
        const hospitalID = btn.dataset.id;
        const btnType = btn.dataset.type;
        

        const targetHospital = hospitals.find(
            hos => hos.id === hospitalID
            );
            if(btnType==="plus"){
                targetHospital.bed++;
            };
            if(btnType==="minus" && targetHospital.bed !==0){
                targetHospital.bed--;
            };
            
            localStorage.setItem('hospital',JSON.stringify(hospitals));
            randerhospital();
        })
})};



hospitalLoad.addEventListener("click",randerhospital);

