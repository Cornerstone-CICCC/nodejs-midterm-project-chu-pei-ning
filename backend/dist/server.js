"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const daily_routes_1 = __importDefault(require("./routes/daily.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const diary_routes_1 = __importDefault(require("./routes/diary.routes"));
dotenv_1.default.config();
// creat server
const app = (0, express_1.default)();
// middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:4321',
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const SIGN_KEY = process.env.COOKIE_SIGN_KEY;
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY;
if (!SIGN_KEY || !ENCRYPT_KEY) {
    throw new Error("No cookie key");
}
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: [SIGN_KEY, ENCRYPT_KEY],
}));
// routes
app.use('/', user_routes_1.default);
app.use('/daily', daily_routes_1.default);
app.use('/diary', diary_routes_1.default);
// 404 fallback
app.use((req, res) => {
    res.status(404).send("Page not found");
});
// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
