const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    nickName: {
        type : String,
        required : true,
        trim: true,
        minlength:2,
        unique : true
    },
    name: {
        type : String,
        required : true,
        trim: true,
        minlength:2,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error('Can only contain letters');
            }
        }
    },
    lastName: {
        type : String,
        required : true,
        trim: true,
        minlength:2,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error('Can only contain letters');
            }
        }
    },
    kingdomName: {
        type : String,
        required : true,
        trim: true,
        minlength:2,
        unique : true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error('Can only contain letters');
            }
        }
    },
    email:
    {
        type : String,
        unique : true,
        required : true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    role: {
        type : String,
        required : true,
        trim: true,
        lowercase: true
    },
    password: {
        type : String,
        required : true,
        trim: true,
        minlength:6,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('Password cant contain the word "password"');
            }
        }
    },
    avatar: {
        type: Buffer
    },
    tokens: [
        {
            token : {
                type: String,
                required: true
            }
        }
    ],
        
},
{
    timestamps : true
}
);

userSchema.methods.toJSON =  function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    
    return userObject;

}

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({ _id : user.id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;

}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if(!user){
        throw new Error('Unable to log in');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Unable to log in');

    }
    return user;
}

//Hash the plain text password before saving
userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    };
    next();
})

//Delete users when user is removed
userSchema.pre('remove', async function(next){
    const user = this;
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;