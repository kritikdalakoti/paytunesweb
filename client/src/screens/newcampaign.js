import React, { useState, useEffect, useReducer, useContext } from 'react'
import { Paper, Divider, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import styles from '../css/newcampaign.module.css'
import { BudgetContext } from '../App'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    padding: '3%',
    //   margin:'3%',
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
  },
}));



export default function NewCampaign() {

  const classes = useStyles()
  const history = useHistory()
  const { state1, dispatch1 } = useContext(BudgetContext)
  const [campaignName, setcampaignname] = useState('')
  const [budget, setbudget] = useState(0)
  const [startdate, setstartdate] = useState('')
  const [enddate, setenddate] = useState('')
  const [active, setActive] = useState('')



  return (

    <div>
      <Paper id="rcorners2" className='dashboard' elevation={3}>
        <div class={styles.heading} >
          <h3  >Create Campaign </h3>
        </div>

        <form onSubmit={e => {
          e.preventDefault()
          history.push('/dashboard/c/campaign/new')
        }} >
          <div class={styles.headingsub}>
            <h4 >What shall we call your Campaign? *</h4></div>
          <div ><input className="input" required value={campaignName} onChange={e => setcampaignname(e.target.value)} placeholder="e.g. Client / Product Name - May 2021" size="30" /></div>


          <div style={{ margin: '5%' }}>
            <Grid container alignItems="center" className={classes.root}>
              <div className="col">
                <div className="heading"> Total Company Budget * </div>
                <div className="field">
                  <span>Amount</span>

                  <input className="inputbox" placeholder="in $" onChange={e => {
                    setbudget(e.target.value)
                    dispatch1({ type: "BUDGET", payload: e.target.value })
                  }} value={budget} type="number" required max="100000" step="0.01" />
                </div>
              </div>

              <Divider orientation="vertical" flexItem style={{ margin: '0px 40px' }} />
              <div style={{ width: '35%' }}>
                <div className="heading"> Campaign Dates </div>
                <div style={{ display: 'flex' }}>
                  <div className="field">
                    <span>Start Dates</span>

                    <input className="inputbox" required onChange={e => setstartdate(e.target.value)} value={startdate} placeholder="yyyy-mm-dd" type="date" />
                  </div>
                  <div className="field">
                    <span>End Dates</span>
                    <input className="inputbox" required placeholder="yyyy-mm-dd" type="date" onChange={e => setenddate(e.target.value)} value={enddate} />
                  </div>
                </div>

              </div>


              <Divider orientation="vertical" flexItem={true} style={{ margin: '0px 40px' }} />
              <div style={{ width: '25%' }}>
                <div className="heading"> Launch </div>
                <div className="field">
                  <span>Do you want your Campaign to be active?</span>
                  <div class="radio-toolbar1" onChange={(e) => setActive(e.target.value)}  >

                    <input type="radio" id="active" name="Active" value="true" checked={active === "true" ? true : false} />
                    <label for="active">Yes</label>

                    <input type="radio" id="inActive" name="Active" value="false" checked={active === "false" ? true : false} />
                    <label for="inActive">No</label>

                  </div>

                </div>
              </div>
            </Grid>
          </div>

          <div class={styles.svdf}>
            <button type="button" tabIndex="0" id class="button-footer" >Create Campaign Without Line Item</button>
            <button type="submit" tabIndex="0" id class="button-footer2" >Next:Create Line Item</button>
          </div>
        </form>

      </Paper>
    </div>


  )
}
