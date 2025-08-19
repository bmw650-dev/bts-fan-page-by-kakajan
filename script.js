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
