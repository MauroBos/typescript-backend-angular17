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
exports.userList = exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, email, password } = req.body;
        if (!nombre || !email || !password) {
            res.status(401).json({ msg: "por favor entre todos los campos" });
        }
        const esuser = yield user_1.default.findOne({ email });
        console.log(esuser);
        if (esuser)
            return res.status(400).send({ msg: "the email already exist" });
        const nuevoUsuario = new user_1.default({ nombre, email, password });
        yield nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    }
    catch (error) {
        res.status(500).json({ error: "Error al crear el usuario" });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(401).send({ msg: "Please complete all fields" });
    const user = yield user_1.default.findOne({ email });
    console.log(user);
    if (!user)
        return res.status(400).send({ msg: "The user does not exist" });
    const isMatch = yield user.comparePassword(req.body.password);
    console.log(isMatch);
    if (!isMatch) {
        return res.status(401).send("La contraseña no coincide");
    }
    const token = jsonwebtoken_1.default.sign({
        email
    }, process.env.SECRET_KEY || "demos123");
    res.status(201).json(token);
});
exports.signIn = signIn;
const userList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        if (!users)
            return res.status(401).send({ msg: "No users was found" });
        res.status(201).send(users);
    }
    catch (error) {
        res.status(500).send({ error: "Error en el servidor" });
    }
});
exports.userList = userList;
