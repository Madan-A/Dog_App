"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sampleRoute_1 = __importDefault(require("./routes/sampleRoute"));
const createUser_1 = __importDefault(require("./routes/createUser"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Initialize database and start the server
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_1.connectDB)();
        console.log('Connected to SQLite database');
        // Make db available throughout the app
        app.locals.db = db;
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use('/api/sample', sampleRoute_1.default);
        app.use('/api/createUser', createUser_1.default);
        app.use('/api/login', loginRoutes_1.default);
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to the database', error);
    }
}))();
