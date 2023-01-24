import { afterEach, expect, test } from "vitest";
import { mockIPC, clearMocks } from "@tauri-apps/api/mocks"
import { invoke } from "@tauri-apps/api/tauri";

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