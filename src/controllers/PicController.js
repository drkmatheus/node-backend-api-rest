import multer from "multer";
import multerConfig from "../config/multerConfig";

const upload = multer(multerConfig).single("pic");
class PicController {
  async save(req, res) {
    return upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }
      return res.json(req.file);
    });
  }
}

export default new PicController();
