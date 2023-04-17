// animation of first page and starting and initiation of second page

let firstPage = window.addEventListener('load', function() {
    var img = document.querySelector('.container');
    img.classList.add('animate');
    })
let containerbtnn = document.getElementsByClassName("containerbtn")[0];
let btn1 = document.getElementsByClassName("btn1")[0];
setTimeout(() => {
    containerbtnn.style.display="flex";
    btn1.addEventListener('click', () =>{
        setTimeout(() => {
          btn1.style.display="none"
        }, 500);
        setTimeout(() => {
            location.href="index2.html"
        }, 3900);
        let aud = new Audio('introAudio/Bismillah.mp3');
        aud.play()
    })
}, 2000);




// opening third and final page
let container2 = document.getElementById("container2");
let container3 = document.getElementById("container3");
let containerr = document.getElementsByClassName("containerr")[0];
let btn2 = document.getElementsByClassName("btn2")[0];
let favImg = document.getElementsByClassName("fav-img")[0];
btn2.addEventListener('click', () =>{
    let surahElement = document.getElementById("surah");
    let surah = surahElement.value;
    if(surah==""){
        alert("Enter the Surah Number First");
    }
    else if(surah<=0 || surah>114){
        alert("Enter the valid Surah number")
    }
    else{
        container2.style.display="none"
        container3.style.display="flex"
        containerr.style.display="flex"
        favImg.style.display="block"
    }



// Script of page 3
let headings = document.getElementsByTagName("h1");
let btnplay = document.getElementById("play-btn")
let btnpause = document.getElementById("pause-btn");
let btnresume = document.getElementById("resume-btn");

  surah = parseInt(surahElement.value);
  fetch("https://api.alquran.cloud/v1/surah/" + surah + "/ar.alafasy")
  .then((response) => response.json())
  .then((data) => {
    let numberOfAyahs = data.data.numberOfAyahs;
    const eName = data.data.englishName;
    const aName = data.data.name;
    const revealType = data.data.revelationType;
    const ayahs = data.data.ayahs;

    if (data.data.number >= 1 && data.data.number <= 114) {
// Audio
let currentAudioIndex = 0;
let aud;
let pausedTime = 0;
let isPlaying = false;

function playNextAudio() {
  const ayah = ayahs[currentAudioIndex];
  if (!ayah || !ayah.audio) {
    return;
  }
  const audioo = ayah.audio;
  aud = new Audio(audioo);
  
  // Set the starting time to the pausedTime value
  aud.currentTime = pausedTime;
  // Play the audio file
  aud.play();
  
  // Hide the play button and show the pause button
  btnplay.style.display = "none";
  btnpause.style.display = "block";
  
  isPlaying = true;
  
  // Listen for the 'ended' event to play the next audio file
  aud.addEventListener("ended", () => {
    // Stop playing the current audio file
    aud.pause();
    pausedTime=0;
            
    // Show the play button and hide the pause button
    btnplay.style.display = "block";
    btnpause.style.display = "none";
            
    // Increment the current audio index and play the next audio file
    currentAudioIndex++;
            
    // Check if we've reached the end of the audio sequence
    if (currentAudioIndex >= ayahs.length) {
      // Reset the current audio index and paused time to their initial values
      currentAudioIndex = 0;
      pausedTime = 0;

      // Set isPlaying to false to prevent the audio from automatically starting again
      isPlaying = false;
      
      return;
    }
            
    // Stop the previously played audio before playing the next one
    if (aud) {
      aud.pause();
      pausedTime=0;
    }
            
    playNextAudio();
  });
}




function playAudio() {
  if (!isPlaying) {
    playNextAudio();
  }
}

function pauseAudio() {
  // Store the current time position
  if (aud) {
    pausedTime = aud.currentTime;
    aud.pause();

    isPlaying = false;

    // Hide the pause button and show the resume button
    btnpause.style.display = "none";
    btnresume.style.display = "block";
  }
}

function resumeAudio() {
  if (!isPlaying && aud) {
    // Pause the previous audio if it was playing
    aud.pause();
    pausedTime = 0;

    // Set the starting time to the pausedTime value
    aud.currentTime = pausedTime;
    // Play the audio file
    aud.play();

    // Hide the resume button and show the pause button
    btnresume.style.display = "none";
    btnpause.style.display = "block";

    isPlaying = true;
  }
}

btnplay.addEventListener("click", playAudio);
btnpause.addEventListener("click", pauseAudio);
btnresume.addEventListener("click", resumeAudio);

      headings[0].innerHTML = `(${eName}) - ${aName}`;
      headings[1].innerHTML = `${eName} contains ${numberOfAyahs} ayahs`;
      headings[2].innerHTML = `${revealType} Revelation`;
    } else {
      console.log("Wrong Input!!");
    }
  })
  .catch((error) => console.error(error));

})



// page 3 Animation
let sketch = function(p) {
  let dim_init = 40;
  let dim_delta = 4;
  let chaos_init = .2;
  let chaos_delta = 0.12;
  let chaos_mag = 20;
  let ox = p.random();
  let oy = p.random();
  let oz = p.random();
  let isPlaying = true;
  let rings = 40; // default value
  
  p.setup = function() {
    let startButton = document.getElementById("play-btn")
    let playButton = document.getElementById("resume-btn");
    let stopButton = document.getElementById("pause-btn");
    startButton.addEventListener("click", play);
    playButton.addEventListener("click", play);
    stopButton.addEventListener("click", stop);
    
    let canvasWidth = Math.min(p.windowWidth, 700);
    let canvasHeight = Math.min(p.windowHeight, 700);
    p.createCanvas(canvasWidth, canvasHeight);
    
    // adjust number of rings based on screen size
    if (canvasWidth <= 1500) {
      rings = 40;
    } else if (canvasWidth <= 500) {
      rings = 10;
    }
    
    p.strokeWeight(1);
    p.stroke(255);
    p.smooth();
    p.noFill();
    p.noLoop();
  }
  
  function play() {
    isPlaying = true;
    p.loop();
  }
  
  function stop() {
    isPlaying = false;
    p.noLoop();
  }
  
  p.draw = function() {
    if (isPlaying) {
      p.clear();
      p.translate(p.width / 2, p.height / 2);
      display();
    }
  }
  
  function display(){
    oy-=0.02;
    oz+=0.01;
    for(let i = 0; i < rings; i ++){
      p.beginShape();
      for(let angle = 0; angle < 360; angle++){
        let radian = p.radians(angle);
        let radius =  (chaos_mag * getNoiseWithTime(radian, chaos_delta * i + chaos_init, oz)) + (dim_delta * i + dim_init);
        p.vertex(radius * p.cos(radian), radius * p.sin(radian));
      }
      p.endShape(p.CLOSE);
    }
  }
  
  function getNoiseWithTime (radian, dim, time){
    let r = radian % p.TWO_PI;
    if(r < 0.0){r += p.TWO_PI;}
    return p.noise(ox + p.cos(r) * dim , oy + p.sin(r) * dim, oz + time);
  }
}
new p5(sketch, 'sketch-container');

