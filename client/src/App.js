// import logo from './logo.svg';
import './app1.css';
import Login from './components/login'
import React, { useEffect, useReducer } from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import { Initialstate, reducer } from './reducer/reducer'
import { Initialstate1, reducer1 } from './reducer/budget'
import { Initialstatemain, reducermain } from './reducer/main';
import Advertiser from './components/Advertiser'
import Navbar from './components/Navbar';
import Create_Advertiser from './components/create_advertiser'
import Create_User from './components/create_user'
import Dashboard from './components/dashboard';
import Update_User from './screens/update_user';
import Update_Advertiser from './screens/update_advertiser'
import NewCampaign from './screens/newcampaign'
import LineItem from './screens/lineitem'
import Insertion from './screens/insertion';
import LineItemNew from './screens/lineitemnew';
import Audiofile from './components/Audiofile';
import Creative from './components/creative';
import DetailedPage from './components/DetailedPage';
import Html5image from './components/html5image';
import Videofile from './components/videofile';
import ListLineitem from './components/listlineitem';
export const UserContext = React.createContext()
export const BudgetContext = React.createContext()
export const MainContext = React.createContext()


function App() {

  let [state, dispatch] = useReducer(reducer, Initialstate)
  let [state1, dispatch1] = useReducer(reducer1, Initialstate1)
  let [statemain, dispatchmain] = useReducer(reducermain, Initialstatemain)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    if (user) {
      dispatch({ type: 'USER', payload: user })
    } else {
      <Redirect to='/login' />
    }
  }, [])

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BudgetContext.Provider value={{ state1, dispatch1 }}>
        <MainContext.Provider value={{ statemain, dispatchmain }}>
          <div className="App">
            <BrowserRouter>
              <Route
                path='/login'
                render={() => (state ? (<Redirect to='/' />) : (<Login />))}
                exact
              />
              <Route
                path='/'
                exact
                render={() => (state ? <Redirect to='/dashboard' /> : <Redirect to='/login' />)}
              />
              {state && <>
                
                
                <Route
                  path='/dashboard'
                  render={() => (<Dashboard />)}
                  exact
                />
                <Route
                  path='/insertion/:campid'
                  render={() => (<Insertion />)}
                  exact
                />
                <Route
                  path='/lineitemnew/:insertionid'
                  render={() => (<LineItemNew />)}
                  exact
                />
                <Route
                  path='/advertisers'
                  render={() => (<Advertiser />)}
                  exact
                />
                <Route
                  path='/listlineitem/:campid'
                  render={() => (<ListLineitem />)}
                  exact
                />
                <Route
                  path='/advertiser/new'
                  render={() => (<Create_Advertiser />)}
                />
                <Route
                  path='/advertisers/new/user'
                  render={() => (<Create_User />)}
                />
                <Route
                  path='/advertisers/user/update/:user'
                  render={() => (<Update_User />)}
                />
                <Route
                  path='/advertisers/advertiser/update/:advertiser'
                  render={() => (<Update_Advertiser />)}
                />
                <Route
                  path='/dashboard/new/campaign'
                  render={() => (<NewCampaign />)}
                  exact
                />
                <Route
                  path='/dashboard/c/campaign/new/:campid'
                  render={() => (<LineItem />)}
                />
                <Route path="/creative" exact render={() => <Creative />} />
                <Route path="creative/detailed/:num" exact render={() => <DetailedPage />} />
                <Route path="/creative/home" exact render={() => <Creative />} />
                <Route path="/creative/html5image" exact render={() => <Html5image />} />
                <Route path="/creative/audiofile" exact render={() => <Audiofile />} />
                <Route path="/creative/videofile" exact render={() => <Videofile />} />
              </>
              }

            </BrowserRouter>
          </div>
        </MainContext.Provider >
      </BudgetContext.Provider>
    </UserContext.Provider>

  );
}

export default App;
