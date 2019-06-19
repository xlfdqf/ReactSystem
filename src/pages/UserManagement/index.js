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
    InputNumber,
    DatePicker,
    Modal,
    message,
    Badge,
    notification,
    Divider,
    Popover,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import ListModal from '@/components/ListModal';
import {isArray} from 'lodash';
import PageHeaderLayout from '@/components/PageHeaderWrapper';
import styles from './userManagement.less';
import {filter_attr,ad} from '../../utils/utils';

const FormItem= Form.Item;
const {RangePicker} = DatePicker;

@connect(({userlist, loading}) => ({userlist, loading: loading.models.userlist}))
@Form.create()
export default class UserManagement extends PureComponent {
    state = {
        modalVisible: false,
        selectedRows: [],
        detailModalVisible:false,
        recordModalVisible:false,
    };

    componentDidMount() {
        const {dispatch, userlist} = this.props;
        dispatch({
            type: 'userlist/iniLoad',
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
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
        };

        dispatch({
            type: 'userlist/fetch',
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
          type: 'userlist/rest',
          payload: {
              passWord: 'a123456',
              phone: tel,
          },
      })
    }

    handleFormReset=()=>{
        this.props.form.resetFields();
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
                type: 'userlist/fetch',
                payload:{
                    currentPage:1,
                    pageSize:10,
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
        const {form} = this.props;
        const {getFieldDecorator} = form;


        return (
          <Form onSubmit={this.handleSearch} layout="inline">
            <Row
              gutter={{
                    md: 8,
                    lg: 24,
                    xl: 48,
                }}
            >
              <Col md={5}>
                <FormItem label="手机号码">
                  {getFieldDecorator('mobile')(<Input
                    style={{
                                width: '100%',
                            }}
                    placeholder="请输入"
                  />)}
                </FormItem>
              </Col>
              <Col md={5}>
                <FormItem label="用户来源">
                  {getFieldDecorator('biName')(<Select>
                 
                    </Select>)}
                </FormItem>
              </Col>
              <Col md={6}>
                <FormItem label="注册时间">
                  {getFieldDecorator('date')(<RangePicker
                    style={{
                                width: '100%',
                            }}
                  />)}
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
     *货币详情
     *
     */
    renderCurrencyDetail=()=>{
        const {detailModalVisible} = this.state
        const listprops={
            title:'获币详情',
            columns:[
                {
                    title: '币种名称',
                    dataIndex: 'tel',
                }, 
                {
                    title: '总个数',
                    dataIndex: 'tel1',
                }, 
                {
                    title: '已兑换',
                    dataIndex: 'tel2',
                }, 
                {
                    title:'剩余个数',
                    dataIndex: 'tel3',
                },
                {
                    title:'获取平台',
                    dataIndex: 'tel4',
                },
            ],
            onOkCallBack:()=>{
                this.setState({
                    detailModalVisible:false,
                })
            },
            onCancelCallBack:()=>{
                this.setState({
                    detailModalVisible:false,
                })
            },
        }

        return(
          <ListModal visible={detailModalVisible} {...listprops} />
        )
    }

    renderCurrencyRecord=()=>{
        const {recordModalVisible} = this.state
        const listprops = {
            title:'货币记录',
            columns:[
                {
                    title: '币种名称',
                    dataIndex: 'tel',
                }, 
                {
                    title: '个数',
                    dataIndex: 'tel1',
                }, 
                {
                    title: '获取时间',
                    dataIndex: 'tel2',
                }, 
                {
                    title:'获取平台',
                    dataIndex: 'tel3',
                },
            ],
            onOkCallBack:()=>{
                this.setState({
                    recordModalVisible:false,
                })
            },
            onCancelCallBack:()=>{
                this.setState({
                    recordModalVisible:false,
                })
            },
        }
        return(
          <ListModal visible={recordModalVisible} {...listprops} />
        )
    }

    render() {
        const _self = this;
        const {loading, dispatch} = this.props;
        const {selectedRows, modalVisible} = this.state;
        const columns = [
            {
                title: '手机号码',
                dataIndex: 'mobile',
            }, 
            {
                title:"用户来源",
                dataIndex:"name",
            },
            {
                title: '注册时间',
                dataIndex: 'regTime',
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
                                type:"userlist/getCoinInfo",
                                payload:{
                                    mobile:record.mobile,
                                },
                            });

                        })
                    }}
                    >
                        获币详情
                    </a>
                    <Divider type="vertical" />
                    <a onClick={()=>{
                      this.setState({
                          recordModalVisible:true,
                      },()=>{

                        dispatch({
                            type:"userlist/getDiversionLog",
                            payload:{
                                mobile:record.mobile,
                            },
                        });

                      
                      });
                    }}
                    >
                        获币记录
                    </a>
                    <Divider type="vertical" />
                    <a
                      href="javascript:void(0)"
                      onClick={(e)=>{
                        e && e.preventDefault();
                       _self.resPassword(record);
                      }}
                    >重置密码
                    </a>
                    <Divider type="vertical" />
                    <a onClick={()=>{
                        dispatch({
                            type:"userlist/userChangeStatus",
                            payload:{
                                mobile:record.mobile,
                                ls: record.status !=0  ? 0 : 1,
                            },
                        })
                    }}
                    >
                      {record.status !=0  ?'锁定' : '解锁'}
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
                  data={{list:[],}}
                  columns={columns}
                  selectedRows={[]}
                  rowKey="index"
                  onChange={this.handleStandardTableChange}
                  closeAlert
                />
              </div>

            </Card>
            {this.renderCurrencyDetail()}
            {this.renderCurrencyRecord()}
          </PageHeaderLayout>
        );
    }
}
