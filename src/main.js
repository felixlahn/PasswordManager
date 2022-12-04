const { invoke } = window.__TAURI__.tauri;

let test_button;
let echo_paragraph;

function showMessage(response) {
  echo_paragraph.textContent = response;
}

async function echo() {
  console.log("button pressed");
  await invoke("echo", { message: "hello" }).then(response => {
    showMessage(response);
  }).catch(e => {
    console.error("should be FooError when message is empty:", e);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  test_button = document.getElementById("test-button");
  echo_paragraph = document.getElementById("echo");

  test_button.addEventListener("click", echo);
})