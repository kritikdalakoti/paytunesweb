import React, { useState,useEffect,useContext } from 'react';
import { useHistory ,Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import  { Modal,MenuItem,Select } from '@material-ui/core';
import {Divider} from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {UserContext} from '../App'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import LiveHelpOutlinedIcon from '@material-ui/icons/LiveHelpOutlined';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import SpeakerPhoneSharpIcon from '@material-ui/icons/SpeakerPhoneSharp'
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import { BudgetContext } from '../App'

const useStyles = makeStyles((theme)=>({
list: {
    width: 240,
},
fullList: {
    width: 'auto',
},
paper: {
    // position: 'relative',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: '2% 2% 2% 6%'
}
}));

export default function TemporaryDrawer() {
    const history = useHistory()
    const classes = useStyles();
    const { state1, dispatch1 } = useContext(BudgetContext)
    const [advertisers,setAdvertisers]=useState([])
    const [open, setopen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const {state} = React.useContext(UserContext)
    const [adv,setadv]=useState({name:'Adv'})
    const [show,setShow]=useState(false);
    const handleClose = () => {
		setOpen1(false);
	};
    console.log('sss',adv)
    const handleChange=(event)=>{
        setadv(event.target.value)
        dispatch1({type:"ADVERTISER",payload:event.target.value})
        setOpen1(false)
      }
    const handleOpen = () => {
		setOpen1(true);
		setShow(true);
	};

    useEffect(() => {
        // console.log('effect')
        fetch('/advertiser/get_advertisers', { //http://127.0.0.1:5000 
          method: 'post'
        }).then(res => res.json())
          .then(data => {
            console.log(data)
            if (data && data.error) {
              return console.log(data.error)
            } else {
              setAdvertisers(data)
              console.log(advertisers);
            }
          }).catch(er => console.log(er))
      }, [])

    return (
        <div >
            {/* <IconButton style={{color:"red"}} onClick={()=>setopen(true)} /> */}
            
            <div onClick={()=>setopen(true)}>  <i className='material-icons' style={{fontSize:'60px',cursor:'pointer',color:"grey", paddingLeft:"70%"}}><ViewHeadlineIcon/></i></div>
            <Tooltip title="Advertisers" placement="right"><div onClick={()=>history.push('/advertisers')}>  <i className='material-icons' style={{fontSize:'60px',cursor:'pointer',color:"grey", paddingLeft:"70%"}}><PersonAddSharpIcon/> </i></div></Tooltip>
            <Tooltip title={`${adv.name}`} placement="right"><div onClick={()=>handleOpen()}>  <i className='material-icons' style={{fontSize:'25px',cursor:'pointer',color:"grey", paddingLeft:"70%"}}>{adv.name[0].toLocaleUpperCase()} </i></div></Tooltip>
            <Tooltip title="Campaigns" placement="right"><div onClick={()=>history.push('/dashboard')}><i className='material-icons' style={{fontSize:'60px',cursor:'pointer',color:"grey", paddingLeft:"70%"}}><SpeakerPhoneSharpIcon/></i></div></Tooltip>
            <Tooltip title="Creatives" placement="right"><div onClick={history.push()}><i className='material-icons' style={{fontSize:'60px',cursor:'pointer',color:"grey", paddingLeft:"70%"}}><GraphicEqIcon/></i></div></Tooltip>
            <Tooltip title="Reporting" placement="right"><div onClick={()=>setopen(true)}><i className='material-icons' style={{fontSize:'60px',cursor:'pointer',color:"grey", paddingLeft:"70%"}}><AssessmentOutlinedIcon/></i></div></Tooltip>
            <Tooltip title="Billing" placement="right"><div onClick={()=>setopen(true)}><i className='material-icons' style={{fontSize:'60px',cursor:'pointer',color:"grey", paddingLeft:"70%"}}><ReceiptOutlinedIcon/></i></div></Tooltip>
            <Tooltip title="Support" placement="right"><div onClick={()=>setopen(true)}><i className='material-icons' style={{fontSize:'60px',cursor:'pointer',color:"grey", paddingLeft:"70%"}}><LiveHelpOutlinedIcon/></i></div></Tooltip>
            <Tooltip title="Account" placement="right"><div onClick={()=>setopen(true)}><i className='material-icons' style={{fontSize:'60px',cursor:'pointer',color:"grey", paddingLeft:"70%"}}><AccountCircleIcon/></i></div></Tooltip>

            
            
            
            
            <Drawer anchor='left' open={open} onClose={()=>setopen(false)}>
                
                <div className={classes.list} role="presentation" onClick={()=>setopen(false)} onKeyDown={()=>setopen(false)}>
                    <ListItem className='dashmenu__item' onClick={()=>history.push('/advertisers')}>
                        <ListItemIcon><i className='material-icons'></i></ListItemIcon>
                        <PersonAddSharpIcon/>
                        <ListItemText>Advertisers</ListItemText>
                    </ListItem>
                    <hr />
                    <br/>
                    <br/>
                    <ListItem className='dashmenu__item' onClick={()=>handleOpen()}>
                        <ListItemIcon><i className='material-icons'></i></ListItemIcon>
                        <PersonAddSharpIcon/>
                        <ListItemText>{adv.name}</ListItemText>
                    </ListItem>
                    <hr />
                    <br/>
                    <br/>

                    <ListItem className='dashmenu__item' onClick={()=>history.push('/dashboard')}>
                        <ListItemIcon><i className='material-icons'></i></ListItemIcon>
                        <SpeakerPhoneSharpIcon/>
                        <ListItemText>Campaigns</ListItemText>
                    </ListItem>
                    <hr />
                    <ListItem className='dashmenu__item' onClick={()=>history.push('/manageBundles')}>
                        <ListItemIcon><i className='material-icons'></i></ListItemIcon>
                        <GraphicEqIcon/>
                        <ListItemText>Creatives</ListItemText>
                    </ListItem>
                    <hr />
                    
                    <ListItem className='dashmenu__item'>
                        <ListItemIcon><i className='material-icons'></i></ListItemIcon>
                        <AssessmentOutlinedIcon/>
                        <ListItemText>Reporting</ListItemText>
                    </ListItem>
                    <hr />
                    <br/>
                    <br/>
                    <ListItem className='dashmenu__item'>
                        <ListItemIcon><i className='material-icons'></i></ListItemIcon>
                        <ReceiptOutlinedIcon/>
                        <ListItemText>Billing </ListItemText>
                    </ListItem>
                    {/* {state && state.usertype === 'admin' && <> */}
                        <hr />
                        <ListItem className='dashmenu__item' >
                            <ListItemIcon><i className='material-icons'></i></ListItemIcon>
                            <LiveHelpOutlinedIcon/>
                            <ListItemText>Support </ListItemText>
                        </ListItem>
                    {/* </>} */}
                    {/* {state && state.usertype === 'admin' && <> */}
                        <hr />
                        <ListItem className='dashmenu__item' >
                            <ListItemIcon><i className='material-icons'></i></ListItemIcon>
                            <AccountCircleIcon/>
                            <ListItemText>Account</ListItemText>
                        </ListItem>
                    {/* </>} */}
                </div>
            </Drawer>
            {show ? (
					<div  >
						<Modal
							open={open1}
							onClose={handleClose}
							aria-labelledby="simple-modal-title"
							aria-describedby="simple-modal-description"
                            style={{width:'800px', margin:'15% 15% 15% 25%'}}
						>
							<div style={{ maxHeight: '120vh' }} className={classes.paper}>
								<h4>Choose Advertiser</h4>
								<Select 
                                 labelId="demo-simple-select-label"
                                 id="demo-simple-select"
                                 value={adv}
                                 style={{width:'100%'}}
                                 // label="Select Category"
                                 onChange={handleChange}
                                >
                                    {advertisers.map(adv=>
                                        <MenuItem value={adv} >{adv.name}</MenuItem>
                                    )}
                                    
                                </Select>
							</div>
						</Modal>

					</div>
				) : (
					<React.Fragment />
				)}
        </div>
    );
}
