'use strict';

/* Работа с блоком setup - отправка из формы данных на сервер и получение в наш блок данных о волшебниках,
обработчики событий, связаннее с изменением цвета плаща, глаз, файербола, по которым вызывается фильтрация  */
(function () {
  /* спрятанный блок с персонажем */
  var setup = document.querySelector('.setup');
  var setupInputCoat = setup.querySelector('[name="coat-color"]');
  var setupInputEyes = setup.querySelector('[name="eyes-color"]');
  var setupInputFireball = setup.querySelector('.setup-fireball-wrap input');
  var goalEyes = setupInputEyes.value;
  var goalFireball = setupInputFireball.value;
  var goalCoat = setupInputCoat.value;
  var wizardArray = [];
  var wizardsCopy = [];
  var form = setup.querySelector('.setup-wizard-form');

  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  /* Отправить данные из формы про нашего волшебника на сервер */
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

  /* В случае если данные успешно получены */
  var successHandler = function (wizards) {
    wizardArray = wizards.slice();
    goalEyes = setupInputEyes.value;
    goalFireball = setupInputFireball.value;
    goalCoat = setupInputCoat.value;
    wizardsCopy = window.filter.range(wizards, goalCoat, goalEyes, goalFireball);
    window.filter.appendWizards(wizardsCopy);
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

  /*  Задание цвета плащу, одновременно присваиваем соответствующему инпуту значение */
  /* Обработчик события - клик на плаще волшебника */
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = window.util.getRandomItem('coat');
    setupInputCoat.value = wizardCoat.style.fill;

    goalEyes = setupInputEyes.value;
    goalFireball = setupInputFireball.value;
    goalCoat = setupInputCoat.value;
    wizardsCopy = window.filter.range(wizardArray, goalCoat, goalEyes, goalFireball);
    window.debounce(window.filter.updateWizards(wizardsCopy));
  });

  /*  Задание цвета глазам, одновременно присваиваем соответствующему инпуту значение */
  /* Обработчик события - клик на глазах волшебника */
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = window.util.getRandomItem('eyes');
    setupInputEyes.value = wizardEyes.style.fill;

    goalEyes = setupInputEyes.value;
    goalFireball = setupInputFireball.value;
    goalCoat = setupInputCoat.value;
    wizardsCopy = window.filter.range(wizardArray, goalCoat, goalEyes, goalFireball);
    window.debounce(window.filter.updateWizards(wizardsCopy));

  });

  /*  Задание цвета файерболу и соответствующему инпуту значение */
  /* Обработчик события - клик на файербол */
  wizardFireball.addEventListener('click', function () {
    var color = window.util.getRandomItem('fireball');
    wizardFireball.style.background = color;
    setupInputFireball.value = color;

    goalEyes = setupInputEyes.value;
    goalFireball = setupInputFireball.value;
    goalCoat = setupInputCoat.value;
    wizardsCopy = window.filter.range(wizardArray, goalCoat, goalEyes, goalFireball);
    window.debounce(window.filter.updateWizards(wizardsCopy));
  });
})();
