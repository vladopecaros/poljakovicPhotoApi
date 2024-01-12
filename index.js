const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
require ('dotenv/config');
const mongoose = require('mongoose');
const router = require('./routes/router');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const corsOptions = {
    origin:"*",
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use('/', router);

dbOptions = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(process.env.DB_URI, dbOptions)
.then(()=>{
    console.log('DataBase Connected Successfully');
})
.catch(err => console.error(err))


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


const port = process.env.PORT || 4000;
const server = app.listen(port, ()=>{
    console.log("Server running on port "+port);
})