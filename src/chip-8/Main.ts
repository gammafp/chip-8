import chalk from "chalk";
import { Events } from "../Events";
import { RomDumpMaze } from "../ROMDUMP/RomDumpMaze";
import { Log } from "./console/Log";
import { Memory } from "./core/Memory";
import { PC } from "./core/PC";
import { VRegisters } from "./core/registers/VRegisters";
import { opCodeFinder } from "./helpers";
import { Screen } from "./screen/Screen";


const Loop = (callback: any) => {
    return (i: number) => {
        callback(i);
    }
}

export const Main = (gameDump?: any) => {
    const screen = Screen();
    const pc = PC();
    const memory = Memory();
    const vRegisters = VRegisters();
    // Especial registers
    let iRegister = 0x00;
    let delayTimer = 0x00;
    let soundTimer = 0x00;

    // Volcamos la ROM en la memoria
    memory.setDumpRom(RomDumpMaze);

    const loop = Loop((index: number) => {
        const memoryValue = memory.getWord(pc.get());
        const { instruction, x, y, n, nn, nnn } = opCodeFinder(memoryValue);

        Log(`- OP ${instruction.toString(16).toUpperCase()}`).warning();
        Log(`PC: ${pc.get().toString(16)}`).warning()
        switch (instruction) {
            case 0: {
                alert("0 IS MISSING");
                break;
            }
            case 1: {
                // Salta a la dirección nnn
                Log(`#### JP ${nnn.toString(16).toUpperCase()}`).warning();
                pc.set(nnn);

                Log(`- new pc: ${pc.get().toString(16)}`).warning()
                break;
            }
            case 2: {
                alert("2 IS MISSING");
                // Llama a la subrutina en la dirección nnn
                break;
            }
            case 3: {
                alert("3 IS MISSING");
                break;
            }
            case 4: {
                alert("4 IS MISSING");
                break;
            }
            case 5: {
                Log(`#### SE V${x.toString(16).toUpperCase()}, V${y.toString(16).toUpperCase()}`).warning();
                console.log("VX", vRegisters.get(x));
                console.log("VY", vRegisters.get(y));
                const VX = vRegisters.get(x);
                const VY = vRegisters.get(y);

                if (VX === VY) {
                    Log(`Increment`).danger();
                    pc.incrementNext();
                } else {
                    pc.increment();
                }
                break;
            }
            case 6: {
                // Guarda el valor de la constante nn en el registro VX
                Log(`#### LD V${x.toString(16).toUpperCase()}, ${nn.toString(16).toUpperCase()} | OK`).warning();
                vRegisters.set(x, nn);

                pc.increment();
                break;
            }
            case 7: {
                Log(`#### ADD V${x.toString(16).toUpperCase()}, ${nn.toString(16).toUpperCase()} | OK`).warning();
                vRegisters.set(x, vRegisters.get(x) + nn);
                Log(`- Register: ${vRegisters.get(x).toString(16).toUpperCase()}`).warning();

                pc.increment();
                break;
            }
            case 8: {
                alert("8 IS MISSING");
                break;
            }
            case 9: {
                alert("9 IS MISSING");
                break;
            }
            case 0xA: {
                // Guarda el valor de la constante nnn en el registro I
                Log(`#### LD I, ${nnn.toString(16).toUpperCase()} | OK`).warning();
                iRegister = nnn;

                pc.increment();
                break;
            }
            case 0xB: {
                alert("B IS MISSING");
                break;
            }
            case 0xC: {
                // Crea un número aleatorio entre 0 y 255, y lo guarda en VX haciendo un and a NN
                Log(`#### RND V${x.toString(16).toUpperCase()}, ${nn.toString(16).toUpperCase()} | OK`).warning();

                const randomValue = Math.floor(Math.random() * 255);
                const result = randomValue & nn;

                vRegisters.set(x, result);
                console.log("* Register: ", vRegisters.get(2))
                vRegisters.set(x, result);

                pc.increment();
                break;
            }
            case 0xD: {
                Log(`#### DRW V${x.toString(16).toUpperCase()}, V${y.toString(16).toUpperCase()}, ${n.toString(16).toUpperCase()} | REVISION`).warning();
                // Dibuja un sprite en la pantalla
                // El sprite se encuentra en la dirección I
                Log(`* I: ${iRegister.toString(16).toUpperCase()}`).success();
                // El ancho del sprite es de 8 pixeles
                // El alto del sprite es de N pixeles
                Log(`* N: ${n.toString(16).toUpperCase()}`).success();
                // El sprite se dibuja en la posición (VX, VY)
                Log(`* VX: ${vRegisters.get(x).toString(16).toUpperCase()}`).success();
                Log(`* VY: ${vRegisters.get(y).toString(16).toUpperCase()}`).success();
                const spriteMemory = memory.getSprite(iRegister, n);

                Log(`* Sprite: ${spriteMemory}`).success();
                const xPos = vRegisters.get(x);
                const yPos = vRegisters.get(y);

                spriteMemory.forEach((spriteLine, yi) => {
                    // TODO: Solo se obtienen los 8 bits menos significativos, aún no lo hacemos...
                    const binaryValue = spriteLine.toString(2).padStart(8, "0");
                    console.log("Binary value: ", binaryValue);
                    Array.from(binaryValue).forEach((bit, xi) => {
                        if (Number(bit) === 1) {
                            console.log("Posición: ", xPos + xi, yPos + yi);
                            // Control de collisiones (VF)
                            // Se pone Vf a 1 si se superpone un pixel
                            if(screen.isPixelOn(xPos + xi, yPos + yi)) {
                                vRegisters.set(0xF, 1);
                            }
                            // Dibuja el pixel
                            // screen.getArray()[xPos + xi][yPos + yi] ^= 1;
                            screen.drawPixel(xPos + xi, yPos + yi);
                        }
                    });
                    Events.emit("screen:draw", screen.getArray());
                });

                // Si se superpone un pixel, se pone a 0
                // Si se superpone un pixel, VF se pone a 1


                // Si no se superpone un pixel, VF se pone a 0
                // Los sprites se dibujan XOR
                // Si se sale de la pantalla, se vuelve a dibujar por el otro lado

                pc.increment();

                break;
            }
            case 0xE: {
                alert("E IS MISSING");
                break;
            }
            case 0xF: {
                // TODO: Esto se ha generado con IA por lo tanto hay que revisar
                switch (nn) {
                    case 0x07: {
                        alert("PAUSE 0x07");
                        // Guarda el valor del delay timer en VX
                        Log(`#### LD V${x.toString(16).toUpperCase()}, DT | OK`).warning();
                        vRegisters.set(x, delayTimer);
                        Log(`* Register: ${vRegisters.get(x).toString(16).toUpperCase()}`).warning();
                    }
                    case 0x0A: {
                        alert("PAUSE 0X0A " + index);
                        break;
                    }
                    case 0x15: {
                        alert("PAUSE 0x15");
                        // Guarda el valor de VX en el delay timer
                        Log(`#### LD DT, V${x.toString(16).toUpperCase()} | OK`).warning();
                        delayTimer = vRegisters.get(x);
                        Log(`* Delay timer: ${delayTimer.toString(16).toUpperCase()}`).warning();
                        break;
                    }
                    case 0x18: {
                        alert("PAUSE 0x18");
                        // Guarda el valor de VX en el sound timer
                        Log(`#### LD ST, V${x.toString(16).toUpperCase()} | OK`).warning();
                        soundTimer = vRegisters.get(x);
                        Log(`* Sound timer: ${soundTimer.toString(16).toUpperCase()}`).warning();
                        break;
                    }
                    case 0x1E: {
                        alert("PAUSE 0x1E");
                        // Añade VX a I
                        Log(`#### ADD I, V${x.toString(16).toUpperCase()} | OK`).warning();
                        iRegister += vRegisters.get(x);
                        Log(`* I: ${iRegister.toString(16).toUpperCase()}`).warning();
                        break;
                    }
                    case 0x29: {
                        alert("PAUSE 0x29");
                        // Pone el valor de I al sprite de la posición VX
                        Log(`#### LD F, V${x.toString(16).toUpperCase()} | OK`).warning();
                        iRegister = vRegisters.get(x) * 5;
                        Log(`* I: ${iRegister.toString(16).toUpperCase()}`).warning();
                        break;
                    }
                    case 0x33: {
                        alert("PAUSE 0x33");
                        // Guarda el valor de VX en la dirección I, I+1 e I+2
                        Log(`#### LD B, V${x.toString(16).toUpperCase()} | OK`).warning();
                        const value = vRegisters.get(x);
                        const hundreds = Math.floor(value / 100);
                        const tens = Math.floor((value - hundreds * 100) / 10);
                        const units = value - hundreds * 100 - tens * 10;
                        memory.set(iRegister, hundreds);
                        memory.set(iRegister + 1, tens);
                        memory.set(iRegister + 2, units);
                        Log(`* Hundreds: ${hundreds.toString(16).toUpperCase()}`).warning();
                        Log(`* Tens: ${tens.toString(16).toUpperCase()}`).warning();
                        Log(`* Units: ${units.toString(16).toUpperCase()}`).warning();
                        break;
                    }
                    case 0x55: {
                        alert("PAUSE 0x55");
                        // Guarda los valores de V0 a VX en la dirección I
                        Log(`#### LD [I], V${x.toString(16).toUpperCase()} | OK`).warning();
                        for (let i = 0; i <= x; i++) {
                            memory.set(iRegister + i, vRegisters.get(i));
                        }
                        break;
                    }
                    case 0x65: {
                        alert("PAUSE 0x65");
                        // Guarda los valores de la dirección I en V0 a VX
                        Log(`#### LD V${x.toString(16).toUpperCase()}, [I] | OK`).warning();
                        for (let i = 0; i <= x; i++) {
                            vRegisters.set(i, memory.get(iRegister + i));
                        }
                        break;
                    }
                }
                break;
            }

        }
    });

    // Call first time loop
    const loopCount = 596;
    const arrayLoop = Array.from(Array(loopCount).keys());

    arrayLoop.forEach((i) => {
        console.log()
        Log("<-------- " + i + " --------->").success();
        loop(i);
        console.log("######################");
    });

    const resetAll = () => {
        pc.reset();
        memory.resetMemory();
        vRegisters.reset();
        iRegister = 0x00;
        delayTimer = 0x00;
        soundTimer = 0x00;
        console.clear();
        memory.setDumpRom(RomDumpMaze);
        setTimeout(() => {
            arrayLoop.forEach((i) => {
                console.log()
                Log("<-------- " + i + " --------->").success();
                loop(i);
                console.log("######################");
            });
        }, 1000);
    }

    Events.on("loop", () => {
        resetAll();
    })

    return {
        Events
    }
}
