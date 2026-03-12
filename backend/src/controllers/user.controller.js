import User from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Meeting from "../models/meeting.model.js";

const register = async (req, res) => {
  const { username, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(httpStatus.CREATED)
      .json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }

    let isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      let token = crypto.randomBytes(20).toString("hex");

      user.token = token;
      await user.save();
      res.status(httpStatus.OK).json({ token: token });
    } else {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid Username or Password" });
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

const getUserHistory = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ token: token });
    const meetings = await Meeting.find({ user_id: user.username });
    res.json(meetings);
  } catch (error) {
    res.json({ message: `Something went wrong ${error}` });
  }
};

const addToHistory = async (req, res) => {
  const { token, meeting_code } = req.body;

  try {
    const user = await User.findOne({ token: token });

    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meeting_code,
    });

    await newMeeting.save();

    res.status(httpStatus.CREATED).json({ message: "Added code to history" });
  } catch (error) {
    res.json({ message: `Something went wrong ${error}` });
  }
};

export { register, login, getUserHistory, addToHistory };
