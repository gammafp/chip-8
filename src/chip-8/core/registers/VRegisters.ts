export const VRegisters = () => {
    const registers = new Uint8Array(16).fill(0x00);

    return {
        // Obtiene el valor de un registro
        get: (register: number) => registers[register],
        // Asigna un valor a un registro
        set: (register: number, value: number) => registers[register] = value,
        // Pone a cero un registro
        delete: (register: number) => registers[register] = 0x00,
        // Obtenemos todos los registros en formato Array Uint8
        getArray: () => registers,
        // Get array in string Hexadecimal format
        getArrayHex: () => {
            const newRegistersBuffer = Array.from(new Uint8Array(registers.buffer))
            return newRegistersBuffer.map(x => x.toString(16).padStart(2, '0').toUpperCase());
        }
    }
}