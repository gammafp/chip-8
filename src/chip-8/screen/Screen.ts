export const Screen = () => {
    const screen: number[][] = [];

    const width = 49;
    const height = 29;
    
    for (let y = 0; y < height; y++) {
        screen[y] = [];
        for (let x = 0; x < width; x++) {
            screen[y][x] = 0;
        }
    }

    return {
        clearScreen: () => {
            screen.forEach((row, yi) => {
                screen[yi].forEach((pixel, xi) => {
                    screen[yi][xi] = 0;
                });
            });
        },
        drawPixel: (x: number, y: number) => {
            // El porcentaje es para evitar desbordamiento.
            screen[y % height][x % width] ^= 1;
            // TODO: Send event to draw pixel
        },
        getArray: () => screen,
        isPixelOn: (x: number, y: number) => screen[y % height][x % width]
    }
}