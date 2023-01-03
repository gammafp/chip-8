import { RomDumpMaze } from "../ROMDUMP/RomDumpMaze";
import { Memory } from "./core/Memory";
import { PC } from "./core/PC";
import { opCodeFinder } from "./helpers";

export const Main = () => {
    const pc = PC();
    const memory = Memory();
    
    pc.increment();
    pc.increment();
    pc.increment();
   
    
    console.log("PC: ", pc.get());
    memory.setDumpRom(RomDumpMaze);

    const firstValue = memory.getWord(pc.get());
    console.log("Componentes del chip-8 opcode: ", opCodeFinder(firstValue));

    console.log("Primer valor: ", firstValue.toString(16).padStart(4, '0').toUpperCase());

    return "Hellow World de carallo!";
}