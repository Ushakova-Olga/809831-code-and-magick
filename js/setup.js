// Файл setup.js
'use strict';

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

var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/* Генерация персонажа со случайным набором данных */
var generate = function (numPersonages) {
  var arrayPersonages = [];

  for (var i = 0; i < numPersonages; i++) {
    var personageName;
    var order = Math.floor(Math.random() * 2);
    var name = getRandomItem(NAMES);
    var surname = getRandomItem(SURNAME);

    if (order) {
      personageName = name + ' ' + surname;
    } else {
      personageName = surname + ' ' + name;
    }

    arrayPersonages[i] = {
      name: personageName,
      coatColor: getRandomItem(COAT),
      eyesColor: getRandomItem(EYES)
    };
  }
  return arrayPersonages;
};

/* создание DOM-элемента на основе JS-объекта */
var renderWizard = function (wizard, template) {
  var wizardElement = template.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

/* функция заполнения блока DOM-элементами на основе массива JS-объектов */
var createFragmentWizards = function (arr, template) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i], template));
  }
  return fragment;
};

var wizards = generate(4);

/* Найти и показать спрятанный блок с персонажем */
var userDialog = document.querySelector('.setup');

/* Найти блок с похожими персонажами и взять оттуда шаблон */
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

/* Подготовили фрагмент с персонажами и вставили его в блок с похожими персонажами */
var fragmentWizards = createFragmentWizards(wizards, similarWizardTemplate);
similarListElement.appendChild(fragmentWizards);
userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Нажатие на элемент .setup-open приводит
var setupOpen = document.querySelector('.setup-open');

// к появлению диалогового окна .setup.
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

/* Обработчик события - нажатие на ESC */
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
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
};

/* Обработчик события - клик на аватарке */
setupOpen.addEventListener('click', function () {
  openPopup();
});

/* Обработчик события - нажатие Enter на аватарке */
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

/* Обработчик события - клик на крестике */
setupClose.addEventListener('click', function () {
  closePopup();
});

/* Обработчик события - нажатие Enter на крестике */
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var userNameInput = setup.querySelector('.setup-user-name');
/* Обработчик события ввод в поле - имя пользователя */
userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

/*  Задание цвета плащу, одновременно присваиваем первому инпуту значение */
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var setupInput = document.querySelectorAll('.setup-player input');

/* Обработчик события - клик на плаще волшебника */
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getRandomItem(COAT);
  setupInput[0].value = wizardCoat.style.fill;
});

/*  Задание цвета глазам, одновременно присваиваем второму инпуту значение */
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');

/* Обработчик события - клик на глазах волшебника */
wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getRandomItem(EYES);
  setupInput[1].value = wizardEyes.style.fill;
});

/*  Задание цвета файерболу и соответствующему инпуту значение */
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var setupInputFireball = document.querySelector('.setup-fireball-wrap input');

/* Обработчик события - клик на файербол */
wizardFireball.addEventListener('click', function () {
  var color = getRandomItem(FIREBALL);
  wizardFireball.style.background = color;
  setupInputFireball.value = color;
});
