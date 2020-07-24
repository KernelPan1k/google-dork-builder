const buttonHtml = "<a class='google-dork-builder'><img style='height: 20px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARLSURBVFhH7VZdTFtlGG7EnxhjvNBFe7cLN7wxZl55I4pmyXYBYVpcy8/+NJBhBq5IaSllc1QYlHaLtdjJLDiDRIxmRFombZgJk004py3bXNmUUmCTDefon7rK5PV7Dx/dOW2BU7xb9iRP8p3vvO/zvN93zvcjuY97Hr+fefLxsOOZdSGntHzu9NPraffacBrgQTYQeZ2djLa4A5EewnOUPexkxOCZiGRjDA3nEHZJXw46pSdCLimQIgZod3q4eBEeJiblbCA6656Mwkokxd1gApF3MYemS3D0pIiFoEvaTLvEg5kIP0eEfYlGInjJezW0kcpIFhzPPkKb4uGeCr9ChIIJwqJJZmMONaicRN3hbtfYvG/Qx2QoO5mnVLbR57FNR55kbncOg+W9GmgrLoXPZDugPX8nfFpUApb9Wu5dYjxhcGkmqo6PZlYfY57Adkpo2j156na3lfvmCdM+/OstMBMTR24xzG4rTeKNvBLoy90BZqUWfrpyk18A0scw8BC1WR34w/EFRsbnwLRrL/hz96Q0X6I/920wlVQA4w/xzeHyzF9AVs8+Kr8ysFL8k/kCZmUtjPPMv8spgNay96FV1wgWTT1YiKk9pxCMpMgUo4fz03/i/3C9GyCD2iwPsoRe4yef+mEE+splcfM28t177YMCA2SP4wwM+a4n9fOJ+wS1WR7uQNTITzpeWwZ3ruXBbed26JUXgt3+o0A0HZLNavV9gHyrk/ykE3o5/DuzjaNNLRcIIiu0eiivN6Wk9rA5IT7yLbVZHqSAYX5S50eKeAFW00Ge2CLzPzTDloGxlCw6dEQQi9rUZnlg0NQfMRif/ZtL6jQXxgswmmoEgsiVCiiuX1sBJ29G5+HaXIxLMhruFqBp2CsQRO5THxRM+1uVdfECSvXCAkR9ggv+38yewN11fKCpEq76t0NOfz1k6uugu/8sT1DIr/uG4M3WrsUCXJegtunjhJhIE7VJjX/YgqwYo5iPeFUYzCV9P3QBXvpACZIvrRyzVZXw1akhnugiOx2DUKA/Gh+9rNkK/WfHBDFkGb5KrVIjxip2z7MKuM3uXPBMBuOJlQ0GePRYS7yIjWQminR1UHXYBMpGAxTodLCh8RBsHTjPmW/9ZhAOGD8RmJMBzay6EUF3fsYdViEfv+xsGvPZMYlLZidCsEtdA49ZDfEiUjGjqw2yunqhQtfA5QgKmAqXUZvVgdsxSRIcRiioaj4KL2ir4IEvLEnm2LdJp4Kq5iNJ5mQb/jmtwwjhng5tIMlJx7Fr+ArsJ9MuI9O+WaPiiG1lYwu4Rn4RxFIGp30d2Qtu2ToqLR54meAuFcmiokiucLfYqXDWPCM3xkYU71DZ9DDqD2USsbSvZDjtOItU5v8BLyh40Uw8plMRj1384RJvx2tCtc27R93h2U0fJbiMcC3jqYY75tK1nGuTTQbfiTrzxaLGNvpi9efeTfTxPu5FSCT/AQcXSSJwPBkhAAAAAElFTkSuQmCC' /></a>"
const buttonHtmlLarge = "<a class='google-dork-builder'><img style='height: 40px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARLSURBVFhH7VZdTFtlGG7EnxhjvNBFe7cLN7wxZl55I4pmyXYBYVpcy8/+NJBhBq5IaSllc1QYlHaLtdjJLDiDRIxmRFombZgJk004py3bXNmUUmCTDefon7rK5PV7Dx/dOW2BU7xb9iRP8p3vvO/zvN93zvcjuY97Hr+fefLxsOOZdSGntHzu9NPraffacBrgQTYQeZ2djLa4A5EewnOUPexkxOCZiGRjDA3nEHZJXw46pSdCLimQIgZod3q4eBEeJiblbCA6656Mwkokxd1gApF3MYemS3D0pIiFoEvaTLvEg5kIP0eEfYlGInjJezW0kcpIFhzPPkKb4uGeCr9ChIIJwqJJZmMONaicRN3hbtfYvG/Qx2QoO5mnVLbR57FNR55kbncOg+W9GmgrLoXPZDugPX8nfFpUApb9Wu5dYjxhcGkmqo6PZlYfY57Adkpo2j156na3lfvmCdM+/OstMBMTR24xzG4rTeKNvBLoy90BZqUWfrpyk18A0scw8BC1WR34w/EFRsbnwLRrL/hz96Q0X6I/920wlVQA4w/xzeHyzF9AVs8+Kr8ysFL8k/kCZmUtjPPMv8spgNay96FV1wgWTT1YiKk9pxCMpMgUo4fz03/i/3C9GyCD2iwPsoRe4yef+mEE+splcfM28t177YMCA2SP4wwM+a4n9fOJ+wS1WR7uQNTITzpeWwZ3ruXBbed26JUXgt3+o0A0HZLNavV9gHyrk/ykE3o5/DuzjaNNLRcIIiu0eiivN6Wk9rA5IT7yLbVZHqSAYX5S50eKeAFW00Ge2CLzPzTDloGxlCw6dEQQi9rUZnlg0NQfMRif/ZtL6jQXxgswmmoEgsiVCiiuX1sBJ29G5+HaXIxLMhruFqBp2CsQRO5THxRM+1uVdfECSvXCAkR9ggv+38yewN11fKCpEq76t0NOfz1k6uugu/8sT1DIr/uG4M3WrsUCXJegtunjhJhIE7VJjX/YgqwYo5iPeFUYzCV9P3QBXvpACZIvrRyzVZXw1akhnugiOx2DUKA/Gh+9rNkK/WfHBDFkGb5KrVIjxip2z7MKuM3uXPBMBuOJlQ0GePRYS7yIjWQminR1UHXYBMpGAxTodLCh8RBsHTjPmW/9ZhAOGD8RmJMBzay6EUF3fsYdViEfv+xsGvPZMYlLZidCsEtdA49ZDfEiUjGjqw2yunqhQtfA5QgKmAqXUZvVgdsxSRIcRiioaj4KL2ir4IEvLEnm2LdJp4Kq5iNJ5mQb/jmtwwjhng5tIMlJx7Fr+ArsJ9MuI9O+WaPiiG1lYwu4Rn4RxFIGp30d2Qtu2ToqLR54meAuFcmiokiucLfYqXDWPCM3xkYU71DZ9DDqD2USsbSvZDjtOItU5v8BLyh40Uw8plMRj1384RJvx2tCtc27R93h2U0fJbiMcC3jqYY75tK1nGuTTQbfiTrzxaLGNvpi9efeTfTxPu5FSCT/AQcXSSJwPBkhAAAAAElFTkSuQmCC' /></a>"
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

  browser.runtime.sendMessage({
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
