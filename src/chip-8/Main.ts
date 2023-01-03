import { RomDumpMaze } from "../ROMDUMP/RomDumpMaze";
import { Log } from "./console/Log";
import { Memory } from "./core/Memory";
import { PC } from "./core/PC";
import { VRegisters } from "./core/registers/VRegisters";
import { opCodeFinder } from "./helpers";
import { Screen } from "./screen/Screen";


const Loop = (callback: any) => {
    return () => {
        callback();
    }
}

export const Main = () => {
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

    const loop = Loop(() => {
        const memoryValue = memory.getWord(pc.get());
        const { instruction, x, y, n, nn, nnn } = opCodeFinder(memoryValue);

        Log(`- OP ${instruction.toString(16).toUpperCase()}`).warning();
        switch (instruction) {
            case 0: {
                break;
            }
            case 1: {
                break;
            }
            case 2: {
                break;
            }
            case 3: {
                break;
            }
            case 4: {
                break;
            }
            case 5: {
                Log(`#### SE V${x.toString(16).toUpperCase()}, V${y.toString(16).toUpperCase()}`).warning();
                console.log("VX", vRegisters.get(x));
                console.log("VY", vRegisters.get(y));

                const VX = vRegisters.get(x);
                const VY = vRegisters.get(y);

                if(VX === VY) {
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
                break;
            }
            case 8: {
                break;
            }
            case 9: {
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
                Log(`#### DRW V${x.toString(16).toUpperCase()}, V${y.toString(16).toUpperCase()}, ${n.toString(16).toUpperCase()} | OK`).warning();
                // Dibuja un sprite en la pantalla
                // El sprite se encuentra en la dirección I
                // El ancho del sprite es de 8 pixeles
                // El alto del sprite es de N pixeles
                // El sprite se dibuja en la posición (VX, VY)
                // Si se superpone un pixel, se pone a 0
                // Si se superpone un pixel, VF se pone a 1
                // Si no se superpone un pixel, VF se pone a 0
                // Los sprites se dibujan XOR
                // Si se sale de la pantalla, se vuelve a dibujar por el otro lado
                    
                
                pc.increment();

                break;
            }
            case 0xE: {
                break;
            }
            case 0xF: {
                break;
            }

        }
    });

    // Call first time loop
    const loopCount = 8;
    const arrayLoop = Array.from(Array(loopCount).keys());
    
    arrayLoop.forEach((i) => {
        console.log( )
        Log("<-------- " + i +  " --------->").success();
        loop();
    });

    return () => {
        // console.log("- Ejecutando loop -");
        // loop();
    };
}
