const express = require('express');
const controller = require('../controllers/creative');
const path = require('path');
const auth = require('../auth_middleware/auth');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, path.join(__dirname, '../public/uploads'));
	},
	filename: (req, file, callback) => {
		callback(null, file.originalname);
	}
});

const upload = multer({ storage });

router.get('/get_creatives', auth, controller.getCreatives);
router.get('/get_a_creatives/:id', auth, controller.getaCreative);
router.put('/get_file', auth, controller.getfileaws);

router.post(
	'/create_creative',
	auth,
	upload.fields([
		{ name: 'AudioFile', maxCount: 1 },
		{ name: 'VideoFile', maxCount: 1 },
		{ name: 'Banner', maxCount: 1 },
		{ name: 'DisplayFile', maxCount: 1 }
	]),
	controller.createCreative
);

router.post(
	'/edit_creative',
	auth,
	upload.fields([
		{ name: 'AudioFile', maxCount: 1 },
		{ name: 'VideoFile', maxCount: 1 },
		{ name: 'Banner', maxCount: 1 },
		{ name: 'DisplayFile', maxCount: 1 }
	]),
	controller.editCreative
);

module.exports = router;
