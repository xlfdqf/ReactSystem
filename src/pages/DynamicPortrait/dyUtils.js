import {isString,isArray,isEmpty,filter,find,map,concat} from "lodash";
import { isMoment } from "moment";

const callTime=[
    'fireVoiceDurationTotal',
    'quietDuration',
    'maxQuietDuration',
    'callNightVoiceDuration',
    'DurationAvg'
]

function isCallTime(key){
    return find(callTime,key)
}

  export const columns1=[
    {
        title: '变量名称',
        dataIndex: 'name',
    },
    {
        title: '变量参数',
        dataIndex: 'param',
        render:(text,{key})=>{
            if(isCallTime(key)){
                return text/60000;
                
            }
            switch(text){
                case 'true':
                    return '是'
                case 'false':
                    return '否'
                case 'TRUE':
                    return '有'
                case 'FALSE':
                    return '无'
                case 'F':
                    return '女'
                case 'M':
                    return '男'
                default :
                    return text;
            }

        }
    },
    {
        title: '变量类型',
        dataIndex: 'type',
    },
    {
        title: '变量属性',
        dataIndex: 'attr',
    },
    {
        title: '变量朝向',
        dataIndex: 'flag',
    },
];
export const columns2=[
    {
        title: '累积好人概率',
        dataIndex: 'name1',
        render:(text)=>text || ' -',
    },
    {
        title: '累积逾期概率',
        dataIndex: 'param',
    },
    {
        title: '累积可疑概率',
        dataIndex: 'type',
    },
    {
        title: '累积坏人分布',
        dataIndex: 'attr',
    },
    {
        title: '决策参考值',
        dataIndex: 'a',
    },
    {
        title: '当前模型评分',
        dataIndex: 'b',
    },
];

export const table_first=[
    {
        name:"isRefused",
        label:"有无拒贷记录",
    },
    {
        name:"isRepayment",
        label:"有无还款记录",
    },
    {
        name:"isOverdue",
        label:"有无逾期记录",
    },
    {
        name:"isBlack",
        label:"是否黑名单",
    },
    {
        name:"isGray",
        label:"是否灰名单",
    },
];

