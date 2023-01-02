export const opCodeFinder = (memory: Uint8Array) => {
    return (pc: number) => {
        // Get opcode from memory (16bits/2bytes).
        // 1) Get the first byte from memory and shift it 8 bits to the left.
        // 2) Get the second byte from memory and add it to the first byte.
        return (memory[pc] << 8) | memory[pc + 1];
    };
}