const request = require('supertest');
const server = require('../../app');
const DatabaseUtils = require('../utils/DatabaseUtils');
const faker = require('faker');

describe('Students', () => {
    afterEach(() => {
        return DatabaseUtils.truncate()
    })

    it('Success to create student', async () => {
        const student = DatabaseUtils.generateFakerStudent(1);
        const response = await request(server).post('/api/students').send(student);

        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true)
        expect(response.body.result.academicRecord).toBe(student.academicRecord);
        expect(response.body.result.name).toBe(student.name);
        expect(response.body.result.email).toBe(student.email);
        expect(response.body.result.document).toBe(student.document);
    });

    it('Fail to create student = duplicated unique values', async () => {
        const student = DatabaseUtils.generateFakerStudent(1);
        await request(server).post('/api/students').send(student);

        const response = await request(server).post('/api/students').send(student);
        expect(response.body.status).toBe(false)
        expect(response.status).toBe(400)
    });

    it('Find user with success', async () => {
        const student = DatabaseUtils.generateFakerStudent(1);
        await request(server).post('/api/students').send(student);

        const response = await request(server).get(`/api/students/${student.academicRecord}`).send();
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true)
        expect(response.body.result.academicRecord).toBe(student.academicRecord);
        expect(response.body.result.name).toBe(student.name);
        expect(response.body.result.email).toBe(student.email);
        expect(response.body.result.document).toBe(student.document);
    });

    it('Update user with success', async () => {
        const student = DatabaseUtils.generateFakerStudent(1);
        await request(server).post('/api/students').send(student);

        const newName = faker.name.findName(),
              newEmail = faker.internet.email();

        const response = await request(server).put(`/api/students/${student.academicRecord}`).send({name: newName, email: newEmail});
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true)

        const updatedStudent = await request(server).get(`/api/students/${student.academicRecord}`).send();
        expect(updatedStudent.status).toBe(200);
        expect(updatedStudent.body.status).toBe(true)
        expect(updatedStudent.body.result.academicRecord).toBe(student.academicRecord);
        expect(updatedStudent.body.result.name).toBe(newName);
        expect(updatedStudent.body.result.email).toBe(newEmail);
    });

    it('Update user with success', async () => {
        const student = DatabaseUtils.generateFakerStudent(1);
        await request(server).post('/api/students').send(student);

        const response = await request(server).delete(`/api/students/${student.academicRecord}`).send();
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true)
    });
});