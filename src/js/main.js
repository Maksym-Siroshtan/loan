import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import VideoPlayer from './modules/videoPlayer';

window.addEventListener("DOMContentLoaded", () => {
/*   const mainSlider = new MainSlider({ container: ".page", btns: ".next" });
  mainSlider.render();

  const showSlider = new MiniSlider({
    container: ".showup__content-slider",
    prev: ".showup__prev",
    next: ".showup__next",
    activeClass: 'card-active',
    animate: true
  });
  showSlider.init();

  const modulesSlider = new MiniSlider({
    container: ".modules__content-slider",
    prev: ".modules__info-btns .slick-prev",
    next: ".modules__info-btns .slick-next",
    activeClass: 'card-active',
    animate: true,
    autoplay: true
  });
  modulesSlider.init();

  const feedSlider = new MiniSlider({
    container: ".feed__slider",
    prev: ".feed__slider .slick-prev",
    next: ".feed__slider .slick-next",
    activeClass: 'feed__item-active'
  });
  feedSlider.init(); */

  new VideoPlayer('.showup__video .play', '.overlay').init();
  new VideoPlayer('.module__video-item .play', '.overlay').init();
});
