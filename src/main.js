const { invoke } = window.__TAURI__.tauri;
const { readTextFile, BaseDirectory } = window.__TAURI__.fs;
const { desktopDir } = window.__TAURI__.path;

import { test_button, echo_paragraph, text_input } from './modules/htmlElements.mjs'

async function decrypt(ciphertext, password) {
  let result;
  await invoke("decrypt", { ciphertext: ciphertext, password: password })
    .then(plaintext => {
      result = plaintext;
    })
    .catch((err) => {
      console.error(err);
      throw "could not decrypt";
    });
    return result;
}

function fileReadError(message, error) {
  console.error(error);
  showMessage(message);
}

function showMessage(response) {
  echo_paragraph.textContent = response;
}

function checkStringNullEmpty(string) {
  if(!string) {
    throw "null string";
  }

  if(string.trim() === '') {
    throw "empty string";
  }
}

async function openFile() {
  let path = await desktopDir();
  let filename = text_input.value;

  try {
    checkStringNullEmpty(filename);
  } catch (err) {
    console.error("error with filename:", err);
    return;
  }

  let fileContent;
  try {
    fileContent = await readTextFile(path + filename, { path: path, contents: String });
  } catch (e) {
    fileReadError("cannont read file", error);
    return;
  }
    
  let decrypted;
  try {
    decrypted = await decrypt(fileContent, "password");
  } catch (e) {
    console.error(e);
    return;
  }

  showMessage(decrypted);
}

window.addEventListener("DOMContentLoaded", () => {
  test_button.addEventListener("click", openFile);
})