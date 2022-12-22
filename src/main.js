const { invoke } = window.__TAURI__.tauri;
const { listen } = window.__TAURI__.event;
const { open } = window.__TAURI__.dialog;
const { readTextFile } = window.__TAURI__.fs;

import { output_paragraph, second_out, first_button } from './modules/htmlElements.mjs'

let decryptedDeserializedPasswords;
let password = "myFancyPassword";

async function handleMenueEvent(eventPayloadMessage) {
  if (eventPayloadMessage === "open-event") {
    openAndDecrypt(password);
  }
}

async function openAndDecrypt(password) {
  let filePath = await open();
  let contents = await readTextFile(filePath);

  await invoke("decrypt", { cyphertext: contents, password: password })
      .then((plaintext) => {
        decryptedDeserializedPasswords = JSON.parse(plaintext);
        console.log("deserialized", decryptedDeserializedPasswords);
      })
      .catch((err) => {
        console.error(err);
      });
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