import React ,{useEffect, useState} from 'react'
import {Paper,FormControl,TextField,Select,MenuItem,Button,Snackbar,makeStyles} from '@material-ui/core'
import {useHistory,useParams } from 'react-router-dom'
import {Alert} from '@material-ui/lab'
import styles from '../css/createuser.module.css'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '120%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));



export default function Update_User(){
  const history=useHistory()
  const classes=useStyles()
    let [role,setRole]=useState('')
    let [advertiser,setadvertiser]=useState('')
    let [advertise_data,setAdvertise_data]=useState([])
    const [firstname,setfirstname]=useState('')
    const [lastname,setlastname]=useState('')
    const [email,setemail]=useState('')
    const [success,setsuccess]=useState('')
    const [error,seterror]=useState('')
    const [open,setOpen]=useState(false)

    
  const {user}=useParams()
  
const Update_User=()=>{
    fetch('/user/update_user',{  //http://127.0.0.1:5000
    method:'PATCH',
    headers:{"Content-Type":"application/json","Authorization" :"Bearer "+localStorage.getItem("jwt")},
    body:JSON.stringify({
        role,
        advertiser,
        firstname,
        lastname,
        email,
        _id:user
      })
}).then(res=>res.json()).then(data=>{
    
    if(data.error){
        seterror(data.error)
        return console.log(data.error)
        
    }
    
    setsuccess(data.message)
    
})
}

  useEffect(()=>{
    fetch('/user/get_user',{  //http://127.0.0.1:5000
      method:'POST',
      headers:{"Content-Type":"application/json","Authorization" :"Bearer "+localStorage.getItem("jwt")},
      
      body:JSON.stringify({
        user
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        seterror(data.error)
        return console.log(data.error)
      }
      console.log(data)
      setRole(data.role)  
      setfirstname(data.firstname)
      setlastname(data.lastname)
      setadvertiser(data.advertiser)
      setemail(data.email)
      
    })
  },[])

  useEffect(()=>{
    fetch('/advertiser/get_advertisers',{  //http://127.0.0.1:5000
    method:'POST',
    headers:{"Content-Type":"application/json","Authorization" :"Bearer "+localStorage.getItem("jwt")},

}).then(res=>res.json()).then(data=>{
    
    if(data.error){
        return console.log(data.error)
    }
    
    setAdvertise_data(data)
    
})
  },[])

    const handleChange=(event)=>{
        role=setRole(event.target.value)
    }
    const handleChange2=(event)=>{
        advertiser=setadvertiser(event.target.value)
    }
    
    
    return(
      
      
        <Paper id="rcorners2"  className='dashboard' elevation={3}>
          <div className={classes.root}>
              {success ? (
					<Alert
						onClose={() => {
							setsuccess('');
						}}
						style={{ margin: '3%' }}
						severity="success"
					>
						{success}
					</Alert>
				) : (
					<React.Fragment />
				)}
				{error ? (
					<Alert
						onClose={() => {
							seterror('');
						}}
						style={{ margin: '3%' }}
						severity="error"
					>
						{error}
					</Alert>
				) : (
					''
				)}
        </div>
              <div class={styles.heading} > <h1>Update User</h1> </div>
              <form class={styles.form} onSubmit={e=>{
            e.preventDefault()
                Update_User()
              }}>
            <TextField
          required={true}
          id="outlined-required"
          style={{width:"150%"}}
          label="First Name"
          variant="outlined"
          autoComplete='off'
          value={firstname}
          onChange={(e)=>setfirstname(e.target.value)}
        /><br/><br/>
        <TextField   // set validation in these fields
          required
          id="outlined-required"
          label="Last Name"
          variant="outlined"
          style={{width:"150%"}}
          autoComplete='off'
          value={lastname}
          onChange={(e)=>setlastname(e.target.value)}
        />
        <br/><br/>
        <TextField
          required
          //id="outlined-required"
          label="Email"
          variant="outlined"
          style={{width:"150%"}}
          autoComplete='off'
          value={email}
          onChange={(e)=>setemail(e.target.value)}
        />
        <br/><br/>
        <div class={styles.sdd}>
        <label class={styles.svdf} >Role</label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Select Category"
          style={{width:'100%'}}
          onChange={handleChange}
        >
          <MenuItem value="Administrator">Administrator</MenuItem>
          <MenuItem value='Campaign Manager'>Campaign Manager</MenuItem>
          <MenuItem value='Trafficker'>Trafficker</MenuItem>
          <MenuItem value='Creative'>Creative</MenuItem>
          <MenuItem value='Reporting'>Reporting</MenuItem>
          </Select>
        </div>
        
          <br/><br/>
          <div class={styles.sdd}>
          <label class={styles.svdf} >Default Advertiser (Optional)</label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={advertiser}
          label="Select Category"
          style={{width:'100%'}}
          onChange={handleChange2}
        >
          
          {advertise_data.map((data)=>{
            return <MenuItem value={`${data.name}`}>{data.name}</MenuItem>  
          })}
            
          </Select>
          </div>
          
          
          <button  class={styles.button1}>Update User</button>
        </form>
        </Paper>
    )

}