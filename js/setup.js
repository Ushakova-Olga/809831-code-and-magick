// Файл setup.js
'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES = ['black', 'red', 'blue', 'yellow', 'green'];

/* Генерация персонажа со случайным набором данных */
var generate = function (personage) {
  var nameNum = Math.floor(Math.random() * NAMES.length);
  var surnameNum = Math.floor(Math.random() * SURNAME.length);
  var order = Math.floor(Math.random() * 2);
  var coatNum = Math.floor(Math.random() * COAT.length);
  var eyesNum = Math.floor(Math.random() * EYES.length);

  if (order) {
    personage.name = NAMES[nameNum] + ' ' + SURNAME[surnameNum];
  } else {
    personage.name = SURNAME[surnameNum] + ' ' + NAMES[nameNum];
  }

  personage.coatColor = COAT[coatNum];
  personage.eyesColor = EYES[eyesNum];
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
var appendWizards = function (arr, elementDom) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i], similarWizardTemplate));
  }
  elementDom.appendChild(fragment);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

var personage1 = {
  name: '',
  coatColor: '',
  eyesColor: ''
};

var personage2 = {
  name: '',
  coatColor: '',
  eyesColor: ''
};

var personage3 = {
  name: '',
  coatColor: '',
  eyesColor: ''
};

var personage4 = {
  name: '',
  coatColor: '',
  eyesColor: ''
};

var wizards = [personage1, personage2, personage3, personage4];

generate(personage1);
generate(personage2);
generate(personage3);
generate(personage4);

/* Найти и показать спрятанный блок с персонажем */
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

/* Найти блок с похожими персонажами и взять оттуда шаблон */
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

appendWizards(wizards, similarListElement, userDialog);
