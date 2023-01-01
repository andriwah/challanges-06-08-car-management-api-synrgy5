require("dotenv").config();
const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinary");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { JWT, ROLES } = require("../lib/const");
const SALT_ROUND = 10;

class AuthService {
  static async register({ name, email, password, picture }) {
    try {
      // Validation name
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "Name Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      // Validation email
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "Email Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      // Validation password
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "Password Is Required!",
          data: {
            registered_user: null,
          },
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "Password Minimum 8 Character!",
          data: {
            registered_user: null,
          },
        };
      }

      // Validation picture
      if (!picture) {
        return {
          status: false,
          status_code: 400,
          message: "Picture Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      const getUsersByEmail = await userRepository.getByEmail({ email });

      if (getUsersByEmail) {
        return {
          status: false,
          status_code: 400,
          message: "Email already exist",
          data: {
            registered_user: null,
          },
        };
      } else {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

        // Cloudinary
        const fileToUpload = picture;
        const fileBase64 = fileToUpload.buffer.toString("base64");
        const file = `data:${fileToUpload.mimetype};base64,${fileBase64}`;

        const cloudinaryUploader = await cloudinary.uploader.upload(file, { folder: "avatar" }, (err, result) => {
          if (err) {
            res.status(400).send(`Failed to upload file to cloudinary: ${err.message}`);
            return;
          } else {
            return result;
          }
        });

        const createdUser = await userRepository.register({
          name,
          email,
          password: hashedPassword,
          role: "member",
          picture: cloudinaryUploader.url,
        });

        return {
          status: true,
          status_code: 201,
          message: "Register Succesfully",
          data: {
            registered_user: createdUser,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async registerAdmin({ name, email, password, role, picture }) {
    try {
      // Validation name
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "Name Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      // Validation email
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "Email Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      // Validation password
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "Password Is Required!",
          data: {
            registered_user: null,
          },
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "Password Minimum 8 Character!",
          data: {
            registered_user: null,
          },
        };
      }

      // Validation role
      if (!role === ROLES.ADMIN) {
        return {
          status: false,
          status_code: 400,
          message: "Admin role user can be registered this way",
          data: {
            registered_user: null,
          },
        };
      }

      const getUsersByEmail = await userRepository.getByEmail({ email });

      if (getUsersByEmail) {
        return {
          status: false,
          status_code: 400,
          message: "Email already exist",
          data: {
            registered_user: null,
          },
        };
      } else {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

        // Cloudinary
        const fileToUpload = picture;
        const fileBase64 = fileToUpload.buffer.toString("base64");
        const file = `data:${fileToUpload.mimetype};base64,${fileBase64}`;

        const cloudinaryUploader = await cloudinary.uploader.upload(file, { folder: "avatar" }, (err, result) => {
          if (err) {
            res.status(400).send(`Failed to upload file to cloudinary: ${err.message}`);
            return;
          } else {
            return result;
          }
        });

        const createdUser = await userRepository.register({
          name,
          email,
          password: hashedPassword,
          role: ROLES.ADMIN,
          picture: cloudinaryUploader.url,
        });

        return {
          status: true,
          status_code: 201,
          message: "Register Succesfully",
          data: {
            registered_user: createdUser,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async login({ email, password }) {
    try {
      // Validation email
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "Email Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "Password Is Required!",
          data: {
            registered_user: null,
          },
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "Password Minimum 8 Character!",
          data: {
            registered_user: null,
          },
        };
      }

      const getUser = await userRepository.getByEmail({ email });

      if (!getUser.password) {
        return {
          status: false,
          status_code: 400,
          message: "This account has not set up a password.",
          data: {
            user: null,
          },
        };
      }

      if (!getUser) {
        return {
          status: false,
          status_code: 404,
          message: "Email not registered",
          data: {
            user: null,
          },
        };
      } else {
        const isPasswordMatch = await bcrypt.compare(password, getUser.password);

        if (isPasswordMatch) {
          const token = jwt.sign(
            {
              id: getUser.id,
              email: getUser.email,
            },
            JWT.SECRET,
            {
              expiresIn: JWT.EXPIRED,
            }
          );

          return {
            status: true,
            status_code: 200,
            message: "User Successfully Logged in",
            data: {
              token,
            },
          };
        } else {
          return {
            status: false,
            status_code: 400,
            message: "Password Wrong",
            data: {
              user: null,
            },
          };
        }
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async loginGoogle({ google_credential: googleCredential }) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const userInfo = await client.verifyIdToken({
        idToken: googleCredential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { email, name } = userInfo.payload;

      let getUserByEmail = await userRepository.getByEmail({ email });

      if (!getUserByEmail) {
        getUserByEmail = await userRepository.register({
          name,
          email,
          role: ROLES.MEMBER,
        });
      }

      const token = jwt.sign(
        {
          id: getUserByEmail.id,
          email: getUserByEmail.email,
        },
        JWT.SECRET,
        {
          expiresIn: JWT.EXPIRED,
        }
      );

      return {
        status: true,
        status_code: 200,
        message: "User Succesfull Login",
        data: {
          token,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }
}

module.exports = AuthService;
