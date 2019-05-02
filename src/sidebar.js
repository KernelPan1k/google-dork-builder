$(function () {

  const addDorkButton = document.querySelector("#add-dork");
  const dorkList = document.querySelector("#dork-list");
  const builder = document.querySelector("#builder");

  const configTerm = ["OR", "AND", "-", "*", "$"];
  const operatorTerm = ["OR", "AND"];

  const config = {
    search: configTerm,
    searchTerm: operatorTerm,
  };

  const makeOptions = () => {
    const list = config[dorkList.value];
    let result = "<select class='operator'>";
    result += "<option value=''></option>";

    for (let i = 0, l = list.length; i < l; i++) {
      result += `<option value="${ list[i] }">${ list[i] }</option>`
    }

    result += "</select>";

    return result
  };

  const addOperator = () => {

  };

  const changeOperator = (event) => {
    const element = event.currentTarget;
    const next = element.nextSibling;

    if (!element.value) {
      next.setAttribute("disabled", true);
    } else {
      next.removeAttribute("disabled");
    }
  };

  const updateDomEvent = () => {
    document.querySelectorAll(".addOperator").forEach(element => {
      element.addEventListener('click', addOperator, false);
    });

    document.querySelectorAll(".operator").forEach(element => {
      element.addEventListener('change', changeOperator, false);

      if (!element.value) {
        element.nextSibling.setAttribute("disabled", true);
      }
    });

    $(builder).sortable();
  };

  addDorkButton.addEventListener('click', () => {
    builder.innerHTML += "<li><input type='text' />" + makeOptions() + "<input type='button' class='addOperator' value='+'></li>";
    updateDomEvent()
  }, false);

});
