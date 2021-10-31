import React, { useContext, useState } from 'react';
import { Paper, CircularProgress } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './tabs';
import Async from 'react-async'
import { Alert } from '@material-ui/lab'
import { BudgetContext } from '../App'
import { Tab1 } from './tab1'
import { Tab2 } from './tab2'
import { Tab3 } from './tab3'
import { Tab4 } from './tab4'
import { Tab5 } from './tab5'
import axios from 'axios'
import { fields } from '../utils/state'


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

const LineItem = () => {
  const history = useHistory();
  const { state1, dispatch1 } = useContext(BudgetContext)
  const [loading, setloading] = useState(false)
  
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
  const [Audiostartdate, setAudiostartdate] = useState(state1.startdate)
  const [Videostartdate, setVideostartdate] = useState(state1.startdate)
  const [Displaystartdate, setDisplaystartdate] = useState(state1.startdate)
  const [Audioenddate, setAudioenddate] = useState(state1.enddate)
  const [Videoenddate, setVideoenddate] = useState(state1.enddate)
  const [Displayenddate, setDisplayenddate] = useState(state1.enddate)
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
  const [Audioimpurl, setAudioimpurl] = useState('')
  const [Videoimpurl, setVideoimpurl] = useState('')
  const [Displayimpurl, setDisplayimpurl] = useState('')
  const [Audiocategorytype, setAudiocategorytype] = useState('')
  const [Videocategorytype, setVideocategorytype] = useState('')
  const [Displaycategorytype, setDisplaycategorytype] = useState('')
  const [AudioFileinp, setAudioFileinp] = useState({})
  const [VideoFileinp, setVideoFileinp] = useState({})
  const [DisplayFileinp, setDisplayFileinp] = useState({})
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
  const [active, setactive] = useState('')
  const [AudioRegion, setAudioregion] = useState([])
  const [VideoRegion, setVideoregion] = useState([])
  const [DisplayRegion, setDisplayregion] = useState([])
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
  const [AudioLanguage, setAudioLanguage] = useState([])
  const [VideoLanguage, setVideoLanguage] = useState([])
  const [DisplayLanguage, setDisplayLanguage] = useState([])
  const [Audiocategory, setAudiocategory] = useState([])
  const [Videocategory, setVideocategory] = useState([])
  const [Displaycategory, setDisplaycategory] = useState([])
  const [Audioos, setAudioos] = useState([])
  const [Videoos, setVideoos] = useState([])
  const [Displayos, setDisplayos] = useState([])
  const [Audiomakemodel, setAudioMakemodel] = useState([])
  const [Videomakemodel, setVideoMakemodel] = useState([])
  const [Displaymakemodel, setDisplayMakemodel] = useState([])
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

  const [AudioLtbudgetcheck, setAudioLtbudgetcheck] = useState(false)
  const [VideoLtbudgetcheck, setVideoLtbudgetcheck] = useState(false)
  const [DisplayLtbudgetcheck, setDisplayLtbudgetcheck] = useState(false)
  const [Audioimpressionlimitcheck, setAudioimpressionlimitcheck] = useState(false)
  const [Videoimpressionlimitcheck, setVideoimpressionlimitcheck] = useState(false)
  const [Displayimpressionlimitcheck, setDisplayimpressionlimitcheck] = useState(false)
  const [Audiostartdatecheck, setAudiostartdatecheck] = useState(false)
  const [Videostartdatecheck, setVideostartdatecheck] = useState(false)
  const [Displaystartdatecheck, setDisplaystartdatecheck] = useState(false)
  const [Audioenddatecheck, setAudioenddatecheck] = useState(false)
  const [Videoenddatecheck, setVideoenddatecheck] = useState(false)
  const [Displayenddatecheck, setDisplayenddatecheck] = useState(false)
  const [Audiostarttimecheck, setAudiostarttimecheck] = useState(false)
  const [Videostarttimecheck, setVideostarttimecheck] = useState(false)
  const [Displaystarttimecheck, setDisplaystarttimecheck] = useState(false)
  const [Audioendtimecheck, setAudioendtimecheck] = useState(false)
  const [Videoendtimecheck, setVideoendtimecheck] = useState(false)
  const [Displayendtimecheck, setDisplayendtimecheck] = useState(false)
  const [Audiocreativecheck, setAudiocreativecheck] = useState(false)
  const [Videocreativecheck, setVideocreativecheck] = useState(false)
  const [Displaycreativecheck, setDisplaycreativecheck] = useState(false)
  const [Audiosizecheck, setAudiosizecheck] = useState(false)
  const [Videosizecheck, setVideosizecheck] = useState(false)
  const [Displaysizecheck, setDisplaysizecheck] = useState(false)
  const [Audiotrackurlcheck, setAudiotrackurlcheck] = useState(false)
  const [Videotrackurlcheck, setVideotrackurlcheck] = useState(false)
  const [Displaytrackurlcheck, setDisplaytrackurlcheck] = useState(false)
  const [AudioFrequencycheck, setAudioFrequencycheck] = useState(false)
  const [VideoFrequencycheck, setVideoFrequencycheck] = useState(false)
  const [DisplayFrequencycheck, setDisplayFrequencycheck] = useState(false)
  const [AudioTimeperiodcheck, setAudioTimeperiodcheck] = useState(false)
  const [VideoTimeperiodcheck, setVideoTimeperiodcheck] = useState(false)
  const [DisplayTimeperiodcheck, setDisplayTimeperiodcheck] = useState(false)
  const [AudioRegioncheck, setAudioRegioncheck] = useState(false)
  const [VideoRegioncheck, setVideoRegioncheck] = useState(false)
  const [DisplayRegioncheck, setDisplayRegioncheck] = useState(false)
  const [Audioagecheck, setAudioagecheck] = useState(false)
  const [Videoagecheck, setVideoagecheck] = useState(false)
  const [Displayagecheck, setDisplayagecheck] = useState(false)
  const [Audiocityvalcheck, setAudiocityvalcheck] = useState(false)
  const [Videocityvalcheck, setVideocityvalcheck] = useState(false)
  const [Displaycityvalcheck, setDisplaycityvalcheck] = useState(false)
  const [Audiogendercheck, setAudiogendercheck] = useState(false)
  const [Videogendercheck, setVideogendercheck] = useState(false)
  const [Displaygendercheck, setDisplaygendercheck] = useState(false)
  const [AudioLanguagecheck, setAudioLanguagecheck] = useState(false)
  const [VideoLanguagecheck, setVideoLanguagecheck] = useState(false)
  const [DisplayLanguagecheck, setDisplayLanguagecheck] = useState(false)
  const [Audiocategorycheck, setAudiocategorycheck] = useState(false)
  const [Videocategorycheck, setVideocategorycheck] = useState(false)
  const [Displaycategorycheck, setDisplaycategorycheck] = useState(false)
  const [Audiooscheck, setAudiooscheck] = useState(false)
  const [Videooscheck, setVideooscheck] = useState(false)
  const [Displayoscheck, setDisplayoscheck] = useState(false)
  const [Audiomakemodelcheck, setAudiomakemodelcheck] = useState(false)
  const [Videomakemodelcheck, setVideomakemodelcheck] = useState(false)
  const [Displaymakemodelcheck, setDisplaymakemodelcheck] = useState(false)
  const [Audioareacheck, setAudioareacheck] = useState(false)
  const [Videoareacheck, setVideoareacheck] = useState(false)
  const [Displayareacheck, setDisplayareacheck] = useState(false)
  const [AudioPincodecheck, setAudioPincodecheck] = useState(false)
  const [VideoPincodecheck, setVideoPincodecheck] = useState(false)
  const [DisplayPincodecheck, setDisplayPincodecheck] = useState(false)
  const [audiodayscheck, setaudiodayscheck] = useState(false)
  const [videodayscheck, setvideodayscheck] = useState(false)
  const [displaydayscheck, setdisplaydayscheck] = useState(false)
  const [videotimecheck, setvideotimecheck] = useState(false)
  const [audiotimecheck, setaudiotimecheck] = useState(false)
  const [displaytimecheck, setdisplaytimecheck] = useState(false)
  const [Audioimpurlcheck, setAudioimpurlcheck] = useState(false)
  const [Videoimpurlcheck, setVideoimpurlcheck] = useState(false)
  const [Displayimpurlcheck, setDisplayimpurlcheck] = useState(false)
  const [AudioGrandCityvalcheck, setAudioGrandCityvalcheck] = useState(false)
  const [VideoGrandCityvalcheck, setVideoGrandCityvalcheck] = useState(false)
  const [DisplayGrandCityvalcheck, setDisplayGrandCityvalcheck] = useState(false)
  const [Audiostrategycheck, setAudiostrategycheck] = useState(false)
  const [Videostrategycheck, setVideostrategycheck] = useState(false)
  const [Displaystrategycheck, setDisplaystrategycheck] = useState(false)
  const [Audiosubcampnamecheck, setAudiosubcampnamecheck] = useState(false)
  const [Videosubcampnamecheck, setVideosubcampnamecheck] = useState(false)
  const [Displaysubcampnamecheck, setDisplaysubcampnamecheck] = useState(false)
  console.log(type)
  let fie=fields(type);
  const [map1,setmap1]=useState(new Map(fie))

  const handleChange = (event, newValue) => {
    console.log('sd', newValue)
    setValue(newValue);
  };
  console.log(state1.adv._id)
  console.log('advertiser', state1.adv)
  console.log('ddd', state1.startdate, state1.enddate)
  function submitsubcampaign() {

    const formdata = new FormData()

    formdata.append('campaignid', campid)
    formdata.append('Advertiser', state1.adv.name)
    formdata.append('advertiserid', state1.adv._id ? state1.adv._id : "")
    formdata.append('totalbudget', state1.budget)
    formdata.append('type', type)
    formdata.append('strategy', strategy)
    formdata.append('lineitem', lineitem)
    formdata.append('AudioLtbudget', AudioLtbudget)
    formdata.append('VideoLtbudget', VideoLtbudget)
    formdata.append('DisplayLtbudget', DisplayLtbudget)
    formdata.append('Audioimpressionlimit', Audioimpressionlimit)
    formdata.append('Videoimpressionlimit', Videoimpressionlimit)
    formdata.append('Displayimpressionlimit', Displayimpressionlimit)
    formdata.append('Audiostartdate', Audiostartdate)
    formdata.append('Videostartdate', Videostartdate)
    formdata.append('Displaystartdate', Displaystartdate)
    formdata.append('Audioenddate', Audioenddate)
    formdata.append('Videoenddate', Videoenddate)
    formdata.append('Displayenddate', Displayenddate)
    formdata.append('Audiostarttime', Audiostarttime)
    formdata.append('Videostarttime', Videostarttime)
    formdata.append('Displaystarttime', Displaystarttime)
    formdata.append('Audioendtime', Audioendtime)
    formdata.append('Videoendtime', Videoendtime)
    formdata.append('Displayendtime', Displayendtime)
    formdata.append('Audiocreative', Audiocreative)
    formdata.append('Videocreative', Videocreative)
    formdata.append('Displaycreative', Displaycreative)
    formdata.append('Audiosize', Audiosize)
    formdata.append('Videosize', Videosize)
    formdata.append('Displaysize', Displaysize)
    formdata.append('Audiotrackurl', Audiotrackurl)
    formdata.append('Videotrackurl', Videotrackurl)
    formdata.append('Displaytrackurl', Displaytrackurl)
    formdata.append('Audioimpurl', Audiotrackurl)
    formdata.append('Videoimpurl', Videotrackurl)
    formdata.append('Displayimpurl', Displaytrackurl)
    formdata.append('AudioFileinp', AudioFileinp)
    formdata.append('VideoFileinp', VideoFileinp)
    formdata.append('DisplayFileinp', DisplayFileinp)
    formdata.append('AudioFileBanner', AudioFileBanner)
    formdata.append('VideoFileBanner', VideoFileBanner)
    formdata.append('DisplayFileBanner', DisplayFileBanner)
    formdata.append('AudioFrequency', AudioFrequency)
    formdata.append('VideoFrequency', VideoFrequency)
    formdata.append('DisplayFrequency', DisplayFrequency)
    formdata.append('AudioTimeperiod', AudioTimeperiod)
    formdata.append('VideoTimeperiod', VideoTimeperiod)
    formdata.append('DisplayTimeperiod', DisplayTimeperiod)

    formdata.append('AudioRegion', AudioRegion)
    formdata.append('VideoRegion', VideoRegion)
    formdata.append('DisplayRegion', DisplayRegion)
    formdata.append('Audioage', Audioage)
    formdata.append('Videoage', Videoage)
    formdata.append('Displayage', Displayage)
    formdata.append('AudioGrandCityval', AudioGrandCityval)
    formdata.append('VideoGrandCityval', VideoGrandCityval)
    formdata.append('DisplayGrandCityval', DisplayGrandCityval)
    formdata.append('Audiocityval', Audiocityval)
    formdata.append('Videocityval', Videocityval)
    formdata.append('Displaycityval', Displaycityval)
    formdata.append('Audiogender', Audiogender)
    formdata.append('Videogender', Videogender)
    formdata.append('Displaygender', Displaygender)
    formdata.append('AudioLanguage', AudioLanguage)
    formdata.append('VideoLanguage', VideoLanguage)
    formdata.append('DisplayLanguage', DisplayLanguage)
    formdata.append('Audiocategory', Audiocategory)
    formdata.append('Videocategory', Videocategory)
    formdata.append('Displaycategory', Displaycategory)
    formdata.append('Audioos', Audioos)
    formdata.append('Videoos', Videoos)
    formdata.append('Displayos', Displayos)
    formdata.append('Audiomakemodel', Audiomakemodel)
    formdata.append('Videomakemodel', Videomakemodel)
    formdata.append('Displaymakemodel', Displaymakemodel)
    formdata.append('Audioarea', Audioarea)
    formdata.append('Videoarea', Videoarea)
    formdata.append('Displayarea', Displayarea)
    formdata.append('Audiocheck', Audiocheck)
    formdata.append('Videocheck', Videocheck)
    formdata.append('Displaycheck', Displaycheck)
    formdata.append('AudioPincode', AudioPincode)
    formdata.append('VideoPincode', VideoPincode)
    formdata.append('DisplayPincode', DisplayPincode)
    formdata.append('AudioPincodeFile', AudioPincodeFile)
    formdata.append('VideoPincodeFile', VideoPincodeFile)
    formdata.append('DisplayPincodeFile', DisplayPincodeFile)
    formdata.append('audiodays', audiodays)
    formdata.append('videodays', videodays)
    formdata.append('displaydays', displaydays)
    formdata.append('audiotime', audiotime)
    formdata.append('videotime', videotime)
    formdata.append('displaytime', displaytime)
    setloading(true)
    axios.post('/campaign/createsubcampaign', //http://127.0.0.1:5000
      formdata,
      { headers: { Authorization: "Bearer " + localStorage.getItem("jwt"), 'Content-Type': 'multipart/form-data' } },
    ).then(response => {
      setloading(false)
      console.log('success', response.data)
      history.push(`/dashboard`, { success: "Created Successfuly!" })
    }).catch(error => {
      setloading(false)
      console.log(error.response.data)
      seterror(error.response.data.error)
    })


  }

  return (
    loading ?
      <div>
        <h3>Creating SubCampaign.... </h3>
        <h4>Wait After Successful Creation of Subcampaign You'll be redirected to Dashboard!</h4>
        <CircularProgress />
      </div>
      :
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
              <Tab label="About Your Sub-Campaign" {...a11yProps(0)} style={{ margin: '2%' }} />
              <Tab label="Set Your Budget" {...a11yProps(1)} style={{ margin: '2%' }} />
              <Tab label="Upload Or Assign Creative" {...a11yProps(2)} style={{ margin: '2%' }} />
              <Tab label="Set Your Targetting" {...a11yProps(3)} style={{ margin: '2%' }} />
              <Tab label="LAUNCH" {...a11yProps(4)} style={{ margin: '2%' }} />
            </Tabs>
          </AppBar>
          <form onSubmit={(e) => {
            e.preventDefault()
            submitsubcampaign()

          }


          } encType="multipart/form-data" >
            <TabPanel value={value} index={0}>

              <Tab1 type={type} settype={settype} strategy={strategy} setStrategy={setStrategy} lineitem={lineitem} setlineitem={setlineitem} />
              {/* </form> */}
              <div class={styles.svdef}>
                <button class="button-footer2" tabIndex="0" onClick={() => handleChange({}, value + 1)} >Next: Set Your Budget</button>
              </div>
            </TabPanel>


            <TabPanel value={value} index={1}>

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
                <button class="button-footer2" tabIndex="0" onClick={() => handleChange({}, value + 1)}>Next: Upload or Assign your Creative</button>
              </div>
            </TabPanel>


            <TabPanel value={value} index={2}>

              <Tab3 state={{
                Audiocreative, setAudiocreative, Videocreative, setVideocreative, Displaycreative, setDisplaycreative,
                Audiosize, setAudiosize, Videosize, setVideosize, Displaysize, setDisplaysize, Audiotrackurl, setAudiotrackurl, Videotrackurl,
                setVideotrackurl, Displaytrackurl, setDisplaytrackurl, Audiocategorytype, setAudiocategorytype, Videocategorytype, setVideocategorytype,
                Displaycategorytype, setDisplaycategorytype, AudioFileinp, setAudioFileinp, VideoFileinp, setVideoFileinp, DisplayFileinp, setDisplayFileinp,
                AudioFileBanner, setAudioFileBanner, VideoFileBanner, setVideoFileBanner, DisplayFileBanner, setDisplayFileBanner,
                tempAudioFileinp, settempAudioFileinp, tempVideoFileinp, settempVideoFileinp, tempDisplayFileinp, settempDisplayFileinp,
                Audioimpurl, setAudioimpurl, Videoimpurl, setVideoimpurl, Displayimpurl, setDisplayimpurl
              }} />
              {/* </form> */}
              <div class={styles.svdef}>
                <button class="button-footer2" tabIndex="0" onClick={() => handleChange({}, value + 1)} >Next: Set your Targetting</button>
              </div>

            </TabPanel>




            <TabPanel value={value} index={3}>
              <Tab4 state={{
                AudioFrequency, setAudioFrequency, VideoFrequency, setVideoFrequency, DisplayFrequency, setDisplayFrequency,
                AudioTimeperiod, setAudiotimeperiod, VideoTimeperiod, setVideotimeperiod, DisplayTimeperiod, setDisplaytimeperiod,
                AudioRegion, setAudioregion, VideoRegion, setVideoregion, DisplayRegion, setDisplayregion, Audioage, setAudioage, Videoage, setVideoage,
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
                videotime, setvideotime, displaytime, setdisplaytime, Audioimpurl, setAudioimpurl, Videoimpurl, setVideoimpurl, Displayimpurl, setDisplayimpurl,
                AudioGrandCityval, setAudioGrandcityval, VideoGrandCityval, setVideoGrandcityval, DisplayGrandCityval, setDisplayGrandcityval
              }} />
              <div class={styles.svdef}>
                <div className={styles.vftuc_sub} >
                  <p className={styles.srtey}  >Do you want your Line Item active now? </p>
                  <div class="radio-toolbar1" onChange={e => {
                    setactive(e.target.value)
                  }}
                  >

                    <input type="radio" id={`activeyes`} name={`Activeyes`} value="true" checked={active === "true" ? true : false} />
                    <label for={`activeyes`} style={{ paddingRight: '10px', width: '10%' }} >Yes</label>

                    <input type="radio" id={`inActiveno`} name={`ActiveNo`} value="false" checked={active === "false" ? true : false} />
                    <label for={`inActiveno`} style={{ paddingRight: '10px', width: '10%' }} >No</label>

                  </div>
                </div>
                {/* <button class="button-footer2" tabIndex="0" type="submit"  >Launch</button> */}
              </div>
            </TabPanel>


          </form>
          <TabPanel value={value} index={4}>

            <Tab5 state={{
              strategy, lineitem, AudioLtbudget, VideoLtbudget, DisplayLtbudget, Audioimpressionlimit, Videoimpressionlimit,
              Displayimpressionlimit, Audiostartdate, Videostartdate, Displaystartdate,
              Audioenddate, Videoenddate, Displayenddate, Audiostarttime, Videostarttime, Displaystarttime, Audioendtime,
              Videoendtime, Displayendtime, Audiocreative, Videocreative, Displaycreative,
              Audiosize, Videosize, Displaysize, Audiotrackurl, Videotrackurl,
              Displaytrackurl, Audiocategorytype, Videocategorytype,
              Displaycategorytype, AudioFileinp, VideoFileinp, DisplayFileinp,
              AudioFileBanner, VideoFileBanner, DisplayFileBanner, tempAudioFileinp, tempVideoFileinp, tempDisplayFileinp, AudioFrequency,
              VideoFrequency, DisplayFrequency,
              AudioTimeperiod, VideoTimeperiod, DisplayTimeperiod,
              AudioRegion, VideoRegion, DisplayRegion, Audioage, Videoage,
              Displayage, AudioCity, VideoCity, DisplayCity,
              Audiocityval, Videocityval, Displaycityval, Audiogender,
              Videogender, Displaygender, Audioisadvanced,
              Videoisadvanced, Displayisadvanced, AudioLanguage,
              VideoLanguage, DisplayLanguage, Audiocategory,
              Videocategory, Displaycategory, Audioos, Videoos,
              Displayos, Audiomakemodel, Videomakemodel, Displaymakemodel,
              Audioarea, Videoarea, Displayarea,
              Audiocheck, Videocheck, Displaycheck,
              AudioPincode, VideoPincode, DisplayPincode,
              AudioPincodeFile, VideoPincodeFile, DisplayPincodeFile,
              audiodays, videodays, displaydays, audiotime,
              videotime, displaytime, Audioimpurl, Videoimpurl, Displayimpurl,
              AudioGrandCityval, VideoGrandCityval, DisplayGrandCityval, submitsubcampaign, 
              AudioLtbudgetcheck, setAudioLtbudgetcheck,VideoLtbudgetcheck, setVideoLtbudgetcheck,DisplayLtbudgetcheck, setDisplayLtbudgetcheck,
              Audioimpressionlimitcheck, setAudioimpressionlimitcheck,Videoimpressionlimitcheck, setVideoimpressionlimitcheck,
              Displayimpressionlimitcheck, setDisplayimpressionlimitcheck,Audiostartdatecheck, setAudiostartdatecheck,
              Videostartdatecheck, setVideostartdatecheck,Displaystartdatecheck, setDisplaystartdatecheck,Audioenddatecheck, setAudioenddatecheck,
              Videoenddatecheck, setVideoenddatecheck,Displayenddatecheck, setDisplayenddatecheck,Audiostarttimecheck, setAudiostarttimecheck,
              Videostarttimecheck, setVideostarttimecheck,Displaystarttimecheck, setDisplaystarttimecheck,Audioendtimecheck, setAudioendtimecheck,
              Videoendtimecheck, setVideoendtimecheck,Displayendtimecheck, setDisplayendtimecheck,Audiocreativecheck, setAudiocreativecheck,
              Videocreativecheck, setVideocreativecheck,Displaycreativecheck, setDisplaycreativecheck,Audiosizecheck, setAudiosizecheck,
              Videosizecheck, setVideosizecheck,Displaysizecheck, setDisplaysizecheck,Audiotrackurlcheck, setAudiotrackurlcheck,
              Videotrackurlcheck, setVideotrackurlcheck,Displaytrackurlcheck, setDisplaytrackurlcheck,AudioFrequencycheck, setAudioFrequencycheck,
              VideoFrequencycheck, setVideoFrequencycheck,DisplayFrequencycheck, setDisplayFrequencycheck,AudioTimeperiodcheck, setAudioTimeperiodcheck,
              VideoTimeperiodcheck, setVideoTimeperiodcheck,DisplayTimeperiodcheck, setDisplayTimeperiodcheck,AudioRegioncheck, setAudioRegioncheck,
              VideoRegioncheck, setVideoRegioncheck,DisplayRegioncheck, setDisplayRegioncheck,Audioagecheck, setAudioagecheck,
              Videoagecheck, setVideoagecheck,Displayagecheck, setDisplayagecheck,Audiocityvalcheck, setAudiocityvalcheck,
              Videocityvalcheck, setVideocityvalcheck,Displaycityvalcheck, setDisplaycityvalcheck,Audiogendercheck, setAudiogendercheck,
              Videogendercheck, setVideogendercheck,Displaygendercheck, setDisplaygendercheck,AudioLanguagecheck, setAudioLanguagecheck,
              VideoLanguagecheck, setVideoLanguagecheck,DisplayLanguagecheck, setDisplayLanguagecheck,Audiocategorycheck, setAudiocategorycheck,
              Videocategorycheck, setVideocategorycheck,Displaycategorycheck, setDisplaycategorycheck,Audiooscheck, setAudiooscheck,
              Videooscheck, setVideooscheck,Displayoscheck, setDisplayoscheck,Audiomakemodelcheck, setAudiomakemodelcheck,
              Videomakemodelcheck, setVideomakemodelcheck,Displaymakemodelcheck, setDisplaymakemodelcheck,Audioareacheck, setAudioareacheck,
              Videoareacheck, setVideoareacheck,Displayareacheck, setDisplayareacheck,AudioPincodecheck, setAudioPincodecheck,
              VideoPincodecheck, setVideoPincodecheck,DisplayPincodecheck, setDisplayPincodecheck,audiodayscheck, setaudiodayscheck,
              videodayscheck, setvideodayscheck,displaydayscheck, setdisplaydayscheck,videotimecheck, setvideotimecheck,audiotimecheck, setaudiotimecheck,
              displaytimecheck, setdisplaytimecheck,Audioimpurlcheck, setAudioimpurlcheck,Videoimpurlcheck, setVideoimpurlcheck,
              Displayimpurlcheck, setDisplayimpurlcheck,AudioGrandCityvalcheck, setAudioGrandCityvalcheck,VideoGrandCityvalcheck, setVideoGrandCityvalcheck,
              DisplayGrandCityvalcheck, setDisplayGrandCityvalcheck,map1,Audiostrategycheck,setAudiostrategycheck,Videostrategycheck,setVideostrategycheck,
              Displaystrategycheck,setDisplaystrategycheck,Audiosubcampnamecheck,setAudiosubcampnamecheck,Videosubcampnamecheck,setVideosubcampnamecheck,Displaysubcampnamecheck,setDisplaysubcampnamecheck
            }} />
            {/* </form> */}


          </TabPanel>
        </div>
      </Paper>
  )
}

export default LineItem

