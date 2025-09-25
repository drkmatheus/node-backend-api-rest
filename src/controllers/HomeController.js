import Aluno from "../models/Aluno";

class HomeController {
  async index(req, res) {
    const novo = await Aluno.create({
      nome: "Teste",
      sobrenome: "teseT",
      email: "teste@mail.com",
      idade: 33,
      peso: 88,
      altura: 1.77,
    });
    res.json(novo);
  }
}

export default new HomeController();
