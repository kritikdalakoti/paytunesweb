import React from 'react';
import { useHistory ,Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
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

const useStyles = makeStyles({
list: {
    width: 240,
},
fullList: {
    width: 'auto',
},
});

export default function TemporaryDrawer() {
    const history = useHistory()
    const classes = useStyles();
    const [open, setopen] = React.useState(false);
    const {state} = React.useContext(UserContext)
    return (
        <div >
            {/* <IconButton style={{color:"red"}} onClick={()=>setopen(true)} /> */}
            
            <div onClick={()=>setopen(true)}>  <i className='material-icons' style={{fontSize:'60px',cursor:'pointer',color:"grey", paddingLeft:"70%"}}><ViewHeadlineIcon/></i></div>
            <Tooltip title="Advertisers" placement="right"><div onClick={()=>history.push('/advertisers')}>  <i className='material-icons' style={{fontSize:'60px',cursor:'pointer',color:"grey", paddingLeft:"70%"}}><PersonAddSharpIcon/> </i></div></Tooltip>
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
        </div>
    );
}
