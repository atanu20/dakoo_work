const userTable = require('../models/user');
const bookTable = require('../models/book');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const { CLIENT_URL } = process.env;

const employeeCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await userTable.findOne({ email });
      if (user)
        return res.json({ success: false, msg: 'This email already exists.' });

      if (password.length < 6)
        return res.json({
          success: false,
          msg: 'Password must be at least 6 characters.',
        });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        email,
        password: passwordHash,
      };
      const newUse = new userTable(newUser);

      await newUse.save();

      res.json({
        success: true,
        msg: 'Register Success!',
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userTable.findOne({ email });
      if (!user)
        return res.json({ success: false, msg: 'This email does not exist.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.json({ success: false, msg: 'Password is incorrect.' });

      const access_token = createAccessToken({ id: user._id });

      res.json({
        success: true,
        access_token,
        isEmployer: user.isEmployer,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: 'Please login now!' });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: 'Please login now!' });

        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserInfor: async (req, res) => {
    try {
      const user = await userTable.findById(req.user.id).select('-password');

      res.json({ success: true, user: user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateAllDetails: async (req, res) => {
    try {
      const newdata = await userTable.findOneAndUpdate(
        { _id: req.user.id },

        req.body,
        { new: true }
      );

      res.json({ success: true, msg: 'Update Success!', newdata });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },

  uploadBook: async (req, res) => {
    try {
      const newBook = new bookTable(req.body);

      await newBook.save();

      res.json({
        success: true,
        msg: 'Data Upload Done',
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getBook: async (req, res) => {
    try {
      const id = req.params.id;
      // console.log(billid);
      const book = await bookTable.findById(id);

      res.json({ success: true, msgs: book });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },

  getAllBooks: async (req, res) => {
    try {
      const books = await bookTable
        .find({
          userId: req.user.id,
        })
        .sort({ publish: -1 });
      res.json({ success: true, msgs: books });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  deleteBook: async (req, res) => {
    try {
      const id = req.params.id;
      // console.log(billid);
      await bookTable.findByIdAndDelete(id);
      res.json({
        success: true,
        msg: 'Book Deleted',
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  updatebook: async (req, res) => {
    try {
      const { name, image, author, pages, price, bookid } = req.body;
      const newdata = await bookTable.findOneAndUpdate(
        { _id: bookid },
        {
          name,
          image,
          author,
          pages,
          price,
        },
        { new: true }
      );

      res.json({ success: true, msg: 'Update Success!', newdata });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

const removeTmp = (pat) => {
  fs.unlink(pat, (err) => {
    if (err) throw err;
  });
};

module.exports = employeeCtrl;

// const result = await jobTable.find({

//   $or: [{
//       employer_company_category: { '$in': ['Agri-tech', 'Artificial Intelligence'] }
//   }, {
//       $or: [{
//           tech_skills: { '$in': ['React', 'Node JS'] },
//       }, {
//           non_tech_skills: { '$in': ['Php', 'Next JS'] },
//       }]
//   }],

//   $or: [{
//       job_type: { '$in': ['Office', 'Remote'] }
//   }, {
//       job_location: { '$in': ['Bangalore', 'Kolkata'] }
//   }],

//   $or: [{
//       experience: { '$in': ['Entry Level/ Fresher'] }
//   }, {
//       no_employees: { '$in': ['101-500 Employees', '21-100 Employees'] }
//   }],

//   $and: [{
//       salary: { $gte: 7 }
//   }, {
//       salary: { $lte: 27 }
//   }]

// })
