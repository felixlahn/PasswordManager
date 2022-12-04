#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[derive(Debug, serde::Serialize)]
enum MyError {
  FooError,
}

#[tauri::command]
fn echo(message: String) -> Result<String, MyError> {
  println!("from rust: {}", message);
  (!message.is_empty())
    .then(|| message)
    .ok_or(MyError::FooError)
}

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![echo])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}