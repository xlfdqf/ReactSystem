import React, {PureComponent,Fragment} from 'react';
import {connect} from 'dva';
import {Divider, Row, Col, Card,Popover} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderLayout from '@/components/PageHeaderWrapper';
import styles from './analysisReport.less';
import {isFunction} from "lodash"
import {numFilter,unitNumber} from "@/utils/utils";

const renderColumn=({values,key},callback?:(val:object)=>object):JSX.Element=>{
    const nVal = isFunction(callback) ?  callback(values) : values;
    return (
        <div className="n-td-div">
            {
                nVal.map((v,i) => {
                    return (<div key={`${key}-${i}`} style={{ width:'70px'}} className={v.className}>{v.value}</div>)
                })
            }
        </div>
    )
};
const renderColumnPopover=({values,key},callback?:(val:any)=>string):JSX.Element=>{
    const nVal = isFunction(callback) ?  callback(values) : values;
    return (
        <div className="n-td-div">
            {
                nVal.map((v,i) => {
                    return (
                        <Popover key={`${key}-${i}`}  content={v.dValue} title={null}   trigger="hover" >
                            <div    style={{ width:'70px'}} className={v.className}>{v.value}</div>
                        </Popover>
                        
                    )
                })
            }
        </div>
    )
};

// 根据 百分比区分显示字体颜色
const getColor=function(n){
  if(n>=0.10 && n<0.20){
    return 'n-orange';
  }
  if(n>0.20){
    return 'n-red';
  }

  return ''
}

const getNumber=(val)=>{
    const lists=val.split('-');
    let num=0;
    for(let i=0;i<lists.length;i++){
        num+=lists[i]
    }
    return num;
}

// 年龄排序
const ageSort=function(list){
    return list.sort((a,b)=>{
        return getNumber(a)-getNumber(b);
    });
}


const columnsCallback=(values:Array<object>):Array<object>=>{
    return values.map(function(v){
        return {value:(v ? numFilter(v*100,4): 0)+'%',className:getColor(v),dValue:v}
    })
}

const columnsNumberCallback=(values)=>{
    return values.map(function(v){
        return {value:unitNumber(v),className:'',dValue:v};
    })
}

interface characteristicsProp{
    characteristics:{
        sourceList:Array<object>,
        updateDate:string,
    },
    loading:boolean,
    dispatch(action:object):void,
}

interface characteristicsState{
    selectedRows:Array<string|number>,
}

@connect(({characteristics, loading}) => ({characteristics, loading: loading.models.characteristics}))
export default class Characteristics extends PureComponent<characteristicsProp,characteristicsState> {

    state={
        selectedRows:[],
        isDetail:false,
    }

    rowClassNameCallback=({selectedRowKeys},record, index)=>{
        const f= this.hasSelect(selectedRowKeys,index);

        if(f){
            return 'n-table-row-select';
        }
  
        return 'n-table-row'
    }
    tOnRow=({index})=>{
        const _this=this;
        return {
            onClick:(event)=>{
                const isSelect =_this.hasSelect(_this.state.selectedRows,index);
                if(!isSelect){
                    _this.confirmSelection(index);
                }else{
                    _this.cancelSelection(index);
                }
            }
        }
    }

    // 确认选择
    confirmSelection=(index)=>{
       this.setState({
        selectedRows:[...this.state.selectedRows,index],
       });
    }
    // 取消选择
    cancelSelection=(index)=>{
        this.setState({
            selectedRows: this.state.selectedRows.filter((item)=>{if(item!==index){return true}}),
        });
    }

    // 是否选中
    hasSelect=(selectedRowKeys,index)=>{
        const v= selectedRowKeys.filter(item=>item===index);
        if(v.length>0){
            return true;
        }
    }
    closeDetail = bol => {
        this.setState({
          isDetail:false
        });
      };

