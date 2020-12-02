module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        academicRecord: {
            type: DataTypes.STRING(15),
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(15)
        },
        email: {
            type: DataTypes.STRING(255)
        },
        document: {
            type: DataTypes.STRING(255)
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    });

    return Student;
}