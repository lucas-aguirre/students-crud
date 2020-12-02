const { Student } = require('../../app/models/Index');
const faker = require('faker');
const fakeCpfGenerator = require('./FakeCpfGenerator');

class DatabaseUtils {
    generateFakerStudent = () => {
        return {
            academicRecord: faker.random.number({
                min: 1000000,
                max: 9999999
            }).toString(),
            name: faker.name.findName(),
            email: faker.internet.email(),
            document: fakeCpfGenerator.generateCpf()
        }
    }

    generateFakerStudentsList = (quantity) => {
        let students = []

        for (let index = 0; index < quantity; index++) {
            students.push(this.generateFakerStudent())
        }

        return students;
    }

    seed = () => {
        const records = this.generateFakerStudentsList(30)
        return Student.bulkCreate(records)
    }

    truncate = () => {
        return Student.destroy({
            truncate: true
        })
    }
}

module.exports = new DatabaseUtils();