import React, {useState } from 'react'
import { Paper, Select, MenuItem, Slider  } from '@material-ui/core'
import '../css/popup.css'
import {ages } from '../utils/state'



export default function Demographic({state}) {
    console.log(state)
    let {gender,setgender,age,setage,parent,setparent,income,setincome,checks,setchecks}=state
    

    function valuetext(value) {
        return `${value}+`;
      }

    return (
        <div>

            <Paper className="dashboard" elevation={3} >
                <div className="rowdis" >
                    <span className="gen" >Gender</span>
                    <span className="com" >Age</span>
                    <span className="com" >Parental Status</span>
                    <span className="com" >HouseHold Income</span>
                </div>
                <div className="rowdis" >

                    <div className="coldis1" >
                        <div className="rowdis1" >
                            <div className="check" >
                                <input type="checkbox"
                                checked={gender.male} 
                                onClick={() => setgender({male:!gender.male,female:gender.female})}
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
                                onClick={() => setgender({male:gender.male,female:!gender.female})}
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
                                checked={checks.age}
                                onClick={() => setchecks({age:!checks.age,income:checks.income})}
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
                                defaultValue={[18,70]}
                                marks={ages}
                                color={'string'}
                                style={{height:300}}
                                disabled={checks.age?false:true}
                            />
                        </div>

                    </div>
                    <div className="coldis1" >
                        <div className="rowdis1" >
                            <div className="check" >
                                <input type="checkbox"
                                checked={parent.parent}
                                onClick={() => setparent({parent:!parent.parent,nonparent:parent.nonparent})}
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
                                onClick={() => setparent({parent:parent.parent,nonparent:!parent.nonparent})}
                                />
                            </div>
                            <div className="text" >
                                <span style={{ whiteSpace: 'nowrap' }} >Not A Parent </span>
                            </div>
                        </div>
                    </div>

                    <div className="coldis2" >
                        <div className="rowdis1" >
                            <div className="check" >
                                <input type="checkbox"
                                checked={checks.income}
                                onClick={() => setchecks({age:checks.age,income:!checks.income})}
                                />
                            </div>
                            <div className="text" >
                                <span style={{ whiteSpace: 'nowrap' }} >HouseHold Income</span>
                            </div>
                        </div>
                        <div  >
                            <Slider
                                getAriaLabel={() => 'Income'}
                                orientation="vertical"
                                getAriaValueText={valuetext}
                                defaultValue={[18,70]}
                                marks={ages}
                                color={'string'}
                                style={{height:300}}
                                disabled={checks.income?false:true}
                            />
                        </div>

                    </div>

                </div>


            </Paper>

        </div>
    )

}