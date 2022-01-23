import {
	FormControl,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
	Paper,
	Popover,
	Typography,
	Button,
	Checkbox,
	CircularProgress
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { useSnackbar } from 'notistack';
import '../App.css';
import { green } from '@mui/material/colors';
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Box } from '@mui/system';
import Footer from './Footer';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Html5image() {
	const history = useHistory();
	const { enqueueSnackbar } = useSnackbar();
	const [ name, setname ] = React.useState('');
	const [ loading, setloading ] = React.useState(false);
	const [ success, setsuccess ] = React.useState(false);
	const [ error, seterror ] = React.useState({ message: '', status: false });
	const [ integrationCode, setintegrationCode ] = React.useState('');
	const [ notes, setnotes ] = React.useState('');
	const [ fileUpload, setfileUpload ] = React.useState(null);
	const [ bisc1, setbisc1 ] = React.useState(true);
	const [ bisc2, setbisc2 ] = React.useState(false);
	const [ pop1, setpop1 ] = React.useState({ status: false, id: null, text: null });
	// const [ pop2, setpop2 ] = React.useState({ status: false, id: null });
	// const [ pop3, setpop3 ] = React.useState({ status: false, id: null });
	// const [ pop4, setpop4 ] = React.useState({ status: false, id: null });
	// const [ pop5, setpop5 ] = React.useState({ status: false, id: null });
	const onFileChangeImage = (e) => {
		const filedata = e.target.files[0];
		if (filedata) {
			var extenti = [
				'zip',
				'application/octet-stream',
				'application/zip',
				'application/x-zip',
				'application/x-zip-compressed',
				'image/gif',
				'image/png',
				'image/jpeg'
			];
			console.log(filedata);
			if (extenti.includes(filedata.type)) {
				enqueueSnackbar('File uploaded Successfully!', { variant: 'success' });
				setfileUpload(filedata);
			} else {
				enqueueSnackbar('File format is incorrect!', { variant: 'error' });
			}
		}
	};
	function onSubmit() {
		// if(!(urlList&&urlList.length) || !name|| !fileUpload || !fileUpload1){
		if (!fileUpload || !name) {
			setloading(false);
			return enqueueSnackbar('Enter all the required fields', { variant: 'error' });
		}
		var formdata = new FormData();
		formdata.append('name', name);
		formdata.append('integration', integrationCode);
		formdata.append('notes', notes);
		formdata.append('type', 'Standard');
		formdata.append('format', 'Image');
		formdata.append('DisplayFile', fileUpload);
		setloading(true);
		console.log(formdata);
		enqueueSnackbar("Don't cancel or reload the page \n Submission in progress", {
			variant: 'success'
		});
		axios
			.post('http://localhost:5000/creative/create_creative', formdata, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('jwt'),
					'Content-Type': 'multipart/form-data'
				}
			})
			.then((response) => {
				setloading(false);
				console.log(response);
				enqueueSnackbar('Created Sucessfully!', { variant: 'success' });
				history.push('/creative');
				setsuccess(true);
			})
			.catch((error) => {
				setloading(false);
				enqueueSnackbar(`Something went wrong! try again\n ${error.response.data}`, { variant: 'error' });
				console.log(error.response.data);
				seterror({ message: error.response.data.error, status: true });
				setsuccess(false);
			});
	}
	return (
		<div>
			<Paper className="html_paper">
				<IconButton>
					<CloseIcon
						onClick={() => {
							if (!loading) history.push('/creative');
						}}
					/>
				</IconButton>
				<div className="html_title_text">New HTML5 or image creative</div>
			</Paper>
			<div className="body_form">
				<Paper className={bisc1 ? 'toggle_paper' : 'html_paper_body'}>
					<div className="toggle_body_head" onClick={() => setbisc1(!bisc1)}>
						<div>Basic details</div>
						{!bisc1 ? <ExpandMore /> : <ExpandLess />}
					</div>
					<div style={{ alignItems: 'center' }} className="html_body_p">
						{/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
						<FormControl variant="standard" id="inputwide">
							<InputLabel htmlFor="component-helper">Name</InputLabel>
							<Input
								id="component-helper"
								value={name}
								onChange={(e) => {
									if (e.target.value.length < 513) {
										setname(e.target.value);
									}
								}}
								aria-describedby="component-helper-text"
								endAdornment={
									<InputAdornment position="end">
										<IconButton>
											<HelpOutlineIcon
												style={{ cursor: 'pointer' }}
												onMouseEnter={(e) =>
													setpop1({
														status: true,
														id: e.currentTarget,
														text: 'The name of the creative in Display & Video 360.'
													})}
												onMouseLeave={() => setpop1({ status: false, id: null, text: null })}
												sx={{ fontSize: 16 }}
											/>
										</IconButton>
									</InputAdornment>
								}
							/>
							<div className="limittextindicate">{name ? name.length : 0}/512</div>
						</FormControl>
						<Popover
							id="mouse-over-popover"
							sx={{
								pointerEvents: 'none'
							}}
							open={pop1.status}
							onMouseLeave={() => setpop1({ status: false, id: null, text: null })}
							anchorEl={pop1.id}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							onClose={() => setpop1({ status: false, id: null, text: null })}
							disableRestoreFocus
						>
							<Typography sx={{ p: 1, fontSize: 13 }}>{pop1.text}</Typography>
						</Popover>
						<div style={{ opacity: '0.6' }} className="flexdisplay">
							<div>Creative asset</div>
							<HelpOutlineIcon
								style={{ cursor: 'pointer' }}
								onMouseEnter={(e) =>
									setpop1({
										status: true,
										id: e.currentTarget,
										text: 'Allowed file types: HTML5 (.zip) or image (.gif, .jpg, .png).'
									})}
								onMouseLeave={() => setpop1({ status: false, id: null, text: null })}
								sx={{ fontSize: 16 }}
							/>
						</div>
						{!fileUpload ? (
							<div className="flexdisplay">
								<div className="drop-file-input">
									<div className="drop-file-input__label">
										<p>Drop file here</p>
									</div>
									<input
										type="file"
										accept="image/gif ,image/png, image/jpeg,.zip,.rar,.7zip"
										value=""
										onChange={onFileChangeImage}
									/>
								</div>
								<p> or </p>
								<div className="uploadButton">
									<Button>Upload</Button>
									<input
										type="file"
										accept="image/gif ,image/png, image/jpeg,.zip,.rar,.7zip"
										id="upload"
										onChange={onFileChangeImage}
									/>
								</div>
							</div>
						) : (
							<div className="flexdisplay">
								<div>{fileUpload.name}</div>
								<IconButton onClick={() => setfileUpload(null)}>
									<ClearIcon fontSize="small" />
								</IconButton>
							</div>
						)}
						<div className="flexdisplay">
							<Checkbox {...label} />
							<div>Don't scale to fit device width</div>
							<IconButton>
								<HelpOutlineIcon
									style={{ cursor: 'pointer' }}
									onMouseEnter={(e) =>
										setpop1({
											status: true,
											id: e.currentTarget,
											text: (
												<div>
													When serving as an interstitial in a mobile app, if the creative
													isn't <br /> wide enough to fit, it will be scaled to fit the device
													width while<br /> preserving aspect ratio. Check this box to disable
													scaling.
												</div>
											)
										})}
									onMouseLeave={() => setpop1({ status: false, id: null, text: null })}
									sx={{ fontSize: 16 }}
								/>
							</IconButton>
						</div>
					</div>
				</Paper>
				<Paper className={bisc2 ? 'toggle_paper_1' : 'html_paper_body'}>
					<div className="toggle_body_head" onClick={() => setbisc2(!bisc2)}>
						<div>Additional Details</div>
						{!bisc2 ? <ExpandMore /> : <ExpandLess />}
					</div>
					<div style={{ alignItems: 'center' }} className="html_body_p">
						<div style={{ opacity: '0.6' }} className="flexdisplay">
							<div>Append tracking tag</div>
							<HelpOutlineIcon
								style={{ cursor: 'pointer' }}
								onMouseEnter={(e) =>
									setpop1({
										status: true,
										id: e.currentTarget,
										text: (
											<div>
												Add a third-party impression tracking tag to the creative.{' '}
												<a href="/">Learn more</a>
											</div>
										)
									})}
								onMouseLeave={() => setpop1({ status: false, id: null, text: null })}
								sx={{ fontSize: 16 }}
							/>
						</div>
						<div className="flexdisplay">
							<Checkbox {...label} />
							<div>Append HTML tracking tag</div>
						</div>
						<FormControl variant="standard" id="inputwide">
							<InputLabel htmlFor="component-helper">Integration code (Optional)</InputLabel>
							<Input
								id="component-helper"
								value={integrationCode}
								onChange={(e) => setintegrationCode(e.target.value)}
								aria-describedby="component-helper-text"
								endAdornment={
									<InputAdornment position="end">
										<IconButton>
											<HelpOutlineIcon
												style={{ cursor: 'pointer' }}
												onMouseEnter={(e) =>
													setpop1({
														status: true,
														id: e.currentTarget,
														text: (
															<div>
																Enter an optional integration code for use with an
																external reporting system.
															</div>
														)
													})}
												onMouseLeave={() => setpop1({ status: false, id: null, text: null })}
												sx={{ fontSize: 16 }}
											/>
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<br />
						<FormControl variant="standard" id="inputwide">
							<InputLabel htmlFor="component-helper">Notes (Optional)</InputLabel>
							<Input
								value={notes}
								onChange={(e) => setnotes(e.target.value)}
								id="component-helper"
								aria-describedby="component-helper-text"
							/>
						</FormControl>
					</div>
				</Paper>
			</div>
			<Footer history={history} loading={loading} success={success} onSubmit={onSubmit} />
			{/* <Paper className="html_paper_footer">
				<Box sx={{ m: 1, position: 'relative' }}>
					<Button variant="contained" sx={buttonSx} disabled={loading} onClick={onSubmit}>
						save
					</Button>
					{loading && (
						<CircularProgress
							size={24}
							sx={{
								color: green[500],
								position: 'absolute',
								top: '50%',
								left: '50%',
								marginTop: '-12px',
								marginLeft: '-12px'
							}}
						/>
					)}
				</Box>
				<Button
					style={{ margin: '0 15px' }}
					onClick={() => {
						if (!loading) history.push('/creative');
					}}
				>
					cancel
				</Button>
			</Paper> */}
		</div>
	);
}

export default Html5image;
