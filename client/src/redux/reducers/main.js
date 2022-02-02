const Initialstatemain = {
    demographic: { gender: { male: false, female: false }, age: [0,0],  income: [0,0], checks: { age: true, income: true } },
    geography: { region: { selected: [], notselected: [] }, pincodes: { selected: "", blocked: "", fileinp: "" } },
    language: { selected: [], block: [] },
    timetargetting: { selected: [], block: [] },
    dates: { start: '', end: '' },
    audioinput: '',
    videoinput: '',
    displayinput: '',
    freqdata: { frequency: '', exposure: "" },
    publisher: { selected: [], block: [] }
}

export default function (state = Initialstatemain, action) {
    if (action.type === 'DEMO') {
        return { ...state, demographic: action.payload }
    }
    if (action.type === 'GEOG') {
        return { ...state, geography: action.payload }
    }
    if (action.type === 'LANG') {
        return { ...state, language: action.payload }
    }
    if (action.type === 'DATE') {
        return { ...state, dates: action.payload }
    }
    if (action.type === 'AUDIO') {
        return { ...state, audioinput: action.payload }
    }
    if (action.type === 'VIDEO') {
        return { ...state, videoinput: action.payload }
    }
    if (action.type === 'DISPLAY') {
        return { ...state, displayinput: action.payload }
    }
    if (action.type === 'FREQ') {
        return { ...state, freqdata: action.payload }
    }
    if (action.type === 'TIME') {
        return { ...state, timetargetting: action.payload }
    }
    if (action.type === 'PUBLISHER') {
        return { ...state, publisher: action.payload }
    }
    return state
}