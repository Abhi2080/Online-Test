const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');




const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true, 'provide a username']
    },
    password : {
        type : String,
        required : [true, 'provide a password'],
        minlength : 8,
        select : false
    },
    passwordConfirm : {
        type : String,
        required : [true, ' enter the same password as above'],
        validate : {
            validator : function(el) {return el===this.password; },
            message :'please enter the same password as above'
        }
    },
    rollNo : {
        type: Number,
        required : [true, ' enter your roll no']
    },
    role : {
        type : String,
        enum : ['user' ,'teacher', ' admin'],
        default : 'user'
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }

    this.password =await bcrypt.hash( this.password, 14);   

    this.passwordConfirm = undefined;
    next();

})



userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword , userPassword);
}

// userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
//     if (this.passwordChangedAt) {
//       const changedTimestamp = parseInt(
//         this.passwordChangedAt.getTime() / 1000,
//         10
//       );
  
//       return JWTTimestamp < changedTimestamp;
//     }
// }
const User = mongoose.model('User', userSchema);

module.exports = User;