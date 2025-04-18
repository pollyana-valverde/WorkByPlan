create database workbyplan;
use workbyplan;

CREATE TABLE usuarios (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    cpf varchar(15),
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    endereco VARCHAR(255) NOT NULL,
    tipoUser ENUM('Profissional', 'Cliente') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table perfilEmpresa(
idPerfilEmpresa int auto_increment primary key,
idUsuario INT NOT NULL,
nomeFantasia varchar(100) not null,
logo varchar(110),
descricao text,
ramo varchar(80) not null,
endereco VARCHAR(255) NOT NULL,
FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE
);

CREATE TABLE servicos (
    idServico INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    nomeServico VARCHAR(100) NOT NULL,
    categoria varchar(80) not null,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    duracao INT, -- duração em minutos
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE
);

CREATE TABLE agendamentos (
    idAgendamento INT PRIMARY KEY AUTO_INCREMENT,
    idProfissional INT NOT NULL,
    idCliente INT NOT NULL,
    idServico INT NOT NULL,
    dataHora DATETIME NOT NULL,
    status ENUM('pendente', 'confirmado', 'cancelado', 'concluido') DEFAULT 'pendente',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idProfissional) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idCliente) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idServico) REFERENCES servicos(idServico) ON DELETE CASCADE
);

CREATE TABLE pagamentos (
    idPagamento INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    dataPagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	tipo ENUM('Assinatura', 'Serviço') DEFAULT 'Serviço' not null,
    status ENUM('Pendente', 'Pago', 'Cancelado') DEFAULT 'pendente',
    metodoPagamento ENUM('Pix', 'Cartão', 'Boleto') NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE
);

CREATE TABLE avaliacoes (
    idAvaliacao INT PRIMARY KEY AUTO_INCREMENT,
    idCliente INT NOT NULL,
    idProfissional INT NOT NULL,
    idServico INT NOT NULL,
    nota INT NOT NULL, 
    comentario TEXT,
    dataAvaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idCliente) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idProfissional) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idServico) REFERENCES servicos(idServico) ON DELETE CASCADE
);

CREATE TABLE notificacoes (
    idNotificacao INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    mensagem TEXT NOT NULL,
    tipo ENUM('Agendamento', 'Pagamento', 'Avaliacao', 'Outro') NOT NULL,
    lida BOOLEAN DEFAULT FALSE, -- Indica se a notificação já foi vista
    dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE
);

-- Inserindo Usuários (Profissionais e Clientes)
INSERT INTO usuarios (nome, sobrenome, email, cpf, senha, telefone, endereco, tipoUser) VALUES
('Maria', 'Silva', 'maria@gmail.com', '123.456.789-01', 'senha123', '(11) 99999-1111', 'Rua das Rosas, 100, SP', 'Profissional'),
('Carlos', 'Souza','carlos@gmail.com', '987.654.321-02', 'senha123', '(11) 98888-2222', 'Av. Paulista, 200, SP', 'Cliente'),
('Ana','Oliveira', 'ana@gmail.com', '321.654.987-03', 'senha123', '(11) 97777-3333', 'Rua da Beleza, 300, RJ', 'Profissional'),
('Fernanda','Lima', 'fernanda@gmail.com', '456.123.789-04', 'senha123', '(11) 96666-4444', 'Rua das Estrelas, 50, SP', 'Profissional'),
('Bruno', 'Mendes','bruno@gmail.com', '789.456.123-05', 'senha123', '(11) 95555-5555', 'Rua do Sol, 150, MG', 'Cliente'),
('Camila','Santos', 'camila@gmail.com', '852.741.963-06', 'senha123', '(11) 94444-6666', 'Av. Central, 500, RJ', 'Profissional'),
('Lucas', 'Rocha','lucas@gmail.com', '963.852.741-07', 'senha123', '(11) 93333-7777', 'Rua da Lua, 600, SP', 'Cliente'),
('Juliana', 'Matos','juliana@gmail.com', '741.963.852-08', 'senha123', '(11) 92222-8888', 'Rua das Ondas, 700, RJ', 'Cliente'),
('Ricardo', 'Alves','ricardo@gmail.com', '159.357.258-09', 'senha123', '(11) 91111-9999', 'Av. das Palmeiras, 800, MG', 'Profissional'),
('Tatiane', 'Freitas','tatiane@gmail.com', '258.159.357-10', 'senha123', '(11) 90000-1010', 'Rua dos Girassóis, 900, SP', 'Cliente');

