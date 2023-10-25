import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";



export const findUsers = async(req,res)=>{
  const keyword= req.query.search;

  let users= await User.find({
    $or: [
      { email: { $regex: new RegExp(keyword, 'i') } },
      { name: { $regex: new RegExp(keyword, 'i') } }
    ]
  });

  res.status(200).json({users: users});
}

export const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  console.log(req.file);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    picture: req.file.filename,
  });

  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  await user.save();

  res.status(200).json({ response: "ok", user: user });
};

export const login = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ message: "User doesn't exist." });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "Wrong Password." });
    } else {
      const payload = { _id: user._id };
      const token = jwt.sign(payload, process.env.SECRET_KEY);
      res.status(200).json({ user: user, token: token });
    }
  }
};
