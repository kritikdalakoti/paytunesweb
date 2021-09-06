import React, { useState,useContext } from "react";
import { Select, MenuItem } from '@material-ui/core'
import styles from '../css/lineitem.module.css'
import { BudgetContext } from "../App";


export function Tab1({type,settype,strategy,setStrategy,lineitem,setlineitem}) {
    const { state1, dispatch1 } = useContext(BudgetContext)
    //console.log(state)
// let {type,settype,strategy,setStrategy,lineitem,setlineitem}=state
    // const [type, settype] = React.useState(['Audio'])
    // const [strategy, setStrategy] = React.useState(false)
    // const [lineitem, setlineitem] = useState('')
console.log(type)
    const handleChange2 = (event) => {
        dispatch1({type:'TYPE',payload:event.target.value})
        settype(event.target.value)
        console.log(type)
        
    }

    return (
        <div>
            <div class={styles.headingsub}>
                <h3>What shall we call your Sub-Campaign? *</h3>
            </div>
            <input className="input" value={lineitem} placeholder="e.g. Targetting Strategy - Geography" size="30" required onChange={(e) => setlineitem(e.target.value)} />


            <div class={styles.svdfe1} > Select your branding strategy. </div>
            <div class="radio-toolbar1" style={{ position: 'relative', right: '320px', marginBottom: '5%' }} value={strategy} onChange={(e) => setStrategy(e.target.value)} >

                <input type="radio" id="active" name="Active" value="Branding" checked={strategy === "Branding" ? true : false} />
                <label for="active" style={{ padding: '10px 10px', width: '12%' }} >Branding</label>

                <input type="radio" id="inActive" name="Active" value="Performance" checked={strategy === "Performance" ? true : false} />
                <label for="inActive" style={{ padding: '10px 10px', width: '12%' }} >Performance</label>

            </div>
            <div style={{ display: 'block' }} >
                <div class={styles.svdfe1} > Type of Campaign * </div>
                <div >
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        multiple
                        label="Select Type"
                        style={{ width: '30%', float: 'left', margin: '1% 0% 5% 5%' }}
                        onChange={handleChange2}
                    >
                        <MenuItem value='Audio'>Audio</MenuItem>
                        <MenuItem value='Video'>Video</MenuItem>
                        <MenuItem value='Display'>Display</MenuItem>

                    </Select>
                </div>
            </div>


            <hr class={styles.sep} />
            
        </div>
    )
}