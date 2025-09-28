import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";
import Aluno from "../models/Aluno";
import User from "../models/User";
import Pics from "../models/Pic";

const models = [Aluno, User, Pics];
const connection = new Sequelize(databaseConfig);
models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);
