const dorkList = document.querySelector("#dork-list");
const requestField = document.querySelector("#result-request");
const dorksTable = document.querySelector("#dorks-storage");
const dorksTableBody = dorksTable.querySelector("tbody");
const editRow = document.querySelector("#edit");
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
  "blogurl"
];

let options = "";

for (let i = 0, l = operators.length; i < l; i++) {
  options += `<option value="${ operators[i] }:">${ operators[i] }</option>`;
}

dorkList.innerHTML = options;

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

const onError = (error) => {
  console.error(`Error: ${ error }`);
};

const getDorksSaved = () => browser.storage.sync.get();

const resetEdit = () => {
  rowIdEdit = null;
  editRow.setAttribute("disabled", "disabled");
};

const bindRun = () => {
  Array.prototype.slice.call(dorksTable.querySelectorAll(".run-row"))
  .forEach(row => {
    row.addEventListener('click', event => {
      const parent = event.currentTarget.closest("tr");
      const request = parent.querySelector("td").innerHTML.trim();

      if (!request) {
        return;
      }

      const url = "https://www.google.com/search?q=" + request;
      browser.tabs.create({ url, active: true });
    }, false);
  });
};

const bindRemove = () => {
  Array.prototype.slice.call(dorksTable.querySelectorAll(".remove-row"))
  .forEach(row => {
    row.addEventListener('click', event => {
      const parent = event.currentTarget.closest("tr");
      const id = parent.getAttribute("data-row-id");

      getDorksSaved().then(dorks => {
        let list = dorks.list || [];
        list = list.filter(el => el.id !== id);
        dorks.list = list;
        browser.storage.sync.set(dorks);
        populateTable();
      });
    }, false);
  });
};

const bindEdit = () => {
  Array.prototype.slice.call(dorksTable.querySelectorAll(".edit-row"))
  .forEach(row => {
    row.addEventListener('click', event => {
      const parent = event.currentTarget.closest("tr");
      rowIdEdit = parent.getAttribute("data-row-id");
      requestField.value = parent.querySelector("td").innerHTML.trim();
      editRow.removeAttribute("disabled");
    }, false);
  });
};

const bindEvent = () => {
  resetEdit();
  bindRun();
  bindRemove();
  bindEdit()
};

const populateTable = () => {
  getDorksSaved().then(dorks => {
    const list = dorks.list || [];
    let rows = "";

    for (let i = 0, l = list.length; i < l; i++) {
      rows += `<tr data-row-id="${ list[i].id }">
                <td>${ list[i].request }</td>
                <td>
                    <button class="edit-row">Edit</button>
                    <button class="remove-row">Remove</button>
                    <button class="run-row">Search</button>
                </td>
               </tr>`;
    }

    dorksTableBody.innerHTML = rows;
    bindEvent();

  }).catch(onError);
};


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

// browser.storage.sync.clear();

document.querySelector("#save").addEventListener('click', () => {
  const request = requestField.value.trim();

  if (!request) {
    return;
  }

  const id = generateId();

  getDorksSaved().then(dorks => {
    const list = dorks.list || [];
    list.push({ id, request });
    dorks.list = list;
    browser.storage.sync.set(dorks);
    populateTable();
  }).catch(onError);
}, false);

editRow.addEventListener('click', () => {
  const request = requestField.value.trim();

  if (!request) {
    return;
  }

  getDorksSaved().then(dorks => {
    const list = dorks.list || [];
    for (let i = 0, l = list.length; i < l; i++) {
      if (list[i].id === rowIdEdit) {
        list[i].request = request;
      }
    }
    dorks.list = list;
    browser.storage.sync.set(dorks);
    populateTable();
  }).catch(onError);
}, false);


populateTable();
