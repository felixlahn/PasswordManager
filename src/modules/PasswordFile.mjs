const { invoke } = window.__TAURI__.tauri;
const { readTextFile, writeTextFile } = window.__TAURI__.fs;

export class PasswordFile {

    storedAt = "";
    saved = true;
    entries = [];
    password = "";

    constructor() {
        
    }

    async openFile(filePath) {
        if (!filePath || filePath === "") {
            throw new Error("filepath is null or empty");
        }
        this.storedAt = filePath;
        const contents = await readTextFile(this.storedAt);
        if(contents !== "") {
            this.entries = JSON.parse(contents);        
        } else {
            this.entries = [];
        }
    }

    async saveFile() {
        console.log("save");
        let jsonString = JSON.stringify(this.entries);
        console.log("jsonString", jsonString);
        await writeTextFile(this.storedAt, jsonString);
        this.save = true;
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