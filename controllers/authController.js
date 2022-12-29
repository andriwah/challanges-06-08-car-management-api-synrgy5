const authService = require('../services/authServices');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const { status, status_code, message, data } = await authService.register({
    name,
    email,
    password,
    picture: req.file,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const { status, status_code, message, data } = await authService.registerAdmin({
    name,
    email,
    password,
    picture: req.file,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const { status, status_code, message, data } = await authService.login({
    email,
    password,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const currentUser = async (req, res) => {
  const currentUser = req.user;

  res.status(200).send({
    status: true,
    message: 'Get current user success.',
    data: {
      user: currentUser,
    },
  });
};

const loginGoogle = async (req, res) => {
  const { google_credential } = req.body;

  console.log('cek', google_credential);
  const { status, status_code, message, data } = await authService.loginGoogle({
    google_credential,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { register, login, currentUser, registerAdmin, loginGoogle };
