require('dotenv').config();
const express = require('express');
const app = express();
const upload = require('./helper/uploadCloudinary');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// IMPORT CONTROLLERS
const authController = require('./controllers/authController');
const carController = require('./controllers/carController');

// IMPORT MIDDLEWARES
const middleware = require('./middlewares/auth');

// ROUTE REGISTER MEMBER
app.post('/auth/register', upload.single('picture'), authController.register);

// ROUTE REGISTER ADMIN BY SUPERADMIN
app.post('/auth/register/admin', upload.single('picture'), middleware.authenticate, middleware.isSuperAdmin, authController.registerAdmin);

// GET TOKEN
app.get('/auth/me', middleware.authenticate, authController.currentUser);

// LOGIN GOOGLE
app.post('/auth/login-google', authController.loginGoogle);

// LOGIN
app.post('/auth/login', authController.login);

// ROUTE CAR
app.post('/car/create', upload.single('image'), middleware.authenticate, middleware.adminAndSuperadmin, carController.createdCar);
app.get('/car', middleware.authenticate, carController.getCars);
app.get('/car/:id', middleware.authenticate, carController.getCarById);
app.put('/car/:id', upload.single('image'), middleware.authenticate, middleware.adminAndSuperadmin, carController.updatedCar);
app.delete('/car/:id', middleware.authenticate, middleware.adminAndSuperadmin, carController.deletedCar);

// SWAGGER DOCUMENTATION
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di server http://localhost:${process.env.PORT}`);
});
