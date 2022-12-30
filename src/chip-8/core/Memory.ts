export type TMemoryReturn = {
    memory: Uint8Array
}
export const Memory = () => {
    const memory = new Uint8Array(4096).fill(0x00);
    return {
        // Obtiene el valor de una posición de memoria
        get: (address: number) => memory[address],
        // Asigna un valor a una posición de memoria
        set: (address: number, value: number) => memory[address] = value,
        // Pone a cero una posición de memoria
        delete: (address: number) => memory[address] = 0x00,
        // Obtenemso toda la memoria en formato Array Uint8
        getArray: () => memory,
        // Nos ayuda a volcar cualquier ROM de juego en la memoria.
        setDumpRom: (array: Uint8Array) => {
            memory.set(array, 0x200);
        },
        // Nos ayudará a resetear la memoria
        resetMemory: () => memory.fill(0x00)
    }
}