import React, { useState } from "react";
import { Paper, Modal, Select, MenuItem, } from '@material-ui/core'
import styles from '../css/newcampaign.module.css'
import SettingsIcon from '@material-ui/icons/Settings'
import EditIcon from '@material-ui/icons/Edit'
import Demographic from './demographic'
import Language from './language'
import Geography from './geography'
import Time from './timetargetting';
import Publisher from './publishertargetting';
import { useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import * as fun from '../api/campaign'
import '../../src/app1.css'
import { Alert } from '@material-ui/lab'


export default function LineItemNew() {

    const history = useHistory();
    const { insertionid } = useParams();
    const [lineitem, setlineitemname] = useState("")
    const [lineitemactive, setlineitemactive] = useState('Active');
    const [status, setstatus] = useState({ error: "", success: "" });
    const geography = useSelector((state) => state.main.geography)
    const frequency = useSelector((state) => state.main.freqdata);
    console.log('dff', useSelector(state => state.main));
    const language = useSelector((state) => state.main.language)
    const demography = useSelector((state) => state.main.demographic)
    const [show, setshow] = useState({ demo: false, lang: false, geo: false, time: false, publisher: false })
    const [open, setOpen] = React.useState({ demo: false, lang: false, geo: false, time: false, publisher: false });
    const [freq, setfreq] = useState({ freq: 0, freqtime: 'Lifetime of this Campaign' })
    const [pacing, setpacing] = useState({ target: 'Flight (Recommend)', setting: 'ASAP' })
    const selectedtime = useSelector((state) => state.main.timetargetting);
    const selectedpublishers = useSelector((state) => state.main.publisher);

    console.log();
    console.log(demography)
    const handleChange2 = (e) => {
        setlineitemactive(e.target.value)
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = (type) => {
        if (type === "demo") {
            setOpen({ lang: false, geo: false, demo: true, time: false, publisher: false });
        } else if (type === "lang") {
            setOpen({ geo: false, demo: false, time: false, publisher: false, lang: true });
        } else if (type === "geo") {
            setOpen({ demo: false, time: false, publisher: false, lang: false, geo: true });
        } else if (type === "time") {
            setOpen({ demo: false, publisher: false, lang: false, geo: false, time: true });
        } else if (type === "publisher") {
            setOpen({ demo: false, lang: false, geo: false, time: false, publisher: true });
        }
        type == "demo" ? setshow({ demo: true, lang: false, geo: false, time: false, publisher: false }) : type == "lang" ? setshow({ demo: false, lang: true, geo: false, time: false, publisher: false }) : type === "geo" ? setshow({ demo: false, lang: false, geo: true, time: false, publisher: false }) : type === "time" ? setshow({ demo: false, lang: false, geo: false, publisher: false, time: true }) : setshow({ demo: false, lang: false, geo: false, time: false, publisher: true });
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
        formdata.append('campaignid', insertionid);
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
        formdata.append('incomedemo', demography.income)

        let url = `/campaign/createlineitem`
        let res = await fun.createApi(formdata, url)
        console.log(`/listlineitem/${insertionid}`)
        history.push(`/listlineitem/${insertionid}`)

    }

    return (
        <div>

            <form onSubmit={(e) => {
                e.preventDefault();
                submitLineitem();

            }} >
                <div className={styles.statusdashboard} >
                    <div>
                        {status.error ? <Alert>{status.error}</Alert> : ''}
                    </div>
                    <div>
                        {status.success ? <Alert>{status.success}</Alert> : ''}
                    </div>
                </div>
                <Paper className={styles.dashboard} elevation={3}>
                    <div className={styles.rowdis} >
                        <div className={styles.campname} >
                            <span className={styles.svdf1} >Line Item Name</span>
                        </div>
                        <div>
                            <input placeholder="Enter name" className="input" type="text" size="30"
                                required={true}
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
                        <div style={{ paddingTop: '1%', display: 'flex', flexDirection: 'column', width: '41%' }} >
                            <span style={{ color: '#9e9e9e' }} >Gender: {demography.gender.male ? 'male' : "None"}, {demography.gender.female ? 'female' : "None"} </span>
                            <span style={{ color: '#9e9e9e' }} >Age: {demography.age[0]}, {demography.age[1]} </span>
                            <span style={{ color: '#9e9e9e' }} >Phone Cost: {demography.income[0]}k, {demography.income[1]}k </span>

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
                            <EditIcon style={{ cursor: 'pointer', color: 'grey' }} onClick={() => handleOpen('geo')} fontSize="large" />
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

                    <hr className={styles.divider} />
                    <div className={styles.rowdis} >
                        <div className={styles.campgeog} >
                            <span className={styles.svdf} > Time Targetting </span>
                        </div>
                        <div style={{ paddingTop: '1%', marginLeft: '3%' }} >
                            <span style={{ color: '#9e9e9e' }} >All time</span>
                        </div>
                        <div style={{ marginLeft: '52%' }} >
                            <EditIcon style={{ cursor: 'pointer', color: 'grey' }} onClick={() => handleOpen('time')} fontSize="large" />
                        </div>

                    </div>
                    <hr className={styles.divider} />
                    <div className={styles.rowdis} >
                        <div className={styles.campgeog} >
                            <span className={styles.svdf} > Publisher </span>
                        </div>
                        <div style={{ paddingTop: '1%', marginLeft: '3%' }} >
                            <span style={{ color: '#9e9e9e' }} >All Publisher</span>
                        </div>
                        <div style={{ marginLeft: '48%' }} >
                            <EditIcon style={{ cursor: 'pointer', color: 'grey' }} onClick={() => handleOpen('publisher')} fontSize="large" />
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
                        <button style={{ padding: '20px', marginLeft:'40%', cursor: 'pointer', backgroundColor: 'lightgrey', fontSize: '15px', borderWidth: '3px' }}
                            onClick={() => history.push('/creative')}
                        >Upload Creative</button>
                    </div>

                </Paper>
                <Paper className={styles.dashboard} elevation={3} >
                    <div style={{ marginLeft: '4%' }} >
                        <h6>Campaign Limit Frequency is {frequency.frequency}</h6>
                    </div>
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
                                <label style={{ marginRight: '1%' }} > <input type="number" className={styles.inpkpi} style={{ fontSize: '8pt' }} style={{ fontSize: '10pt', fontWeight: 'bold' }} onChange={(e) => setfreq({ freq: e.target.value, freqtime: freq.freqtime })} value={freq.freq} /> </label>
                                <label style={{ marginLeft: '5px' }} > exposures per </label>
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

                {show.demo || show.lang || show.geo || show.time || show.publisher ?
                    <div  >
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            {show.demo ? <Demographic state={{ demography, setOpen }} /> :
                                show.lang ? <Language state={{ languages: language, setOpen }} /> :
                                    show.geo ? <Geography state={{ geography, setOpen }} /> :
                                        show.time ? <Time state={{ selectedtime, setOpen }} /> :
                                            <Publisher state={{ selectedpublishers, setOpen }} />
                            }

                        </Modal>
                    </div>
                    :
                    <></>
                }
                <button type="submit" style={{marginLeft:'40%'}} >Create</button>
            </form>


        </div>
    )

}