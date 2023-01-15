# Passwörter speichern
- JSON-File
- für den Anfang als fix angegebener relativer Pfad
- Backend übergibt die Passwörter entschlüsselt als JSON an Frontend?
- Entschlüsselung nur der Passwörter auf Bedarf?
- Masterpasswort für den Anfang hardcode

# Design
- Button für Erstellung neuer Einträge
- Tabelle
    - Name
    - Username
    - Passwort
    - URL
    - Tags
    - Editieren/Löschen & bei Bearbeitung speichern & abbrechen

# Implementierung
- Ohne Framework (zb. React etc.)
- HTML, JavaScript, CSS
- ev. Bootstrap 5

# TODO
1. Tags
1. Tests
1. warum werden alte Daten stringified??
1. passworteingabe optioinal

# Nützliche Ressourcen
- [A Guide for Tauri: Part 2](https://nikolas.blog/a-guide-for-tauri-part-2/)
- [Frontend Backend Communication in Tauri: Implementing Progress Bars and Interrupt Button](https://betterprogramming.pub/front-end-back-end-communication-in-tauri-implementing-progress-bars-and-interrupt-buttons-2a4efd967059)
- [The Rust Programming Language: *Reading a File*. Online im Internet (Zugriff am 11.12.2022)](https://doc.rust-lang.org/book/ch12-02-reading-a-file.html)
- [Talha Awan (12.8.2021): *Serialize and Deserialize JavaScript Class Objects In Front End Applications*. Online im Internet (Zugriff am 15.12.2022)](https://www.techighness.com/post/serialize-and-deserialize-javascript-class-objects-front-end-applications/)