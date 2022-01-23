const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');

const mongoose = require('mongoose');

// exports.signup=async(req,res)=>{
//     try{
//         let {password , email, username,usertype}=req.body
//         if(!password||!email||username||usertype){
//             return res.status(400).json({error:'Fill all required fields!'})
//         }

//         let user=await User.findOne({email})
//         if(user){
//             return res.status(400).json({error:'Email already exists! Try another email!'})
//         }

//         password=await bcrypt.hash(password,8)
//         user=new User({
//             email,
//             password,
//             username,
//             usertype
//         })
//         console.log(user)
//         await user.save()
//         const token= jwt.sign({_id:user._id},JWT_SECRET)
//         res.status(200).json({message:'User signed up successfuly',token,user})
//     }catch(err){
//         res.status(400).json({error:err.message})
//     }
// }

exports.signin = async (req, res) => {
	try {
		let { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: 'Please fill all required fields!' });
		}
		console.log(email, password);
		let user = await User.findOne({ email });
		console.log('jj', user);
		if (!user) {
			return res.status(400).json({ error: 'Invalid Email or Password!' });
		}
		// const ismatch=await bcrypt.compare(password,user.password)
		const ismatch = user.password === password ? true : false;
		if (!ismatch) {
			return res.status(400).json({ error: 'Invalid Email or Password!' });
		}
		const token = jwt.sign({ _id: user._id }, JWT_SECRET);
		res.json({ message: 'Loggedin Successfuly!', token, user });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

console.log(JWT_SECRET);

exports.create_user = async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(200).json({ message: 'Created Successfuly!', data: user });
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: err });
	}
};

exports.get_users = async (req, res) => {
	try {
		const users = await User.find({ usertype: { $ne: 'admin' } });
		res.status(200).json({ message: 'Successfuly fetched!', users });
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: err });
	}
};

exports.delete_user = async (req, res) => {
	try {
		let { _id } = req.body;
		if (!_id) {
			return res.status(400).json({ error: 'Send id !' });
		}
		console.log('jsdhj', _id);
		const user = await User.findOneAndDelete({ _id: mongoose.Types.ObjectId(_id) });
		console.log(user);
		if (!user) {
			return res.status(400).json({ error: "Couldn't delete!" });
		}
		res.status(200).json({ message: 'Deleted Successfuly!' });
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: err });
	}
};

exports.update_user = async (req, res) => {
	try {
		let { role, advertiser, email, firstname, lastname, _id } = req.body;
		console.log(req.body);
		let username = `${firstname}${lastname}`;
		let updates = {
			role,
			advertiser,
			email,
			firstname,
			lastname,
			username
		};
		const updated_user = await User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(_id) }, updates, { new: true });
		if (!updated_user) {
			return res.status(400).json({ error: "Couldn't Update ! Try again later" });
		}
		res.status(200).json({ message: 'Successfully Updated!' });
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: err });
	}
};

exports.get_user = async (req, res) => {
	try {
		let { user } = req.body;
		const result = await User.findOne({ _id: mongoose.Types.ObjectId(user) });
		if (!result) {
			return res.status(400).json({ error: 'No user found !' });
		}
		res.status(200).json(result);
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: err });
	}
};
