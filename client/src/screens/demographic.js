import React, { useState, useContext, useEffect } from 'react'
import { Paper, Select, MenuItem, Slider } from '@material-ui/core'
import '../css/popup.css'
import { ages ,phonecost} from '../utils/state'
import { MainContext } from '../App'
import { useDispatch } from 'react-redux'
import mainaction from '../redux/actions/main'

export default function Demographic({ state }) {
    let { demography, setOpen } = state
    const dispatch = useDispatch()
    const [gender, setgender] = useState({ male: false, female: false })
    const [age, setage] = useState([18, 65])
    // const [parent, setparent] = useState({ parent: false, nonparent: false })
    const [income, setincome] = useState([])
    const [checks, setchecks] = useState({ age: false, income: false })
    function valuetext(value) {
        return `${value}+`;
    }
    console.log(age, income)

    const handlechange1 = (e, value) => {
        setage(value)
    }
    const handlechange2 = (e, value) => {
        setincome(value)
    }

    const handleFinal = () => {
        dispatch(mainaction('DEMO', { gender, age, income, checks }));
        setOpen(false)
    }
    useEffect(() => {
        setgender(demography.gender)
        setage(demography.age)
        setincome(demography.income)
        setchecks(demography.checks)
    }, [demography])


    return (
        <div>

            <Paper className="dashboard" elevation={3} >
                <div className="rowdis" >
                    <span className="gen" >Gender</span>
                    <span className="com" >Age</span>
                    {/* <span className="com" >Parental Status</span> */}
                    <span className="com" >Phone Cost</span>
                </div>
                <div className="rowdis" >

                    <div className="coldis1" >
                        <div className="rowdis1" >
                            <div className="check" >
                                <input type="checkbox"
                                    checked={gender.male}
                                    onClick={() => setgender({ male: !gender.male, female: gender.female })}
                                />
                            </div>
                            <div className="text" >
                                <span>Male</span>
                            </div>
                        </div>
                        <div className="rowdis1" >
                            <div className="check" >
                                <input type="checkbox"
                                    checked={gender.female}
                                    onClick={() => setgender({ male: gender.male, female: !gender.female })}
                                />
                            </div>
                            <div className="text" >
                                <span>Female</span>
                            </div>
                        </div>

                    </div>

                    <div className="coldis2" >
                        <div className="rowdis1" >
                            <div className="check" >
                                <input type="checkbox"
                                    
                                    onClick={() => setchecks({ age: !checks.age, income: checks.income })}
                                />
                            </div>
                            <div className="text" >
                                <span style={{ whiteSpace: 'nowrap' }} >Age Range</span>
                            </div>
                        </div>
                        <div  >
                            <Slider
                                getAriaLabel={() => 'Age'}
                                orientation="vertical"
                                getAriaValueText={valuetext}
                                defaultValue={[18, 70]}
                                onChange={handlechange1}
                                marks={ages}
                                value={age}
                                color={'string'}
                                style={{ height: 300 }}
                                disabled={checks.age}
                            />
                        </div>

                    </div>
                    {/* <div className="coldis1" >
                        <div className="rowdis1" >
                            <div className="check" >
                                <input type="checkbox"
                                    checked={parent.parent}
                                    onClick={() => setparent({ parent: !parent.parent, nonparent: parent.nonparent })}
                                />
                            </div>
                            <div className="text" >
                                <span>Parent</span>
                            </div>
                        </div>
                        <div className="rowdis1" >
                            <div className="check" >
                                <input type="checkbox"
                                    checked={parent.nonparent}
                                    onClick={() => setparent({ parent: parent.parent, nonparent: !parent.nonparent })}
                                />
                            </div>
                            <div className="text" >
                                <span style={{ whiteSpace: 'nowrap' }} >Not A Parent </span>
                            </div>
                        </div>
                    </div> */}

                    <div className="coldis2" >
                        <div className="rowdis1" >
                            <div className="check" >
                                <input type="checkbox"
                                    onClick={() => setchecks({ age: checks.age, income: !checks.income })}
                                />
                            </div>
                            <div className="text" >
                                <span style={{ whiteSpace: 'nowrap' }} >Phone Range</span>
                            </div>
                        </div>
                        <div  >
                            <Slider
                                getAriaLabel={() => 'Income'}
                                orientation="vertical"
                                getAriaValueText={valuetext}
                                defaultValue={[5,50]}
                                marks={phonecost}
                                onChange={handlechange2}
                                value={income}
                                color={'string'}
                                style={{ height: 300 }}
                                disabled={checks.income }
                            />
                        </div>

                    </div>

                </div>

                <div style={{ float: 'left', display: 'flex', flexDirection: 'row', marginBottom: '5%', marginLeft: '5%', marginTop: '5%' }} >
                    <button style={{ padding: '5%', cursor: 'pointer' }} onClick={handleFinal} >Apply</button>
                    <button style={{ marginLeft: '10%', padding: '5%', cursor: 'pointer' }} onClick={() => setOpen(false)} >Cancel</button>
                </div>

            </Paper>

        </div>
    )

}