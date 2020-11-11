import {
    GET_JUKEBOX,    
    SELECT_CHEESE,
    GET_JUKEBOX_RESULT
} from '../types';

const initialState = {
    jukebox: [],   
    jukeboxselected: '',
    jukeboxresult: {},
    error: null,
    loading: true
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_JUKEBOX:
            return{
                ...state,
                error: null,
                jukebox: action.payload,
                jukeboxresult: {},
                jukeboxselected: '',
                loading: false
            }        
        case SELECT_CHEESE:
            return{
                ...state,
                jukeboxselected: action.payload,
                loading: true
            }
        case GET_JUKEBOX_RESULT:
            return{
                ...state,
                jukeboxresult: action.payload,
                loading: false
            }
    
        default:
            return state;
    }
    
}