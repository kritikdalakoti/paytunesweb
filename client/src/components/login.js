import React,{useContext, useState } from 'react'
import { Paper,TextField} from '@material-ui/core'
import {UserContext} from '../App'
import {useHistory} from 'react-router-dom'
import {Alert} from '@material-ui/lab'

import M from 'materialize-css'
import { orange } from '@material-ui/core/colors'

function Login(){

    let [email,setemail]=useState('')
    let [password,setpassword]=useState('')
    let [error,seterror]=useState('')
    let [success,setSuccess]=useState('')
    const {dispatch}=useContext(UserContext)
    let history=useHistory()
// usercontext
    function login(){

        
        fetch('https://paytunes-new.herokuapp.com/user/signin',{  //http://127.0.0.1:5000
            method:'Post',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email,password
            })
        }).then(res=>res.json()).
        then(data=>{
            debugger
            if(data.error){
                console.log(data.error)
                seterror(data.error)
                //M.toast({html:data.error, classes:'#ff5252 red accent-2'})
            }else{
                localStorage.setItem('jwt',data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                setSuccess('Signedin Successfuly!')
                //M.toast({html:"Signedin Successfully", classes:'#69f0ae green accent-2'})   
                history.push('/')
            }

        }).catch(e=>{
            debugger
            console.log(e.message)
            seterror(e.message)
            //M.toast({html:e, classes:'#ff5252 red accent-2'})
        })
    }

return (
    <div style={{backgroundColor:"orangered", 
    position: 'absolute',
    width: '100%',
    margin: 0 }}>
        <Paper id="rcorners2"  className='login' elevation={3}>
                <div>
                    {error?<Alert>{error}</Alert>:''}
                </div>
                <div>
                    {success?<Alert>{success}</Alert>:''}
                </div>
                <form className="login__box" onSubmit={e=>{
                    e.preventDefault()
                    login()
                }}>
                    <div className='login__title' >Log In</div>
                    <TextField placeholder='Email' margin="dense" required={true} onChange={(e)=>{setemail(e.target.value)}} /><br/>
                    <TextField type='password' margin="dense" required={true} placeholder='Password' onChange={(e)=>{setpassword(e.target.value)}} /><br/>
                    <button className="button">login</button>
                </form>
            </Paper>
    </div>
)

}

export default Login