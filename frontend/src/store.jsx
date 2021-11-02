import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { projectCreateReducer, projectListReducer, projectUpdateReducer } from './reducers/projectReducers';
import { taskListReducer } from './reducers/taskReducers';
import { sectionOrderListReducer, sectionListReducer ,sectionUpdateTaskReducer,SectionOrderUpdateReducer,sectionUpdateReducer} from './reducers/sectionReducers';


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
    sectionUpdate:sectionUpdateReducer
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