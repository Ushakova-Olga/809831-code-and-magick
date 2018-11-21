'use strict';

/* Сделала по демке с использованием констант*/
var CLOUD_HEIGHT = 270;
var GAP = 10;
var MAX_BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var TEXT_HEIGHT = 20;
var HEADER_LINE_WIDTH = [180, 200];

var renderCloud = function (ctx, x, y, color, cloudWidth) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudWidth, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var max = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};

window.renderStatistics = function (ctx, names, times) {
  /* Из демки поняла что надо бы еще массивы привести к одинаковой длине, если они по ошибке переданы разной длины
  Протестировала, добавив несколько элементов в names и наоборот в times*/
  var i = 0;
  var cloudWidth = 420;
  if (names.length < times.length) {
    for (i = names.length; i < times.length; i++) {
      names[i] = 'Pl' + i;
    }
  }

  if (names.length > times.length) {
    for (i = times.length; i < names.length; i++) {
      times[i] = 0;
    }
  }

  var lengthArray = names.length;
  var maxTime = getMaxElement(times);
  var barGap = Math.floor((cloudWidth - lengthArray * BAR_WIDTH) / (lengthArray + 1));

  /* Если переданный массив слишком длинный, то облако расширяется в ширину */
  if ((cloudWidth - lengthArray * BAR_WIDTH) <= 0) {
    cloudWidth = lengthArray * BAR_WIDTH + GAP * (lengthArray + 1);
    barGap = Math.floor((cloudWidth - names.length * BAR_WIDTH) / (lengthArray + 1));
  }

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)', cloudWidth);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgb(255, 255, 255)', cloudWidth);
  ctx.baseline = 'hanging';
  ctx.font = '20px Tahoma';
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillText('Ура вы победили!', CLOUD_X + (cloudWidth - HEADER_LINE_WIDTH[0]) / 2, 2 * TEXT_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + (cloudWidth - HEADER_LINE_WIDTH[1]) / 2, 3 * TEXT_HEIGHT);

  for (i = 0; i < lengthArray; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var color = Math.random();
      if (color < 0.2) {
        color = 0.2;
      }
      ctx.fillStyle = 'rgba(0, 0, 255,' + color + ')';
    }
    var x = CLOUD_X + barGap + i * (barGap + BAR_WIDTH);
    var barHeight = MAX_BAR_HEIGHT * times[i] / maxTime;
    var y = CLOUD_HEIGHT - 2 * GAP - barHeight;

    ctx.fillRect(x, y, BAR_WIDTH, barHeight);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText(names[i], x, CLOUD_HEIGHT);
    ctx.fillText(Math.floor(times[i]), x, y - GAP);
  }
};
