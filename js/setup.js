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
userDialog.classList.remove('hidden');

/* Найти блок с похожими персонажами и взять оттуда шаблон */
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

/* Подготовили фрагмент с персонажами и вставили его в блок с похожими персонажами */
var fragmentWizards = createFragmentWizards(wizards, similarWizardTemplate);
similarListElement.appendChild(fragmentWizards);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
