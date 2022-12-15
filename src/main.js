const { invoke } = window.__TAURI__.tauri;
const { listen } = window.__TAURI__.event;
const { open } = window.__TAURI__.dialog;
const { readTextFile } = window.__TAURI__.fs;

import { output_paragraph, second_out, first_button } from './modules/htmlElements.mjs'

async function handleMenueEvent(eventPayloadMessage) {
  if (eventPayloadMessage === "open-event") {
    openAndDecrypt("myFancyPassword");
  }
}

async function openAndDecrypt() {
  const contents = "testing the encryption";
  let encrypted_string = "it didn't work";
  
  await invoke("encrypt", { plaintext: contents })
      .then((encryption) => {
        encrypted_string = encryption;
        output_paragraph.innerText = encrypted_string;
        console.log(encrypted_string);
      })
      .catch((err) => {
        console.error(err);
      });  

      await invoke("decrypt", {cyphertext: encrypted_string})
      .then((decryption) => {
        second_out.innerText = decryption;
        console.log(decryption);
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
