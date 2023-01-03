import chalk from 'chalk';

const chalkWarning = chalk.hex('#FFA500');
const chalkDanger = chalk.hex('#FF0000');
const chalkSuccess = chalk.hex('#3498db');

export const Log = (message: string) => {
    return {
        log: () => console.log(message),
        warning: () => console.log(chalkWarning(message)),
        danger: () => console.log(chalkDanger(message)),
        success: () => console.log(chalkSuccess(message))
    }
}
