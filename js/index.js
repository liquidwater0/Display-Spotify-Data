const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("input", async event => {
    const file = event.target.files[0];
    if (!file || !file.name.includes("StreamingHistory")) return;
    insertInfo(await file.text());
});

function insertInfo(file) {
    const songsPlayedList = document.getElementById("songsPlayedList");
    const songListItems = songsPlayedList.querySelectorAll("li");
    const songs = JSON.parse(file);

    //Remove all list items before inserting another file
    songListItems.forEach(item => item.remove());

    songs.forEach(song => {
        const { trackName, artistName, msPlayed, endTime } = song;

        songsPlayedList.insertAdjacentHTML("beforeend", `
            <li>
                <div class="track-name">${trackName}</div>
                <div class="artist-name">${artistName}</div>

                <div class="details">
                    <div class="time-played">${formatTime(msPlayed)}</div>
                    <div class="end-time">${endTime}</div>
                </div>
            </li>
        `);
    });
}

function formatTime(ms) {
    const minutes = Math.floor((ms / 1000) / 60);
    const seconds = Math.floor((ms / 1000) % 60);

    return `${minutes}m ${seconds}s`;
}