import {Router} from "express";
import logger from "../../typeorm/logger/winston.js";
import AppDataSource from "../../datasource.js";
import ClassEntity from "../../typeorm/entities/class.entity.js";
import TeacherEntity from "../../typeorm/entities/teacher.entity.js";
import {classSchema} from "./classes.schema.js";


export function getReadableErrorMessage(detail) {
    const field = detail.context.key;

    switch (detail.type) {
        case "string.empty":
            return `${field} cannot be empty`;

        case "any.required":
            return `${field} is required`;

        case "string.min":
            return `${field} must be at least ${detail.context.limit} characters long`;

        case "string.max":
            return `${field} cannot exceed ${detail.context.limit} characters`;

        case "string.pattern.base":
            if (field === "teacherEmail") {
                return "Invalid email address";
            }
            return `${field} does not match the required format`;
        default:
            return detail.message;
    }
}

const router = Router();


router.get("/", async (req, res) => {
    try {
        logger.log({
            timestamp: new Date(),
            message: "Fetching all classes",
            label: "classes",
            level: "info"
        });

        const classRepository = AppDataSource.getRepository(ClassEntity);
        const classes = await classRepository.find({
            relations: ["formTeacher"],
            select: {
                level: true,
                name: true,
                formTeacher: {
                    name: true
                }
            }
        });

        logger.log({
            timestamp: new Date(),
            message: `Successfully fetched ${classes.length} classes`,
            label: "classes",
            level: "info"
        });
        res.status(200).json({data: classes});

    } catch (error) {
        logger.log({
            timestamp: new Date(),
            error,
            message: "Failed to fetch classes",
            label: "classes",
            level: "error"
        });
        res.status(500).json({error: "Failed to fetch classes"});
    }
});


router.post("/", async (req, res) => {
    try {
        const {level, name, teacherEmail} = req.body;

        logger.log({
            timestamp: new Date(),
            message: `Creating new class: ${level} ${name}`,
            label: "classes",
            level: "info"
        });
        const {error} = classSchema.validate(req.body, {abortEarly: false});
        if (error) {
            logger.log({
                timestamp: new Date(),
                message: `Validation failed: ${error.details.map(d => d.message).join(", ")}`,
                label: "classes",
                level: "warn"
            });
            return res.status(400).json({error: getReadableErrorMessage(error.details[0])});
        }

        const classRepository = AppDataSource.getRepository(ClassEntity);
        const teacherRepository = AppDataSource.getRepository(TeacherEntity);

        const teacher = await teacherRepository.findOne({
            where: {email: teacherEmail}
        });

        if (!teacher) {
            logger.log({
                timestamp: new Date(),
                message: `Form teacher with email ${teacherEmail} not found`,
                label: "classes",
                level: "warn"
            });
            return res.status(400).json({error: "Form teacher not found"});
        }

        const classEntity = classRepository.create({
            level,
            name,
            teacherEmail
        });

        const savedClass = await classRepository.save(classEntity);

        const result = await classRepository.findOne({
            where: {id: savedClass.id},
            relations: ["formTeacher"]
        });

        logger.log({
            timestamp: new Date(),
            message: `Successfully created class: ${result.level} ${result.name} (ID: ${result.id})`,
            label: "classes",
            level: "info"
        });

        res.sendStatus(201)
    } catch (error) {

        logger.log({
            timestamp: new Date(),
            error,
            message: "Failed to create class",
            label: "classes",
            level: "error"
        })
        if (error.code === '23505') {
            res.status(400).json({error: "Selected teacher already has a class"});
        } else {
            res.status(500).json({error: "Failed to create class"});
        }
    }
});


export default router;