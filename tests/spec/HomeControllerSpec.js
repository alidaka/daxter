describe("HomeController", function() {
  "use strict";

  beforeEach(function() {
    this.root = document.createElement("div");
    this.subject = new daxter.HomeController();
    this.subject.appendTo(this.root);
  });

  describe("When the page loads", function() {
    it("should replace the body", function() {
      expect(this.root.children.length).toEqual(1);
    });
  });
});
