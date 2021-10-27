import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
<<<<<<< HEAD
import { projectCreateReducer, projectListReducer, projectUpdateReducer } from './reducers/projectReducers';
import { noteListReducer, noteCreateReducer, noteUpdateReducer } from './reducers/noteReducers';
=======
import { projectCreateReducer, projectListReducer, projectUpdateReducer, projectDeleteReducer } from './reducers/projectReducers';
>>>>>>> 887a38e7d17d64ee38b6c495a4b848a52eb709b0

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    projectList: projectListReducer,
    projectCreate: projectCreateReducer,
    projectUpdate: projectUpdateReducer,
<<<<<<< HEAD
    noteList: noteListReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer,
=======
    projectDelete: projectDeleteReducer
>>>>>>> 887a38e7d17d64ee38b6c495a4b848a52eb709b0
});

const userInfoFromStorage = localStorage.getItem('userInfo')
    ?JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;