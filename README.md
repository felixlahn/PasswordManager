# Passwortmanager mit Tauri
    Michael Rumpelnig & Lahnsteiner Felix

Projekt verfügbar auf [GitHub](https://github.com/felixlahn/PasswordManager).

# Installation des Toolstacks
Um den rust-Packetmanager `cargo` verwenden zu können, muss rust und tauri erst
installiert sein. Eine Anleitung zu Windows, Mac und Linux ist auf der [Website
von Tauri](https://tauri.app/v1/guides/getting-started/prerequisites) angegeben.

Nachdem rust installiert wurde, kann Tauri mit cargo installiert werden:

```cli
cargo install tauri-cli
```

# Benutzen
Der Passwortmanager speichert Accountinformationen (Name, Username, Passwort, etc)
in zwei `.json`-Files. Bevor der Passwortmanager benutzt werden kann, muss also
an gewünschter Stelle ein `<Filename>.json` und ein `<Filename>-tags.json`
angelegt werden. Bei der Benutztung des Passwortmanagers muss das `<Filename>.json`
geöffnet werden, das zweite File öffnet der Passwortmanager selbstständig (vorausgesetzt, beide File befinden sich im selben Verzeichnis). Der Passwortmanager
verwendet ein Passwort, der Benutzer kann keines angeben. Die Passwörter der
Einträge werden mit AES verschlüsselt.

Man kann mit dem Button 'Add new Entry' einen neuen Eintrag hinzufügen. Mittels 'Add new Tag' wird ein neues globales Tag erstellt, welches mittels eines Drop-Down-Menüs zu einem Eintrag hinzugefügt werden kann. Wichtig ist, bevor man einen neuen Eintrag erstellt sollte man zuerst einen neuen Tag erstellen. Einen zugewiesenen Tag kann man im Nachhinein nicht mehr weglöschen, bedeutet, dass der Eintrag neu erstellt werden muss.

Per default sind gespeicherte Einträge nicht editierbar, um sie zu editieren muss man die Buttons in der letzten Spalte verwenden. Es gibt einen Editieren-Button (Stift) und einen Löschen-Button (DEL), wenn der Editieren-Button geklickt wurde, ändern sich die Buttons zu einem Confirm-Button (Haken) und einem Cancel-Button (X).

Die Filterfunktion wird verwendet, in dem man den gesuchten Namen oder das gesuchte Tag in das Input-Feld nebem dem Filter-Button verwendet. Um alle Filter zu löschen gibt es einen extra Button oder das Input-Feld wird einfach leer gelassen.

# Entwicklung
## Starten & Bauen
Die Applikation kann gebaut oder als Entwicklerfenster gestartet werden.

### Entwicklerfenster
Während der Entwicklung kann Tauri ein Fenster zeigen, das das Fenster so
zeigt, wie es im aktuellen Entwiklungszustand aussehen würde. Werden nun HTML-,
CSS- oder JavaScript-Files geändert, wird diese Änderung sofort angewandt und
sichtbar. Jede Änderung, die das Compilieren des rust-Codes erfordert startet
das Entwicklerfenster neu, nachdem das Compilieren abgeschlossen ist.

Im Root-Verzeichnis des Projektes kann dieses Entwicklerfenster wie folgt
gestartet werden:

```cli
cargo tauri dev
```

### Bauen
Gebaut werden kann immer nur für jene Plattform, auf der gerade entwickelt wird.
Soll also ein eine `.exe`-Datei gebaut werden, muss das Projekt, rust und tauri
auf einem Windowsrechner liegen und installiert sein. Ist man also auf seiner
Zielplattform angekommen, kann das Projekt gebaut werden:

```cli
cargo tauri build
```

### Testen
Das Projekt beinhaltet Unittests, umgesetzt mit [vitest](https://vitest.dev/).
Das Projekt kann mit `npm` getestet werden:

```cli
npm run test:unit
```

Dieser Command ist beschrieben in [package.json](./package.json).

Beim Testen ist es allerdings notwendig, dass im [PasswordFile.mjs](./src/modules/PasswordFile.mjs) die Zeilen eins und zwei auskommentiert und die Zeilen vier
und fünf einkommentiert werden.