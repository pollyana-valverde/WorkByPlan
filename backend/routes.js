const express = require('express');
const connection = require('./db');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configurando o armazenamento do multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Pasta onde as imagens serão armazenadas
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome único para a imagem
    },
});

const upload = multer({ storage: storage });

/////////////////////////////////////////////login///////////////////////////////////////////////////
//Rota para buscar o cfp e senha necessários no login
router.post('/login/:email/:senha', (req, res) => {
    const { email, senha } = req.params;

    connection.query(
        'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
        [email, senha],
        (err, results) => {
            if (err) {
                console.error('Erro ao buscar o registro do cadastro:', err);
                return res.status(500).json({ error: 'Erro ao buscar o cadastro' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Cadastro não encontrado' });
            }

            const user = results[0];

            res.json({
                idUsuario: user.idUsuario, 
                nome: user.nome,
                sobrenome: user.sobrenome,
                email: user.email,
                telefone: user.telefone,
                cpf: user.cpf,
                endereco: user.endereco,
                senha: user.senha,
                tipoUser: user.tipoUser,
            });
        }
    );
});

///////////////////////////////////////////// usuários ////////////////////////////////////////////////
// Rota para listar todos os registros
router.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Erro ao buscar os registros:', err);
            res.status(500).json({ error: 'Erro ao buscar os registros' });
            return;
        }
        res.json(results);
    });
});

// Rota para buscar um registro específico pelo ID
router.get('/usuarios/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    connection.query('SELECT * FROM usuarios WHERE idUsuario = ?', [idUsuario], (err, results) => {
        if (err) {
            console.error('Erro ao buscar o registro:', err);
            res.status(500).json({ error: 'Erro ao buscar o registro' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Registro não encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

// Rota para criar um novo registro
router.post('/usuarios', (req, res) => {
    const { nome, sobrenome, email, cpf, endereco, telefone, senha, tipoUser } = req.body;

    connection.query('INSERT INTO usuarios (nome, sobrenome, email, cpf, endereco, telefone, senha, tipoUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nome, sobrenome, email, cpf, endereco, telefone, senha, tipoUser], (err, result) => {
            if (err) {
                console.error('Erro ao criar o registro:', err);
                res.status(500).json({ error: 'Erro ao criar o registro' });
                return;
            }
            res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
        });
});

// Rota para atualizar um registro existente pelo ID
router.put('/usuarios/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    const { nome, sobrenome, email, cpf, endereco, telefone, senha, tipoUser } = req.body;

    connection.query('UPDATE usuarios SET nome = ?, sobrenome = ?, email = ?, cpf = ?, endereco = ?, telefone = ?, senha = ?, tipoUser = ? WHERE idUsuario = ?',
        [nome, sobrenome, email, cpf, endereco, telefone, senha, tipoUser, idUsuario,], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar o registro:', err);
                res.status(500).json({ error: 'Erro ao atualizar o registro' });
                return;
            }
            res.json({ message: 'Registro atualizado com sucesso' });
        });
});

// Rota para atualizar uma senha existente pelo ID
router.put('/usuarios/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    const { senha } = req.body;

    connection.query('UPDATE usuarios SET  senha = ? WHERE idUsuario = ?',
        [senha, idUsuario,], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar o registro:', err);
                res.status(500).json({ error: 'Erro ao atualizar o registro' });
                return;
            }
            res.json({ message: 'Registro atualizado com sucesso' });
        });
});

// Rota para excluir um registro pelo ID
router.delete('/usuarios/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    connection.query('DELETE FROM usuarios WHERE idUsuario = ?', [idUsuario], (err, result) => {
        if (err) {
            console.error('Erro ao excluir o registro:', err);
            res.status(500).json({ error: 'Erro ao excluir o registro' });
            return;
        }
        res.json({ message: 'Registro excluído com sucesso' });
    });
});


//////////////////////////////// perfil empresa ///////////////////////////
// Rota para listar todos os registros
router.get('/perfilEmpresa', (req, res) => {
    connection.query('SELECT * FROM perfilEmpresa', (err, results) => {
        if (err) {
            console.error('Erro ao buscar os registros:', err);
            res.status(500).json({ error: 'Erro ao buscar os registros' });
            return;
        }
        res.json(results);
    });
});

