import React, { useEffect, useState } from 'react'
import { Paper, Card, makeStyles, CardContent, MenuItem, IconButton, Menu, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Alert } from '@material-ui/lab'
import styles from '../css/advertiser.module.css'
// import advertiser from '../../../models/advertiser';



const useStyles = makeStyles({
  table: {
    minWidth: 400,
    height: 200,
    // overflow: 'auto'
  },
});


function Advertiser() {
  const classes = useStyles()
  const [rows, setAdvertisers] = React.useState([])
  const [users, setUsers] = useState([])
  const [menu, setmenu] = useState({})
  const [type, settype] = useState('')
  const [sucmsg, setsucmsg] = useState('')
  const [errmsg, seterrmsg] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const history = useHistory()

  useEffect(() => {
    fetch('/user/get_users', {  //http://127.0.0.1:5000
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.error) {
          return console.log(data.error)
        }
        setUsers(data.users)

      })
  }, [])
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
        }
      }).catch(er => console.log(er))
  }, [])
  const ITEM_HEIGHT = 48;

  const open = Boolean(anchorEl);
  // const [value,setvalue]=useState('')
  const handleClick = (row, event) => {
    console.log('hhhhh', row)
    setmenu(row)
    if (row.category) {
      settype('Adv')
    } else {
      settype('User')
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option, _id) => {
    console.log('i am in ', type, _id, option)

    if (type === "Adv") {
      if (option === "DELETE") {
        fetch('/advertiser/delete_advertiser', {  //http://127.0.0.1:5000
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            _id
          })
        }).then(res => res.json()).then(data => {
          if (data.error) {
            console.log(data.error)
            return console.log(data.error)
          }

          const updated = rows.filter(row => row._id !== _id)
          setAdvertisers(updated)
          setsucmsg('Successfuly Deleted!')

        })
      } else if(option==='UPDATE'){
        history.push(`/advertisers/advertiser/update/${_id}`)
      }else{
        setAnchorEl(null);
      }


      setAnchorEl(null);
    } else if (type === "User") {
      if (option === 'DELETE') {
        fetch('/user/delete_user', {  //http://127.0.0.1:5000
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            _id
          })
        }).then(res => res.json()).then(data => {
          if (data.error) {
            return console.log(data.error)
          }
          const updated = users.filter(user => user._id !== _id)

          setUsers(updated)
          setsucmsg('Successfuly Deleted!')
        })
      } else if(option==='UPDATE'){
        console.log('iam')
        history.push(`/advertisers/user/update/${_id}`)
      }else
      setAnchorEl(null);
    } else {
      setAnchorEl(null);
    }


    setAnchorEl(null);
  };


  return (
    <div>
      <Paper id="rcorners2" className='dashboard' elevation={3}>
      {sucmsg ? <Alert>{sucmsg}</Alert> : ''}
        <h1><span class={styles.heading} >Advertisers</span></h1>
        
        <Grid container spacing="4" style={{ padding: "5%" }}>
          <Grid item xs={6}>
            <Card  >
              <CardContent>
                <h3 >Advertisers</h3>
                <p >Advertisers are groupings of Campaigns and Creatives.</p>
                <Button id="rcorners2" color="primary" size="large" variant="contained" onClick={() => history.push('/advertiser/new')} >Create Advertiser </Button>
        `<br /><br /><br /><br />
                <TableContainer component={Paper} style={{ maxHeight: '40%' }}>
                  <Table className={classes.table} aria-label="simple table">


                    <TableBody>
                      {rows.map((row) => (

                        <TableRow key={row._id}>
                          <TableCell component="th" scope="row" style={{ fontSize: '15px', 'font-weight': 'bold', 'font-family': 'sans-serif' }}>
                            {row.name}
                          </TableCell>
                          <TableCell component="th" scope="row" style={{ fontSize: '15px' }}>{row.category}</TableCell>
                          <TableCell >
                            <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={(e) => handleClick(row, e)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={open}
                              onClose={() => handleClose(null, '', null)}
                              PaperProps={{
                                style: {
                                  maxHeight: ITEM_HEIGHT * 4.5,
                                  width: '20ch',
                                },
                              }
                              }
                            >
                              <MenuItem key='Update' onClick={() => handleClose("UPDATE", menu._id)}>
                                Update
          </MenuItem>
                              <MenuItem key="Delete" onClick={() => handleClose("DELETE", menu._id)}>
                                Delete
          </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>

                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <h3>Users</h3>
                <p>Users control access for campaigns, creatives and reporting.</p>
                <Button id="rcorners2" color="primary" size="large" variant="contained" onClick={() => history.push('/advertisers/new/user')}>Create User </Button>
                <br /><br /><br /><br />
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">


                    <TableBody>
                      {users.map((user) => (

                        <TableRow key={user._id}>
                          <TableCell component="th" scope="row" style={{ fontSize: '15px', 'font-weight': 'bold', 'font-family': 'sans-serif' }}>
                            {user.firstname.concat(' ' + user.lastname)}
                          </TableCell>
                          <TableCell component="th" scope="row" style={{ fontSize: '15px' }}>{user.email}</TableCell>
                          <TableCell >
                            <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={(e) => handleClick(user, e)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={open}
                              onClose={() => handleClose(null, '', null)}
                              PaperProps={{
                                style: {
                                  maxHeight: ITEM_HEIGHT * 4.5,
                                  width: '20ch',
                                },
                              }
                              }
                            >

                              <MenuItem key='Update' onClick={() => handleClose('UPDATE', menu._id)}>
                                Update
          </MenuItem>
                              <MenuItem key='Delete' onClick={() => handleClose("DELETE", menu._id)}>
                                Delete
          </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>

                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

              </CardContent>
            </Card>
          </Grid>
        </Grid>




      </Paper>
    </div>

  )
}

export default Advertiser