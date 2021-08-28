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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const BASE_PATH = "./src/assets/";
const EXT = ".txt";
class File {
    constructor(name) {
        this.name = name;
    }
    /**
     * @returns a string with the path to the file
     */
    getFullPath() {
        return path_1.default.join(BASE_PATH, this.name + EXT);
    }
    /**
     * creates the id for the new product
     * @returns the next id or 1 if the list is empty
     */
    generateId() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return ++(yield this.internalRead()).length;
            }
            catch (error) {
                console.log(error);
            }
            return 1;
        });
    }
    /**
     * @returns content of the file or an empty array if the file doesn't exist
     */
    internalRead() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return JSON.parse(yield fs_1.default.promises.readFile(this.getFullPath(), "utf-8"));
            }
            catch (error) {
                // console.log(error);
            }
            return [];
        });
    }
    /**
     * @returns an array with all the elements on te file
     */
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return JSON.parse(yield fs_1.default.promises.readFile(this.getFullPath(), "utf-8"));
            }
            catch (error) {
                // console.log(error);
                console.log([]);
            }
            return [];
        });
    }
    save(title, price, thumbnail) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentContent = [];
            try {
                currentContent = yield this.internalRead();
            }
            catch (error) {
                console.log(error);
            }
            const newContent = JSON.stringify([
                ...currentContent,
                {
                    id: yield this.generateId(),
                    title,
                    price,
                    thumbnail,
                },
            ]);
            try {
                yield fs_1.default.promises.writeFile(this.getFullPath(), newContent);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.default.promises.unlink(this.getFullPath());
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = File;
