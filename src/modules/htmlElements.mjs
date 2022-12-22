export let output_paragraph;
export let second_out;
export let first_button;
export let password_table;

let output_paragraph_id = "output-paragraph";
let second_output_paragraph_id = "second-output";
let first_button_id = "btn_enc_dec";
let password_table_id = "pw-entries"

window.addEventListener("DOMContentLoaded", () => {
    first_button = document.getElementById(first_button_id);
    output_paragraph = document.getElementById(output_paragraph_id);
    second_out = document.getElementById(second_output_paragraph_id);
    password_table = document.getElementById(password_table_id);
})