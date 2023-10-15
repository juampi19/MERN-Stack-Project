import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from "../utils/error.js";

//Crear usuario
export const signup = async (req, res, next) => {

  const { username, email, password } = req.body;

  //hash password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword })

  try {
    await newUser.save();

    res.status(201).json({ message: 'User created successfully!' })
  } catch (error) {
    next()
  }


}

export const singIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //confirmamos si el usuario existe
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, 'User not found!'))
    }

    //confirmamos el password
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    //create a jwt
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...user } = validUser._doc

    res.cookie('access_token', token, { httpOnly: true }).status(200).json(user);

  } catch (error) {
    next(error)
  }
}