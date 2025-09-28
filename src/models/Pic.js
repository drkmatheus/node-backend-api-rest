import Sequelize, { Model } from "sequelize";
export default class Pic extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "originalname de tamanho inválido",
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "filename de tamanho inválido",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "pics",
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: "aluno_id" });
  }
}
