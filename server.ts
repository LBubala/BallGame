import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import * as process from "node:process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Poprawna ścieżka do katalogu głównego projektu
const rootDir = path.resolve(__dirname, "..");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(rootDir, 'public')));
app.use("/dist", express.static(path.join(rootDir, "dist")));


app.use((req, res) => {
    res.sendFile(path.join(rootDir, "public","index.html"));
});

app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});