/* '有无拒贷记录','有无还款记录','有无逾期记录','是否灰名单','是否黑名单' */
export const tabList=[
    {
        header:'基本信息',
        name:"basic",
        key:"basic",
        rows:[
            {
                label:"姓名",
                name:"name",
            },
            {
                label:"出生年代",
                name:"birth",
            },
            {
                label:"性别",
                name:"sex",
            },
            {
                label:"籍贯省",
                name:"province",
            },
            {
                label:"籍贯市",
                name:"city",
            },
            {
                label:"县镇",
                name:"county",
            },
            {
                label:"户籍地址",
                name:"address",
            },
            {
                label:"名族",
                name:"nation",
            },
            {
                label:"身份证号",
                name:"idcard",
            },
            {
                label:"教育程度",
                name:"education",
            },
            {
                label:"婚姻状况",
                name:"marital_status",
            },
            {
                label:"芝麻分",
                name:"score",
            },
            {
                label:"芝麻分采集月份",
                name:"which_month",
            },
        ],
        columns:[columns1,columns2],
        isRows:true,
    },
    {
        header:'欺诈信息',
        name:"fraud",
        key:"fraud",
        rows:[

            {
                label:"紧急联系人击中泛黑名单数量",
                name:"grayCount",
            },
            {
                label:"紧急联系人命中黑名单数量",
                name:"blackCount",
            },
            {
                label:"实名验证不通过次数",
                name:"idcardNotTrueCount",
            },
            {
                label:"手机号三要素验证不通过次数",
                name:"mobileNotTrueCount",
            },
            {
                label:"银行卡验证不通过次数",
                name:"accountnoNotTrueCount",
            },
        ],
        columns:[columns1,columns2],
        isRows:true,

    },
    {
        header:'可疑信息',
        name:"doubt",
        key:"doubt",
        rows:[
            {
                label:"身份证关联手机号码泛黑名单数量",
                name:"idCardMobileBlackCount",
            },
            {
                label:"身份证关联手机号码数量",
                name:"idCardMobileCount",
            },
            {
                label:"身份证关联手机号码泛灰名单数量",
                name:"idCardMobileGrayCount",
            },
            {
                label:"身份证关联银行卡数量",
                name:"idcardAccountCount",
            },
            {
                label:"身份证组合姓名数量",
                name:"idcardNameCount",
            },
        ],
        columns:[columns1,columns2],
        isRows:true,
    },
    {
        header:'行为偏好',
        name:"b",
        key:"b",
        labels:[],
        rows:[],
        columns:[columns1,columns2],
    },
    {
        header:'授信额度',
        name:"c",
        key:"c",
        labels:[],
        rows:[],
        columns:[columns1,columns2],
    },
    {
        header:'通讯信息',
        name:"communicationinfo",
        key:"communicationinfo",
        rows:[
            {
                label:"手机号相关联的身份证号码数量",
                name:"mobileconnectedidcardtotal",
            },
            {
                label:"手机通话联系人数量",
                name:"voicetonumberblacktotal",
            },
            {
                label:"泛黑名单通话次数",
                name:" firevoicetimes",
            },
            {
                label:"泛黑名单通话时长（分）",
                name:"firevoicedurationtotal",
            },
            {
                label:"手机通话联系人命中火眼泛黑名单数量",
                name:"voicetonumberfiretotal",
            },
            {
                label:"主叫联系人泛黑名单数量",
                name:"callingongeneralizeblacktotal",
            },
           
            {
                label:"被叫联系人命中火眼泛黑名单数量",
                name:"calledongeneralizeblacktotal",
            },
            {
                label:"紧密联系人命中泛黑名单数量",
                name:"closeongeneralizeblacktotal",
            },
            {
                label:"手机通话联系人命中火眼黑名单数量",
                name:"voicetonumberblacktotal",
            },
            {
                label:"主叫联系人黑名单数量",
                name:"callingonblacktotal",
            },
            {
                label:"被叫联系人数量",
                name:"calledpersontotal",
            },
            {
                label:"紧密联系人数量",
                name:"contactpersontotal",
            },
            {
                label:"手机号下银行卡数量",
                name:"accountnototal",
            },
            {
                label:"主叫联系人数量",
                name:"callingpersontotal",
            },
            {
                label:"紧密联系人命中黑名单数量",
                name:"closeonblacktotal",
            },
            {
                label:"手机号码关联身份证号码的数量",
                name:"mobileconnectedidcardtotal",
            },
            {
                label:"近6个月静默时长",
                name:"quietduration",
            },
            {
                label:"近6个月最长连续静默时长",
                name:"maxquietduration",
            },
            {
                label:"近6个月夜间通话时长(分)",
                name:"callnightvoiceduration",
            },
            {
                label:"近6个月夜间通话次数",
                name:"callnighttimes",
            },
            {
                label:"近六个月的日均通话次数",
                name:"voicetimesavg",
            },
           
            {
                label:"近六个月的日均通话时长",
                name:"durationavg",
            },
            {
                label:"近6个月静默时长占比",
                name:"quietdurationrate",
            },
         
            {
                label:"近六个月的月均消费金额（分）",
                name:"amt",
            },
            {
                label:"近6个月静默次数",
                name:"quiettimes",
            },
            {
                label:"在网时长",
                name:"extendphoneage",
            },
            {
                label:"手机号下的银行卡",
                name:"accountnos",
            },
            {
                label:"被叫联系人命中火眼黑名单数量",
                name:"calledonblacktotal",
            },
            {
                label:"泛黑名单通话时长占比",
                name:"firevoiceratio",
            },
        ],
        columns:[columns1,columns2],
        isRows:true,
    },
    {
        header:'银行卡信息',
        name:"accountNO",
        key:"accountNO",
        rows:[
           {
               label:'银行卡号码',
               name:"accountNO",
           },
           {
               label:"银行卡关联的其他身份证号码",
               name:"idcard",
           },
           {
               label:"银行卡关联身份证数量",
               name:"idCardTotal",
           },
           {
               label:"银行卡关联手机号码",
               name:"mobileList",
           },
           {
                label:"关联手机号码数量",
                name:"mobileTotal",
           }
        ],
        columns:[columns1,columns2],
        isRows:true,
    },
    {
        header:'收入信息',
        name:"e",
        key:"e",
        labels:[],
        rows:[],
        columns:[columns1,columns2],
    },
    {
        header:'文化程度',
        name:"f",
        key:"f",
        labels:['学历层次'],
        rows:[],
        columns:[columns1,columns2],
    },
    {
        header:'多头信息',
        name:"multiinfo",
        key:"multiinfo",
        rows:[
            {
                label:"手机号",
                name:"phone",
            },
            {
                label:"注册平台总数",
                name:"registerPlatformTotal",
            },
            {
                label:"当天注册平台个数",
                name:"registerPlatformToday",
            },
            {
                label:"近3天注册平台数",
                name:"registerPlatform3Days",
            },
            {
                label:"近7天注册平台数",
                name:"registerPlatform7Days",
            },
            {
                label:"近15天注册平台数",
                name:"registerPlatform15Days",
            },
            {
                label:"近30天注册平台数",
                name:"registerPlatform30Days",
            },
            {
                label:"近60天注册平台数",
                name:"registerPlatform60Days",
            },
            {
                label:"近90天注册平台数",
                name:"registerPlatform90Days",
            },
            {
                label:"还款平台总数",
                name:"repaymentPlatformTotal",
            },
            {
                label:"今日还款平台数",
                name:"repaymentPlatformToday",
            },
            {
                label:"近3天还款平台数",
                name:"repaymentPlatform3Days",
            },
            {
                label:"近7天还款平台数",
                name:"repaymentPlatform7Days",
            },
            {
                label:"近15天还款平台数",
                name:"repaymentPlatform15Days",
            },
            {
                label:"近30天还款平台数",
                name:"repaymentPlatform30Days",
            },
            {
                label:"近60天还款平台数",
                name:"repaymentPlatform60Days",
            },
            {
                label:"近90天还款平台数",
                name:"repaymentPlatform90Days",
            },
            {
                label:"被拒平台总数",
                name:"refusePlatformTotal",
            },
            {
                label:"今日被拒平台数",
                name:"refusePlatformToday",
            },
            {
                label:"近3天被拒平台数",
                name:"refusePlatform3Days",
            },
            {
                label:"近7天被拒平台数",
                name:"refusePlatform7Days",
            },
            {
                label:"近15天被拒平台数",
                name:"refusePlatform15Days",
            },
            {
                label:"近30天被拒平台数",
                name:"refusePlatform30Days",
            },
            {
                label:"近60天被拒平台数",
                name:"refusePlatform60Days",
            },
            {
                label:"近90天被拒平台数",
                name:"refusePlatform90Days",
            },
            {
                label:"放款平台数",
                name:"loanPlatformTotal",
            },
            {
                label:"今日放款平台数",
                name:"loanPlatformToday",
            },
            {
                label:"近3天放款平台数",
                name:"loanPlatform3Days",
            },
            {
                label:"近7天放款平台数",
                name:"loanPlatform7Days",
            },
            {
                label:"近15天放款平台数",
                name:"loanPlatform15Days",
            },
            {
                label:"近30天放款平台数",
                name:"loanPlatform30Days",
            },
            {
                label:"近60天放款平台数",
                name:"loanPlatform60Days",
            },
            {
                label:"近90天放款平台数",
                name:"loanPlatform90Days",
            },
            {
                label:"身份证申请平台数",
                name:"idCardMpTimesRange",
            },
            {
                label:"今日身份证申请平台数",
                name:"todayIdCardApplicationTimeRange",
            },
            {
                label:"近7天身份证申请平台数",
                name:"lastSevenDayIdCardApplicationTimeRange",
            },
            {
                label:"近15天身份证申请平台数",
                name:"lastFifteenDayIdCardApplicationTimeRange",
            },
            {
                label:"近一个月身份证申请平台数",
                name:"lastAMonthIdCardApplicationTimeRange",
            },
            {
                label:"近两个月身份证申请平台数",
                name:"lastTwoMonthIdCardApplicationTimeRange",
            },
            {
                label:"近3个月身份证申请平台数",
                name:"lastThreeMonthIdCardApplicationTimeRange",
            },
            {
                label:"手机号查询平台数",
                name:"phoneMpTimesRange",
            },
            {
                label:"今日手机号申请平台数",
                name:"todayPhoneApplicationTimeRange",
            },
            {
                label:"近3天手机号申请平台数",
                name:"lastThreeDayPhoneApplicationTimeRange",
            },
            {
                label:"近7天手机号申请平台数",
                name:"lastSevenDayPhoneApplicationTimeRange",
            },
            {
                label:"近15天手机号申请平台数",
                name:"lastFifteenDayPhoneApplicationTimeRange",
            },
            {
                label:"近1个月手机号申请平台数",
                name:"lastAMonthPhoneApplicationTimeRange",
            },
            {
                label:"近2个月手机号申请平台数",
                name:"lastTwoMonthPhoneApplicationTimeRange",
            },
            {
                label:"近3个月手机号申请平台数",
                name:"lastThreeMonthPhoneApplicationTimeRange",
            },
        ],
        columns:[columns1,columns2],
        isRows:true,
    },
    {
        header:'共债信息',
        name:"debtinfo",
        key:"debtinfo",
        rows:[
            {
                label:"最高放款额度",
                name:"loanAmountMax",
            },
            {
                label:"最高逾期额度",
                name:"overdueAmountMax",
            },
            {
                label:"最大逾期天数",
                name:"overdueDaysMax",
            },
        ],
        columns:[columns1,columns2],
        isRows:true,
    },
    {
        header:'法院信息',
        name:"courtdiscredit",
        key:"courtdiscredit",
        labels:['有无法院涉诉记录','法院失信最早日期','法院失信最近日期','法院失信累计出现次数'],
        rows:[
            {
                label:"有无法院涉诉记录",
                name:"isDiscredit",
            },
            {
                label:"法院失信累计出现次数",
                name:"discreditCount",
            }
        ],
        columns:[columns1,columns2],
        isRows:true,
    },
    {
        header:'工作信息',
        name:"g",
        key:"g",
        rows:[],
        columns:[columns1,columns2],
    },
    {
        header:'消费信息',
        name:"h",
        key:"h",
        rows:[],
        columns:[columns1,columns2],
    },
]

