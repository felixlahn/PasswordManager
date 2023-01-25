import { afterEach, expect, test } from "vitest";
import { clearMocks } from "@tauri-apps/api/mocks"
import { PasswordFile } from "../../src/modules/PasswordFile.mjs";

afterEach(() => {
    clearMocks()
})

const entriesString = '[{"id":1,"name":"Google","username":"michi","password":"googlepassword","url":"www.google.com"},{"id":2,"name":"Google 2","username":"felix","password":"google2password","url":"www.google.com"}]';

test("delete second entry", ()=> {
    //arrange
    let passwordFile = new PasswordFile();
    passwordFile.entries = JSON.parse(entriesString);

    //act
    passwordFile.deleteEntry(2);

    //assert
    expect(passwordFile.getEntries).length.toBe(1);
})