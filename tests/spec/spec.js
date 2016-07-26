describe("App", function() {
  "use strict";

  beforeEach(function() {
    this.root = document.createElement("div");
    this.subject = new daxter.App(this.root, 0, 0);
  });

  describe("When the app launches", function() {
    it("should show the home controller", function() {
      var controller = this.subject._controller;
      expect(controller).toEqual(jasmine.any(daxter.HomeController));
      expect(controller._root.parentNode).toBe(this.root);
    });
  });
});
