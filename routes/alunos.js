import { Router } from "express";

import {
  listarAlunos,
  buscarAluno,
  criarAluno,
  atualizarAluno,
  deletarAluno,
} from "../controllers/alunosController.js";

const router = Router();

router.get("/", listarAlunos);
router.get("/:id", buscarAluno);
router.post("/", criarAluno);
router.put("/:id", atualizarAluno);
router.delete("/:id", deletarAluno);

export default router;
export async function atualizarAluno(req, res) {
  const { id } = req.params;

  try {
    const aluno = await prisma.aluno.update({
      where: {
        id: Number(id),
      },
      data: req.body,
      select: selectSemSenha,
    });

    res.json(aluno);
  } catch {
    res.status(404).json({
      erro: "Aluno não encontrado",
    });
  }
}export async function deletarAluno(req, res) {
  const { id } = req.params;

  try {
    await prisma.aluno.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(204).end();
  } catch {
    res.status(404).json({
      erro: "Aluno não encontrado",
    });
  }
}