import prisma from '../prisma/client.js';

const selectSemSenha = {
  id: true,
  nome: true,
  email: true,
  cidade: true,
  frase: true,
  planosFuturos: true,
  fotoUrl: true,
  role: true,
  criadoEm: true,
};

export async function listarAlunos(req, res) {
  const alunos = await prisma.aluno.findMany({
    select: selectSemSenha,
  });

  res.json(alunos);
}

export async function buscarAluno(req, res) {
  const { id } = req.params;

  const aluno = await prisma.aluno.findUnique({
    where: {
      id: Number(id),
    },
    select: selectSemSenha,
  });

  if (!aluno) {
    return res.status(404).json({
      erro: "Aluno não encontrado",
    });
  }

  res.json(aluno);
}

export async function criarAluno(req, res) {
  // implementar
}

export async function atualizarAluno(req, res) {
  // implementar
}

export async function deletarAluno(req, res) {
 // implementar
}
export async function criarAluno(req, res) {
  const alunoCriado = await prisma.aluno.create({
    data: req.body,
    select: selectSemSenha,
  });

  res.status(201).json(alunoCriado);
}