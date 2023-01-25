import { afterEach, expect, test } from "vitest";
import { mockIPC, clearMocks } from "@tauri-apps/api/mocks"
import { invoke } from "@tauri-apps/api/tauri";
import { PasswordFile } from "../../src/modules/PasswordFile.mjs";

afterEach(() => {
    clearMocks()
})

const user = {
    name : "Matt",
    age: 22,
};

test("Matt is 22", ()=> {
    expect(user.name).toBe("Matt");
    expect(user.age).toBe(22);
})

test("mocked command", () => {
    mockIPC((cmd, args) => {
     switch (cmd) {
       case "add":
         return (args.a) + (args.b);
       default:
         break;
       }
    });
   
    expect(invoke('add', { a: 12, b: 15 })).resolves.toBe(27);
})

const entriesString = '[{"id":1,"name":"Google","username":"michi","password":"googlepassword","url":"www.google.com"},{"id":2,"name":"Google 2","username":"felix","password":"google2password","url":"www.google.com"}]';

test("delete second entry", ()=> {
    //arrange
    let passwordFile = new PasswordFile();
    passwordFile.entries = JSON.parse(entriesString);

    //act
    passwordFile.deleteEntry(2);

    //assert
    expect(passwordFile.getEntries.length).toBe(1);
})