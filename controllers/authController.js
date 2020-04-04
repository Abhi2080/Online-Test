const User = require('./../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');



const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };
  


const createSendToken = (user, statusCode, res) => {
  
    const token = signToken(user._id);

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    };
    
    
     res.cookie('jwt', token, cookieOptions);
     res.locals.cookie = token
  
    // Remove password from output
    user.password = undefined;
  
    // res.status(statusCode).json({
    //   status: 'success',
    //   token,
    //   data: {
    //     user
    //   }
    // });
  }; 


exports.signup = async(req,res,next) =>{
    const newUser =await User.create({
        name : req.body.name,
        password : req.body.password,
        rollNo : req.body.rollNo,
        passwordConfirm : req.body.passwordConfirm
    })

    createSendToken(newUser, 201, res);
    next();
}


exports.login = async (req, res, next) => {
  
    const { rollNo, password } = req.body;
   
    // 1) Check if email and password exist
    if (!rollNo || !password) {
      res.render('error');
      return next();
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ rollNo }).select('+password');
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.render('error');
      return next();
    }
  
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
    
    next();
};

exports.isLoggedIn = async function(req,res,next){

  if(req.cookies.jwt){
  try{
  
    const decoded  = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
///////////////decoded contains id iat and exp///////////////////////////
  const currentUser = await User.findById(decoded.id);
  if(!currentUser){
    return next();
  }

  res.locals.user = currentUser;
  return next();
 }catch(err){
  //  console.log(err);
   res.render('error')
 }
}else{
  res.render('error');
}
}


exports.logout = (req, res,next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  next();
};
