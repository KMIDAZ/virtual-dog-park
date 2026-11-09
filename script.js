// 抚摸计数
const buttons = document.querySelectorAll('.pet-btn');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const span = btn.nextElementSibling.querySelector('span');
        let num = Number(span.textContent);
        span.textContent = num + 1;
    })
})

// 页脚当前时间
const timeEl = document.getElementById('footer-time');
function updateTime() {
    timeEl.textContent = "Page loaded at: " + new Date().toLocaleString();
}
updateTime();
