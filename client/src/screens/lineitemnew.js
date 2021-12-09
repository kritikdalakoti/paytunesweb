import React, { useState } from "react";
import { Paper, Modal, Select, MenuItem, } from '@material-ui/core'
import styles from '../css/newcampaign.module.css'
import SettingsIcon from '@material-ui/icons/Settings'
import EditIcon from '@material-ui/icons/Edit'
import Demographic from './demographic'
import Language from './language'
import Geography from './geography'
import { useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import * as fun from '../api/campaign'
import '../../src/app1.css'


export default function LineItemNew() {

    const history=useHistory();
    const { insertionid } = useParams();
    const [lineitem, setlineitemname] = useState("")
    const [lineitemactive, setlineitemactive] = useState('Active')
    const geography = useSelector((state) => state.main.geography)
    const language = useSelector((state) => state.main.language)
    const demography = useSelector((state) => state.main.demographic)
    const [show, setshow] = useState({ demo: false, lang: false, geo: false })
    const [open, setOpen] = React.useState({ demo: false, lang: false, geo: false });
    const [freq, setfreq] = useState({ freq: 0, freqtime: 'Lifetime of this Campaign' })
    const [pacing, setpacing] = useState({ target: 'Flight (Recommend)', setting: 'ASAP' })

    const handleChange2 = (e) => {
        setlineitemactive(e.target.value)
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = (type) => {
        type === "demo" ? setOpen({ demo: true, lang: false, geo: false }) : (type === "lang" ? setOpen({ demo: false, lang: true, geo: false }) : setOpen({ demo: false, lang: false, geo: true }));
        type == "demo" ? setshow({ demo: true, lang: false, geo: false }) : type == "lang" ? setshow({ demo: false, lang: true, geo: false }) : setshow({ demo: false, lang: false, geo: true });
    };
    const handleChange5 = (e) => {
        setpacing({ setting: e.target.value, target: pacing.target })
    }
    const handleChange4 = (e) => {
        setpacing({ target: e.target.value, setting: pacing.setting })
    }

    const handleChange6 = (e) => {
        setfreq({ ...freq, freqtime: e.target.value })
    }

    const submitLineitem = async () => {
        const formdata = new FormData()
        formdata.append('lineitemname', lineitem);
        formdata.append('insertionid', insertionid);
        formdata.append('active', lineitemactive);
        formdata.append('pacingtarget', pacing.target);
        formdata.append('pacingsetting', pacing.setting);
        formdata.append('freq', freq.freq);
        formdata.append('freqtime', freq.freqtime);
        formdata.append('selregion', geography.region.selected)
        formdata.append('notselregion', geography.region.notselected)
        formdata.append('selpin', geography.pincodes.selected)
        formdata.append('blockedpin', geography.pincodes.blocked)
        formdata.append('pincodefile', geography.pincodes.fileinp)
        formdata.append('sellanguages', language.selected)
        formdata.append('blocklanguages', language.block)
        formdata.append('maledemo', demography.gender.male)
        formdata.append('femaledemo', demography.gender.female)
        formdata.append('agedemo', demography.age)
        formdata.append('parentdemo', demography.parent.parent)
        formdata.append('nonparentdemo', demography.parent.nonparent)
        formdata.append('incomedemo', demography.income)

        let url = `https://paytunes-new.herokuapp.com/campaign/createlineitem`
        let res = await fun.createApi(formdata, url)

    }

    return (
        <div>
            <Paper className={styles.dashboard} elevation={3}>
                <div className={styles.rowdis} >
                    <div className={styles.campname} >
                        <span className={styles.svdf1} >Line Item Name</span>
                    </div>
                    <div>
                        <input placeholder="Enter name" className="input" type="text" size="30"
                            value={lineitem}
                            onChange={(e) => setlineitemname(e.target.value)}
                        />
                    </div>
                    <div className={styles.dot} >
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={lineitemactive}
                            label={lineitemactive}
                            style={{ width: '100%' }}
                            onChange={handleChange2}
                        >
                            <MenuItem value='Active'>Active</MenuItem>
                            <MenuItem value='Draft'>Draft</MenuItem>
                        </Select>
                    </div>

                </div>
            </Paper>

            <div className="coldis" >
                <span className={styles.target1} >Targetting</span>
                <div className={styles.shgt2} >
                    <SettingsIcon />
                    <div style={{ marginLeft: '5px', marginTop: '5px' }} >New insertion orders and line items in this campaign will inherit these settings.</div>
                </div>

            </div>

            <Paper className={styles.dashboard} elevation={3}>
                {/* <div className={styles.rowdis} >
                    <div className={styles.campname1} >
                        <span className={styles.svdf} > Environment </span>
                    </div>
                    <div style={{ paddingTop: '1%' }} >
                        <span style={{ color: '#9e9e9e' }} >All genders, ages, parental statuses and household incomes</span>
                    </div>
                    <div style={{ marginLeft: '20%' }} >
                        <EditIcon style={{ cursor: 'pointer', color: 'grey' }} onClick={() => handleOpen('demo')} fontSize="large" />
                    </div>
                </div> */}
                {/* <hr className={styles.divider} /> */}
                <div className={styles.rowdis} >
                    <div className={styles.campname1} >
                        <span className={styles.svdf} > Demographics </span>
                    </div>
                    <div style={{ paddingTop: '1%' }} >
                        <span style={{ color: '#9e9e9e' }} >All genders, ages, parental statuses and household incomes</span>
                    </div>
                    <div style={{ marginLeft: '16%' }} >
                        <EditIcon style={{ cursor: 'pointer', color: 'grey' }} onClick={() => handleOpen('demo')} fontSize="large" />
                    </div>

                </div>
                <hr className={styles.divider} />
                <div className={styles.rowdis} >
                    <div className={styles.campgeog}  >
                        <span className={styles.svdf} > Geography </span>
                    </div>
                    <div style={{ paddingTop: '1%', marginLeft: '3%' }} >
                        <span style={{ color: '#9e9e9e' }} >All locations</span>
                    </div>
                    <div style={{ marginLeft: '49%' }} >
                        <EditIcon style={{ cursor: 'pointer', color: 'grey' }} onClick={() => handleOpen('Geo')} fontSize="large" />
                    </div>

                </div>

                <hr className={styles.divider} />

                <div className={styles.rowdis} >
                    <div className={styles.campgeog} >
                        <span className={styles.svdf} > Language </span>
                    </div>
                    <div style={{ paddingTop: '1%', marginLeft: '3%' }} >
                        <span style={{ color: '#9e9e9e' }} >All languages</span>
                    </div>
                    <div style={{ marginLeft: '48%' }} >
                        <EditIcon style={{ cursor: 'pointer', color: 'grey' }} onClick={() => handleOpen('lang')} fontSize="large" />
                    </div>

                </div>

                {/* <hr className={styles.divider} /> */}

            </Paper>
            <div className="coldis" >
                <span className={styles.target2} >Creatives</span>
                {/* <div className={styles.shgt2} >
                    <SettingsIcon />
                    <div style={{ marginLeft: '5px', marginTop: '5px' }} >New insertion orders and line items in this campaign will inherit these settings.</div>
                </div> */}

            </div>
            <Paper className={styles.dashboard} elevation={3}>
                <div  >
                    <button style={{ padding: '20px', cursor: 'pointer', backgroundColor: 'lightgrey', fontSize: '15px', borderWidth: '3px' }}
                        onClick={() => history.push('/creative')}
                    >Upload Creative</button>
                </div>

            </Paper>
            <Paper className={styles.dashboard} elevation={3} >
                <div className={styles.rowdis} >
                    <div className={styles.kpi4} >
                        <span className={styles.svdf} > Frequency Cap </span>
                    </div>
                    <div className={styles.coldis2}  >
                        <div className={styles.rowdis}  >
                            <input type="radio" name="freq" id="nofreq" />
                            <label for="nofreq"> No Limit </label>
                        </div>
                        <div className={styles.rowdis} style={{ marginTop: '10%' }} >
                            <input type="radio" name="freq" id="freq" />
                            <label for="freq" > Limit Frequency to </label>
                            <label style={{ marginRight: '1%' }} > <input type="number" className={styles.inpkpi} style={{ fontSize: '8pt' }} onChange={(e) => setfreq({ freq: e.target.value, freqtime: freq.freqtime })} value={freq.freq} /> </label>
                            <label  > exposures per </label>
                            <label  >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={freq.freqtime}
                                    label={freq.freqtime}
                                    style={{ width: '100%', marginLeft: '15%' }}
                                    onChange={handleChange6}
                                >
                                    <MenuItem value='Lifetime of this Campaign'>Lifetime of this Campaign</MenuItem>
                                    <MenuItem value='Months'>Months</MenuItem>
                                    <MenuItem value='Weeks'>Weeks</MenuItem>
                                    <MenuItem value='Days'>Days</MenuItem>
                                    <MenuItem value='Hours'>Hours</MenuItem>
                                    <MenuItem value='Minutes'>Minutes</MenuItem>
                                </Select>
                            </label>
                        </div>
                    </div>


                </div>

                <div className="rowdis" style={{ marginTop: '5%', marginBottom: '5%' }} >
                    <div className={styles.kpi3} >
                        <span className={styles.svdf} >Pacing</span>
                    </div>
                    <div className="coldis" style={{ marginTop: '2%', marginLeft: '2%' }} >
                        <span>How do you want to spend the flight budget?</span>
                        <div className="rowdis" >
                            <div className={styles.dot2} >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={pacing.target}
                                    label={pacing.target}
                                    onChange={handleChange4}
                                    style={{ width: '100%', marginLeft: '5%' }}
                                >
                                    <MenuItem value="Flight (Recommend)">Flight (Recommend)</MenuItem>
                                    <MenuItem value="Daily">Daily</MenuItem>
                                </Select>
                            </div>

                            <div className={styles.dot2} >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={pacing.setting}
                                    label={pacing.setting}
                                    onChange={handleChange5}
                                    style={{ width: '100%' }}
                                >
                                    <MenuItem value="ASAP">ASAP</MenuItem>
                                    <MenuItem value="Even">Even</MenuItem>
                                    <MenuItem value="Ahead">Ahead</MenuItem>
                                </Select>
                            </div>
                        </div>



                    </div>

                    <div style={{ marginLeft: '10%', marginRight: '5%', marginTop: '2%' }} >
                        Use "Flight" to avoid underspending. Daily
                        spend target is calculated automatically
                        based on the pacing setting (Even, Ahead, ASAP).
                    </div>

                </div>
            </Paper>

            {show.demo || show.lang || show.geo ?
                <div  >
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {show.demo ? <Demographic state={{ demography, setOpen }} /> :
                            show.lang ? <Language state={{ languages: language, setOpen }} /> : <Geography state={{ geography: geography, setOpen }} />
                        }
                    </Modal>
                </div>
                :
                <></>
            }
            <button onClick={submitLineitem} >Create</button>
        </div>
    )

}