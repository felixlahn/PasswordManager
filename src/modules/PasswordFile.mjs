const { invoke } = window.__TAURI__.tauri;
const { readTextFile, writeTextFile } = window.__TAURI__.fs;

// import { invoke } from '@tauri-apps/api/tauri';
// import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';

export class PasswordFile {

    storedAt = "";
    tagsStoredAt = "";
    saved = true;
    entries = [];
    tags = [];
    password = "secretForEncryption";

    constructor() {
        
    }

    addGlobalTag(tagText){
        this.tags.push(tagText);
        this.saved = false;
        return tagText;
    }

    getEntry(id) {
        let returnEntry;
        this.entries.forEach((entry) => {
            if(entry.id === id) {
                returnEntry = entry;
            }
        });
        return returnEntry;
    }

    deleteEntry(id) {
        console.log(this.entries);
        let i = 0;
        let toDelete;
        this.entries.forEach((element) => {
            if(element.id === id) {
                toDelete = i;
            }
            ++i;
        });
        this.entries.splice(toDelete, 1);
        console.log(this.entries);
    }

    editEntry(id, name, username, password, url) {
        console.log(this.entries);
        this.entries.forEach((entry) => {
            if(entry.id === id) {
                entry.name = name;
                entry.username = username;
                entry.password = password;
                entry.url = url;
            }
        });
        console.log(this.entries);
    }

    async openFile(filePath) {
        if (!filePath || filePath === "") {
            throw new Error("filepath is null or empty");
        }
        this.storedAt = filePath;
        const contents = await readTextFile(this.storedAt);
        if(contents !== "") {
            this.entries = JSON.parse(contents);
            if(this.entries !== []) {
                let promises = this.entries.map(async (entry) => {
                    entry.password = await invoke('decrypt', {cyphertext: entry.password, password: this.password});
                })
                await Promise.all(promises);
            }
        } else {
            this.entries = [];
        }
        
        this.tagsStoredAt = this.storedAt.replace(/(?=\.[^.]+$)/g, "-tags");
        console.log(this.tagsStoredAt);
        const contentsTags = await readTextFile(this.tagsStoredAt);
        if(contentsTags !== ""){
            this.tags = JSON.parse(contentsTags);
        } else {
            this.tags = [];
        }
    }

    async saveFile() {
        console.log("save");
        let promises = this.entries.map(async (entry) => {
            entry.password = await invoke('encrypt', {plaintext: entry.password, password: this.password});
        });
        await Promise.all(promises);
        let jsonString = JSON.stringify(this.entries);
        await writeTextFile(this.storedAt, jsonString);
        
        let jsonStringTags = JSON.stringify(this.tags);
        await writeTextFile(this.tagsStoredAt, jsonStringTags);
        this.saved = true;
    }

    addEntry(name, username, password, url, tagsToAddToEntry) {
        let maxId = 0;
        
        this.entries.forEach(elem => {
            if(maxId < elem.id){
                maxId = elem.id;
            }
        });

        let newEntry = new Entry(maxId + 1, name, username, password, url, tagsToAddToEntry);
        this.entries.push(newEntry);
        this.saved = false;
        return newEntry;
    }
    

    addTagToEntry(entryId, tagText){
        this.entries.forEach((entry) => {
            if(entry.id === entryId) {
                entry.entryTags.push(tagText);
            }
        });
        
        return(tagText);
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
    entryTags = [];

    constructor(id, name, username, password, url, entryTags) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.url = url;
        this.entryTags = entryTags;
    }
}