import request from "supertest";
import express from "express";
import AppDataSource from "../../datasource.js";
import ClassEntity from "../../typeorm/entities/class.entity.js";
import TeacherEntity from "../../typeorm/entities/teacher.entity.js";
import classes from "./classes.js";
import {IsNull, Not} from "typeorm";


jest.mock("../../typeorm/logger/winston.js", () => ({
    log: jest.fn()
}));

let app;

beforeAll(async () => {
    app = express();
    app.use(express.json());
    app.use("/classes", classes);
    await AppDataSource.initialize();
    await AppDataSource.getRepository(ClassEntity).delete({id: Not(IsNull())});
    await AppDataSource.getRepository(TeacherEntity).delete({id: Not(IsNull())});
});

afterEach(async () => {
    await AppDataSource.getRepository(ClassEntity).delete({id: Not(IsNull())});
    await AppDataSource.getRepository(TeacherEntity).delete({id: Not(IsNull())});
});

describe("Classes API", () => {
    const teacherRepo = AppDataSource.getRepository(TeacherEntity);
    const classRepo = AppDataSource.getRepository(ClassEntity);
    beforeEach(async () => {
        const teachers = [{
            name: "Sarah Lim",
            email: "sarah@gmail.com",
            subject: "English Language",
            contactNumber: '68129414'
        }, {
            name: "Hannah Low",
            subject: "Science",
            contactNumber: '68129415',
            email: "hannahloh@gmail.com"
        }]
        await teacherRepo.save(teachers);
    });
    describe("GET /api/classes", () => {
        describe("returns 200 status code ", () => {
            test("and an empty array when no classes are saved to the db", async () => {
                const res = await request(app).get("/classes");
                expect(res.status).toBe(200);
                expect(res.body).toEqual({data: []});
            });

            test("returns array of classes when classes are already saved in the db", async () => {
                const classes = [
                    {
                        level: 'Primary 2',
                        name: "Primary 2 English",
                        teacherEmail: "sarah@gmail.com"
                    }, {
                        level: 'Primary 3',
                        name: "Primary 3 Science",
                        teacherEmail: "hannahloh@gmail.com"
                    }]
                await classRepo.save(classes);
                const res = await request(app).get("/classes");
                expect(res.status).toBe(200);
                expect(res.body).toEqual({
                    data: [{
                        level: 'Primary 2',
                        name: "Primary 2 English",
                        formTeacher: {
                            name: "Sarah Lim"
                        }
                    }, {
                        level: 'Primary 3',
                        name: "Primary 3 Science",
                        formTeacher: {
                            name: "Hannah Low"
                        }
                    }]
                });
            })
        })
    })
    describe("POST /api/classes", () => {
        describe("returns 200 status code ", () => {
            test("and  creates a new class successfully", async () => {
                const classes = [
                    {
                        level: 'Primary 2',
                        name: "Primary 2 English",
                        teacherEmail: "sarah@gmail.com"
                    }]
                await classRepo.save(classes);
                const res = await request(app)
                    .post("/classes")
                    .send({level: "Primary 3", name: "Primary 3 Science", teacherEmail: "hannahloh@gmail.com"});
                expect(res.status).toBe(201);
                expect(res.body).toEqual({})
                const savedClasses = await classRepo.find({
                    select: {
                        level: true,
                        name: true,
                        teacherEmail: true,
                    }
                })
                expect(savedClasses.length).toEqual(2)
                expect(savedClasses).toEqual(expect.arrayContaining([{
                        level: 'Primary 2',
                        name: "Primary 2 English",
                        teacherEmail: "sarah@gmail.com"
                    }, {
                        level: 'Primary 3',
                        name: "Primary 3 Science",
                        teacherEmail: "hannahloh@gmail.com"
                    }])
                )
            });
        })
        describe("returns 400 status code ", () => {
            test("if there is an invalid email", async () => {
                const res = await request(app)
                    .post("/classes")
                    .send({level: "Primary 3", name: "Primary 3 Science", teacherEmail: "invalid-email"});

                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Invalid email address");
            });

            test("if there is an email that does not have gmail as domain", async () => {
                const res = await request(app)
                    .post("/classes")
                    .send({level: "Primary 3", name: "Primary 3 Science", teacherEmail: "sarah@hotmail.com"});

                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Invalid email address");
            });

            test("if teacher not found", async () => {
                const res = await request(app)
                    .post("/classes")
                    .send({level: "Primary 2", name: "Primary 2 science", teacherEmail: "clarissaLim@gmail.com"});

                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Form teacher not found");
            });

            test("if level is missing", async () => {
                const res = await request(app)
                    .post("/classes")
                    .send({
                        name: "Primary 2 English",
                        teacherEmail: "sarah@gmail.com"
                    });

                expect(res.status).toBe(400);
                expect(res.body.error).toBe("level is required");
            });

            test("if name is missing", async () => {
                const res = await request(app)
                    .post("/classes")
                    .send({
                        level: 'Primary 2',
                        teacherEmail: "sarah@gmail.com"
                    });

                expect(res.status).toBe(400);
                expect(res.body.error).toBe("name is required");
            });

            test("if teacherEmail is missing", async () => {
                const res = await request(app)
                    .post("/classes")
                    .send({
                        level: 'Primary 2',
                        name: "Primary 2 English",
                    });

                expect(res.status).toBe(400);
                expect(res.body.error).toBe("teacherEmail is required");
            });

            test("if level is an empty string", async () => {
                const res = await request(app)
                    .post("/classes")
                    .send({
                        level: "",
                        name: "Primary 2 English",
                        teacherEmail: "sarah@gmail.com"
                    });

                expect(res.status).toBe(400);
                expect(res.body.error).toBe("level cannot be empty");
            });

            test("if name is an empty string", async () => {
                const res = await request(app)
                    .post("/classes")
                    .send({
                        level: 'Primary 2',
                        name: "",
                        teacherEmail: "sarah@gmail.com"
                    });

                expect(res.status).toBe(400);
                expect(res.body.error).toBe("name cannot be empty");
            });

            test("if teacherEmail is an empty string", async () => {
                const res = await request(app)
                    .post("/classes")
                    .send({
                        level: 'Primary 2',
                        name: "Primary 2 English",
                        teacherEmail: ""
                    });

                expect(res.status).toBe(400);
                expect(res.body.error).toBe("teacherEmail cannot be empty");
            });

            test("if level is spaces only", async () => {
                const res = await request(app)
                    .post("/classes")
                    .send({
                        level: " ",
                        name: "Primary 2 English",
                        teacherEmail: "sarah@gmail.com"
                    });

                expect(res.status).toBe(400);
                expect(res.body.error).toBe("level cannot be empty");
            });

            test("if name is is spaces only", async () => {
                const res = await request(app)
                    .post("/classes")
                    .send({
                        level: 'Primary 2',
                        name: " ",
                        teacherEmail: "sarah@gmail.com"
                    });

                expect(res.status).toBe(400);
                expect(res.body.error).toBe("name cannot be empty");
            });

            test("if teacherEmail is is spaces only", async () => {
                const res = await request(app)
                    .post("/classes")
                    .send({
                        level: 'Primary 2',
                        name: "Primary 2 English",
                        teacherEmail: " "
                    });

                expect(res.status).toBe(400);
                expect(res.body.error).toBe("teacherEmail cannot be empty");
            });


            test("if teacher already has a class", async () => {
                const classes = [
                    {
                        level: 'Primary 2',
                        name: "Primary 2 English",
                        teacherEmail: "sarah@gmail.com"
                    }, {
                        level: 'Primary 3',
                        name: "Primary 3 Science",
                        teacherEmail: "hannahloh@gmail.com"
                    }]
                await classRepo.save(classes);
                const res = await request(app)
                    .post("/classes")
                    .send({level: "Primary 4", name: "Primary 4 Science", teacherEmail: "hannahloh@gmail.com"});

                expect(res.status).toBe(400);
                expect(res.body.error).toBe("Selected teacher already has a class");
            });
        })
    })
});
