describe("App", function() {
  "use strict";

  beforeEach(function() {
    this.root = document.createElement("div");
    daxter.boot(this.root);
  });

  describe("When the app launches", function() {
    it("should show the home controller", function() {
      var controller = daxter._controller;
      expect(controller).toEqual(jasmine.any(daxter.HomeController));
      expect(controller._root.parentNode).toBe(this.root);
    });
  });
});
