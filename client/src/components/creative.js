import {
	Paper,
	Button,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Collapse,
	Menu,
	MenuItem,
	CircularProgress
} from '@mui/material';
import React, { useEffect } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import RefreshIcon from '@mui/icons-material/Refresh';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AppsIcon from '@mui/icons-material/Apps';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/system';
import data from '../data/home_tabledata.json';
import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import { DataGrid } from '@mui/x-data-grid';
import { useHistory } from 'react-router';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../App.css';
// console.log(data.data);
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

const ITEM_HEIGHT = 48;

const options = [ 'Pause', 'Archive', 'Edit name', 'Duplicate' ];

function Creative() {
	const history = useHistory();
	const [ arrowState, setarrowState ] = React.useState('up');
	const [ creatives, setcreatives ] = React.useState([]);
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const [ loading, setloading ] = React.useState(true);
	const [ listState, setlistState ] = React.useState(true);
	const [ openColab, setOpenColab ] = React.useState(true);
	useEffect(() => {
		console.log('started');
		getCreatives();
	}, []);
	const getCreatives = () => {
		setloading(true);
		axios
			.get('http://localhost:5000/creative/get_creatives', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('jwt')
				}
			})
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					setcreatives(response.data);
					setloading(false);
				}
			})
			.catch((err) => {
				setloading(false);
				alert(err);
				console.log(err);
			});
	};
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClickColab = () => {
		setOpenColab(!openColab);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const [ anchorElMenu, setAnchorElMenu ] = React.useState(null);
	const openmenu = Boolean(anchorElMenu);
	function handleClickMenu(event) {
		console.log(event);
		setAnchorElMenu(event);
	}
	const handleCloseMenu = () => {
		setAnchorElMenu(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	console.log(loading);
	return (
		<div className="Home">
			{!loading ? (
				<Paper className="home_main_paper">
					<div className="home_head">
						<p>Creatives</p>
						<IconButton>
							<SmsFailedIcon />
						</IconButton>
					</div>
					<div className="home_head_boot">
						<div>
							<Button color="success" variant="contained" onClick={handleClick}>
								NEW
							</Button>
							<Popover
								id={id}
								open={open}
								anchorEl={anchorEl}
								onClose={handleClose}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left'
								}}
							>
								{/* <Typography sx={{ p: 2 }}>Upload</Typography> */}
								<List>
									<ListItemButton style={{ width: '200px' }} onClick={handleClickColab}>
										<ListItemText primary="Upload" />
										{openColab ? <ExpandLess /> : <ExpandMore />}
									</ListItemButton>
									<Collapse in={openColab} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											<ListItemButton sx={{ pl: 4 }}>
												<Link
													to="/creative/html5image"
													className="text-decoration-none text-dark"
												>
													<ListItemText primary="HTML5 or image" />
												</Link>
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }}>
												<Link
													to="/creative/videofile"
													className="text-decoration-none text-dark"
												>
													<ListItemText primary="Video file" />
												</Link>
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }}>
												<Link
													to="/creative/audiofile"
													className="text-decoration-none text-dark"
												>
													<ListItemText primary="Audio file" />
												</Link>
											</ListItemButton>
										</List>
									</Collapse>
								</List>
							</Popover>
						</div>
						<div className="home_head_boot_second">
							{listState && <p>sort by:</p>}
							{listState && (
								<select className="form-select" aria-label="Default select example">
									<option value="name">Name</option>
									<option value="id">ID</option>
									<option value="dimensions">Dimensions</option>
									<option value="duration">Duration</option>
									<option selected value="created">
										Created
									</option>
								</select>
							)}
							{listState && (
								<IconButton>
									{arrowState === 'up' ? (
										<ArrowUpwardIcon onClick={() => setarrowState('down')} />
									) : (
										<ArrowDownwardIcon onClick={() => setarrowState('up')} />
									)}
								</IconButton>
							)}
							<IconButton>
								<RefreshIcon onClick={() => getCreatives()} />
							</IconButton>
							<IconButton>
								{listState ? (
									<FormatListBulletedIcon onClick={() => setlistState(!listState)} />
								) : (
									<AppsIcon onClick={() => setlistState(!listState)} />
								)}
							</IconButton>
						</div>
					</div>
					<div className="home_head_filter">
						<FilterListIcon />
						<StyledInputElement aria-label="Demo input" placeholder="Add a filter" />
					</div>
					{listState ? (
						<div className="home_body_cards">
							{creatives.map((x, index) => {
								return (
									<Paper className="home_body_card shadow p-3 mb-5 bg-body rounded">
										<div className="hoverDisplay_card w-100 h-75">
											<div className="icontickmark">
												<CheckCircleOutlineIcon />
											</div>
										</div>
										<img className="home_image" src="" alt="File found" />
										<div>
											<Link
												to={`/creative/detailed/${x._id}`}
												// className="text-decoration-none text"
												style={{ color: 'blue', cursor: 'pointer', zIndex: '3' }}
											>
												{x.name}
											</Link>
											<div>
												{x.format}~{x.format !== 'Image' ? x.duration : x.dimensions}
											</div>
											<div className="icon_onhover_card">
												<VisibilityIcon className="icon_underclass" />
												<MoreVertIcon
													className="icon_underclass"
													id="basic-button"
													aria-controls="basic-menu"
													aria-haspopup="true"
													aria-expanded={openmenu ? 'true' : undefined}
													onClick={(e) => {
														console.log(e.currentTarget);
														handleClickMenu(e.currentTarget);
													}}
												/>
												<Menu
													id="basic-menu"
													anchorEl={anchorElMenu}
													open={openmenu}
													onClose={handleCloseMenu}
													MenuListProps={{
														'aria-labelledby': 'basic-button'
													}}
												>
													<MenuItem onClick={handleCloseMenu}>Pause</MenuItem>
													<MenuItem onClick={handleCloseMenu}>Archive</MenuItem>
													<MenuItem onClick={handleCloseMenu}>Edit name</MenuItem>
													<MenuItem onClick={handleCloseMenu}>Duplicate</MenuItem>
												</Menu>
											</div>
										</div>
									</Paper>
								);
							})}
						</div>
					) : (
						<div className="home_body_table">
							<table class="table table-striped table-hover">
								<thead>
									<tr>
										<td>Name</td>
										<td>ID</td>
										<td>Status</td>
										<td>Type</td>
										<td>Format</td>
										<td>DV360 status</td>
										<td>Exchange status</td>
										<td>Companions</td>
										<td>Dimensions</td>
										<td>Duration</td>
										<td>Source</td>
										<td>Created</td>
										<td>Tag wrapping</td>
									</tr>
								</thead>
								<tbody>
									{creatives.map((x) => {
										return (
											<tr>
												<td>
													<Link to={`/creative/detailed/${x._id}`}>{x.name}</Link>
												</td>
												<td>{x._id}</td>
												<td>{x.status}</td>
												<td>{x.type}</td>
												<td>{x.format}</td>
												<td>{x.dv360status}</td>
												<td>{x.exchangestatus}</td>
												<td>{x.companions}</td>
												<td>{x.dimensions}</td>
												<td>{x.duration}</td>
												<td>{x.source}</td>
												<td>{x.created}</td>
												<td>{x.tagwrapping}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					)}
				</Paper>
			) : (
				<CircularProgress />
			)}
		</div>
	);
}

export default Creative;
