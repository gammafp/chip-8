import { RomDumpMaze } from '../ROMDUMP/RomDumpMaze';
import { opCodeFinder } from '../chip-8/helpers/opCodeFinder/opCodeFinder';

describe("OpCode Finder, prueba de guardado y obtención de opCode", () => {
    // First class function/currying
    const getOpCode = opCodeFinder(RomDumpMaze);

    let PC = 1;
    let opCode = getOpCode(PC);
    let Expect = (RomDumpMaze[PC] << 8) | RomDumpMaze[PC + 1];
    test('Opcode Try 1 PC -> 1EC2 || Expect: ' + Expect + ' | Obtain: ' + opCode, () => {
        expect(Expect).toBe(opCode)
    });

    PC = 10;
    opCode = getOpCode(PC);
    Expect = (RomDumpMaze[PC] << 8) | RomDumpMaze[PC + 1];
    test('Opcode Try 2 PC -> 7004 || Expect: ' + Expect + ' | Obtain: ' + opCode, () => {
        expect(Expect).toBe(opCode)
    });

});

