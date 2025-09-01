import {DataSource} from "typeorm";
import TeacherEntity from "./typeorm/entities/teacher.entity.js";
import ClassEntity from "./typeorm/entities/class.entity.js";


const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "school_portal",
    synchronize: true,
    logging: process.env.NODE_ENV === "development",
    entities: [TeacherEntity, ClassEntity],
    migrations: [],
    subscribers: [],
});

export default AppDataSource;