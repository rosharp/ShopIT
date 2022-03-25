const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'avatars/kccvibpsuismwfepb3m',
      url: 'https://res.cloudinary.com/shopit/image/upload/v1606305757/avatars/kccvibpsuismwfepb3m.png'
    }
  })

  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    user,
    token
  });
})


