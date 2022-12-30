import { clone } from 'lodash';
import { Memory } from '../chip-8/core/Memory';
import { RomDumpMaze } from '../ROMDUMP/RomDumpMaze';

describe("Pruebas del módulo de memoria", () => {
    const padding = 0x200;
    const memory = Memory();
    const memoryToZero = clone(memory.getArray());

    // RomDumpMaze.forEach((byte, index) => {
    memory.setDumpRom(RomDumpMaze);
    // });
    // console.log(" La memory bugatty ", memory.getArray().slice(padding, 34 + padding));

    test("Dump: ", () => {
        expect(memory.getArray().slice(padding, padding + 34)).toMatchObject(RomDumpMaze);
    });

    test("Eliminar un espacio en memoria", () => {
        memory.delete(30 + padding);
        expect(memory.get(30 + padding)).toBe(0x00);
    });

    test("Comprueba reset memoria to zero", () => {
        memory.resetMemory();
        expect(memory.getArray()).toMatchObject(memoryToZero);
    })

});
