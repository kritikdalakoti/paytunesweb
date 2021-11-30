import React, { useState, useContext, useEffect } from 'react'
import { Paper, Select, MenuItem, Slider } from '@material-ui/core'
import '../css/popup.css'
import { ages } from '../utils/state'
import DoneIcon from '@material-ui/icons/Done'
import BlockIcon from '@material-ui/icons/Block';
import CancelIcon from '@material-ui/icons/Cancel'
import { region } from '../utils/state'
import { MainContext } from '../App'
import { useDispatch } from 'react-redux'
import mainaction from '../redux/actions/main'



export default function Geography({ state }) {

    let { geography, setgeography, setOpen } = state
    console.log(geography)
    // const { statemain, dispatchmain } = useContext(MainContext)
    const dispatch = useDispatch()
    const [geo, setgeo] = useState({ pin: { selected: '', blocked: '', fileinp: "" }, region: '' });
    const [results, setresults] = useState([])
    const [Selected, setselected] = useState({ reg: { selected: [], notselected: [] }, pin: [] });

    const handleregionchange = (e) => {
        setgeo({ region: e.target.value, pin: geo.pin })
        if (e.target.value === "") {
            return setresults([])
        }
        let reg1 = new RegExp(e.target.value.toUpperCase())
        let ismatch = region.filter(reg => {
            let is = reg.match(reg1, 'ig')
            if (is) {
                return reg
            }
        })
        setresults(ismatch)
    }

    useEffect(() => {
        setselected({ reg: geography.region, pin: Selected.pin })
        setgeo({ pin: geography.pincodes, region: geo.region })
    }, [geography])

    console.log(geography)
    const setregion = (lang) => {
        setselected({ reg: { selected: [...Selected.reg.selected, lang], notselected: Selected.reg.notselected }, pin: Selected.pin })
    }
    const setblockregion = (lang) => {
        setselected({ reg: { selected: Selected.reg.selected, notselected: [...Selected.reg.notselected, lang] }, pin: Selected.pin })
    }

    const removeregion = (lang) => {
        let filtered = Selected.reg.selected.filter(reg => reg !== lang)
        setselected({ reg: { selected: filtered, notselected: Selected.reg.notselected }, pin: Selected.pin })
    }

    const removenotselregion = (lang) => {
        let filtered = Selected.reg.notselected.filter(reg => reg !== lang)
        setselected({ reg: { selected: Selected.reg.selected, notselected: filtered }, pin: Selected.pin })
    }

    const handleFinal = () => {
        console.log(Selected.reg, geo.pin)
        dispatch(mainaction('GEOG', { region: Selected.reg, pincodes: geo.pin }))
        setOpen(false)
    }
    const handleinputfile = (e) => {
        setgeo({ pin: { selected: geo.pin.selected, blocked: geo.pin.blocked, fileinp: e.target.files[0] }, region: geo.region })
    }

    console.log(geo.pin.fileinp?1:2)


    return (
        <div>
            <Paper className="dashboard" elevation={3}  >
                <hr className="divider" />
                <div className="rowdis3" >
                    <div className="coldis" style={{ maxHeight: '60vh', overflow: 'auto', width: '600px' }}  >
                        <div>Select Regions</div>
                        <input className="inp2"
                            onChange={handleregionchange}
                            value={geo.region}
                        />
                        {
                            results.map(lang =>
                                <div className="rowdis" style={{ float: 'left', marginTop: '5%', marginBottom: '5%' }} >
                                    <span style={{ paddingTop: '4%', fontSize: '15px', maxWidth: '50px' }} >{lang}</span>
                                    <DoneIcon fontSize="medium" style={{ marginLeft: '70%', cursor: 'pointer' }}
                                        onClick={() => setregion(lang)}
                                    />
                                    <BlockIcon fontSize="medium" style={{ marginLeft: '5%', cursor: 'pointer' }}
                                        onClick={() => setblockregion(lang)}
                                    />
                                </div>
                            )
                        }

                    </div>
                    <div className="coldis"  >
                        <div className="coldis" style={{ height: '30vh', overflow: 'auto', width: '300px', marginLeft: '3%' }} >

                            <div>Selected Regions</div>
                            {Selected.reg.selected.map(sel =>
                                <div className="rowdis" >
                                    <span style={{ paddingTop: '4%', fontSize: '15px', maxWidth: '50px' }} >{sel}</span>
                                    <CancelIcon fontSize="medium" style={{ marginLeft: '30%', cursor: 'pointer', paddingTop: '4%' }}
                                        onClick={() => removeregion(sel)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="coldis" style={{ height: '30vh', overflow: 'auto', width: '300px', marginLeft: '3%', marginTop: '5%' }} >
                            <div>Blocked Regions</div>
                            {Selected.reg.notselected.map(sel =>
                                <div className="rowdis" >
                                    <span style={{ paddingTop: '4%', fontSize: '15px', maxWidth: '50px' }} >{sel}</span>
                                    <CancelIcon fontSize="medium" style={{ marginLeft: '30%', cursor: 'pointer', paddingTop: '4%' }}
                                        onClick={() => removenotselregion(sel)}
                                    />
                                </div>
                            )}
                        </div>

                    </div>

                    <div style={{ maxHeight: '60vh', borderLeft: '1px solid #000' }} ></div>

                    <div className="coldis" style={{ height: '30vh', overflow: 'auto', width: '500px', marginLeft: '3%' }} >
                        <div>Selected Pincodes</div>
                        <input className="inp2"
                            onChange={e => setgeo({ region: geo.region, pin: { selected: e.target.value, blocked: geo.pin.blocked,fileinp:geo.pin.fileinp  } })}
                            value={geo.pin.selected}
                            placeholder="Pincodes comma seperated"
                        />
                        <div style={{ marginTop: "5%" }} >Blocked Pincodes</div>
                        <input className="inp2"
                            onChange={e => setgeo({ region: geo.region, pin: { selected: geo.pin.selected, blocked: e.target.value,fileinp:geo.pin.fileinp } })}
                            value={geo.pin.blocked}
                            placeholder="Pincodes comma seperated"
                        />

                        <div style={{ marginTop: '5%' }} >
                            <span  >Upload Pincode File</span>
                            <span style={{ marginLeft: '5px' }} ><input id="pininp" hidden type="file"
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                onChange={handleinputfile}
                            />
                            <label for="pininp"  className="fileinp" > {geo.pin.fileinp?geo.pin.fileinp.name:"Select file"} </label>
                            </span>
                        </div>

                    </div>

                </div>
                <hr className="divider" />
                <div style={{ float: 'left', display: 'flex', flexDirection: 'row', marginBottom: '5%', marginLeft: '5%' }} >
                    <button style={{ padding: '5%', cursor: 'pointer' }} onClick={handleFinal}  >Apply</button>
                    <button style={{ marginLeft: '10%', padding: '5%', cursor: 'pointer' }} onClick={() => setOpen(false)} >Cancel</button>
                </div>
            </Paper>
        </div>
    )
}