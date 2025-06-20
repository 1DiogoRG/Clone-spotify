const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeControl = document.getElementById('volumeControl');

const playerImg = document.querySelector('.song-info img');
const playerTitle = document.querySelector('.song-info strong');
const playerArtist = document.querySelector('.song-info p');

const songs = [
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        src: "audio/Blinding Lights.mp3",
        cover: "capas/Blinding.jpg"
    },
    {
        title: "Good For You x One Of The Girls (slowed)",
        artist: "The Weeknd",
        src: "audio/Good For You.mp3",
        cover: "capas/Good-For-Ypu.jpg"
    },
    {
        title: "NIGHTS LIKE THIS - The Kid LAROI",
        artist: "The Kid LAROI",
        src: "audio/NIGHTS LIKE THIS.mp3",
        cover: "capas/Nights-Like-This.jpg"
    },
    {
        title: "The Weeknd, Playboi Carti - Timeless",
        artist: "The Weeknd and Playboi Carti",
        src: "audio/Timeless.mp3",
        cover: "capas/TheWeekng.jpg"
    },
    {
        title: "Cochise - Tell Em",
        artist: "Cochise",
        src: "audio/Cochise - Tell Em.mp3",
        cover: "capas/Tell-Em.jpg"
    },
    {
        title: "Heaven Sent",
        artist: "Tevomxntana",
        src: "audio/Heaven Sent.mp3",
        cover: "capas/HeavenSent.jpg"
    },
    {
        title: "Feel It - d4vd",
        artist: "d4vd",
        src: "audio/Feel It.mp3",
        cover: "capas/FeelIt.jpg"
    },
    {
        title: "I Gotta Feeling",
        artist: "Black Eyed Peas",
        src: "audio/I Gotta Feeling.mp3",
        cover: "capas/IGotta.jpg"
    }
];

let currentIndex = 0;
let audio = null;

function createAudio(index) {
    if (audio) {
        audio.pause();
        audio = null;
    }
    audio = new Audio(songs[index].src);
    audio.volume = volumeControl.value;
    setupAudioEvents();
}

function loadSong(index) {
    createAudio(index);
    const song = songs[index];
    playerImg.src = song.cover;
    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;
    updateActiveSongCard(index);
}

function playSong() {
    if (audio && audio.readyState >= 2) {
        audio.play();
        playBtn.classList.replace('fa-play-circle', 'fa-pause-circle');
        playBtn.classList.add('playing');
    }
}

function pauseSong() {
    if (audio) {
        audio.pause();
        playBtn.classList.replace('fa-pause-circle', 'fa-play-circle');
        playBtn.classList.remove('playing');
    }
}

function setupAudioEvents() {
    audio.addEventListener('loadedmetadata', () => {
        progressBar.max = Math.floor(audio.duration);
        durationEl.textContent = formatTime(audio.duration);

        if (playBtn.classList.contains('playing')) {
            playSong();
        }
    });

    audio.addEventListener('timeupdate', () => {
        progressBar.value = Math.floor(audio.currentTime);
        currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    progressBar.addEventListener('input', () => {
        if (audio) {
            audio.currentTime = progressBar.value;
        }
    });

    volumeControl.addEventListener('input', () => {
        if (audio) {
            audio.volume = volumeControl.value;
        }
    });
}

playBtn.addEventListener('click', () => {
    if (!audio) {
        loadSong(currentIndex);
    }

    if (audio.paused) {
        playBtn.classList.add('playing');
        if (audio.readyState >= 2) {
            playSong();
        }
    } else {
        pauseSong();
    }
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    playBtn.classList.add('playing');
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    playBtn.classList.add('playing');
});

function updateActiveSongCard(index) {
    document.querySelectorAll('.song').forEach((el, i) => {
        el.classList.toggle('active', i === index);
    });
}

document.querySelectorAll('.song').forEach((songDiv, index) => {
    songDiv.addEventListener('click', () => {
        currentIndex = index;
        loadSong(currentIndex);
        playBtn.classList.add('playing');
    });
});

loadSong(currentIndex);
