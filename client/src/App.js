// import logo from './logo.svg';
import './App.css';
import Login from './components/login'
import React, { useEffect, useReducer } from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import {Initialstate,reducer} from './reducer/reducer'
import {Initialstate1,reducer1} from './reducer/budget'
import Advertiser from './components/Advertiser'
import Navbar from './components/Navbar';
import Create_Advertiser from './components/create_advertiser'
import Create_User from './components/create_user'
import Dashboard from './components/dashboard';
import Update_User from './screens/update_user';
import Update_Advertiser from './screens/update_advertiser'
import NewCampaign from './screens/newcampaign'
import LineItem from './screens/lineitem'
export const UserContext=React.createContext()
export const BudgetContext=React.createContext()



function App() {

  let [state,dispatch]=useReducer(reducer,Initialstate)
  let [state1,dispatch1]=useReducer(reducer1,Initialstate1)
  //console.log(state)

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'))
    console.log(user)
    if(user){
      dispatch({type:'USER',payload:user})
    }else{
       <Redirect to='/login' />
    }
  },[])

  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BudgetContext.Provider value={{state1,dispatch1}}>
    <div className="App">
      <BrowserRouter>
      <Route 
      path='/login'
      render={()=>(state?(<Redirect to='/'/>):(<Login/>))}
      exact
      />
      <Route
            path='/'
            exact
            render={()=>(state ? <Redirect to='/dashboard' />: <Redirect to='/login' />)}
            />
      {state && <>
      <Navbar/>
        <Route
      path='/dashboard'
      render={()=>(<Dashboard/>)}
      exact
      />
      <Route
      path='/advertisers'
      render={()=>(<Advertiser/>)}
      exact
      />
      <Route
      path='/advertiser/new'
      render={()=>(<Create_Advertiser/>)}
      />
      <Route
      path='/advertisers/new/user'
      render={()=>(<Create_User/>)}
      />
      <Route
      path='/advertisers/user/update/:user'
      render={()=>(<Update_User/>)}
      />
      <Route
      path='/advertisers/advertiser/update/:advertiser'
      render={()=>(<Update_Advertiser/>)}
      />
      <Route
      path='/dashboard/new/campaign'
      render={()=>(<NewCampaign/>)}
      exact
      />
      <Route
      path='/dashboard/c/campaign/new'
      render={()=>(<LineItem/>)}
      
      />
      </>
      }
      
      </BrowserRouter>
    </div>
    </BudgetContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
