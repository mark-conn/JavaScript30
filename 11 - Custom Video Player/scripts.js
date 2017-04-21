// Get our Elements
const player = document.querySelector('.player'),
      video = player.querySelector('.viewer'),
      progress = player.querySelector('.progress'),
      progressBar = player.querySelector('.progress__filled'),
      toggle = player.querySelector('.toggle'),
      skipButtons = player.querySelectorAll('[data-skip]'),
      ranges = player.querySelectorAll('.player__slider'),
      fullscreen = player.querySelector('#fullscreen');

// Build our Functions
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgess() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function handleScrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleFullScreen() {
    console.dir(player)
    console.log(player.clientHeight = player.clientHeight * 2);

}
// Hook up the event Listeners
video.addEventListener('timeupdate', handleProgess);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
fullscreen.addEventListener('click', handleFullScreen)

skipButtons.forEach(button => {
    button.addEventListener('click', skip)
})
ranges.forEach(slider => {
    slider.addEventListener('change', handleRangeUpdate)
})

let mousedown = false;
progress.addEventListener('click', handleScrub);
progress.addEventListener('mousemove', (e) => mousedown && handleScrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
