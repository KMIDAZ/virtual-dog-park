let petData = JSON.parse(localStorage.getItem('pet')) || {
  name: '小狗',
  day: 1,
  hunger: 80,
  happy: 80,
  growth: 0
};

// 更新页面显示
function render() {
  document.getElementById('dayText').innerText = `第 ${petData.day} 天`;
  document.getElementById('hungerText').innerText = `饥饿值：${petData.hunger}`;
  document.getElementById('happyText').innerText = `开心值：${petData.happy}`;
  document.getElementById('growthText').innerText = `成长度：${petData.growth}%`;
  localStorage.setItem('pet', JSON.stringify(petData));
}

// 下一天
function nextDay() {
  petData.day += 1;
  petData.hunger = Math.max(0, petData.hunger - 15);
  petData.happy = Math.max(0, petData.happy - 10);
  if(petData.hunger > 20 && petData.happy > 20) {
    petData.growth = Math.min(100, petData.growth + 10);
  }
  render();
}

// 重置
function resetPet() {
  petData = {
    name: '小狗',
    day: 1,
    hunger: 80,
    happy: 80,
    growth: 0
  };
  render();
}

// 绑定按钮
document.getElementById('nextDayBtn').addEventListener('click', nextDay);
document.getElementById('resetBtn').addEventListener('click', resetPet);

// 初始化渲染
render();