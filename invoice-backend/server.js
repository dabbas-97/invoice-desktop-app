const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const sharp = require("sharp");

const storage = multer.memoryStorage();
const upload = multer({ storage });

//* Routes
const invoicesRoute = require("./Routes/invoicesRoute");

const receiptsRoute = require("./Routes/receiptsRoute");

app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/invoice/", invoicesRoute);
app.use("/receipt/", receiptsRoute);

app.post("/compress", upload.array("image"), async (req, res) => {
  const resizedImages = await Promise.all(
    req.files.map(async (file) => {
      const image = sharp(file.buffer);
      const metadata = await image.metadata();
      if (metadata.width > metadata.height) {
        const resizedImage = await image
          .resize(700, 450, { fit: "cover" })
          .blur(0.3)
          .toFormat("jpg")
          .toBuffer();
        return resizedImage.toString("base64");
      } else {
        const resizedImage = await image
          .resize(null, 450, { fit: "cover" })
          .blur(0.3)
          .toBuffer();

        const stretchedImage = await sharp(resizedImage)
          .resize(700, 450, { fit: "fill" })
          .blur(30)
          .toBuffer();

        const combinedImage = await sharp(stretchedImage)
          .composite([{ input: resizedImage }])
          .toBuffer();
        return combinedImage.toString("base64");
      }
    })
  );
  res.send(resizedImages);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
