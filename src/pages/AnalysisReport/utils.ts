export const dataTypes:dataType=[
    {
        classification:"基本信息",
        list:[
            {
                featurename:"age",
                value:"年龄",
            },
            {
                featurename:"nation",
                value:"民族",
            },
            {
                featurename:"score",
                value:"芝麻分",
            },
            {
                featurename:'constellation',
                value:"星座",
            },
            {
                featurename:'edu',
                value:"学历",
            },
            {
                featurename:'province',
                value:"户籍省",
            },
            {
                featurename:'nativeprovince',
                value:"籍贯省",
            },
            {
                featurename:'sex',
                value:"性别",
            }
        ],
        index:0,
    },
    {
        classification: "欺诈信息",
        index:1,
        list:[
            {
                featurename:'blackTotal',
                value:"紧急联系人黑名单数量",

            }, 
            {
                featurename:'gray',
                value:"紧急联系人灰名单数量",

            },  
            {
                featurename:'realNameNoPassCount',
                value:"实名验证不通过次数",

            },     
            // {
            //     featurename:'grayCount',
            //     value:"紧急联系人灰名单数量",

            // },  
            {
                featurename:'threelemNoPassCount',
                value:"手机三要素验证不通过次数",

            },  
            {
                featurename:'bankcardNoPassCount',
                value:"银行卡验证不通过次数",

            },  
           
        ],
    },
    {
        classification: "可疑信息",
        index:2,
        list:[
            {
                featurename:'idnames',
                value:"身份证组合其他姓名数量",

            },  
            {
                featurename:'bankcardCount',
                value:"身份证关联银行卡数量",

            }, 
            {
                featurename:'idphones',
                value:"身份证关联手机号数量",

            },  
            {
                featurename:'idblackTotal',
                value:"身份证关联手机号码黑名单数量",

            },  
            {
                featurename:'phonesgray',
                value:"身份证关联手机号码灰名单数量",

            },  
        ],
    },
    {
        classification: "通讯信息",
        index:3,
        list:[
            {
                featurename:'extendphoneage',
                value:"在网时长（月）",
            },  
            {
                featurename:'amt',
                value:"近六个月的月均消费金额（分）",
            },  
            {
                featurename:'contactpersontotal',
                value:"紧密联系人数量",
            },  
            {
                featurename:'closeonblacktotal',
                value:"紧密联系人命中黑名单数量",
            },  
            {
                featurename:'closeongeneralizeblacktotal',
                value:"紧密联系人命中泛黑名单数量",
            },  
            {
                featurename:'voicetonumbertotal',
                value:"手机通话联系人数量",
            },  
            {
                featurename:'voicetonumberblacktotal',
                value:"手机通话联系人命中火眼黑名单数量",
            },  
            {
                featurename:'voicetonumberfiretotal',
                value:"手机通话联系人命中火眼泛黑名单数量",
            },  

            {
                featurename:'firevoicetimes',
                value:"泛黑名单通话次数",
            },  
            {
                featurename:'firevoicedurationtotal',
                value:"泛黑名单通话时长（分）",
            },  
            {
                featurename:'firevoiceratio',
                value:"泛黑名单通话时长占比",
            },  
            {
                featurename:'callingpersontotal',
                value:"主叫联系人数量",
            },  
            {
                featurename:'callingonblacktotal',
                value:"主叫联系人黑名单数量",
            },  
            {
                featurename:'callingongeneralizeblacktotal',
                value:"主叫联系人泛黑名单数量",
            },  
            {
                featurename:'calledpersontotal',
                value:"被叫联系人数量",
            },  
            {
                featurename:'calledonblacktotal',
                value:"被叫联系人命中火眼黑名单数量",
            },  
            {
                featurename:'calledongeneralizeblacktotal',
                value:"被叫联系人命中火眼泛黑名单数量",
            },  
            {
                featurename:'durationavg',
                value:"近六个月的日均通话时长（秒）",
            },  
            {
                featurename:'voicetimesavg',
                value:"近六个月的日均通话次数",
            },  
            {
                featurename:'callnighttimes',
                value:"近6个月夜间通话次数",
            },  
            {
                featurename:'callnightvoiceduration',
                value:"近6个月夜间通话时长（分）",
            },  
            {
                featurename:'quietduration',
                value:"近6个月静默时长（毫秒）",
            },  
            {
                featurename:'quiettimes',
                value:"近6个月静默次数",
            },  
            {
                featurename:'maxquietduration',
                value:"近6个月最长连续静默时长（毫秒）",
            },  
        ],
    },
    {
        classification: "多头信息",
        index:4,
        list:[
            {
                featurename:'registerPlatformTotal',
                value:"累计注册平台个数",
            },  
            // {
            //     featurename:'registerPlatformToday',
            //     value:"当天注册平台个数",
            // },
            {
                featurename:'registerPlatform3Days',
                value:"近3天注册平台个数",
            },  
            {
                featurename:'registerPlatform7Days',
                value:"近7天注册平台个数",
            },  
            {
                featurename:'registerPlatform15Days',
                value:"近15天注册平台个数",
            },  
            {
                featurename:'registerPlatform30Days',
                value:"近30天注册平台个数",
            },  
            {
                featurename:'registerPlatform60Days',
                value:"近60天注册平台个数",
            },  
            {
                featurename:'registerPlatform90Days',
                value:"近90天注册平台个数",
            },  
            {
                featurename:'refuseplatformtotal',
                value:"累计拒贷平台个数",
            },  
            {
                featurename:'refuseplatform3days',
                value:"近3天拒贷平台个数",
            },  
            {
                featurename:'refuseplatform7days',
                value:"近7天拒贷平台个数",
            },  
            {
                featurename:'refuseplatform30days',
                value:"近30天拒贷平台个数",
            },  
            {
                featurename:'refuseplatform60days',
                value:"近60天拒贷平台个数",
            },  
            {
                featurename:'refuseplatform90days',
                value:"近90天拒贷平台个数",
            },  
            {
                featurename:'loanplatformtotal',
                value:"累计放款平台个数",
            },  
            {
                featurename:'loanplatform3days',
                value:"近3天放款平台个数",
            },  
            {
                featurename:'loanplatform7days',
                value:"近7天放款平台个数",
            },  

            {
                featurename:'loanplatform15days',
                value:"近15天放款平台个数",
            },  
            {
                featurename:'loanplatform30days',
                value:"近30天放款平台个数",
            },  
            {
                featurename:'loanplatform60days',
                value:"近60天放款平台个数",
            },  
            {
                featurename:'loanplatform90days',
                value:"近90天放款平台个数",
            },  
            {
                featurename:'repaymentplatformtotal',
                value:"累计还款平台个数",
            },  
            {
                featurename:'repaymentplatform3days',
                value:"近3天还款平台个数",
            },  
            {
                featurename:'repaymentplatform7days',
                value:"近7天还款平台个数",
            },  
            {
                featurename:'repaymentplatform15days',
                value:"近15天还款平台个数",
            },  
            {
                featurename:'repaymentplatform30days',
                value:"近30天还款平台个数",
            },  
            {
                featurename:'repaymentplatform60days',
                value:"近60天还款平台个数",
            },  
            {
                featurename:'repaymentplatform90days',
                value:"近90天还款平台个数",
            },  
            {
                featurename:'overdueplatformtotal',
                value:"累计逾期平台个数",
            },  
            {
                featurename:'overdueplatform3days',
                value:"近3天逾期平台个数",
            },  
            {
                featurename:'overdueplatform7days',
                value:"近7天逾期平台个数",
            },  
            {
                featurename:'overdueplatform15days',
                value:"近15天逾期平台个数",
            },  
            {
                featurename:'overdueplatform30days',
                value:"近30天逾期平台个数",
            },  
            {
                featurename:'overdueplatform60days',
                value:"近60天逾期平台个数",
            },  
            {
                featurename:'overdueplatform90days',
                value:"近90天逾期平台个数",
            },  

        ],
    },
    {
        classification:"共债信息",
        index:5,
        list:[
            {
                featurename:'loanamountmax',
                value:"最高放款额度",
            },
            {
                featurename:'overdueamtmax',
                value:"最高逾期额度",
            },
            {
                featurename:'overduedaysmax', 
                value:"最大逾期天数",
            },
           /*  {
                featurename:'idCard',
                value:"身份证号",
            },
            {
                featurename:'dT',
                value:"分区",
            }, */
        ],
    },
    {
        classification: "法院信息",
        index:6,
        list:[
            {
                featurename:'courtInvolved',
                value:"有无法院涉诉记录",
            },
            {
                featurename:'courtLostTrust',
                value:"法院失信累计出现次数",
            },
        ],
    }
];

