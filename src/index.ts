import express, { Request, Response } from 'express';
import * as QRCode from 'qrcode';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/qrcode', async (req: Request, res: Response) => {
  const { text } = req.query;
  
  if (!text || typeof text !== 'string') {
    return res.status(400).send('"text" query parameter is required.');
  }

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(text);
    res.send(`<img src="${qrCodeDataUrl}" alt="QR Code">`);
  } catch (err) {
    res.status(500).send('Error generating QR code.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
