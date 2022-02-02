import React, { useState, useEffect, useContext } from 'react'
import { Paper, Divider, Grid, Select, MenuItem, Modal } from '@material-ui/core'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useLocation } from 'react-router-dom'
import styles from '../css/newcampaign.module.css'
import * as fun from '../api/campaign'
import SettingsIcon from '@material-ui/icons/Settings'
import EditIcon from '@material-ui/icons/Edit'
import Demographic from './demographic'
import Language from './language'
import Geography from './geography'
import Time from './timetargetting';
import Publisher from './publishertargetting';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import mainaction from '../redux/actions/main'
import '../../src/app1.css'
import { Alert } from '@material-ui/lab'
import {todayDate} from '../utils/state';

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
  const [campaignName, setcampaignname] = useState('');
  const [popupstatus, setpopupstatus] = useState(false);
  const [status, setstatus] = useState({ error: "", success: "" });
  const [active, setActive] = useState('Active');
  const [popup, setpopup] = useState(false);
  const [warning, setwarning] = useState("");
  const [landingurl, setlandingurl] = useState("")
  const [creativecheck, setcreativecheck] = useState({ Audio: false, Video: false, Display: false })
  const [dates, setdates] = useState({ start: '', end: '' })
  const [freq, setfreq] = useState({ freq: 0, freqtime: 'Lifetime of this Campaign' })
  const [show, setshow] = useState({ demo: false, lang: false, geo: false, time: false, publisher: false })
  const [open, setOpen] = React.useState({ demo: false, lang: false, geo: false, time: false, publisher: false });
  const [show1, setshow1] = useState(false)
  const [open1, setOpen1] = React.useState(false);
  const geography = useSelector((state) => state.main.geography)
  const languages = useSelector((state) => state.main.language)
  const demography = useSelector((state) => state.main.demographic)
  const selectedtime = useSelector((state) => state.main.timetargetting);
  const selectedpublishers = useSelector((state) => state.main.publisher);
  console.log(useSelector(state=>state.main))

  const submitCampaign = async () => {
    const formdata = new FormData()
    formdata.append('campaignname', campaignName)
    formdata.append('active', active)
    // formdata.append('goal', goal)
    // formdata.append('kpitype', kpi.type)
    // formdata.append('kpigoal', kpi.goal)
    formdata.append('audio', creativecheck.Audio)
    formdata.append('video', creativecheck.Video)
    formdata.append('display', creativecheck.Display)
    formdata.append('startdate', dates.start)
    formdata.append('enddate', dates.end)
    formdata.append('freq', freq.freq)
    formdata.append('freqtime', freq.freqtime)
    formdata.append('selregion', geography.region.selected)
    formdata.append('notselregion', geography.region.notselected)
    formdata.append('selpin', geography.pincodes.selected)
    formdata.append('blockedpin', geography.pincodes.blocked)
    formdata.append('pincodefile', geography.pincodes.fileinp)
    formdata.append('sellanguages', languages.selected)
    formdata.append('blocklanguages', languages.block)
    formdata.append('maledemo', demography.gender.male)
    formdata.append('femaledemo', demography.gender.female)
    formdata.append('agedemo', demography.age)
    formdata.append('incomedemo', demography.income)
    formdata.append('landingurl', landingurl)
    dispatch(mainaction('DATE', { start: dates.start, end: dates.end }))
    dispatch(mainaction('FREQ',{ frequency: freq.freq, exposure: freq.freqtime }));

    let url = `/campaign/create`  //https://paytunes-new.herokuapp.com
    let h = await fun.createApi(formdata, url)
    history.push(`/lineitemnew/${h.data.data._id}`)

  }

  const handleOpen = (type) => {
    if (type === "demo") {
      setOpen({ lang:false,geo:false, demo: true , time:false,publisher:false });
    } else if (type === "lang") {
      setOpen({ geo:false, demo: false, time:false,publisher:false, lang: true });
    } else if (type === "geo") {
      setOpen({ demo: false, time:false,publisher:false, lang: false, geo: true });
    } else if (type === "time") {
      setOpen({ demo: false,publisher:false, lang: false, geo: false, time: true });
    } else if (type === "publisher") {
      setOpen({ demo: false, lang: false, geo: false, time: false, publisher: true });
    }
    type == "demo" ? setshow({ demo: true, lang: false, geo: false ,time:false,publisher:false}) : type == "lang" ? setshow({ demo: false, lang: true, geo: false,time:false,publisher:false }) : type === "geo" ? setshow({ demo: false, lang: false, geo: true ,time:false,publisher:false}) : type === "time" ? setshow({ demo: false, lang: false, geo: false ,publisher:false, time: true }) : setshow({ demo: false, lang: false, geo: false ,time:false, publisher: true });
  };
  const handleOpen1 = () => {
    setOpen1(true);
    setpopup(true);
  };
  const handleinputdate1 = (e) => {
    setdates({ ...dates, start: e.target.value })
  }
  const handleinputdate2 = (e) => {
    setdates({ ...dates, end: e.target.value })
    checkdate();
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleChange2 = (e) => {
    setActive(e.target.value);
  }
  // const handleChange3 = (e) => {
  //   setGoal(e.target.value);
  // }
  // const handleChange4 = (e) => {
  //   setkpi({ type: e.target.value, goal: kpi.goal });
  //   setcond(true)
  // }
  const handleChange5 = (e) => {
    setfreq({ freq: freq.freq, freqtime: e.target.value })
    // dispatch(mainaction('FREQ', { frequency: freq.freq, exposure: e.target.value }));
  }

  const checkdate = () => {
    console.log(dates.start, dates.end);
    console.log(new Date(dates.start) - new Date())
    console.log( new Date().getDate() )
    if (dates.start < todayDate()) {
      console.log('hello')
      return { status: false, message: "Start Date should be greater than today's date!" }
    }

    if (((new Date(dates.start).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) >= 60) {
      return { status: false, message: "Start Date is too late!", check: 1 }
    }

    if (new Date(dates.end) < new Date()) {
      return { status: false, message: "End Date should be greater than today's date!" }
    }

    if (new Date(dates.start) > new Date(dates.end)) {
      return { status: false, message: "Start Date should be less than end date!" }
    }

    if (((new Date(dates.end).getTime() - new Date(dates.start).getTime()) / (1000 * 3600 * 24)) >= 60) {
      console.log(((new Date(dates.end).getTime() - new Date(dates.start).getTime()) / (1000 * 3600 * 24)))
      return { status: false, message: "End Date is too late from the start date!", check: 1 }
    }

    return { status: true, message: "Success" }
  }

  return (

    <div>


      <form onSubmit={(e) => {
        e.preventDefault();
        let check = checkdate();
        if (check.check) {
          setwarning(check.message);
          handleOpen1();
          return
        }

        if (!check.status) {
          return setstatus({ ...status, error: check.message });
        }
        console.log('good')
        submitCampaign();
      }} >

        <div className={styles.statusdashboard} >
          <div>
            {status.error ? <Alert>{status.error}</Alert> : ''}
          </div>
          <div>
            {status.success ? <Alert>{status.success}</Alert> : ''}
          </div>
        </div>

        <Paper className={styles.dashboard} elevation={3}>

          <div className={styles.rowdis} >
            <div className={styles.campname} >
              <span className={styles.svdf} > Campaign Name </span>
            </div>
            <div>
              <input placeholder="Enter name" className="input" type="text" size="30"
                required={true}
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
                    required={true}
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
                    required={true}
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
                <label style={{ marginRight: '1%' }} > <input type="number" className={styles.inpkpi} style={{ fontSize: '10pt', fontWeight: 'bold' }} onChange={(e) => {
                  setfreq({ freq: e.target.value, freqtime: freq.freqtime })
                  // dispatch(mainaction('FREQ', { frequency: e.target.value, exposure: freq.freqtime }))
                }}
                  value={freq.freq} /> </label>
                <label style={{ marginLeft: '3px' }} > exposures per </label>
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
            <div style={{ paddingTop: '1%',display:'flex',flexDirection:'column',width:'41%' }} >
              <span style={{ color: '#9e9e9e' }} >Gender: {demography.gender.male?'male':"None" }, {demography.gender.female?'female':"None"} </span>
              <span style={{ color: '#9e9e9e' }} >Age: {demography.age[0] }, {demography.age[1]} </span>
              <span style={{ color: '#9e9e9e' }} >Phone Cost: {demography.income[0] }k, {demography.income[1]}k </span>

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
              <EditIcon style={{ cursor: 'pointer', color: 'grey' }} onClick={() => handleOpen('geo')} fontSize="large" />
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

          <hr className={styles.divider} />
          <div className={styles.rowdis} >
            <div className={styles.campgeog} >
              <span className={styles.svdf} > Time Targetting </span>
            </div>
            <div style={{ paddingTop: '1%', marginLeft: '3%' }} >
              <span style={{ color: '#9e9e9e' }} >All time</span>
            </div>
            <div style={{ marginLeft: '52%' }} >
              <EditIcon style={{ cursor: 'pointer', color: 'grey' }} onClick={() => handleOpen('time')} fontSize="large" />
            </div>

          </div>
          <hr className={styles.divider} />
          <div className={styles.rowdis} >
            <div className={styles.campgeog} >
              <span className={styles.svdf} > Publisher </span>
            </div>
            <div style={{ paddingTop: '1%', marginLeft: '3%' }} >
              <span style={{ color: '#9e9e9e' }} >All Publisher</span>
            </div>
            <div style={{ marginLeft: '48%' }} >
              <EditIcon style={{ cursor: 'pointer', color: 'grey' }} onClick={() => handleOpen('publisher')} fontSize="large" />
            </div>

          </div>

        </Paper>
        {/* <div style={{ marginBottom: '7%' }} >
          <div className={styles.target} >Additional Details</div>
          <div className={styles.shgt1}  >
            <div style={{ marginTop: '1%' }} >Add more details to improve your recommendations.</div>
          </div>

        </div> */}
        {/* <Paper className={styles.dashboard} elevation={3}>
          <div className={styles.rowdis} >
            <div className={styles.campname} >
              <span className={styles.svdf} > Landing Page Urls </span>
            </div>
            <div style={{ paddingTop: '1%', display: 'flex', flexDirection: 'column' }} >
              <span ><input className={styles.inpkpi2}
                required={true}
                value={landingurl}
                onChange={e => setlandingurl(e.target.value)}
              /></span>
            </div>

          </div>
          
        </Paper> */}

        {show.demo || show.lang || show.geo || show.time || show.publisher ?
          <div  >
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {show.demo ? <Demographic state={{ demography, setOpen }} /> :
                show.lang ? <Language state={{ languages, setOpen }} /> :
                  show.geo ? <Geography state={{ geography, setOpen }} /> :
                   show.time? <Time state={{ selectedtime, setOpen }} />:
                   <Publisher state={{selectedpublishers,setOpen }} />
              }

            </Modal>
          </div>
          :
          <></>
        }
        {popup ?
          <div  >
            <Modal
              open={open1}
              onClose={handleClose1}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <Paper className={styles.dashboardpop} >
                <div style={{ margin: 'auto', width: '50%' }} >
                  <h3>Warning!</h3>
                  <p>{warning}</p>
                  <div style={{ display: 'flex', flexDirection: 'row' }} >
                    <button onClick={() => submitCampaign()} style={{ margin: '2%' }} >Ok</button>
                    <button onClick={handleClose1} style={{ margin: '2%' }} >Cancel</button>
                  </div>
                </div>
              </Paper>


            </Modal>
          </div>
          :
          <></>
        }




        <button type="submit" style={{marginLeft:'40%'}} >Next</button>
      </form>

    </div>


  )
}
