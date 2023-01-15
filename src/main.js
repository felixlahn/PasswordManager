const { invoke } = window.__TAURI__.tauri;
const { listen } = window.__TAURI__.event;
const { open } = window.__TAURI__.dialog;
const { writeTextFile } = window.__TAURI__.fs;

import { password_table, add_entry_button } from './modules/htmlElements.mjs'
import { PasswordFile } from './modules/PasswordFile.mjs';

let passwordFile = new PasswordFile();
let password = "secret";

function addEntry() {
  console.log("addentry");
  let table = password_table.getElementsByTagName('tbody')[0];
  console.log(table);
  var newRow = table.insertRow();
  newRow.setAttribute("id", "new-row");
  // accountname
  var accountNameCell = newRow.insertCell();
  accountNameCell.classList.add("lalign");
  var nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.readOnly = false;
  accountNameCell.appendChild(nameInput);

  // username
  var usernameCell = newRow.insertCell();
  var usernameInput = document.createElement("input");
  usernameInput.type = "text";
  usernameInput.value = "hallo";
  usernameInput.readOnly = false;
  usernameCell.appendChild(usernameInput);

  //password
  var passwordCell = newRow.insertCell();
  var passwordInput = document.createElement("input");
  passwordInput.type = "text";
  passwordInput.readOnly = false;
  passwordCell.appendChild(passwordInput);

  // url
  var urlCell = newRow.insertCell();
  var urlInput = document.createElement("input");
  urlInput.type = "text";
  urlCell.readOnly = false;
  urlCell.appendChild(urlInput);

  // tags
  var tagCell = newRow.insertCell();

  // buttons
  var buttonCell = newRow.insertCell();
  newRow.appendChild(buttonCell);

  var confirmButton = document.createElement("a");
  confirmButton.setAttribute("href", "#");
  confirmButton.className = "button confirm";
  confirmButton.onclick = () => {
   passwordFile.addEntry(nameInput.value, usernameInput.value, passwordInput.value, urlInput.value);
   showPasswords();
  };
  buttonCell.appendChild(confirmButton);
  
  var cancelButton = document.createElement("a");
  cancelButton.setAttribute("href", "#");
  cancelButton.className = "button cancel";
  cancelButton.onclick = () => {
    newRow.remove();
  };
  buttonCell.appendChild(cancelButton);

  newRow.appendChild(buttonCell);
  console.log(newRow);
}

function editEntry(id) {
  var nameCell = document.getElementById("name-" + id);
  var usernameCell = document.getElementById("username-" + id);
  var nameCell = document.getElementById("name-" + id);
  var passwordCell = document.getElementById("password-" + id);
  var urlCell = document.getElementById("url-" + id);
  var editButton = document.getElementById("edit-" + id);
  var deleteButton = document.getElementById("delete-" + id);
  var confirmButton = document.getElementById("confirm-" + id);
  var cancelButton = document.getElementById("cancel-" + id);

  nameCell.getElementsByTagName("input")[0].readOnly = false;
  usernameCell.getElementsByTagName("input")[0].readOnly = false;
  var pwInput = passwordCell.getElementsByTagName("input")[0];
  pwInput.readOnly = false;
  pwInput.type = "text";
  urlCell.getElementsByTagName("input")[0].readOnly = false;

  changeButtonStateToEditing(editButton, deleteButton, confirmButton, cancelButton); 
}

function deleteEntry(id){
  var toDeleteRow = document.getElementById(id);
  toDeleteRow.remove();
  passwordFile.deleteEntry(id);
}


function confirmEdits(id){
  var name = document.getElementById("name-" + id).getElementsByTagName("input")[0].value;
  var username = document.getElementById("username-" + id).getElementsByTagName("input")[0].value;
  var password = document.getElementById("password-" + id).getElementsByTagName("input")[0].value;
  var url = document.getElementById("url-" + id).getElementsByTagName("input")[0].value;
  passwordFile.editEntry(id, name, username, password, url);

  var nameCell = document.getElementById("name-" + id);
  var usernameCell = document.getElementById("username-" + id);
  var nameCell = document.getElementById("name-" + id);
  var passwordCell = document.getElementById("password-" + id);
  var urlCell = document.getElementById("url-" + id);
  var editButton = document.getElementById("edit-" + id);
  var deleteButton = document.getElementById("delete-" + id);
  var confirmButton = document.getElementById("confirm-" + id);
  var cancelButton = document.getElementById("cancel-" + id);

  nameCell.getElementsByTagName("input")[0].readOnly = true;
  usernameCell.getElementsByTagName("input")[0].readOnly = true;
  var pwInput = passwordCell.getElementsByTagName("input")[0];
  pwInput.readOnly = true;
  pwInput.type = "password";
  urlCell.getElementsByTagName("input")[0].readOnly = true;

  changeButtonStateToNonEditing(editButton, deleteButton, confirmButton, cancelButton);
}

