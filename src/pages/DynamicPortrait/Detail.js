import {PureComponent} from "react"
import {Row,Col,Table,Collapse,BackTop} from "antd"
import Back from "@/components/Back"
import PropTypes  from "prop-types";
import classnames from "classnames"
import styles from "./detail.less"
import moment from "moment";
import {getCurrentType} from "@/utils/utils";
import {columns1,columns2,createFirstTable,createPanelData} from "./dyUtils.js";
const Panel = Collapse.Panel;

const DetailHeader=({params:{list,type}})=>{
    return(
      <div className={styles['dynamicPortrait-header']}>
        <Row className={styles['dynamicPortrait-header-top']}>   
          <Col span={8} offset={8}>
            <h3 className={styles['dynamicPortrait-header-title']} > 大圣用户反欺诈画像详情</h3>
          </Col>
          <Col span={6} offset={2}>
            <span style={{color:'#1890ff'}}>当前样本分类：</span>
            <span>{getCurrentType(type)}</span>
          </Col>
        </Row>
        <Row>
          { // 循环展示头部详情表单数据list
            list.map(({label,text,type},i)=>{
                return(
                    <Col key={i} xl={8}  lg={12} sm={12} style={{'padding':'10px 0'}}>
                    <span className={classnames([styles['text-label'],type==0 ? styles['text-blue'] : styles['text-red']])}>{label}</span>
                    <span className={type==0 ? styles['text-blue'] : styles['text-red']}>{text}</span>
                    </Col>
                )
            })
            }
        </Row>
      </div>
    )
}

// 创建公共表格及数据展示
const CreateTable=({list})=>{
    // console.log(list)
    return (
      <Row gutter={{lg:16}}>
        {
                list.map(({columns,data},i)=>{
                    console.log(columns,data)
                    return(
                      <Col xxl={{span:12}} xl={{span:24}} key={i}>
                        <Table  className={classnames('dynamicPortrait-detail-table','table-layout-fixed')} pagination={false} bordered columns={columns} dataSource={data} />
                      </Col>
                        )
                })
            }
      </Row>
    )
}

export default class Detail extends PureComponent{
    static defaultProps={
        loading:false,
    }
    static propTypes={
        loading:PropTypes.bool,
    }

    //返回头部表单数据
    createHeadData=(data)=>{
        let list=[
            {
                label:'身份证号码',
                text:"",
                key:'idcard',
                type:"0",
            },
            {
                label:"样本完整度%",
                text:"",
                key:'a',
                type:"1",
            },
            {
                label:"入库时间",
                text:"",
                key:'insertDate',
                type:"1",
            },
            {
                label:"风险评分",
                text:"",
                key:'b',
                type:"0",
            },
            {
                label:"拒绝参考分值",
                text:"",
                key:'c',
                type:"0",
            },
            {
                label:"最后更新时间",
                text:"",
                key:'updateDate',
                type:"1",
            },
        ];

        let otherData={type:""}
        if(data){
            list = list.map(({key,...d})=>{
                if(key=="updateDate" || key=="insertDate"){
                    return {...d,text:moment(data[key]).format('YYYY-MM-DD')}
                }
                return {...d,text:data[key]}
            });
            otherData.type=data.tabType
        }
        return {list,...otherData} //{list:{label,text,key,type},type}
    }
   
   // 折叠面板
    createCollapse=(list)=>{
        return(
          <Collapse>
            {
                list.map(({header,data},i)=>{
                    return(
                        <Panel header={header} key={i}>
                        <CreateTable list={data} />
                        </Panel>
                    )
                })
            }
          </Collapse>
        )
    }

    render(){
        const {loading,data} = this.props; //data是后端返回数据
        // console.log(this.props)
        const firstTableData=createFirstTable(data.list);
        const panelData=createPanelData(data.list);
        // console.log(panelData)
        return(
          <div className={styles['dynamicPortrait-detail']}>
           {/* params={list:{label,text,key,type},tabType} */}
            <DetailHeader params={this.createHeadData(data)} /> 
            <div className={styles['dynamicPortrait-detail-content']}>
                <div className={  styles['dynamicPortrait-detail-content-top'] } >
                    {
                        <CreateTable  list={firstTableData} /> //默认展开的表格
                    }
                </div>
                   {
                       this.createCollapse(panelData) //折叠面板
                   }
            </div>
            <BackTop />
            <Back title={'返回'} onClick={()=>{
                window.scrollTo(0,0)
                this.props.backCallback();

            }} />
          </div>
        )

    }
}
