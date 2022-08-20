import { Transform } from 'stream';

export class ProgressStream extends Transform {
    constructor(progressBar) {
        super();

        this.progressBar = progressBar;
    }

    _transform(chunk, encoding, cb) {
        const chunkLength = Buffer.byteLength(chunk, encoding);

        this.progressBar.increment(chunkLength);

        cb(null, chunk);
    }

    _final(cb) {
        this.progressBar.stop();
        cb(null);
    }
}
