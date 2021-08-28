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
const File_1 = __importDefault(require("./src/model/File"));
const app = express_1.default();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
});
server.on("error", (error) => console.log("Error en servidor", error));
let counter = {
    visits: {
        items: 0,
        item: 0,
    },
};
let file = new File_1.default("products");
app.get("/items", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    counter.visits.items++;
    try {
        const items = yield file.read();
        res.json({ items, qty: items.length });
    }
    catch (error) {
        res.json({ error: "There was an error" });
    }
    console.log("conexion");
}));
app.get("/item-random", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    counter.visits.item++;
    try {
        const items = yield file.read();
        res.json({ item: items[Math.floor(Math.random() * items.length)] });
    }
    catch (error) {
        res.json({ error: "There was an error" });
    }
    console.log("conexion");
}));
app.get("/visits", (req, res) => {
    res.json(counter);
});
app.get("/visitas", (req, res) => {
    res.json({ error: "Did you mean /visits?" });
});
