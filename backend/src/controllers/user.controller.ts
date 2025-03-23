import { Request, Response } from "express";
import userModel from "../models/user.models";
import { User } from "../types/user"

//get user
const getUsers = (req: Request, res: Response) => {
  const users = userModel.findAll()
  res.status(200).json(users)
}

//get user by username
const gerUserByUsername = (req: Request<{ username: string }>, res: Response) => {
  const { username } = req.body
  const user = userModel.findByUsername(username)
  if (!user) {
    res.status(404).send("user not found")
  }
  res.status(200).json(user)
}

//login
const loginUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(500).send("Username or Password not found")
  }
  const user = await userModel.login(username, password)

  console.log(user)
  if (!user) {
    res.status(500).send("Username or Password is incorrect!")
    return
  }
  if (req.session) {
    req.session.isLoggedIn = true
    req.session.username = user.username
  }
  res.status(200).send("successe!!!")
}

//add new user
const addUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(500).json({ error: 'Username/password is empty!' })
  }
  const user = await userModel.createUser({ username, password })
  if (!user) {
    res.status(409).json({ error: 'Username is taken!' })
    return
  }
  res.status(201).json(user)
}

//logout
const logout = (req: Request, res: Response) => {
  req.session = null;
  res.status(200).json({
    content: "Session cookie cleared!",
  });
};

//check cookie
const checkCookie = (req: Request, res: Response) => {
  if (req.session && req.session.username) {
    res.status(200).json({
      content: req.session.username
    })
    return
  }
  res.status(500).json({
    content: "No cookie found!"
  })
}


export default {
  getUsers,
  gerUserByUsername,
  loginUser,
  addUser,
  logout,
  checkCookie
}