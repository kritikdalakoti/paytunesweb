const mongoose = require('mongoose');

const creativeSchema = new mongoose.Schema(
	{
		// creativename: { type: String, unique: true },
		name: String,
		id: String,
		status: String,
		type: String,
		format: String,
		companions: String,
		skipable: Boolean,
		universalAdId: String,
		dimensions: String,
		duration: String,
		source: String,
		banner: [],
		audiofile: [],
		videofile: [],
		imagefile: [],
		created: String,
		integration: String,
		notes: String,
		skip: String,
		servingProp: []
		// advertiser:mongoose.Types.ObjectId
	},
	{ timestamps: true }
);

module.exports = mongoose.model('creative', creativeSchema);
