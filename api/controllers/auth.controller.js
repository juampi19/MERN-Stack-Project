import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

//Crear usuario
export const signup = async (req, res) => {

  console.log(req.body)
  const { username, email, password } = req.body;

  //hash password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword })

  try {
    await newUser.save();

    res.status(201).json({ message: 'User created successfully!' })
  } catch (error) {
    res.status(500).json(error.message)
  }


}