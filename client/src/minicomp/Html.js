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
	Dialog
} from '@mui/material';
import React from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
// import 'bootstrap/dist/css/bootstrap.min.css';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { useSnackbar } from 'notistack';
import '../App.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Html({
	name,
	setname,
	fileUpload,
	setfileUpload,
	integrationCode,
	setintegrationCode,
	notes,
	setnotes,
	url,
	filename,
	uploadstatus,
	setuploadstatus
}) {
	// const [ name, setname ] = React.useState('');
	const { enqueueSnackbar } = useSnackbar();
	// const [ fileUpload, setfileUpload ] = React.useState(null);
	const [ open, setopen ] = React.useState(false);
	const [ bisc1, setbisc1 ] = React.useState(true);
	const [ bisc2, setbisc2 ] = React.useState(false);
	const [ pop1, setpop1 ] = React.useState({ status: false, id: null, text: null });
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
	// const [ pop2, setpop2 ] = React.useState({ status: false, id: null });
	// const [ pop3, setpop3 ] = React.useState({ status: false, id: null });
	// const [ pop4, setpop4 ] = React.useState({ status: false, id: null });
	// const [ pop5, setpop5 ] = React.useState({ status: false, id: null });
	return (
		<div style={{ marginTop: '30px' }}>
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
					{uploadstatus ? !fileUpload ? (
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
					) : (
						<div className="flexdisplay">
							<div>{filename}</div>
							<IconButton onClick={() => setfileUpload(null)}>
								<ClearIcon fontSize="small" />
							</IconButton>
						</div>
					)}
					{uploadstatus ? (
						fileUpload && (
							<div className="">
								<Button onClick={() => setopen(true)}>Preview</Button>
								<Dialog open={open} onClose={() => setopen(false)}>
									<img src={URL.createObjectURL(fileUpload)} alt={fileUpload.name} />
								</Dialog>
							</div>
						)
					) : (
						<div>
							<Button onClick={() => setopen(true)}>Preview</Button>
							<Dialog open={open} onClose={() => setopen(false)}>
								<img src={url} alt={filename} />
							</Dialog>
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
												When serving as an interstitial in a mobile app, if the creative isn't{' '}
												<br /> wide enough to fit, it will be scaled to fit the device width
												while<br /> preserving aspect ratio. Check this box to disable scaling.
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
							aria-describedby="component-helper-text"
							value={integrationCode}
							onChange={(e) => setintegrationCode(e.target.value)}
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
															Enter an optional integration code for use with an external
															reporting system.
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
							id="component-helper"
							value={notes}
							onChange={(e) => setnotes(e.target.value)}
							aria-describedby="component-helper-text"
						/>
					</FormControl>
				</div>
			</Paper>
		</div>
	);
}

export default Html;
