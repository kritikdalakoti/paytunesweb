import React,{useContext, useState} from 'react'
import { useHistory } from 'react-router-dom'
import {UserContext} from '../App'
import TemporaryDrawer from './navbar_drawer'
import { Paper,TextField,Button,Link } from '@material-ui/core'


const Navbar=()=>{

    const history = useHistory()
    const [show, setshow] = useState(false)
    let {state,dispatch} = useContext(UserContext)
    state=true

    return (
        <div >
            
            {state ? <div className='navbar__dasboard' >
                    <div style={{fontSize:'20px',paddingLeft:'5px',cursor:'pointer',color:"black"}}><TemporaryDrawer/></div>
                </div> : ''}
            
            
        </div>
    )
}

export default Navbar


