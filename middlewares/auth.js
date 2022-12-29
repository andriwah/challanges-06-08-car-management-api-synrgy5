const jwt = require('jsonwebtoken');
const { JWT } = require('../lib/const');
const usersRepository = require('../repositories/userRepository');
const { ROLES } = require('../lib/const');

const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  let token = '';

  if (authHeader && authHeader.startsWith('Bearer')) token = authHeader.split(' ')[1];
  else
    return res.status(401).send({
      status: false,
      message: 'You must be logged in to access this resource.',
      data: null,
    });

  try {
    const { email } = jwt.verify(token, JWT.SECRET);

    const getUser = await usersRepository.getByEmail({ email });

    req.user = getUser;

    next();

    return;
  } catch (err) {
    return res.status(401).send({
      status: false,
      message: 'Session has expired. Please login again',
      data: null,
    });
  }
};

const isSuperAdmin = async (req, res, next) => {
  const user = req.user;

  if (user.role === ROLES.SUPERADMIN) return next();

  return res.status(401).send({
    status: false,
    message: 'Your account must be Superadmin to access this resource.',
    data: null,
  });
};

const adminAndSuperadmin = async (req, res, next) => {
  const user = req.user;

  if (user.role === ROLES.SUPERADMIN || user.role === ROLES.ADMIN) return next();

  return res.status(401).send({
    status: false,
    message: "Your account doesn't have access to these resources",
    data: null,
  });
};
module.exports = {
  authenticate,
  isSuperAdmin,
  adminAndSuperadmin,
};
