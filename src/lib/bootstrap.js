import { operations } from '#constants/operations.js';
import { BINARY_OPERATORS } from '#constants/operators.js';
import { InvalidInputError } from '#errors/invalidInputError.js';
import { getBinaryOperatings, getSingleOperating } from '#lib/getOperatings.js';
import { getOperator } from '#lib/getOperator.js';
import { prompQuestion } from '#lib/promptQuestion.js';

export const bootstrap = async () => {
    try {
        const userAnswer = await prompQuestion('intruduce tu operacion: ');

        const standarizeInput = userAnswer.trim();

        if (!standarizeInput) throw new InvalidInputError();

        if (standarizeInput === 'exit') {
            return true;
        }

        const operator = getOperator(standarizeInput);

        if (!operator) throw new InvalidInputError();

        const splittedInput = standarizeInput.split(operator);

        let firstOperating, secondOperating;

        if (BINARY_OPERATORS.includes(operator)) {
            [firstOperating, secondOperating] =
                getBinaryOperatings(splittedInput);
        } else {
            [firstOperating] = getSingleOperating(splittedInput);
        }

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
