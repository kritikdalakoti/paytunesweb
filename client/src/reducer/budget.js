export const Initialstate1={budget:0,Type:[],adv:{}}

export const reducer1=(state,action)=>{
    if(action.type==='BUDGET'){
        return {budget:action.payload,Type:state.Type,adv:state.adv}
    }
    if(action.type==='TYPE'){
        return {Type:action.payload,budget:state.budget,adv:state.adv}
    }
    if(action.type==='ADVERTISER'){
        return {adv:action.payload,Type:state.Type,budget:state.budget}
    }
    return state
}