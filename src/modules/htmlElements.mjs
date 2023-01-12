export let output_paragraph;
export let second_out;
export let add_entry_button;
export let password_table;

let output_paragraph_id = "output-paragraph";
let second_output_paragraph_id = "second-output";
let add_entry_button_id = "btn_add_entry";
let password_table_id = "pw-entries"

window.addEventListener("DOMContentLoaded", () => {
    add_entry_button = document.getElementById(add_entry_button_id);
    output_paragraph = document.getElementById(output_paragraph_id);
    second_out = document.getElementById(second_output_paragraph_id);
    password_table = document.getElementById(password_table_id);
})