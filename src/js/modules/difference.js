export default class Difference {
  constructor(oldOfficer, newOfficer, items) {
    try {
      this.oldOfficer = document.querySelector(oldOfficer);
      this.newOfficer = document.querySelector(newOfficer);
      this.oldItems = this.oldOfficer.querySelectorAll(items);
      this.newItems = this.newOfficer.querySelectorAll(items);
      this.oldCounter = 0;
      this.newCounter = 0;
    } catch (error) {}
  }

  hideItems(items) {
    items.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = 'none';
        item.classList.remove('fadeInDown');
      }
    });
  }

  bindTriggers(container, items, counter) {
    items.forEach(item => item.classList.add('animated'));

    container.querySelector('.plus').addEventListener('click', () => {
      if (counter !== items.length - 2) {
        items[counter].classList.add('fadeInDown');
        items[counter].style.display = 'flex';
        counter++;
      } else {
        items[counter].classList.add('fadeInDown');
        items[counter].style.display = 'flex';
        items[items.length - 1].remove();
      }
    });
  }

  init() {
    try {
      this.hideItems(this.oldItems);
      this.hideItems(this.newItems);
  
      this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
      this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
    } catch (error) {}
  }
} 