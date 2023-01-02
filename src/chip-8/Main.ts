import { RomDumpMaze } from "../ROMDUMP/RomDumpMaze";
import { Memory } from "./core/Memory";

export const Main = () => {
    console.log("Hello, world!");
    const memory = Memory();

    memory.setDumpRom(RomDumpMaze);
    
    // Print table console.log memory in hexadecimal
    console.log("La memoria ", memory.getArrayHex().slice(0x200, 512 + 48));

    return "Hellow World de carallo!";
}