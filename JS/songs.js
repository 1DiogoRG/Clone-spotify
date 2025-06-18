const audioPlayer = new Audio();
const playBtn = document.querySelector('.play-btn');
let isPlaying = false;

const songs = document.querySelectorAll('.song');

songs.forEach(song => {
    song.addEventListener('click', () => {
        const src = song.getAttribute('data-src');
        const name = song.querySelector('p').textContent;
        const img = song.querySelector('img').src;

        audioPlayer.src = src;
        audioPlayer.play();
        isPlaying = true;

        document.querySelector('.song-info strong').textContent = name;
        document.querySelector('.song-info img').src = img;
    });
});

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play();
        isPlaying = true;
    }
});

