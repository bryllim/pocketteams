import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { projectCreateReducer, projectListReducer, projectUpdateReducer } from './reducers/projectReducers';
import { taskListReducer,taskCreateReducer} from './reducers/taskReducers';
import { sectionOrderListReducer, sectionListReducer ,sectionUpdateTaskReducer,SectionOrderUpdateReducer,sectionUpdateReducer,sectionCreateReducer,sectionDeleteReducer} from './reducers/sectionReducers';
import {noteListReducer,noteCreateReducer,noteUpdateReducer} from './reducers/noteReducers';
import {taskDeleteReducer} from './reducers/taskReducers';
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    projectList: projectListReducer,
    projectCreate: projectCreateReducer,
    projectUpdate: projectUpdateReducer,
    taskList: taskListReducer,
    sectionOrderList: sectionOrderListReducer,
    sectionList: sectionListReducer,
    sectionTasksUpdate: sectionUpdateTaskReducer,
    SectionOrderUpdate:SectionOrderUpdateReducer,
    sectionUpdate:sectionUpdateReducer,
    sectionCreate:sectionCreateReducer,
    sectionDelete:sectionDeleteReducer,
    noteList: noteListReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    taskDelete: taskDeleteReducer,
    taskCreate: taskCreateReducer
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