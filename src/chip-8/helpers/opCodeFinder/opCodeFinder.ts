export const opCodeFinder = (opcode: number) => {
    // 0x6000 -> 0x6nnn
    const x = (opcode & 0x0F00) >> 8;
    const y = (opcode & 0x00F0) >> 4;
    const n = opcode & 0x000F;
    const nn = opcode & 0x00FF;
    const nnn = opcode & 0x0FFF;
    const instruction = (opcode & 0xF000) >> 12;

    return { 
        instruction,
        x,
        y,
        n,
        nn,
        nnn
    };
}