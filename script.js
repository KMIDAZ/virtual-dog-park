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

// ---------------- Round2 & Round3 ----------------
const breedSelect = document.getElementById("breedSelect");
const dogNameInput = document.getElementById("dogNameInput");
const nameError = document.getElementById("nameError");
const adoptBtn = document.getElementById("adoptBtn");
const dogStatusPanel = document.getElementById("dogStatusPanel");
const adoptFormWrap = document.querySelector(".adopt-form");

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
const STORAGE_KEY = "savedPet";

//成长阶段
function getGrowthStage(day){
    if(day === 1) return "Puppy";
    if(day ===2 || day ===3) return "Young Dog";
    return "Adult Dog";
}

//渲染UI
function renderPet(){
    showDogName.textContent = pet.name;
    showBreed.textContent = pet.breed;
    showDay.textContent = pet.day;
    showStage.textContent = getGrowthStage(pet.day);
    showHappiness.textContent = pet.happiness;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pet));
}

//根据是否有宠物控制页面区块显示隐藏
function refreshPageState(){
    if(pet){
        adoptFormWrap.style.display = "none";
        dogStatusPanel.hidden = false;
        renderPet();
    }else{
        adoptFormWrap.style.display = "flex";
        dogStatusPanel.hidden = true;
        nameError.textContent = "";
    }
}

//读取本地存储
function loadPetFromStorage(){
    const saved = localStorage.getItem(STORAGE_KEY);
    if(saved){
        try{
            pet = JSON.parse(saved);
        }catch(e){
            localStorage.removeItem(STORAGE_KEY);
            pet = null;
        }
    }
    refreshPageState();
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
    dogNameInput.value = "";
    refreshPageState();
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

//下一天
nextDayBtn.addEventListener("click", ()=>{
    if(!pet) return;
    pet.day += 1;
    pet.happiness = Math.max(0, pet.happiness - 10);
    renderPet();
})

//重置，带confirm确认弹窗（作业要求）
resetBtn.addEventListener("click", ()=>{
    const ok = confirm("Are you sure you want to start over? All progress will be lost.");
    if(!ok) return;
    pet = null;
    localStorage.removeItem(STORAGE_KEY);
    refreshPageState();
})

//DOM加载完毕初始化
document.addEventListener("DOMContentLoaded",()=>{
    updateTime();
    loadPetFromStorage();
})
