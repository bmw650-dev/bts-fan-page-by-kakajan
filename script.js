// Member detail toggle
function showDetail(id) {
  document.querySelectorAll(".detail").forEach(d => d.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// News slider
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
function showSlide(n) {
  slides.forEach(s => s.classList.remove("active"));
  slides[n].classList.add("active");
}
function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}
function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}
setInterval(nextSlide, 5000); // awtomatiki her 5 sek

// Scroll to top
const topBtn = document.getElementById("topBtn");
window.onscroll = () => {
  if (document.documentElement.scrollTop > 200) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};
function scrollTopFn() {
  window.scrollTo({top:0,behavior:"smooth"});
}
// Simple playlist
const songs = [
  {title:"BTS — Song 1", src:"BTS.mp3"},
  
];
let idx = 0;

const audioEl = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const titleEl = document.getElementById("songTitle");

function loadSong(i){
  idx = (i + songs.length) % songs.length;
  audioEl.src = songs[idx].src;
  titleEl.textContent = songs[idx].title;
}
function togglePlay(){
  if(audioEl.paused){ audioEl.play(); playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; }
  else{ audioEl.pause(); playBtn.innerHTML = '<i class="fa-solid fa-play"></i>'; }
}
function nextSong(){ loadSong(idx+1); audioEl.play(); playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; }
function prevSong(){ loadSong(idx-1); audioEl.play(); playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; }

playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audioEl.addEventListener("ended", nextSong);

// init
loadSong(0);
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Sayfa açılınca localStorage kontrol et
if (localStorage.getItem("theme")) {
  body.setAttribute("data-theme", localStorage.getItem("theme"));
} else {
  body.setAttribute("data-theme", "dark"); // Varsayılan dark
}

toggleBtn.addEventListener("click", () => {
  if (body.getAttribute("data-theme") === "dark") {
    body.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
});

// Basit kontrol bağlama
const v = document.getElementById("player");
const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");
const speedEl = document.getElementById("speed");
const speedDown = document.getElementById("speedDown");
const speedUp = document.getElementById("speedUp");
const fsBtn = document.getElementById("fsBtn");
const pipBtn = document.getElementById("pipBtn");

// Oynat / Duraklat
playPauseBtn.addEventListener("click", () => {
  if (v.paused) v.play();
  else v.pause();
});

// Sessize al / aç
muteBtn.addEventListener("click", () => {
  v.muted = !v.muted;
});

// Hız ayarı
function setSpeed(rate) {
  const clamped = Math.max(0.25, Math.min(2, rate));
  v.playbackRate = clamped;
  speedEl.textContent = clamped.toFixed(2) + "x";
}
setSpeed(1.0);

speedDown.addEventListener("click", () => setSpeed(v.playbackRate - 0.25));
speedUp.addEventListener("click", () => setSpeed(v.playbackRate + 0.25));

// Tam ekran
fsBtn.addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) {
      await (v.requestFullscreen ? v.requestFullscreen() : v.parentElement.requestFullscreen());
    } else {
      await document.exitFullscreen();
    }
  } catch (e) {
    console.error(e);
  }
});

// PiP (destekliyse)
pipBtn.addEventListener("click", async () => {
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled && !v.disablePictureInPicture) {
      await v.requestPictureInPicture();
    }
  } catch (e) {
    console.error(e);
  }
});

// Kullanışlı: video tıklandığında oynat/duraklat
v.addEventListener("click", () => {
  if (v.paused) v.play(); else v.pause();
});
