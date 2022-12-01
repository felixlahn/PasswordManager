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
1. Wie können Passwörter schön als Tabelle dargestellt werden?
1. Wie können die als JSON gespeicherte Passwörter im Backend (Rust) von Filesystem gelesen und im Frontend verwendet/angezeigt werden?