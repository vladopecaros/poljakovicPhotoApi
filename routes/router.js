const express = require("express");
const router = express.Router();
const schemas = require("../models/schemas");
const multer = require("multer");
const { put, get, list, del } = require('@vercel/blob');
const upload = multer();
const axios = require('axios');


router.get("/photos", async (req, res) => {
  try {
    const data = await schemas.Photos.find()
    res.status(200).json(data).end();
  } catch (err) {
    res.status(500).json(err).end();
  }
});
router.post("/photos", async (req, res) => {
  const { photoUrl, photoTitle, photoCategory } = req.body;

  const newSlika = new schemas.Photos({
    photoUrl: photoUrl,
    photoTitle: photoTitle,
    photoCategory: photoCategory,

  });
  const saveSlika = newSlika.save();
  if (saveSlika) {
    res.status(200).send("Uspesno sacuvano");
  } else {
    res.status(500).send("Nije sacuvano");
  }
});

router.post('/blob', upload.single('file'), async (req, res) => {
  try {
    const { file, body } = req; // req.file now contains the uploaded file
    const { category, title } = body;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

  //console.log(file);

    const blob = await put(category + "/" + file.originalname, file.buffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // Include additional information like category and title
      category,
      title,
    });

    return res.status(200).json({ success: true, message: 'Uspesno postavljeno' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
});

router.get('/photo-urls', async (req, res) => {

  async function getPhotoUrls() {
    try {
      // Fetch metadata for blobs in the specified path
      const { blobs } = await list();

      // Extract URLs from blob metadata
      const photoUrls = blobs.map(blob => blob.url);

      return photoUrls;
    } catch (error) {
      console.error('Error fetching photo URLs:', error);
      throw error;
    }
  }

  try {
    const photoUrls = await getPhotoUrls();
    return res.status(200).json({ photoUrls });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/delete-blobs', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'URL parameter is missing' });
    }

    await del(url);
    return res.status(200).json({ success: true, message: 'Blob deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});



module.exports = router;
