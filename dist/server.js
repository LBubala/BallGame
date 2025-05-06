import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;
// Now use `__dirname` safely
app.use(express.static(path.join(__dirname)));
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
