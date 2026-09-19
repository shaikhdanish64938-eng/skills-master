window.addEventListener("load", function () {

    let savedName = sessionStorage.getItem("visitorName");

    if (!savedName) {

        let name;

        while (!name || name.trim() === "") {

            name = prompt("👋 ENTER YOUR NAME\n\nPlease enter your name to continue:");

            // Cancel dabaya
            if (name === null) {
                alert("❌ Name is required!\n\nYou cannot enter the website without a name.");

                // Blank page dikhao
                document.body.innerHTML = `
                    <div style="
                        height:100vh;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        background:#050b14;
                        color:white;
                        text-align:center;
                        font-family:Arial;
                    ">
                        <div>
                            <h1>🚫 Access Denied</h1>
                            <p>Please enter your name to access Skill Master.</p>
                        </div>
                    </div>
                `;

                return;
            }

            // OK bina naam ke
            if (name.trim() === "") {
                alert("⚠️ Please enter your name!");
            }
        }

        savedName = name.trim();

        sessionStorage.setItem("visitorName", savedName);

        alert("Hello, " + savedName + "! 👋");
    }

});






function searchSkills() {

    let searchText = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const videos = document.querySelectorAll(".skill");

    // Search ke common naam
    const aliases = {
        "javascript": "java script",
        "js": "java script",

        "excel": "ms exel",
        "ms excel": "ms exel",

        "power point": "powerpoint",
        "ms powerpoint": "powerpoint",

        "cyber security": "cyber",
        "cybersecurity": "cyber",

        "networking": "networck",
        "network": "networck",

        "artificial intelligence": "ai",
        "machine learning": "machine",

        "generative ai": "gen",
        "generative": "gen",

        "data science": "data",

        "ethical hacking": "hacking",
        "ethical hacker": "hacking"
    };

    // Alias ko actual data-skill naam me convert karo
    if (aliases[searchText]) {
        searchText = aliases[searchText];
    }

    videos.forEach(function(video) {

        const skill = video.getAttribute("data-skill");

        if (!skill) {
            return;
        }

        const skillName = skill.toLowerCase().trim();

        // Empty search = sab videos dikhao
        if (searchText === "") {
            video.style.display = "";
        }

        // Matching skill = video dikhao
        else if (skillName.includes(searchText)) {
            video.style.display = "";
        }

        // Match nahi = video hide
        else {
            video.style.display = "none";
        }
    });
}

const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");

searchInput.addEventListener("input", function () {

    const text = this.value.toLowerCase().trim();

    suggestionsBox.innerHTML = "";

    if (text === "") {
        suggestionsBox.style.display = "none";
        return;
    }

    const videos = document.querySelectorAll(".skill");
    let found = false;

    videos.forEach(function (video) {

        const skill = video.getAttribute("data-skill");

        if (!skill) return;

        if (skill.toLowerCase().includes(text)) {

            const suggestion = document.createElement("div");
            suggestion.className = "video-suggestion";

            // Original video ka thumbnail
            const originalImage = video.querySelector("img");

            // Thumbnail copy
            const image = document.createElement("img");
            image.src = originalImage.src;

            // Skill ka naam
            const name = document.createElement("span");
            name.textContent = video.getAttribute("data-skill");

            suggestion.appendChild(image);
            suggestion.appendChild(name);

            // Suggestion par click
            suggestion.onclick = function () {

                searchInput.value = video.getAttribute("data-skill");

                suggestionsBox.style.display = "none";

                searchSkills();
            };

            suggestionsBox.appendChild(suggestion);

            found = true;
        }
    });

    if (found) {
        suggestionsBox.style.display = "block";
    } else {
        suggestionsBox.style.display = "none";
    }
});


// ENTER = SEARCH BUTTON
searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        event.preventDefault();

        suggestionsBox.style.display = "none";

        searchSkills();
    }
});


// SEARCH
function searchSkills() {

    const searchText = searchInput.value.toLowerCase().trim();

    const videos = document.querySelectorAll(".skill");

    videos.forEach(function (video) {

        const skill = video.getAttribute("data-skill");

        if (!skill) return;

        if (
            searchText === "" ||
            skill.toLowerCase().includes(searchText)
        ) {
            video.style.display = "";
        } else {
            video.style.display = "none";
        }
    });
}