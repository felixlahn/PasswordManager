#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[tauri::command]
fn echo(message: String) -> Result<String, String> {
  println!("from rust: {}", message);
  if message.is_empty() {
    Err("this hasen't worked".into())
  } else {
    Ok(message.into())
  }
}

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![echo])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}