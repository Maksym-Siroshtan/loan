export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector(".close");
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  createPlayer(url) {
    this.overlay.style.display = "flex";

    this.player = new YT.Player("frame", {
      height: "100%",
      width: "100%",
      videoId: `${url}`,
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    });
  }

  onPlayerStateChange(event) {
    try {
      const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
      const playElem = this.activeBtn.querySelector('svg').cloneNode(true);
      
      if (event.data === 0) {
        if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
          blockedElem.querySelector('.play__circle').classList.remove('closed');
          blockedElem.querySelector('svg').remove();
          blockedElem.querySelector('.play__circle').appendChild(playElem);
          blockedElem.querySelector('.play__text').classList.remove('attention');
          blockedElem.querySelector('.play__text').textContent = 'play video';
          blockedElem.style.filter = 'none';
          blockedElem.style.opacity = '1';
          
          blockedElem.setAttribute('data-disabled', 'false');
        }
      }
    } catch (error) {}
  }

  bindTriggers() {
    this.btns.forEach((btn, i) => {
      try {
        const blockedElem = btn.closest('.module__video-item').nextElementSibling;
      
        if (i % 2 === 0) {
          blockedElem.setAttribute('data-disabled', 'true');
        }
      } catch (error) {}

      btn.addEventListener("click", () => {
        if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
          this.activeBtn = btn;

          if (document.querySelector("iframe#frame")) {
            this.overlay.style.display = "flex";
            if (this.url !== btn.getAttribute("data-url")) {
              this.url = btn.getAttribute("data-url");
              this.player.loadVideoById({videoId: this.url});
            }
          } else {
            this.url = btn.getAttribute("data-url");
            this.createPlayer(this.url);
          }
        }
      });
    });
  }

  bindClose() {
    this.close.addEventListener("click", () => {
      this.overlay.style.display = "none";
      this.player.stopVideo();
    });
  }

  init() {
    if (this.btns.length > 0) {
      const tag = document.createElement("script");

      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
      this.bindTriggers();
      this.bindClose();
    }
  }
}
