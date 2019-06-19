import React, {PureComponent} from 'react';
import {Table, Row, Col, Card} from 'antd';
import PageHeaderLayout from '@/components/PageHeaderWrapper';
import styles from './analysisReport.less'

const columns = [
    {
        title: '  ',
        dataIndex: 'label',
        key: 'label',
    }, {
        title: '特征数据',
        dataIndex: 'data',
        key: '2',
    }, {
        title: '验真及关联数据',
        dataIndex: 'address',
        key: '3',
    }, {
        title: '结果数据',
        dataIndex: 'address',
        key: '4',
    }, {
        title: '行为数据',
        dataIndex: 'address',
        key: '5',
    }, {
        title: '关系数据',
        dataIndex: 'address',
        key: '6',
    }, {
        title: '运营商通话记录',
        dataIndex: 'address',
        key: '7',
    }, {
        title: '爬虫数据',
        dataIndex: 'address',
        key: '8',
    }, {
        title: '分析数据',
        dataIndex: 'address',
        key: '9',
    }, {
        title: '提炼数据',
        dataIndex: 'address',
        key: '10',
    }, {
        title: '消费数据',
        dataIndex: 'address',
        key: '11',
    }, {
        title: '备用数据',
        dataIndex: 'address',
        key: '12',
    }, {
        title: '母子评分卡分数',
        dataIndex: 'address',
        key: '13',
    },
];
const rows = [
    {
        label:'特征数据',
    },
    {
        label:'验真及关联数据',
    },
    {
        label:'结果数据',
    },
    {
        label:'行为数据',
    },
    {
        label:'关系数据',
    },
    {
        label:'运营商通话记录',
    },
    {
        label:'爬虫数据',
    },
    {
        label:'分析数据',
    },
    {
        label:'提炼数据',
    },
    {
        label:'消费数据',
    },
    {
        label:'备用数据',
    },
    {
        label:'母子评分卡分数',
    },

];

const tableListData=[
    {
        headerTitle:'连续变量与连续变量',
        columns,
        rows,
    },
    {
        headerTitle:'分类变量与分类变量',
        columns,
        rows,
    },
    {
        headerTitle:'分类变量与连续变量',
        columns,
        rows,
    },
];



export default class MatrixAnalysis extends PureComponent {


    createTableData=()=>{
        return tableListData.map(({headerTitle,columns,rows})=>{
            const data = rows.map(({label})=>{
                return {
                    label,
                }
            });
            return {
                headerTitle,
                columns,
                dataSource:data,
            }
        })
    }

    createTabList=(list)=>{

        return(
            list.map(({headerTitle,columns,dataSource},i)=>{
                return(
                  <div key={i}>
                    <h3 className={styles.headerTitle}>{headerTitle}</h3>
                    <Table columns={columns} dataSource={dataSource} bordered pagination={false} />
                  </div>
                )
 
            })
        )
    }

    render() {
    
        const list = this.createTableData();
      
        return (
          <PageHeaderLayout title="累积特征相关性矩阵分析">
            <Card bordered={false}>
              <div>
                <Row className={styles.analysisReportTop}>
                  <Col offset={20} span={4}>
                      <span className="text-red">最后更新时间</span>
                    </Col>
                </Row>
                {
                      this.createTabList(list)
                    }
              </div>

            </Card>
          </PageHeaderLayout>
        )
    }
}