type dataType= object[];

function filterData(sourceList:[],filterList:Array<object>,fun,name:string):Array<object>{
    // console.log(sourceList) //年龄排序后的数据
   //   console.log(filterList) //dataType
     //   console.log(fun) //函数
   // console.log(name) //classification 分类
    const data = filterList.map(fun); // dataTypes: featurename,featurenameVal,types:[]
    // console.log('dataTypes中定义的类别:')
    // console.log(data) //是数组
    sourceList.forEach((item)=>{
        // console.log(item)
        // console.log('item[name]:',item[name]) 
        const fData=data.filter((f)=>{//将dataTypes中的classification和后端返回数据classification判断
            //  console.log(f)
            // console.log(f[name],item[name])
            if(f[name]===item[name]){ 
                return true; //filter函数会返回data中为true那项的数组
            }
        })[0];
    
    //    console.log(fData) 
        if(fData){
            fData.list.forEach((d)=>{
               // console.log('d',d) 
                // console.log(item['charaname'],d['featurenameVal'])
                if(item['featurename']===d['featurename']){//将后端返回数据和dataTypes中的featurename判断
                    d.types.push({...item,featurenameVal:d.featurenameVal});
                }
                // console.log(d)
            })
        }
    }); 
    // console.log('filterData')
    // console.log(data)
    return data
}

