import React from 'react'
import {Paper,Button} from '@material-ui/core'
import {useHistory,useLocation} from 'react-router-dom'
import styles from '../css/dashboard.module.css'
import { Alert } from '@material-ui/lab'

export default function Dashboard(){
    const location=useLocation()
    console.log(location)
    const history=useHistory()
   
    return (
        <div>
        <Paper  id="rcorners2"  className='dashboard' elevation={3}>

            
        <div class={styles.head}>
        <p class={styles.heading} >Create Campaign</p> 
        <Button style={{ height:'fit-content', 'margin-right':'5%' ,'marginTop':'1%'}} variant ="contained" color="primary" size="large" id="rcorners2" onClick={()=>history.push('/dashboard/new/campaign')} >Create Campaign</Button>
        </div> 
        </Paper>
        </div>
        
    )
}