export default class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll('input');
    this.emailInputs = document.querySelectorAll('[name="email"]');
    this.phoneInputs = document.querySelectorAll('[name="phone"]');
    this.messages = {
      loading: 'Загрузка...',
      success: 'Спасибо! Скоро мы с Вами свяжемся.',
      failure: 'Извините! Что-то пошло не так...'
    };
    this.path = 'assets/question.php';
  }

  async postData(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      body: data
    });
    return await res.text();
  }

  clearInputs() {
    this.inputs.forEach(input => input.value = '');
  }

  checkEmailInputs() {
    this.emailInputs.forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key.match(/[^a-z 0-9 @ \.]/gi)) {
          e.preventDefault();
        }
      });
    });
  }

  initMask() {
    let setCursorPosition = (pos, elem) => {
      elem.focus();
  
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
  
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
      }
    };
  
    function createMask(event) {
      let matrix = "+1 (___) ___-____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
  
      if (def.length >= val.length) {
        val = def;
      }
  
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ""
          : a;
      });
  
      if (event.type === "blur") {
        if (this.value.length == 2) {
          this.value = "";
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }
  
    this.phoneInputs.forEach((input) => {
      input.addEventListener("input", createMask);
      input.addEventListener("focus", createMask);
      input.addEventListener("blur", createMask);
    });
  }

  init() {
    this.checkEmailInputs();
    this.initMask();

    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const messageStatus = document.createElement('div');
        messageStatus.style.cssText = `
          display: inline-block;
          margin-top: 15px;
          font-size: 18px;
          color: #fff;
          background-color: #000;
        `;

        messageStatus.textContent = this.messages.loading;
        form.parentNode.appendChild(messageStatus);

        const formData = new FormData(form);

        this.postData(this.path, formData)
          .then(response => {
            console.log(response);
            messageStatus.textContent = this.messages.success;
          })
          .catch(() => {
            messageStatus.textContent = this.messages.failure;
          })
          .finally(() => {
            this.clearInputs();

            setTimeout(() => {
              messageStatus.remove();
            }, 6000);
          });
      });
    });
  }
}