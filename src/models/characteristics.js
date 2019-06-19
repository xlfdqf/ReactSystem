import {notification} from 'antd';
import {getPersonCreport} from "../services/api"
import * as aUtils from "@/pages/AnalysisReport/utils";
export default {
    namespace : 'characteristics',
    state : {
       sourceList:[],
       updateDate:'',
    },
    effects : {
        *fetch(_, {call, put}) {
            const {code,data,date} = yield call(getPersonCreport);
            if(code===200){
                yield put({type:"queryList",list:aUtils.createTableData(data),updateDate:date})
            }else{
                notification.error({
                    message:"",
                    description:"",
                })
            }
        },
        *initLoad(_,{call,put}){
            yield put({type:"fetch"});
        }
    },
    reducers : {
        queryList(state, {list,updateDate}) {
            // console.log('返回的数据')
            // console.log(list)
            return {
                ...state,
                sourceList:list,
                updateDate,
            };
        },
    },
};