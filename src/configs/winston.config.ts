import { WinstonFileSize } from '../constants/enums/winstonFileSize.enum';

export const winstonOptions = {
    errorFile: {
        level: 'error',
        name: 'file.error',
        filename: `${__dirname}/../logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: WinstonFileSize.MEGABYTES * WinstonFileSize.KILOBYTES * WinstonFileSize.BYTES,
        maxFiles: 100,
        colorize: true
    }
};
