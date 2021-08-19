import React, { useState,useContext } from 'react'
import styles from '../css/lineitem.module.css'
import { Grid, makeStyles } from '@material-ui/core'
import { BudgetContext } from '../App';

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


export const Tab3 = ({state}) => {

    const { state1, dispatch1 } = useContext(BudgetContext)
    let {Audiocreative,setAudiocreative,Videocreative,setVideocreative,Displaycreative,setDisplaycreative,
        Audiosize,setAudiosize,Videosize,setVideosize,Displaysize,setDisplaysize,Audiotrackurl,setAudiotrackurl,Videotrackurl,
        setVideotrackurl,Displaytrackurl,setDisplaytrackurl,Audiocategorytype,setAudiocategorytype,Videocategorytype,setVideocategorytype,
        Displaycategorytype,setDisplaycategorytype,AudioFileinp,setAudioFileinp,VideoFileinp,setVideoFileinp,DisplayFileinp,setDisplayFileinp, 
        AudioFileBanner,setAudioFileBanner,VideoFileBanner,setVideoFileBanner,DisplayFileBanner,setDisplayFileBanner,
        tempAudioFileinp,settempAudioFileinp,tempVideoFileinp,settempVideoFileinp,tempDisplayFileinp,settempDisplayFileinp
    }=state
    const classes = useStyles()
    
    console.log('audio',tempAudioFileinp)
    console.log(AudioFileinp.name)
    // console.log('type',state1.Type)

    

    return (
        <div>
            {state1.Type.map((typ) =>
                <Grid container className={classes.root1} >
                <div class={styles.headingsub}>
                    <h3>What do you want to name your {typ} creative? *</h3>
                </div>
                <input className="input" required value={typ === "Audio" ? Audiocreative : typ === "Video" ? Videocreative : Displaycreative} placeholder="e.g. Client / Product Name - May 2021 - 30s Creative" size="30" onChange={(e) => {
                    typ === "Audio" ? setAudiocreative(e.target.value) : (typ === "Video" ? setVideocreative(e.target.value) : setDisplaycreative(e.target.value))
                }}
                />
                <div className={styles.vftuc}  >
                    <p class={styles.srtey} >Add your {typ} file*</p>
                    <input type="file" id={`${typ}iu`} filename={`${typ}`}  hidden   //accept={typ==="Audio"?".wav,.mp3,.m4a":(typ==="Video"?".mkv":".jpg,png")}
                    onChange={e => {
                        if (typ === "Audio") {
                            setAudioFileinp(e.target.files[0]) 
                            // const formdata=new FormData()
                            // formdata.append(
                            //     "audio",
                            //     AudioFileinp,
                               
                            // )
                            
                            // settempAudioFileinp(formdata)                      
                        } else if (typ === "Video") {
                            setVideoFileinp(e.target.files[0])                           
                        } else {
                            setDisplayFileinp(e.target.files[0])
                        }


                    }}
                    // value={typ === "Audio" ? 'Audio file' : typ === "Video" ? "video file" : "Display file"}
                    />
                    <label for={`${typ}iu`} className={styles.fileinp} style={{width:'100%'}} >  { typ==="Audio"?(AudioFileinp? AudioFileinp.name:`Select ${typ} file`):(typ==="Video"?(VideoFileinp? VideoFileinp.name:`Select ${typ} file`):DisplayFileinp? DisplayFileinp.name:`Select ${typ} file`)  }  </label>
                    <p class={styles.srtey}  >Add your Banner</p>
                    <input type="file" id={`${typ}iu1`} hidden accept=".jpg,.png,.gif" onChange={(e)=>{
                        typ === "Audio" ? setAudioFileBanner(e.target.files[0]) : (typ === "Video" ? setVideoFileBanner(e.target.files[0]) : setDisplayFileBanner(e.target.files[0]))
                    }} 
                    />
                    <label for={`${typ}iu1`} className={styles.fileinp}  > { typ==="Audio"?(AudioFileBanner? AudioFileBanner.name:`Select ${typ} Banner`):(typ==="Video"?(VideoFileBanner? VideoFileBanner.name:`Select ${typ} Banner`):DisplayFileBanner? DisplayFileBanner.name:`Select ${typ} Banner`)  } </label>

                </div>

                <div className={styles.vftuc} style={{ marginLeft: '7%' }} >
                    <p className={styles.srtey} >Size </p>
                    <select className={styles.hjkk} required style={{ padding: '10px' }} value={typ === "Audio" ? Audiosize : typ === "Video" ? Videosize : Displaysize} onChange={(e) => {
                        typ === "Audio" ? setAudiosize(e.target.value) : (typ === "Video" ? setVideosize(e.target.value) : setDisplaysize(e.target.value))
                    }
                    }>
                        <option value disabled >Select Size</option>
                        <option >320x50</option>
                    </select>

                    <p className={styles.srtey} > Click Tracker Url </p>
                    <input type="url" size="90" required value={typ === "Audio" ? Audiotrackurl : typ === "Video" ? Videotrackurl : Displaytrackurl} className={styles.normalinp} onChange={(e) => {
                        typ === "Audio" ? setAudiotrackurl(e.target.value) : (typ === "Video" ? setVideotrackurl(e.target.value) : setDisplaytrackurl(e.target.value))
                    }
                    } />
                </div>
                


            </Grid>
            )}
            
            
        </div>
    )
}