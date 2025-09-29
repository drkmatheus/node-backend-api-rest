import dotenv from "dotenv";
dotenv.config();
import "./src/database/index";
import express from "express";
import homeRoutes from "./src/routes/homeRoutes";
import userRoutes from "./src/routes/userRoutes";
import jwtRoutes from "./src/routes/jwtRoutes";
import alunosRoutes from "./src/routes/alunoRoutes";
import picRoute from "./src/routes/picRoute";
import { resolve } from "path";
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, "uploads")));
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/users/", userRoutes);
    this.app.use("/tokens/", jwtRoutes);
    this.app.use("/alunos/", alunosRoutes);
    this.app.use("/pics/", picRoute);
  }
}

export default new App().app;
