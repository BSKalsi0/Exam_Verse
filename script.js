// ==============================
// MODAL FUNCTIONS (INDEX PAGE)
// ==============================

function openQuizModal() {
    const modal = document.getElementById("quizModal");
    if (modal) modal.style.display = "flex";
}

function closeQuizModal() {
    const modal = document.getElementById("quizModal");
    if (modal) modal.style.display = "none";
}

function startQuiz() {
    const name = document.getElementById("playerName").value.trim();
    const subject = document.getElementById("quizSubject").value;

    if (name === "") {
        alert("Please enter your name");
        return;
    }

    localStorage.setItem("quizPlayer", name);
    localStorage.setItem("quizSubject", subject);

    window.location.href = "quiz.html";
}

document.addEventListener("DOMContentLoaded", function() {

    const toggleBtn = document.getElementById("theme-toggle");
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll("#nav-menu a");
    const sections = document.querySelectorAll(".reveal");
    const resourceCard = document.querySelector(".highlight-card");
    const cards = document.querySelectorAll(".subject-card");

    /* ================= THEME LOAD ================= */

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        if (toggleBtn) toggleBtn.textContent = "☀️";
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", function() {

            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                toggleBtn.textContent = "☀️";
                localStorage.setItem("theme", "dark");
            } else {
                toggleBtn.textContent = "🌙";
                localStorage.setItem("theme", "light");
            }

        });
    }

    /* ================= HAMBURGER ================= */

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", function() {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Auto close menu on link click (mobile UX fix)
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    /* ================= SMOOTH SCROLL ================= */

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    /* ================= REVEAL ON SCROLL ================= */

    function revealOnScroll() {
        sections.forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                section.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    /* ================= AUTO RESOURCE LOADER ================= */

    if (resourceCard) {
        resourceCard.addEventListener("click", function() {
            resourceCard.innerHTML = `
                <h2>Resources Loaded ✅</h2>
                <p>Maths Notes • Science PDFs • English Guide • Sample Papers</p>
            `;
        });
    }

    /* ================= MOBILE TAP FIX (NO LAG) ================= */

    cards.forEach(card => {

        // Touch devices
        card.addEventListener("touchstart", () => {
            card.style.transform = "scale(0.97)";
        }, { passive: true });

        card.addEventListener("touchend", () => {
            card.style.transform = "scale(1)";
        });

    });

    // ALWAYS VISIBLE Floating Background
    const floatingBg = document.querySelector(".floating-bg");

    for (let i = 0; i < 20; i++) { // more bubbles
        const circle = document.createElement("span");

        const size = Math.random() * 25 + 15; // 15px–40px
        circle.style.width = size + "px";
        circle.style.height = size + "px";

        circle.style.top = Math.random() * 100 + "%"; // RANDOM START POSITION
        circle.style.left = Math.random() * 100 + "%";

        circle.style.animationDuration = (Math.random() * 5 + 6) + "s"; // faster
        circle.style.animationDelay = Math.random() * 5 + "s";

        floatingBg.appendChild(circle);
    }


});