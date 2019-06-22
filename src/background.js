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
  const selectedText = (info.selectionText || '').trim();
  const operator = info.menuItemId;

  openSidebar();

  browser.runtime.sendMessage({
    selectedText,
    operator
  }).catch(err => console.log(err));
});
