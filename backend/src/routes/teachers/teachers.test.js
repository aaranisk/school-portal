import request from "supertest";
import express from "express";
import AppDataSource from "../../datasource.js";
import TeacherEntity from "../../typeorm/entities/teacher.entity.js";
import teachersRouter from "./teachers.js";
import {IsNull, Not} from "typeorm";
import ClassEntity from "../../typeorm/entities/class.entity.js";

jest.mock("../../typeorm/logger/winston.js", () => ({
    log: jest.fn()
}));

let app;

beforeAll(async () => {
    app = express();
    app.use(express.json());
    app.use("/teachers", teachersRouter);

    await AppDataSource.initialize();
    await AppDataSource.getRepository(ClassEntity).delete({id: Not(IsNull())});
    await AppDataSource.getRepository(TeacherEntity).delete({id: Not(IsNull())});
});

afterEach(async () => {
    await AppDataSource.getRepository(ClassEntity).delete({id: Not(IsNull())});
    await AppDataSource.getRepository(TeacherEntity).delete({id: Not(IsNull())});
});

afterAll(async () => {
    await AppDataSource.destroy();
});

describe("Teachers API", () => {
    const teacherRepo = AppDataSource.getRepository(TeacherEntity);
    describe("GET /teachers", () => {
        describe("should return status code 200", () => {
            test("and an empty array when no teachers are saved in the db", async () => {
                const res = await request(app).get("/teachers");
                expect(res.status).toBe(200);
                expect(res.body).toEqual({data: []});
            });

            test("and an array of teachers if there are any teachers saved in the db", async () => {
                const teachers = [
                    {name: "Nicole Tan", email: "nicole@gmail.com", subject: "English", contactNumber: "61234567"},
                    {name: "Lydia Lee", email: "lydia@gmail.com", subject: "Science", contactNumber: "67895132"}
                ];
                await teacherRepo.save(teachers);
                const res = await request(app).get("/teachers");
                expect(res.status).toBe(200);
                expect(res.body).toEqual(
                    {
                        data: expect.arrayContaining([
                            {
                                name: "Nicole Tan",
                                email: "nicole@gmail.com",
                                subject: "English",
                                contactNumber: "61234567"
                            },
                            {
                                name: "Lydia Lee",
                                email: "lydia@gmail.com",
                                subject: "Science",
                                contactNumber: "67895132"
                            }
                        ])
                    })
            });
        });
    })
    describe("POST /teachers", () => {
        describe("should return status code 200", () => {
            test("and create a new teacher successfully", async () => {
                const teachers = [
                    {name: "Nicole Tan", email: "nicole@gmail.com", subject: "English", contactNumber: "61234567"},
                    {name: "Lydia Lee", email: "lydia@gmail.com", subject: "Science", contactNumber: "67895132"}
                ];
                await teacherRepo.save(teachers);
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "Billy Tan",
                        email: "billy@gmail.com",
                        subject: "Physical Education",
                        contactNumber: "61234568"
                    });

                expect(res.status).toBe(201);

                const savedTeachers = await AppDataSource.getRepository(TeacherEntity).find({
                    select: {
                        name: true,
                        email: true,
                        subject: true,
                        contactNumber: true,
                    }
                });
                expect(savedTeachers.length).toBe(3);
                expect(savedTeachers).toEqual(expect.arrayContaining([{
                        name: "Nicole Tan",
                        email: "nicole@gmail.com",
                        subject: "English",
                        contactNumber: "61234567"
                    }, {
                        name: "Lydia Lee",
                        email: "lydia@gmail.com",
                        subject: "Science",
                        contactNumber: "67895132"
                    }, {
                        name: "Billy Tan",
                        email: "billy@gmail.com",
                        subject: "Physical Education",
                        contactNumber: "61234568"
                    }
                    ])
                )
            });
        })
        describe("should return status code 400", () => {
            test("should return 400 for invalid email", async () => {
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "Nicole Tan",
                        email: "invalid-email",
                        subject: "English",
                        contactNumber: "6123 4567"
                    });
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Invalid email address");
            });
            test("should return 400 for email that does not have gmail as domain", async () => {
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "Nicole Tan",
                        email: "nicole@gov.sg",
                        subject: "English",
                        contactNumber: "6123 4567"
                    });
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Invalid email address");
            });

            test("if name is missing", async () => {
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        email: "nicole@gmail.com",
                        subject: "English",
                        contactNumber: "6123 4567"
                    });
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Name is required");
            });

            test("if email is missing", async () => {
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "Nicole Tan",
                        subject: "English",
                        contactNumber: "6123 4567"
                    });
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Email is required");
            });

            test("if subject is missing", async () => {
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "Nicole Tan",
                        email: "nicole@gmail.com",
                        contactNumber: "6123 4567"
                    });
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Subject is required");
            });

            test("if contactNumber is missing", async () => {
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "Nicole Tan",
                        email: "nicole@gmail.com",
                        subject: "English",
                    });
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Contact number is required");
            });

            test("if name is an empty string", async () => {
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "",
                        email: "nicole@gmail.com",
                        subject: "English",
                        contactNumber: "6123 4567"
                    });
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Name cannot be empty");
            });

            test("if email is an empty string", async () => {
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "Nicole Tan",
                        email: "",
                        subject: "English",
                        contactNumber: "6123 4567"
                    });
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Email cannot be empty");
            });

            test("if subject is an empty string", async () => {
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "Nicole Tan",
                        email: "nicole@gmail.com",
                        subject: "",
                        contactNumber: "6123 4567"
                    });
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Subject cannot be empty");
            });

            test("if contactNumber is an empty string", async () => {
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "Nicole Tan",
                        email: "nicole@gmail.com",
                        subject: "English",
                        contactNumber: ""
                    });
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Contact number cannot be empty");
            });

            test("if name is spaces only", async () => {
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: " ",
                        email: "nicole@gmail.com",
                        subject: "English",
                        contactNumber: "6123 4567"
                    });
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Name cannot be empty");
            });

            test("if email is spaces only", async () => {
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "Nicole Tan",
                        email: " ",
                        subject: "English",
                        contactNumber: "6123 4567"
                    });
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Email cannot be empty");
            });

            test("if subject is spaces only", async () => {
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "Nicole Tan",
                        email: "nicole@gmail.com",
                        subject: " ",
                        contactNumber: "6123 4567"
                    });
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Subject cannot be empty");
            });

            test("if contactNumber is spaces only", async () => {
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "Nicole Tan",
                        email: "nicole@gmail.com",
                        subject: "English",
                        contactNumber: " "
                    });
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Contact number cannot be empty");
            });

            test("if email already exists", async () => {
                await teacherRepo.save({
                    name: "Nicole Tan",
                    email: "nicole@gmail.com",
                    subject: "English",
                    contactNumber: "61234567"
                });

                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "Sarah Tan",
                        email: "nicole@gmail.com",
                        subject: "Mathematics",
                        contactNumber: "61234567"
                    });

                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Email already exists");
            });

            test("if contactNumber already exists", async () => {
                await teacherRepo.save({
                    name: "Nicole Tan",
                    email: "nicole@gmail.com",
                    subject: "English",
                    contactNumber: "61234567"
                });

                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "Sarah Tan",
                        email: "sarah@gmail.com",
                        subject: "Mathematics",
                        contactNumber: "61234567"
                    });

                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Contact number already exists");
            });

            test("for invalid contact number that is in the wrong format", async () => {
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "Nicole Tan",
                        email: "nicole@gmail.com",
                        subject: "English",
                        contactNumber: "123"
                    });
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Invalid contact number");
            });

            test("for invalid contact number that is does not start with 6", async () => {
                const res = await request(app)
                    .post("/teachers")
                    .send({
                        name: "Nicole Tan",
                        email: "nicole@gmail.com",
                        subject: "English",
                        contactNumber: "123"
                    });
                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Invalid contact number");
            });
        })
    });
});
