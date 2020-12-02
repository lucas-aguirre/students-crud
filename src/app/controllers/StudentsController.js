const { Student } = require('../models/Index');
const HttpResponseCode = require('../../helpers/HttpResponseCode');
const JsonHelper = require('../../helpers/JsonHelper');
const SequelizeOperators = require('Sequelize').Op;

class StudentsController {
    async list({ query }, res) {
        try {
            const search = query.search ? query.search : '';

            const result = await Student.findAll({
                where: {
                    [SequelizeOperators.or]: [
                        {
                            academicRecord: {
                                [SequelizeOperators.like]: `%${search}%`
                            }
                        },
                        {
                            name: {
                                [SequelizeOperators.like]: `%${search}%`
                            }
                        },
                        {
                            email: {
                                [SequelizeOperators.like]: `%${search}%`
                            }
                        },
                        {
                            document: {
                                [SequelizeOperators.like]: `%${search}%`
                            }
                        },
                    ],
                },
                order: [
                    [
                        'createdAt', 'DESC'
                    ]
                ]
            });

            return res.status(HttpResponseCode.HTTP_OK()).send(JsonHelper.jsonResponse(true, 'Lista de alunos carregada com sucesso', result))
        } catch (error) {
            return res.status(HttpResponseCode.HTTP_BAD_REQUEST()).send(JsonHelper.jsonResponse(true, 'Erro ao carregar a lista de alunos'))
        }
    }

    async find({ params }, res) {
        try {
            const { academicRecord } = params;

            if (!academicRecord) {
              throw new Error('Registro acadêmico não encontrado')
            }

            const result = await Student.findOne({
                where: {
                    academicRecord: academicRecord
                }
            })

            return res.status(HttpResponseCode.HTTP_OK()).send(JsonHelper.jsonResponse(true, 'Aluno encontrado', result));
        } catch (error) {
            return res.status(HttpResponseCode.HTTP_BAD_REQUEST()).send(JsonHelper.jsonResponse(false, 'Erro ao carregar o aluno'))
        }
    }

    async create({ body }, res) {
        try {
            const payload = body;

            if (!payload.academicRecord || !payload.name || !payload.email || !payload.document || payload.document.length != 11) {
                throw new Error('Dados inválidos para cadastrar o usuário')
            }

            const student = await Student.findOne({
                where: {
                    [SequelizeOperators.or]: [
                        {
                            academicRecord: payload.academicRecord
                        },
                        {
                            document: payload.document
                        },
                    ]
                }
            })

            if (student) {
                throw new Error('Aluno já cadastrado')
            }

            const result = await Student.create(payload);
            return res.status(HttpResponseCode.HTTP_CREATED()).send(JsonHelper.jsonResponse(true, 'Aluno cadastrado com sucesso', result))
        } catch (error) {
            return res.status(HttpResponseCode.HTTP_BAD_REQUEST()).send(JsonHelper.jsonResponse(false, error.message))
        }
    }

    async update({ body, params }, res) {
        try {
            const { academicRecord } = params;
            const payload = body;

            if (!academicRecord) {
                throw new Error('Registro acadêmico não encontrado')
            }

            if (!payload.name || !payload.email) {
                throw new Error('Dados inválidos para atualizar o usuário')
            }

            const [result] = await Student.update({name: payload.name, email: payload.email}, {
                where: {
                    academicRecord: academicRecord
                }
            })

            return res.status(HttpResponseCode.HTTP_OK()).send(JsonHelper.jsonResponse(true, 'Aluno atualizado com sucesso', result));
        } catch (error) {
            return res.status(HttpResponseCode.HTTP_BAD_REQUEST()).send(JsonHelper.jsonResponse(false, error.message))
        }
    }

    async delete({ params }, res) {
        try {
            const { academicRecord } = params;

            if (!academicRecord) {
                throw new Error('Registro acadêmico não encontrado')
            }

            const result = await Student.destroy({
                where: {
                    academicRecord: academicRecord
                }
            })

            if (!result) {
                throw 'Aluno não deletado';
            }

            return res.status(HttpResponseCode.HTTP_OK()).send(JsonHelper.jsonResponse(true, 'Aluno deletado com sucesso', result));
        } catch (error) {
            return res.status(HttpResponseCode.HTTP_BAD_REQUEST()).send(JsonHelper.jsonResponse(false, error.message))
        }
    }
}

module.exports = new StudentsController();