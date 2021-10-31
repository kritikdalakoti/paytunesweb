import React, { useState, useContext } from "react";
import { Grid, makeStyles } from '@material-ui/core'
import styles from '../css/lineitem.module.css'
import { BudgetContext } from "../App";
import { Alert } from '@material-ui/lab'
import { fields } from "../utils/state";


export function Tab5({ state }) {

    let { strategy, lineitem, AudioLtbudget, VideoLtbudget, DisplayLtbudget, Audioimpressionlimit, Videoimpressionlimit,
        Displayimpressionlimit, Audiostartdate, Videostartdate, Displaystartdate,
        Audioenddate, Videoenddate, Displayenddate, Audiostarttime, Videostarttime, Displaystarttime, Audioendtime,
        Videoendtime, Displayendtime, Audiocreative, Videocreative, Displaycreative,
        Audiosize, Videosize, Displaysize, Audiotrackurl, Videotrackurl,
        Displaytrackurl, AudioFrequency,
        VideoFrequency, DisplayFrequency,
        AudioTimeperiod, VideoTimeperiod, DisplayTimeperiod,
        AudioRegion, VideoRegion, DisplayRegion, Audioage, Videoage,
        Displayage,
        Audiocityval, Videocityval, Displaycityval, Audiogender,
        Videogender, Displaygender, AudioLanguage,
        VideoLanguage, DisplayLanguage, Audiocategory,
        Videocategory, Displaycategory, Audioos, Videoos,
        Displayos, Audiomakemodel, Videomakemodel, Displaymakemodel,
        Audioarea, Videoarea, Displayarea,
        AudioPincode, VideoPincode, DisplayPincode,
        audiodays, videodays, displaydays, audiotime,
        videotime, displaytime, Audioimpurl, Videoimpurl, Displayimpurl,
        AudioGrandCityval, VideoGrandCityval, DisplayGrandCityval, submitsubcampaign,
        AudioLtbudgetcheck, setAudioLtbudgetcheck, VideoLtbudgetcheck, setVideoLtbudgetcheck, DisplayLtbudgetcheck, setDisplayLtbudgetcheck,
        Audioimpressionlimitcheck, setAudioimpressionlimitcheck, Videoimpressionlimitcheck, setVideoimpressionlimitcheck,
        Displayimpressionlimitcheck, setDisplayimpressionlimitcheck, Audiostartdatecheck, setAudiostartdatecheck,
        Videostartdatecheck, setVideostartdatecheck, Displaystartdatecheck, setDisplaystartdatecheck, Audioenddatecheck, setAudioenddatecheck,
        Videoenddatecheck, setVideoenddatecheck, Displayenddatecheck, setDisplayenddatecheck, Audiostarttimecheck, setAudiostarttimecheck,
        Videostarttimecheck, setVideostarttimecheck, Displaystarttimecheck, setDisplaystarttimecheck, Audioendtimecheck, setAudioendtimecheck,
        Videoendtimecheck, setVideoendtimecheck, Displayendtimecheck, setDisplayendtimecheck, Audiocreativecheck, setAudiocreativecheck,
        Videocreativecheck, setVideocreativecheck, Displaycreativecheck, setDisplaycreativecheck, Audiosizecheck, setAudiosizecheck,
        Videosizecheck, setVideosizecheck, Displaysizecheck, setDisplaysizecheck, Audiotrackurlcheck, setAudiotrackurlcheck,
        Videotrackurlcheck, setVideotrackurlcheck, Displaytrackurlcheck, setDisplaytrackurlcheck, AudioFrequencycheck, setAudioFrequencycheck,
        VideoFrequencycheck, setVideoFrequencycheck, DisplayFrequencycheck, setDisplayFrequencycheck, AudioTimeperiodcheck, setAudioTimeperiodcheck,
        VideoTimeperiodcheck, setVideoTimeperiodcheck, DisplayTimeperiodcheck, setDisplayTimeperiodcheck, AudioRegioncheck, setAudioRegioncheck,
        VideoRegioncheck, setVideoRegioncheck, DisplayRegioncheck, setDisplayRegioncheck, Audioagecheck, setAudioagecheck,
        Videoagecheck, setVideoagecheck, Displayagecheck, setDisplayagecheck, Audiocityvalcheck, setAudiocityvalcheck,
        Videocityvalcheck, setVideocityvalcheck, Displaycityvalcheck, setDisplaycityvalcheck, Audiogendercheck, setAudiogendercheck,
        Videogendercheck, setVideogendercheck, Displaygendercheck, setDisplaygendercheck, AudioLanguagecheck, setAudioLanguagecheck,
        VideoLanguagecheck, setVideoLanguagecheck, DisplayLanguagecheck, setDisplayLanguagecheck, Audiocategorycheck, setAudiocategorycheck,
        Videocategorycheck, setVideocategorycheck, Displaycategorycheck, setDisplaycategorycheck, Audiooscheck, setAudiooscheck,
        Videooscheck, setVideooscheck, Displayoscheck, setDisplayoscheck, Audiomakemodelcheck, setAudiomakemodelcheck,
        Videomakemodelcheck, setVideomakemodelcheck, Displaymakemodelcheck, setDisplaymakemodelcheck, Audioareacheck, setAudioareacheck,
        Videoareacheck, setVideoareacheck, Displayareacheck, setDisplayareacheck, AudioPincodecheck, setAudioPincodecheck,
        VideoPincodecheck, setVideoPincodecheck, DisplayPincodecheck, setDisplayPincodecheck, audiodayscheck, setaudiodayscheck,
        videodayscheck, setvideodayscheck, displaydayscheck, setdisplaydayscheck, videotimecheck, setvideotimecheck, audiotimecheck, setaudiotimecheck,
        displaytimecheck, setdisplaytimecheck, Audioimpurlcheck, setAudioimpurlcheck, Videoimpurlcheck, setVideoimpurlcheck,
        Displayimpurlcheck, setDisplayimpurlcheck, AudioGrandCityvalcheck, setAudioGrandCityvalcheck, VideoGrandCityvalcheck, setVideoGrandCityvalcheck,
        DisplayGrandCityvalcheck, setDisplayGrandCityvalcheck,map1,Audiostrategycheck,setAudiostrategycheck,Videostrategycheck,setVideostrategycheck,
        Displaystrategycheck,setDisplaystrategycheck,Audiosubcampnamecheck,setAudiosubcampnamecheck,Videosubcampnamecheck,setVideosubcampnamecheck,Displaysubcampnamecheck,setDisplaysubcampnamecheck
    } = state

    const [error, seterror] = useState('')
    const [success, setsuccess] = useState('')
    
    const setcheck = (field) => {
        map1.set(field, !map1.get(field));
        console.log(111, field, map1.get(field))
    }


    const checkflag = () => {
        let flag = 0;
        map1.forEach((value, key) => {
            console.log(key, value)
            if (!value) {
                flag = 1;
            }
        })
        if (flag) {
            seterror("All fields must be checked to launch campaign!!")
            setsuccess("")
        } else {
            submitsubcampaign()
            seterror("")
        }
    }

    const { state1, dispatch1 } = useContext(BudgetContext)

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            margin: '1%'
            //   backgroundColor: grey,
        },
        col: {
            ".MuiListItem-root.Mui-selected:hover": { backgroundColor: 'green' }
        },
        root1: {
            maxWidth: '100%',
            border: 'none',
            //border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.secondary,
            padding: '',
            marginBottom: '1%',
            marginLeft: '1%',
            //   margin:'3%',
            '& svg': {
                margin: theme.spacing(1),
            },
            // '& hr': {
            //     margin: theme.spacing(0, 0.5),
            // },
        },
    }));
    const classes = useStyles()

    return (
        <div>
            {error ? (<Alert onClose={() => seterror("")} >{error}</Alert>) : (
                success ? (<Alert onClose={() => setsuccess("")} >{success}</Alert>) : (<React.Fragment />)
            )}
            {state1.Type.map(typ =>
                <div>

                    <h4> {typ} </h4>
                    <Grid container className={classes.root1} >
                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Strategy</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? strategy : (typ == "Video" ? strategy : strategy)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}strategy`)
                                typ == "Audio" ? setAudiostrategycheck (!Audiostrategycheck) : (typ == "Video" ? setVideostrategycheck(!Videostrategycheck) : setDisplaystrategycheck(!Displaystrategycheck))
                            }}
                            checked={typ == "Audio" ? Audiostrategycheck : (typ == "Video" ? Videostrategycheck : Displaystrategycheck)}

                            />
                        </div>
                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} > Budget </p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? AudioLtbudget : (typ == "Video" ? VideoLtbudget : DisplayLtbudget)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}budget`)
                                typ == "Audio" ? setAudioLtbudgetcheck(!AudioLtbudgetcheck) : (typ == "Video" ? setVideoLtbudgetcheck(!VideoLtbudgetcheck) : setDisplayLtbudgetcheck(!DisplayLtbudgetcheck))
                            }}
                                checked={typ == "Audio" ? AudioLtbudgetcheck : (typ == "Video" ? VideoLtbudgetcheck : DisplayLtbudgetcheck)}
                            />
                        </div>

                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Sub Campaign Name</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {state1.lineitem}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}subcampname`)
                                typ == "Audio" ? setAudiosubcampnamecheck (!Audiosubcampnamecheck) : (typ == "Video" ? setVideosubcampnamecheck(!Videosubcampnamecheck) : setDisplaysubcampnamecheck(!Displaysubcampnamecheck))
                            }
                            

                        } 
                        checked={typ == "Audio" ? Audiosubcampnamecheck : (typ == "Video" ? Videosubcampnamecheck : Displaysubcampnamecheck)}
                        />
                        </div>


                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Imp Limit</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? Audioimpressionlimit : (typ == "Video" ? Videoimpressionlimit : Displayimpressionlimit)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}implimit`)
                                typ == "Audio" ? setAudioimpressionlimitcheck(!Audioimpressionlimitcheck) : (typ == "Video" ? setVideoimpressionlimitcheck(!Videoimpressionlimitcheck) : setDisplayimpressionlimitcheck(!Displayimpressionlimitcheck))
                            }} 
                            checked={typ == "Audio" ? Audioimpressionlimitcheck : (typ == "Video" ? Videoimpressionlimitcheck : Displayimpressionlimitcheck)}
                            />
                        </div>
                    </Grid>
                    <Grid container className={classes.root1} >
                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} > Start Date</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? Audiostartdate : (typ == "Video" ? Videostartdate : Displaystartdate)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}startdate`)
                                typ == "Audio" ? setAudiostartdatecheck(!Audiostartdatecheck) : (typ == "Video" ? setVideostartdatecheck(!Videostartdatecheck) : setDisplaystartdatecheck(!Displaystartdatecheck))
                                }} 
                                checked={typ == "Audio" ? Audiostartdatecheck : (typ == "Video" ? Videostartdatecheck : Displaystartdatecheck)}
                                />
                        </div>

                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} > End Date</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? Audioenddate : (typ == "Video" ? Videoenddate : Displayenddate)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => 
                                {setcheck(`${typ}enddate`)
                                typ == "Audio" ? setAudioenddatecheck(!Audioenddatecheck) : (typ == "Video" ? setVideoenddatecheck(!Videoenddatecheck) : setDisplayenddatecheck(!Displayenddatecheck))
                            }} 
                            checked={typ == "Audio" ? Audioenddatecheck : (typ == "Video" ? Videoenddatecheck : Displayenddatecheck)}
                            />
                        </div>

                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} > Start Time</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? Audiostarttime : (typ == "Video" ? Videostarttime : Displaystarttime)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => 
                                {setcheck(`${typ}starttime`)
                                typ == "Audio" ? setAudiostarttimecheck(!Audiostarttimecheck) : (typ == "Video" ? setVideostarttimecheck(!Videostarttimecheck) : setDisplaystarttimecheck(!Displaystarttimecheck))
                                }} 
                                checked={typ == "Audio" ? Audiostarttimecheck : (typ == "Video" ? Videostarttimecheck : Displaystarttimecheck)}
                                />
                        </div>
                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} > End Time </p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? Audioendtime : (typ == "Video" ? Videoendtime : Displayendtime)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => 
                                {setcheck(`${typ}endtime`)
                                typ == "Audio" ? setAudioendtimecheck(!Audioendtimecheck) : (typ == "Video" ? setVideoendtimecheck(!Videoendtimecheck) : setDisplayendtimecheck(!Displayendtimecheck))
                                }} 
                                checked={typ == "Audio" ? Audioendtimecheck : (typ == "Video" ? Videoendtimecheck : Displayendtimecheck)}
                                />
                        </div>
                    </Grid>
                    <Grid container className={classes.root1} >
                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} > Size</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? Audiosize : (typ == "Video" ? Videosize : Displaysize)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}size`)
                                typ == "Audio" ? setAudiosizecheck(!Audiosizecheck) : (typ == "Video" ? setVideosizecheck(!Videosizecheck) : setDisplaysizecheck(!Displaysizecheck))
                                }} 
                                checked={typ == "Audio" ? Audiosizecheck : (typ == "Video" ? Videosizecheck : Displaysizecheck)}
                                />
                        </div>

                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} > TrackUrl</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? Audiotrackurl : (typ == "Video" ? Videotrackurl : Displaytrackurl)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}trackurl`)
                                typ == "Audio" ? setAudiotrackurlcheck(!Audiotrackurlcheck) : (typ == "Video" ? setVideotrackurlcheck(!Videotrackurlcheck) : setDisplaytrackurlcheck(!Displaytrackurlcheck))    
                            }} 
                            checked={typ == "Audio" ? Audiotrackurlcheck : (typ == "Video" ? Videotrackurlcheck : Displaytrackurlcheck)}
                                />
                        </div>
                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} > Creative Name </p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? Audiocreative : (typ == "Video" ? Videocreative : Displaycreative)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}creativename`)
                                typ == "Audio" ? setAudiocreativecheck(!Audiocreativecheck) : (typ == "Video" ? setVideocreativecheck(!Videocreativecheck) : setDisplaycreativecheck(!Displaycreativecheck))
                                }} 
                                checked={typ == "Audio" ? Audiocreativecheck : (typ == "Video" ? Videocreativecheck : Displaycreativecheck)}
                                />
                        </div>


                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} > Frequency</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? AudioFrequency : (typ == "Video" ? VideoFrequency : DisplayFrequency)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}frequency`)
                                typ == "Audio" ? setAudioFrequencycheck(!AudioFrequencycheck) : (typ == "Video" ? setVideoFrequencycheck(!VideoFrequencycheck) : setDisplayFrequencycheck(!DisplayFrequencycheck))
                                }} 
                                checked={typ == "Audio" ? AudioFrequencycheck : (typ == "Video" ? VideoFrequencycheck : DisplayFrequencycheck)}
                                />
                        </div>
                    </Grid>
                    <Grid container className={classes.root1} >
                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Time Period</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? AudioTimeperiod : (typ == "Video" ? VideoTimeperiod : DisplayTimeperiod)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}timeperiod`)
                                typ == "Audio" ? setAudioTimeperiodcheck(!AudioTimeperiodcheck) : (typ == "Video" ? setVideoTimeperiodcheck(!VideoTimeperiodcheck) : setDisplayTimeperiodcheck(!DisplayTimeperiodcheck))
                                }} 
                                checked={typ == "Audio" ? AudioTimeperiodcheck : (typ == "Video" ? VideoTimeperiodcheck : DisplayTimeperiodcheck)}
                                />
                        </div>

                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Region</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? AudioRegion : (typ == "Video" ? VideoRegion : DisplayRegion)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}region`)
                                typ == "Audio" ? setAudioRegioncheck(!AudioRegioncheck) : (typ == "Video" ? setVideoRegioncheck(!VideoRegioncheck) : setDisplayRegioncheck(!DisplayRegioncheck))
                                }} 
                                checked={typ == "Audio" ? AudioRegioncheck : (typ == "Video" ? VideoRegioncheck : DisplayRegioncheck)}
                                />
                        </div>


                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Age</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? Audioage : (typ == "Video" ? Videoage : Displayage)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}age`)
                                typ == "Audio" ? setAudioagecheck(!Audioagecheck) : (typ == "Video" ? setVideoagecheck(!Videoagecheck) : setDisplayagecheck(!Displayagecheck))
                                }} 
                                checked={typ == "Audio" ? Audioagecheck : (typ == "Video" ? Videoagecheck : Displayagecheck)}
                                />
                        </div>


                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >City</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? Audiocityval : (typ == "Video" ? Videocityval : Displaycityval)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}city`)
                                typ == "Audio" ? setAudiocityvalcheck(!Audiocityvalcheck) : (typ == "Video" ? setVideocityvalcheck(!Videocityvalcheck) : setDisplaycityvalcheck(!Displaycityvalcheck))
                                }} 
                                checked={typ == "Audio" ? Audiocityvalcheck : (typ == "Video" ? Videocityvalcheck : Displaycityvalcheck)}
                                />
                        </div>
                    </Grid>
                    <Grid container className={classes.root1} >
                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Gender</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? Audiogender : (typ == "Video" ? Videogender : Displaygender)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}gender`)
                                typ == "Audio" ? setAudiogendercheck(!Audiogendercheck) : (typ == "Video" ? setVideogendercheck(!Videogendercheck) : setDisplaygendercheck(!Displaygendercheck))
                                }} 
                                checked={typ == "Audio" ? Audiogendercheck : (typ == "Video" ? Videogendercheck : Displaygendercheck)}
                                />
                        </div>

                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Language</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? AudioLanguage : (typ == "Video" ? VideoLanguage : DisplayLanguage)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}language`)
                                typ == "Audio" ? setAudioLanguagecheck(!AudioLanguagecheck) : (typ == "Video" ? setVideoLanguagecheck(!VideoLanguagecheck) : setDisplayLanguagecheck(!DisplayLanguagecheck))
                                }} 
                                checked={typ == "Audio" ? AudioLanguagecheck : (typ == "Video" ? VideoLanguagecheck : DisplayLanguagecheck)}
                                />
                        </div>

                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Category</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? Audiocategory : (typ == "Video" ? Videocategory : Displaycategory)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}category`)
                                typ == "Audio" ? setAudiocategorycheck(!Audiocategorycheck) : (typ == "Video" ? setVideocategorycheck(!Videocategorycheck) : setDisplaycategorycheck(!Displaycategorycheck))
                                }} 
                                checked={typ == "Audio" ? Audiocategorycheck : (typ == "Video" ? Videocategorycheck : Displaycategorycheck)}
                                />
                        </div>

                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Operating System</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? Audioos : (typ == "Video" ? Videoos : Displayos)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}operatingsystem`)
                                typ == "Audio" ? setAudiooscheck(!Audiooscheck) : (typ == "Video" ? setVideooscheck(!Videooscheck) : setDisplayoscheck(!Displayoscheck))
                                }} 
                                checked={typ == "Audio" ? Audiooscheck : (typ == "Video" ? Videooscheck : Displayoscheck)}
                                />
                        </div>
                    </Grid>
                    <Grid container className={classes.root1} >
                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Make Model</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? Audiomakemodel : (typ == "Video" ? Videomakemodel : Displaymakemodel)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}makemodel`)
                                typ == "Audio" ? setAudiomakemodelcheck(!Audiomakemodelcheck) : (typ == "Video" ? setVideomakemodelcheck(!Videomakemodelcheck) : setDisplaymakemodelcheck(!Displaymakemodelcheck))
                                }} 
                                checked={typ == "Audio" ? Audiomakemodelcheck : (typ == "Video" ? Videomakemodelcheck : Displaymakemodelcheck)}
                                />
                        </div>

                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Area</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? Audioarea : (typ == "Video" ? Videoarea : Displayarea)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}area`)
                                typ == "Audio" ? setAudioareacheck(!Audioareacheck) : (typ == "Video" ? setVideoareacheck(!Videoareacheck) : setDisplayareacheck(!Displayareacheck))
                                }} 
                                checked={typ == "Audio" ? Audioareacheck: (typ == "Video" ? Videoareacheck : Displayareacheck)}
                                />
                        </div>

                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Pincodes (Manually)</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? AudioPincode : (typ == "Video" ? VideoPincode : DisplayPincode)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}pincode`)
                                typ == "Audio" ? setAudioPincodecheck(!AudioPincodecheck) : (typ == "Video" ? setVideoPincodecheck(!VideoPincodecheck) : setDisplayPincodecheck(!DisplayPincodecheck))
                                }} 
                                checked={typ == "Audio" ? AudioPincodecheck: (typ == "Video" ? VideoPincodecheck : DisplayPincodecheck)}
                                />
                        </div>
                    </Grid>
                    <Grid container className={classes.root1} >
                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Days</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? audiodays : (typ == "Video" ? videodays : displaydays)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}days`)
                                typ == "Audio" ? setaudiodayscheck(!audiodayscheck) : (typ == "Video" ? setvideodayscheck(!videodayscheck) : setdisplaydayscheck(!displaydayscheck))
                                }} 
                                checked={typ == "Audio" ? audiodayscheck: (typ == "Video" ? videodayscheck : displaydayscheck)}
                                />
                        </div>

                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Time</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? audiotime : (typ == "Video" ? videotime : displaytime)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}time`)
                                typ == "Audio" ? setaudiotimecheck(!audiotimecheck) : (typ == "Video" ? setvideotimecheck(!videotimecheck) : setdisplaytimecheck(!displaytimecheck))
                                }} 
                                checked={typ == "Audio" ? audiotimecheck: (typ == "Video" ? videotimecheck : displaytimecheck)}
                                />
                        </div>

                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Impression URL</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? Audioimpurl : (typ == "Video" ? Videoimpurl : Displayimpurl)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}impressionurl`)
                                typ == "Audio" ? setAudioimpurlcheck(!Audioimpurlcheck) : (typ == "Video" ? setVideoimpurlcheck(!Videoimpurlcheck) : setDisplayimpurlcheck(!Displayimpurlcheck))
                                }} 
                                checked={typ == "Audio" ? Audioimpurlcheck: (typ == "Video" ? Videoimpurlcheck : Displayimpurlcheck)}
                                />
                        </div>

                        <div className={styles.launchstyle} >
                            <div style={{ margin: '5px', maxWidth: '18%' }}><p className={styles.srtey} >Grand City</p></div>
                            <input readOnly style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} required value=
                                {typ == "Audio" ? AudioGrandCityval : (typ == "Video" ? VideoGrandCityval : DisplayGrandCityval)}
                                className={styles.inp} />
                            <input type="checkbox" style={{ maxWidth: '40%', height: '40%', marginTop: '5px' }} value="strategy" onClick={() => {
                                setcheck(`${typ}grandcity`)
                                typ == "Audio" ? setAudioGrandCityvalcheck(!AudioGrandCityvalcheck) : (typ == "Video" ? setVideoGrandCityvalcheck(!VideoGrandCityvalcheck) : setDisplayGrandCityvalcheck(!DisplayGrandCityvalcheck))
                                }} 
                                checked={typ == "Audio" ? AudioGrandCityvalcheck: (typ == "Video" ? VideoGrandCityvalcheck : DisplayGrandCityvalcheck)}
                                />
                        </div>
                    </Grid>

                </div>

            )}
            <div class={styles.svdef}>
                <button class="button-footer2" tabIndex="0" onClick={checkflag}  >Launch</button>
            </div>
        </div>

    )
}