'use strict';

/* Служебные функции и константы */
(function () {

  var NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'];

  var SURNAME = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'];

  var COAT = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'];

  var EYES = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'];

  var FIREBALL = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'];

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomItem: function (typeAtribute) {
      if (typeAtribute === 'names') {
        return NAMES[Math.floor(Math.random() * NAMES.length)];
      } else if (typeAtribute === 'surname') {
        return SURNAME[Math.floor(Math.random() * SURNAME.length)];
      } else if (typeAtribute === 'coat') {
        return COAT[Math.floor(Math.random() * COAT.length)];
      } else if (typeAtribute === 'eyes') {
        return EYES[Math.floor(Math.random() * EYES.length)];
      } else if (typeAtribute === 'fireball') {
        return FIREBALL[Math.floor(Math.random() * FIREBALL.length)];
      }
      return '';
    }
  };
})();
