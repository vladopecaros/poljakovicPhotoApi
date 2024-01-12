const express = require("express");
const router = express.Router();
const schemas = require("../models/schemas");

router.get("/photos", async (req, res) => {
  try{
    const data = await schemas.Photos.find()
      res.status(200).json(data).end();
  }catch(err){
    res.status(500).json(err).end();
  }
});
router.post("/photos", async (req, res) => {
    const {photoUrl, photoTitle, photoCategory} = req.body;

    const newSlika = new schemas.Photos({
        photoUrl: photoUrl,
        photoTitle: photoTitle,
        photoCategory: photoCategory,
        
    });
    const saveSlika = newSlika.save();
    if(saveSlika){
        res.status(200).send("Uspesno sacuvano");
    }else{
        res.status(500).send("Nije sacuvano");
    }
   


});

module.exports = router;
