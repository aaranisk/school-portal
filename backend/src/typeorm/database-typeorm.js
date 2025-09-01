import AppDataSource from "../datasource.js";
import logger from "./logger/winston.js";


const initDataSource = () => AppDataSource.initialize()
    .then(() => {
        logger.log({
            timestamp: new Date(),
            message: "Database connection successful",
            label: "database",
            level: "info"
        });
    })
    .catch((error) => {
        logger.log({
            timestamp: new Date(),
            error,
            message: "Failed to initialise database connection",
            label: "database",
            level: "error"
        });
        throw error;
    });

export const getTypeOrmConnection = () => AppDataSource.manager;

export const closeTypeOrmConnections = () => AppDataSource.destroy()
    .then(() => logger.log({
        timestamp: new Date(),
        message: "Database connections closed",
        label: "database",
        level: "info"
    }))
    .catch((error) => logger.log({
        timestamp: new Date(),
        error,
        message: "Database connections failed to close",
        label: "database",
        level: "error"
    }));

export default initDataSource;