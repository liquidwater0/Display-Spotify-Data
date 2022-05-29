const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("input", async event => {
    const file = event.target.files[0];
    if (!file) return;
    insertInfo(await file.text());
});

function insertInfo(file) {
    try {
        const songsPlayedList = document.getElementById("songsPlayedList");
        const songListItems = songsPlayedList.querySelectorAll("li");
        const songs = JSON.parse(file);

        //Remove all list items before inserting another file
        songListItems.forEach(item => item.remove());

        songs.forEach(song => {
            const { trackName, artistName, msPlayed, endTime } = song;
    
            songsPlayedList.insertAdjacentHTML("beforeend", `
                <li>
                    <div class="track-name">${trackName || "Unknown Track"}</div>
                    <div class="artist-name">${artistName || "Unknown Artist"}</div>
    
                    <div class="details">
                        <div class="time-played">${formatTime(msPlayed)}</div>
                        <div class="end-time">${endTime || "Unknown Date"}</div>
                    </div>
                </li>
            `);
        });
    } catch(error) {
        alert("Invalid File");
        console.log("Invalid File");
    }
}

function formatTime(ms) {
    const minutes = Math.floor((ms / 1000) / 60);
    const seconds = Math.floor((ms / 1000) % 60);

    if (isNaN(ms)) return "0m 0s";

    return `${minutes}m ${seconds}s`;
}
