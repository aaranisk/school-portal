import {EntitySchema} from "typeorm";
import BaseEntity from "./base.entity.js";

const ClassEntity = new EntitySchema({
    name: "Class",
    tableName: "classes",
    columns: {
        ...BaseEntity,
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        level: {
            type: "varchar",
            length: 50,
        },
        name: {
            type: "varchar",
            length: 50,
        },
        teacherEmail: {
            type: "varchar",
            length: 255,
            unique: true,
        },
    },
    relations: {
        formTeacher: {
            type: "many-to-one",
            target: "Teacher",
            inverseSide: "classes",
            joinColumn: {
                name: "teacherEmail",
                referencedColumnName: "email",
            },
        },
    },
});

export default ClassEntity;