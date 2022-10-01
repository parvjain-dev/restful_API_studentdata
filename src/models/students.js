//for out original schema

const mongoose = require("mongoose");
var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: [true, "Email id already present"],
    validate: [validateEmail, 'Please fill a valid email address'],
     match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone:{
    type:Number,
   // min:10,
    required:true,
    unique:true
  },
  address:{
    type:String,
    required:true
  }
});

//we will create a new collection using above model

const Student = new mongoose.model('Student',studentSchema);

  module.exports=Student;
