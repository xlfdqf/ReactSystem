import {notification} from 'antd';


export default {
    namespace : 'userlist',
    state : {
        data: {
            list: [],
            pagination: {
                /*  defaultPageSize:10,
        pageSizeOptions:['1','10'], */
            },
        },
        page:{
            currentPage:1,
            pageSize: 10,
        },
        coinDataList:[],
        recordList:[],
        sourceList:[],
    },
    effects : {
        *fetch({payload}, {call, put}) {

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
        saveCoinDataList(state,{list}){
            return {
                ...state,
                coinDataList:list,
            }
        },
        saveRecordList(state,{list}){
            return {
                ...state,
                recordList:list,
            }
        },
        saveSourceList(state,{list}){
            return {
                ...state,
                sourceList:list,
            }
        },
    },
};
