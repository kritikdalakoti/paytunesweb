import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom'
import { Paper, Modal, Select, MenuItem, } from '@material-ui/core'
import styles from '../css/newcampaign.module.css'
import SettingsIcon from '@material-ui/icons/Settings'
import EditIcon from '@material-ui/icons/Edit'
import Demographic from './demographic'
import Language from './language'
import Geography from './geography'
import { MainContext } from '../App'
import { useSelector } from "react-redux";
import * as fun from '../api/campaign'
import { useDispatch } from 'react-redux'
import mainaction from '../redux/actions/main'
import '../../src/app1.css'

export default function Insertion() {

    const [insertionname, setinsertionname] = useState("");
    const {campid}=useParams()
    const dispatch=useDispatch()
    // const {statemain,dispatchmain}=useContext(MainContext)
    const geography = useSelector((state) => state.main.geography)
    console.log(geography)
    const language = useSelector((state) => state.main.language)
    const demography = useSelector((state) => state.main.demographic)
    const dates = useSelector((state) => state.main.dates)
    const history = useHistory()
    const [insertionactive, setinsertionactive] = useState('Active')
    const [dates1, setdates1] = useState({ start: '', end: '' })
    const [budget, setbudget] = useState({type:'INR',bud:'',description:''})
    const [pacing, setpacing] = useState({ target: 'Flight (Recommend)', setting: 'ASAP' })
    const [freq, setfreq] = useState({ freq: 0, freqtime: 'Lifetime of this Campaign' })
    const [show, setshow] = useState({ demo: false, lang: false, geo: false })
    const [open, setOpen] = React.useState({ demo: false, lang: false, geo: false });

    const handleChange2 = (e) => {
        setinsertionactive(e.target.value)
    }
    const handleChange3 = (e) => {
        setbudget({...budget,type:e.target.value})
    }
    const handleChange4 = (e) => {
        setpacing({ target: e.target.value, setting: pacing.setting })
    }
    const handleChange5 = (e) => {
        setpacing({ setting: e.target.value, target: pacing.target })
    }
    const handleChange6 = (e) => {
        setfreq({ ...freq,freqtime:e.target.value })
    }
    const handledatechange1=(e)=>{
        setdates1({...dates1,start:e.target.value})
        console.log(dates1)
    }
    const handledatechange2=(e)=>{
        setdates1({...dates1,end:e.target.value})
    }

    const handleOpen = (type) => {
        type === "demo" ? setOpen({ demo: true, lang: false, geo: false }) : (type === "lang" ? setOpen({ demo: false, lang: true, geo: false }) : setOpen({ demo: false, lang: false, geo: true }));
        type == "demo" ? setshow({ demo: true, lang: false, geo: false }) : type == "lang" ? setshow({ demo: false, lang: true, geo: false }) : setshow({ demo: false, lang: false, geo: true });
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        setdates1(dates)
    },[dates])

    const submitInsertion=async()=>{
        const formdata=new FormData()
        formdata.append('insertionname',insertionname);
        formdata.append('campaignid',campid);
        formdata.append('active',insertionactive);
        formdata.append('budgettype',budget.type);
        formdata.append('budget',budget.bud);
        formdata.append('description',budget.description);
        formdata.append('startdate',dates1.start);
        formdata.append('enddate',dates1.end);
        formdata.append('pacingtarget',pacing.target);
        formdata.append('pacingsetting',pacing.setting);
        formdata.append('freq',freq.freq);
        formdata.append('freqtime',freq.freqtime);
        formdata.append('selregion',geography.region.selected)
        formdata.append('notselregion',geography.region.notselected)
        formdata.append('selpin',geography.pincodes.selected)
        formdata.append('blockedpin',geography.pincodes.blocked)
        formdata.append('pincodefile',geography.pincodes.fileinp)
        formdata.append('sellanguages',language.selected)
        formdata.append('blocklanguages',language.block)
        formdata.append('maledemo',demography.gender.male)
        formdata.append('femaledemo',demography.gender.female)
        formdata.append('agedemo',demography.age)
        formdata.append('parentdemo',demography.parent.parent)
        formdata.append('nonparentdemo',demography.parent.nonparent)
        formdata.append('incomedemo',demography.income)
        dispatch(mainaction('DATE',{start:dates.start,end:dates.end}))
        let url=`https://paytunes-new.herokuapp.com/campaign/createinsertion`
        let res=await fun.createApi(formdata,url)
        // console.log(res)
        history.push(`/lineitemnew/${res.data.data._id}`)

    }

    return (
        <div>
            <Paper className={styles.dashboard} elevation={3}>
                <div className={styles.rowdis} >
                    <div className={styles.campname} >
                        <span className={styles.svdf1} >Insertion Order Name</span>
                    </div>
                    <div>
                        <input placeholder="Enter name" className="input" type="text" size="30"
                            value={insertionname}
                            onChange={(e) => setinsertionname(e.target.value)}
                        />
                    </div>
                    <div className={styles.dot} >
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={insertionactive}
                            label={insertionactive}
                            style={{ width: '100%' }}
                            onChange={handleChange2}
                        >
                            <MenuItem value='Active'>Active</MenuItem>
                            <MenuItem value='Draft'>Draft</MenuItem>
                        </Select>
                    </div>

                </div>
            </Paper>
            <div style={{ marginBottom: '3%' }} >
                <div className={styles.shgt2} >
                    <SettingsIcon />
                    <div style={{ marginLeft: '5px', marginTop: '2px' }} >Budget and pacing depend on both insertion order and line item settings.</div>
                </div>

                <Paper className={styles.dashboard} elevation={3}>
                    <div className={styles.rowdis} style={{ marginLeft: '1%' }} >
                        <div className={styles.kpi2} >
                            <span className={styles.svdf} >Budget</span>
                        </div>
                        <div className="coldis"  >
                            <div style={{ marginBottom: '2%', paddingRight: '75%' }} >
                                <span>Select your budget type</span>
                            </div>
                            <div className={styles.dot1} >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={budget.type}
                                    label={budget.type}
                                    onChange={handleChange3}
                                    style={{ width: '100%' }}
                                >
                                    <MenuItem value="INR">INR</MenuItem>
                                    <MenuItem value="Impressions">Impressions</MenuItem>
                                </Select>
                            </div>
                            <div style={{ marginBottom: '2%', marginTop: '5%', paddingRight: '36%' }} >
                                <span>Specify this insertion order's flight dates and budget segments</span>
                            </div>
                            <div className={styles.rowdis} >
                                <div className={styles.coldis} >
                                    <span style={{ paddingRight: '70%' }} >Budget</span>
                                    <input type="number" style={{ marginTop: '2%', width: '50%' }}  
                                    value={budget.bud}
                                    onChange={(e)=>setbudget({...budget,bud:e.target.value})}
                                    />
                                </div>
                                <div className={styles.coldis}  >
                                    <span style={{ paddingRight: '70%' }} >Description</span>
                                    <input type="text" style={{ marginTop: '2%', width: '50%' }} 
                                    value={budget.description}
                                    onChange={(e)=>setbudget({...budget,description:e.target.value})}
                                    />
                                </div>
                                <div className={styles.coldis} >
                                    <span style={{ paddingRight: '70%' }} >StartDate</span>
                                    <input type="date" style={{ marginTop: '2%', width: '90%' }} value={dates1.start}  
                                    onChange={handledatechange1}
                                    />
                                </div>
                                <div className={styles.coldis} >
                                    <span style={{ paddingRight: '70%' }} >EndDate</span>
                                    <input type="date" style={{ marginTop: '2%', width: '90%' }}  value={dates1.end} 
                                    onChange={handledatechange2}
                                    />
                                </div>

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

                </Paper>




            </div>

            <div className="coldis" >
                <span className={styles.target1} >Targetting</span>
                <div className={styles.shgt2} >
                    <SettingsIcon />
                    <div style={{ marginLeft: '5px', marginTop: '5px' }} >New insertion orders and line items in this campaign will inherit these settings.</div>
                </div>

            </div>

            <Paper className={styles.dashboard} elevation={3}>
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
            <button onClick={submitInsertion} >Next</button>
        </div>
    )

}