const Initialstatemain = {
    demographic: { gender: { male: false, female: false }, age: [18, 65], parent: { parent: false, nonparent: false }, income: [18, 65], checks: { age: true, income: true } },
    geography: { region: { selected: [], notselected: [] }, pincodes: { selected: "", blocked: "", fileinp: "" } },
    language: { selected: [], block: [] },
    dates: { start: '', end: '' },
    audioinput: '',
    videoinput: '',
    displayinput: ''
}

export default function (state = Initialstatemain, action) {
    if (action.type === 'DEMO') {
        return { demographic: action.payload, geography: state.geography, language: state.language, dates: state.dates }
    }
    if (action.type === 'GEOG') {
        return { demographic: state.demographic, geography: action.payload, language: state.language, dates: state.dates }
    }
    if (action.type === 'LANG') {
        return { demographic: state.demographic, geography: state.geography, language: action.payload, dates: state.dates }
    }
    if (action.type === 'DATE') {
        return { demographic: state.demographic, geography: state.geography, language: state.language, dates: action.payload }
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
    return state
}