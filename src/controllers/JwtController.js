import User from "../models/User";
import jwt from "jsonwebtoken";

class JwtController {
  async store(req, res) {
    const { email = "", password = "" } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        errors: ["Credenciais inválidas"],
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ errors: ["Usuário não existe"] });
    }

    if (!(await user.passwordValidation(password))) {
      return res.status(401).json({
        errors: ["Senha não confere"],
      });
    }

    const { id } = user;
    const tokenJwt = jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    res.json({ tokenJwt });
  }
}

export default new JwtController();
