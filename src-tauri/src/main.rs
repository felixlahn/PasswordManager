#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::{fs::{File, self}, path::Path, error::Error};

use tauri::{CustomMenuItem, Menu, Submenu, api::file};

#[derive(Debug, serde::Serialize)]
struct PasswordEntry {
  name: String,
  username: String,
  password: String,
  url: String
}

#[derive(Clone, serde::Serialize)]
struct MessagePayload {
  message: String,
}

#[tauri::command]
fn decrypt(cyphertext: String) -> String {
  let first_entry = PasswordEntry {
    name: String::from("Microsoft"),
    username: String::from("felix.lahnsteiner@outlook.com"),
    password: String::from("microsoftPassword"),
    url: String::from("microsoft.com")
  };
  
  println!("{}", cyphertext);

  let serialized = serde_json::to_string(&first_entry).unwrap();
  return serialized;
}

fn main() {
  let open_menu_option = CustomMenuItem::new("open".to_string(), "Open").accelerator("cmdOrControl+O");
  let close_menu_option = CustomMenuItem::new("close".to_string(), "Close").accelerator("cmdOrControl+Q");
  let submenu = Submenu::new("File", Menu::new().add_item(open_menu_option).add_item(close_menu_option));
  let menu = Menu::new()
    .add_submenu(submenu);

  tauri::Builder::default()
      .menu(menu)
      .on_menu_event(|event| {
        match event.menu_item_id() {
          "close" => {
            event.window().close().unwrap();
          }
          "open" => {
            event.window().emit("menu-event", MessagePayload { message: "open-event".into() }).unwrap();
          }
          _ => {}
        }
      })
      .invoke_handler(tauri::generate_handler![decrypt])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}