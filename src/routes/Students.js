const StudentsController = require('../app/controllers/StudentsController');

class StudentsRouter {
    async addRoutes(routes) {
        routes.get('/api/students/', StudentsController.list);
        routes.get('/api/students/:academicRecord', StudentsController.find);
        routes.post('/api/students/', StudentsController.create);
        routes.put('/api/students/:academicRecord', StudentsController.update);
        routes.delete('/api/students/:academicRecord', StudentsController.delete);
    }
}

module.exports = new StudentsRouter();