function createColumnType(list:[]):object{ 
//    console.log(list) // types
    const data = {
        variate:[],//特征属性变量
        total:[],//全部借款人数量
        goodperson:[], //好人数量
        unknown:[],//未知数量
        deniedloans:[],//拒贷数量
        overdue:[],//逾期数量
        greylist:[],//灰名单数量
        black:[],//黑名单数量
        goodrate:[],//好人概率
        unknownrate:[],//未知概率
        deniedloansrate:[],//拒贷概率
        overduerate:[],//逾期概率
        greylistrate:[],//灰名单概率
        blackrate:[],//黑名单概率
        totalratio:[],//全部借款人比率
        goodratio:[],
        unknownratio:[],
        deniedloansratio:[],//拒贷比率
        overdueratio:[],
        greylistratio:[],//灰名单比率
        blackratio:[],
    };
    list.forEach((item:object)=>{
        // console.log(item)
        for(let k in item){ // for in遍历对象
            if(data[k]){ //data[k]是data下的key
                data[k].push(item[k]) // 根据k匹配将同一key的值放在一个数组中
            }
            // if(data[k]==data.attributevariable){
            //    console.log(data[k])
            // }
        }
    });
    // console.log(data)
    return data;
}

const getNumber=(val)=>{
    const lists=val.split('-');
    let num=0;
    for(let i=0;i<lists.length;i++){
        num+=lists[i]
    }
    return num;
}

function sortAge(list){
    // console.log('后端返回的数据')
    // console.log(list)
    const ageData= [];
    const otherData=[];
    list.forEach((item,index)=>{
        // console.log('循环item')
        // console.log(item)
        if(item.featurename==='age'){ // if(item.charaname===age)
            ageData.push(item)
        }else{
           /*  if(item.classification=="共债信息"){
                console.log(item.featurename,item,index)
            } */
            otherData.push(item)
        }
     });
    //  console.log('排序前ageData')
    //  console.log(ageData)
    ageData.sort((a,b)=>{
        // console.log('ageData')
        // console.log(a.variate,b.variate)
        return getNumber(a.variate)-getNumber(b.variate); // a.attributevariable
    });
    // console.log('排序后ageData')
    // console.log(ageData)
    return ageData.concat(otherData);
}

//分成特征大类 list:后端返回数据
export function createMainType(list:[]):Array<object>{
    const dataList=[];
    // console.log('sortAge(list)')
    // console.log(sortAge(list))
    filterData(sortAge(list),dataTypes,({classification,list})=>{
        //  console.log(classification)
        return {
            classification,
            list:list.map(({featurename,value})=>({featurename,featurenameVal:value,types:[]}))
        }
    },'classification').forEach(({classification,list},fIndex)=>{
        // console.log(list)
        list.forEach(({featurename,featurenameVal,types},tIndex)=>{
            const d = createColumnType(types);
          // console.log(d) // 其他数组的值
            dataList.push({classification,featurename,featurenameVal,types,index:dataList.length ,key:`${fIndex}-${tIndex}`,...d});
        })
    })
    // console.log('页面表格展示的数据');
    // console.log(dataList);
    return dataList;
}

export function createTableData(list:[]):Array<object>{
    return createMainType(list);
}




