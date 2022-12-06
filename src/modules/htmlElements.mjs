export let test_button;
export let echo_paragraph;
export let text_input;

let test_button_id = "test-button";
let echo_paragraph_id = "echo";
let text_input_id = "text-input";

window.addEventListener("DOMContentLoaded", () => {
    test_button = document.getElementById(test_button_id);
    echo_paragraph = document.getElementById(echo_paragraph_id);
    text_input = document.getElementById(text_input_id);
})