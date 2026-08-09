const topics = {
  cuff: [
    "The best meal you've ever eaten, and why it beat every other contender",
    "A rule you'd abolish if you ran the world for a day",
    "The most useful thing you own that cost less than $20",
    "A skill you wish schools actually taught",
    "The last time you changed your mind about something",
    "A place you've never been but feel like you already know",
    "Something you believed as a kid that turned out to be wrong",
    "The most underrated everyday object",
    "A tradition you'd start if you could",
    "The best advice you've ever ignored",
    "A smell that instantly takes you somewhere",
    "Something you're weirdly good at",
    "The last thing that made you laugh out loud",
    "A habit you're trying to build right now",
    "The most interesting person you've met by accident"
  ],
  deep: [
    "Should cities charge people to drive downtown during rush hour?",
    "Is remote work making us better or worse colleagues?",
    "Does social media make political disagreement healthier or more toxic?",
    "Should there be a maximum wage as well as a minimum one?",
    "Is standardized testing a fair way to measure ability?",
    "Should companies be required to disclose how their algorithms work?",
    "Is space exploration a good use of public money right now?",
    "Should voting be mandatory?",
    "Does economic growth still make sense as a national goal?",
    "Is a four-day work week realistic for most industries?",
    "Should artificial intelligence be regulated like a public utility?",
    "Is nuclear energy the most practical path to net zero?",
    "Should inheritance be taxed more heavily than income?",
    "Is it ethical to bring back extinct species?",
    "Should platforms be responsible for the content they recommend?"
  ]
};

let mode = "cuff";
let currentTopic = null;
let duration = 60;
let remaining = 60;
let timerId = null;
let running = false;

const dial = document.getElementById('dial');
const spinBtn = document.getElementById('spinBtn');
const topicText = document.getElementById('topicText');
const clock = document.getElementById('clock');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const modeButtons = document.querySelectorAll('.modes button');
const durationButtons = document.querySelectorAll('.duration-picker button');

let rotation = 0;

function formatTime(s){
  const m = Math.floor(s/60).toString().padStart(2,'0');
  const sec = (s%60).toString().padStart(2,'0');
  return `${m}:${sec}`;
}

function updateClockDisplay(){
  clock.textContent = formatTime(remaining);
  clock.classList.toggle('low', remaining <= 10 && remaining > 0);
}

function resetTimerState(){
  clearInterval(timerId);
  running = false;
  remaining = duration;
  updateClockDisplay();
  startBtn.textContent = 'Start';
  startBtn.disabled = !currentTopic;
  resetBtn.disabled = true;
}

modeButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    modeButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    mode = btn.dataset.mode;
    currentTopic = null;
    topicText.textContent = "Your topic will land here";
    topicText.classList.add('placeholder');
    resetTimerState();
    startBtn.disabled = true;
  });
});

durationButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    durationButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    duration = parseInt(btn.dataset.secs, 10);
    resetTimerState();
  });
});

spinBtn.addEventListener('click', ()=>{
  if(spinBtn.disabled) return;
  spinBtn.disabled = true;
  resetTimerState();
  startBtn.disabled = true;

  const list = topics[mode];
  const pick = list[Math.floor(Math.random()*list.length)];

  rotation += 1080 + Math.floor(Math.random()*360);
  dial.style.transform = `rotate(${rotation}deg)`;

  topicText.classList.add('placeholder');
  topicText.textContent = "Spinning…";

  setTimeout(()=>{
    currentTopic = pick;
    topicText.textContent = pick;
    topicText.classList.remove('placeholder');
    spinBtn.disabled = false;
    startBtn.disabled = false;
  }, 3200);
});

startBtn.addEventListener('click', ()=>{
  if(running){
    // pause
    clearInterval(timerId);
    running = false;
    startBtn.textContent = 'Resume';
    return;
  }
  running = true;
  startBtn.textContent = 'Pause';
  resetBtn.disabled = false;
  timerId = setInterval(()=>{
    remaining -= 1;
    updateClockDisplay();
    if(remaining <= 0){
      clearInterval(timerId);
      running = false;
      startBtn.textContent = 'Start';
      startBtn.disabled = true;
      clock.classList.add('low');
    }
  }, 1000);
});

resetBtn.addEventListener('click', ()=>{
  resetTimerState();
  startBtn.disabled = !currentTopic;
});

updateClockDisplay();
