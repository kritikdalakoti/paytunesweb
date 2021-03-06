const AWS = require('aws-sdk');
const path = require('path');
AWS.config.loadFromPath(path.join(__dirname, '../config.json')); //('/paytunes_new/server/config.json');
const { BlobServiceClient } = require('@azure/storage-blob');
const constantObj = require('../constants');
const { AudioPresets, VideoPresets } = require('../helper');
const AZURE_STORAGE_CONNECTION_STRING = constantObj.azureconnectionstring.cstring; //"DefaultEndpointsProtocol=https;AccountName=ptmfiles;AccountKey=Y4YuI3fVlI9lnuNlLP6u/NJkzrRsEqVRuSMlwO8LmMYg35w0G5/tbsrbG/CcdXzP0I+qh+DmmKxMnhpS0XXZdw==;EndpointSuffix=core.windows.net";
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient('image');
const containerClientAudio = blobServiceClient.getContainerClient('audio');
const containerClientVideo = blobServiceClient.getContainerClient('video');

const Etranscoder = new AWS.ElasticTranscoder();
let transcodedkeys = [];

const uploadMedia = async (dd, type) => {
	try {
		let blockBlobClient = (type === 'image'
			? containerClient
			: type === 'Video' ? containerClientVideo : containerClientAudio).getBlockBlobClient(dd.filename);
		let uploadBlobResponse = await blockBlobClient.upload(dd.data, dd.data.byteLength);
		console.log(uploadBlobResponse);
		return { message: 'Successful!' };
	} catch (err) {
		return { error: err };
	}
};
exports.uploadMedia = uploadMedia;

exports.uploadAws = async function(data) {
	try {
		let s3Bucket = new AWS.S3({ params: { Bucket: 'paytunesmusicads' } });
		await s3Bucket.putObject(data).promise();
		return { message: 'Successful!' };
	} catch (err) {
		return { error: err };
	}
};

exports.getAws = async function(name) {
	try {
		let s3Bucket = new AWS.S3({ params: { Bucket: 'paytunesmusicads' } });
		let file = await s3Bucket.getSignedUrl({ Key: name }).promise();
		return { message: 'Successful!', file };
	} catch (err) {
		return { error: err };
	}
};

exports.uploadtranscodedfile = async function({ key, container, type }) {
	try {
		console.log(typeof key, container);
		let key1 = key.split('.')[0];
		let params = {
			PipelineId: type === 'Audio' ? '1629397799617-jdjjh3' : '1633965342897-fueu5m', //PipelineId of Elastic transcoder
			Input: {
				Key: key, //Source path of video
				Container: container
			},
			Outputs: (type === 'Audio' ? AudioPresets : VideoPresets).map((obj) => {
				transcodedkeys.push(`${key1}${obj.suffix}`);
				return { Key: `${key1}${obj.suffix}`, PresetId: `${obj.presetid}` };
			})
		};
		await Etranscoder.createJob(params).promise();
		console.log('transcoding started');
		return { message: 'Successful!' };
	} catch (err) {
		console.log(err);
		return { error: err };
	}
};

const getAudios = async (key, type) => {
	try {
		const s3 = new AWS.S3();
		let data = await s3
			.getObject({
				Bucket: 'outputbuckettranscoded',
				Key: key
			})
			.promise();
		let filename = key.split('/')[1];
		let file = { data: data.Body, filename };
		let result = await uploadMedia(file, type);
		if (result.error) {
			return { error: result.error };
		}
		console.log('uploaded to azure');
		return { message: 'Successful!' };
	} catch (err) {
		return { error: err };
	}
};

const uploadazure = async (type) => {
	console.log('inside azure ', transcodedkeys);
	for (var i = 0; i < transcodedkeys.length; i++) {
		let result = await getAudios(transcodedkeys[i], type);
		if (result.error) {
			transcodedkeys = [];
			return { error: result.error };
		}
	}
	transcodedkeys = [];
	return { message: 'Successful!' };
};

exports.uploadazure = uploadazure;

exports.uploadAzure = (type) => {
	let time = type === 'Audio' ? 20000 : 80000;
	return new Promise((resolve, reject) => {
		setTimeout(async () => {
			let result2 = await uploadazure(type);
			if (result2.error) {
				reject(result2.error);
			}
			resolve('Successful!');
		}, time);
	});
};
