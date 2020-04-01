const {initializeWithTab} = require("../common");

describe("#1607", function () {
  describe("when the user has one window and one container", function () {
    it("should not have any action and only have one window", async function () {
      const webExtension = await initializeWithTab({
        cookieStoreId: "firefox-container-1",
        url: "http://example.com"
      });

      await webExtension.popup.helper.clickElementById("sort-containers-link-window");

      const responses = {};
      await webExtension.background.browser.tabs._create({
        url: "https://example.com"
      }, {
        options: {
          webRequestRedirects: ["https://example.com"],
          webRequestError: true,
          instantRedirects: true
        },
        responses
      });

      webExtension.browser.tabs.move.should.have.been.not.calledOnce;
      

      webExtension.destroy();
    });
  });
});