const dorkList = document.querySelector("#dork-list");
const txtarea = document.querySelector("#result-request");
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
  "blogurl"
];

let options = "";

for (let i = 0, l = operators.length; i < l; i++) {
  options += '<option value="%s:">%s</option>'.replace(/%s/g, operators[i]);
}

dorkList.innerHTML = options;

const insertInField = (text) => {
  // https://stackoverflow.com/questions/1064089/inserting-a-text-where-cursor-is-using-javascript-jquery/1064139
  const scrollPos = txtarea.scrollTop;
  let strPos = txtarea.selectionStart;
  const front = (txtarea.value).substring(0, strPos);
  const back = (txtarea.value).substring(strPos, txtarea.value.length);

  txtarea.value = front + text + back;
  strPos = strPos + text.length;
  txtarea.selectionStart = strPos;
  txtarea.selectionEnd = strPos;
  txtarea.focus();
  txtarea.scrollTop = scrollPos;
};

document.querySelector("#add-dork").addEventListener('click', () => {
  insertInField(dorkList.value)
}, false);

document.querySelector("#search").addEventListener('click', () => {
  const request = txtarea.value.trim();

  if (!request) {
    return;
  }

  const url = "https://www.google.com/search?q=" + request;
  browser.tabs.create({ url, active: true });
}, false);

browser.runtime.onMessage.addListener(request => {
  const selectedText = request.selectedText;
  const operator = request.operator;
  insertInField(operator + selectedText);
});
