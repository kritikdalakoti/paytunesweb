import axios from 'axios'

export async function createApi (formdata, url) {
    let response = await axios.post(url,
        formdata,
        { headers: { Authorization: "Bearer " + localStorage.getItem("jwt"),  } }
    )
    console.log(response)
    return response
}




