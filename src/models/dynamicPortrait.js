import {notification} from 'antd';
import{isArray,find} from "lodash";
import {personList,getPersonalDetails} from "../services/api"

export default {
    namespace : 'dynamicPortrait',
    state : {
        data: {
            list: [],
            pagination: {

            },
        },
        tabTypes:[
            {
                name:"all",
                label:"全部",
                key:0,
                list:[],
                pagination: {

                },
            },
            {
                name:"good",
                label:"好人样本",
                key:1,
                list:[],
                pagination: {

                },
            },
            {
                name:"unknown",
                label:"未知样本",
                key:2,
                list:[],
                pagination: {

                },
            },
            {
                name:"refused",
                label:"拒贷样本",
                key:3,
                list:[],
                pagination: {

                },
            },
            {
                name:"overdue",
                label:"逾期样本",
                key:4,
                list:[],
                pagination: {

                },
            },
            {
                name:"suspicious",
                label:"可疑样本",
                key:5,
                list:[],
                pagination: {

                },
            },
            {
                name:"bad",
                label:"坏人样本",
                key:6,
                list:[],
                pagination: {

                },
            },
          
        ],
        page:{
            pageIndex:1,
            pageSize: 10,
        },
        allToatal:0,
    },
    effects : {
        *fetch({payload:{tabType,...query}}, {call, put}) {
           const {data,PageIndex,PageSize,total} =yield call( personList,{...query});
           yield put({type:"updateTotal",total},);
           yield put({type:"queryTabList",list:data,tabType,pagination:{current:PageIndex,pageSize:PageSize,total:total}});
        },

        *iniLoad({payload},{put,select}){
            const page= yield select(state=>state.dynamicPortrait.page);
            yield put({type:"fetch",payload:{...payload,...page}});
        },
        *loadDetail({payload,callBack},{call,put}){

            try{
                const {code,data} = yield call(getPersonalDetails,payload);
                if(code==200){
                    callBack({state:'success',data,})
                }
              
            }catch(e){
                callBack({state:'error'})
            }
         
           
        },


    },
    reducers : {

        queryList(state, {page, list}) {
            return {
                ...state,
                data: {
                    list,
                    pagination: {
                        ...state.data.pagination,
                        ...page,
                    },
                },
            };
        },
        save(state,action){
            return {
                ...state,
                page: {
                    ...action.payload,
                },

            }
        },
        queryTabList(state, {list,tabType,pagination}) {
            const {tabTypes,...other} = state;
            const item = find(tabTypes,(o)=>{
                if(o.name==tabType){
                    return true;
                }

            })
            tabTypes[item.key]={...tabTypes[item.key],list,pagination};
            return {
                ...other,
                tabTypes,
                
            };
        },
        updateTotal(state,{total}){
            return {
                ...state,
                allToatal:total,
            }
        },
        setState(state,params){
            return {
                ...state,
                ...params,
            }
        }
        
    },
};