// ---------------- Round1 Pet counter ----------------
const buttons = document.querySelectorAll('.pet-btn');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const span = btn.nextElementSibling.querySelector('span');
        let num = Number(span.textContent);
        span.textContent = num + 1;
    })
})

const timeEl = document.getElementById('footer-time');
function updateTime() {
    timeEl.textContent = "Page loaded at: " + new Date().toLocaleString();
}
updateTime();

// ---------------- Round2 & Round3 宠物逻辑 + localStorage ----------------
const breedSelect = document.getElementById("breedSelect");
const dogNameInput = document.getElementById("dogNameInput");
const nameError = document.getElementById("nameError");
const adoptBtn = document.getElementById("adoptBtn");
const dogStatusPanel = document.getElementById("dogStatusPanel");

const showDogName = document.getElementById("showDogName");
const showBreed = document.getElementById("showBreed");
const showDay = document.getElementById("showDay");
const showStage = document.getElementById("showStage");
const showHappiness = document.getElementById("showHappiness");

const feedBtn = document.getElementById("feedBtn");
const playBtn = document.getElementById("playBtn");
const nextDayBtn = document.getElementById("nextDayBtn");
const resetBtn = document.getElementById("resetBtn");

let pet = null;

//成长阶段
function getGrowthStage(day){
    if(day === 1) return "Puppy";
    if(day ===2 || day ===3) return "Young Dog";
    return "Adult Dog";
}

//渲染UI并保存本地
function renderPet(){
    showDogName.textContent = pet.name;
    showBreed.textContent = pet.breed;
    showDay.textContent = pet.day;
    showStage.textContent = getGrowthStage(pet.day);
    showHappiness.textContent = pet.happiness;
    localStorage.setItem("savedPet", JSON.stringify(pet));
}

//读取本地存储
function loadPetFromStorage(){
    const saved = localStorage.getItem("savedPet");
    if(saved){
        try{
            pet = JSON.parse(saved);
            dogStatusPanel.hidden = false;
            renderPet();
        }catch(e){
            localStorage.removeItem("savedPet");
        }
    }
}

//领养按钮
adoptBtn.addEventListener("click", ()=>{
    nameError.textContent = "";
    const rawName = dogNameInput.value;
    const cleanName = rawName.trim();

    if(cleanName.length === 0){
        nameError.textContent = "Error: Dog name cannot be empty or only spaces!";
        return;
    }
    if(cleanName.length>20){
        nameError.textContent = "Name cannot exceed 20 characters.";
        return;
    }

    pet = {
        name: cleanName,
        breed: breedSelect.value,
        day: 1,
        happiness:50
    };
    renderPet();
    dogStatusPanel.hidden = false;
    dogNameInput.value = "";
})

//喂食
feedBtn.addEventListener("click", ()=>{
    if(!pet) return;
    pet.happiness = Math.min(100, pet.happiness + 10);
    renderPet();
})

//玩耍
playBtn.addEventListener("click", ()=>{
    if(!pet) return;
    pet.happiness = Math.min(100, pet.happiness + 10);
    renderPet();
})

//下一天：天数+1，快乐减10，最低0
nextDayBtn.addEventListener("click", ()=>{
    if(!pet) return;
    pet.day += 1;
    pet.happiness = Math.max(0, pet.happiness - 10);
    renderPet();
})

//重置，回到领养
resetBtn.addEventListener("click", ()=>{
    pet = null;
    localStorage.removeItem("savedPet");
    dogStatusPanel.hidden = true;
})

//页面加载读取宠物
loadPetFromStorage();
