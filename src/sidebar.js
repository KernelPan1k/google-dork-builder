const dorkList = document.querySelector("#dork-list");
const requestField = document.querySelector("#result-request");
const dorksTable = document.querySelector("#dorks-storage");
const dorksTableBody = dorksTable.querySelector("tbody");
const editRow = document.querySelector("#edit");
const storage = browser.storage.sync;
let dorksSavedList = {};

let rowIdEdit = null;

const insertInField = (text) => {
  // https://stackoverflow.com/questions/1064089/inserting-a-text-where-cursor-is-using-javascript-jquery/1064139
  const scrollPos = requestField.scrollTop;
  let strPos = requestField.selectionStart;
  const front = (requestField.value).substring(0, strPos);
  const back = (requestField.value).substring(strPos, requestField.value.length);

  requestField.value = front + text + back;
  strPos = strPos + text.length;
  requestField.selectionStart = strPos;
  requestField.selectionEnd = strPos;
  requestField.focus();
  requestField.scrollTop = scrollPos;
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const getDorksInStorage = () => storage.get();

const editDorkInStorage = (id, request) => {
  const list = dorksSavedList.list || [];

  for (let i = 0, l = list.length; i < l; i++) {
    if (list[i].id === id) {
      list[i].request = request;
    }
  }

  dorksSavedList.list = list;
  storage.set(dorksSavedList);

  populateTable();
};

const removeDorkInStorage = id => {
  let list = dorksSavedList.list || [];
  list = list.filter(el => el.id !== id);
  dorksSavedList.list = list;
  storage.set(dorksSavedList);
  populateTable();
};

const saveDorkInStorage = data => {
  const list = dorksSavedList.list || [];
  list.push(data);
  dorksSavedList.list = list;
  storage.set(dorksSavedList);
  populateTable();
};

const resetEdit = () => {
  rowIdEdit = null;
  editRow.setAttribute("disabled", "disabled");
};

const getRows = (selector, cb) => {
  Array.prototype.slice.call(dorksTable.querySelectorAll(selector))
  .forEach(row => {
    row.addEventListener('click', cb, false);
  });
};

const bindRun = event => {
  const parent = event.currentTarget.closest("tr");
  const request = parent.querySelector("td").innerHTML.trim();

  if (!request) {
    return;
  }

  const url = "https://www.google.com/search?q=" + request;
  browser.tabs.create({ url, active: true });
};

const bindRemove = event => {
  const parent = event.currentTarget.closest("tr");
  const id = parent.getAttribute("data-row-id");
  removeDorkInStorage(id);
};

const bindEdit = event => {
  const parent = event.currentTarget.closest("tr");
  rowIdEdit = parent.getAttribute("data-row-id");
  requestField.value = parent.querySelector("td").innerHTML.trim();
  editRow.removeAttribute("disabled");
};

const bindEvent = () => {
  resetEdit();
  getRows(".edit-row", bindEdit);
  getRows(".remove-row", bindRemove);
  getRows(".run-row", bindRun);
};

const getDorkList = cb => getDorksInStorage().then(dorks => {
  dorksSavedList = dorks;
  cb();
});

const populateTable = () => {
  const list = dorksSavedList.list || [];

  if (!list.length) {
    dorksTable.style.display = "none";
    return;
  }

  dorksTable.style.display = "block";
  let rows = "";

  for (let i = 0, l = list.length; i < l; i++) {
    rows += `<tr data-row-id="${ list[i].id }">
                <td>${ list[i].request }</td>
                <td>
                    <a class="remove-row button"><img src="icons/delete.png" alt="delete" /></a>
                    <a class="edit-row button"><img src="icons/edit.png" alt="edit" /></a>
                    <a class="run-row button"><img src="icons/search.png" alt="search" /></a>
                </td>
               </tr>`;
  }

  dorksTableBody.innerHTML = rows;
  bindEvent();
};

const init = () => {
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
    options += `<option value="${ operators[i] }:">${ operators[i] }</option>`;
  }

  dorkList.innerHTML = options;

  getDorkList(populateTable);
};

document.querySelector("#save").addEventListener('click', () => {
  const request = requestField.value.trim();
  const id = generateId();

  if (!request) {
    return;
  }

  saveDorkInStorage({ id, request });
}, false);

editRow.addEventListener('click', () => {
  const request = requestField.value.trim();

  if (!request || !rowIdEdit) {
    return;
  }

  editDorkInStorage(rowIdEdit, request);
}, false);

document.querySelector("#add-dork").addEventListener('click', () => {
  insertInField(dorkList.value)
}, false);

document.querySelector("#search").addEventListener('click', () => {
  const request = requestField.value.trim();

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

init();
