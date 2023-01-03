export const Screen = () => {
    const screen: boolean [][] = new Array(32).fill(new Array(64).fill(false)); 

    return {
        clearScreen: () => {
            screen.forEach((row, index) => {
                screen[index] = new Array(64).fill(false);
            });
        },
        drawPixel: (x: number, y: number) => {
            screen[y][x] = true
        },
        isPixelOn: (x: number, y: number) => screen[y][x]
    }
}