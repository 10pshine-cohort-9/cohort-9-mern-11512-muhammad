import request from "supertest"
import { expect } from "chai"
import app from "../src/app.js"
import pool from "../src/config/db.js"

describe("Notes APP Backend Unit & intregration tests", () => {


    //TEST 1 : Root route
    describe("GET /", () => {
        it("should return 200 OK and Welcome message", async () => {
            const res = await request(app).get("/")
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message");
        });
    });

    // test 2 : Auth
    describe("POST /", () => {
        it("should return 400 if pass is missing", async () => {
            const res = await request(app)
                .post("/auth/register")
                .send({ email:"incomplete@test.com"});
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal("All fields are required");
        });
    });

    describe("POST /auth/login validation", () => {
        it("should return 400 if password is missing", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({ email: "incomplete@test.com" });
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal("All fields are required");
        });
    });


    // TEST 3: Route Protection (AUth Middleware)
    describe("protected Notes Routes", () => {
        it ("GET /notes should return 401 without token ", async () => {
            const res = await request(app).get("/notes");
            expect(res.status).to.equal(401);
        });

        it("POST /notes should return 401 without token", async () => {
            const res = await request(app)
                .post("/notes")
                .send({ title: "Test Note", content: "Test Content" })
            expect(res.status).to.equal(401);
        } );
    });


    // Test 4 : Full AUthenticated Notes Flow
    describe("Authenticated Notes Lifecycle", () => {
        const testUser = {
        full_name: "Test Runner",
        email: `test_${Date.now()}@example.com`,
        password: "password123"
        };
        let authToken = "";
        let createdNoteId = "";

        before(async () => {
        // Register user
        await request(app).post("/auth/register").send(testUser);
        // Login For token
        const loginRes = await request(app).post("/auth/login").send({
            email: testUser.email,
            password: testUser.password
        });
        authToken = loginRes.body.token;
        });

        it("should CREATE a note with valid token", async () => {
        const res = await request(app)
            .post("/notes")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ title: "Mocha Test Note", content: "Testing with Mocha & Chai" });
        expect(res.status).to.equal(201);
        expect(res.body.note).to.have.property("id");
        createdNoteId = res.body.note.id;
        });

        it("should GET all notes for user", async () => {
        const res = await request(app)
            .get("/notes")
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        });

        it("should UPDATE the note", async () => {
        const res = await request(app)
            .put(`/notes/${createdNoteId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send({ title: "Updated Mocha Note", content: "Updated Content" });
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal("Updated Mocha Note");
        });

        it("should DELETE the note", async () => {
        const res = await request(app)
            .delete(`/notes/${createdNoteId}`)
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("Note deletedd");
        });
    });

    after(async () => {
      await pool.end();
    });
});