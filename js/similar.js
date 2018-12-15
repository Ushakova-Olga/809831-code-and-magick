'use strict';

(function () {

  window.similar = {
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
    change: function (wizardsCopy) {
      var setup = document.querySelector('.setup');
      /* блок с похожими персонажами и взять оттуда шаблон */
      var similarListElement = setup.querySelector('.setup-similar-list');
      var similarWizardTemplate = document.querySelector('#similar-wizard-template')
          .content
          .querySelector('.setup-similar-item');

      for (var i = 0; i < 4; i++) {
        similarListElement.removeChild(setup.querySelector('.setup-similar-item'));
      }

      var fragment = document.createDocumentFragment();
      for (i = 0; i < 4; i++) {
        fragment.appendChild(window.setup.renderWizard(wizardsCopy[i], similarWizardTemplate));
      }
      similarListElement.appendChild(fragment);

      setup.querySelector('.setup-similar').classList.remove('hidden');
    }
  };
})();
/*


console.log(wizardsCopy);

var fragment = document.createDocumentFragment();
for (var i = 0; i < 4; i++) {
  fragment.appendChild(renderWizard(wizardsCopy[i], similarWizardTemplate));
}
similarListElement.appendChild(fragment);*/
