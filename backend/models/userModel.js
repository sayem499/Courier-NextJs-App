import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: {type: String, required: true},
    user_firstname: {type: String, required: true},
    user_lastname: {type: String, required: true},
    user_email: {type: String, required: true, unique: true},
    user_password: {type: String, required: true},
    user_phonenumber: {type: String, required: true},
},{
    timestamps: true,
})

const Users = mongoose.model("Users", userSchema);
export default Users;