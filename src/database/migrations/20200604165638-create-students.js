'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('students', {
            academicRecord: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(15),
                unique: true
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING(255)
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING(255)
            },
            document: {
                allowNull: false,
                type: Sequelize.STRING(11)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('students')
    }
};