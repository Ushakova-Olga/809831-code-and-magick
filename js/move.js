'use strict';

/* Перетаскивание окна */
(function () {
  var setup = document.querySelector('.setup');
  var dialogHandler = setup.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    /* Запомнить точки, с которых начали перетаскивать */
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    /* При каждом движении мыши надо обновить координаты */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    /* При отпускании кнопки мыши надо перестать слушать события мыши */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      /* При отпускании мыши если было перемещение, действие по умолчанию отменяем */
      if (dragged) {
        var onClickPreventDefault = function (drEvt) {
          drEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    /* Обработчики перемещения мыши и отпускания мыши */
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
