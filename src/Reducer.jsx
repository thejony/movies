function Reducer (state = {}, action) {
    console.log("ACTION", ">", action);
    switch(action.type) {
        case 'SET_LIST':
            return { ...state, list: action.data.map(item => ({...item, details: null, comments:[] })) };
        case 'SET_SELECTED':
            return { ...state, selected: action.id };
        case 'GET_DETAILS':
        case 'GET_COMMENTS':
            const listCopy = [...state.list];
            for (const key in listCopy) {
                if (Object.hasOwnProperty.call(listCopy, key)) {
                    const element = listCopy[key];
                    if (element.id === action.id) {
                        if (action.type === 'GET_DETAILS')
                            element["details"] = action.data;
                        else
                            element["comments"] = action.data;
                        break;
                    }
                }
            }
            return { ...state, list: listCopy };
        default:
            return state;
    }
}

export default Reducer;