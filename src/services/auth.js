import { BAD_REQUEST, CREATED, FORBIDDEN, OK, UNAUTHORIZED } from 'http-status';
import { register_user, findUserByEmail } from '../controller/user';
import user from '../models/user';
import { decrypt, encrypt } from '../utils/password_handler';
import { rand } from '../utils/random';
import { generate } from '../utils/token_handler';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import { sendEmail } from '../utils/sendEmail';
import { getGoogleUser } from '../utils/auth';
import verifyAppleToken from 'verify-apple-id-token';
import path from 'path';
export const register = async (req, res, next) => {
  try {
    const { newUser, token } = await register_user(req.body);
    if (!newUser._id) {
      return res.status(FORBIDDEN).send({ message: 'Something went wrong' });
    }
    return res.status(CREATED).send({
      message: 'Data fetched',
      status: true,
      user: newUser,
      token: token,
    });
  } catch (error) {
    return res.status(BAD_REQUEST).send({ status: false, error });
  }
};
export const socilaSignup = async (req, res, next) => {
  const platform = req.params.platform;
  let user = {};
  switch (platform) {
    case 'google':
      user = await getGoogleUser(req.body.token);
      break;
    case 'apple':
      try {
        const apple = await verifyAppleToken({
          idToken: req.body.token,
          clientId: 'com.intro.signin',
        }).catch((err) => {
          console.log('err', err);
        });
        if (apple.email && apple.email_verified) {
          user = {
            firstName: apple.email,
            lastName: apple.email,
            email: apple.email,
            password: String(apple.sub),
          };
        } else {
          return res.status(BAD_REQUEST).send({
            status: false,
            message:
              'Please share you email from apple for the future reference',
            apple: apple,
          });
        }
      } catch (error) {
        return res.status(BAD_REQUEST).send({
          status: false,
          message: 'Invalid Token',
          apple: null,
          error: error,
        });
      }
      break;
    default:
      return res
        .status(UNAUTHORIZED)
        .send({ message: 'Platform not supported' });
  }
  try {
    console.log('Token is expried', user.has);
    if (Object.keys(user).length === 0) {
      return res.status(BAD_REQUEST).send({
        status: false,
        message: 'Token is expried',
      });
    }
    const { newUser, token } = await register_user(user);
    console.log(newUser, token);
    if (!newUser._id) {
      return res.status(FORBIDDEN).send({ message: 'Something went wrong' });
    }
    await sendEmail(
      newUser.email,
      'Welcome to Intro',
      `Welcome to Intro Please click the link to login ${process.env.HOST}`
    );
    return res.status(CREATED).send({
      message: 'Data fetched',
      status: true,
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.log(',error', error);
    return res.status(BAD_REQUEST).send({ status: false, error });
  }
};
export const socilaLogin = async (req, res, next) => {
  const platform = req.params.platform;
  let user = {};
  switch (platform) {
    case 'google':
      user = await getGoogleUser(req.body.token);
      break;
    case 'apple':
      try {
        const apple = await verifyAppleToken({
          idToken: req.body.token,
          clientId: 'com.introapp.service',
        }).catch((err) => {
          console.log('err', err);
        });
        if (apple.email && apple.email_verified) {
          user = {
            firstName: apple.email,
            lastName: apple.email,
            email: apple.email,
            password: String(apple.sub),
          };
        } else {
          return res.status(BAD_REQUEST).send({
            status: false,
            message:
              'Please share you email from apple for the future reference',
            apple: apple,
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(BAD_REQUEST).send({
          status: false,
          message: 'Invalid Token',
          apple: null,
          error: error,
        });
      }

      break;
    default:
      return res
        .status(UNAUTHORIZED)
        .send({ message: 'Platform not supported' });
  }
  try {
    const userData = await findUserByEmail(user.email);
    if (!userData) {
      return res
        .status(UNAUTHORIZED)
        .send({ status: false, message: `No user found in the ${user.email}` });
    }
    const userPassword = await decrypt(userData.hash);
    if (!(userData && userPassword === user.password)) {
      return res
        .status(UNAUTHORIZED)
        .send({ status: false, message: 'Credentials does not match' });
    }
    const token = await generate(userData);
    return res.status(OK).send({
      message: 'Data fetched',
      status: true,
      user: userData,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(BAD_REQUEST).send({ status: false, error });
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = { ...req.body };
    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(UNAUTHORIZED)
        .send({ status: false, message: `No user found in the ${email}` });
    }
    const userPassword = await decrypt(user.hash);
    if (!(user && userPassword === password)) {
      return res
        .status(UNAUTHORIZED)
        .send({ status: false, message: 'Credentials does not match' });
    }
    const token = await generate(user);
    res.clearCookie('cookiename');
    res.clearCookie('id');
    res.cookie('id', user._id);
    res.status(OK).send({
      message: 'Login successfully',
      status: true,
      user: user,
      token: token,
    });
  } catch (error) {
    next(error);
    return 'Error';
  }
};
export const forget = async (req, res, next) => {
  try {
    const userExist = await user.findOne({
      email: req.body.email,
    });
    if (!userExist) {
      return res.status(UNAUTHORIZED).send({
        status: false,
        error: `User doesn't exist with the ${req.body.email}`,
      });
    }
    const temp_password = rand(6);
    console.log(temp_password);
    const password = await encrypt(temp_password);
    await user.findOneAndUpdate(
      {
        email: req.body.email,
      },
      {
        hash: password,
      }
    );
    var transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'geetasociety.demo@gmail.com',
          pass: 'Geeta@123',
        },
      })
    );

    var mailOptions = {
      from: 'geetasociety.demo@gmail.com',
      to: req.body.email,
      subject: 'Your Updated password for Intro Application',
      text: `Your password is ${temp_password}`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.status(OK).send({
          status: true,
          message: `Password send to ${req.body.email}`,
        });
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    next(error);
    return 'Error';
  }
};

export const googleSignUp = async (req, res, next) => {
  try {
    const user = {
      firstName: req.body.name,
      email: req.body.email,
      password: req.body.id,
    };
    const { newUser, token } = await register_user(user);
    console.log(newUser, token);
    if (!newUser._id) {
      return res.status(FORBIDDEN).send({ message: 'Something went wrong' });
    }
    await sendEmail(
      newUser.email,
      'Welcome to Intro',
      `Welcome to Intro Please click the link to login ${process.env.HOST}`
    );
    return res.status(CREATED).send({
      message: 'Data fetched',
      status: true,
      user: newUser,
      token: token,
    });
  } catch (error) {
    next(error);
    console.log(error);
    return res.status(CREATED).send({
      status: false,
      error: error,
    });
  }
};
export const googleSignIn = async (req, res, next) => {
  try {
    const { email, id } = { ...req.body };
    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(UNAUTHORIZED)
        .send({ status: false, message: `No user found in the ${email}` });
    }
    const userPassword = await decrypt(user.hash);
    if (!(user && userPassword === id)) {
      return res
        .status(UNAUTHORIZED)
        .send({ status: false, message: 'Credentials does not match' });
    }
    const token = await generate(user);
    res.clearCookie('cookiename');
    res.clearCookie('id');
    res.cookie('id', user._id);
    res.status(OK).send({
      message: 'Login successfully',
      status: true,
      user: user,
      token: token,
    });
  } catch (error) {
    next(error);
    console.log(error);
    return res.status(CREATED).send({
      status: false,
      error: error,
    });
  }
};
export const appleSignUp = async (req, res, next) => {
  try {
    const user = {
      firstName: req.body.firstname,
      email: req.body.email,
      password: req.body.userId,
    };
    const { newUser, token } = await register_user(user);
    console.log(newUser, token);
    if (!newUser._id) {
      return res.status(FORBIDDEN).send({ message: 'Something went wrong' });
    }
    await sendEmail(
      newUser.email,
      'Welcome to Intro',
      `Welcome to Intro Please click the link to login ${process.env.HOST}`
    );
    return res.status(CREATED).send({
      message: 'Data fetched',
      status: true,
      user: newUser,
      token: token,
    });
  } catch (error) {
    next(error);
    console.log(error);
    return res.status(CREATED).send({
      status: false,
      error: error,
    });
  }
};

export const appleSignIn = async (req, res, next) => {
  try {
    const { email, userId } = { ...req.body };
    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(UNAUTHORIZED)
        .send({ status: false, message: `No user found in the ${email}` });
    }
    const userPassword = await decrypt(user.hash);
    if (!(user && userPassword === userId)) {
      return res
        .status(UNAUTHORIZED)
        .send({ status: false, message: 'Credentials does not match' });
    }
    const token = await generate(user);
    res.clearCookie('cookiename');
    res.clearCookie('id');
    res.cookie('id', user._id);
    res.status(OK).send({
      message: 'Login successfully',
      status: true,
      user: user,
      token: token,
    });
  } catch (error) {
    next(error);
    console.log(error);
    return res.status(CREATED).send({
      status: false,
      error: error,
    });
  }
};