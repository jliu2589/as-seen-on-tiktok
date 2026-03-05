const cues = [
  {
    time: 4,
    hanzi: "今天我们去市场买新鲜水果。",
    pinyin: "Jīntiān wǒmen qù shìchǎng mǎi xīnxiān shuǐguǒ.",
    english: "Today we go to the market to buy fresh fruit.",
    visuals: ["🛒 market", "🍎 fruit", "🥭 fresh produce"]
  },
  {
    time: 14,
    hanzi: "这个苹果很甜，那个香蕉也不错。",
    pinyin: "Zhège píngguǒ hěn tián, nàgè xiāngjiāo yě búcuò.",
    english: "This apple is sweet, and that banana is also good.",
    visuals: ["🍎 apple", "🍌 banana", "😊 tasty"]
  },
  {
    time: 27,
    hanzi: "买完以后，我们回家做水果沙拉。",
    pinyin: "Mǎi wán yǐhòu, wǒmen huíjiā zuò shuǐguǒ shālā.",
    english: "After shopping, we go home and make fruit salad.",
    visuals: ["🏠 go home", "🥗 salad", "🔪 prepare food"]
  }
];

const uploadInput = document.getElementById("video-upload");
const videoPlayer = document.getElementById("video-player");
const videoStatus = document.getElementById("video-status");
const currentContext = document.getElementById("current-context");
const cueList = document.getElementById("cue-list");

let currentCueIndex = -1;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

function renderCueList(activeIndex = -1) {
  cueList.innerHTML = "";

  cues.forEach((cue, index) => {
    const item = document.createElement("article");
    item.className = `cue-item ${index === activeIndex ? "active" : ""}`;
    item.innerHTML = `
      <div class="time">${formatTime(cue.time)}</div>
      <strong>${cue.hanzi}</strong>
    `;
    cueList.appendChild(item);
  });
}

function renderCurrentCue(cue) {
  if (!cue) {
    currentContext.innerHTML = "Waiting for the first context cue...";
    return;
  }

  const visualsMarkup = cue.visuals
    .map((visual) => `<span class="visual-chip">${visual}</span>`)
    .join("");

  currentContext.innerHTML = `
    <h4 class="context-title">${cue.hanzi}</h4>
    <p class="pinyin">${cue.pinyin}</p>
    <p class="english">Hint: ${cue.english}</p>
    <div class="visual-row">${visualsMarkup}</div>
  `;
}

function getActiveCueIndex(currentTime) {
  let index = -1;

  cues.forEach((cue, cueIndex) => {
    if (currentTime >= cue.time) {
      index = cueIndex;
    }
  });

  return index;
}

function syncContextToVideo() {
  const nextIndex = getActiveCueIndex(videoPlayer.currentTime);
  if (nextIndex === currentCueIndex) {
    return;
  }

  currentCueIndex = nextIndex;
  renderCueList(currentCueIndex);
  renderCurrentCue(cues[currentCueIndex]);
}

uploadInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (!file) {
    return;
  }

  const videoURL = URL.createObjectURL(file);
  videoPlayer.src = videoURL;
  videoStatus.textContent = `Loaded: ${file.name}`;
  currentCueIndex = -1;
  renderCueList(-1);
  renderCurrentCue(null);
});

videoPlayer.addEventListener("timeupdate", syncContextToVideo);
videoPlayer.addEventListener("seeked", syncContextToVideo);
videoPlayer.addEventListener("play", syncContextToVideo);

renderCueList(-1);
