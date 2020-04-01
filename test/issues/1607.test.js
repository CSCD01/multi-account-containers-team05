const {initializeWithTab} = require("../common");

describe("#1607", function () {
  describe("when the user has one window and one container", function () {
    it("should not have any action and only have one window", async function () {
      const webExtension = await initializeWithTab({
        cookieStoreId: "firefox-container-1",
        url: "http://example.com"
      });

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

      await webExtension.popup.helper.clickElementById("sort-containers-link-window");

      webExtension.browser.tabs.move.should.have.been.not.calledOnce;


      webExtension.destroy();
    });
  });

  describe("when the user has two windows with tabs of one type of container", function() {
    it("should only have one window with all the tabs", async function() {
      const webExtension = await initializeWithTab({
        cookieStoreId: "firefox-container-1",
        url: "http://example.com"
      });
      const webExtension2 = await initializeWithTab({
        cookieStoreId: "firefox-container-2",
        url: "http://example.com"
      });

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

      await webExtension2.background.browser.tabs._create({
        url: "https://example.com"
      }, {
        options: {
          webRequestRedirects: ["https://example.com"],
          webRequestError: true,
          instantRedirects: true
        },
        responses
      });

      await webExtension.popup.helper.clickElementById("sort-containers-link-window");

      webExtension.browser.tabs.move.should.have.been.calledOnce && webExtension2.browser.tabs.move.should.have.been.calledOnce;

      webExtension.destroy();
    });
  });
});