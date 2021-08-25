import React, { useContext, useState } from 'react';
import { Paper } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './tabs';
import {Alert} from '@material-ui/lab'
import { BudgetContext } from '../App'
import { Tab1 } from './tab1'
import { Tab2 } from './tab2'
import { Tab3 } from './tab3'
import { Tab4 } from './tab4'

const styles = require('../css/lineitem.module.css')
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '1%'
    //   backgroundColor: grey,
  },
  root1: {
    width: '100%',
    border: 'none',
    //border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    padding: '3%',
    marginBottom: '2%',
    //   margin:'3%',
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
  },
}));



function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function LineItem() {
  const history = useHistory();
  const {state1,dispatch1}=useContext(BudgetContext)
  const classes = useStyles();
  const { campid } = useParams();
  const [success, setsuccess] = useState('')
  const [error, seterror] = useState('')
  console.log('ghh', campid)
  const [value, setValue] = React.useState(0);
  const [type, settype] = React.useState(['Audio'])
  const [strategy, setStrategy] = React.useState(false)
  const [lineitem, setlineitem] = useState('')
  const [AudioLtbudget, SetAudioltbudget] = useState(0)
  const [VideoLtbudget, SetVideoltbudget] = useState(0)
  const [DisplayLtbudget, SetDisplayltbudget] = useState(0)
  const [Audioimpressionlimit, setAudioimpressionlimit] = useState(0)
  const [Videoimpressionlimit, setVideoimpressionlimit] = useState(0)
  const [Displayimpressionlimit, setDisplayimpressionlimit] = useState(0)
  const [Audiostartdate, setAudiostartdate] = useState(null)
  const [Videostartdate, setVideostartdate] = useState(null)
  const [Displaystartdate, setDisplaystartdate] = useState(null)
  const [Audioenddate, setAudioenddate] = useState(null)
  const [Videoenddate, setVideoenddate] = useState(null)
  const [Displayenddate, setDisplayenddate] = useState(null)
  const [Audiostarttime, setAudiostarttime] = useState(null)
  const [Videostarttime, setVideostarttime] = useState(null)
  const [Displaystarttime, setDisplaystarttime] = useState(null)
  const [Audioendtime, setAudioendtime] = useState(null)
  const [Videoendtime, setVideoendtime] = useState(null)
  const [Displayendtime, setDisplayendtime] = useState(null)
  const [Audiocreative, setAudiocreative] = useState('')
  const [Videocreative, setVideocreative] = useState('')
  const [Displaycreative, setDisplaycreative] = useState('')
  const [Audiosize, setAudiosize] = useState('320*50')
  const [Videosize, setVideosize] = useState('320*50')
  const [Displaysize, setDisplaysize] = useState('320*50')
  const [Audiotrackurl, setAudiotrackurl] = useState('')
  const [Videotrackurl, setVideotrackurl] = useState('')
  const [Displaytrackurl, setDisplaytrackurl] = useState('')
  const [Audiocategorytype, setAudiocategorytype] = useState('')
  const [Videocategorytype, setVideocategorytype] = useState('')
  const [Displaycategorytype, setDisplaycategorytype] = useState('')
  const [AudioFileinp, setAudioFileinp] = useState('')
  const [VideoFileinp, setVideoFileinp] = useState('')
  const [DisplayFileinp, setDisplayFileinp] = useState('')
  const [AudioFileBanner, setAudioFileBanner] = useState('')
  const [VideoFileBanner, setVideoFileBanner] = useState('')
  const [DisplayFileBanner, setDisplayFileBanner] = useState('')
  const [tempAudioFileinp, settempAudioFileinp] = useState('')
  const [tempVideoFileinp, settempVideoFileinp] = useState('')
  const [tempDisplayFileinp, settempDisplayFileinp] = useState('')

  const [AudioFrequency, setAudioFrequency] = useState('')
  const [VideoFrequency, setVideoFrequency] = useState('')
  const [DisplayFrequency, setDisplayFrequency] = useState('')
  const [AudioTimeperiod, setAudiotimeperiod] = useState('')
  const [VideoTimeperiod, setVideotimeperiod] = useState('')
  const [DisplayTimeperiod, setDisplaytimeperiod] = useState('')
  const [Audioactive, setAudioActive] = useState('')
  const [Videoactive, setVideoActive] = useState('')
  const [Displayactive, setDisplayActive] = useState('')
  const [AudioRegion, setAudioregion] = useState(['ANDAMAN & NICOBAR ISLANDS'])
  const [VideoRegion, setVideoregion] = useState(['ANDAMAN & NICOBAR ISLANDS'])
  const [DisplayRegion, setDisplayregion] = useState(['ANDAMAN & NICOBAR ISLANDS'])
  const [Audioage, setAudioage] = useState([])
  const [Videoage, setVideoage] = useState([])
  const [Displayage, setDisplayage] = useState([])
  const [AudioCity, setAudiocity] = useState([])
  const [VideoCity, setVideocity] = useState([])
  const [DisplayCity, setDisplaycity] = useState([])
  const [AudioGrandCityval, setAudioGrandcityval] = useState([])
  const [VideoGrandCityval, setVideoGrandcityval] = useState([])
  const [DisplayGrandCityval, setDisplayGrandcityval] = useState([])
  const [Audiocityval, setAudiocityval] = useState([])
  const [Videocityval, setVideocityval] = useState([])
  const [Displaycityval, setDisplaycityval] = useState([])
  const [Audiogender, setAudiogender] = useState([])
  const [Videogender, setVideogender] = useState([])
  const [Displaygender, setDisplaygender] = useState([])
  const [Audioisadvanced, setAudioisadvanced] = useState(false)
  const [Videoisadvanced, setVideoisadvanced] = useState(false)
  const [Displayisadvanced, setDisplayisadvanced] = useState(false)
  const [AudioLanguage, setAudioLanguage] = useState(["Hindi"])
  const [VideoLanguage, setVideoLanguage] = useState(["Hindi"])
  const [DisplayLanguage, setDisplayLanguage] = useState(["Hindi"])
  const [Audiocategory, setAudiocategory] = useState(['IAB1'])
  const [Videocategory, setVideocategory] = useState(['IAB1'])
  const [Displaycategory, setDisplaycategory] = useState(['IAB1'])
  const [Audioos, setAudioos] = useState(['Android'])
  const [Videoos, setVideoos] = useState(['Android'])
  const [Displayos, setDisplayos] = useState(['Android'])
  const [Audiomakemodel, setAudioMakemodel] = useState(['Samsung SM-F707U1'])
  const [Videomakemodel, setVideoMakemodel] = useState(['Samsung SM-F707U1'])
  const [Displaymakemodel, setDisplayMakemodel] = useState(['Samsung SM-F707U1'])
  const [Audioarea, setAudioarea] = useState([])
  const [Videoarea, setVideoarea] = useState([])
  const [Displayarea, setDisplayarea] = useState([])
  const [Audiocheck, setAudiocheck] = useState(0)
  const [Videocheck, setVideocheck] = useState(0)
  const [Displaycheck, setDisplaycheck] = useState(0)
  const [AudioPincode, setAudioPincode] = useState("")
  const [VideoPincode, setVideoPincode] = useState("")
  const [DisplayPincode, setDisplayPincode] = useState("")
  const [AudioPincodeFile, setAudioPincodeFile] = useState("")
  const [VideoPincodeFile, setVideoPincodeFile] = useState("")
  const [DisplayPincodeFile, setDisplayPincodeFile] = useState("")
  const [audiodays, setaudiodays] = useState([])
  const [videodays, setvideodays] = useState([])
  const [displaydays, setdisplaydays] = useState([])
  const [audiotime, setaudiotime] = useState([])
  const [videotime, setvideotime] = useState([])
  const [displaytime, setdisplaytime] = useState([])
  // const [AudioisUploadRegion, setAudioisUploadregion] = useState(false)
  // const [VideoisUploadRegion, setVideoisUploadRegion] = useState(false)
  // const [DisplayisUploadRegion, setDisplayisUploadRegion] = useState(false)


  const handleChange = (event, newValue) => {
    console.log('sd', newValue)
    setValue(newValue);
  };
  console.log(state1.adv._id)
console.log('advertiser',state1.adv)
  function submitsubcampaign(e) {
    e.preventDefault();
    const formdata=new FormData()
    
    formdata.append('campaignid',campid)
    formdata.append('Advertiser',state1.adv.name)
    formdata.append('advertiserid',state1.adv._id?state1.adv._id:"")
    formdata.append('type',type)
    formdata.append('strategy',strategy)
    formdata.append('lineitem',lineitem)
    formdata.append('AudioLtbudget',AudioLtbudget)
    formdata.append('VideoLtbudget',VideoLtbudget)
    formdata.append('DisplayLtbudget',DisplayLtbudget)
    formdata.append('Audioimpressionlimit',Audioimpressionlimit)
    formdata.append('Videoimpressionlimit',Videoimpressionlimit)
    formdata.append('Displayimpressionlimit',Displayimpressionlimit)
    formdata.append('Audiostartdate',Audiostartdate)
    formdata.append('Videostartdate',Videostartdate)
    formdata.append('Displaystartdate',Displaystartdate)
    formdata.append('Audioenddate',Audioenddate)
    formdata.append('Videoenddate',Videoenddate)
    formdata.append('Displayenddate',Displayenddate)
    formdata.append('Audiostarttime',Audiostarttime)
    formdata.append('Videostarttime',Videostarttime)
    formdata.append('Displaystarttime',Displaystarttime)
    formdata.append('Audioendtime',Audioendtime)
    formdata.append('Videoendtime',Videoendtime)
    formdata.append('Displayendtime',Displayendtime)
    formdata.append('Audiocreative',Audiocreative)
    formdata.append('Videocreative',Videocreative)
    formdata.append('Displaycreative',Displaycreative)
    formdata.append('Audiosize',Audiosize)
    formdata.append('Videosize',Videosize)
    formdata.append('Displaysize',Displaysize)
    formdata.append('Audiotrackurl',Audiotrackurl)
    formdata.append('Videotrackurl',Videotrackurl)
    formdata.append('Displaytrackurl',Displaytrackurl)
    formdata.append('AudioFileinp',AudioFileinp)
    formdata.append('VideoFileinp',VideoFileinp)
    formdata.append('DisplayFileinp',DisplayFileinp)
    formdata.append('AudioFileBanner',AudioFileBanner)
    formdata.append('VideoFileBanner',VideoFileBanner)
    formdata.append('DisplayFileBanner',DisplayFileBanner)
    formdata.append('AudioFrequency',AudioFrequency)
    formdata.append('VideoFrequency',VideoFrequency)
    formdata.append('DisplayFrequency',DisplayFrequency)
    formdata.append('AudioTimeperiod',AudioTimeperiod)
    formdata.append('VideoTimeperiod',VideoTimeperiod)
    formdata.append('DisplayTimeperiod',DisplayTimeperiod)
    formdata.append('Audioactive',Audioactive)
    formdata.append('Videoactive',Videoactive)
    formdata.append('Displayactive',Displayactive)
    formdata.append('AudioRegion',AudioRegion)
    formdata.append('VideoRegion',VideoRegion)
    formdata.append('DisplayRegion',DisplayRegion)
    formdata.append('Audioage',Audioage)
    formdata.append('Videoage',Videoage)
    formdata.append('Displayage',Displayage)
    // formdata.append('AudioCity',AudioCity)
    // formdata.append('VideoCity',VideoCity)
    // formdata.append('DisplayCity',DisplayCity)
    formdata.append('AudioGrandCityval',AudioGrandCityval)
    formdata.append('VideoGrandCityval',VideoGrandCityval)
    formdata.append('DisplayGrandCityval',DisplayGrandCityval)
    formdata.append('Audiocityval',Audiocityval)
    formdata.append('Videocityval',Videocityval)
    formdata.append('Displaycityval',Displaycityval)
    formdata.append('Audiogender',Audiogender)
    formdata.append('Videogender',Videogender)
    formdata.append('Displaygender',Displaygender)
    formdata.append('AudioLanguage',AudioLanguage)
    formdata.append('VideoLanguage',VideoLanguage)
    formdata.append('DisplayLanguage',DisplayLanguage)
    formdata.append('Audiocategory',Audiocategory)
    formdata.append('Videocategory',Videocategory)
    formdata.append('Displaycategory',Displaycategory)
    formdata.append('Audioos',Audioos)
    formdata.append('Videoos',Videoos)
    formdata.append('Displayos',Displayos)
    formdata.append('Audiomakemodel',Audiomakemodel)
    formdata.append('Videomakemodel',Videomakemodel)
    formdata.append('Displaymakemodel',Displaymakemodel)
    formdata.append('Audioarea',Audioarea)
    formdata.append('Videoarea',Videoarea)
    formdata.append('Displayarea',Displayarea)
    formdata.append('Audiocheck',Audiocheck)
    formdata.append('Videocheck',Videocheck)
    formdata.append('Displaycheck',Displaycheck)
    formdata.append('AudioPincode',AudioPincode)
    formdata.append('VideoPincode',VideoPincode)
    formdata.append('DisplayPincode',DisplayPincode)
    formdata.append('AudioPincodeFile',AudioPincodeFile)
    formdata.append('VideoPincodeFile',VideoPincodeFile)
    formdata.append('DisplayPincodeFile',DisplayPincodeFile)
    formdata.append('audiodays',audiodays)
    formdata.append('videodays',videodays)
    formdata.append('displaydays',displaydays)
    formdata.append('audiotime',audiotime)
    formdata.append('videotime',videotime)
    formdata.append('displaytime',displaytime)

    

    fetch('/campaign/createsubcampaign', {  //http://127.0.0.1:5000
      method: 'POST',
      headers: {  "Authorization": "Bearer " + localStorage.getItem("jwt") },
      body:formdata
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          
          seterror(data.error)
          console.log(data.error)
        } else {
          console.log(data)
          setsuccess(data.message)
          // setOpen(true)
          // history.push(`/dashboard`)
        }
      })
  }


  return (
    <Paper id="rcorners2" className='dashboard' elevation={3}>
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
        <AppBar position="static"  >
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="About Your Sub-Campaign" {...a11yProps(0)} style={{ margin: '3%' }} />
            <Tab label="Set Your Budget" {...a11yProps(1)} style={{ margin: '3%' }} />
            <Tab label="Upload Or Assign Creative" {...a11yProps(2)} style={{ margin: '3%' }} />
            <Tab label="Set Your Targetting" {...a11yProps(3)} style={{ margin: '3%' }} />
          </Tabs>
        </AppBar>
        <form onSubmit={
          submitsubcampaign 
        } encType="multipart/form-data" >
        <TabPanel value={value} index={0}>

          {/* <form onSubmit={e => {
            e.preventDefault()
            handleChange({}, value + 1)
          }} > */}

            <Tab1 type={type} settype={settype} strategy={strategy} setStrategy={setStrategy} lineitem={lineitem} setlineitem={setlineitem} />
          {/* </form> */}
          <div class={styles.svdef}>
                <button class="button-footer2" tabIndex="0" onClick={()=>handleChange({},value+1)} >Next: Set Your Budget</button>
            </div>
        </TabPanel>


        <TabPanel value={value} index={1}>
          {/* <form onSubmit={e => {
            e.preventDefault()
            handleChange({}, value + 1)
          }} > */}
            <Tab2 state=
              {{
                AudioLtbudget, SetAudioltbudget, VideoLtbudget, SetVideoltbudget, DisplayLtbudget, SetDisplayltbudget,
                Audioimpressionlimit, setAudioimpressionlimit, Videoimpressionlimit, setVideoimpressionlimit, Displayimpressionlimit,
                setDisplayimpressionlimit, Audiostartdate, setAudiostartdate, Videostartdate, setVideostartdate, Displaystartdate,
                setDisplaystartdate, Audioenddate, setAudioenddate, Videoenddate, setVideoenddate, Displayenddate, setDisplayenddate,
                Audiostarttime, setAudiostarttime, Videostarttime, setVideostarttime, Displaystarttime, setDisplaystarttime, Audioendtime,
                setAudioendtime, Videoendtime, setVideoendtime, Displayendtime, setDisplayendtime
              }} />
          {/* </form> */}
          <div class={styles.svdef}>
                <button class="button-footer2" tabIndex="0"  onClick={()=>handleChange({}, value + 1)}>Next: Upload or Assign your Creative</button>
            </div>
        </TabPanel>


        <TabPanel value={value} index={2}>

          {/* <form onSubmit={e => {
            e.preventDefault()
            handleChange({}, value + 1)
          }} > */}

            <Tab3 state={{
              Audiocreative, setAudiocreative, Videocreative, setVideocreative, Displaycreative, setDisplaycreative,
              Audiosize, setAudiosize, Videosize, setVideosize, Displaysize, setDisplaysize, Audiotrackurl, setAudiotrackurl, Videotrackurl,
              setVideotrackurl, Displaytrackurl, setDisplaytrackurl, Audiocategorytype, setAudiocategorytype, Videocategorytype, setVideocategorytype,
              Displaycategorytype, setDisplaycategorytype, AudioFileinp, setAudioFileinp, VideoFileinp, setVideoFileinp, DisplayFileinp, setDisplayFileinp,
              AudioFileBanner, setAudioFileBanner, VideoFileBanner, setVideoFileBanner, DisplayFileBanner, setDisplayFileBanner,
              tempAudioFileinp,settempAudioFileinp,tempVideoFileinp,settempVideoFileinp,tempDisplayFileinp,settempDisplayFileinp
            }} />
          {/* </form> */}
          <div class={styles.svdef}>
                <button class="button-footer2" tabIndex="0"  onClick={()=>handleChange({}, value + 1)} >Next: Set your Targetting</button>
            </div>

        </TabPanel>




        <TabPanel value={value} index={3}>
          <Tab4 state={{
            AudioFrequency, setAudioFrequency, VideoFrequency, setVideoFrequency, DisplayFrequency, setDisplayFrequency,
            AudioTimeperiod, setAudiotimeperiod, VideoTimeperiod, setVideotimeperiod, DisplayTimeperiod, setDisplaytimeperiod,
            Audioactive, setAudioActive, Videoactive, setVideoActive, Displayactive, setDisplayActive, AudioRegion, setAudioregion,
            VideoRegion, setVideoregion, DisplayRegion, setDisplayregion, Audioage, setAudioage, Videoage, setVideoage,
            Displayage, setDisplayage, AudioCity, setAudiocity, VideoCity, setVideocity, DisplayCity, setDisplaycity,
            Audiocityval, setAudiocityval, Videocityval, setVideocityval, Displaycityval, setDisplaycityval, Audiogender,
            setAudiogender, Videogender, setVideogender, Displaygender, setDisplaygender, Audioisadvanced, setAudioisadvanced,
            Videoisadvanced, setVideoisadvanced, Displayisadvanced, setDisplayisadvanced, AudioLanguage, setAudioLanguage,
            VideoLanguage, setVideoLanguage, DisplayLanguage, setDisplayLanguage, Audiocategory, setAudiocategory,
            Videocategory, setVideocategory, Displaycategory, setDisplaycategory, Audioos, setAudioos, Videoos, setVideoos,
            Displayos, setDisplayos, Audiomakemodel, setAudioMakemodel, Videomakemodel, setVideoMakemodel, Displaymakemodel,
            setDisplayMakemodel, Audioarea, setAudioarea, Videoarea, setVideoarea, Displayarea, setDisplayarea,
            Audiocheck, setAudiocheck, Videocheck, setVideocheck, Displaycheck, setDisplaycheck,
            AudioPincode, setAudioPincode, VideoPincode, setVideoPincode, DisplayPincode, setDisplayPincode,
            AudioPincodeFile, setAudioPincodeFile, VideoPincodeFile, setVideoPincodeFile, DisplayPincodeFile, setDisplayPincodeFile,
            audiodays, setaudiodays, videodays, setvideodays, displaydays, setdisplaydays, audiotime, setaudiotime,
            videotime, setvideotime, displaytime, setdisplaytime,
            AudioGrandCityval, setAudioGrandcityval, VideoGrandCityval, setVideoGrandcityval, DisplayGrandCityval, setDisplayGrandcityval
          }} />
          <div class={styles.svdef}>
            <button class="button-footer2" tabIndex="0" type="submit"  >Launch</button>
          </div>
        </TabPanel>
        
        </form>
      </div>
    </Paper>
  )

}