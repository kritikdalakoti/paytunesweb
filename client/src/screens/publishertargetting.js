import React, { useState, useContext, useEffect } from 'react'
import { Paper, Select, MenuItem, Slider } from '@material-ui/core'
import '../css/popup.css'
import { Publishers } from '../utils/state'
import DoneIcon from '@material-ui/icons/Done'
import CancelIcon from '@material-ui/icons/Cancel';
import BlockIcon from '@material-ui/icons/Block';
import { MainContext } from '../App'
import { useDispatch } from 'react-redux'
import mainaction from '../redux/actions/main'



export default function Publisher({ state }) {

    let { selectedpublishers, setOpen } = state
    const dispatch = useDispatch()
    const [publisher, setpublisher] = useState({ selected: [], block: [] })
    // const [refresh, setrefresh] = useState(false);
    // console.log(languages)
    const setPublisher = (lang) => {
        setpublisher({ selected: [...publisher.selected, lang], block: publisher.block })
    }
    //console.log(time);
    useEffect(() => {
        setpublisher({ selected: selectedpublishers.selected, block: selectedpublishers.block })
    }, [selectedpublishers])


    const removelang = (lang) => {
        let filteredlang = publisher.selected.filter(lan => lan !== lang)
        setpublisher({ selected: filteredlang, block: publisher.block })
        // setrefresh(!refresh)
    }

    const removeblocklang = (lang) => {
        let filteredlang = publisher.block.filter(lan => lan !== lang)
        setpublisher({ selected: publisher.selected, block: filteredlang })
        // setrefresh(!refresh)
    }

    const blocklanguages = (lang) => {
        setpublisher({ selected: publisher.selected, block: [...publisher.block, lang] })
    }

    const handleSubmit = () => {
        // setlanguages({selected:languages.selected,block:languages.block})
        dispatch(mainaction('PUBLISHER', { selected: publisher.selected, block: publisher.block }))
        setOpen(false)

    }

    return (
        <div>
            <Paper className="dashboard" elevation={3} >
                <hr className="divider" />
                <div className="rowdis3" >

                    <div className="coldis" style={{ maxHeight: '60vh', overflow: 'auto', width: '600px' }}  >
                        <div>Select Publisher</div>
                        {
                            Publishers.map(lang =>
                                <div className="rowdis" style={{ float: 'left', marginTop: '5%', marginBottom: '5%' }} >
                                    <span style={{ paddingTop: '4%', fontSize: '20px', maxWidth: '50px' }} >{lang}</span>
                                    <DoneIcon fontSize="large" style={{ marginLeft: '70%', cursor: 'pointer' }}
                                        onClick={() => setPublisher(lang)}
                                    />
                                    <BlockIcon fontSize="medium" style={{ marginLeft: '5%', cursor: 'pointer', paddingTop: '1%' }}
                                        onClick={() => blocklanguages(lang)}
                                    />
                                </div>
                            )
                        }
                    </div>

                    <div style={{ maxHeight: '60vh', borderLeft: '1px solid #000' }} ></div>
                    <div className="coldis" style={{ maxHeight: '60vh', overflow: 'auto', width: '400px', marginLeft: '5%' }}  >
                        <div>Selected Publisher</div>
                        {
                            publisher.selected.map(lang =>
                                <div className="rowdis" style={{ float: 'left', marginTop: '5%', marginBottom: '5%' }} >
                                    <span style={{ paddingTop: '4%', fontSize: '20px', maxWidth: '50px' }} >{lang}</span>
                                    <CancelIcon fontSize="large" style={{ marginLeft: '70%', cursor: 'pointer' }}
                                        onClick={() => removelang(lang)}
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div className="coldis" style={{ maxHeight: '60vh', overflow: 'auto', width: '400px', marginLeft: '5%' }}  >
                        <div>Blocked Publisher</div>
                        {
                            publisher.block.map(lang =>
                                <div className="rowdis" style={{ float: 'left', marginTop: '5%', marginBottom: '5%' }} >
                                    <span style={{ paddingTop: '4%', fontSize: '20px', maxWidth: '50px' }} >{lang}</span>
                                    <CancelIcon fontSize="large" style={{ marginLeft: '70%', cursor: 'pointer' }}
                                        onClick={() => removeblocklang(lang)}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
                <hr className="divider" />
                <div style={{ float: 'left', display: 'flex', flexDirection: 'row', marginBottom: '5%', marginLeft: '5%' }} >
                    <button style={{ padding: '5%', cursor: 'pointer' }} onClick={handleSubmit} >Apply</button>
                    <button style={{ marginLeft: '10%', padding: '5%', cursor: 'pointer' }} onClick={() => setOpen(false)} >Cancel</button>
                </div>
            </Paper>


        </div>
    )

}