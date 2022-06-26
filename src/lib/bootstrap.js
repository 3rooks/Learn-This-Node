import { operations } from '#constants/operations.js';
import { InvalidInputError } from '#errors/invalidInputError.js';
import { prompQuestion } from '#lib/promptQuestion.js';
import { extractByRegex } from './extractByRegex.js';

export const bootstrap = async () => {
    try {
        const userAnswer = await prompQuestion('intruduce tu operacion: ');

        const standarizeInput = userAnswer.trim();

        if (!standarizeInput)
            throw new InvalidInputError().replaceAll(',', '.');

        if (standarizeInput === 'exit') return true;

        const [firstOperating, operator, secondOperating] =
            extractByRegex(standarizeInput);

        const result = operations[operator](firstOperating, secondOperating);

        const roundedResult = Number(Math.round(result + 'e+5') + 'e-5');

        if (isNaN(roundedResult) || !isFinite(roundedResult)) {
            console.log('OPERACION NO VALIDA\n');
        } else {
            console.log(`El resultado es: ${roundedResult}\n`);
        }
    } catch (error) {
        if (error instanceof InvalidInputError)
            console.log(`${error.message}\n`);
        else
            console.log(
                `Error no esperado: ${error.message}. Stack: ${error.stack}\n`
            );
    }
};
