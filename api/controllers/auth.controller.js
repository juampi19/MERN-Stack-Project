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

//conectar usuario
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


export const google = async (req, res, next) => {
  try {
    //confirmar si el usuario existe
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;

      res.cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({ username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-8), email: req.body.email, password: hashedPassword, avatar: req.body.photo });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;

      res.cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }

  } catch (error) {
    next(error);
  }
}