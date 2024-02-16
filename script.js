
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


const songs = ['hey', 'summer', 'ukulele'];
let songIndex = 2;

// Initially load song details
loadSong(songs[songIndex]);



function loadSong(song){
  title.innerText = song;
  audio.src =`music/${song}.mp3`;
  cover.src =`images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
}


function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length -1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  console.log(songs.length);
  songIndex++;

  if (songIndex > songs.length -1)  {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}


function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) *100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width ) * duration;

}


playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);


// Volume Control 
const volume = document.querySelector('.volume');

const volumeRange = document.querySelector('.volume-range');
const volumeContainer = document.querySelector('.volume-container');
const volumeBtn = document.querySelector('.volume-button');

const volumeRangeWidth = volumeRange.getBoundingClientRect().width; // This will be the volume limit (100%)



function volumeClick(event) {
  let x = Math.floor(event.offsetX);
  if (x < 0) x = 0; // check if it's too low
  if (x > volumeRangeWidth) x = volumeRangeWidth; // check if it's too high
  volume.style.width = (x + 10) + 'px';
}


let mouseIsDown = false;

window.addEventListener("mouseup", up);
volumeContainer.addEventListener("mousedown", down);
volumeContainer.addEventListener("mousedown", volumeSlide);
volumeContainer.addEventListener("mousemove", volumeSlide);

function down() {
  mouseIsDown = true;
}

function up() {
  mouseIsDown = false;
  firstClick = true;
}


let firstClick = true; // this doesn't work


function volumeSlide(event) {
  if (mouseIsDown) {
    let x = Math.floor(event.offsetX);
    if (x < 0) x = 0; // Ensure x is within bounds
    if (x > volumeRangeWidth) x = volumeRangeWidth;

    // Set volume based on position relative to volume range width
    audio.volume = x / volumeRangeWidth;

    // Update visual representation of volume
    volume.style.width = (x + 10) + 'px';
  }
}

// Reset mouseIsDown flag on mouseup event
window.addEventListener("mouseup", () => mouseIsDown = false);