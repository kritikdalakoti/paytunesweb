export const Initialstate1={budget:0,Type:[]}

export const reducer1=(state,action)=>{
    if(action.type==='BUDGET'){
        return {budget:action.payload,Type:state.Type}
    }
    if(action.type==='TYPE'){
        return {Type:action.payload,budget:state.budget}
    }
    return state
}