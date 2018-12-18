'use strict';

/* Вспомогательный модуль для отрисовки и фильтрации похожих волшебников по заданным критериям - цвет плаща и т.д. */
(function () {
  var NUMBER_SIMILAR_WIZARDS_IN_BLOCK = 4;
  var setup = document.querySelector('.setup');
  /* блок с похожими персонажами и взять оттуда шаблон */
  var similarListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  /* создание DOM-элемента на основе JS-объекта */
  var renderWizard = function (wizard, template) {
    var wizardElement = template.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var clean = function () {
    for (var i = 0; i < NUMBER_SIMILAR_WIZARDS_IN_BLOCK; i++) {
      similarListElement.removeChild(setup.querySelector('.setup-similar-item'));
    }
  };

  window.filter = {
    range: function (wizards, goalCoat, goalEyes, goalFireball) {
      var wizardsCopy = wizards.slice();
      wizardsCopy.forEach(function (wizard) {
        wizard.range = 0;
        if (wizard.colorCoat === goalCoat) {
          wizard.range += 50;
        }
        if (wizard.colorEyes === goalEyes) {
          wizard.range += 30;
        }
        if (wizard.colorFireball === goalFireball) {
          wizard.range += 10;
        }
      });
      wizardsCopy.sort(function (first, second) {
        if (first.range < second.range) {
          return 1;
        } else if (first.range > second.range) {
          return -1;
        } else {
          return 0;
        }
      });

      return wizardsCopy;
    },
    appendWizards: function (wizards) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < NUMBER_SIMILAR_WIZARDS_IN_BLOCK; i++) {
        fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
      }
      similarListElement.appendChild(fragment);
      setup.querySelector('.setup-similar').classList.remove('hidden');
    },
    updateWizards: function (wizards) {
      clean();
      window.filter.appendWizards(wizards);
    }
  };
})();
