import { Grid, makeStyles, Select, MenuItem } from '@material-ui/core'
import React, { useState, useContext } from 'react'
import { data, region, ages, language, Category_List, MakeModel, grandcity_data, days, time } from '../utils/state';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { BudgetContext } from '../App'

const styles = require('../css/lineitem.module.css')





const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '1%'
        //   backgroundColor: grey,
    },
    col:{
        ".MuiListItem-root.Mui-selected:hover":{backgroundColor:'green'}
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
        // '& hr': {
        //     margin: theme.spacing(0, 0.5),
        // },
    },
}));

export function Tab4({ state }) {


    let { AudioFrequency, setAudioFrequency, VideoFrequency, setVideoFrequency, DisplayFrequency, setDisplayFrequency,
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
        AudioPincode, setAudioPincode, VideoPincode, setVideoPincode, DisplayPincode, setDisplayPincode,
        Audiocheck, setAudiocheck, Videocheck, setVideocheck, Displaycheck, setDisplaycheck,
        AudioPincodeFile, setAudioPincodeFile, VideoPincodeFile, setVideoPincodeFile, DisplayPincodeFile, setDisplayPincodeFile,
        AudioGrandCityval, setAudioGrandcityval, VideoGrandCityval, setVideoGrandcityval, DisplayGrandCityval, setDisplayGrandcityval
        , audiodays, setaudiodays, videodays, setvideodays, displaydays, setdisplaydays, audiotime, setaudiotime,
        videotime, setvideotime, displaytime, setdisplaytime
    } = state
    const { state1, dispatch1 } = useContext(BudgetContext)
    
    const setdata = (reg, type) => {
        let res = []
        let resp = []
        reg.map(r => {
            res = data.filter((city) => city._id.state === r)
            let resp1 = [...new Set(res[0].city)]
            resp = resp.concat(resp1)
        })
        // let result=[...new Set(resp[0].city)]
        type === "Audio" ? setAudiocity(resp) : (type === "Video" ? setVideocity(resp) : setDisplaycity(resp))
        console.log('aud', AudioCity, 'vid', VideoCity, 'dis', DisplayCity)
    }

    
    const classes = useStyles()
    return (
        <div>

            {state1.Type.map((typ) =>
                <Grid container className={classes.root1} >
                    <div  >
                        <h2>{typ}</h2>
                    </div>

                    <div className={styles.row_dis} >
                        <div className={styles.vftuc1}>
                            <p className={styles.srtey} style={{ textAlign: 'left' }} >Frequency Cap </p>
                            <input placeholder="Set Frequency" type="number" step="1" className={styles.inp} onChange={e => {
                                typ === "Audio" ? setAudioFrequency(e.target.value) : (typ === "Video" ? setVideoFrequency(e.target.value) : setDisplayFrequency(e.target.value))
                            }}
                                value={typ === "Audio" ? AudioFrequency : typ === "Video" ? VideoFrequency : DisplayFrequency}
                            />
                        </div>
                        <div className={styles.vftuc1} >
                            <p className={styles.srtey} style={{ textAlign: 'left' }} >Time Period </p>
                            <select className={styles.hjkk} style={{ padding: '10px' }} onChange={e => {
                                typ === "Audio" ? setAudiotimeperiod(e.target.value) : (typ === "Video" ? setVideotimeperiod(e.target.value) : setDisplaytimeperiod(e.target.value))
                            }}
                                value={typ === "Audio" ? AudioTimeperiod : typ === "Video" ? VideoTimeperiod : DisplayTimeperiod} >
                                <option>Minute</option>
                                <option>Hour</option>
                                <option>Day</option>
                                <option>Week</option>
                                <option>30 day</option>
                            </select>
                        </div>
                        <div className={styles.vftuc_sub} >
                            <p className={styles.srtey} style={{ textAlign: 'left' }} >Do you want your Sub-Campaign active now? </p>
                            <div class="radio-toolbar1" onChange={e => {
                                typ === "Audio" ? setAudioActive(e.target.value) : (typ === "Video" ? setVideoActive(e.target.value) : setDisplayActive(e.target.value))
                            }}
                                value={typ === "Audio" ? Audioactive : typ === "Video" ? Videoactive : Displayactive}  >

                                <input type="radio" id={`active${typ}`} name={`Active${typ}`} value="true" checked={typ === "Audio" ? Audioactive === "true" ? true : false : (typ === "Video" ? Videoactive === "true" ? true : false : Displayactive === "true" ? true : false)} />
                                <label for={`active${typ}`} style={{ padding: '10px 10px', width: '20%' }} >Yes</label>

                                <input type="radio" id={`inActive${typ}`} name={`Active${typ}`} value="false" checked={typ === "Audio" ? Audioactive === "false" ? true : false : (typ === "Video" ? Videoactive === "false" ? true : false : Displayactive === "false" ? true : false)} />
                                <label for={`inActive${typ}`} style={{ padding: '10px 10px', width: '20%' }} >No</label>

                            </div>
                        </div>

                    </div>
                    {/* {console.log(check)} */}
                    {/* <div style={{display:'flex',flexDirection:'column'}} > */}
                    <div className={styles.head}  >
                        <p>Location *</p>
                    </div>
                    {/*  */}
                    <div className={styles.row_dis}  style={{ padding: '10px' }} >
                        <button class="button-footer2" tabIndex="0" type="button" style={{ marginRight: '40px', marginLeft: '140px', padding: '20px 40px 20px 40px' }} onClick={() =>
                            typ === "Audio" ? setAudiocheck(1) : (typ === "Video" ? setVideocheck(1) : setDisplaycheck(1))
                        } >Pincode Upload</button>
                        <button class="button-footer2" tabIndex="0" type="button" style={{ marginLeft: '140px', padding: '20px 40px 20px 40px' }} onClick={() =>
                            typ === "Audio" ? setAudiocheck(2) : (typ === "Video" ? setVideocheck(2) : setDisplaycheck(2))
                        }>Manual Region Upload</button>
                    </div>

                    {(typ === "Audio" ? Audiocheck === 1 ? true : false : typ === "Video" ? Videocheck === 1 ? true : false : Displaycheck === 1 ? true : false) ?
                        <div className={styles.row_dis} >
                            <div className={styles.vftuc1} style={{ marginLeft: '10%' }} >
                                <p className={styles.srtey} >Enter Pincodes </p>
                                <input className={styles.inp_sub} type="text" placeholder="Comma seperated" onChange={e =>
                                    typ === "Audio" ? setAudioPincode(e.target.value) : (typ === "Video" ? setVideoPincode(e.target.value) : setDisplayPincode(e.target.value))
                                }
                                    value={typ === "Audio" ? AudioPincode : typ === "Video" ? VideoPincode : DisplayPincode}
                                />
                            </div>



                            <h4 style={{ margin: '95px 60px 0px 110px' }} >OR</h4>
                            <div className={styles.vftuc_sub} >
                                <p class={styles.srtey} >Upload Pincode File</p>
                                <input type="file" id={`${typ}iu`} hidden accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={e =>
                                        typ === "Audio" ? setAudioPincodeFile(e.target.files[0]) : (typ === "Video" ? setVideoPincodeFile(e.target.files[0]) : setDisplayPincodeFile(e.target.files[0]))
                                    }
                                />
                                <label for={`${typ}iu`} className={styles.fileinp}  >{typ === "Audio" ? (AudioPincodeFile ? AudioPincodeFile.name : `Select File`) : (typ === "Video" ? (VideoPincodeFile ? VideoPincodeFile.name : `Select File`) : DisplayPincodeFile ? DisplayPincodeFile.name : `Select File`)}</label>
                            </div>
                            <div  >

                            </div>
                        </div>
                        : (typ === "Audio" ? Audiocheck === 2 ? true : false : typ === "Video" ? Videocheck === 2 ? true : false : Displaycheck === 2 ? true : false) ?
                            <div  >
                                <div className={styles.row_dis} >
                                    <div className={styles.vftuc1} style={{ marginRight: '10%' }} >
                                        <p className={styles.srtey} style={{ textAlign: 'left' }} >Region </p>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={Region}
                                            multiple
                                            className={classes.col}
                                            
                                            style={{ padding: '10px', width: '400px' }}
                                            onChange={e => {
                                                if (typ === "Audio") {
                                                    setAudioregion(e.target.value)
                                                    setdata(e.target.value, typ)
                                                } else if (typ === "Video") {
                                                    setVideoregion(e.target.value)
                                                    setdata(e.target.value, typ)
                                                } else {
                                                    setDisplayregion(e.target.value)
                                                    setdata(e.target.value, typ)
                                                }


                                            }}
                                            value={typ === "Audio" ? AudioRegion : typ === "Video" ? VideoRegion : DisplayRegion}
                                        >
                                            {region.map(reg =>
                                                <MenuItem  value={`${reg}`}>{reg}</MenuItem>
                                            )}

                                        </Select>

                                    </div>
                                    <div className={styles.vftuc1} style={{ marginLeft: '10%' }} >
                                        <p className={styles.srtey} style={{ textAlign: 'left' }} >Grand City</p>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={cityval}
                                            multiple
                                            className={styles.hjkk}
                                            style={{ padding: '10px', width: '400px' }}
                                            onChange={e => {
                                                typ === "Audio" ? setAudioGrandcityval(e.target.value) : (typ === "Video" ? setVideoGrandcityval(e.target.value) : setDisplayGrandcityval(e.target.value))
                                            }}
                                            value={typ === "Audio" ? AudioGrandCityval : typ === "Video" ? VideoGrandCityval : DisplayGrandCityval}
                                        >

                                            {grandcity_data.map(reg =>
                                                <MenuItem value={`${reg._id}`}>{reg._id}</MenuItem>
                                            )}

                                        </Select>

                                    </div>
                                </div>

                                <div className={styles.row_dis} >
                                    <div className={styles.vftuc1} style={{ marginRight: '10%' }} >
                                        <p className={styles.srtey} style={{ textAlign: 'left' }} >City</p>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={cityval}
                                            multiple
                                            className={styles.hjkk}
                                            style={{ padding: '10px', width: '400px' }}
                                            onChange={e => {
                                                typ === "Audio" ? setAudiocityval(e.target.value) : (typ === "Video" ? setVideocityval(e.target.value) : setDisplaycityval(e.target.value))
                                            }}
                                            value={typ === "Audio" ? Audiocityval : typ === "Video" ? Videocityval : Displaycityval}
                                        >

                                            {(typ === "Audio" ? AudioCity : typ === "Video" ? VideoCity : DisplayCity).map(reg =>
                                                <MenuItem value={`${reg}`}>{reg}</MenuItem>
                                            )}

                                        </Select>

                                    </div>
                                    <div className={styles.vftuc1} style={{ marginLeft: '10%' }} >
                                        <p className={styles.srtey} style={{ textAlign: 'left' }} >Area </p>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={Region}
                                            multiple
                                            className={styles.hjkk}
                                            style={{ padding: '10px', width: '400px' }}
                                            onChange={e => {
                                                typ === "Audio" ? setAudioarea(e.target.value) : (typ === "Video" ? setVideoarea(e.target.value) : setDisplayarea(e.target.value))
                                            }}
                                            value={typ === "Audio" ? Audioarea : typ === "Video" ? Videoarea : Displayarea}
                                        >
                                            <MenuItem value="Urban">Urban</MenuItem>
                                            <MenuItem value="Rural">Rural</MenuItem>

                                        </Select>
                                    </div>
                                </div>
                            </div>
                            :
                            <></>}

                    <div style={{ marginTop: '10px' }} >
                        <div className={styles.head} style={{ marginLeft: '-77%' }} >
                            <p>Demographic *</p>
                        </div>

                        <div className={styles.row_dis}  >

                            <div className={styles.vftuc1} style={{ marginRight: '10%' }} >
                                <p className={styles.srtey} style={{ textAlign: 'left' }} >Age </p>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    multiple
                                    className={styles.hjkk}
                                    style={{ padding: '10px', width: '400px' }}
                                    onChange={e => {
                                        typ === "Audio" ? setAudioage(e.target.value) : (typ === "Video" ? setVideoage(e.target.value) : setDisplayage(e.target.value))
                                    }}
                                    value={typ === "Audio" ? Audioage : typ === "Video" ? Videoage : Displayage}
                                >
                                    {ages.map(reg =>
                                        <MenuItem value={`${reg}`}>{reg}</MenuItem>
                                    )}

                                </Select>
                                {/* <select  className={styles.hjkk} style={{padding:'10px',width:'300%'}} onChange={(e)=>{
        setage(e.target.value) 
        } 
         } value={age} >
            <option value disabled >Select Age</option>
            {ages.map((reg)=>
            <option>{reg}</option>
            )}
        </select> */}
                            </div>
                            <div className={styles.vftuc1} style={{ marginLeft: '10%' }} >
                                <p className={styles.srtey} style={{ textAlign: 'left' }} >Gender</p>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={gender}
                                    multiple
                                    className={styles.hjkk}
                                    style={{ padding: '10px', width: '400px' }}
                                    onChange={e => {
                                        typ === "Audio" ? setAudiogender(e.target.value) : (typ === "Video" ? setVideogender(e.target.value) : setDisplaygender(e.target.value))
                                    }}
                                    value={typ === "Audio" ? Audiogender : typ === "Video" ? Videogender : Displaygender}
                                // onChange={handleChange4}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>

                                </Select>
                                {/* <select  className={styles.hjkk} style={{padding:'10px',width:'130%'}} value={gender} onChange={(e)=>setgender(e.target.value)} >
            <option value disabled >Select Gender</option>
            <option value="male" >Male</option>
            <option value="female" >Female</option>
        </select> */}
                            </div>
                        </div>
                    </div>
                    <div className={styles.vftuc1} >

                        <div className={styles.lis} onClick={() =>
                            typ === "Audio" ? setAudioisadvanced(!Audioisadvanced) : (typ === "Video" ? setVideoisadvanced(!Videoisadvanced) : setDisplayisadvanced(!Displayisadvanced))}
                        >
                            <ArrowRightIcon style={{ cursor: 'pointer' }} />
                            <p style={{ fontSize: '25px', fontWeight: 'bold' }} >Advanced Targetting</p>
                        </div>
                        {(typ === "Audio" ? Audioisadvanced : typ === "Video" ? Videoisadvanced : Displayisadvanced) ?
                            <div>
                                <div className={styles.head} >
                                    <p style={{ textAlign: 'left' }} > Publisher </p>
                                </div>
                                <div className={styles.row_dis} >
                                    <div className={styles.vftuc1} style={{ marginRight: '10%' }} >
                                        <p className={styles.srtey} style={{ textAlign: 'left' }} >Language </p>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={Language}
                                            multiple
                                            className={styles.hjkk}
                                            style={{ padding: '10px', width: '400px' }}
                                            onChange={e => {
                                                typ === "Audio" ? setAudioLanguage(e.target.value) : (typ === "Video" ? setVideoLanguage(e.target.value) : setDisplayLanguage(e.target.value))
                                            }}
                                            value={typ === "Audio" ? AudioLanguage : typ === "Video" ? VideoLanguage : DisplayLanguage}
                                        >
                                            {language.map(reg =>
                                                <MenuItem value={`${reg.language}`}>{reg.language}</MenuItem>
                                            )}

                                        </Select>

                                    </div>
                                    <div className={styles.vftuc1} style={{ marginLeft: '10%' }} >
                                        <p className={styles.srtey} style={{ textAlign: 'left' }} >Category</p>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={category}
                                            multiple
                                            className={styles.hjkk}
                                            style={{ padding: '10px', width: '400px' }}
                                            onChange={e => {
                                                typ === "Audio" ? setAudiocategory(e.target.value) : (typ === "Video" ? setVideocategory(e.target.value) : setDisplaycategory(e.target.value))
                                            }}
                                            value={typ === "Audio" ? Audiocategory : typ === "Video" ? Videocategory : Displaycategory}
                                        >
                                            {Category_List.map(reg =>
                                                <MenuItem value={`${reg._id}`}>{reg._id}-{reg.name}</MenuItem>
                                            )}
                                        </Select>

                                    </div>
                                </div>
                                <div className={styles.head} >
                                    <p style={{ textAlign: 'left' }} > Device </p>
                                </div>
                                <div className={styles.row_dis} >
                                    <div className={styles.vftuc1} style={{ marginRight: '10%' }} >
                                        <p className={styles.srtey} style={{ textAlign: 'left' }} >Operating System </p>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={os}
                                            multiple
                                            className={styles.hjkk}
                                            style={{ padding: '10px', width: '400px' }}
                                            onChange={e => {
                                                typ === "Audio" ? setAudioos(e.target.value) : (typ === "Video" ? setVideoos(e.target.value) : setDisplayos(e.target.value))
                                            }}
                                            value={typ === "Audio" ? Audioos : typ === "Video" ? Videoos : Displayos}
                                        >
                                            <MenuItem value='Android'>Android</MenuItem>
                                            <MenuItem value='Apple IOS'>Apple IOS</MenuItem>

                                        </Select>

                                    </div>
                                    <div className={styles.vftuc1} style={{ marginLeft: '10%' }} >
                                        <p className={styles.srtey} style={{ textAlign: 'left' }} >Device Model</p>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={makemodel}
                                            multiple
                                            className={styles.hjkk}
                                            style={{ padding: '10px', width: '400px' }}
                                            onChange={e => {
                                                typ === "Audio" ? setAudioMakemodel(e.target.value) : (typ === "Video" ? setVideoMakemodel(e.target.value) : setDisplayMakemodel(e.target.value))
                                            }}
                                            value={typ === "Audio" ? Audiomakemodel : typ === "Video" ? Videomakemodel : Displaymakemodel}
                                        >
                                            {MakeModel.map(reg =>
                                                <MenuItem value={`${reg._id}`}>{reg._id}</MenuItem>
                                            )}
                                        </Select>

                                    </div>
                                </div>
                                <div className={styles.head} >
                                    <p style={{ textAlign: 'left' }} > Day And Time </p>
                                </div>
                                <div className={styles.row_dis} >
                                    <div className={styles.vftuc1} style={{ marginRight: '10%' }} >
                                        <p className={styles.srtey} style={{ textAlign: 'left' }} >Day of Week </p>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={os}
                                            multiple
                                            className={styles.hjkk}
                                            style={{ padding: '10px', width: '400px' }}
                                            onChange={e => {
                                                typ === "Audio" ? setaudiodays(e.target.value) : (typ === "Video" ? setvideodays(e.target.value) : setdisplaydays(e.target.value))
                                            }}
                                            value={typ === "Audio" ? audiodays : typ === "Video" ? videodays : displaydays}
                                        >
                                            {days.map(reg =>
                                                <MenuItem value={`${reg}`}>{reg}</MenuItem>
                                            )}

                                        </Select>

                                    </div>
                                    <div className={styles.vftuc1} style={{ marginLeft: '10%' }} >
                                        <p className={styles.srtey} style={{ textAlign: 'left' }} >Time Of Day</p>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={makemodel}
                                            multiple
                                            className={styles.hjkk}
                                            style={{ padding: '10px', width: '400px' }}
                                            onChange={e => {
                                                typ === "Audio" ? setaudiotime(e.target.value) : (typ === "Video" ? setvideotime(e.target.value) : setdisplaytime(e.target.value))
                                            }}
                                            value={typ === "Audio" ? audiotime : typ === "Video" ? videotime : displaytime}
                                        >
                                            {time.map(reg =>
                                                <MenuItem value={`${reg}`}>{reg}</MenuItem>
                                            )}
                                        </Select>

                                    </div>
                                </div>
                            </div>
                            :
                            <></>
                        }
                    </div>


                </Grid>
            )}

            <hr class={styles.sep} />
            {/* <div class={styles.svdef}>
                <button class="button-footer2" tabIndex="0" type="submit" >Launch</button>
            </div> */}
        </div>

    )


}
