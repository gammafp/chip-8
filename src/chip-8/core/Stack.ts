// El stack es una pila FIFO de 16 posiciones, donde cada posición son dos byte.
export const Stack = () => {
    const zero = 0x0000;
    const stack = new Uint16Array(16); // Short stack
    let stackPointer = 0;

    // TODO: Implement reset Memory.

    const setStackValue = (value?: number) => {
        // if (reset) {
        //     stack.fill(zero);
        //     stackPointer = 0;
        //     return stack;
        // }
        if (value !== undefined) {
            // overflow stack
            if (stackPointer >= stack.length) {
                console.error("!!! Stack overflow !!!");
            } else {
                stack[stackPointer] = value;
                stackPointer++;
            }
        } else {
            // pop stack
            stack[stackPointer] = zero;
            stackPointer--;
            // Empty stack
            if (stackPointer < 0) {
                stackPointer = 0;
                stack[stackPointer] = zero;
                console.log("## Underflow stack ##");
                return zero;
            } else {
                return stack[stackPointer];
            }
        }
    };

    return setStackValue;
}
