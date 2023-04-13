import Slider from "./slider";

export default class MiniSlider extends Slider {
  constructor(container, prev, next, activeClass, animate, autoplay) {
    super(container, prev, next, activeClass, animate, autoplay);

    this.paused = null;
  }

  decorizeSlides() {
    this.slides.forEach((slide) => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector(".card__title").style.opacity = "0.4";
        slide.querySelector(".card__controls-arrow").style.opacity = "0";
      }
    });

    if (this.slides[0].tagName !== "BUTTON") {
      this.slides[0].classList.add(this.activeClass);
    }

    if (this.animate) {
      this.slides[0].querySelector(".card__title").style.opacity = "1";
      this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
    }
  }

  nextSlide() {
    for (let i = 0; i < this.slides.length; i++) {
      this.container.insertBefore(this.slides[i], this.isButtonsFilteredArray[0]);
      this.decorizeSlides();
      break;
    }
  }

  bindTriggers() {
    this.next.addEventListener("click", () => this.nextSlide());

    this.prev.addEventListener("click", () => {
      for (let i = this.slides.length - 1; i > 0; i--) {
        if (this.slides[i].tagName !== "BUTTON") {
          this.container.insertBefore(this.slides[i], this.slides[0]);
          this.decorizeSlides();
          break;
        }
      }
    });
  }

  activateAnimation() {
    this.paused = setInterval(() => this.nextSlide(), 5000);
  }

  createEvents(selector, event) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      if (event === "mouseenter") {
        element.addEventListener("mouseenter", () => {
          clearInterval(this.paused);
        });
      } else {
        element.addEventListener("mouseleave", () => {
          this.activateAnimation();
        });
      }
    });
  }

  bindEvents() {
    this.createEvents(".modules__info-btns", "mouseenter");
    this.createEvents(".modules__info-btns", "mouseleave");
    this.createEvents(".modules__content-slider a", "mouseenter");
    this.createEvents(".modules__content-slider a", "mouseleave");
  }

  init() {
    this.container.style.cssText = `
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      overflow: hidden;
    `;

    this.isButtonsFilteredArray = Array.from(this.slides).filter(
      (slideElement) => slideElement.tagName === "BUTTON"
    );

    this.bindTriggers();
    this.decorizeSlides();

    if (this.autoplay) {
      this.activateAnimation();
      this.bindEvents();
    }
  }
}
