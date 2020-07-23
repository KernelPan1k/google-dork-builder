const dorkList = document.querySelector("#dork-list");
const requestField = document.querySelector("#result-request");
const dorksTable = document.querySelector("#dorks-storage");
const dorksTableBody = dorksTable.querySelector("tbody");
const editRow = document.querySelector("#edit");
const BASE_URL = "https://www.google.com/search?q=";
let storage = chrome.storage.sync;

let dorksSavedList = {};
let rowIdEdit = null;

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

let options = "";

for (let i = 0, l = operators.length; i < l; i++) {
  options += `<option value="${ operators[i] }:">${ operators[i] }</option>`;
}

dorkList.innerHTML = options;

const update = dorks => {
  if (dorks) {
    dorksSavedList = dorks;
    populateTable();
  }
};

const storeChanged = () => {
  storage.get(null, update);
  console.log("Storage update");
};

const onChanged = chrome.storage.onChanged;

if (!onChanged.hasListener(storeChanged)) {
  onChanged.addListener(storeChanged);
}

const initStorage = ok => {
  if (!ok) {
    storage = chrome.storage.local;
    console.log("Use local storage");
  }

  storeChanged();
};

storage.get(null, initStorage);

const insertInField = text => {
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

const editDorkInStorage = (id, request) => {
  const list = dorksSavedList.list || [];

  for (let i = 0, l = list.length; i < l; i++) {
    if (list[i].id === id) {
      list[i].request = request;
    }
  }

  dorksSavedList.list = list;

  storage.set(dorksSavedList, () => {
    console.log(`Edit: id => ${ id }, request => ${ request }`);
  });

  populateTable();
};

const removeDorkInStorage = id => {
  let list = dorksSavedList.list || [];
  list = list.filter(el => el.id !== id);
  dorksSavedList.list = list;

  storage.set(dorksSavedList, () => {
    console.log(`Remove: id => ${ id }`);
  });

  populateTable();
};

const saveDorkInStorage = data => {
  const list = dorksSavedList.list || [];
  list.push(data);
  dorksSavedList.list = list;

  storage.set(dorksSavedList, () => {
    console.log(`Save: id => ${ data.id }, request => ${ data.request }`);
  });

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

  const url = BASE_URL + encodeURIComponent(request);
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

const populateTable = () => {
  const list = dorksSavedList.list || [];

  if (!list.length) {
    dorksTable.style.visibility = "hidden";
    return;
  }

  dorksTable.style.visibility = "visible";
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

  const url = BASE_URL + request;
  browser.tabs.create({ url, active: true });
}, false);

browser.runtime.onMessage.addListener(request => {
  if (!request) {
    return;
  }

  if (request.dork) {
    const id = generateId();
    saveDorkInStorage({ id, request: request.dork });
  } else if (request.selectedText && request.operator) {
    const selectedText = request.selectedText;
    const operator = request.operator;
    insertInField(operator + selectedText);
  }
});
