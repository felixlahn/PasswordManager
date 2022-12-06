#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{Manager, Window, Submenu, CustomMenuItem, Menu};

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
    window.emit("PROGRESS", Payload { message: "hallo event".into() }).unwrap();
    Err(EncryptionError::EmptyPasswordError)
  } else {
    Ok(ciphertext.into())
  }
}

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![decrypt])
      .menu(Menu::new().add_submenu(Submenu::new("File",
        Menu::new()
          .add_item(CustomMenuItem::new("close", "Close").accelerator("cmdOrControl+Q")))))
          .on_menu_event(|event| match event.menu_item_id() {
            "close" => {
                event.window().close().unwrap();
            }
            _ => {}
        })
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}