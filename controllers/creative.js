const mongoose = require('mongoose');
// const { readdata, deletefiles, AudioMediaFiles, VideoMediaFiles } = require('../helper');
const creative = require('../models/creative');
// const lineitem = require('../models/lineitem');
const path = require('path');
// const xlsx = require('xlsx');
const fs = require('fs');
const { uploadAws, uploadMedia, uploadtranscodedfile, uploadAzure } = require('../aws_upload/uploadsfunction');
// const { AudioMediaFiles } = require('../constants');
const { readdata, deletefiles, AudioMediaFiles, VideoMediaFiles } = require('../helper');

exports.getCreatives = async (req, res) => {
	creative
		.find()
		.then((result) => {
			// console.log(result);
			res.json(result);
		})
		.catch((err) => console.log(err));
};

exports.getaCreative = async (req, res) => {
	const { id } = req.params;
	creative
		.findById(id)
		.then((result) => {
			// console.log(result);
			res.json(result);
		})
		.catch((err) => console.log(err));
};

exports.createCreative = async (req, res) => {
	try {
		let {
			name,
			type,
			format,
			companions,
			dimensions,
			duration,
			source,
			// audiofile,
			// videofile,
			// imagefile,
			integration,
			notes,
			universalAdId,
			skipable,
			servingProp
		} = req.body;
		if (!name || !type || !format) {
			return res.status(400).json({ error: 'Enter the all required fields' });
		}
		var imagename = '';
		var bannername = '';
		if (req.files.AudioFile) {
			console.log(req.files.AudioFile[0]);
			let data = fs.readFileSync(
				`${path.join(__dirname, '../public/uploads/')}${req.files.AudioFile[0].filename}`
			);
			console.log(data);
			var finame = req.files.AudioFile[0].filename;
			let filetype = req.files.AudioFile[0].mimetype;
			filetype = filetype.toString();
			console.log(filetype.split('/')[1]);
			filetype = filetype.split('/')[1];
			let date = new Date();
			const year = date.getFullYear();
			let month;
			if (date.getMonth() + 1 >= 10) {
				month = `${date.getMonth() + 1}`;
			} else {
				month = `0${date.getMonth() + 1}`;
			}

			let date1 = date.getDate();
			if (date1 < 10) {
				date1 = `0${date1}`;
			}
			let finaldate = `${year}-${month}-${date1}`;
			let file = `audio/${finaldate}_${req.files.AudioFile[0].filename}`;
			let data1 = { Key: file, Body: data, ContentEncoding: 'base64', ContentType: filetype };
			let result = await uploadAws(data1);
			if (result.error) {
				return res.status(400).json({ error: result.error.message });
			}
			let result1 = await uploadtranscodedfile({ key: file, container: filetype, type: 'Audio' });
			if (result1.error) {
				return res.status(400).json({ error: result1.error.message });
			}
			await uploadAzure('Audio');
			AudioMediaFiles.forEach((audio) => {
				audio.Name = file;
			});
		}
		if (req.files.VideoFile) {
			console.log('ss');
			let data = fs.readFileSync(
				`${path.join(__dirname, '../public/uploads/')}${req.files.VideoFile[0].filename}`
			);
			let date = new Date();
			let filetype = req.files.VideoFile[0].mimetype;
			filetype = filetype.toString();
			console.log(filetype.split('/')[1]);
			filetype = filetype.split('/')[1];
			const year = date.getFullYear();
			let month;
			if (date.getMonth() + 1 >= 10) {
				month = `${date.getMonth() + 1}`;
			} else {
				month = `0${date.getMonth() + 1}`;
			}

			let date1 = date.getDate();
			if (date1 < 10) {
				date1 = `0${date1}`;
			}
			let finaldate = `${year}-${month}-${date1}`;
			let file = `video/${finaldate}_${req.files.VideoFile[0].filename}`;
			// let filename = `${finaldate}_${req.files.VideoFile[0].filename}`
			let data1 = { Key: file, Body: data, ContentEncoding: 'base64', ContentType: filetype };
			let result = await uploadAws(data1);
			if (result.error) {
				return res.status(400).json({ error: result.error.message });
			}
			let result1 = await uploadtranscodedfile({ key: file, container: filetype, type: 'Video' });
			if (result1.error) {
				return res.status(400).json({ error: result1.error.message });
			}
			await uploadAzure('Video');
			VideoMediaFiles.forEach((video) => {
				video.Name = file;
			});
		}
		if (req.files.DisplayFile) {
			let data = fs.readFileSync(
				`${path.join(__dirname, '../public/uploads/')}${req.files.DisplayFile[0].filename}`
			);
			let date = new Date();
			const year = date.getFullYear();
			let month;
			if (date.getMonth() + 1 >= 10) {
				month = `${date.getMonth() + 1}`;
			} else {
				month = `0${date.getMonth() + 1}`;
			}

			let date1 = date.getDate();
			if (date1 < 10) {
				date1 = `0${date1}`;
			}
			let finaldate = `${year}-${month}-${date1}`;
			let filename = `${finaldate}_${req.files.DisplayFile[0].filename}`;
			imagename = filename;
			let data1 = { filename, data };
			let result = await uploadMedia(data1, 'image');
			if (result.error) {
				return res.status(400).json({ error: result.error.message });
			}
		}
		if (req.files.Banner) {
			let data = fs.readFileSync(`${path.join(__dirname, '../public/uploads/')}${req.files.Banner[0].filename}`);
			let date = new Date();
			const year = date.getFullYear();
			let month;
			if (date.getMonth() + 1 >= 10) {
				month = `${date.getMonth() + 1}`;
			} else {
				month = `0${date.getMonth() + 1}`;
			}

			let date1 = date.getDate();
			if (date1 < 10) {
				date1 = `0${date1}`;
			}
			let finaldate = `${year}-${month}-${date1}`;
			let filename = `${finaldate}_${req.files.Banner[0].filename}`;
			bannername = filename;
			let data1 = { filename, data };
			let result = await uploadMedia(data1, 'image');
			if (result.error) {
				return res.status(400).json({ error: result.error.message });
			}
		}
		const saver = new creative({
			name,
			status: true,
			type,
			format,
			companions,
			dimensions,
			duration,
			skipable,
			universalAdId,
			source,
			audiofile: req.files.AudioFile ? AudioMediaFiles : [ {} ],
			videofile: req.files.VideoFile ? VideoMediaFiles : [ {} ],
			imagefile: req.files.DisplayFile ? [ { Name: imagename } ] : [ {} ],
			banner: req.files.Banner ? [ { Name: bannername } ] : [ {} ],
			created: '',
			integration,
			notes,
			servingProp
		});
		await saver.save();
		let directory = path.join(__dirname, '../public/uploads/');
		let result3 = deletefiles(directory);
		if (result3.error) {
			return res.status(400).json({ error: result3.error.message });
		}
		console.log('jjhjhvvggcgfcff');
		res.status(200).json({ message: 'created successfuly!' });
	} catch (e) {
		console.log(e, e.message);
		res.status(400).json({ error: e.message });
	}
};

