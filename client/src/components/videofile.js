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
	TableContainer,
	TableBody,
	TableRow,
	TableCell,
	TextField
} from '@mui/material';
import '../App.css';
import React, { useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ClearIcon from '@mui/icons-material/Clear';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import WarningIcon from '@mui/icons-material/Warning';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Videofile() {
	const history = useHistory();
	const videoRef = useRef();
	const { enqueueSnackbar } = useSnackbar();
	const [ loading, setloading ] = React.useState(false);
	const [ name, setname ] = React.useState('');
	const [ url, seturl ] = React.useState('');
	const [ urlList, seturlList ] = React.useState([]);
	const [ urlSelectList, seturlSelectList ] = React.useState([]);
	const [ bisc1, setbisc1 ] = React.useState(true);
	const [ bisc2, setbisc2 ] = React.useState(true);
	const [ bisc3, setbisc3 ] = React.useState(true);
	const [ bisc4, setbisc4 ] = React.useState(false);
	const [ error, seterror ] = React.useState({ message: '', status: false });
	const [ bisc5, setbisc5 ] = React.useState(false);
	const [ bisc6, setbisc6 ] = React.useState(false);
	const [ skipable, setskipable ] = React.useState(false);
	const [ universalId, setuniversalId ] = React.useState('');
	const [ fileUpload, setfileUpload ] = React.useState(null);
	const [ integrationCode, setintegrationCode ] = React.useState('');
	const [ notes, setnotes ] = React.useState('');
	const [ pop1, setpop1 ] = React.useState({ status: false, id: null, text: null });
	const [ videoDuration, setvideoDuration ] = React.useState(null);
	const addon = () => {
		var addss = { name: 'impression', url: '', id: uuidv4() };
		seturlList([ ...urlList, addss ]);
		// console.log(urlList);
	};
	const onLoadedMetadata = () => {
		if (videoRef.current) {
			console.log(videoRef.current.duration);
			setvideoDuration(videoRef.current.duration);
		}
	};
	// console.log(urlSelectList && urlList ? (urlSelectList.length === urlList.length ? true : false) : false);
	const onFileChangeVideo = (e) => {
		const filedata = e.target.files[0];
		if (filedata) {
			console.log(filedata);
			var size = parseInt(filedata.size) / Math.pow(1024, 3);
			console.log(size);
			if (filedata.type.indexOf('video/') > -1) {
				if (size > 1) {
					enqueueSnackbar('File size is greater than 1GB!', { variant: 'error' });
				} else {
					enqueueSnackbar('File uploaded Successfully!', { variant: 'success' });
					setfileUpload(filedata);
				}
			} else {
				enqueueSnackbar('File format is incorrect!', { variant: 'error' });
			}
		}
	};
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
	function onSubmit() {
		var servingProps = [];
		// if(!(urlList&&urlList.length) || !name|| !fileUpload || !fileUpload1){
		if (!fileUpload || !name) {
			setloading(false);
			return enqueueSnackbar('Enter all the required fields', { variant: 'error' });
		}
		urlList.map((x) => servingProps.push({ name: x.name, url: x.url }));
		var formdata = new FormData();
		formdata.append('name', name);
		formdata.append('integration', integrationCode);
		formdata.append('notes', notes);
		formdata.append('type', 'Video');
		formdata.append('format', 'Video');
		formdata.append('duration', videoDuration);
		formdata.append('VideoFile', fileUpload);
		formdata.append('skipable', skipable);
		formdata.append('universalAdId', universalId);
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
			<Paper className="html_paper">
				<IconButton>
					<CloseIcon onClick={() => history.push('/creative')} />
				</IconButton>
				<div className="html_title_text">New video creative</div>
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
			<div className="body_form video_for">
				<div className="">
					<Paper className={bisc1 ? 'toggle_paper_video_1' : 'html_paper_body_video'}>
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
					<Paper className={bisc2 ? 'toggle_paper_video' : 'html_paper_body_video'}>
						<div className="toggle_body_head" onClick={() => setbisc2(!bisc2)}>
							<div>Assets</div>
							{!bisc2 ? <ExpandMore /> : <ExpandLess />}
						</div>
						<div style={{ alignItems: 'center' }} className="html_body_p">
							<div style={{ opacity: '0.6' }} className="flexdisplay">
								<div>Source file</div>
								<HelpOutlineIcon
									style={{ cursor: 'pointer' }}
									onMouseEnter={(e) =>
										setpop1({
											status: true,
											id: e.currentTarget,
											text: (
												<div>
													Source files can be up to 1 GB and in one of the following formats:{' '}
													.avi, .mov, .mp4, .m4v, .mpeg, .mpg, .oga, .ogg, .ogv, .webm, .wmv.
													Always upload a source file with the highest possible specifications
													you have available so that Display & Video 360 can transcode the
													asset into as many serving files as possible.
												</div>
											)
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
										<input type="file" accept="video/*" value="" onChange={onFileChangeVideo} />
									</div>
									<p> or </p>
									<div className="uploadButton">
										<Button>Upload</Button>
										<input type="file" accept="video/*" id="upload" onChange={onFileChangeVideo} />
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
							{/* <FormControl variant="standard" id="inputwide">
								<InputLabel htmlFor="component-helper">Landing page url</InputLabel>
								<Input
									id="component-helper"
									value={url}
									onChange={(e) => {
										if (e.target.value.length < 513) {
											seturl(e.target.value);
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
															text: (
																<div>
																	The web page to direct people to when they click
																	your ad. Make sure the landing page:
																	<ul>
																		<li>
																			Loads without error when you open it in a
																			browser window.
																		</li>
																		<li>
																			Is accessible from all geographic locations,
																			even if your campaign targets a specific
																			country or region.
																		</li>
																	</ul>
																</div>
															)
														})}
													onMouseLeave={() =>
														setpop1({ status: false, id: null, text: null })}
													sx={{ fontSize: 16 }}
												/>
											</IconButton>
										</InputAdornment>
									}
								/>
								<div className="limittextindicate">{url ? url.length : 0}/1024</div>
							</FormControl> */}
						</div>
					</Paper>
					<Paper className={bisc3 ? 'toggle_paper_video' : 'html_paper_body_video'}>
						<div className="toggle_body_head" onClick={() => setbisc3(!bisc3)}>
							<div>Video options</div>
							{!bisc3 ? <ExpandMore /> : <ExpandLess />}
						</div>
						<div style={{ alignItems: 'center' }} className="html_body_p">
							<div style={{ opacity: '0.6' }} className="flexdisplay">
								<div>Skip button</div>
							</div>
							<div className="flexdisplay">
								<Checkbox value={skipable} onChange={(e) => setskipable(e.target.checked)} {...label} />
								<div>Include skip button</div>
							</div>
							<div className="flexdisplay">
								<FormControl variant="standard" id="inputwide">
									<InputLabel htmlFor="component-helper">Universal Ad Id (optional)</InputLabel>
									<Input
										id="component-helper"
										aria-describedby="component-helper-text"
										value={universalId}
										onChange={(e) => setuniversalId(e.target.value)}
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
																	'Include a registered industry-wide identifier for your video creative that will be included in VAST tags. If you’ve registered IDs with Ad-ID or Clearcast, enter them here. You can also use a Campaign Manager 360-generated ID or a registered tag from another provider.'
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
								<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
									<InputLabel id="demo-simple-select-standard-label"> </InputLabel>
									<Select
										labelId="demo-simple-select-standard-label"
										id="demo-simple-select-standard"
										label="Age"
										defaultValue={40}
									>
										<MenuItem value={10}>Other</MenuItem>
										<MenuItem value={20}>Ad-ID</MenuItem>
										<MenuItem value={30}>clearcast.co.uk</MenuItem>
										<MenuItem value={40}>Display & Video 360</MenuItem>
									</Select>
								</FormControl>
							</div>
							<div style={{ opacity: '0.6' }} className="flexdisplay">
								<div>OBA compliance</div>
							</div>
							<div className="flexdisplay">
								<Checkbox {...label} />
								<div>Use custom OBA icon</div>
							</div>
						</div>
					</Paper>
					<Paper className={bisc4 ? 'toggle_paper_video' : 'html_paper_body_video'}>
						<div className="toggle_body_head" onClick={() => setbisc4(!bisc4)}>
							<div>Companion creatives</div>
							{!bisc4 ? <ExpandMore /> : <ExpandLess />}
						</div>
						<div style={{ alignItems: 'center' }} className="html_body_sp">
							<div className="brown_back_video">
								<Button>ASSIGN COMPANIONS</Button>
								<div className="brown_inside">
									<div>Cookie ICON</div>
									<div style={{ opacity: '0.6' }}>
										<div>No companion creatives assigned</div>
									</div>
									<Button>ASSIGN COMPANIONS</Button>
								</div>
							</div>
						</div>
					</Paper>
					<Paper className={bisc5 ? 'toggle_paper_video' : 'html_paper_body_video'}>
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
												<div>Allow third parties to track interactions with your creative.</div>
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
					<Paper className={bisc6 ? 'toggle_paper_video' : 'html_paper_body_video'}>
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
									value={notes}
									onChange={(e) => setnotes(e.target.value)}
									id="component-helper"
									aria-describedby="component-helper-text"
								/>
							</FormControl>
						</div>
					</Paper>
				</div>
				<div>
					<Paper className="preview_video">
						<div style={{ opacity: '0.6' }}>Preview</div>
						{fileUpload ? (
							<video
								ref={videoRef}
								onLoadedMetadata={onLoadedMetadata}
								className="video_preview_video"
								controls
							>
								<source src={URL.createObjectURL(fileUpload)} />
							</video>
						) : (
							<div className="video_preview">
								<MovieCreationIcon sx={{ fontSize: 55 }} />
								<div>Add an asset to preview</div>
							</div>
						)}
					</Paper>
				</div>
			</div>
			<Paper className="html_paper_footer">
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
				<Button style={{ margin: '0 15px' }} onClick={() => history.push('/creative')}>
					cancel
				</Button>
			</Paper>
		</div>
	);
}

export default Videofile;
