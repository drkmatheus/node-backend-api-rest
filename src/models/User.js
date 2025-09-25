import { Sequelize, Model } from "sequelize";
import bcrypt from "bcryptjs";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 30],
              msg: "Campo nome de tamanho inválido",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "Email em uso",
          },
          validate: {
            isEmail: {
              msg: "E-mail inválido",
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 30],
              msg: "Senha inválida, verifique os campos e tente novamente",
            },
          },
        },
      },
      {
        sequelize,
      }
    );
    this.addHook("beforeSave", async (user) => {
      user.password_hash = await bcrypt.hash(user.password, 8);
    });
    return this;
  }
}
