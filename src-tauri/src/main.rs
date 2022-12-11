#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu, Window};

#[derive(Debug, serde::Serialize)]
enum EncryptionError {
  EmptyPasswordError,
}

#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

#[tauri::command]
fn decrypt(ciphertext: String, password: String, window: Window) -> Result<String, EncryptionError> {
  if password.is_empty() {
    Err(EncryptionError::EmptyPasswordError)
  } else {
    window.emit("PROGRESS", Payload { message: "hallo event".into() }).unwrap();
    Ok(ciphertext.into())
  }
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
            event.window().emit("menu-event", Payload { message: "open event".into() }).unwrap();
          }
          _ => {}
        }
      })
      .invoke_handler(tauri::generate_handler![decrypt])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}