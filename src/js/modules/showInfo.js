export default class ShowInfo {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
  }

  init() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const msg = btn.closest('.module__info-show').nextElementSibling;

        if (msg.style.display === 'block') {
          msg.style.display = 'none';
          msg.classList.remove('fadeInUp');
        } else {
          msg.style.display = 'block';
          msg.classList.add('animated', 'fadeInUp');
        }
      });
    });
  }
}