function arrayToObject(list){
     const data={};
     if(!list){
        return 
     }
     list.forEach((item)=>{
        if(item.length>0){
            data[item[0].parameGroup]={
                list:item,
            };
        } 
     });
/*      console.log(data); */
     return data;
}

function mergeAttr(n,o){
    for(let k in n){
        if(isArray(n[k])){
            n[k]=[...n[k],...o[k]]
        }else{
            n[k]=o[k];
        }
    }
    return n;
}

function merge(data){
   const d = {};
   for(let k in data){
       for(let i=0;i<tabList.length;i++){
            let key = tabList[i].key;
            if(isString(key)){
                if(key==k){
                    d[k]=data[k];
                }
            }
            if(isArray(key)){
                let name = tabList[i].name;
                key.forEach((k1)=>{
                    if(k==k1){
                        if(!isEmpty(d[name])){
                            d[name]=mergeAttr(data[k1],d[name])
                        }else{
                            d[name]=data[k1]
                        }
                    }
                })
            }
       }
   }
   return d
}

function filterAttr(list,libs){
   if(!libs){
        return list;
   } 
   return filter(list,function(o){
        return find(libs,function(l){
            if(o.parameKey==l.name){
                return true
            }
        })
   })
}

function store(list,libs){
    if(!libs){
        return list;
    }
    return libs.map(({name,label,render})=>{
        const val=find(list,function(l,key){
            if(l.parameKey==name){
                return true
            }
        })
        return {label,name,...val,render}
    })
}

