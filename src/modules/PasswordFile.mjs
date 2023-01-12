const { readTextFile } = window.__TAURI__.fs;

export class PasswordFile {

    storedAt = "";
    saved = true;
    entries = [];
    password = "";

    constructor() {
        
    }

    open(filePath) {
        
    }

    addEntry(name, username, accountname, password, url) {
        let newEntry = new Entry(name, username, accountname, password, url);
        this.entries.push(newEntry);
        this.saved = false;
    }

    set setEntries(entries) {
        this.entries = entries;
    }

    get getPassword() {
        return this.password;
    }

     set setPassword(password) {
        this.password = password;
    }

    get getStoredAt() {
        return this.storedAt;
    }

    set setStoredAt(filePath) {
        this.storedAt = filePath;
    }

    isSaved() {
        return this.saved;
    }

    save() {
        this.saved = true;
    }

    get getEntries() {
        return this.entries;
    }
}

class Entry {

    id = 0;
    name = "";
    username = "";
    password = "";
    url = "";

    constructor(id, name, username, password, url) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.url = url;
    }
}