import Aluno from "../models/Aluno";
import Pic from "../models/Pic";

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: [
        "id",
        "nome",
        "sobrenome",
        "email",
        "idade",
        "peso",
        "altura",
      ],
      order: [
        ["id", "DESC"],
        [Pic, "id", "DESC"],
      ],
      include: {
        model: Pic,
        attributes: ["url", "originalname", "filename"],
      },
    });

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

      const aluno = await Aluno.findByPk(id, {
        attributes: [
          "id",
          "nome",
          "sobrenome",
          "email",
          "idade",
          "peso",
          "altura",
        ],
        order: [
          ["id", "DESC"],
          [Pic, "id", "DESC"],
        ],
        include: {
          model: Pic,
          attributes: ["url", "originalname", "filename"],
        },
      });

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
      const novo = await aluno.update(req.body);
      const { nome, sobrenome, email, idade, peso, altura } = novo;
      return res.json({ nome, sobrenome, email, idade, peso, altura });
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
      await aluno.destroy();
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
