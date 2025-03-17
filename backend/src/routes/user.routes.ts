import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/', userController.getUsers)
userRouter.get('/check-auth', userController.gerUserByUsername)
userRouter.post('/login', userController.loginUser)

export default userRouter