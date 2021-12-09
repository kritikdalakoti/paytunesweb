import React, { useState, useEffect, useContext } from 'react'
import { Paper, Divider, Grid, Select, MenuItem, Modal } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useLocation } from 'react-router-dom'
import styles from '../css/newcampaign.module.css'
import * as fun from '../api/campaign'
import SettingsIcon from '@material-ui/icons/Settings'
import EditIcon from '@material-ui/icons/Edit'
import Demographic from './demographic'
import Language from './language'
import Geography from './geography'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import mainaction from '../redux/actions/main'
import '../../src/app1.css'

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
  const dispatch = useDispatch()
  const [campaignName, setcampaignname] = useState('')
  const [active, setActive] = useState('Active')
  const [goal, setGoal] = useState('Choose goal')
  const [cond, setcond] = useState(false)
  const [landingurl,setlandingurl]=useState("")
  const [kpi, setkpi] = useState({type:"Choose KPI",goal:""})
  const [creativecheck, setcreativecheck] = useState({ Audio: false, Video: false, Display: false })
  const [dates, setdates] = useState({ start: '', end: '' })
  const [freq, setfreq] = useState({ freq: 0, freqtime: 'Lifetime of this Campaign' })
  const [show, setshow] = useState({ demo: false, lang: false, geo: false })
  const [open, setOpen] = React.useState({ demo: false, lang: false, geo: false });
  const geography = useSelector((state) => state.main.geography)
  const languages = useSelector((state) => state.main.language)
  const demography = useSelector((state) => state.main.demographic)
  console.log(geography)

  const submitCampaign=async ()=>{
    const formdata=new FormData()
    formdata.append('campaignname',campaignName)
    formdata.append('active',active)
    formdata.append('goal',goal)
    formdata.append('kpitype',kpi.type)
    formdata.append('kpigoal',kpi.goal)
    formdata.append('audio',creativecheck.Audio)
    formdata.append('video',creativecheck.Video)
    formdata.append('display',creativecheck.Display)
    formdata.append('startdate',dates.start)
    formdata.append('enddate',dates.end)
    formdata.append('freq',freq.freq)
    formdata.append('freqtime',freq.freqtime)
    formdata.append('selregion',geography.region.selected)
    formdata.append('notselregion',geography.region.notselected)
    formdata.append('selpin',geography.pincodes.selected)
    formdata.append('blockedpin',geography.pincodes.blocked)
    formdata.append('pincodefile',geography.pincodes.fileinp)
    formdata.append('sellanguages',languages.selected)
    formdata.append('blocklanguages',languages.block)
    formdata.append('maledemo',demography.gender.male)
    formdata.append('femaledemo',demography.gender.female)
    formdata.append('agedemo',demography.age)
    formdata.append('parentdemo',demography.parent.parent)
    formdata.append('nonparentdemo',demography.parent.nonparent)
    formdata.append('incomedemo',demography.income)
    formdata.append('landingurl',landingurl)
    dispatch(mainaction('DATE',{start:dates.start,end:dates.end}))
    let url=`https://paytunes-new.herokuapp.com/campaign/create`
    let h=await fun.createApi(formdata,url)
    history.push(`/insertion/${h.data.data._id}`)
  
    }

  const handleOpen = (type) => {
    type === "demo" ? setOpen({ demo: true, lang: false, geo: false }) : (type === "lang" ? setOpen({ demo: false, lang: true, geo: false }) : setOpen({ demo: false, lang: false, geo: true }));
    type == "demo" ? setshow({ demo: true, lang: false, geo: false }) : type == "lang" ? setshow({ demo: false, lang: true, geo: false }) : setshow({ demo: false, lang: false, geo: true });
  };

  const handleinputdate1=(e)=>{
    setdates({...dates,start:e.target.value})
  }
  const handleinputdate2=(e)=>{
    setdates({...dates,end:e.target.value})
  }

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
    setkpi({type:e.target.value,goal:kpi.goal});
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
            <div className={styles.campgoal1} >
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
            <div className={styles.kpi5} >
              <span className={styles.svdf} > KPI </span>
            </div>
            <div className={styles.dot4} >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={kpi.type}
                label={kpi.type}
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
                  value={kpi.goal}
                  onChange={e => setkpi({type:kpi.type,goal:e.target.value})}
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
                <input type="date" onChange={handleinputdate1}
                  value={dates.start}
                />
              </div>
            </div>

            <div className={styles.coldis1}  >
              <div >
                <span style={{ float: 'left' }} >End Date</span>
              </div>
              <div>
                <input type="date" onChange={handleinputdate2}
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
          <div className={styles.campname1} >
            <span className={styles.svdf} > Demographics </span>
          </div>
          <div style={{ paddingTop: '1%' }} >
            <span style={{ color: '#9e9e9e' }} >All genders, ages, parental statuses and household incomes</span>
          </div>
          <div style={{ marginLeft: '16%' }} >
            <EditIcon style={{ cursor: 'pointer', color: 'grey' }} onClick={() => handleOpen('demo')} fontSize="large" />
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
            <EditIcon style={{ cursor: 'pointer', color: 'grey' }} onClick={() => handleOpen('Geo')} fontSize="large" />
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
            <EditIcon style={{ cursor: 'pointer', color: 'grey' }} onClick={() => handleOpen('lang')} fontSize="large" />
          </div>

        </div>

        {/* <hr className={styles.divider} /> */}

      </Paper>
      <div style={{ marginBottom: '7%' }} >
        <div className={styles.target} >Additional Details</div>
        <div className={styles.shgt1}  >
          <div style={{ marginTop: '1%' }} >Add more details to improve your recommendations.</div>
        </div>

      </div>
      <Paper className={styles.dashboard} elevation={3}>
        <div className={styles.rowdis} >
          <div className={styles.campname} >
            <span className={styles.svdf} > Landing Page Urls </span>
          </div>
          <div style={{ paddingTop: '1%', display: 'flex', flexDirection: 'column' }} >
            <span ><input className={styles.inpkpi2}  
            value={landingurl}
            onChange={e=>setlandingurl(e.target.value)}
            /></span>
          </div>

        </div>
        {/* <hr className={styles.divider} /> */}
      </Paper>

      {show.demo || show.lang || show.geo ?
        <div  >
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {show.demo ? <Demographic state={{ demography, setOpen }} /> :
              show.lang ? <Language state={{ languages,  setOpen }} /> : <Geography state={{ geography,  setOpen }} />
            }

          </Modal>
        </div>
        :
        <></>
      }

      <button onClick={submitCampaign} >Next</button>

    </div>


  )
}
