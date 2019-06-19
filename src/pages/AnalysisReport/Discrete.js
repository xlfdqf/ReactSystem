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
    Tabs,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import styles from './analysisReport.less'
import {isArray} from 'lodash';
import PageHeaderLayout from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;

const TabPane = Tabs.TabPane;

const messages=[
    {
        label:"基本信息",
    },
    {
        label:"欺诈信息",
    },
    {
        label:"可疑信息",
    },
    {
        label:"行为偏好",
    },
    {
        label:"授信额度",
    },
    {
        label:"通讯信息",
    },
    {
        label:"银行卡信息",
    },
    {
        label:"收入信息",
    },
    {
        label:"文化程度",
    },
    {
        label:"固定资产",
    },
    {
        label:"多头信息",
    },
    {
        label:"共债信息",
    },
]

@connect(({loading}) => ({ loading: loading.models.userlist}))


export default class DynamicPortrait extends PureComponent {
    state = {
        modalVisible: false,
        selectedRows: [],
        detailModalVisible: false,
        recordModalVisible: false,
        isDetail: false,
        tabList: [
            {
                name: '全部',
                label: '全部',
            }, {
                name: '好人样本',
                label: '好人样本',
            }, {
                name: '未知样本',
                label: '未知样本',
            }, {
                name: '拒贷样本',
                label: '拒贷样本',
            }, {
                name: '逾期样本',
                label: '逾期样本',
            }, {
                name: '可疑样本',
                label: '可疑样本',
            }, {
                name: '坏人样本',
                label: '坏人样本',
            },
        ],
    };

    createTableDate=()=>{
        return messages.map((item,i)=>{
            return {
                classification:item.label,
                key:i,
            }
        })
    }

    render() {
        const _self = this;
        const {loading, dispatch} = this.props;
        const {tabList} = this.state;
        const columns = [
            {
                title: '特征分类',
                dataIndex: 'classification',
                key:"1",
            }, {
                title: "特征因子",
                dataIndex: "22",
            }, {
                title: '因子变量',
                dataIndex: '23',
            }, {
                title: '样本特征数量',
                dataIndex: '24',
            }, {
                title: '样本属性数量',
                dataIndex: '5',
            }, {
                title: '众数',
                dataIndex: '6',
            }, {
                title: '最少数值',
                dataIndex: '7',
            }, {
                title: '最大值',
                dataIndex: '8',
            }, {
                title: '最小值',
                dataIndex: '9',
            }, 
            {
                title: '极差',
                dataIndex: '10',
            },
            {
                title: '中值',
                dataIndex: '11',
            },
            {
                title: '平均值',
                dataIndex: '5',
            },
            {
                title: '偏斜度',
                dataIndex: '6',
            },
            {
                title: '峰度',
                dataIndex: '7',
            },
            {
                title: '上四分位数',
                dataIndex: '8',
            },
            {
                title: '下四分位数',
                dataIndex: '9',
            },
            {
                title: '奇异值/离群值',
                dataIndex: '10',
            },
            {
                title: '平均差',
                dataIndex: '11',
            },
            {
                title: '方差',
                dataIndex: '12',
            },
            {
                title: '标准差',
                dataIndex: '13',
            },
            {
                title: '变异系数',
                dataIndex: '14',
            },
            {
                title: '离散系数',
                dataIndex: '15',
            },
            {
                title: '置信度',
                dataIndex: '16',
            },
            {
                title: '75%置信区间上限',
                dataIndex: '17',
            },
            {
                title: '75%置信区间下限',
                dataIndex: '18',
            },
            {
                title: '卡方值',
                dataIndex: '19',
            },
        ];
        return (
          <PageHeaderLayout title="动态画像管理">
            <Card bordered={false}>
              <div>
                <Row className={styles.analysisReportTop}>
                  <Col offset={20} span={4}>
                  <span className="text-red">最后更新时间</span>
                </Col>
                </Row>
                <Tabs defaultActiveKey={tabList[0].name}>
                  {tabList.map((item) => {
                                return (
                                  <TabPane tab={item.label} key={item.name}>
                                    <StandardTable
                                      loading={loading}
                                      data={{ list:this.createTableDate(),pagination:false}}
                                      columns={columns}
                                      rowKey="index"
                                      closeAlert
                                      bordered={true}
                                 
                                    />
                                  </TabPane>
                                )
                            })
}
                </Tabs>
              </div>

            </Card>
          </PageHeaderLayout>

        );
    }
}
