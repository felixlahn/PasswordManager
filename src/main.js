const { invoke } = window.__TAURI__.tauri;
const { listen } = window.__TAURI__.event;
const { open } = window.__TAURI__.dialog;

import { output_paragraph } from './modules/htmlElements.mjs'

async function handleMenueEvent(eventPayloadMessage) {
  if (eventPayloadMessage === "open-event") {
    console.log("hallo");
    let filepath = await open();
    output_paragraph.innerText = filepath;
    console.log(filepath);
  }
}

const unlistenMenuEvent = listen(
  'menu-event',
  ({event, payload}) => handleMenueEvent(payload.message)
);

window.addEventListener("DOMContentLoaded", () => {

})