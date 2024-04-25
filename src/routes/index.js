const { Router } = require('express');
const router = Router();
const userRouter = require('./userRoutes');
const todoRouter = require('./todoRoutes');
const { verifyToken } = require('../utils/jwtAuth')

router.get("/", (req, res) => {
    res.end("It is the end!")
})

router.use("/user", userRouter);
router.use("/todos", verifyToken, todoRouter);



module.exports = { router };