exports.editCreative = async (req, res) => {
	try {
		let {
			id,
			name,
			type,
			format,
			companions,
			dimensions,
			duration,
			source,
			// audiofile,
			// videofile,
			// imagefile,
			integration,
			notes,
			universalAdId,
			skipable,
			servingProp
		} = req.body;
		let found = await creative.findById(id).catch((err) => console.log(err));
		if (!found) {
			return res.status(400).json({ error: 'No such creative is found' });
		}
		if (!name || !type || !format) {
			return res.status(400).json({ error: 'Enter the all required fields' });
		}
		var imagename = '';
		var bannername = '';
		if (req.files.AudioFile) {
			console.log(req.files.AudioFile[0]);
			let data = fs.readFileSync(
				`${path.join(__dirname, '../public/uploads/')}${req.files.AudioFile[0].filename}`
			);
			console.log(data);
			var finame = req.files.AudioFile[0].filename;
			let filetype = req.files.AudioFile[0].mimetype;
			filetype = filetype.toString();
			console.log(filetype.split('/')[1]);
			filetype = filetype.split('/')[1];
			let date = new Date();
			const year = date.getFullYear();
			let month;
			if (date.getMonth() + 1 >= 10) {
				month = `${date.getMonth() + 1}`;
			} else {
				month = `0${date.getMonth() + 1}`;
			}

			let date1 = date.getDate();
			if (date1 < 10) {
				date1 = `0${date1}`;
			}
			let finaldate = `${year}-${month}-${date1}`;
			let file = `audio/${finaldate}_${req.files.AudioFile[0].filename}`;
			let data1 = { Key: file, Body: data, ContentEncoding: 'base64', ContentType: filetype };
			let result = await uploadAws(data1);
			if (result.error) {
				return res.status(400).json({ error: result.error.message });
			}
			let result1 = await uploadtranscodedfile({ key: file, container: filetype, type: 'Audio' });
			if (result1.error) {
				return res.status(400).json({ error: result1.error.message });
			}
			await uploadAzure('Audio');
			AudioMediaFiles.forEach((audio) => {
				audio.Name = file;
			});
		}
		if (req.files.VideoFile) {
			console.log('ss');
			let data = fs.readFileSync(
				`${path.join(__dirname, '../public/uploads/')}${req.files.VideoFile[0].filename}`
			);
			let date = new Date();
			let filetype = req.files.VideoFile[0].mimetype;
			filetype = filetype.toString();
			console.log(filetype.split('/')[1]);
			filetype = filetype.split('/')[1];
			const year = date.getFullYear();
			let month;
			if (date.getMonth() + 1 >= 10) {
				month = `${date.getMonth() + 1}`;
			} else {
				month = `0${date.getMonth() + 1}`;
			}

			let date1 = date.getDate();
			if (date1 < 10) {
				date1 = `0${date1}`;
			}
			let finaldate = `${year}-${month}-${date1}`;
			let file = `video/${finaldate}_${req.files.VideoFile[0].filename}`;
			// let filename = `${finaldate}_${req.files.VideoFile[0].filename}`
			let data1 = { Key: file, Body: data, ContentEncoding: 'base64', ContentType: filetype };
			let result = await uploadAws(data1);
			if (result.error) {
				return res.status(400).json({ error: result.error.message });
			}
			let result1 = await uploadtranscodedfile({ key: file, container: filetype, type: 'Video' });
			if (result1.error) {
				return res.status(400).json({ error: result1.error.message });
			}
			await uploadAzure('Video');
			VideoMediaFiles.forEach((video) => {
				video.Name = file;
			});
		}
		if (req.files.DisplayFile) {
			let data = fs.readFileSync(
				`${path.join(__dirname, '../public/uploads/')}${req.files.DisplayFile[0].filename}`
			);
			let date = new Date();
			const year = date.getFullYear();
			let month;
			if (date.getMonth() + 1 >= 10) {
				month = `${date.getMonth() + 1}`;
			} else {
				month = `0${date.getMonth() + 1}`;
			}

			let date1 = date.getDate();
			if (date1 < 10) {
				date1 = `0${date1}`;
			}
			let finaldate = `${year}-${month}-${date1}`;
			let filename = `${finaldate}_${req.files.DisplayFile[0].filename}`;
			imagename = filename;
			let data1 = { filename, data };
			let result = await uploadMedia(data1, 'image');
			if (result.error) {
				return res.status(400).json({ error: result.error.message });
			}
		}
		if (req.files.Banner) {
			let data = fs.readFileSync(`${path.join(__dirname, '../public/uploads/')}${req.files.Banner[0].filename}`);
			let date = new Date();
			const year = date.getFullYear();
			let month;
			if (date.getMonth() + 1 >= 10) {
				month = `${date.getMonth() + 1}`;
			} else {
				month = `0${date.getMonth() + 1}`;
			}

			let date1 = date.getDate();
			if (date1 < 10) {
				date1 = `0${date1}`;
			}
			let finaldate = `${year}-${month}-${date1}`;
			let filename = `${finaldate}_${req.files.Banner[0].filename}`;
			bannername = filename;
			let data1 = { filename, data };
			let result = await uploadMedia(data1, 'image');
			if (result.error) {
				return res.status(400).json({ error: result.error.message });
			}
		}
		// const saver = new creative({
		// 	name,
		// 	status: true,
		// 	type,
		// 	format,
		// 	companions,
		// 	dimensions,
		// 	duration,
		// 	skipable,
		// 	universalAdId,
		// 	source,
		// 	audiofile: req.files.AudioFile ? AudioMediaFiles : [ {} ],
		// 	videofile: req.files.VideoFile ? VideoMediaFiles : [ {} ],
		// 	imagefile: req.files.DisplayFile ? [ { Name: req.files.DisplayFile[0].filename } ] : [ {} ],
		// 	banner: req.files.Banner ? [ { Name: req.files.Banner[0].filename } ] : [ {} ],
		// 	created: '',
		// 	integration,
		// 	notes,
		// 	servingProp
		// });
		if (name) found.name = name;
		if (type) found.type = type;
		if (format) found.format = format;
		if (dimensions) found.dimensions = dimensions;
		if (companions) found.companions = companions;
		if (duration) found.duration = duration;
		if (skipable === true || skipable === false) found.skipable = skipable;
		if (universalAdId) found.universalAdId = universalAdId;
		if (source) found.source = source;
		if (req.files.AudioFile) found.audiofile = AudioMediaFiles;
		if (req.files.DisplayFile) found.imagefile = [ { Name: imagename } ];
		if (req.files.videofile) found.videofile = VideoMediaFiles;
		if (req.files.Banner) found.banner = [ { Name: bannername } ];
		if (created) found.created = created;
		if (integration) found.integration = integration;
		if (notes) found.notes = notes;
		if (servingProp) found.servingProp = servingProp;
		await found.save();
		let directory = path.join(__dirname, '../public/uploads/');
		let result3 = deletefiles(directory);
		if (result3.error) {
			return res.status(400).json({ error: result3.error.message });
		}
		console.log('jjhjhvvggcgfcff');
		res.status(200).json({ message: 'created successfuly!' });
	} catch (e) {
		console.log(e, e.message);
		res.status(400).json({ error: e.message });
	}
};
