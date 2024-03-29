import { PCOffset } from "../CONFIG";
const PCInit = () => {
    // PC va por bytes * 2 es decir que aumenta de 2 en 2
    let pc = PCOffset;

    return () => ({
        // Obtiene el valor de un registro
        get: () => pc,
        // Asigna un valor a un registro
        set: (value: number) => pc = value,
        // Resetear PC
        reset: () => pc = PCOffset,
        // Incrementar PC
        increment: (multiplied = 1) => pc += 2,
        incrementNext: () => pc += 4
    })
}

export const PC = PCInit();