// Rota para buscar um registro específico pelo ID
router.get('/perfilEmpresa/:idPerfilEmpresa', (req, res) => {
    const { idPerfilEmpresa } = req.params;
    connection.query('SELECT * FROM perfilEmpresa WHERE idPerfilEmpresa = ?', [idPerfilEmpresa], (err, results) => {
        if (err) {
            console.error('Erro ao buscar o registro:', err);
            res.status(500).json({ error: 'Erro ao buscar o registro' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Registro não encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

// Rota para criar um novo registro
router.post('/perfilEmpresa', (req, res) => {
    const { idUsuario, nomeFantasia, logo, descricao, endereco, ramo } = req.body;

    connection.query('INSERT INTO perfilEmpresa (idUsuario, nomeFantasia, logo, descricao, endereco, ramo) VALUES (?, ?, ?, ?, ?, ?)',
        [idUsuario, nomeFantasia, logo, descricao, endereco, ramo], (err, result) => {
            if (err) {
                console.error('Erro ao criar o registro:', err);
                res.status(500).json({ error: 'Erro ao criar o registro' });
                return;
            }
            res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
        });
});

// Rota para atualizar um registro existente pelo ID
router.put('/perfilEmpresa/:idPerfilEmpresa', (req, res) => {
    const { idPerfilEmpresa } = req.params;
    const { idUsuario, nomeFantasia, logo, descricao, endereco, ramo } = req.body;

    connection.query('UPDATE perfilEmpresa SET idUsuario = ?, nomeFantasia = ?, logo = ?, descricao = ?, endereco = ?, ramo = ? WHERE idPerfilEmpresa = ?',
        [idUsuario, nomeFantasia, logo, descricao, endereco, ramo, idPerfilEmpresa,], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar o registro:', err);
                res.status(500).json({ error: 'Erro ao atualizar o registro' });
                return;
            }
            res.json({ message: 'Registro atualizado com sucesso' });
        });
});

// Rota para excluir um registro pelo ID
router.delete('/perfilEmpresa/:idPerfilEmpresa', (req, res) => {
    const { idPerfilEmpresa } = req.params;
    connection.query('DELETE FROM perfilEmpresa WHERE idPerfilEmpresa = ?', [idPerfilEmpresa], (err, result) => {
        if (err) {
            console.error('Erro ao excluir o registro:', err);
            res.status(500).json({ error: 'Erro ao excluir o registro' });
            return;
        }
        res.json({ message: 'Registro excluído com sucesso' });
    });
});


///////////////////////////// serviços //////////////////////////////
// Rota para listar todos os registros
router.get('/servicos', (req, res) => {
    connection.query('SELECT * FROM servicos', (err, results) => {
        if (err) {
            console.error('Erro ao buscar os registros:', err);
            res.status(500).json({ error: 'Erro ao buscar os registros' });
            return;
        }
        res.json(results);
    });
});

// Rota para buscar um registro específico pelo ID
router.get('/servicos/:idServico', (req, res) => {
    const { idServico } = req.params;
    connection.query('SELECT * FROM servicos WHERE idServico = ?', [idServico], (err, results) => {
        if (err) {
            console.error('Erro ao buscar o registro:', err);
            res.status(500).json({ error: 'Erro ao buscar o registro' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Registro não encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

// Rota para criar um novo registro
router.post('/servicos', (req, res) => {
    const { idUsuario, nomeServico, categoria, descricao, preco, duracao } = req.body;

    connection.query('INSERT INTO servicos (idUsuario, nomeServico, categoria, descricao, preco, duracao) VALUES (?, ?, ?, ?, ?, ?)',
        [idUsuario, nomeServico, categoria, descricao, preco, duracao], (err, result) => {
            if (err) {
                console.error('Erro ao criar o registro:', err);
                res.status(500).json({ error: 'Erro ao criar o registro' });
                return;
            }
            res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
        });
});

// Rota para atualizar um registro existente pelo ID
router.put('/servicos/:idServico', (req, res) => {
    const { idServico } = req.params;
    const { idUsuario, nomeServico, categoria, descricao, preco, duracao } = req.body;

    connection.query('UPDATE servicos SET idUsuario = ?, nomeServico = ?, categoria = ?, descricao = ?, preco = ?, duracao = ? WHERE idServico = ?',
        [idUsuario, nomeServico, categoria, descricao, preco, duracao, idServico,], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar o registro:', err);
                res.status(500).json({ error: 'Erro ao atualizar o registro' });
                return;
            }
            res.json({ message: 'Registro atualizado com sucesso' });
        });
});

// Rota para excluir um registro pelo ID
router.delete('/servicos/:idServico', (req, res) => {
    const { idServico } = req.params;
    connection.query('DELETE FROM servicos WHERE idServico = ?', [idServico], (err, result) => {
        if (err) {
            console.error('Erro ao excluir o registro:', err);
            res.status(500).json({ error: 'Erro ao excluir o registro' });
            return;
        }
        res.json({ message: 'Registro excluído com sucesso' });
    });
});


/////////////////////////// agendamentos ///////////////////////
// Rota para listar todos os agendamentos
router.get('/agendamentos', (req, res) => {
    connection.query('SELECT * FROM agendamentos', (err, results) => {
        if (err) {
            console.error('Erro ao buscar os agendamentos:', err);
            res.status(500).json({ error: 'Erro ao buscar os agendamentos' });
            return;
        }
        res.json(results);
    });
});

// Rota para buscar um agendamento específico pelo ID
router.get('/agendamentos/:idAgendamento', (req, res) => {
    const { idAgendamento } = req.params;
    connection.query('SELECT * FROM agendamentos WHERE idAgendamento = ?', [idAgendamento], (err, results) => {
        if (err) {
            console.error('Erro ao buscar o agendamento:', err);
            res.status(500).json({ error: 'Erro ao buscar o agendamento' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Agendamento não encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

// Rota para criar um novo agendamento
router.post('/agendamentos', (req, res) => {
    const { idProfissional, idCliente, idServico, dataHora, status } = req.body;
    connection.query('INSERT INTO agendamentos (idProfissional, idCliente, idServico, dataHora, status) VALUES (?, ?, ?, ?, ?)',
        [idProfissional, idCliente, idServico, dataHora, status], (err, result) => {
            if (err) {
                console.error('Erro ao criar o agendamento:', err);
                res.status(500).json({ error: 'Erro ao criar o agendamento' });
                return;
            }
            res.status(201).json({ message: 'Agendamento criado com sucesso', id: result.insertId });
        });
});

// Rota para atualizar um agendamento existente pelo ID
router.put('/agendamentos/:idAgendamento', (req, res) => {
    const { idAgendamento } = req.params;
    const { idProfissional, idCliente, idServico, dataHora, status } = req.body;
    connection.query('UPDATE agendamentos SET idProfissional = ?, idCliente = ?, idServico = ?, dataHora = ?, status = ? WHERE idAgendamento = ?',
        [idProfissional, idCliente, idServico, dataHora, status, idAgendamento], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar o agendamento:', err);
                res.status(500).json({ error: 'Erro ao atualizar o agendamento' });
                return;
            }
            res.json({ message: 'Agendamento atualizado com sucesso' });
        });
});

// Rota para excluir um agendamento pelo ID
router.delete('/agendamentos/:idAgendamento', (req, res) => {
    const { idAgendamento } = req.params;
    connection.query('DELETE FROM agendamentos WHERE idAgendamento = ?', [idAgendamento], (err, result) => {
        if (err) {
            console.error('Erro ao excluir o agendamento:', err);
            res.status(500).json({ error: 'Erro ao excluir o agendamento' });
            return;
        }
        res.json({ message: 'Agendamento excluído com sucesso' });
    });
});


///////////////////////// pagamentos ///////////////////////
// Rota para listar todos os pagamentos
router.get('/pagamentos', (req, res) => {
    connection.query('SELECT * FROM pagamentos', (err, results) => {
        if (err) {
            console.error('Erro ao buscar os pagamentos:', err);
            res.status(500).json({ error: 'Erro ao buscar os pagamentos' });
            return;
        }
        res.json(results);
    });
});

// Rota para buscar um pagamento específico pelo ID
router.get('/pagamentos/:idPagamento', (req, res) => {
    const { idPagamento } = req.params;
    connection.query('SELECT * FROM pagamentos WHERE idPagamento = ?', [idPagamento], (err, results) => {
        if (err) {
            console.error('Erro ao buscar o pagamento:', err);
            res.status(500).json({ error: 'Erro ao buscar o pagamento' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Pagamento não encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

// Rota para criar um novo pagamento
router.post('/pagamentos', (req, res) => {
    const { idUsuario, valor, dataPagamento, tipo, status, metodoPagamento } = req.body;
    connection.query('INSERT INTO pagamentos (idUsuario, valor, dataPagamento, tipo, status, metodoPagamento) VALUES (?, ?, ?, ?, ?, ?)',
        [idUsuario, valor, dataPagamento, tipo, status, metodoPagamento], (err, result) => {
            if (err) {
                console.error('Erro ao criar o pagamento:', err);
                res.status(500).json({ error: 'Erro ao criar o pagamento' });
                return;
            }
            res.status(201).json({ message: 'Pagamento criado com sucesso', id: result.insertId });
        });
});

// Rota para atualizar um pagamento existente pelo ID
router.put('/pagamentos/:idPagamento', (req, res) => {
    const { idPagamento } = req.params;
    const { idUsuario, valor, dataPagamento, tipo, status, metodoPagamento } = req.body;
    connection.query('UPDATE pagamentos SET idUsuario = ?, valor = ?, dataPagamento = ?, tipo = ?, status = ?, metodoPagamento = ? WHERE idPagamento = ?',
        [idUsuario, valor, dataPagamento, tipo, status, metodoPagamento, idPagamento], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar o pagamento:', err);
                res.status(500).json({ error: 'Erro ao atualizar o pagamento' });
                return;
            }
            res.json({ message: 'Pagamento atualizado com sucesso' });
        });
});

// Rota para excluir um pagamento pelo ID
router.delete('/pagamentos/:idPagamento', (req, res) => {
    const { idPagamento } = req.params;
    connection.query('DELETE FROM pagamentos WHERE idPagamento = ?', [idPagamento], (err, result) => {
        if (err) {
            console.error('Erro ao excluir o pagamento:', err);
            res.status(500).json({ error: 'Erro ao excluir o pagamento' });
            return;
        }
        res.json({ message: 'Pagamento excluído com sucesso' });
    });
});


/////////////////////////// avaliações //////////////////////////
// Rota para listar todas as avaliações
router.get('/avaliacoes', (req, res) => {
    connection.query('SELECT * FROM avaliacoes', (err, results) => {
        if (err) {
            console.error('Erro ao buscar as avaliações:', err);
            res.status(500).json({ error: 'Erro ao buscar as avaliações' });
            return;
        }
        res.json(results);
    });
});

// Rota para buscar uma avaliação específica pelo ID
router.get('/avaliacoes/:idAvaliacao', (req, res) => {
    const { idAvaliacao } = req.params;
    connection.query('SELECT * FROM avaliacoes WHERE idAvaliacao = ?', [idAvaliacao], (err, results) => {
        if (err) {
            console.error('Erro ao buscar a avaliação:', err);
            res.status(500).json({ error: 'Erro ao buscar a avaliação' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Avaliação não encontrada' });
            return;
        }
        res.json(results[0]);
    });
});

// Rota para criar uma nova avaliação
router.post('/avaliacoes', (req, res) => {
    const { idCliente, idProfissional, idServico, nota, comentario } = req.body;
    connection.query(
        'INSERT INTO avaliacoes (idCliente, idProfissional, idServico, nota, comentario) VALUES (?, ?, ?, ?, ?)',
        [idCliente, idProfissional, idServico, nota, comentario],
        (err, result) => {
            if (err) {
                console.error('Erro ao criar a avaliação:', err);
                res.status(500).json({ error: 'Erro ao criar a avaliação' });
                return;
            }
            res.status(201).json({ message: 'Avaliação criada com sucesso', id: result.insertId });
        }
    );
});

// Rota para atualizar uma avaliação existente pelo ID
router.put('/avaliacoes/:idAvaliacao', (req, res) => {
    const { idAvaliacao } = req.params;
    const { idCliente, idProfissional, idServico, nota, comentario } = req.body;
    connection.query(
        'UPDATE avaliacoes SET idCliente = ?, idProfissional = ?, idServico = ?, nota = ?, comentario = ? WHERE idAvaliacao = ?',
        [idCliente, idProfissional, idServico, nota, comentario, idAvaliacao],
        (err, result) => {
            if (err) {
                console.error('Erro ao atualizar a avaliação:', err);
                res.status(500).json({ error: 'Erro ao atualizar a avaliação' });
                return;
            }
            res.json({ message: 'Avaliação atualizada com sucesso' });
        }
    );
});

// Rota para excluir uma avaliação pelo ID
router.delete('/avaliacoes/:idAvaliacao', (req, res) => {
    const { idAvaliacao } = req.params;
    connection.query('DELETE FROM avaliacoes WHERE idAvaliacao = ?', [idAvaliacao], (err, result) => {
        if (err) {
            console.error('Erro ao excluir a avaliação:', err);
            res.status(500).json({ error: 'Erro ao excluir a avaliação' });
            return;
        }
        res.json({ message: 'Avaliação excluída com sucesso' });
    });
});


////////////////////////////// notificações /////////////////////////
// Rota para listar todas as notificações
router.get('/notificacoes', (req, res) => {
    connection.query('SELECT * FROM notificacoes', (err, results) => {
        if (err) {
            console.error('Erro ao buscar as notificações:', err);
            res.status(500).json({ error: 'Erro ao buscar as notificações' });
            return;
        }
        res.json(results);
    });
});

// Rota para buscar uma notificação específica pelo ID
router.get('/notificacoes/:idNotificacao', (req, res) => {
    const { idNotificacao } = req.params;
    connection.query('SELECT * FROM notificacoes WHERE idNotificacao = ?', [idNotificacao], (err, results) => {
        if (err) {
            console.error('Erro ao buscar a notificação:', err);
            res.status(500).json({ error: 'Erro ao buscar a notificação' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Notificação não encontrada' });
            return;
        }
        res.json(results[0]);
    });
});

// Rota para criar uma nova notificação
router.post('/notificacoes', (req, res) => {
    const { idUsuario, mensagem, tipo } = req.body;
    connection.query(
        'INSERT INTO notificacoes (idUsuario, mensagem, tipo) VALUES (?, ?, ?)',
        [idUsuario, mensagem, tipo],
        (err, result) => {
            if (err) {
                console.error('Erro ao criar a notificação:', err);
                res.status(500).json({ error: 'Erro ao criar a notificação' });
                return;
            }
            res.status(201).json({ message: 'Notificação criada com sucesso', id: result.insertId });
        }
    );
});

// Rota para atualizar uma notificação existente pelo ID
router.put('/notificacoes/:idNotificacao', (req, res) => {
    const { idNotificacao } = req.params;
    const { idUsuario, mensagem, tipo, lida } = req.body;
    connection.query(
        'UPDATE notificacoes SET idUsuario = ?, mensagem = ?, tipo = ?, lida = ? WHERE idNotificacao = ?',
        [idUsuario, mensagem, tipo, lida, idNotificacao],
        (err, result) => {
            if (err) {
                console.error('Erro ao atualizar a notificação:', err);
                res.status(500).json({ error: 'Erro ao atualizar a notificação' });
                return;
            }
            res.json({ message: 'Notificação atualizada com sucesso' });
        }
    );
});

// Rota para excluir uma notificação pelo ID
router.delete('/notificacoes/:idNotificacao', (req, res) => {
    const { idNotificacao } = req.params;
    connection.query('DELETE FROM notificacoes WHERE idNotificacao = ?', [idNotificacao], (err, result) => {
        if (err) {
            console.error('Erro ao excluir a notificação:', err);
            res.status(500).json({ error: 'Erro ao excluir a notificação' });
            return;
        }
        res.json({ message: 'Notificação excluída com sucesso' });
    });
});


module.exports = router;
