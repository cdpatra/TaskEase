import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
   {
      name: {
         type: String,
         require: true,
      },
      email: {
         type: String,
         require: true,
         unique: true,
      },
      password: {
         type: String,
         require: true,
      },
   },
   {
      timestamps: true,
   }
);

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;