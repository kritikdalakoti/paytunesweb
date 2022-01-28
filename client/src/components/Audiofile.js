import {
	IconButton,
	Paper,
	Tabs,
	Typography,
	Box,
	Tab,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
	Button,
	Checkbox,
	TableContainer,
	TableBody,
	TableRow,
	TableCell,
	TextField,
	Select,
	MenuItem,
	Popover,
	Alert,
	Accordion,
	AccordionSummary,
	AccordionDetails
} from '@mui/material';
import React, { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WarningIcon from '@mui/icons-material/Warning';
import { v4 as uuidv4 } from 'uuid';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageIcon from '@mui/icons-material/Image';
import ClearIcon from '@mui/icons-material/Clear';
// import LinkIcon from '@mui/icons-material/Link';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useSnackbar } from 'notistack';
import axios from 'axios';
// import Footer from './Footer';

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Audiofile() {
	const history = useHistory();
	const audioRef = useRef();
	const imageRef = useRef();
	const { enqueueSnackbar } = useSnackbar();
	const [ loading, setloading ] = React.useState(false);
	const [ error, seterror ] = React.useState({ message: '', status: false });
	const [ bisc1, setbisc1 ] = React.useState(true);
	const [ value, setValue ] = React.useState(0);
	const [ zoomvalue, setZoomValue ] = React.useState(100);
	const [ audioDuration, setaudioDuration ] = React.useState(null);
	const [ imageDimensions, setimageDimensions ] = React.useState(null);
	const [ fileUpload, setfileUpload ] = React.useState(null);
	const [ fileUpload1, setfileUpload1 ] = React.useState(null);
	const [ name, setname ] = React.useState('');
	const [ integrationCode, setintegrationCode ] = React.useState('');
	const [ notes, setnotes ] = React.useState('');
	const [ paletStatus, setpaletStatus ] = React.useState([]);
	const [ urlList, seturlList ] = React.useState([]);
	const [ urlSelectList, seturlSelectList ] = React.useState([]);
	const [ pop1, setpop1 ] = React.useState({ status: false, id: null, text: null });
	const [ bisc5, setbisc5 ] = React.useState(false);
	const [ bisc6, setbisc6 ] = React.useState(false);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const addon = () => {
		var addss = { name: 'impression', url: '', id: uuidv4() };
		seturlList([ ...urlList, addss ]);
		// console.log(urlList);
	};
	function onImgLoad() {
		console.log({
			dimension: {
				height: imageRef.current.offsetHeight,
				width: imageRef.current.offsetWidth
			}
		});
	}
	// console.log(urlSelectList && urlList ? (urlSelectList.length === urlList.length ? true : false) : false);
	function urlTable() {
		// setpop1({ status: true, id: null });
		// setpop1({ status: false, id: null, text: null });
		return (
			<TableContainer>
				<TableBody className="borderGray">
					<TableRow>
						<TableCell>
							<Checkbox
								color="primary"
								checked={urlSelectList.length === urlList.length ? true : false}
								onChange={(e) => {
									if (e.target.checked) {
										var ids = [];
										urlList.map((x) => ids.push(x.id));
										seturlSelectList(ids);
									} else {
										seturlSelectList([]);
									}
								}}
							/>
						</TableCell>
						<TableCell style={{ opacity: '0.6' }}>Name</TableCell>
						<TableCell style={{ opacity: '0.6' }}>Url</TableCell>
					</TableRow>
					{urlList.length ? (
						urlList.map((row, i) => (
							<TableRow key={i} style={{ backgroundColor: 'white' }}>
								<TableCell>
									<Checkbox
										color="primary"
										checked={
											urlSelectList.length ? urlSelectList.includes(row.id) ? true : false : false
										}
										onChange={(e) => {
											if (e.target.checked) {
												console.log(urlSelectList);
												if (
													urlSelectList &&
													typeof urlSelectList === 'object' &&
													urlSelectList.length
												) {
													seturlSelectList((prev) => prev.concat([ row.id ]));
												} else {
													seturlSelectList([ row.id ]);
												}
											} else {
												seturlSelectList((prev) => prev.filter((x) => x !== row.id));
											}
										}}
									/>
								</TableCell>
								<TableCell>
									<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
										<Select
											labelId="demo-simple-select-standard-label"
											id="demo-simple-select-standard"
											value={row.name}
											onChange={(e) =>
												seturlList((prev) =>
													prev.map(
														(el) =>
															el.id === row.id
																? Object.assign({}, el, { name: e.target.value })
																: el
													)
												)}
											defaultValue="impression"
										>
											<MenuItem value="impression">impression</MenuItem>
											<MenuItem value="click">Click Tracking</MenuItem>
											<MenuItem value="start">Start</MenuItem>
											<MenuItem value="firstQuartile">First Quartile</MenuItem>
											<MenuItem value="midpoint">Midpoint</MenuItem>
											<MenuItem value="thirdQuartile">Third Quartile</MenuItem>
											<MenuItem value="complete">Complete</MenuItem>
											<MenuItem value="mute">Mute</MenuItem>
											<MenuItem value="pause">Pause</MenuItem>
											<MenuItem value="rewind">Rewind</MenuItem>
											<MenuItem value="fullscreen">Fullscreen</MenuItem>
											<MenuItem value="stop">Stop</MenuItem>
											<MenuItem value="custom">Custom</MenuItem>
											<MenuItem value="skip">Skip</MenuItem>
											<MenuItem value="progress">Progress</MenuItem>
										</Select>
									</FormControl>
								</TableCell>
								<TableCell style={{ width: '70%' }}>
									<TextField
										style={{ width: '100%' }}
										placeholder="url"
										id="standard-basic"
										variant="standard"
										value={row.url}
										onChange={(e) =>
											seturlList((prev) =>
												prev.map(
													(el) =>
														el.id === row.id
															? Object.assign({}, el, { url: e.target.value })
															: el
												)
											)}
									/>
								</TableCell>
							</TableRow>
						))
					) : (
						''
					)}
				</TableBody>
			</TableContainer>
		);
	}
	const handleChangepanel = (panel) => (event, newpaletStatus) => {
		var expa = paletStatus;
		console.log(newpaletStatus, panel, expa.filter((x) => x !== panel), 'tu');
		console.log(expa.filter((x) => x === panel).length ? expa.filter((x) => x !== panel) : expa.push(panel));
		console.log(expa, 'asd');
		setpaletStatus(expa);
	};
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
				enqueueSnackbar('Image uploaded Successfully!', { variant: 'success' });
				setfileUpload1(filedata);
			} else {
				enqueueSnackbar('File format is incorrect!', { variant: 'error' });
			}
		}
	};
	const onLoadedMetadata = () => {
		if (audioRef.current) {
			console.log(audioRef.current.duration);
			setaudioDuration(audioRef.current.duration);
		}
	};
	const onFileChangeAudio = (e) => {
		const filedata = e.target.files[0];
		if (filedata) {
			console.log(filedata);
			// const audio = document.querySelector('audio');
			// audio.addEventListener('durationchange', (e) => {
			// 	console.log(e);
			// });
			// var tt = document.getElementById('audio_preview_audio');
			// console.log(filedata.duration);
			// console.log(document.getElementById('audio_preview_audio').duration);
			var size = parseInt(filedata.size) / Math.pow(1024, 3);
			console.log(size);
			if (filedata.type.indexOf('audio/') > -1) {
				if (size > 1) {
					enqueueSnackbar('File size is greater than 1GB!', { variant: 'error' });
				} else {
					enqueueSnackbar('Audio file uploaded Successfully!', { variant: 'success' });
					setfileUpload(filedata);
				}
			} else {
				enqueueSnackbar('File format is incorrect!', { variant: 'error' });
			}
		}
	};
	function onSubmit() {
		var servingProps = [];
		// if(!(urlList&&urlList.length) || !name|| !fileUpload || !fileUpload1){
		if (!fileUpload || !fileUpload1) {
			setValue(0);
			setloading(false);
			return enqueueSnackbar('Enter all the required fields', { variant: 'error' });
		} else if (!name) {
			setValue(1);
			setloading(false);
			return enqueueSnackbar('Enter all the required fields', { variant: 'error' });
		}
		urlList.map((x) => servingProps.push({ name: x.name, url: x.url }));
		var formdata = new FormData();
		formdata.append('name', name);
		formdata.append('integration', integrationCode);
		formdata.append('notes', notes);
		formdata.append('type', 'Audio');
		formdata.append('format', 'Audio');
		formdata.append('duration', audioDuration);
		formdata.append('AudioFile', fileUpload);
		formdata.append('Banner', fileUpload1);
		formdata.append('servingProp', servingProps);
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
			})
			.catch((error) => {
				setloading(false);
				enqueueSnackbar('Something went wrong! try again', { variant: 'error' });
				console.log(error.response.data);
				seterror({ message: error.response.data.error, status: true });
			});
	}
	return (
		<div>
			<Paper className="html_paper" id="html_paper">
				<IconButton>
					<CloseIcon
						onClick={() => {
							if (!loading) history.push('/creative');
						}}
					/>
				</IconButton>
				<div className="html_title_text">New audio creative</div>
			</Paper>
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
				<Typography sx={{ p: 1, fontSize: 13, width: '350px', margin: '5px 10px' }}>{pop1.text}</Typography>
			</Popover>
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white' }}>
					<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
						<Tab className="tabsTag" label="Ad canvas" {...a11yProps(0)} />
						<Tab className="tabsTag" label="Creative details" {...a11yProps(1)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<div className="d-flex content flex-row bd-highlight mb-3">
						<div className="container-sm p-0 m-0">
							<Alert
								className="alert"
								action={
									<React.Fragment>
										<Button
											variant="text"
											size="small"
											onClick={() => {
												window.open('https://support.google.com/displayvideo/answer/9803072');
											}}
										>
											Learn More
										</Button>
										<Button variant="text" size="small">
											Dismiss
										</Button>
									</React.Fragment>
								}
								style={{ margin: 0 }}
								severity="info"
							>
								You can now upload companions along with your bulk audio creative uploads.
							</Alert>
							<div className="panelhold bg-secondary bg-opacity-10 d-flex flex-row-reverse">
								<IconButton
									disabled={zoomvalue >= 150 ? true : false}
									onClick={() => setZoomValue((prev) => prev + 25)}
									className="p-3"
								>
									<ZoomInIcon />
								</IconButton>
								<IconButton
									disabled={zoomvalue <= 25 ? true : false}
									onClick={() => setZoomValue((prev) => prev - 25)}
									className="p-3"
								>
									<ZoomOutIcon />
								</IconButton>
								<FormControl variant="standard" className="p-3">
									<Select
										labelId="demo-simple-select-standard-label"
										id="demo-simple-select-standard"
										value={zoomvalue}
										onChange={(e) => setZoomValue(e.target.value)}
									>
										<MenuItem value={25}>25%</MenuItem>
										<MenuItem value={50}>50%</MenuItem>
										<MenuItem value={75}>75%</MenuItem>
										<MenuItem value={100}>100%</MenuItem>
										<MenuItem value={125}>125%</MenuItem>
										<MenuItem value={150}>150%</MenuItem>
									</Select>
								</FormControl>
							</div>
							<div className="d-flex canvas">
								<Paper
									className="canvas_paper"
									style={{
										width: `${330 * zoomvalue / 100}px`,
										height: `${350 * zoomvalue / 100}px`,
										textAlign: 'center',
										padding: `${20 * zoomvalue / 100}px`
									}}
								>
									{fileUpload1 ? (
										<div className="pao bg-secondary bg-opacity-10 w-100">
											<img
												className="poster_image"
												src={URL.createObjectURL(fileUpload1)}
												alt="poster"
											/>
										</div>
									) : (
										<div className="pao bg-secondary bg-opacity-10 w-100">
											<ImageIcon sx={{ fontSize: 40 * zoomvalue / 100 }} className="icon_home" />
										</div>
									)}
									{fileUpload ? (
										<audio
											className="audio_preview_audio"
											id="audio_preview_audio"
											onLoadedMetadata={onLoadedMetadata}
											ref={audioRef}
											style={{
												width: `${290 * zoomvalue / 100}px`,
												height: `${35 * zoomvalue / 100}px`,
												margin: `${15 * zoomvalue / 100}px ${0 * zoomvalue / 100}px`
											}}
											controls
										>
											<source src={URL.createObjectURL(fileUpload)} />
										</audio>
									) : (
										<React.Fragment>
											<audio
												className="audio_preview_audio"
												id="audio_preview_audio"
												style={{
													width: `${290 * zoomvalue / 100}px`,
													height: `${35 * zoomvalue / 100}px`,
													margin: `${15 * zoomvalue / 100}px ${0 * zoomvalue / 100}px`
												}}
												controls
												src={null}
											/>
										</React.Fragment>
									)}
								</Paper>
							</div>
						</div>
						<Paper style={{ width: '350px' }}>
							<div className="">
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography>Assets</Typography>
									</AccordionSummary>
									<AccordionDetails style={{ alignItems: 'center', overflow: 'hidden' }}>
										<div
											className="d-flex align-bottom opacity-50"
											style={{ alignItems: 'center' }}
										>
											<div className="p-1">Source file</div>
											<HelpOutlineIcon
												style={{ cursor: 'pointer', padding: '0', margin: '0' }}
												onMouseEnter={(e) =>
													setpop1({
														status: true,
														id: e.currentTarget,
														text: (
															<div>
																For the best results, upload a source file of the
																highest possible quality.
																<ul>
																	<li>File size: 1 GB max</li>
																	<li>Format: .mp3</li>
																</ul>
															</div>
														)
													})}
												onMouseLeave={() => setpop1({ status: false, id: null, text: null })}
												sx={{ fontSize: 16 }}
											/>
										</div>
										<div className="d-flex">
											<GraphicEqIcon className="opacity-50 m-1" />
											{!fileUpload ? (
												<div className="flexdisplay">
													<div className="drop-file-input">
														<div className="drop-file-input__label">
															<p>Drop file here</p>
														</div>
														<input
															type="file"
															accept="audio/*"
															value=""
															onChange={onFileChangeAudio}
														/>
													</div>
													<p> or </p>
													<div className="uploadButton">
														<Button>Upload</Button>
														<input
															type="file"
															accept=".mp3"
															id="upload"
															onChange={onFileChangeAudio}
														/>
													</div>
												</div>
											) : (
												<div className="flexdisplay">
													<div>{fileUpload.name}</div>
													<IconButton
														onClick={() => {
															enqueueSnackbar('Audio File removed Successfully!', {
																variant: 'success'
															});
															setfileUpload(null);
														}}
													>
														<ClearIcon fontSize="small" />
													</IconButton>
												</div>
											)}
										</div>
									</AccordionDetails>
								</Accordion>
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
										className="d-flex align-self-center"
									>
										<Typography>Companion creatives</Typography>
										<HelpOutlineIcon
											style={{ cursor: 'pointer' }}
											className="m-1"
											onMouseEnter={(e) =>
												setpop1({
													status: true,
													id: e.currentTarget,
													text: (
														<div>
															To increase your reach and reinforce your message, assign a
															companion display ad. Companion ads appear in compatible
															audio players while your audio ad is playing.
														</div>
													)
												})}
											onMouseLeave={() => setpop1({ status: false, id: null, text: null })}
											sx={{ fontSize: 16 }}
										/>
									</AccordionSummary>
									<AccordionDetails style={{ alignItems: 'center', overflow: 'hidden' }}>
										<div
											className="d-flex align-bottom opacity-50"
											style={{ alignItems: 'center', overflow: 'hidden' }}
										>
											<div className="p-1">Companion asset</div>
											<HelpOutlineIcon
												style={{ cursor: 'pointer', padding: '0', margin: '0' }}
												onMouseEnter={(e) =>
													setpop1({
														status: true,
														id: e.currentTarget,
														text: (
															<div>
																Allowed file types: HTML5 (.zip) or image (.gif, .jpg,
																.png).
															</div>
														)
													})}
												onMouseLeave={() => setpop1({ status: false, id: null, text: null })}
												sx={{ fontSize: 16 }}
											/>
										</div>
										<div className="d-flex">
											<ImageIcon className="opacity-50" fontSize="large" />
											{!fileUpload1 ? (
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
													<div>{fileUpload1.name}</div>
													<IconButton
														onClick={() => {
															enqueueSnackbar('Image removed Successfully!', {
																variant: 'success'
															});
															setfileUpload1(null);
														}}
													>
														<ClearIcon fontSize="small" />
													</IconButton>
												</div>
											)}
										</div>
										{!fileUpload1 && (
											<div className="d-flex">
												or{' '}
												<div className="uploadButton" style={{ width: 'fit-content' }}>
													<Button>assign</Button>
													<input
														type="file"
														id="upload"
														onChange={(e) => {
															const filedata = e.target.files[0];
															if (filedata) {
																setfileUpload1(filedata);
															}
														}}
													/>
												</div>
											</div>
										)}
										{fileUpload1 && (
											<React.Fragment>
												<img
													ref={imageRef}
													onLoad={onImgLoad}
													src={fileUpload1}
													alt=""
													style={{ display: 'none' }}
												/>
											</React.Fragment>
										)}
									</AccordionDetails>
								</Accordion>
							</div>
						</Paper>
					</div>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<div className="body_form_audio content mb-3">
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
														onMouseLeave={() =>
															setpop1({ status: false, id: null, text: null })}
														sx={{ fontSize: 16 }}
													/>
												</IconButton>
											</InputAdornment>
										}
									/>
									<div className="limittextindicate">{name ? name.length : 0}/512</div>
								</FormControl>
							</div>
						</Paper>
						<Paper className={bisc5 ? 'toggle_paper' : 'html_paper_body'}>
							<div className="toggle_body_head" onClick={() => setbisc5(!bisc5)}>
								<div>Serving properties</div>
								{!bisc5 ? <ExpandMore /> : <ExpandLess />}
							</div>
							<div style={{ alignItems: 'center' }} className="html_body_sp">
								{/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
								<div style={{ opacity: '0.6' }} className="flexdisplay">
									<div>Third-party URLs</div>
									<HelpOutlineIcon
										style={{ cursor: 'pointer' }}
										onMouseEnter={(e) =>
											setpop1({
												status: true,
												id: e.currentTarget,
												text: (
													<div>
														Allow third parties to track interactions with your creative.
													</div>
												)
											})}
										onMouseLeave={() => setpop1({ status: false, id: null, text: null })}
										sx={{ fontSize: 16 }}
									/>
								</div>
								<div className="brown_back_video borderGray">
									<div className="flexdisplay">
										<Button variant="outlined" onClick={() => addon()}>
											add url
										</Button>
										<Button
											onClick={() => {
												var selectedid = urlSelectList;
												var resulturl =
													urlList && urlList.length
														? urlList.filter((x) => !selectedid.includes(x.id))
														: [];
												seturlSelectList([]);
												seturlList(resulturl);
											}}
											disabled={!urlSelectList.length ? true : false}
										>
											delete
										</Button>
									</div>
									<div
										className="flexdisplay"
										style={{ padding: '10px', justifyContent: 'space-evenly' }}
									>
										<WarningIcon sx={{ fontSize: 30, color: 'orange', marginRight: '15px' }} />
										<div className="text_bet">
											You are responsible for ensuring that your collection and use of user
											information complies with your legal agreements and applicable laws and
											policies, including the{' '}
											<a href="https://www.google.com/about/company/user-consent-policy/">
												{' '}
												EU User Consent Policy.{' '}
											</a>
										</div>
									</div>
									{urlTable()}
								</div>
							</div>
						</Paper>
						<Paper className={bisc6 ? 'toggle_paper' : 'html_paper_body'}>
							<div className="toggle_body_head" onClick={() => setbisc6(!bisc6)}>
								<div>Additional Details</div>
								{!bisc6 ? <ExpandMore /> : <ExpandLess />}
							</div>
							<div style={{ alignItems: 'center' }} className="html_body_p">
								{/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
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
																text:
																	'Enter an optional integration code for use with an external reporting system.'
															})}
														onMouseLeave={() =>
															setpop1({ status: false, id: null, text: null })}
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
				</TabPanel>
			</Box>
			<Paper className="html_paper_footer_1">
				<Button
					style={{ margin: '0 15px' }}
					variant="contained"
					disabled={loading}
					onClick={() => {
						if (!loading) {
							setloading(true);
							onSubmit();
						}
					}}
				>
					save
				</Button>
				<Button
					style={{ margin: '0 15px' }}
					onClick={() => {
						if (!loading) history.push('/creative');
					}}
				>
					cancel
				</Button>
			</Paper>
		</div>
	);
}

export default Audiofile;
