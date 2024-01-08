import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression'; 

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();


app.use(compression());

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});