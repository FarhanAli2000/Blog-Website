require('dotenv').config(); // Load environment variables
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./server/config/db');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const methodOverride = require('method-override');

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
// Session management
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_session_secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,  // Ensure this environment variable is correct
  }),
}));

// Static assets
app.use(express.static('public'));

// EJS setup
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


// Routes
app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));


// Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
