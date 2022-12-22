const { invoke } = window.__TAURI__.tauri;
const { listen } = window.__TAURI__.event;
const { open } = window.__TAURI__.dialog;
const { readTextFile } = window.__TAURI__.fs;

import { first_button, password_table } from './modules/htmlElements.mjs'

let decryptedDeserializedPasswords;
let password = "myFancyPassword";

async function handleMenueEvent(eventPayloadMessage) {
  if (eventPayloadMessage === "open-event") {
    openAndDecrypt(password);
  }
}

function showPasswords(passwords) {
  //clear all rows that may exist
  let tableHeaderRowCount = 1;
  let table = password_table;
  let rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
      table.deleteRow(tableHeaderRowCount);
  }
  
  table = password_table.getElementsByTagName('tbody')[0];

  passwords.entries.forEach(element => {
    var newRow = table.insertRow();
    // accountname
    var accountNameCell = newRow.insertCell();
    accountNameCell.classList.add("lalign");
    var accountNameCellText = document.createTextNode(element.name);
    accountNameCell.appendChild(accountNameCellText);

    // username
    var usernameCell = newRow.insertCell();
    var usernameCellText = document.createTextNode(element.username);
    usernameCell.appendChild(usernameCellText);

    //password
    var passwordCell = newRow.insertCell();
    var passwordCellText = document.createTextNode(element.password);
    passwordCell.appendChild(passwordCellText);

    // url
    var urlCell = newRow.insertCell();
    var urlCellText = document.createTextNode(element.url);
    urlCell.appendChild(urlCellText);

    // buttons
    var emptyCell = newRow.insertCell()
    var buttonCell = newRow.insertCell();
    newRow.appendChild(emptyCell);

    var editButton = document.createElement("a");
    editButton.setAttribute("href", "#");
    editButton.className = "button edit";
    buttonCell.appendChild(editButton);

    var deleteButton = document.createElement("a");
    deleteButton.setAttribute("href", "#");
    deleteButton.className = "button delete";
    buttonCell.appendChild(deleteButton);

    var confirmButton = document.createElement("a");
    confirmButton.setAttribute("href", "#");
    confirmButton.setAttribute("style", "display:none");
    confirmButton.className = "button confirm";
    buttonCell.appendChild(confirmButton);
    
    var cancelButton = document.createElement("a");
    cancelButton.setAttribute("href", "#");
    cancelButton.setAttribute("style", "display:none");
    cancelButton.className = "button cancel";
    buttonCell.appendChild(cancelButton);

    newRow.appendChild(buttonCell);
  });
}

async function openAndDecrypt(password) {
  let filePath = await open();
  let contents = await readTextFile(filePath);

  await invoke("decrypt", { cyphertext: contents, password: password })
      .then((plaintext) => {
        decryptedDeserializedPasswords = JSON.parse(plaintext);
      })
      .catch((err) => {
        console.error(err);
      });

  showPasswords(decryptedDeserializedPasswords);
}

const unlistenMenuEvent = listen(
  'menu-event',
  ({event, payload}) => handleMenueEvent(payload.message)
);

window.addEventListener("DOMContentLoaded", () => {
  first_button.addEventListener("click", openAndDecrypt);
})

$(function(){
  $('#pw-entries').tablesorter(); 
});