#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[derive(Debug, serde::Serialize)]
enum EncryptionError {
  EmptyPasswordError,
}

#[tauri::command]
fn decrypt(ciphertext: String, password: String) -> Result<String, EncryptionError> {
  if password.is_empty() {
    Err(EncryptionError::EmptyPasswordError)
  } else {
    Ok(ciphertext.into())
  }
}

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![decrypt])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}