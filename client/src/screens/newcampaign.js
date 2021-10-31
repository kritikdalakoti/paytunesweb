import React, { useState, useEffect, useReducer, useContext } from 'react'
import { Paper, Divider, Grid, Select, MenuItem, Modal } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useLocation } from 'react-router-dom'
import styles from '../css/newcampaign.module.css'
import { BudgetContext } from '../App'
import SettingsIcon from '@material-ui/icons/Settings'
import EditIcon from '@material-ui/icons/Edit'
import Demographic from './demographic'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    padding: '3%',
    //   margin:'3%',
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
  },
}));



export default function NewCampaign() {

  const classes = useStyles()
  const history = useHistory()
  const { state1, dispatch1 } = useContext(BudgetContext)
  const [campaignName, setcampaignname] = useState('')
  const [active, setActive] = useState('Active')
  const [goal, setGoal] = useState('Choose goal')
  const [cond, setcond] = useState(false)
  const [kpi, setkpi] = useState('Choose KPI')
  const [kpigoal, setkpigoal] = useState('')
  const [creativecheck, setcreativecheck] = useState({ Audio: false, Video: false, Display: false })
  const [dates, setdates] = useState({ start: '', end: '' })
  const [freq, setfreq] = useState({ freq: 0, freqtime: 'Lifetime of this Campaign' })
  const [show, setshow] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [gender,setgender]=useState({male:false,female:true})
  const [age,setage]=useState([])
  const [parent,setparent]=useState({parent:false,nonparent:false})
  const [income,setincome]=useState([])
  const [checks,setchecks]=useState({age:true,income:true})
  


  const handleOpen = () => {
    setOpen(true);
    setshow(true);

  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange2 = (e) => {
    setActive(e.target.value);
  }
  const handleChange3 = (e) => {
    setGoal(e.target.value);
  }
  const handleChange4 = (e) => {
    setkpi(e.target.value);
    setcond(true)
  }
  const handleChange5 = (e) => {
    setfreq({ freq: freq.freq, freqtime: e.target.value })
  }


  return (

    <div>
      <Paper className={styles.dashboard} elevation={3}>
        <div className={styles.rowdis} >
          <div className={styles.campname} >
            <span className={styles.svdf} > Campaign Name </span>
          </div>
          <div>
            <input placeholder="Enter name" className="input" type="text" size="30"
              value={campaignName}
              onChange={(e) => setcampaignname(e.target.value)}
            />
          </div>
          <div className={styles.dot} >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={active}
              label={active}
              style={{ width: '100%' }}
              onChange={handleChange2}
            >
              <MenuItem value='Active'>Active</MenuItem>
              <MenuItem value='Paused'>Paused</MenuItem>
            </Select>
          </div>

        </div>
      </Paper>

      <Paper className={styles.dashboard} elevation={3} >

        <div className={styles.coldis} >
          <div className={styles.rowdis} >
            <div className={styles.campgoal} >
              <span className={styles.svdf} > Overall Campaign Goal </span>
            </div>
            <div className={styles.dot} >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={goal}
                label={goal}
                style={{ width: '100%' }}
                onChange={handleChange3}
              >
                <MenuItem value='Choose goal'>Choose goal</MenuItem>
                <MenuItem value='Raise Awareness of my Brand or Product'>Raise Awareness of my Brand or Product</MenuItem>
                <MenuItem value='Drive online action or visits'>Drive online action or visits</MenuItem>
                <MenuItem value='Drive offline or instore sales'>Drive offline or instore sales</MenuItem>
                <MenuItem value='Drive app installs or engagements'>Drive app installs or engagements</MenuItem>
              </Select>
            </div>
          </div>
          <hr className={styles.divider} />
          <div className={styles.rowdis} >
            <div className={styles.kpi} >
              <span className={styles.svdf} > KPI </span>
            </div>
            <div className={styles.dot} >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={kpi}
                label={kpi}
                style={{ width: '100%' }}
                onChange={handleChange4}
              >
                <MenuItem value='Choose KPI'>Choose KPI</MenuItem>
                <MenuItem value='CPV'>CPV</MenuItem>
                <MenuItem value='CPM'>CPM</MenuItem>
                <MenuItem value='Viewable %'>Viewable %</MenuItem>
                <MenuItem value='CPIAVC'>CPIAVC</MenuItem>
              </Select>
            </div>
            {cond ?
              <div className={styles.koi} >
                <input placeholder="Kpi Goal in Rs" className={styles.inpkpi} type="number"
                  value={kpigoal}
                  onChange={(e) => setkpigoal(e.target.value)}
                />
              </div>
              : <></>
            }
          </div>
          <hr className={styles.divider} />
          <div className={styles.rowdis} >
            <div className={styles.creat} >
              <span className={styles.svdf} > Creative type you expect to use </span>
            </div>
            <div className={styles.check} >
              <input type="checkbox" onClick={() => setcreativecheck({ Audio: !creativecheck.Audio, Video: creativecheck.Video, Display: creativecheck.Display })}
                checked={creativecheck.Audio}
              />
            </div>
            <div className={styles.text} >
              <span>Audio</span>
            </div>
            <div className={styles.check} >
              <input type="checkbox" onClick={() => setcreativecheck({ Audio: creativecheck.Audio, Video: !creativecheck.Video, Display: creativecheck.Display })}
                checked={creativecheck.Video}
              />
            </div>
            <div className={styles.text} >
              <span>Video</span>
            </div>
            <div className={styles.check} >
              <input type="checkbox" onClick={() => setcreativecheck({ Audio: creativecheck.Audio, Video: creativecheck.Video, Display: !creativecheck.Display })}
                checked={creativecheck.Display}
              />
            </div>
            <div className={styles.text} >
              <span>Display</span>
            </div>


          </div>
          <hr className={styles.divider} />

          <div className={styles.rowdis} >
            <div className={styles.plan} >
              <span className={styles.svdf} > Planned dates </span>
            </div>

            <div className={styles.coldis1}  >
              <div >
                <span style={{ float: 'left' }} >Start Date</span>
              </div>
              <div>
                <input type="date" onChange={(e) => setdates({ start: e.target.value, end: dates.end })}
                  value={dates.start}
                />
              </div>
            </div>

            <div className={styles.coldis1}  >
              <div >
                <span style={{ float: 'left' }} >End Date</span>
              </div>
              <div>
                <input type="date" onChange={(e) => setdates({ start: dates.start, end: e.target.value })}
                  value={dates.end}
                />
              </div>
            </div>


          </div>


        </div>

      </Paper>

      <Paper className={styles.dashboard} elevation={3}>
        <div className={styles.rowdis} >
          <div className={styles.campname} >
            <span className={styles.svdf} > Frequency Cap </span>
          </div>
          <div className={styles.coldis1}  >
            <div className={styles.rowdis}  >
              <input type="radio" name="freq" id="nofreq" />
              <label for="nofreq"> No Limit </label>
            </div>
            <div className={styles.rowdis} style={{ marginTop: '10%' }} >
              <input type="radio" name="freq" id="freq" />
              <label for="freq" > Limit Frequency to </label>
              <label style={{ marginRight: '1%' }} > <input type="number" className={styles.inpkpi} style={{ fontSize: '8pt' }} onChange={(e) => setfreq({ freq: e.target.value, freqtime: freq.freqtime })} value={freq.freq} /> </label>
              <label  > exposures per </label>
              <label  >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={freq.freqtime}
                  label={freq.freqtime}
                  style={{ width: '100%', marginLeft: '15%' }}
                  onChange={handleChange5}
                >
                  <MenuItem value='Lifetime of this Campaign'>Lifetime of this Campaign</MenuItem>
                  <MenuItem value='Months'>Months</MenuItem>
                  <MenuItem value='Weeks'>Weeks</MenuItem>
                  <MenuItem value='Days'>Days</MenuItem>
                  <MenuItem value='Hours'>Hours</MenuItem>
                  <MenuItem value='Minutes'>Minutes</MenuItem>
                </Select>
              </label>
            </div>
          </div>


        </div>
      </Paper>
      <div style={{ marginBottom: '7%' }} >
        <div className={styles.target} >Targeting</div>
        <div className={styles.shgt} >
          <SettingsIcon />
          <div style={{ marginLeft: '5px', marginTop: '1%' }} >New insertion orders and line items in this campaign will inherit these settings.</div>
        </div>

      </div>

      <Paper className={styles.dashboard} elevation={3}>
        <div className={styles.rowdis} >
          <div className={styles.campname} >
            <span className={styles.svdf} > Demographics </span>
          </div>
          <div style={{ paddingTop: '1%' }} >
            <span style={{ color: '#9e9e9e' }} >All genders, ages, parental statuses and household incomes</span>
          </div>
          <div style={{ marginLeft: '20%' }} >
            <EditIcon style={{ cursor: 'pointer', color: 'grey' }} onClick={handleOpen} fontSize="large" />
          </div>

        </div>
        <hr className={styles.divider} />
        <div className={styles.rowdis} >
          <div className={styles.campgeog}  >
            <span className={styles.svdf} > Geography </span>
          </div>
          <div style={{ paddingTop: '1%', marginLeft: '3%' }} >
            <span style={{ color: '#9e9e9e' }} >All locations</span>
          </div>
          <div style={{ marginLeft: '49%' }} >
            <EditIcon style={{ cursor: 'pointer', color: 'grey' }} fontSize="large" />
          </div>

        </div>

        <hr className={styles.divider} />

        <div className={styles.rowdis} >
          <div className={styles.campgeog} >
            <span className={styles.svdf} > Language </span>
          </div>
          <div style={{ paddingTop: '1%', marginLeft: '3%' }} >
            <span style={{ color: '#9e9e9e' }} >All languages</span>
          </div>
          <div style={{ marginLeft: '48%' }} >
            <EditIcon style={{ cursor: 'pointer', color: 'grey' }} fontSize="large" />
          </div>

        </div>

        <hr className={styles.divider} />

        <div className={styles.rowdis} >
          <div className={styles.campname} >
            <span className={styles.svdf} > Brand Safety </span>
          </div>
          <div style={{ paddingTop: '1%' }} >
            <span style={{ color: '#9e9e9e' }} >No Restrictions </span>
          </div>
          <div style={{ marginLeft: '47%' }} >
            <EditIcon style={{ cursor: 'pointer', color: 'grey' }} fontSize="large" />
          </div>

        </div>

      </Paper>

      {show ?
        <div  >
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Demographic state={{gender,setgender,age,setage,parent,setparent,income,setincome,checks,setchecks}} />
          </Modal>
        </div>
        :
        <></>
      }


    </div>


  )
}
