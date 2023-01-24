export let output_paragraph;
export let second_out;
export let add_entry_button;
export let add_tag_button;
export let add_tag_input;
export let filter_table_button;
export let filter_table_input;
export let password_table;
export let clear_filter_button;

let output_paragraph_id = "output-paragraph";
let second_output_paragraph_id = "second-output";
let add_entry_button_id = "btn_add_entry";
let add_tag_button_id = "btn_add_tag";
let add_tag_input_id = "input_add_tag";
let password_table_id = "pw-entries"
let filter_table_button_id = "btn_filter_table";
let filter_table_input_id = "input_filter_table";
let clear_filter_button_id = "btn_clear_filter";

window.addEventListener("DOMContentLoaded", () => {
    add_entry_button = document.getElementById(add_entry_button_id);
    add_tag_button = document.getElementById(add_tag_button_id);
    add_tag_input = document.getElementById(add_tag_input_id);
    output_paragraph = document.getElementById(output_paragraph_id);
    second_out = document.getElementById(second_output_paragraph_id);
    password_table = document.getElementById(password_table_id);
    filter_table_button = document.getElementById(filter_table_button_id);
    filter_table_input = document.getElementById(filter_table_input_id);
    clear_filter_button = document.getElementById(clear_filter_button_id);
})