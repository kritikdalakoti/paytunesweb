import React, { useState, useContext, useEffect } from 'react'
import { Paper, Select, MenuItem, Slider } from '@material-ui/core'
import '../css/popup.css'
import { language } from '../utils/state'
import DoneIcon from '@material-ui/icons/Done'
import CancelIcon from '@material-ui/icons/Cancel';
import BlockIcon from '@material-ui/icons/Block';
import { MainContext } from '../App'
import { useDispatch } from 'react-redux'
import mainaction from '../redux/actions/main'



export default function Language({ state }) {

    let { languages, setOpen } = state
    const dispatch = useDispatch()
    const [langs, setlangs] = useState({ selected: [], block: [] })
    // const [refresh, setrefresh] = useState(false);
    console.log(languages)
    const setlang = (lang) => {
        setlangs({ selected: [...langs.selected, lang], block: langs.block })
    }

    useEffect(() => {
        setlangs({ selected: languages.selected, block: languages.block })
    }, [languages])


    const removelang = (lang) => {
        let filteredlang = langs.selected.filter(lan => lan !== lang)
        setlangs({ selected: filteredlang, block: langs.block })
        // setrefresh(!refresh)
    }

    const removeblocklang = (lang) => {
        let filteredlang = langs.block.filter(lan => lan !== lang)
        setlangs({ selected: langs.selected, block: filteredlang })
        // setrefresh(!refresh)
    }

    const blocklanguages = (lang) => {
        setlangs({ selected: langs.selected, block: [...langs.block, lang] })
    }

    const handleSubmit = () => {
        // setlanguages({selected:languages.selected,block:languages.block})
        dispatch(mainaction('LANG', { selected: langs.selected, block: langs.block }))
        setOpen(false)

    }

    return (
        <div>
            <Paper className="dashboard" elevation={3} >
                <hr className="divider" />
                <div className="rowdis3" >

                    <div className="coldis" style={{ maxHeight: '60vh', overflow: 'auto', width: '600px' }}  >
                        <div>Select Languages</div>
                        {
                            language.map(lang =>
                                <div className="rowdis" style={{ float: 'left', marginTop: '5%', marginBottom: '5%' }} >
                                    <span style={{ paddingTop: '4%', fontSize: '20px', maxWidth: '50px' }} >{lang.language}</span>
                                    <DoneIcon fontSize="large" style={{ marginLeft: '70%', cursor: 'pointer' }}
                                        onClick={() => setlang(lang.language)}
                                    />
                                    <BlockIcon fontSize="medium" style={{ marginLeft: '5%', cursor: 'pointer', paddingTop: '1%' }}
                                        onClick={() => blocklanguages(lang.language)}
                                    />
                                </div>
                            )
                        }
                    </div>

                    <div style={{ maxHeight: '60vh', borderLeft: '1px solid #000' }} ></div>
                    <div className="coldis" style={{ maxHeight: '60vh', overflow: 'auto', width: '400px', marginLeft: '5%' }}  >
                        <div>Selected Languages</div>
                        {
                            langs.selected.map(lang =>
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
                        <div>Blocked Languages</div>
                        {
                            langs.block.map(lang =>
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