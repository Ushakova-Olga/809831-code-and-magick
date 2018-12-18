'use strict';

/* Работа блоком setup - открытие окна, закрытие, \
обработка текстового поля ввода - имя  */
(function () {
  /* спрятанный блок с персонажем */
  var setup = document.querySelector('.setup');

  /* Аватарка по нажатию которой открывается setup*/
  var setupOpen = document.querySelector('.setup-open');

  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');

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
})();
