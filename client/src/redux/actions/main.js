const mainaction=(type,payload)=>(dispatch,getstate)=>{
        console.log(type,payload)
    dispatch({
        type,
        payload
    })
}

export default mainaction