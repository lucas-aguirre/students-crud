'use strict';

const DatabaseUtils = require('../../tests/utils/DatabaseUtils')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return DatabaseUtils.seed()
    },

    down: (queryInterface, Sequelize) => {
        return DatabaseUtils.truncate()
    }
};