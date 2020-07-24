const openSidebar = () => browser.sidebarAction.open();

const operators = [
  "filetype",
  "site",
  "intitle",
  "allintitle",
  "inurl",
  "allinurl",
  "intext",
  "allintext",
  "inanchor",
  "allinanchor",
  "cache",
  "source",
  "define",
  "related",
  "blogurl",
  "stocks",
  "define",
  "loc",
  "location",
  "map",
  "movie"
];

browser.contextMenus.removeAll();

for (let i = 0, l = operators.length; i < l; i++) {
  browser.contextMenus.create({
    id: operators[i] + ":",
    title: operators[i],
    contexts: ["selection"]
  });
}

browser.browserAction.onClicked.addListener(openSidebar);

browser.contextMenus.onClicked.addListener((info, tab) => {
  openSidebar();

  const selectedText = (info.selectionText || '').trim();
  const operator = info.menuItemId;

  setTimeout(() => {
    browser.runtime.sendMessage({
      selectedText,
      operator
    }).catch(err => console.log(err));
  }, 350);
});

browser.runtime.onMessage.addListener((request) => {
  if (request.isOpen) {
    browser.sidebarAction.isOpen({}).then(isOpen => {
      if (!isOpen) {
        browser.notifications.create({
          type: "basic",
          title: "Google Dork Builder",
          message: "You must open the sidebar to save your dorks."
        });
      }
    });
  }
});
