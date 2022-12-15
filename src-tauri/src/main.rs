#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Menu, Submenu};
use magic_crypt::{new_magic_crypt, MagicCryptTrait};

const MASTER_KEY: &str = "magickey";

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
fn decrypt(cyphertext: String,) -> String {    
  let mycrpyt = new_magic_crypt!(MASTER_KEY, 256); 
  let decrypted_string = mycrpyt.decrypt_base64_to_string(&cyphertext).unwrap();
  return decrypted_string;
}

#[tauri::command]
fn encrypt(plaintext: String,) -> String {
  let mycrpyt = new_magic_crypt!(MASTER_KEY, 256);
  let encrypted_string = mycrpyt.encrypt_str_to_base64(&plaintext);
  return encrypted_string;
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
      .invoke_handler(tauri::generate_handler![decrypt, encrypt])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}