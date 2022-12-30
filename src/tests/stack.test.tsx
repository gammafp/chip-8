import React from 'react';
import { Stack } from '../chip-8/core/Stack';

describe("Pruebas del módulo de STACK FIFO", () => {

    beforeAll(() => {
        jest.spyOn(global.console, 'error').mockImplementation(() => { });
    });
    afterAll(() => {
        (global.console.error as any).mockRestore();
    });


    const stack = Stack();
    stack(0x0013);
    stack(0x0034);
    stack(0x0056);
    stack(0x0078);
    stack(0x0090);

    test("Prueba de la pila esperada", () => {
        expect(stack()).toEqual(0x0090);
        expect(stack()).toEqual(0x0078);
        expect(stack()).toEqual(0x0056);
        expect(stack()).toEqual(0x0034);
    });

    test("Prueba de stack vacío", () => {
        expect(stack()).toEqual(0x0013);
        stack(0x0020);
        expect(stack()).toEqual(0x0020);
        expect(stack()).toEqual(0x0000);
    });

    test("Prueba de stack lleno, OVERFLOW", () => {
        stack(0x0013);
        stack(0x0034);
        stack(0x0056);
        stack(0x0078);
        stack(0x0090);
        stack(0x0013);
        stack(0x0034);
        stack(0x0056);
        stack(0x0078);
        stack(0x0090);
        stack(0x0013);
        stack(0x0034);
        stack(0x0056);
        stack(0x0078);
        stack(0x0091);
        stack(0x0083); // último elemnto admitido antes del overflow

        // Overflow!
        stack(0x0020);
        expect(console.error).toHaveBeenCalledTimes(1)
    });

    test("Prueba de llenado una vez más", () => {
        stack(0x0078); // Overflow! Se espera 0x0083

        expect(0x0083).toEqual(stack());
        expect(0x0091).toEqual(stack());

        // Ya se ha liberado espacio y se puede meter más elementos
        stack(0x0071);
        expect(0x0071).toEqual(stack());
        // stack(0x0090);
        // expect(stack()).toEqual(0x0090);
        // expect(stack()).toEqual(0x0078);
    });
});