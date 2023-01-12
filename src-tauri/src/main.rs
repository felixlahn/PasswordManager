#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Menu, Submenu};
use magic_crypt::{new_magic_crypt, MagicCryptTrait};

#[derive(Debug, serde::Serialize)]
struct PasswordEntry {
  name: String,
  username: String,
  password: String,
  url: String
}

#[derive(Debug, serde::Serialize)]
enum CryptographyError {
  EmptyPasswordError,
  DecryptionError,
  EncryptionError
}

#[derive(Clone, serde::Serialize)]
struct MessagePayload {
  message: String,
}

#[tauri::command]
fn decrypt(cyphertext: String, password: String) -> Result<String, CryptographyError> {
  let mycrpyt = new_magic_crypt!(password, 256); 
  let decryption_result = mycrpyt.decrypt_base64_to_string(&cyphertext);
  match decryption_result {
    Ok(str) => return Ok(str),
    Err(err) => {println!("error when trying to decrypt cyphertext {}; got error {}", cyphertext, err); return Err(CryptographyError::DecryptionError)}
  };
}

#[tauri::command]
fn encrypt(plaintext: String, password: String) -> String {
  let mycrpyt = new_magic_crypt!(password, 256);
  let encrypted_string = mycrpyt.encrypt_str_to_base64(&plaintext);
  
  return encrypted_string;
}

fn main() {
  let open_menu_option = CustomMenuItem::new("open".to_string(), "Open").accelerator("cmdOrControl+O");
  let save_menu_option = CustomMenuItem::new("save".to_string(), "Save").accelerator("cmdOrControl+S");
  let close_menu_option = CustomMenuItem::new("close".to_string(), "Close").accelerator("cmdOrControl+Q");
  let submenu = Submenu::new("File", Menu::new().add_item(open_menu_option).add_item(close_menu_option).add_item(save_menu_option));
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
          "save" => {
            event.window().emit("menu-event", MessagePayload {message: "save-event".into()}).unwrap();
          }
          _ => {}
        }
      })
      .invoke_handler(tauri::generate_handler![decrypt, encrypt])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}