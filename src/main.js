const { invoke } = window.__TAURI__.tauri;
const { readTextFile, BaseDirectory } = window.__TAURI__.fs;
const { desktopDir } = window.__TAURI__.path;

let test_button;
let echo_paragraph;
let text_input;

function fileReadError(message, error) {
  console.error(error);
  showMessage(message);
}

function showMessage(response) {
  echo_paragraph.textContent = response;
}

async function echo() {
  console.log("button pressed");
  let path = await desktopDir();
  let filename = "passwords.json";
  let filepath = path + filename;
    
    const contents = await readTextFile(filepath, { path: path, contents: String })
    .then(file => { showMessage(file) })
    .catch(error => { fileReadError("cannont read file", error) });
}

window.addEventListener("DOMContentLoaded", () => {
  test_button = document.getElementById("test-button");
  echo_paragraph = document.getElementById("echo");
  text_input = document.getElementById("text-input");

  test_button.addEventListener("click", echo);
})