import User from "../models/User";

class UserController {
  async create(req, res) {
    try {
      const novoUser = await User.create(req.body);
      return res.json(novoUser);
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();
      // Dá até pra saber quem é que tá fazendo o acesso.
      console.log("User Id:", req.userId);
      console.log("User Email:", req.userEmail);
      return res.json(users);
    } catch (e) {
      console.log(e);
      return res.json(null);
    }
  }
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.json(null);
    }
  }
  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ errors: ["ID não enviado"] });
      }
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.json({ message: "Usuário não encontrado" });
      }

      const novo = await user.update(req.body);
      return res.json(novo);
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ errors: ["ID não enviado"] });
      }
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.json({ message: "Usuário não encontrado" });
      }

      await user.destroy();
      return res.json(
        `Usuário ${user.nome} de ID ${user.id} apagado da base de dados`
      );
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

export default new UserController();
