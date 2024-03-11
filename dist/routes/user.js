"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.post('/', user_1.signUp);
router.post('/login', user_1.signIn);
router.get('/list', user_1.userList);
exports.default = router;