export const createTableData = (data,key,labels)=>{
    console.log(data)
    console.log(key,labels)
    if(!data || !data[key]){
        return [];
    }
    console.log(data[key],labels)
    const lfTable=filterAttr(store(data[key],labels));
    const lrTable = [];
    const data1=concat([],map(lfTable,({label,name,zyxType,zyxInwardness,zyxAttributes,resContent,render})=>{
        if(render){
            return {
                name:label,
                key:name,
                type:zyxType,
                param:resContent,
                attr:zyxAttributes,
                flag:zyxInwardness,
            }
        }else{
            return {
                name:label,
                key:name,
                type:zyxType,
                param:resContent,
                attr:zyxAttributes,
                flag:zyxInwardness,
            }
        }
    }),lrTable);
    return [data1,[]];
}

export const createPanelData=(data)=>{
    return tabList.map(({header,columns,name,rows,isRows})=>{
        const tableData=createTableData(data,name, isRows ? rows :[] );
        const list=columns.map((d,i)=>{
           /*  console.log(tableData); */
            return {columns:d,data:tableData[i]}
        })
        return {
            header,
            data:list,
        }
    })
}

export const createFirstTable =(data)=>{
    const nData=data;
    const tableData= createTableData(nData,'credit',table_first);
    const columns =[columns1,columns2];
    return columns.map((d,i)=>{
        return {columns:d,data:tableData[i]}
    })
}



  


