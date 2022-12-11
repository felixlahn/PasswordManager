#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Menu, Submenu};

#[derive(Clone, serde::Serialize)]
struct MessagePayload {
  message: String,
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
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}