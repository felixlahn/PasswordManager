const { invoke } = window.__TAURI__.tauri;
const { readTextFile, BaseDirectory } = window.__TAURI__.fs;

let test_button;
let echo_paragraph;
let text_input;

function showMessage(response) {
  echo_paragraph.textContent = response;
}

async function echo() {
  console.log("button pressed");
  const contents = await readTextFile('C:/Users/Felix Lahnsteiner/git/desktopWebapplikationen/PasswordManager/src/passwords.json', { contents: String });
  console.log(contents);
}

window.addEventListener("DOMContentLoaded", () => {
  test_button = document.getElementById("test-button");
  echo_paragraph = document.getElementById("echo");
  text_input = document.getElementById("text-input");

  test_button.addEventListener("click", echo);
})