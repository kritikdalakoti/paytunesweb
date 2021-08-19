import React, { useState, useContext } from "react";
import { makeStyles, Divider, Grid } from '@material-ui/core'
import { BudgetContext } from '../App'
import styles from '../css/lineitem.module.css'

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




export function Tab2({state}) {

    const classes = useStyles()
    let {AudioLtbudget,SetAudioltbudget,VideoLtbudget,SetVideoltbudget,DisplayLtbudget,SetDisplayltbudget,
        Audioimpressionlimit,setAudioimpressionlimit,Videoimpressionlimit,setVideoimpressionlimit,Displayimpressionlimit,
        setDisplayimpressionlimit,Audiostartdate,setAudiostartdate,Videostartdate,setVideostartdate,Displaystartdate,
        setDisplaystartdate,Audioenddate,setAudioenddate,Videoenddate,setVideoenddate,Displayenddate,setDisplayenddate,
        Audiostarttime,setAudiostarttime,Videostarttime,setVideostarttime,Displaystarttime,setDisplaystarttime,Audioendtime,
        setAudioendtime,Videoendtime,setVideoendtime,Displayendtime,setDisplayendtime}=state
    const { state1, dispatch1 } = useContext(BudgetContext)
    // const [AudioLtbudget, SetAudioltbudget] = useState(0)
    // const [VideoLtbudget, SetVideoltbudget] = useState(0)
    // const [DisplayLtbudget, SetDisplayltbudget] = useState(0)
    // const [Audioimpressionlimit, setAudioimpressionlimit] = useState(0)
    // const [Videoimpressionlimit, setVideoimpressionlimit] = useState(0)
    // const [Displayimpressionlimit, setDisplayimpressionlimit] = useState(0)
    // const [Audiostartdate, setAudiostartdate] = useState(null)
    // const [Videostartdate, setVideostartdate] = useState(null)
    // const [Displaystartdate, setDisplaystartdate] = useState(null)
    // const [Audioenddate, setAudioenddate] = useState(null)
    // const [Videoenddate, setVideoenddate] = useState(null)
    // const [Displayenddate, setDisplayenddate] = useState(null)
    // const [Audiostarttime, setAudiostarttime] = useState(null)
    // const [Videostarttime, setVideostarttime] = useState(null)
    // const [Displaystarttime, setDisplaystarttime] = useState(null)
    // const [Audioendtime, setAudioendtime] = useState(null)
    // const [Videoendtime, setVideoendtime] = useState(null)
    // const [Displayendtime, setDisplayendtime] = useState(null)
    return (
        <div>
            <div class={styles.futd} >
                <p style={{ fontSize: '20px' }}>This cannot exceed your campaign budget.
                    There is {state1.budget} left for this campaign. </p>
            </div>
            <p > Your Total Budget is : </p><h2 style={{ marginBottom: '1%' }}>{state1.budget}</h2>

            {/* Dynamic */}
            {/* {console.log('jjh', type)} */}
            {state1.Type.map((typ) =>

                <Grid container className={classes.root1} >
                    <div className={styles.jhgft} >
                        <h2>{typ}</h2>
                    </div>
                    <Divider orientation="vertical" flexItem style={{ margin: '0px 40px' }} />
                    <div className={styles.vftuc} >
                        <p class={styles.srtey} >Set Sub-Campaign budget *</p>
                        <input type="number" max="200" step="0.1" placeholder="in $" class={styles.inp} required onChange={(e) => {
                            typ === "Audio" ? SetAudioltbudget(e.target.value) : (typ === "Video" ? SetVideoltbudget(e.target.value) : SetDisplayltbudget(e.target.value))
                        }
                        }
                            value={typ === "Audio" ? AudioLtbudget : typ === "Video" ? VideoLtbudget : DisplayLtbudget}
                        />
                        <p class={styles.srtey} >Set Your Impression Limit *</p>
                        <input type="number" max="200" step="10" placeholder="Set Impression Limit" required class={styles.inp} onChange={(e) => {
                            typ === "Audio" ? setAudioimpressionlimit(e.target.value) : (typ === "Video" ? setVideoimpressionlimit(e.target.value) : setDisplayimpressionlimit(e.target.value))
                        }
                        }
                            value={typ === "Audio" ? Audioimpressionlimit : typ === "Video" ? Videoimpressionlimit : Displayimpressionlimit}
                        />
                    </div>
                    <Divider orientation="vertical" flexItem style={{ margin: '0px 40px' }} />
                    <div className={styles.tucker}>
                        <p class={styles.srtey} >Start Date *</p>
                        <input type="date" placeholder="yyyy-mm-dd" class={styles.inp} required onChange={(e) => {
                            typ === "Audio" ? setAudiostartdate(e.target.value) : (typ === "Video" ? setVideostartdate(e.target.value) : setDisplaystartdate(e.target.value))
                        }
                        }
                            value={typ === "Audio" ? Audiostartdate : typ === "Video" ? Videostartdate : Displaystartdate}
                        />
                        <p class={styles.srtey} >Start Time </p>
                        <input type="time" step="1" placeholder="hh:mm" class={styles.inp} onChange={(e) => {
                            typ === "Audio" ? setAudiostarttime(e.target.value) : (typ === "Video" ? setVideostarttime(e.target.value) : setDisplaystarttime(e.target.value))
                        }
                        }
                            value={typ === "Audio" ? Audiostarttime : typ === "Video" ? Videostarttime : Displaystarttime}
                        />
                    </div>
                    <div style={{ display: 'block' }}>
                        <p class={styles.srtey} >End Date *</p>
                        <input type="date" placeholder="yyyy-mm-dd" class={styles.inp} required onChange={(e) => {
                            typ === "Audio" ? setAudioenddate(e.target.value) : (typ === "Video" ? setVideoenddate(e.target.value) : setDisplayenddate(e.target.value))
                        }
                        }
                            value={typ === "Audio" ? Audioenddate : typ === "Video" ? Videoenddate : Displayenddate}
                        />
                        <p class={styles.srtey} >End Time </p>
                        <input type="time" step="1" placeholder="hh:mm" class={styles.inp} onChange={(e) => {
                            typ === "Audio" ? setAudioendtime(e.target.value) : (typ === "Video" ? setVideoendtime(e.target.value) : setDisplayendtime(e.target.value))
                        }
                        }
                            value={typ === "Audio" ? Audioendtime : typ === "Video" ? Videoendtime : Displayendtime}
                        />
                    </div>
                </Grid>


            )}


            {/* <hr class={styles.sep} /> */}
            
        </div>
    )

}