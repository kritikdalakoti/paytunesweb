import {
	IconButton,
	Paper,
	Tabs,
	Tab,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Popover,
	Button
} from '@mui/material';
import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory, useParams } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';
import { data } from '../data/home_tabledata.json';
import { Box } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Video from '../minicomp/Video';
import Html from '../minicomp/Html';
import sender from '../minicomp/Audio';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import '../App.css';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { useSnackbar } from 'notistack';
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

const StyledInputElement = styled('input')`
  width: 90%;
  font-size: 1rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.5em;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 6px 10px;
  color: #20262d;
  transition: width 300ms ease;

  &:hover {
    background: #eaeef3;
    border-color: #e5e8ec;
  }

  &:focus {
    outline: none;
    width: 220px;
    transition: width 200ms ease-out;
  }
`;

function DetailedPage() {
	const { num } = useParams();
	const { enqueueSnackbar } = useSnackbar();
	const [ datafinal, setdatafinal ] = useState(null);
	const [ valuetab, setValuetab ] = React.useState(0);
	const [ loading, setloading ] = React.useState(true);
	const [ name, setname ] = React.useState('');
	const [ audioDuration, setaudioDuration ] = React.useState(null);
	const [ integrationCode, setintegrationCode ] = React.useState('');
	const [ fileUpload, setfileUpload ] = React.useState(null);
	const [ skipable, setskipable ] = React.useState(false);
	const [ universalId, setuniversalId ] = React.useState('');
	const [ fileUpload1, setfileUpload1 ] = React.useState(null);
	const [ notes, setnotes ] = React.useState('');
	const [ videoDuration, setvideoDuration ] = React.useState(null);
	const [ urlList, seturlList ] = React.useState([]);
	const [ expandmanage, setexpandmanage ] = React.useState([]);
	const [ pop1, setpop1 ] = React.useState({ status: false, id: null, text: null });
	console.log(loading);
	useEffect(
		() => {
			console.log('started');
			getCreative();
		},
		[ num ]
	);
	const getCreative = () => {
		setloading(true);
		axios
			.get(`http://localhost:5000/creative/get_a_creatives/${num}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('jwt')
				}
			})
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					setdatafinal(response.data);
					setname(response.data.name);
					setaudioDuration(response.data.duration);
					setintegrationCode(response.data.integration);
					setnotes(response.data.notes);
					// setfileUpload(response.data.audiofile[0]);
					setaudioDuration(response.data.duration);
					if (typeof response.data.servingProp === 'object') seturlList(response.data.servingProp);
					setloading(false);
				}
			})
			.catch((err) => {
				setloading(false);
				alert(err);
				console.log(err);
			});
	};
	const handleChangeTab = (event, newValuetab) => {
		setValuetab(newValuetab);
	};
	function DateReturn(date) {
		var temp = new Date(date);
		return (
			(temp.getMonth() > 8 ? temp.getMonth() + 1 : '0' + (temp.getMonth() + 1)) +
			'/' +
			(temp.getDate() > 9 ? temp.getDate() : '0' + temp.getDate()) +
			'/' +
			temp.getFullYear() +
			' ' +
			temp.toString().substr(16, 18)
		);
	}

	const handleChangeExpand = (panel) => {
		// console.log(expandmanage);
		// setexpandmanage((prev) => (newExpanded ? prev.push(panel) : prev.filter((x) => x !== panel)));
		var data = [];
		var newExpanded = true;
		expandmanage &&
			expandmanage.length &&
			expandmanage.map((x) => {
				if (x !== panel) {
					data.push(x);
				} else {
					newExpanded = false;
				}
			});
		if (newExpanded) {
			data.push(panel);
		}
		// console.log(data, newExpanded);
		setexpandmanage(data);
	};

	function Indextag() {
		return (
			<Paper className="d-flex maf">
				<div className="title_text">{datafinal && datafinal.status}</div>
				<div className="title_text">ID: {datafinal && datafinal._id}</div>
				<div className="title_text">Type: {datafinal && datafinal.type}</div>
				<div className="title_text">Format: {datafinal && datafinal.format}</div>
				<div className="title_text">Source: {datafinal && datafinal.source}</div>
			</Paper>
		);
	}
	function CreativeStatus() {
		return (
			<div className="">
				<Accordion expanded className="Accord">
					<AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
						<Typography>Creative summary</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<div className="html_body_p">
							<div className="d-flex">
								<div style={{ padding: '10px', fontSize: '14px' }}>
									<div className="dullText">Created</div>
									<div className="">{datafinal && DateReturn(datafinal.created)}</div>
								</div>
								<div style={{ padding: '10px', fontSize: '14px' }}>
									<div className="dullText">Modified</div>
									<div className="">{datafinal && DateReturn(datafinal.created)}</div>
								</div>
							</div>
						</div>
					</AccordionDetails>
				</Accordion>
				<Accordion className="Accord">
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>
							Display & Video 360 review{' '}
							<HelpOutlineIcon
								onMouseEnter={(e) =>
									setpop1({
										status: true,
										id: e.currentTarget,
										text: 'The name of the creative in Display & Video 360.'
									})}
								onMouseLeave={() => setpop1({ status: false, id: null, text: null })}
								sx={{ fontSize: 16 }}
							/>
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<div className="html_body_p">
							<div className="d-flex">
								<div style={{ padding: '10px', fontSize: '14px' }}>
									<div className="dullText">Created</div>
									<div className="">{datafinal && DateReturn(datafinal.created)}</div>
								</div>
								<div style={{ padding: '10px', fontSize: '14px' }}>
									<div className="dullText">Modified</div>
									<div className="">{datafinal && DateReturn(datafinal.created)}</div>
								</div>
							</div>
						</div>
					</AccordionDetails>
				</Accordion>
			</div>
		);
	}
	function onSubmit() {
		var servingProps = [];
		// if(!(urlList&&urlList.length) || !name|| !fileUpload || !fileUpload1){
		if (datafinal) {
			// if()
			if (datafinal.format === 'Audio' && (!fileUpload || !fileUpload1)) {
				setValuetab(0);
				setloading(false);
				return enqueueSnackbar('Enter all the required fields', { variant: 'error' });
			} else if (!name) {
				setValuetab(1);
				setloading(false);
				return enqueueSnackbar('Enter all the required fields', { variant: 'error' });
			} else if (datafinal.format === 'Video' && datafinal.format === 'Image' && !fileUpload) {
				setValuetab(0);
				setloading(false);
				return enqueueSnackbar('Enter all the required fields', { variant: 'error' });
			}
			urlList.map((x) => servingProps.push({ name: x.name, url: x.url }));
			var formdata = new FormData();
			formdata.append('name', name);
			formdata.append('integration', integrationCode);
			formdata.append('notes', notes);
			formdata.append('type', datafinal.type);
			formdata.append('format', datafinal.format);
			if (datafinal.format === 'Audio') {
				formdata.append('duration', audioDuration);
				formdata.append('AudioFile', fileUpload);
				formdata.append('Banner', fileUpload1);
			}
			if (datafinal.format === 'Video') {
				formdata.append('VideoFile', fileUpload);
				formdata.append('duration', videoDuration);
				formdata.append('universalAdId', universalId);
				formdata.append('skipable', skipable);
			}
			if (datafinal.format === 'Image') {
				formdata.append('ImageFile', fileUpload);
			}
			formdata.append('servingProp', servingProps);
			setloading(true);
			console.log(formdata);
			enqueueSnackbar("Don't cancel or reload the page \n Submission in progress", {
				variant: 'success'
			});
			axios
				.post('http://localhost:5000/creative/edit_creative', formdata, {
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
				});
		}
	}
	console.log(datafinal);
	const history = useHistory();
	return (
		<div>
			{loading ? (
				<div className="loadder">
					<CircularProgress className="l" />
				</div>
			) : (
				<div>
					{datafinal != null ? (
						<Paper className="html_paper" id="html_paper">
							<IconButton>
								<CloseIcon onClick={() => history.push('/creative')} />
							</IconButton>
							<div className="html_title_text">{datafinal.name}</div>
						</Paper>
					) : (
						<div>Error occured</div>
					)}
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
						<Typography sx={{ p: 1, fontSize: 13, width: '350px', margin: '5px 10px' }}>
							{pop1.text}
						</Typography>
					</Popover>
					<Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white' }}>
						{data && datafinal && datafinal.format === 'Audio' ? (
							<Tabs value={valuetab} onChange={handleChangeTab} aria-label="basic tabs example">
								<Tab className="tabsTag" label="Ad Canvas" {...a11yProps(0)} />
								<Tab className="tabsTag" label="Creative Details" {...a11yProps(1)} />
								<Tab className="tabsTag" label="Creative Status" {...a11yProps(2)} />
								<Tab className="tabsTag" label="History" {...a11yProps(3)} />
							</Tabs>
						) : (
							<Tabs value={valuetab} onChange={handleChangeTab} aria-label="basic tabs example">
								<Tab className="tabsTag" label="Creative Details" {...a11yProps(0)} />
								<Tab className="tabsTag" label="Creative Status" {...a11yProps(1)} />
								<Tab className="tabsTag" label="History" {...a11yProps(2)} />
							</Tabs>
						)}
					</Box>
					{datafinal && datafinal.format === 'Audio' ? (
						<React.Fragment>
							<TabPanel value={valuetab} index={0}>
								<div className="pageheight_c">
									<sender.canvas
										audioDuration={audioDuration}
										setaudioDuration={setaudioDuration}
										fileUpload={fileUpload}
										setfileUpload={setfileUpload}
										fileUpload1={fileUpload1}
										setfileUpload1={setfileUpload1}
									/>
								</div>
								<Paper className="html_paper_footer">
									<Button
										style={{ margin: '0 15px' }}
										variant="contained"
										disabled={loading}
										onClick={onSubmit}
									>
										save
									</Button>
									<Button style={{ margin: '0 15px' }}>cancel</Button>
								</Paper>
							</TabPanel>
							<TabPanel value={valuetab} index={1}>
								<Indextag />
								<div className="pageheight">
									<sender.creativedet
										name={name}
										setname={setname}
										integrationCode={integrationCode}
										setintegrationCode={setintegrationCode}
										notes={notes}
										setnotes={setnotes}
										urlList={urlList}
										seturlList={seturlList}
									/>
								</div>
								<Paper className="html_paper_footer">
									<Button
										style={{ margin: '0 15px' }}
										variant="contained"
										disabled={loading}
										onClick={onSubmit}
									>
										save
									</Button>
									<Button style={{ margin: '0 15px' }}>cancel</Button>
								</Paper>
							</TabPanel>
							<TabPanel value={valuetab} index={2}>
								<Indextag />
								<div className="pageheight">
									<div className="Accord_close">
										<Accordion expanded className="Accord">
											<AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
												<Typography>Creative summary</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<div className="html_body_p">
													<div className="d-flex">
														<div style={{ padding: '10px', fontSize: '14px' }}>
															<div className="dullText">Created</div>
															<div className="">
																{datafinal && DateReturn(datafinal.created)}
															</div>
														</div>
														<div style={{ padding: '10px', fontSize: '14px' }}>
															<div className="dullText">Modified</div>
															<div className="">
																{datafinal && DateReturn(datafinal.created)}
															</div>
														</div>
													</div>
												</div>
											</AccordionDetails>
										</Accordion>
										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
											>
												<Typography sx={{ width: '33%', flexShrink: 0 }}>
													Display & Video 360 review{' '}
													<HelpOutlineIcon
														onMouseEnter={(e) =>
															setpop1({
																status: true,
																id: e.currentTarget,
																text:
																	'A review of the creative to make sure it works as expected and includes at least 1 valid landing page. This usually takes less than 8 hours. At a minimum, this review has to be completed before your creative can start serving.'
															})}
														onMouseLeave={() =>
															setpop1({ status: false, id: null, text: null })}
														sx={{ fontSize: 16 }}
													/>
												</Typography>
												<CheckCircleIcon color="success" />
												<Typography sx={{ color: 'text.secondary', paddingLeft: '5px' }}>
													Servable
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<div className="table_con">
													<div className="d-flex table_col">
														<div className="table_left">
															Review Completed{' '}
															<HelpOutlineIcon
																onMouseEnter={(e) =>
																	setpop1({
																		status: true,
																		id: e.currentTarget,
																		text:
																			'The time when creative review was last completed.'
																	})}
																onMouseLeave={() =>
																	setpop1({ status: false, id: null, text: null })}
																sx={{ fontSize: 16 }}
															/>
														</div>
														<div className="table_right">10/20/21 2:58:09 AM GMT+5</div>
													</div>
													<div className="d-flex table_col">
														<div className="table_left">Feedback</div>
														<div className="table_right">Servable</div>
													</div>
													<div className="d-flex table_col">
														<div className="table_left">Restrictions</div>
														<div className="table_right">
															Detected ad technology providers: DoubleVerify Learn more<br />
															Creatives with unidentified ad technology providers may not
															serve in regions subject to privacy legislation.
															Unidentified ad technology providers: pixel.paytunes.in
															Learn more<br />
															This creative is restricted from serving in line items that
															target Russia.<br />
															This creative is restricted from serving in line items that
															target China.
														</div>
													</div>
													<div className="d-flex table_col">
														<div className="table_left">
															Detected destination URLs{' '}
															<HelpOutlineIcon
																onMouseEnter={(e) =>
																	setpop1({
																		status: true,
																		id: e.currentTarget,
																		text:
																			'The URL of the landing page Display & Video 360 was directed to after passing through any redirects and expanding all macros. This is the final URL that will display after a user clicks on your creative. Contact Display & Video 360 Support via the Help icon at the top of the page if you have questions.'
																	})}
																onMouseLeave={() =>
																	setpop1({ status: false, id: null, text: null })}
																sx={{ fontSize: 16 }}
															/>
														</div>
														<div className="table_right">10/20/21 2:58:09 AM GMT+5</div>
													</div>
												</div>
											</AccordionDetails>
										</Accordion>
										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1bh-content"
												id="panel1bh-header"
											>
												<Typography sx={{ width: '33%', flexShrink: 0 }}>
													Exchange review{' '}
													<HelpOutlineIcon
														onMouseEnter={(e) =>
															setpop1({
																status: true,
																id: e.currentTarget,
																text:
																	"Creatives are only reviewed by exchanges when assigned to a line item that targets that exchange. If an exchange isn't targeted, the exchange status will always be Pending. Exchanges review creatives based on their own requirements and policies. Approval process by exchange"
															})}
														onMouseLeave={() =>
															setpop1({ status: false, id: null, text: null })}
														sx={{ fontSize: 16 }}
													/>
												</Typography>
												<CheckCircleIcon color="success" />
												<Typography sx={{ color: 'text.secondary', paddingLeft: '5px' }}>
													Approved by 1 of 2 exchanges
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<div className="">
													<div className="table_row table_head d-flex">
														<div className="block2">Exchange</div>
														<div className="block1">Status</div>
														<div className="block1">SSL</div>
														<div className="block4">Feedback</div>
														<div className="block2">Last sync time</div>
													</div>
													<div className="table_row d-flex">
														<div className="block2">AppNexus (Xandr)</div>
														<div className="block1" />
														<div className="block1" />
														<div className="block4" />
														<div className="block2">N/A</div>
													</div>
													<div className="table_row d-flex">
														<div className="block2">Google Ad Manager 385923530</div>
														<div className="block1" />
														<div className="block1" />
														<div className="block4" />
														<div className="block2">N/A</div>
													</div>
													<div className="table_row table_head" />
												</div>
											</AccordionDetails>
										</Accordion>
										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
											>
												<Typography sx={{ width: '33%', flexShrink: 0 }}>Line items</Typography>
												<Typography sx={{ color: 'text.secondary', paddingLeft: '5px' }}>
													No associated line items
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<div className="">
													<div className="table_row table_head d-flex">
														<div className="block4">Line Item</div>
														<div className="block6">ID</div>
													</div>
													<div className="table_row d-flex center">
														No associated line items.
													</div>
												</div>
											</AccordionDetails>
										</Accordion>
										<Accordion>
											<AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
												<Typography sx={{ width: '33%', flexShrink: 0 }}>
													Line item eligibility
													<HelpOutlineIcon
														onMouseEnter={(e) =>
															setpop1({
																status: true,
																id: e.currentTarget,
																text:
																	'The line item type, features, inventory, or targeting that this creative is eligible to serve on. Eligibility is determined based on targeting, inventory requirements, and policy restrictions.'
															})}
														onMouseLeave={() =>
															setpop1({ status: false, id: null, text: null })}
														sx={{ fontSize: 16 }}
													/>
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<div className="">
													<div className="d-flex table_row table_head">
														<div className="block2">Feature</div>
														<div className="block1">Eligible</div>
														<div className="block7">Feedback</div>
													</div>
													<div className="d-flex table_row">
														<div className="block2">
															Outcome based buying{' '}
															<HelpOutlineIcon
																onMouseEnter={(e) =>
																	setpop1({
																		status: true,
																		id: e.currentTarget,
																		text: (
																			<div>
																				Insertion orders that use outcome based
																				buying don’t bill based on impressions.
																				Because of this, some creative types
																				aren’t supported.<br /> Outcome based
																				buying limitations
																			</div>
																		)
																	})}
																onMouseLeave={() =>
																	setpop1({ status: false, id: null, text: null })}
																sx={{ fontSize: 16 }}
															/>
														</div>
														<div className="block1">Yes</div>
														<div className="block7" />
													</div>
													<div className="d-flex table_row">
														<div className="block2">
															Gmail{' '}
															<HelpOutlineIcon
																onMouseEnter={(e) =>
																	setpop1({
																		status: true,
																		id: e.currentTarget,
																		text: (
																			<div>
																				You can only assign native site
																				creatives to Gmail line items.
																				Impression tracking URLs and JavaScript
																				tracking URLs aren’t supported. Use
																				Campaign Manager 360 tracking ads
																				instead.
																				<br />Creatives must meet Gmail ad
																				requirements.
																			</div>
																		)
																	})}
																onMouseLeave={() =>
																	setpop1({ status: false, id: null, text: null })}
																sx={{ fontSize: 16 }}
															/>
														</div>
														<div className="block1">No</div>
														<div className="block7">Format not supported</div>
													</div>
												</div>
											</AccordionDetails>
										</Accordion>
										<Button className="final_butt">resubmit for approval</Button>
									</div>
								</div>
								<Paper className="html_paper_footer">
									<Button
										style={{ margin: '0 15px' }}
										variant="contained"
										disabled={loading}
										onClick={onSubmit}
									>
										save
									</Button>
									<Button style={{ margin: '0 15px' }}>cancel</Button>
								</Paper>
							</TabPanel>
							<TabPanel value={valuetab} index={3}>
								<div className="det_filter">
									<FilterListIcon />
									<StyledInputElement aria-label="Demo input" placeholder="Add a filter" />
								</div>
								<div className="d-flex table_head table_row">
									<div className="block0">
										{expandmanage && expandmanage.length ? (
											<ExpandLess onClick={() => setexpandmanage([])} />
										) : (
											<ExpandMore onClick={() => setexpandmanage([ 0 ])} />
										)}
									</div>
									<div className="block2">Date</div>
									<div className="block3">User</div>
									<div className="block5">Change</div>
								</div>
								<div className="d-flex bg-white table_row">
									<div className="block0">
										{expandmanage && expandmanage.length && expandmanage.includes(0) ? (
											<ExpandLess onClick={() => handleChangeExpand(0)} />
										) : (
											<ExpandMore onClick={() => handleChangeExpand(0)} />
										)}
									</div>
									<div className="block2">Oct 24, 2021, 12:22:17 PM</div>
									<div className="block3">tiwarigaurav1@gmail.com</div>
									<div className="block5">2 changes made.</div>
								</div>
								{expandmanage && expandmanage.length && expandmanage.includes(0) ? (
									<React.Fragment>
										<div className="d-flex bg-white table_row">
											<div className="block0" />
											<div className="block2" />
											<div className="block3" />
											<div className="block5">
												Video Info - Ad Duration Millis was changed from 20000 to 20592
											</div>
										</div>
										<div className="d-flex bg-white table_row">
											<div className="block0" />
											<div className="block2" />
											<div className="block3" />
											<div className="block5">
												Asset Associations - Asset - Scs Content - Serving Path was changed from
												/video/-4768699599435725553/OPINykka_Oct21.mp3 to
												/-4768699599435725553/OPINykka_Oct21.mp3
											</div>
										</div>
									</React.Fragment>
								) : (
									''
								)}
							</TabPanel>
						</React.Fragment>
					) : (
						<React.Fragment>
							<TabPanel value={valuetab} index={0}>
								<Indextag />
								<div className="pageheight">
									{datafinal &&
									datafinal.format === 'Image' && (
										<Html
											name={name}
											setname={setname}
											fileUpload={fileUpload}
											setfileUpload={setfileUpload}
										/>
									)}
									{datafinal &&
									datafinal.format === 'Video' && (
										<Video
											name={name}
											setname={setname}
											skipable={skipable}
											setskipable={setskipable}
											universalId={universalId}
											setuniversalId={setuniversalId}
											fileUpload={fileUpload}
											urlList={urlList}
											videoDuration={videoDuration}
											setvideoDuration={setvideoDuration}
											seturlList={seturlList}
											setfileUpload={setfileUpload}
										/>
									)}
								</div>
								<Paper className="html_paper_footer">
									<Button
										style={{ margin: '0 15px' }}
										variant="contained"
										disabled={loading}
										onClick={onSubmit}
									>
										save
									</Button>
									<Button style={{ margin: '0 15px' }}>cancel</Button>
								</Paper>
							</TabPanel>
							<TabPanel value={valuetab} index={1}>
								<Indextag />
								<div className="pageheight">
									<div className="Accord_close">
										<Accordion expanded className="Accord">
											<AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
												<Typography>Creative summary</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<div className="html_body_p">
													<div className="d-flex">
														<div style={{ padding: '10px', fontSize: '14px' }}>
															<div className="dullText">Created</div>
															<div className="">
																{datafinal && DateReturn(datafinal.created)}
															</div>
														</div>
														<div style={{ padding: '10px', fontSize: '14px' }}>
															<div className="dullText">Modified</div>
															<div className="">
																{datafinal && DateReturn(datafinal.created)}
															</div>
														</div>
													</div>
												</div>
											</AccordionDetails>
										</Accordion>
										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
											>
												<Typography sx={{ width: '33%', flexShrink: 0 }}>
													Display & Video 360 review{' '}
													<HelpOutlineIcon
														onMouseEnter={(e) =>
															setpop1({
																status: true,
																id: e.currentTarget,
																text:
																	'A review of the creative to make sure it works as expected and includes at least 1 valid landing page. This usually takes less than 8 hours. At a minimum, this review has to be completed before your creative can start serving.'
															})}
														onMouseLeave={() =>
															setpop1({ status: false, id: null, text: null })}
														sx={{ fontSize: 16 }}
													/>
												</Typography>
												<CheckCircleIcon color="success" />
												<Typography sx={{ color: 'text.secondary', paddingLeft: '5px' }}>
													Servable
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<div className="table_con">
													<div className="d-flex table_col">
														<div className="table_left">
															Review Completed{' '}
															<HelpOutlineIcon
																onMouseEnter={(e) =>
																	setpop1({
																		status: true,
																		id: e.currentTarget,
																		text:
																			'The time when creative review was last completed.'
																	})}
																onMouseLeave={() =>
																	setpop1({ status: false, id: null, text: null })}
																sx={{ fontSize: 16 }}
															/>
														</div>
														<div className="table_right">10/20/21 2:58:09 AM GMT+5</div>
													</div>
													<div className="d-flex table_col">
														<div className="table_left">Feedback</div>
														<div className="table_right">Servable</div>
													</div>
													<div className="d-flex table_col">
														<div className="table_left">Restrictions</div>
														<div className="table_right">
															Detected ad technology providers: DoubleVerify Learn more<br />
															Creatives with unidentified ad technology providers may not
															serve in regions subject to privacy legislation.
															Unidentified ad technology providers: pixel.paytunes.in
															Learn more<br />
															This creative is restricted from serving in line items that
															target Russia.<br />
															This creative is restricted from serving in line items that
															target China.
														</div>
													</div>
													<div className="d-flex table_col">
														<div className="table_left">
															Detected destination URLs{' '}
															<HelpOutlineIcon
																onMouseEnter={(e) =>
																	setpop1({
																		status: true,
																		id: e.currentTarget,
																		text:
																			'The URL of the landing page Display & Video 360 was directed to after passing through any redirects and expanding all macros. This is the final URL that will display after a user clicks on your creative. Contact Display & Video 360 Support via the Help icon at the top of the page if you have questions.'
																	})}
																onMouseLeave={() =>
																	setpop1({ status: false, id: null, text: null })}
																sx={{ fontSize: 16 }}
															/>
														</div>
														<div className="table_right">10/20/21 2:58:09 AM GMT+5</div>
													</div>
												</div>
											</AccordionDetails>
										</Accordion>
										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1bh-content"
												id="panel1bh-header"
											>
												<Typography sx={{ width: '33%', flexShrink: 0 }}>
													Exchange review{' '}
													<HelpOutlineIcon
														onMouseEnter={(e) =>
															setpop1({
																status: true,
																id: e.currentTarget,
																text:
																	"Creatives are only reviewed by exchanges when assigned to a line item that targets that exchange. If an exchange isn't targeted, the exchange status will always be Pending. Exchanges review creatives based on their own requirements and policies. Approval process by exchange"
															})}
														onMouseLeave={() =>
															setpop1({ status: false, id: null, text: null })}
														sx={{ fontSize: 16 }}
													/>
												</Typography>
												<CheckCircleIcon color="success" />
												<Typography sx={{ color: 'text.secondary', paddingLeft: '5px' }}>
													Approved by 1 of 2 exchanges
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<div className="">
													<div className="table_row table_head d-flex">
														<div className="block2">Exchange</div>
														<div className="block1">Status</div>
														<div className="block1">SSL</div>
														<div className="block4">Feedback</div>
														<div className="block2">Last sync time</div>
													</div>
													<div className="table_row d-flex">
														<div className="block2">AppNexus (Xandr)</div>
														<div className="block1" />
														<div className="block1" />
														<div className="block4" />
														<div className="block2">N/A</div>
													</div>
													<div className="table_row d-flex">
														<div className="block2">Google Ad Manager 385923530</div>
														<div className="block1" />
														<div className="block1" />
														<div className="block4" />
														<div className="block2">N/A</div>
													</div>
													<div className="table_row table_head" />
												</div>
											</AccordionDetails>
										</Accordion>
										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
											>
												<Typography sx={{ width: '33%', flexShrink: 0 }}>Line items</Typography>
												<Typography sx={{ color: 'text.secondary', paddingLeft: '5px' }}>
													No associated line items
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<div className="">
													<div className="table_row table_head d-flex">
														<div className="block4">Line Item</div>
														<div className="block6">ID</div>
													</div>
													<div className="table_row d-flex center">
														No associated line items.
													</div>
												</div>
											</AccordionDetails>
										</Accordion>
										<Accordion>
											<AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
												<Typography sx={{ width: '33%', flexShrink: 0 }}>
													Line item eligibility
													<HelpOutlineIcon
														onMouseEnter={(e) =>
															setpop1({
																status: true,
																id: e.currentTarget,
																text:
																	'The line item type, features, inventory, or targeting that this creative is eligible to serve on. Eligibility is determined based on targeting, inventory requirements, and policy restrictions.'
															})}
														onMouseLeave={() =>
															setpop1({ status: false, id: null, text: null })}
														sx={{ fontSize: 16 }}
													/>
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<div className="">
													<div className="d-flex table_row table_head">
														<div className="block2">Feature</div>
														<div className="block1">Eligible</div>
														<div className="block7">Feedback</div>
													</div>
													<div className="d-flex table_row">
														<div className="block2">
															Outcome based buying{' '}
															<HelpOutlineIcon
																onMouseEnter={(e) =>
																	setpop1({
																		status: true,
																		id: e.currentTarget,
																		text: (
																			<div>
																				Insertion orders that use outcome based
																				buying don’t bill based on impressions.
																				Because of this, some creative types
																				aren’t supported.<br /> Outcome based
																				buying limitations
																			</div>
																		)
																	})}
																onMouseLeave={() =>
																	setpop1({ status: false, id: null, text: null })}
																sx={{ fontSize: 16 }}
															/>
														</div>
														<div className="block1">Yes</div>
														<div className="block7" />
													</div>
													<div className="d-flex table_row">
														<div className="block2">
															Gmail{' '}
															<HelpOutlineIcon
																onMouseEnter={(e) =>
																	setpop1({
																		status: true,
																		id: e.currentTarget,
																		text: (
																			<div>
																				You can only assign native site
																				creatives to Gmail line items.
																				Impression tracking URLs and JavaScript
																				tracking URLs aren’t supported. Use
																				Campaign Manager 360 tracking ads
																				instead.
																				<br />Creatives must meet Gmail ad
																				requirements.
																			</div>
																		)
																	})}
																onMouseLeave={() =>
																	setpop1({ status: false, id: null, text: null })}
																sx={{ fontSize: 16 }}
															/>
														</div>
														<div className="block1">No</div>
														<div className="block7">Format not supported</div>
													</div>
												</div>
											</AccordionDetails>
										</Accordion>
										<Button className="final_butt">resubmit for approval</Button>
									</div>
								</div>
								<Paper className="html_paper_footer">
									<Button
										style={{ margin: '0 15px' }}
										variant="contained"
										disabled={loading}
										onClick={onSubmit}
									>
										save
									</Button>
									<Button style={{ margin: '0 15px' }}>cancel</Button>
								</Paper>
							</TabPanel>
							<TabPanel value={valuetab} index={2}>
								<div className="det_filter">
									<FilterListIcon />
									<StyledInputElement aria-label="Demo input" placeholder="Add a filter" />
								</div>
								<div className="d-flex table_head table_row">
									<div className="block0">
										{expandmanage && expandmanage.length ? (
											<ExpandLess onClick={() => setexpandmanage([])} />
										) : (
											<ExpandMore onClick={() => setexpandmanage([ 0 ])} />
										)}
									</div>
									<div className="block2">Date</div>
									<div className="block3">User</div>
									<div className="block5">Change</div>
								</div>
								<div className="d-flex bg-white table_row">
									<div className="block0">
										{expandmanage && expandmanage.length && expandmanage.includes(0) ? (
											<ExpandLess onClick={() => handleChangeExpand(0)} />
										) : (
											<ExpandMore onClick={() => handleChangeExpand(0)} />
										)}
									</div>
									<div className="block2">Oct 24, 2021, 12:22:17 PM</div>
									<div className="block3">tiwarigaurav1@gmail.com</div>
									<div className="block5">2 changes made.</div>
								</div>
								{expandmanage && expandmanage.length && expandmanage.includes(0) ? (
									<React.Fragment>
										<div className="d-flex bg-white table_row">
											<div className="block0" />
											<div className="block2" />
											<div className="block3" />
											<div className="block5">
												Video Info - Ad Duration Millis was changed from 20000 to 20592
											</div>
										</div>
										<div className="d-flex bg-white table_row">
											<div className="block0" />
											<div className="block2" />
											<div className="block3" />
											<div className="block5">
												Asset Associations - Asset - Scs Content - Serving Path was changed from
												/video/-4768699599435725553/OPINykka_Oct21.mp3 to
												/-4768699599435725553/OPINykka_Oct21.mp3
											</div>
										</div>
									</React.Fragment>
								) : (
									''
								)}
							</TabPanel>
						</React.Fragment>
					)}
				</div>
			)}
		</div>
	);
}

export default DetailedPage;

// const handleChangeExpand = (panel) => (event, newExpanded) => {
// 	// console.log(expandmanage);
// 	// setexpandmanage((prev) => (newExpanded ? prev.push(panel) : prev.filter((x) => x !== panel)));
// 	var data = [];
// 	expandmanage &&
// 		expandmanage.length &&
// 		expandmanage.map((x) => {
// 			if (x !== panel) {
// 				data.push(x);
// 			}
// 		});
// 	if (newExpanded) {
// 		data.push(panel);
// 	}
// 	// console.log(data, newExpanded);
// 	setexpandmanage(data);
// };
