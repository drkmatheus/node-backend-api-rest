import multer from "multer";
import multerConfig from "../config/multerConfig";
import Pic from "../models/Pic";

const upload = multer(multerConfig).single("pic");
class PicController {
  save(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const { originalname, filename } = req.file;

        const { aluno_id } = req.body;
        const foto = await Pic.create({ originalname, filename, aluno_id });

        return res.json(foto);
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          errors: ["Aluno não existe"],
        });
      }
    });
  }
}

export default new PicController();
