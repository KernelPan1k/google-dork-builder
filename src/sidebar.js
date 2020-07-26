const dorkList = document.querySelector("#dork-list");
const requestField = document.querySelector("#result-request");
const dorksTable = document.querySelector("#dorks-storage");
const dorksTableBody = dorksTable.querySelector("tbody");
const editRow = document.querySelector("#edit");
const BASE_URL = "https://www.google.com/search?q=";
let storage = chrome.storage.sync;

let dorksSavedList = {};
let rowIdEdit = null;
let dataTableNode = null;

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

const bindRun = event => {
  const data = dataTableNode.row($(event.currentTarget).parents('tr')).data();

  if (!data.dorks) {
    return;
  }

  const url = BASE_URL + encodeURIComponent(data.dorks);
  browser.tabs.create({ url, active: true });
};

const bindRemove = event => {
  const data = dataTableNode.row($(event.currentTarget).parents('tr')).data();
  removeDorkInStorage(data.id);
};

const bindEdit = event => {
  const data = dataTableNode.row($(event.currentTarget).parents('tr')).data();
  rowIdEdit = data.id;
  requestField.value = data.dorks;
  editRow.removeAttribute("disabled");
};

const populateTable = () => {
  const list = dorksSavedList.list || [];
  const data = [];

  $(dorksTableBody).empty();

  if (null !== dataTableNode) {
    dataTableNode.destroy();
    dataTableNode = null;
  }

  if (!list.length) {
    dorksTable.style.visibility = "hidden";
    return;
  }

  dorksTable.style.visibility = "visible";

  for (let i = 0, l = list.length; i < l; i++) {
    data.push({ dorks: list[i].request, id: list[i].id });
  }

  let buttonHtml = '<a class="remove-row button"><img src="icons/delete.png" alt="delete" /></a>';
  buttonHtml += '<a class="edit-row button"><img src="icons/edit.png" alt="edit" /></a>';
  buttonHtml += '<a class="run-row button"><img src="icons/search.png" alt="search" /></a>';

  dataTableNode = $(dorksTable).DataTable({
    data,
    autoWidth: true,
    columnDefs: [
      {
        targets: [0],
        searchable: true,
        sortable: true,
        visible: true,
      },
      {
        targets: [1],
        visible: false,
        searchable: false,
        sortable: false,
      },
      {
        targets: [2],
        data: null,
        searchable: false,
        defaultContent: buttonHtml,
        sortable: false,
        visible: true,
      },
    ],
    columns: [
      { data: 'dorks' },
      { data: 'id' },
      { data: 'actions' },
    ]
  });

  resetEdit();
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

$(dorksTableBody).on('click', ".edit-row", bindEdit);
$(dorksTableBody).on('click', ".remove-row", bindRemove);
$(dorksTableBody).on('click', ".run-row", bindRun);
