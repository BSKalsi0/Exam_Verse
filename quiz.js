// ==============================
// CUSTOM ATTEMPT MODAL FUNCTIONS
// ==============================

let allowQuizStart = false;

function openAttemptModal(message, redirect = false) {
    const modal = document.getElementById("attemptModal");
    const cardText = modal.querySelector("p");

    if (modal && cardText) {
        cardText.innerHTML = message;
        modal.classList.add("active");
    }

    if (redirect) {
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
    }
}

function closeAttemptModal() {
    const modal = document.getElementById("attemptModal");
    if (modal) modal.classList.remove("active");

    allowQuizStart = true;

    // Trigger quiz loading after user clicks button
    if (typeof startQuizAfterModal === "function") {
        startQuizAfterModal();
    }
}


// // ==============================
// // MODAL FUNCTIONS (INDEX PAGE)
// // ==============================

// function openQuizModal() {
//     const modal = document.getElementById("quizModal");
//     if (modal) modal.style.display = "flex";
// }

// function closeQuizModal() {
//     const modal = document.getElementById("quizModal");
//     if (modal) modal.style.display = "none";
// }

// function startQuiz() {
//     const name = document.getElementById("playerName").value.trim();
//     const subject = document.getElementById("quizSubject").value;

//     if (name === "") {
//         alert("Please enter your name");
//         return;
//     }

//     localStorage.setItem("quizPlayer", name);
//     localStorage.setItem("quizSubject", subject);

//     window.location.href = "quiz.html";
// }


// ==============================
// QUIZ PAGE LOGIC
// ==============================

if (window.location.pathname.includes("quiz.html")) {

    const playerName = localStorage.getItem("quizPlayer");
    const selectedSubject = localStorage.getItem("quizSubject");

    if (!playerName || !selectedSubject) {
        window.location.href = "index.html";
    }

    function getCurrentWeek() {
        const now = new Date();
        const oneJan = new Date(now.getFullYear(), 0, 1);
        const numberOfDays = Math.floor((now - oneJan) / (24 * 60 * 60 * 1000));
        return Math.ceil((now.getDay() + 1 + numberOfDays) / 7);
    }

    const currentWeek = getCurrentWeek();
    const currentYear = new Date().getFullYear();

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    let weeklyAttempts = leaderboard.filter(entry =>
        entry.name === playerName &&
        entry.subject === selectedSubject &&
        entry.week === currentWeek &&
        entry.year === currentYear
    );

    // 🔥 ATTEMPT CHECK
    if (weeklyAttempts.length >= 2) {

        openAttemptModal(
            "❌ You already used your <b>2 attempts</b> this week.<br><br>⚠ Aap is week ke 2 attempts use kar chuke ho.<br><br>Next week try karna 💪",
            true
        );

    } else {

        openAttemptModal(
            "⚠ You have only <b>2 attempts</b> per subject per week.<br><br>⚠ Aapko har subject me week me sirf <b>2 chances</b> milenge.<br><br>🏆 Top 3 players ko milega Secret Surprise!"
        );

        // Quiz will load only after modal button click
        window.startQuizAfterModal = function() {

            if (!allowQuizStart) return;

            const script = document.createElement("script");
            script.src = selectedSubject + ".js";
            document.head.appendChild(script);

            script.onload = function() {

                const playerInfo = document.getElementById("playerInfo");
                const scoreDisplay = document.getElementById("scoreDisplay");
                const questionEl = document.getElementById("question");
                const optionsEl = document.getElementById("options");
                const resultEl = document.getElementById("result");

                if (playerInfo) {
                    playerInfo.innerText = "👤 " + playerName + " | 📘 " + selectedSubject.toUpperCase();
                }

                let score = 0;
                let current = 0;
                let answered = false;

                let questions = window[selectedSubject + "Questions"] || [];

                if (!questions || questions.length === 0) {
                    questionEl.innerText = "⚠ No Questions Found!";
                    optionsEl.innerHTML = "";
                    return;
                }

                function loadQuestion() {

                    if (current >= questions.length) {
                        finishQuiz();
                        return;
                    }

                    answered = false;

                    let q = questions[current];
                    questionEl.innerText = q.q;

                    let optionsHTML = "";

                    q.options.forEach(opt => {
                        optionsHTML += `<button onclick="checkAnswer('${opt}')">${opt}</button>`;
                    });

                    optionsEl.innerHTML = optionsHTML;
                }

                window.checkAnswer = function(selected) {

                    if (answered) return;
                    answered = true;

                    let buttons = document.querySelectorAll("#options button");

                    buttons.forEach(btn => {

                        if (btn.innerText === questions[current].ans) {
                            btn.classList.add("correct");
                        }

                        if (btn.innerText === selected && selected !== questions[current].ans) {
                            btn.classList.add("wrong");
                        }
                    });

                    if (selected === questions[current].ans) {
                        score++;
                    }

                    scoreDisplay.innerText = "Score: " + score;
                }

                window.nextQuestion = function() {
                    current++;
                    loadQuestion();
                }

                function finishQuiz() {

                    let percentage = Math.round((score / questions.length) * 100);

                    questionEl.innerText = "🎉 Quiz Finished!";
                    optionsEl.innerHTML = "";

                    resultEl.innerText = "Final Score: " + percentage + "%";

                    saveScore(percentage);
                }

                function saveScore(percentage) {

                    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

                    leaderboard.push({
                        name: playerName,
                        subject: selectedSubject,
                        score: percentage,
                        week: currentWeek,
                        year: currentYear
                    });

                    leaderboard.sort((a, b) => b.score - a.score);

                    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
                }

                window.goHome = function() {
                    window.location.href = "index.html";
                }

                window.restartQuiz = function() {
                    location.reload();
                }

                window.goToLeaderboard = function() {
                    window.location.href = "leaderboard.html";
                }

                loadQuestion();
            };
        };
    }
}