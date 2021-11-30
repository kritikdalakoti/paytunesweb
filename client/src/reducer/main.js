export const Initialstatemain = {
    demographic: { gender: { male: false, female: false }, age: [18, 65], parent: { parent: false, nonparent: false }, income: [18, 65], checks: { age: true, income: true } },
    geography: { region: { selected: [], notselected: [] }, pincodes: { selected: "", blocked: "", fileinp: '' } },
    language: { selected: [], block: [] }
}

export const reducermain = (state, action) => {
    if (action.type === 'DEMO') {
        return { demographic: action.payload, geography: state.geography, language: state.language }
    }
    if (action.type === 'GEOG') {
        return { demographic: state.demographic, geography: action.payload, language: state.language }
    }
    if (action.type === 'LANG') {
        return { demographic: state.demographic, geography: state.geography, language: action.payload }
    }
    return state
}