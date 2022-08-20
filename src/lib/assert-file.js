import { constants } from 'fs';
import { access } from 'fs/promises';

export const assertFileReadable = async (pathFile) => {
    try {
        await access(pathFile, constants.R_OK);
    } catch (err) {
        console.log(`Cannot read ${pathFile}\n`, err);
        process.exit(1);
    }
};

export const assertDirectoryWritable = async (pathFile) => {
    try {
        await access(pathFile, constants.W_OK);
    } catch (err) {
        console.log(`Cannot write ${pathFile}\n`, err);
        process.exit(1);
    }
};
