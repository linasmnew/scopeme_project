import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

//sparse: true allows us to ensure unique values, allowing multiple documents
//i.e. username is unique but is optional, so sparse allows it to be optional
//while also unique at the same time
//otherwise first document's username gets null, and second document would
//throw error as it would also get null, coz it's optional if not specified
const userSchema = new Schema({
  local: {
    email: {type: String, unique: true, lowercase: true, trim: true, required: true},
    password: {type: String, required: true}
  },
  Scopes: [{
    siteName: {type: String, trim: true},
    link: {type: String, trim: true},
    backgroundColor: {type: String, trim: true},
    textColor: {type: String, trim: true},
    createdAt: {type: Date, default: Date.now, select: false}
  }],
  username: {type: String, unique: true, sparse: true, lowercase: true, trim: true},
  bio: {
    fullName: {type: String, trim: true},
    description: {type: String, trim: true},
    image: {type: String, trim: true}
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});


userSchema.methods.hashPassword = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

userSchema.methods.comparePassword = function(pw, callback) {
  /*
  1st param: password entered by user
  2nd param: hashed password from db retrieved because valid email was entered
  3rd param: callback containing err and boolean res value
             res is a boolean for flagging if passwords match or not
  */
	bcrypt.compare(pw, this.local.password, function(err, isMatch) {
		if (err) return callback(err);
		callback(null, isMatch);
	});
};

const User = mongoose.model('User', userSchema);

export default User;
