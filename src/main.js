const { invoke } = window.__TAURI__.tauri;

let test_button;
let echo_paragraph;
let text_input;

function showMessage(response) {
  echo_paragraph.textContent = response;
}

async function echo() {
  console.log("button pressed");
  await invoke("echo", { message: text_input.value }).then(response => {
    showMessage(response);
  }).catch(e => {
    console.error("Error responed from rust:", e);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  test_button = document.getElementById("test-button");
  echo_paragraph = document.getElementById("echo");
  text_input = document.getElementById("text-input");

  test_button.addEventListener("click", echo);
})