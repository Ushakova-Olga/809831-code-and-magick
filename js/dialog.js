'use strict';

/* Работа с диалогом (Блок с персонажем) - открытие окна, закрытие, \
обработка полей ввода - задание параметов волшебника */
(function () {
  /* спрятанный блок с персонажем */
  var setup = document.querySelector('.setup');

  /* Аватарка по нажатию которой открывается setup*/
  var setupOpen = document.querySelector('.setup-open');

  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var setupInputCoat = setup.querySelector('[name="coat-color"]');
  var setupInputEyes = setup.querySelector('[name="eyes-color"]');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var setupInputFireball = setup.querySelector('.setup-fireball-wrap input');

  /* Обработчик события - нажатие на ESC */
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  /* Функция открытия окна */
  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  /* Функция закрытия окна */
  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    /* Сброс положения на изначальное */
    setup.style.top = '80px';
    setup.style.left = '50%';
  };

  /* Обработчик события - клик на аватарке */
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  /* Обработчик события - нажатие Enter на аватарке */
  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  /* Обработчик события - клик на крестике */
  setupClose.addEventListener('click', function () {
    closePopup();
  });

  /* Обработчик события - нажатие Enter на крестике */
  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  /* Обработчик события ввод в поле - имя пользователя */
  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

  /*  Задание цвета плащу, одновременно присваиваем соответствующему инпуту значение */
  /* Обработчик события - клик на плаще волшебника */
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = window.util.getRandomItem('coat');
    setupInputCoat.value = wizardCoat.style.fill;
  });

  /*  Задание цвета глазам, одновременно присваиваем соответствующему инпуту значение */
  /* Обработчик события - клик на глазах волшебника */
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = window.util.getRandomItem('eyes');
    setupInputEyes.value = wizardEyes.style.fill;
  });

  /*  Задание цвета файерболу и соответствующему инпуту значение */
  /* Обработчик события - клик на файербол */
  wizardFireball.addEventListener('click', function () {
    var color = window.util.getRandomItem('fireball');
    wizardFireball.style.background = color;
    setupInputFireball.value = color;
  });
})();
