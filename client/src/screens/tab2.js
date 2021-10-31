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
        padding: '0%',
        marginBottom: '1%',
        //   margin:'3%',
        '& svg': {
            margin: theme.spacing(1.5),
        },
        '& hr': {
            margin: theme.spacing(0, 0.5),
        },
    },
}));




export function Tab2({ state }) {

    const classes = useStyles()
    let { AudioLtbudget, SetAudioltbudget, VideoLtbudget, SetVideoltbudget, DisplayLtbudget, SetDisplayltbudget,
        Audioimpressionlimit, setAudioimpressionlimit, Videoimpressionlimit, setVideoimpressionlimit, Displayimpressionlimit,
        setDisplayimpressionlimit, Audiostartdate, setAudiostartdate, Videostartdate, setVideostartdate, Displaystartdate,
        setDisplaystartdate, Audioenddate, setAudioenddate, Videoenddate, setVideoenddate, Displayenddate, setDisplayenddate,
        Audiostarttime, setAudiostarttime, Videostarttime, setVideostarttime, Displaystarttime, setDisplaystarttime, Audioendtime,
        setAudioendtime, Videoendtime, setVideoendtime, Displayendtime, setDisplayendtime } = state
    const { state1, dispatch1 } = useContext(BudgetContext)
    const [cpm, setcpm] = useState({
        Audiocpm: 0,
        Videocpm: 0,
        Displaycpm: 0,
        totalcpm: 0
    });
    console.log(cpm.Audiocpm, cpm.Videocpm, cpm.Displaycpm)
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ marginRight: '20px' }}> Campaign/Lineitem :      </p>
                <p>   /  {state1.campaign}/{state1.lineitem}</p>
            </div>
            <div class={styles.futd} >
                <p style={{ fontSize: '15px' }}>This cannot exceed your campaign budget.
                    There is {state1.budget} left for this campaign. </p>
                <p className={styles.srtey} style={{ marginLeft: '50px' }} >Avg Cost Per Impression</p>

                <input style={{ marginLeft: '10px', paddingLeft: '20px' }} readOnly value={
                    Math.round((((cpm.Audiocpm + cpm.Videocpm + cpm.Displaycpm) / 3) * 100)) / 100
                }

                />
            </div>
            <div style={{ display: "flex", flexDirection: 'row', padding: '1px' }}>
                <p > Your Total Budget is : </p>
                <p style={{ marginLeft: '3px', fontWeight: 'bold' }} >{state1.budget}</p>
            </div>


            {/* Dynamic */}
            {/* {console.log('jjh', type)} */}
            {state1.Type.map((typ) =>
                <div>

                    <div className={styles.jhgft} >
                        <h2>{typ}</h2>
                    </div>
                    <Grid container className={classes.root1} >

                        {/* <Divider orientation="vertical" flexItem style={{ margin: '0px 20px' }} /> */}
                        <div className={styles.vftuc} >
                            <p class={styles.srtey} style={{ width: '50%' }}  >Sub-Campaign budget</p>
                            <input type="number" step="10" placeholder="in $" class={styles.inp} style={{ width: '40%' }} required onChange={(e) => {

                                if (typ === "Audio") {
                                    SetAudioltbudget(e.target.value);
                                    let val = Math.round((e.target.value / Audioimpressionlimit) * 100)
                                    setcpm({ Audiocpm: val / 100, Videocpm: cpm.Videocpm, Displaycpm: cpm.Displaycpm })
                                } else if (typ === "Video") {
                                    SetVideoltbudget(e.target.value);
                                    let val = Math.round((e.target.value / Videoimpressionlimit) * 100)
                                    setcpm({ Audiocpm: cpm.Audiocpm, Videocpm: val / 100, Displaycpm: cpm.Displaycpm })
                                } else {
                                    SetDisplayltbudget(e.target.value);
                                    let val = Math.round((e.target.value / Displayimpressionlimit) * 100)
                                    setcpm({ Audiocpm: cpm.Audiocpm, Videocpm: cpm.Videocpm, Displaycpm: val / 100 })
                                }
                                typ === "Audio" ? SetAudioltbudget(e.target.value) : (typ === "Video" ? SetVideoltbudget(e.target.value) : SetDisplayltbudget(e.target.value))
                            }
                            }
                                value={typ === "Audio" ? AudioLtbudget : typ === "Video" ? VideoLtbudget : DisplayLtbudget}
                            />
                        </div>
                        <div className={styles.vftuc} >
                            <p class={styles.srtey} style={{ width: '20%' }} >Impression Limit</p>
                            <input type="number" step="10" placeholder="Impression Limit" required class={styles.inp} style={{ width: '40%' }} onChange={(e) => {

                                if (typ === "Audio") {
                                    setAudioimpressionlimit(e.target.value);
                                    let val = Math.round((AudioLtbudget / e.target.value) * 100)
                                    setcpm({ Audiocpm: val / 100, Videocpm: cpm.Videocpm, Displaycpm: cpm.Displaycpm })
                                } else if (typ === "Video") {
                                    setVideoimpressionlimit(e.target.value);
                                    let val = Math.round((VideoLtbudget / e.target.value) * 100)
                                    setcpm({ Audiocpm: cpm.Audiocpm, Videocpm: val / 100, Displaycpm: cpm.Displaycpm })
                                } else {
                                    setDisplayimpressionlimit(e.target.value);
                                    let val = Math.round((DisplayLtbudget / e.target.value) * 100)
                                    setcpm({ Audiocpm: cpm.Audiocpm, Videocpm: cpm.Videocpm, Displaycpm: val / 100 })
                                }
                            }
                            }
                                value={typ === "Audio" ? Audioimpressionlimit : typ === "Video" ? Videoimpressionlimit : Displayimpressionlimit}
                            />
                        </div>
                        <div className={styles.vftuc}>
                            <p class={styles.srtey} style={{ width: '20%' }} >Start Date *</p>
                            <input type="date" placeholder="yyyy-mm-dd" class={styles.inp} style={{ width: '60%' }} required onChange={(e) => {
                                typ === "Audio" ? setAudiostartdate(e.target.value) : (typ === "Video" ? setVideostartdate(e.target.value) : setDisplaystartdate(e.target.value))
                            }
                            }
                                value={typ === "Audio" ? Audiostartdate : typ === "Video" ? Videostartdate : Displaystartdate}
                            />
                        </div>
                        <div className={styles.vftuc}>
                            <p class={styles.srtey} style={{ width: '20%' }} >End Date *</p>
                            <input type="date" placeholder="yyyy-mm-dd" class={styles.inp} required style={{ width: '60%' }} onChange={(e) => {
                                typ === "Audio" ? setAudioenddate(e.target.value) : (typ === "Video" ? setVideoenddate(e.target.value) : setDisplayenddate(e.target.value))
                            }
                            }
                                value={typ === "Audio" ? Audioenddate : typ === "Video" ? Videoenddate : Displayenddate}
                            />
                        </div>
                        <div className={styles.vftuc}>
                            <p class={styles.srtey} style={{ width: '20%' }} >Start Time </p>
                            <input type="time" step="1" placeholder="hh:mm" class={styles.inp} style={{ width: '60%' }} onChange={(e) => {
                                typ === "Audio" ? setAudiostarttime(e.target.value) : (typ === "Video" ? setVideostarttime(e.target.value) : setDisplaystarttime(e.target.value))
                            }
                            }
                                value={typ === "Audio" ? Audiostarttime : typ === "Video" ? Videostarttime : Displaystarttime}
                            />
                        </div>

                        <div className={styles.vftuc}>
                            <p class={styles.srtey} style={{ width: '20%' }} >End Time </p>
                            <input type="time" step="1" placeholder="hh:mm" class={styles.inp} style={{ width: '60%' }} onChange={(e) => {
                                typ === "Audio" ? setAudioendtime(e.target.value) : (typ === "Video" ? setVideoendtime(e.target.value) : setDisplayendtime(e.target.value))
                            }
                            }
                                value={typ === "Audio" ? Audioendtime : typ === "Video" ? Videoendtime : Displayendtime}
                            />
                        </div>
                        <div className={styles.vftuc} >
                            <p className={styles.srtey} style={{ width: '20%' }}>Cost / Imp</p>
                            <input readOnly value={
                                typ === "Audio" ? cpm.Audiocpm : (typ === "Video" ? cpm.Videocpm : cpm.Displaycpm)
                            }
                                className={styles.inp}
                                style={{ width: '40%' }}
                            />
                        </div>
                    </Grid>

                </div>



            )}


            {/* <hr class={styles.sep} /> */}

        </div>
    )

}