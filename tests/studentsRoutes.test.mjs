import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../server.js";
import { Student } from "../src/models/studentModel.js";
import { createStudentService } from "../src/services/studentServices.js";

// Declare a variable for in-memory mongodb
let mongoServer;

// Create an in-memory database server for the tests.
beforeAll(async () => {
  // Create in-memory database
  mongoServer = await MongoMemoryServer.create();
  // Get the URI of the newly created database
  const uri = mongoServer.getUri();
  // Connect to the newly created database
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Ensure a clean state of tests by deleting all students before each test case
beforeEach(async () => {
  await Student.deleteMany({});
});

// Close database connection and stop the in-memory server after all tests.
afterAll(async () => {
  // Disconnect from the database
  await mongoose.disconnect();
  // Stop the in-memory database server.
  await mongoServer.stop();
});

describe("POST /api/students with invalid payload", () => {
  it("should return 400 and validation details when schema is invalid", async () => {
    // Post Payload
    const userData = {
      email: "test@example.com",
      password: "password123",
    };
    // Post the request with the invalid payload
    const res = await request(app)
      .post("/api/students")
      .send(userData)
      .expect("Content-Type", /json/)
      .expect(400);
    // Check the returns that
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/Validation error:/i);
    expect(res.body).toHaveProperty("details");
  });
});

describe("GET /api/students/:studentId with non numaric studentId", () => {
  it("should return 400 and validation details when studentId is not numeric", async () => {
    // GET request with the invalid studentId
    const res = await request(app)
      .get("/api/students/man")
      .expect("Content-Type", /json/)
      .expect(400);
    // Check the returns that
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/Validation error:/i);
    expect(res.body).toHaveProperty("details");
  });
});

