
const express = require("express");
const router = express.Router();

// ==== CLASSES (usando HERANÇA) ====

// Classe pai
class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }
}

// Classe filha herdando de Pessoa
class Usuario extends Pessoa {
  constructor(id, nome, idade) {
    super(nome, idade); // herda nome e idade da classe Pessoa
    this.id = id;
  }
}

// ==== "BANCO DE DADOS" EM MEMÓRIA ====
let usuarios = [
  new Usuario(1, "Ana", 20),
  new Usuario(2, "Carlos", 25)
];

// ==== ROTAS CRUD ====

// READ - listar todos os usuários
router.get("/", (req, res) => {
  res.json(usuarios);
});

// READ - buscar usuário por ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  res.json(usuario);
});

// CREATE - criar novo usuário
router.post("/", (req, res) => {
  const { nome, idade } = req.body;

  // gera ID automático
  const id = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;

  const novoUsuario = new Usuario(id, nome, idade);
  usuarios.push(novoUsuario);

  res.status(201).json({
    mensagem: "Usuário criado com sucesso!",
    usuario: novoUsuario
  });
});

// UPDATE - atualizar usuário por ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  const { nome, idade } = req.body;
  if (nome) usuario.nome = nome;
  if (idade) usuario.idade = idade;

  res.json({
    mensagem: `Usuário ${id} atualizado com sucesso!`,
    usuario
  });
});

// DELETE - excluir usuário
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  usuarios.splice(index, 1);

  res.json({ mensagem: `Usuário ${id} deletado com sucesso!` });
});

module.exports = router;
