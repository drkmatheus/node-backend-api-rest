class PicController {
  async save(req, res) {
    res.json(req.file);
  }
}

export default new PicController();
