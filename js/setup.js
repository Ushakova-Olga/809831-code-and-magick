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
  /* var generate = function (numPersonages) {
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
  };*/

  /* создание DOM-элемента на основе JS-объекта */
  var renderWizard = function (wizard, template) {
    var wizardElement = template.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat; /* coatColor;*/
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes; /* eyesColor;*/

    return wizardElement;
  };

  /* функция заполнения блока DOM-элементами на основе массива JS-объектов */
  /* var createFragmentWizards = function (arr, template) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderWizard(arr[i], template));
    }
    return fragment;
  };

  var wizards = generate(4);*/

  /* Подготовили фрагмент с персонажами и вставили его в блок с похожими персонажами */
  /* var fragmentWizards = createFragmentWizards(wizards, similarWizardTemplate);
  similarListElement.appendChild(fragmentWizards);
  setup.querySelector('.setup-similar').classList.remove('hidden');*/

  /* 6 Задание */
  /* Отправить данные из формы про нашего волшебника на сервер */
  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

  /* В случае если данные успешно получены */
  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
    }
    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    /* Создаем DOM - элемент с сообщением об ошибке */
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);
  /* window.backend.loadJsonp(successHandler, errorHandler);*/
})();
