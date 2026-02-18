const leaderboardList = document.getElementById("leaderboardList");

// 🔥 WEEK CALCULATION
function getCurrentWeek() {
    const now = new Date();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((now - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((now.getDay() + 1 + numberOfDays) / 7);
}

const currentWeek = getCurrentWeek();
const currentYear = new Date().getFullYear();

function loadLeaderboard(subject = "All") {

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // 🔥 Only Current Week Scores
    leaderboard = leaderboard.filter(player =>
        player.week === currentWeek &&
        player.year === currentYear
    );

    if (subject !== "All") {
        leaderboard = leaderboard.filter(player => player.subject === subject);
    }

    leaderboard.sort((a, b) => b.score - a.score);

    leaderboardList.innerHTML = "";

    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = "<p style='text-align:center'>No Scores This Week</p>";
        return;
    }

    leaderboard.forEach((player, index) => {

        let medal = "";
        let rankClass = "";
        let topperTag = "";

        if (index === 0) {
            medal = "🥇";
            rankClass = "rank-1";
            topperTag = "<div style='color:gold;font-weight:bold'>👑 Weekly Website Topper</div>";
        } else if (index === 1) {
            medal = "🥈";
            rankClass = "rank-2";
        } else if (index === 2) {
            medal = "🥉";
            rankClass = "rank-3";
        }

        leaderboardList.innerHTML += `
            <div class="leader-card ${rankClass}">
                <div><strong>${medal} ${index + 1}</strong></div>
                <div>
                    <strong>${player.name}</strong>
                    <div>${player.subject}</div>
                    ${topperTag}
                </div>
                <div><strong>${player.score}%</strong></div>
            </div>
        `;
    });
}

function filterLeaderboard() {
    const subject = document.getElementById("subjectFilter").value;
    loadLeaderboard(subject);
}

function goHome() {
    window.location.href = "index.html";
}

loadLeaderboard();