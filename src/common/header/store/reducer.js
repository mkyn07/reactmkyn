//数据和操作数据都在这里存储
import * as constants from './constants';
import { fromJS } from "immutable";

const defaultState = fromJS({
    focused: false, //第一个数据
    mouseIn: false,
    list: [],      //第二个数据
    page: 1,
    totalPage:1,
});

export default (state = defaultState, action) =>{
    switch(action.type){
        case constants.SEARCH_FOCUS:
            return state.set('focused',true);
        case constants.SEARCH_BLUR:
            return state.set('focused',false);
        case constants.CHANGE_LIST:
            return state.merge({
                list: action.data,
                totalPage: action.totalPage
            });
        case constants.MOUSE_ENTER:
            return state.set('mouseIn',true);
        case constants.MOUSE_LEAVE:
            return state.set('mouseIn',false);


        case constants.CHANGE_PAGE:
            return state.set('page',action.page);

        default:
            return state;
    }
}