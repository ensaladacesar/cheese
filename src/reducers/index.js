import { combineReducers } from 'redux';
import allRecipesreducer from './allRecipesreducer';
import menuReducer from './menuReducer';
import LanguageReducer from './LanguageReducer';
import jukeboxReducer from './jukeboxReducer';
import storyReducer from './storyReducer';
import saycheeseReducer from './saycheeseReducer';
import quizReducer from './quizReducer';
import loversReducer from './loversReducer';

export default combineReducers({
    Languages: LanguageReducer,
    Menu: menuReducer,
    AllRecipes: allRecipesreducer,
    Jukebox: jukeboxReducer,
    Story: storyReducer,
    SayCheese: saycheeseReducer,
    Quiz: quizReducer,
    Lovers: loversReducer
})