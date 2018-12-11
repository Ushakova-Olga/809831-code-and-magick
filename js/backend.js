'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';
  var CALLBACK_NAME = '__jsonpCallback';

  window.backend = {
    load: function (onLoad, onError) {
      var loadRequest = createRequestJson('GET', URL_LOAD, onLoad, onError);
      loadRequest.send();
    },

    save: function (data, onLoad, onError) {
      var saveRequest = createRequestJson('POST', URL_SAVE, onLoad, onError);
      saveRequest.send(data);
    },

    loadJsonp: function (onLoad, onError) {
      window[CALLBACK_NAME] = function (data) {
        onLoad(data);
      };

      var loader = document.createElement('script');
      loader.src = URL_LOAD + '?callback=' + CALLBACK_NAME;

      loader.addEventListener('error', function () {
        onError('Произошла ошибка');
      });
      document.body.append(loader);
    }
  };

  var createRequestJson = function (method, url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    xhr.open(method, url);
    return xhr;
  };
})();
