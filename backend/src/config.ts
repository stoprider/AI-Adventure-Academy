import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT_DIR = path.resolve(__dirname, "..");
export const DATA_DIR = path.join(ROOT_DIR, "data");
export const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, "academy.sqlite");
export const PORT = Number(process.env.PORT || 4000);
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
