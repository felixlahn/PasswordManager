const { invoke } = window.__TAURI__.tauri;
const { listen } = window.__TAURI__.event;
const { open } = window.__TAURI__.dialog;
const { readTextFile } = window.__TAURI__.fs;

import { output_paragraph } from './modules/htmlElements.mjs'

async function handleMenueEvent(eventPayloadMessage) {
  if (eventPayloadMessage === "open-event") {
    openAndDecrypt("myFancyPassword");
  }
}

async function openAndDecrypt(password) {
  let filepath = await open();
  
  const contents = await readTextFile(filepath);
  
  await invoke("decrypt", { cyphertext: contents })
      .then((plaintext) => {
        output_paragraph.innerText = JSON.stringify(JSON.parse(plaintext));
        console.log(plaintext);
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

})