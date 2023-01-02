// DUMP from Maze (c) 1978 Atari, Inc. Test purposes only.
const RomDumpMazeArray = new Uint8Array(48);
RomDumpMazeArray[0] = 0x60;
RomDumpMazeArray[1] = 0x00;
RomDumpMazeArray[2] = 0x61;
RomDumpMazeArray[3] = 0x00;

RomDumpMazeArray[4] = 0x64;
RomDumpMazeArray[5] = 0x00;

// Inicia el programa
RomDumpMazeArray[6] = 0xa2;
RomDumpMazeArray[7] = 0x2c;

RomDumpMazeArray[8] = 0xc2;
RomDumpMazeArray[9] = 0x01;
RomDumpMazeArray[10] = 0x64;
RomDumpMazeArray[11] = 0x01;

RomDumpMazeArray[12] = 0x52;
RomDumpMazeArray[13] = 0x40;
RomDumpMazeArray[14] = 0xa2;
RomDumpMazeArray[15] = 0x28;

RomDumpMazeArray[16] = 0xd0;
RomDumpMazeArray[17] = 0x14;
RomDumpMazeArray[18] = 0x70;
RomDumpMazeArray[19] = 0x05;

RomDumpMazeArray[20] = 0x64;
RomDumpMazeArray[21] = 0x32;
RomDumpMazeArray[22] = 0x50;
RomDumpMazeArray[23] = 0x40;

RomDumpMazeArray[24] = 0x12;
RomDumpMazeArray[25] = 0x06;
RomDumpMazeArray[26] = 0x60;
RomDumpMazeArray[27] = 0x00;

RomDumpMazeArray[28] = 0x71;
RomDumpMazeArray[29] = 0x05;
RomDumpMazeArray[30] = 0x64;
RomDumpMazeArray[31] = 0x1e;

RomDumpMazeArray[32] = 0x51;
RomDumpMazeArray[33] = 0x40;
RomDumpMazeArray[34] = 0x12;
RomDumpMazeArray[35] = 0x06;

RomDumpMazeArray[36] = 0xf0;
RomDumpMazeArray[37] = 0x0a;
RomDumpMazeArray[38] = 0x12;
RomDumpMazeArray[39] = 0x24;

RomDumpMazeArray[40] = 0x80;
RomDumpMazeArray[41] = 0x40;
RomDumpMazeArray[42] = 0x20;
RomDumpMazeArray[43] = 0x10;

RomDumpMazeArray[44] = 0x10;
RomDumpMazeArray[45] = 0x20;
RomDumpMazeArray[46] = 0x40;
RomDumpMazeArray[47] = 0x80;

const RomDumpMaze = RomDumpMazeArray;
export { RomDumpMaze };