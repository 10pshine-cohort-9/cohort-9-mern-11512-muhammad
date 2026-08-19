import pino from "pino";

const logger = pino ({
    redact: ["req.headers.authorization", "req.headers.cookie"],
    transport: {
        target: "pino-pretty", 
        options: { colorize: true }
    }
});

export default logger;