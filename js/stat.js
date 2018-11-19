'use strict';

var renderStatistics = function (ctx, names, times) { // eslint-disable-line no-unused-vars
  /* проверка ругается на то что функция не вызывается в этом же файле.
  как исправить это я не знаю, вызывать ее здесь незачем.
  поэтому отключила эту строку от проверки */
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.fillRect(100, 10, 420, 270);
  ctx.baseline = 'hanging';
  ctx.font = '20px Tahoma';
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillText('Ура вы победили!', 220, 40);
  ctx.fillText('Список результатов:', 210, 60);

  var max = 0;
  for (var i = 0; i < names.length; i++) {
    if (times[i] > max) {
      max = times[i];
    }
  }

  for (i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var color = Math.random();
      if (color < 0.2) {
        color = 0.2;
      }
      ctx.fillStyle = 'rgba(0, 0, 255,' + color + ')';
    }
    ctx.fillRect(170 + i * 80, 250 - 150 * times[i] / max, 40, 150 * times[i] / max);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText(names[i], 170 + i * 80, 270);
    ctx.fillText(Math.floor(times[i]), 170 + i * 80, 240 - 150 * times[i] / max);
  }
};
