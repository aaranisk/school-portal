import {EntitySchema} from "typeorm";
import BaseEntity from "./base.entity.js";

const TeacherEntity = new EntitySchema({
    name: "Teacher",
    tableName: "teachers",
    columns: {
        ...BaseEntity,
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
            length: 50,
        },
        subject: {
            type: "varchar",
            length: 50,
        },
        email: {
            type: "varchar",
            length: 255,
            unique: true,
        },
        contactNumber: {
            type: "varchar",
            length: 8,
            unique: true,
        },
    },
    relations: {
        classes: {
            type: "one-to-many",
            target: "Class",
            inverseSide: "formTeacher",
        },
    },
});

export default TeacherEntity;