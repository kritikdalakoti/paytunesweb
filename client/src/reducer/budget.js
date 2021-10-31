export const Initialstate1={budget:0,Type:[],adv:{},startdate:'',enddate:'',campaign:'',lineitem:''}

export const reducer1=(state,action)=>{
    if(action.type==='BUDGET'){
        return {budget:action.payload,Type:state.Type,adv:state.adv,startdate:state.startdate,enddate:state.enddate,campaign:state.campaign,lineitem:state.lineitem}
    }
    if(action.type==='TYPE'){
        return {Type:action.payload,budget:state.budget,adv:state.adv,startdate:state.startdate,enddate:state.enddate,campaign:state.campaign,lineitem:state.lineitem}
    }
    if(action.type==='ADVERTISER'){
        return {adv:action.payload,Type:state.Type,budget:state.budget,startdate:state.startdate,enddate:state.enddate,campaign:state.campaign,lineitem:state.lineitem}
    }
    if(action.type==="STARTDATE"){
        return {adv:state.adv,Type:state.Type,budget:state.budget,startdate:action.payload,enddate:state.enddate,campaign:state.campaign,lineitem:state.lineitem}
    }
    if(action.type==="ENDDATE"){
        return {adv:state.adv,Type:state.Type,budget:state.budget,startdate:state.startdate,enddate:action.payload,campaign:state.campaign,lineitem:state.lineitem}
    }
    if(action.type==="CAMPAIGN-NAME"){
        return {adv:state.adv,Type:state.Type,budget:state.budget,startdate:state.startdate,enddate:state.enddate,campaign:action.payload,lineitem:state.lineitem }
    }
    if(action.type==="LINEITEM"){
        return {adv:state.adv,Type:state.Type,budget:state.budget,startdate:state.startdate,enddate:state.enddate,campaign:state.campaign,lineitem:action.payload}
    }
    return state
}