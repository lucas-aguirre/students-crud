const DatabaseUtils = require('../utils/DatabaseUtils');
const {
  Student
} = require('../../app/models/Index');
const faker = require('faker');

describe('Students Unit Tests', () => {
  afterEach(() => {
    return DatabaseUtils.truncate()
  })

  it('Create student', async () => {
    let data = DatabaseUtils.generateFakerStudent()
    let student = await Student.create(data);

    expect(student.academicRecord).toBe(data.academicRecord);
    expect(student.name).toBe(data.name);
    expect(student.email).toBe(data.email);
    expect(student.document).toBe(data.document);
  });

  it('Create and find student by academic record', async () => {
    let data = DatabaseUtils.generateFakerStudent()
    await Student.create(data);

    let student = await Student.findOne({
      where: {
        academicRecord: data.academicRecord
      }
    });

    expect(student.academicRecord).toBe(data.academicRecord);
    expect(student.name).toBe(data.name);
    expect(student.email).toBe(data.email);
    expect(student.document).toBe(data.document);
  });

  it('Create, update and find student to verify', async () => {
    let originalStudent = DatabaseUtils.generateFakerStudent()
    await Student.create(originalStudent);

    let updatedStudent = DatabaseUtils.generateFakerStudent()
    await Student.update({
      name: updatedStudent.name,
      email: updatedStudent.email
    }, {
      where: {
        academicRecord: originalStudent.academicRecord
      }
    });

    let student = await Student.findOne({
      where: {
        academicRecord: originalStudent.academicRecord
      }
    });

    expect(student.name).toBe(updatedStudent.name);
    expect(student.email).toBe(updatedStudent.email);
  });

  it('Delete student', async () => {
    let data = DatabaseUtils.generateFakerStudent()
    await Student.create(data);

    await Student.destroy({
      where: {
        academicRecord: data.academicRecord
      }
    });

    let student = await Student.findOne({
      where: {
        academicRecord: data.academicRecord
      }
    });

    expect(student).toBe(null)
  });
});