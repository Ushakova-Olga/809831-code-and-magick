'use strict';

/* Генерация похожих персонажей */
(function () {
  /* спрятанный блок с персонажем */
  var setup = document.querySelector('.setup');
  /* блок с похожими персонажами и взять оттуда шаблон */
  var similarListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  /* Генерация персонажа со случайным набором данных */
  var generate = function (numPersonages) {
    var arrayPersonages = [];

    for (var i = 0; i < numPersonages; i++) {
      var personageName;
      var order = Math.floor(Math.random() * 2);
      var name = window.util.getRandomItem('names');
      var surname = window.util.getRandomItem('surname');

      if (order) {
        personageName = name + ' ' + surname;
      } else {
        personageName = surname + ' ' + name;
      }

      arrayPersonages[i] = {
        name: personageName,
        coatColor: window.util.getRandomItem('coat'),
        eyesColor: window.util.getRandomItem('eyes')
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

  /* Подготовили фрагмент с персонажами и вставили его в блок с похожими персонажами */
  var fragmentWizards = createFragmentWizards(wizards, similarWizardTemplate);
  similarListElement.appendChild(fragmentWizards);
  setup.querySelector('.setup-similar').classList.remove('hidden');
})();
