import {Router} from "express";
import AppDataSource from "../datasource.js";
import logger from "../typeorm/logger/winston.js";
import TeacherEntity from "../typeorm/entities/teacher.entity.js";


const router = Router();


router.get("/", async (req, res) => {
    try {
        logger.log({
            timestamp: new Date(),
            message: "Fetching all teachers",
            label: "teachers",
            level: "info"
        });

        const teacherRepository = AppDataSource.getRepository(TeacherEntity);
        const teachers = await teacherRepository.find({
            select: {
                name: true,
                subject: true,
                email: true,
                contactNumber: true
            }
        });

        logger.log({
            timestamp: new Date(),
            message: `Successfully fetched ${teachers.length} teachers`,
            label: "teachers",
            level: "info"
        });
        res.status(200).json({data: teachers});
    } catch (error) {
        logger.log({
            timestamp: new Date(),
            error,
            message: "Failed to fetch teachers",
            label: "teachers",
            level: "error"
        });
        res.status(500).json({error: "Failed to fetch teachers"});
    }
});


router.post("/", async (req, res) => {
    try {
        const {name, subject, email, contactNumber} = req.body;

        logger.log({
            timestamp: new Date(),
            message: `Creating new teacher: ${name}`,
            label: "teachers",
            level: "info"
        });
        console.log(req, "Req")

        if (!name || !subject || !email || !contactNumber) {
            logger.log({
                timestamp: new Date(),
                message: "Validation failed: Missing required fields",
                label: "teachers",
                level: "warn"
            });
            return res.status(400).json({error: "All fields are required"});
        }

        const teacherRepository = AppDataSource.getRepository(TeacherEntity);
        const teacher = teacherRepository.create({
            name,
            subject,
            email,
            contactNumber
        });

        const savedTeacher = await teacherRepository.save(teacher);

        logger.log({
            timestamp: new Date(),
            message: `Successfully created teacher: ${savedTeacher.name} (ID: ${savedTeacher.id})`,
            label: "teachers",
            level: "info"
        });

        res.sendStatus(201)
    } catch (error) {
        logger.log({
            timestamp: new Date(),
            error,
            message: "Failed to create teacher",
            label: "teachers",
            level: "error"
        });

        if (error.code === '23505') {
            if (error.detail.includes('(email)')) res.status(400).json({error: 'Email already exists'});
            else if (error.detail.includes('("contactNumber")')) res.status(400).json({error: 'Contact number already exists'});
        } else {
            res.status(500).json({error: "Failed to create teacher"});
        }
    }
});


export default router;