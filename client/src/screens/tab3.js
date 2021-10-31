import React, { useState, useContext } from 'react'
import styles from '../css/lineitem.module.css'
import { Grid, makeStyles } from '@material-ui/core'
import { BudgetContext } from '../App';
import { Alert } from '@material-ui/lab'
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
        padding: '0.8%',
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


export const Tab3 = ({ state }) => {

    const { state1, dispatch1 } = useContext(BudgetContext)
    let { Audiocreative, setAudiocreative, Videocreative, setVideocreative, Displaycreative, setDisplaycreative,
        Audiosize, setAudiosize, Videosize, setVideosize, Displaysize, setDisplaysize, Audiotrackurl, setAudiotrackurl, Videotrackurl,
        setVideotrackurl, Displaytrackurl, setDisplaytrackurl, Audiocategorytype, setAudiocategorytype, Videocategorytype, setVideocategorytype,
        Displaycategorytype, setDisplaycategorytype, AudioFileinp, setAudioFileinp, VideoFileinp, setVideoFileinp, DisplayFileinp, setDisplayFileinp,
        AudioFileBanner, setAudioFileBanner, VideoFileBanner, setVideoFileBanner, DisplayFileBanner, setDisplayFileBanner,
        tempAudioFileinp, settempAudioFileinp, tempVideoFileinp, settempVideoFileinp, tempDisplayFileinp, settempDisplayFileinp,
        Audioimpurl,setAudioimpurl,Videoimpurl,setVideoimpurl,Displayimpurl,setDisplayimpurl
    } = state
    const [error,seterror]=useState("")
    const classes = useStyles()

    console.log('audio', tempAudioFileinp)
    console.log(AudioFileinp.name)
    // console.log('type',state1.Type)



    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ marginRight: '20px' }}> Campaign/Lineitem :      </p>
                <p>   /  {state1.campaign}/{state1.lineitem}</p>
            </div>
            {error?(<Alert onClose={()=>seterror("")} >{error}</Alert>):(
            <React.Fragment />
          )}
            {state1.Type.map((typ) =>
                <Grid container className={classes.root1} >
                    
                    <div class={styles.headingsub}>
                        <h3>What do you want to name your {typ} creative? *</h3>
                    </div>
                    <input className="input" required style={{marginBottom:'15px'}} value={typ === "Audio" ? Audiocreative : typ === "Video" ? Videocreative : Displaycreative} placeholder="e.g. Client / Product Name - May 2021 - 30s Creative" size="30" onChange={(e) => {
                        typ === "Audio" ? setAudiocreative(e.target.value) : (typ === "Video" ? setVideocreative(e.target.value) : setDisplaycreative(e.target.value))
                    }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'row' }}  >
                        <div style={{ marginTop: '10px',  maxWidth: '30%',marginLeft:'10px' }} ><p class={styles.srtey}  >Add your {typ} file*</p></div>
                        <input type="file" id={`${typ}iu`} filename={`${typ}`} hidden   //accept={typ==="Audio"?".wav,.mp3,.m4a":(typ==="Video"?".mkv":".jpg,png")}
                            onChange={e => {
                                if (typ === "Audio") {
                                    debugger
                                    console.log((e.target.files))
                                    let reg=new RegExp(state1.lineitem)
                                    let ismatch
                                    if(e.target.files[0].name){
                                        ismatch=e.target.files[0].name.match(reg,'ig')
                                        if(!ismatch){
                                            seterror("File name doesn't match with subcampaign name!")
                                            setAudioFileinp({})
                                        }else{
                                            setAudioFileinp(e.target.files[0])
                                        }
                                    }else{
                                        seterror("Something wrong select file again!")
                                    }
                                    
                                    debugger
                                    
                                    
                                } else if (typ === "Video") {
                                    let reg=new RegExp(state1.lineitem)
                                    let ismatch
                                    if(e.target.files[0].name){
                                        ismatch=e.target.files[0].name.match(reg,'ig')
                                        if(!ismatch){
                                            seterror("File name doesn't match with subcampaign name!")
                                            setVideoFileinp({})
                                        }else{
                                            setVideoFileinp(e.target.files[0])
                                        }
                                    }else{
                                        seterror("Something wrong select file again!")
                                    }
                                } else {
                                    let reg=new RegExp(state1.lineitem)
                                    let ismatch
                                    if(e.target.files[0].name){
                                        ismatch=e.target.files[0].name.match(reg,'ig')
                                        if(!ismatch){
                                            seterror("File name doesn't match with subcampaign name!")
                                            setDisplayFileinp({})
                                        }else{
                                            setDisplayFileinp(e.target.files[0])
                                        }
                                    }else{
                                        seterror("Something wrong select file again!")
                                    }
                                }
                            }}
                        />
                        <label for={`${typ}iu`} className={styles.fileinp} style={{ maxWidth: '40%', maxHeight: '70%', margin: '10px' }} >  {typ === "Audio" ? (AudioFileinp.name ? AudioFileinp.name:`Select ${typ} file` ) : (typ === "Video" ? (VideoFileinp.name ?VideoFileinp.name: `Select ${typ} file`) : DisplayFileinp.name? DisplayFileinp.name:`Select ${typ} file` )}  </label>
                        </div>
                        {(typ === "Audio" || typ === "Display") ?
                                <div style={{ display: 'flex', flexDirection: 'row' }} >
                                <div style={{ marginTop:'10px',width: '30%',marginLeft:'-20px' }} ><p class={styles.srtey}  >Add your Banner</p></div>
                                <input type="file" id={`${typ}iu1`} hidden accept=".jpg,.png,.gif" onChange={(e) => {
                                    typ === "Audio" ? setAudioFileBanner(e.target.files[0]) : (typ === "Video" ? setVideoFileBanner(e.target.files[0]) : setDisplayFileBanner(e.target.files[0]))
                                }}
                                />
                                <label for={`${typ}iu1`} className={styles.fileinp} style={{ width: '40%', height: '70%', margin: '10px' }} > {typ === "Audio" ? (AudioFileBanner.name ? AudioFileBanner.name : `Select Banner`) : (typ === "Video" ? (VideoFileBanner.name ? VideoFileBanner.name : `Select Banner`) : DisplayFileBanner.name ? DisplayFileBanner.name : `Select Banner`)} </label>
                            </div>

                            : <></>}
                        <div style={{ display: 'flex', flexDirection: 'row' }} >
                        <div style={{ marginTop: '10px', width: '30%' ,marginLeft:'-20px'}}><p className={styles.srtey} >Size </p></div>
                        <select required style={{ width: '80%', height: '60%', marginTop: '10px' }} value={typ === "Audio" ? Audiosize : typ === "Video" ? Videosize : Displaysize} onChange={(e) => {
                            typ === "Audio" ? setAudiosize(e.target.value) : (typ === "Video" ? setVideosize(e.target.value) : setDisplaysize(e.target.value))
                        }
                        }>
                            <option value disabled >Select Size</option>
                            <option >300x250</option>
                            <option >320x480</option>
                            <option >1280x1920</option>
                        </select>

                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'row' }} >
                        <div style={{ margin: '10px', width: '30%' }}><p className={styles.srtey} > Click Tracker Url </p></div>
                        <input type="url" style={{ width: '40%', height: '40%', marginTop: '10px' }} required value={typ === "Audio" ? Audiotrackurl : typ === "Video" ? Videotrackurl : Displaytrackurl} className={styles.inp} onChange={(e) => {
                            typ === "Audio" ? setAudiotrackurl(e.target.value) : (typ === "Video" ? setVideotrackurl(e.target.value) : setDisplaytrackurl(e.target.value))
                        }
                        } />
                        </div>
                        
                    <div style={{ display: 'flex', flexDirection: 'row' }} >

                        <div style={{ width: '30%',margin:'10px',marginLeft:'-30px' }}><p className={styles.srtey} > Impression Url </p></div>
                        <input type="url" style={{ width: '40%', height: '40%', marginTop: '10px' }} required value={typ === "Audio" ? Audioimpurl : typ === "Video" ? Videoimpurl : Displayimpurl} className={styles.inp} onChange={(e) => {
                            typ === "Audio" ? setAudioimpurl(e.target.value) : (typ === "Video" ? setVideoimpurl(e.target.value) : setDisplayimpurl(e.target.value))
                        }
                        } />
                    </div>




                </Grid>
            )}


        </div>
    )
}


