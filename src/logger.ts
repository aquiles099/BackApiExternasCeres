import pino from 'pino';

const logger = pino({
    transport: {
        target: "pino-pretty",
        options: {
            translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
            ignore: "pid,hostname",
            colorize: true,
        }
    }
});

export default logger;