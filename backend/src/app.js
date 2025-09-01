import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url";
import fs from "fs";
import teacherRoutes from "./routes/teachers.js";
import classRoutes from "./routes/classes.js";
import initDataSource, {closeTypeOrmConnections} from "./typeorm/database-typeorm.js";
import logger from "./typeorm/logger/winston.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();


const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, {recursive: true});
}

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true, limit: '10mb'}));
app.use((req, res, next) => {
    logger.log({
        timestamp: new Date(),
        message: `${req.method} ${req.path}`,
        label: "http",
        level: "info",
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    next();
});


app.use("/api/teachers", teacherRoutes);
app.use("/api/classes", classRoutes);


app.get("/", (req, res) => {
    res.json({
        message: "School Portal API is running!",
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development"
    });
});


app.get("/health", async (req, res) => {
    try {

        const result = await AppDataSource.query('SELECT 1');
        res.json({
            status: "healthy",
            database: "connected",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logger.log({
            timestamp: new Date(),
            error,
            message: "Health check failed - database connection issue",
            label: "health",
            level: "error"
        });
        res.status(503).json({
            status: "unhealthy",
            database: "disconnected",
            timestamp: new Date().toISOString()
        });
    }
});


app.use((req, res) => {
    logger.log({
        timestamp: new Date(),
        message: `Route not found: ${req.method} ${req.originalUrl}`,
        label: "http",
        level: "warn"
    });
    res.status(404).json({error: "Route not found"});
});


app.use((error, req, res, next) => {
    logger.log({
        timestamp: new Date(),
        error,
        message: "Unhandled error occurred",
        label: "error",
        level: "error"
    });
    res.status(500).json({error: "Internal server error"});
});


const gracefulShutdown = async (signal) => {
    logger.log({
        timestamp: new Date(),
        message: `Received ${signal}. Starting graceful shutdown...`,
        label: "app",
        level: "info"
    });

    try {
        await closeTypeOrmConnections();
        logger.log({
            timestamp: new Date(),
            message: "Graceful shutdown completed",
            label: "app",
            level: "info"
        });
        process.exit(0);
    } catch (error) {
        logger.log({
            timestamp: new Date(),
            error,
            message: "Error during graceful shutdown",
            label: "app",
            level: "error"
        });
        process.exit(1);
    }
};


process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));


const startServer = async () => {
    try {
        logger.log({
            timestamp: new Date(),
            message: "Starting School Portal API...",
            label: "app",
            level: "info"
        });

        await initDataSource();

        app.listen(PORT, () => {
            logger.log({
                timestamp: new Date(),
                message: `Server is running on port ${PORT}`,
                label: "app",
                level: "info"
            });
            logger.log({
                timestamp: new Date(),
                message: `API Documentation: http://localhost:${PORT}`,
                label: "app",
                level: "info"
            });
            logger.log({
                timestamp: new Date(),
                message: `Health Check: http://localhost:${PORT}/health`,
                label: "app",
                level: "info"
            });
        });
    } catch (error) {
        logger.log({
            timestamp: new Date(),
            error,
            message: "Failed to start server",
            label: "app",
            level: "error"
        });
        process.exit(1);
    }
};

startServer();