-- Inserindo Perfis de Empresas
INSERT INTO perfilEmpresa (idUsuario, nomeFantasia, logo, descricao, ramo, endereco) VALUES
(1, 'Maria Estética', 'maria_logo.png', 'Especialista em limpeza de pele e tratamentos faciais.', 'Estética', 'Rua das Rosas, 100, SP'),
(3, 'Ana Hair Studio', 'ana_logo.png', 'Salão de cabeleireiro premium.', 'Cabelos', 'Rua da Beleza, 300, RJ'),
(4, 'Lima Spa', 'fernanda_logo.png', 'Massagens relaxantes e terapias.', 'Spa e Massagem', 'Rua das Estrelas, 50, SP'),
(6, 'Camila Nails', 'camila_logo.png', 'Unhas de gel e alongamentos.', 'Manicure/Pedicure', 'Av. Central, 500, RJ'),
(9, 'Ricardo Barber', 'ricardo_logo.png', 'Barbearia e cuidados masculinos.', 'Barbearia', 'Av. das Palmeiras, 800, MG');

-- Inserindo Serviços
INSERT INTO servicos (idUsuario, nomeServico, categoria, descricao, preco, duracao) VALUES
(1, 'Limpeza de Pele', 'Estética', 'Tratamento profundo para remoção de impurezas.', 120.00, 60),
(3, 'Corte Feminino', 'Cabelos', 'Corte profissional para todos os tipos de cabelo.', 90.00, 45),
(3, 'Coloração', 'Cabelos', 'Tingimento e tratamento capilar.', 150.00, 90),
(4, 'Massagem Relaxante', 'Spa e Massagem', 'Alívio do estresse e bem-estar.', 180.00, 75),
(6, 'Alongamento de Unhas', 'Manicure/Pedicure', 'Unhas de gel com acabamento perfeito.', 100.00, 60),
(6, 'Esmaltação em Gel', 'Manicure/Pedicure', 'Durabilidade e brilho intenso.', 60.00, 45),
(9, 'Corte Masculino', 'Barbearia', 'Corte clássico e moderno.', 70.00, 40),
(9, 'Barba Completa', 'Barbearia', 'Modelagem e hidratação da barba.', 50.00, 30);

-- Inserindo Agendamentos
INSERT INTO agendamentos (idProfissional, idCliente, idServico, dataHora, status) VALUES
(1, 2, 1, '2024-04-01 10:00:00', 'confirmado'),
(3, 5, 2, '2024-04-02 15:00:00', 'pendente'),
(3, 7, 3, '2024-04-03 16:00:00', 'concluido'),
(4, 8, 4, '2024-04-04 12:00:00', 'cancelado'),
(6, 10, 5, '2024-04-05 14:00:00', 'pendente'),
(6, 2, 6, '2024-04-06 17:00:00', 'confirmado'),
(9, 5, 7, '2024-04-07 11:00:00', 'concluido'),
(9, 7, 8, '2024-04-08 18:00:00', 'pendente');

-- Inserindo Pagamentos
INSERT INTO pagamentos (idUsuario, valor, tipo, status, metodoPagamento) VALUES
(2, 120.00, 'Serviço', 'Pago', 'Pix'),
(5, 90.00, 'Serviço', 'Pago', 'Cartão'),
(7, 150.00, 'Serviço', 'Pendente', 'Boleto'),
(8, 180.00, 'Serviço', 'Pago', 'Pix'),
(10, 100.00, 'Serviço', 'Cancelado', 'Cartão');

-- Inserindo Avaliações
INSERT INTO avaliacoes (idCliente, idProfissional, idServico, nota, comentario) VALUES
(2, 1, 1, 5, 'Ótimo atendimento e serviço impecável!'),
(5, 3, 2, 4, 'Gostei do corte, mas demorou um pouco.'),
(7, 3, 3, 5, 'Cabelo ficou perfeito! Recomendo.'),
(8, 4, 4, 3, 'A massagem foi boa, mas o ambiente poderia ser melhor.'),
(10, 6, 5, 5, 'Unhas maravilhosas! Atendimento top.');

-- Inserindo Notificações
INSERT INTO notificacoes (idUsuario, mensagem, tipo, lida) VALUES
(1, 'Novo agendamento confirmado!', 'Agendamento', FALSE),
(3, 'Você recebeu um novo pagamento.', 'Pagamento', TRUE),
(4, 'O cliente cancelou um agendamento.', 'Agendamento', FALSE),
(6, 'Você recebeu uma nova avaliação.', 'Avaliacao', TRUE),
(9, 'Novo cliente agendou um serviço.', 'Agendamento', FALSE);


