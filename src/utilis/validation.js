const validator = require("validator");

const signUpDataValidation = (req) => {

   const { firstName, lastName, emailId, password } = req.body;

   if (!firstName || !lastName || !emailId || !password) {
      throw new Error("All fields are required");
   }

   if (!validator.isEmail(emailId)) {
      throw new Error("Email is not valid");
   }

   if (!validator.isStrongPassword(password)) {
      throw new Error(
         "Password must contain uppercase, lowercase, number and special character"
      );
   }
};

module.exports = signUpDataValidation;