// 详情页 团队
import { combineReducers } from 'redux'
const temaReducers=(state=[{}],action)=>{
    switch (action.type) {
        case 'ADD_TEAM':
        return [action.data,...state]
        case 'DEL_TEAM':
        if([...state][action.data.id]){
            return [...state].filter((item)=>{
            return item.id!=action.data.id
            })
        }else{
            return state
        }
    default:
        return state
      }
}
export default combineReducers({
    temaReducers
})