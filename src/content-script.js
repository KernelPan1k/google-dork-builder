const buttonHtml = "<a class='google-dork-builder'><img style='height: 20px;' src='data:image/png;base64,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' /> </a>";
const buttonHtmlLarge = "<a class='google-dork-builder'><img style='height: 40px;' src='data:image/png;base64,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' /> </a>";
const LIST = 'list';
const DETAIL = 'detail';

function getPageType() {
  const pathName = window.location.pathname;

  if (/^\/google-hacking-database$/.test(pathName)) {
    return LIST;
  }

  if (/^\/ghdb\/[0-9]+$/.test(pathName)) {
    return DETAIL;
  }

  return null;
}

function sendToSidebar(event) {
  let dork;
  const button = event.currentTarget;
  const parent = button.parentNode;
  let next = null;

  try {
    switch (getPageType()) {
      case LIST:
        next = parent.nextSibling;
        dork = next.innerText;
        break;
      case DETAIL:
        next = parent.querySelector('h1');
        dork = next.innerText;
        break;
      default:
        dork = null;
    }
  } catch (e) {
    console.error(e);
    dork = null;
  }

  const checkSidebarSending = browser.runtime.sendMessage({
    isOpen: "the sidebar is open please"
  });

  if (dork) {
    browser.runtime.sendMessage({
      dork,
    }).catch(err => console.log(err));
  }
}

function fromList() {
  console.log("In list");

  const table = document.querySelector("#exploits-table");

  if (!table) {
    return;
  }

  function bindEvents() {
    const buttons = table.querySelectorAll(".google-dork-builder");
    const l = buttons.length;

    for (let i = 0; i < l; i++) {
      buttons[i].addEventListener('click', sendToSidebar, false);
    }
  }

  function setButtons() {
    const rows = table.querySelectorAll("tbody tr");
    const l = rows.length;
    let setEvent = false;

    for (let i = 0; i < l; i++) {
      const column = rows[i].querySelector("td");

      if (!column.querySelector('.google-dork-builder')) {
        column.innerHTML = buttonHtml + column.innerHTML;
        setEvent = true;
      }
    }

    if (setEvent) {
      bindEvents();
    }
  }

  const config = { attributes: false, childList: true, subtree: true };
  const observer = new MutationObserver(setButtons);
  observer.observe(table, config);
}

function fromDetail() {
  console.log("In detail");

  const title = document.querySelector("h1.card-title");
  const parent = title.parentNode;

  if (!title || !parent) {
    return;
  }

  if (!parent.querySelector('.google-dork-builder')) {
    parent.innerHTML = buttonHtmlLarge + parent.innerHTML;
    parent.querySelector('.google-dork-builder').addEventListener('click', sendToSidebar, false);
  }
}

switch (getPageType()) {
  case DETAIL:
    fromDetail();
    break;
  case LIST:
    fromList()
    break;
}