    render() {
        const {characteristics,loading}=this.props;
        const { isDetail } = this.state;
        const _this=this;
        const columns = [
            {
                title: '特征分类',
                dataIndex: 'classification',
                width:46,
                fixed: 'left',
                key: 0,
            }, 
            {
                title: '特征名称',
                dataIndex: 'featurenameVal',
                width:46,
                fixed: 'left',
                key: 1,
            }, 
            {
                title: '特征属性变量',
                dataIndex: 'variate',
                width:109,
                fixed: 'left',
                key: 2,
                render(val,{key,featurename},index){
                    let list=val;
                    if(featurename==='age'){
                        list=val;
                    }
                    // if(featurename==='sex'){
                    //     if(val[0]==='F'){
                    //        return '女'
                    //     }
                    //     if(val[1]==='M'){
                    //         return '男'
                    //      }
                    // }
                   return renderColumnPopover({values:list,key},function(values){
                       return values.map((v)=>{
                           return{value:v,dValue:v}
                       })
                   });
                }
            }, 
            {
                title: '全部借款人数量',
                dataIndex: 'total',
                width:109,
                key: 3,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsNumberCallback);
                }
            }, 
            {
                title: '好人数量',
                dataIndex: 'goodperson',
                width:109,
                key: 4,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsNumberCallback);
                }
            }, 
            {
                title: '未知数量',
                dataIndex: 'unknown',
                width:109,
                key: 5,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsNumberCallback);
                }
            }, 
            {
                title: '拒贷数量',
                dataIndex: 'deniedloans',
                width:109,
                key: 6,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsNumberCallback);
                }
            }, 
            {
                title: '逾期数量',
                dataIndex: 'overdue',
                width:109,
                key:7,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsNumberCallback);
                }
            }, 
            {
                title: '灰名单数量',
                dataIndex: 'greylist',
                width:109,
                key:8,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsNumberCallback);
                }
            }, 
            {
                title: '黑名单数量',
                dataIndex: 'black',
                width:109,
                key:9,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsNumberCallback);
                }
            }, 
            {
                title: '好人概率',
                dataIndex: 'goodrate',
                width:109,
                key:10,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsCallback);
                }
            }, 
            {
                title: '未知概率',
                dataIndex: 'unknownrate',
                width:109,
                key: 11,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsCallback);
                }
            }, 
            {
                title: '拒贷概率',
                dataIndex: 'deniedloansrate', //refusedprobability
                width:109,
                key: 12,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsCallback);
                }
            }, 
            {
                title: '逾期概率',
                dataIndex: 'overduerate',
                width:109,
                key: 13,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsCallback);
                }
            }, 
            {
                title: '灰名单概率',
                dataIndex: 'greylistrate',
                width:109,
                key: 14,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsCallback);
                }
            }, 
            {
                title: '黑名单概率',
                dataIndex: 'blackrate',
                width:109,
                key: 15,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsCallback);
                }
            }, 
            {
                title: '全部借款人比率%',
                dataIndex: 'totalratio',
                width:109,
                key:16,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsCallback);
                }
            }, 
            {
                title: '好人比率%',
                dataIndex: 'goodratio',
                width:109,
                key:17,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsCallback);
                }
            }, 
            {
                title: '未知比率%',
                dataIndex: 'unknownratio',
                width:109,
                key:18,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsCallback);
                }
            }, 
            {
                title: '拒贷比率%', //未知
                dataIndex: 'deniedloansratio', //refusedratio
                width:109,
                key:19,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsCallback);
                }
            }, 
            {
                title: '逾期比率%',
                dataIndex: 'overdueratio',
                width:109,
                key:20,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsCallback);
                }
            }, 
            {
                title: '灰名单比率%',
                dataIndex: 'greylistratio', //greyratio
                width:109,
                key: 21,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsCallback);
                }
            }, 
            {
                title: '黑名单比率%',
                dataIndex: 'blackratio',
                width:109,
                key:22,
                render(val,{key},index){
                    return renderColumn({values:val,key},columnsCallback);
                }
            },
            // {
            //     title: '查看',
            //     dataIndex: 'detail',
            //     width:50,
            //     fixed: 'right',
            //     key:24,
            //     render(text, record, index){
            //         return(
            //             <Fragment>
            //             <a onClick={() =>{ _this.setState({ isDetail:true }),()=> {
            //                 console.log(alert('详情'))
            //             } }}>
            //                 详情
            //             </a>
            //             </Fragment>
            //         )
            //     }
            // },
            {
                title: '操作',
                dataIndex: 'choose',
                width:50,
                fixed: 'right',
                key:23,
                render(text, record, index){
                    const isSelect =_this.hasSelect(_this.state.selectedRows,index);
                    return  (
                        <Fragment>
                            <a onClick={()=>{

                            }}>
                                未选
                            </a>
                            <Divider type="horizontal" />
                            <a className={isSelect ? 'select' : ' '}   onClick={()=>{
                                if(isSelect){
                                    return;
                                }
                                 
                                  _this.confirmSelection(index);
                            }}>
                                选中
                            </a>
                            <Divider type="horizontal" />
                            <a  className={!isSelect ? 'select' : ' '} onClick={()=>{
                                if(!isSelect){
                                    return;
                                }
                                  _this.cancelSelection(index);
                            }}>
                                取消选中
                            </a>
                            
                        </Fragment>
                    )
                }
            }
        ];


        return (
          <PageHeaderLayout title='累计特征分析报告'>
          <Card bordered={false}>
              <div>
                  <Row className={styles.analysisReportTop}>
                      <Col span={8}> 
                        <Row>
                            <Col span={12}> <span className="n-red">20%以上的数字标红 </span></Col>
                            <Col span={12}> <span  className="n-orange">10%-20%的数字标橙色</span></Col>
                        </Row>
                      </Col>  
                      <Col offset={10} span={4}>
                          <span className="text-red">最后更新时间</span>
                          <span className="text-red">{characteristics.updateDate}</span>
                        </Col>
                    </Row>
                  <StandardTable selectedRows={this.state.selectedRows} rowClassName={this.rowClassNameCallback} onRow={this.tOnRow} columns={columns} loading={loading} data={{list:characteristics.sourceList,pagination:false}}  scroll={{ x: 2450,y:600 }}  rowSelectionClose={true}  rowKey="key"  closeAlert  bordered />
                </div>
        </Card>
          </PageHeaderLayout>
        )
    }
    componentDidMount(){
        this.props.dispatch({
            type:"characteristics/initLoad"
        });

    }
}
