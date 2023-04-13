import Slider from './slider';

export default class MainSlider extends Slider {
  constructor(btns) {
    super(btns);
  }

  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    try {
      this.hanson.style.opacity = '0';
      this.hanson.classList.add('animated');
      if (n === 3) {
        setTimeout(() => {
          this.hanson.style.opacity = '1';
          this.hanson.classList.add('slideInUp');
        }, 3000);
      } else {
        this.hanson.classList.remove('slideInUp');
      }
    } catch (error) {
      
    }

    this.slides.forEach(slide => {
      slide.classList.add('animated');
    });

    this.slides.forEach(slide => {
      slide.classList.remove('fadeInUp');
      slide.style.display = 'none';
    });

    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  plusSlide(n) {
    this.showSlides(this.slideIndex += n);
  }

  render() {
    try {
      this.hanson = document.querySelector('.hanson');
    } catch(error) {}

    this.btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        this.plusSlide(1);
        this.slides[this.slideIndex - 1].classList.add('fadeInUp');
      });

      btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
        e.preventDefault();

        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
        this.slides[this.slideIndex - 1].classList.add('fadeInUp');
      });
    });

    this.showSlides(this.slideIndex);
  }
}