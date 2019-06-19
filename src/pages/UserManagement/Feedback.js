import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    Dropdown,
    Menu,
    InputNumber,
    DatePicker,
    Modal,
    message,
    Badge,
    notification,
    Divider,
    Popover,
    AutoComplete,
} from 'antd';
import StandardTable from 'components/StandardTable';
import FormModal from 'components/FormModal';

import {isArray} from 'lodash';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './userManagement.less';
import {filter_attr,ad} from '../../utils/utils';

const FormItem= Form.Item;
const {TextArea} = Input;


@connect(({feedback, loading}) => ({feedback, loading: loading.models.feedback}))
@Form.create()
export default class UserManagement extends PureComponent {
    state = {
        modalVisible: false,
        selectedRows: [],
        detailModalVisible:false,
    };

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'feedback/iniLoad',
        });

    }

    /**
     *分页切换
     *
     * @param {*} pagination
     * @param {*} filtersArg
     * @param {*} sorter
     */
    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const {dispatch} = this.props;

        const params = {
            cp: pagination.current,
            ps: pagination.pageSize,
        };
        
        dispatch({
            type: 'feedback/fetch',
            payload: {
                ...params,
            },
        })
       
    };

    /**
     *重置密码
     *
     * @param {*} record
     */
    resPassword=(record)=>{
      const {dispatch} = this.props;
      this.setState({selectedRows: [record]});
      const {tel} = record;
      dispatch({
          type: 'feedback/rest',
          payload: {
              passWord: 'a123456',
              phone: tel,
          },
      })
    }


    handleSearch=(e)=>{
        e && e.preventDefault();
        const {dispatch,form} = this.props;
        form.validateFields((err, fieldsValue) => {
            if(err){
                return;
            }

            let params = filter_attr(fieldsValue);
            const {date,...o} = params;
            if(isArray(date)){
                const statTime= moment(date[0]).format("YYYY-MM-DD HH:mm:ss");
                const endTime = moment(date[1]).format("YYYY-MM-DD HH:mm:ss")
                params={statTime,endTime,...o}
            }



            dispatch({
                type: 'feedback/fetch',
                payload:{
                    cp:1,
                    ps:10,
                    ...params,
                },
            });



        })
    }


    /**
     *搜索
    *
    * @returns
    * @memberof TableList
    */
   renderAdvancedForm() {
        const {form,feedback:{sourceList},dispatch} = this.props;
        const {getFieldDecorator} = form;
        const statusList=[
            {
                label:"已处理",
                value:1,
            },
            {
                label:"未处理",
                value:0,
            },
        ];


        return (
          <Form onSubmit={this.handleSearch} layout="inline">
            <Row
              gutter={{
                    md: 8,
                    lg: 24,
                    xl: 48,
                }}
            >
              <Col md={7}>
                <FormItem label="反馈内容">
                  {getFieldDecorator('content')(<AutoComplete
                    style={{width:"100%"}}
                    dataSource={sourceList}
                    onSearch={(text)=>{
                      dispatch({
                          type:"feedback/search",
                          payload:{cp:1,ps:10,content:text},
                          
                      });
                  }}
                  />)}
                </FormItem>
              </Col>
              <Col md={5}>
                <FormItem label="状态">
                  {getFieldDecorator('status')(
                    <Select>
                      {
                            statusList.map((item)=>{
                                return(
                                  <Option value={item.value} key={item.value}>{item.label}</Option>
                                )
                            })
                        }
                     
                    </Select>    
                   )}
                </FormItem>
              </Col>
              <Col md={6}>
                <Button type="primary" htmlType="submit">查询</Button>
                <Button
                  style={{
                            marginLeft: 8,
                        }}
                  onClick={this.handleFormReset}
                >
                            取消
                </Button>
              </Col>
            </Row>

          </Form>
        );
   }

    /**
     *详情
     *
     */
    renderDetail=()=>{
        const {detailModalVisible} = this.state;
        const {feedback:{detailData:{content,remark,status,id,userNo}},dispatch} = this.props;
        const buttons =()=>{
            return (
              <div>
                  {
                      status===0 
                      ? 
                      <Button
                      type='primary'
                      style={{marginRight:15}}
                      onClick={()=>{
                            const remark = this.fromModal.getFieldValue("remark")
                            this.fromModal.resetFields();
                            this.setState({
                                detailModalVisible:false,
                            },()=>{
                                dispatch({
                                    type:"feedback/treate",
                                    payload:{
                                        id,
                                        remark,
                                    }
                                });

                            });
                            
                            
                        }}
                    >处理
                    </Button>
                    :
                    <Button
                    type='primary'
                    style={{marginRight:15}}
                    onClick={()=>{
                 
                        
                          this.fromModal.resetFields();
                          this.setState({
                              detailModalVisible:false,
                          },()=>{
                            dispatch({
                                type:"feedback/reTreate",
                                payload:{
                                    id,
                                }
                            });
                          });
                      }}
                  >重新处理
                  </Button>
                  }
               
                <Button onClick={()=>{
                       this.fromModal.resetFields();
                       this.setState({
                        detailModalVisible:false,
                    });
                    }}
                >取消
                </Button>
              </div>
            )
        }
        const modalProps={
            visible:detailModalVisible,
            title:"用户反馈",
            footerVisible:false,
            colum:[
                {
                    name:"userNo",
                    component:  <span>{userNo}</span>,
                    formItemProps:{
                        labelCol:{
                            span:5,
                        },
                        wrapperCol:{
    
                            span:18,

                        },
                        label:'用户手机号',
                    },
                    options:{
                        rules:[
                        
                        ],
                    },
                },
                {
                    name:"content",
                    component:  <span>{content}</span>,
                    formItemProps:{
                        labelCol:{
                            span:5,
                        },
                        wrapperCol:{
    
                            span:18,

                        },
                        label:'用户反馈',
                       
                    },
                    options:{
                        rules:[
                        
                        ],
                        initialValue:content,
                    },
                },
                {},
                {
                    name:"submit",
                    component: buttons(),
                    formItemProps:{
                        labelCol:{
                            span:5,
                        },
                        wrapperCol:{
    
                            span:18,

                        },
                        label:'  ',
                        colon:false,
                    },
                    options:{
                        rules:[
                        
                        ],
                    },
                },
            ],
            onCancel:()=>{
                this.setState({
                    detailModalVisible:false,
                })
            },
        };
  

        if(status===0){
            modalProps.colum[2]= {
                name:"remark",
                component: <TextArea />,
                formItemProps:{
                    labelCol:{
                        span:5,
                    },
                    wrapperCol:{

                        span:18,

                    },
                    label:'备注',
                },
                options:{
                    rules:[
                    
                    ],
                    initialValue:remark,
                },
            }
           
        }else{

            modalProps.colum[2]= {
                name:"remark",
                component: <span>{remark}</span>,
                formItemProps:{
                    labelCol:{
                        span:5,
                    },
                    wrapperCol:{

                        span:18,

                    },
                    label:'备注',
                },
                options:{
                    rules:[
                    
                    ],
                },
            }

        }
        return(
          <FormModal ref={(e)=>{this.fromModal=e}} {...modalProps} />
        )

    }




    render() {
        const _self = this;
        const {feedback: {
                data,
            }, loading, dispatch} = this.props;
        const {selectedRows, modalVisible} = this.state;
        const columns = [
            {
                title: '手机号码',
                dataIndex: 'userNo',
            }, 
            {
                title:"反馈内容",
                dataIndex:"content",
            },
            {
                title: '反馈时间',
                dataIndex: 'createTime',
            }, 
            {
                title: '状态',
                dataIndex: 'status',
                render:(text, record)=>{
                    return(
                      <span>{record.status==0 ? "未处理" :"已处理"}</span>
                    )
                },

            }, 
            {
                title: '操作',

                render: (text, record) => (
                  <Fragment>
                   
                    <a onClick={()=>{
                        this.setState({
                            detailModalVisible:true,
                        },()=>{
                            dispatch({
                                type:"feedback/getFeedbackById",
                                payload:{
                                    id:record.id,
                                },
                            })
                        })
                    }}
                    >
                        详情
                    </a>
   
                   
                   

                  </Fragment>
                ),
            },
        ];

        return (
          <PageHeaderLayout title="用户管理">
            <Card bordered={false}>
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>
                <StandardTable
                  loading={loading}
                  data={data}
                  columns={columns}
                  rowKey="id"
                  onChange={this.handleStandardTableChange}
                  closeAlert
                />
              </div>

            </Card>
            {this.renderDetail()}
          </PageHeaderLayout>
        );
    }
}