describe("GET /api/students/:studentId", () => {
  it("should return 404 student does not exist", async () => {
    // Get request with non existing student id
    const res = await request(app)
      .get("/api/students/1")
      .expect("Content-Type", /json/)
      .expect(404);
  });
  it("should return 200 student exists", async () => {
    const studentWithMinmumFields = {
      firstName: "Salem",
      secondName: "Ahmed",
      dateOfBirth: "2008-01-05",
      contactNumber: "38846577",
      gender: "Male",
      email: "saloom@saloom.org",
    };
    const student = await createStudentService(studentWithMinmumFields);
    // Get request with existing student id
    const res = await request(app)
      .get(`/api/students/${student.studentId}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("should return 400 and validation details when studentId is not numeric", async () => {
    // GET request with the invalid studentId
    const res = await request(app)
      .get("/api/students/man")
      .expect("Content-Type", /json/)
      .expect(400);
    // Check the returns that
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/Validation error:/i);
    expect(res.body).toHaveProperty("details");
  });
});

describe("POST /api/students successfully", () => {
  it("Minumum required parameters", async () => {
    const studentWithMinmumFields = {
      firstName: "Salem",
      secondName: "Ahmed",
      dateOfBirth: "2008-01-05",
      contactNumber: "38846577",
      gender: "Male",
      email: "saloom@saloom.org",
    };
    const res = await request(app)
      .post("/api/students")
      .send(studentWithMinmumFields)
      .expect("Content-Type", /json/)
      .expect(201);
  });
  it("All parameters", async () => {
    const studentWithAllParameters = {
      firstName: "Salwa",
      secondName: "Abdulrahman",
      dateOfBirth: "2015-12-22",
      contactNumber: "66974522",
      gender: "Male",
      email: "salwaalhelwa@test.net",
      relatives: [
        {
          name: "Sarah Mansoor",
          mobile: "5551234567",
          relationship: "Mother",
          status: "Contact",
        },
        {
          name: "Abdulrahman Nooh",
          mobile: "5559876543",
          relationship: "Father",
          status: "Guardian",
        },
      ],
      notes: [
        { text: "Requires peanut-free environment." },
        { text: "Excellent academic performance in Science." },
      ],
    };
    const res = await request(app)
      .post("/api/students")
      .send(studentWithAllParameters)
      .expect("Content-Type", /json/)
      .expect(201);
  });
});

describe("GET /api/students successfully", () => {
  it("GET /api/students --> should return no students", async () => {
    const res = await request(app)
      .get("/api/students")
      .expect("Content-Type", /json/)
      .expect(200); // Expect a 200 OK status
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(0);
  });
  it("GET /api/students --> should return all students", async () => {
    const studentWithMinmumFields = {
      firstName: "Salem",
      secondName: "Ahmed",
      dateOfBirth: "2008-01-05",
      contactNumber: "38846577",
      gender: "Male",
      email: "saloom@saloom.org",
    };
    const studentWithAllParameters = {
      firstName: "Salwa",
      secondName: "Abdulrahman",
      dateOfBirth: "2015-12-22",
      contactNumber: "66974522",
      gender: "Male",
      email: "salwaalhelwa@test.net",
      relatives: [
        {
          name: "Sarah Mansoor",
          mobile: "5551234567",
          relationship: "Mother",
          status: "Contact",
        },
        {
          name: "Abdulrahman Nooh",
          mobile: "5559876543",
          relationship: "Father",
          status: "Guardian",
        },
      ],
      notes: [
        { text: "Requires peanut-free environment." },
        { text: "Excellent academic performance in Science." },
      ],
    };
    await createStudentService(studentWithMinmumFields);
    await createStudentService(studentWithAllParameters);
    const res = await request(app)
      .get("/api/students")
      .expect("Content-Type", /json/)
      .expect(200); // Expect a 200 OK status
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2);
  });
});

describe("PATCH /api/students/:studentId", () => {
  it("should return 400 if student id is non numeric", async () => {
    const res = await request(app)
      .patch("/api/students/1a")
      .expect("Content-Type", /json/)
      .expect(400);
  });
  it("should return 400 if update schema invalid", async () => {
    const invalidUpdateSchema = {};
    const res = await request(app)
      .patch("/api/students/1")
      .send(invalidUpdateSchema)
      .expect("Content-Type", /json/)
      .expect(400);
  });
  it("should return 404 if student does not exist", async () => {
    const validUpdateSchema = { firstName: "Ahmed" };
    const res = await request(app)
      .patch("/api/students/999")
      .send(validUpdateSchema)
      .expect("Content-Type", /json/)
      .expect(404);
  });
  it("should return 200 if minimum requirements met with the right student id", async () => {
    const studentWithMinmumFields = {
      firstName: "Salem",
      secondName: "Ahmed",
      dateOfBirth: "2008-01-05",
      contactNumber: "38846577",
      gender: "Male",
      email: "saloom@saloom.org",
    };
    const student = await createStudentService(studentWithMinmumFields);
    const validUpdateSchema = { firstName: "Ahmed" };
    const res = await request(app)
      .patch(`/api/students/${student.studentId}`)
      .send(validUpdateSchema)
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("DELETE /api/students/:studentId", () => {
  it("should return 400 if student id is non numeric", async () => {
    const res = await request(app)
      .delete("/api/students/1a")
      .expect("Content-Type", /json/)
      .expect(400);
  });
  it("should return 404 if student does not exist", async () => {
    const res = await request(app)
      .delete("/api/students/999")
      .expect("Content-Type", /json/)
      .expect(404);
  });
  it("should return 202 if student deleted successfully", async () => {
    const studentWithMinmumFields = {
      firstName: "Salem",
      secondName: "Ahmed",
      dateOfBirth: "2008-01-05",
      contactNumber: "38846577",
      gender: "Male",
      email: "saloom@saloom.org",
    };
    const student = await createStudentService(studentWithMinmumFields);
    const res = await request(app)
      .delete(`/api/students/${student.studentId}`)
      .expect("Content-Type", /json/)
      .expect(202);
  });
});
