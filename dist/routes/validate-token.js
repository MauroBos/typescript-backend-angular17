"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validatetoken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken !== undefined && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.slice(7);
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'pepe123');
            next();
        }
        catch (error) {
            res.status(401).json({ msg: "The token isn't allowed" });
        }
    }
    else {
        res.status(401).json({ msg: "Acces Denied" });
    }
};
exports.default = validatetoken;
