export const opCodeFinder = (memory: Uint8Array) => {
    return (pc: number) => {
        return (memory[pc] << 8) | memory[pc + 1];
    };
}