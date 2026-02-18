// ============ Theme Toggle ============
const themeBtns = document.querySelectorAll('#theme-toggle');
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}

// ============ Back Button ============
const backBtn = document.getElementById('back-btn');
backBtn.addEventListener('click', () => {
    window.history.back();
});

// ============ Floating Bubbles ============
const floatingBg = document.querySelector('.floating-bg');
for (let i = 0; i < 30; i++) {
    const span = document.createElement('span');
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = (5 + Math.random() * 10) + "s";
    span.style.width = span.style.height = (8 + Math.random() * 12) + "px";
    floatingBg.appendChild(span);
}