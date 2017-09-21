(function() {
  "use strict";

  daxter.Controller = class {
    createDom() {
      throw new Error("Must override createDom()!");
    }

    _get(uri, callback, param) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          callback(JSON.parse(xhr.responseText), param);
        }
      };
      xhr.open("GET", uri, true);
      xhr.send(null);
    };
  };
})();