function cancelEdits(id){
  var entry = passwordFile.getEntry(id);
  console.log(entry);
  var name = entry.name;
  var username = entry.username;
  var password = entry.password;
  var url = entry.url;

  document.getElementById("name-" + id).getElementsByTagName("input")[0].value = name;
  document.getElementById("username-" + id).getElementsByTagName("input")[0].value = username;
  document.getElementById("password-" + id).getElementsByTagName("input")[0].value = password;
  document.getElementById("url-" + id).getElementsByTagName("input")[0].value = url;

  var nameCell = document.getElementById("name-" + id);
  var usernameCell = document.getElementById("username-" + id);
  var nameCell = document.getElementById("name-" + id);
  var passwordCell = document.getElementById("password-" + id);
  var urlCell = document.getElementById("url-" + id);
  var editButton = document.getElementById("edit-" + id);
  var deleteButton = document.getElementById("delete-" + id);
  var confirmButton = document.getElementById("confirm-" + id);
  var cancelButton = document.getElementById("cancel-" + id);

  nameCell.getElementsByTagName("input")[0].readOnly = true;
  usernameCell.getElementsByTagName("input")[0].readOnly = true;
  var pwInput = passwordCell.getElementsByTagName("input")[0];
  pwInput.readOnly = true;
  pwInput.type = "password";
  urlCell.getElementsByTagName("input")[0].readOnly = true;

  changeButtonStateToNonEditing(editButton, deleteButton, confirmButton, cancelButton);
}


function changeButtonStateToEditing(editButton, deleteButton, confirmButton, cancelButton){
  editButton.style = "display:none";
  deleteButton.style = "display:none";
  confirmButton.style = "";
  cancelButton.style = "";
}

function changeButtonStateToNonEditing(editButton, deleteButton, confirmButton, cancelButton){
  editButton.style = "";
  deleteButton.style = "";
  confirmButton.style = "display:none";
  cancelButton.style = "display:none";
}

async function save() {
  console.log("save in main");
  await passwordFile.saveFile();
}

async function handleMenueEvent(eventPayloadMessage) {
  console.debug("handleMenueEvent:", eventPayloadMessage);
  if (eventPayloadMessage === "open-event") {
    openFile();
  }
  if (eventPayloadMessage === "save-event") {
    await passwordFile.saveFile();
    showPasswords();
  }
}

function showPasswords() {
  //clear all rows that may exist
  let tableHeaderRowCount = 1;
  let table = password_table;
  let rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
      table.deleteRow(tableHeaderRowCount);
  }
  
  table = password_table.getElementsByTagName('tbody')[0];

  passwordFile.entries.forEach(element => {
    var newRow = table.insertRow();
    newRow.setAttribute("id", element.id)
    // accountname
    var accountNameCell = newRow.insertCell();
    accountNameCell.classList.add("lalign");
    accountNameCell.setAttribute("id", "name-" + element.id);
    var nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = element.name;
    nameInput.readOnly = true;
    accountNameCell.appendChild(nameInput);

    // username
    var usernameCell = newRow.insertCell();
    usernameCell.setAttribute("id", "username-" + element.id);
    var usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.value = element.username;
    usernameInput.readOnly = true;
    usernameCell.appendChild(usernameInput);

    //password
    var passwordCell = newRow.insertCell();
    passwordCell.setAttribute("id", "password-" + element.id);
    var passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.value = element.password;
    passwordInput.readOnly = true;
    passwordCell.appendChild(passwordInput);

    // url
    var urlCell = newRow.insertCell();
    urlCell.setAttribute("id", "url-" + element.id);
    var urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.value = element.url;
    urlCell.readOnly = true;
    urlCell.appendChild(urlInput);

    // tags
    var tagCell = newRow.insertCell();
    tagCell.setAttribute("id", "tag-" + element.id);

    // buttons
    var buttonCell = newRow.insertCell();
    newRow.appendChild(buttonCell);

    var editButton = document.createElement("a");
    editButton.setAttribute("href", "#");
    editButton.setAttribute("id", "edit-" + element.id);
    editButton.className = "button edit";
    editButton.onclick = () => editEntry(element.id);
    buttonCell.appendChild(editButton);

    var deleteButton = document.createElement("a");
    deleteButton.setAttribute("href", "#");
    deleteButton.setAttribute("id", "delete-" + element.id);
    deleteButton.className = "button delete";
    deleteButton.onclick = () => deleteEntry(element.id);
    buttonCell.appendChild(deleteButton);

    var confirmButton = document.createElement("a");
    confirmButton.setAttribute("href", "#");
    confirmButton.setAttribute("id", "confirm-" + element.id);
    confirmButton.setAttribute("style", "display:none");
    confirmButton.className = "button confirm";
    confirmButton.onclick = () => confirmEdits(element.id);
    buttonCell.appendChild(confirmButton);
    
    var cancelButton = document.createElement("a");
    cancelButton.setAttribute("href", "#");
    cancelButton.setAttribute("id", "cancel-" + element.id);
    cancelButton.setAttribute("style", "display:none");
    cancelButton.className = "button cancel";
    cancelButton.onclick = () => cancelEdits(element.id);
    buttonCell.appendChild(cancelButton);

    newRow.appendChild(buttonCell);
  });
}

async function openFile() {
  let filePath = await open();
  console.log(filePath);

  await passwordFile.openFile(filePath);

  showPasswords();
}

const unlistenMenuEvent = listen(
  'menu-event',
  ({event, payload}) => handleMenueEvent(payload.message)
);

window.addEventListener("DOMContentLoaded", () => {
  add_entry_button.addEventListener("click", addEntry);
})