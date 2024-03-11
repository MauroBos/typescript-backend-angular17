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
exports.postProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield product_1.default.find();
        res.status(201).send(productos);
    }
    catch (error) {
        res.status(500).send({ msg: "Error en el servidor", error });
    }
});
exports.getProducts = getProducts;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, descripcion } = req.body;
        if (!nombre || !descripcion)
            return res.status(401).send({ msg: "please fill all fields" });
        const nuevoProducto = new product_1.default({ nombre, descripcion });
        yield nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    }
    catch (error) {
        res.status(500).json({ error: "Error al crear el producto" });
    }
});
exports.postProduct = postProduct;
