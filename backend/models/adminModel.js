import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    _id: {type: String, require:true},
    admin_email: {type: String, required:true},
    admin_password: {type:String, rquired:true}, 
},{
    timestamps: true,
})

 
const Admins = mongoose.model('Admins', adminSchema);
export default Admins;