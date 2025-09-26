import Aluno from "../models/Aluno";

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll();

    res.json(alunos);
  }

  async create(req, res) {
    try {
      const novoAluno = await Aluno.create(req.body);
      const { id, nome, sobrenome, email } = novoAluno;
      return res.json({ id, nome, sobrenome, email });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["ID não enviado"],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ["Aluno não encontrado"],
        });
      }
      return res.json(aluno);
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["ID não enviado"],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ["Aluno não encontrado"],
        });
      }
      const novo = await Aluno.update(id);
      return res.json(novo);
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["ID não enviado"],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ["Aluno não encontrado"],
        });
      }
      await aluno.destroy(id);
      return res.json(
        `Aluno ${aluno.nome} de ID ${aluno.id} apagado da base de dados`
      );
    } catch (e) {
      // Verificação de segurança ↓
      const errorMessages = e.errors
        ? e.errors.map((err) => err.message)
        : [e.message]; // Captura mensagens genéricas

      return res.status(400).json({ errors: errorMessages });
    }
  }
}

export default new AlunoController();
