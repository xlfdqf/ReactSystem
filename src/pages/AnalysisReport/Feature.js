import React, {PureComponent} from 'react';
import {Table, Row, Col, Card} from 'antd';
import PageHeaderLayout from '@/components/PageHeaderWrapper';
import styles from './analysisReport.less'

export default class Feature extends PureComponent {
    render() {
        const columns = [
            {
                title: '时间段',
                dataIndex: 'name',
                key: '1',
            }, {
                title: '特征分类',
                dataIndex: 'age',
                key: '2',
            }, {
                title: '特征名称',
                dataIndex: 'address',
                key: '3',
            }, {
                title: '特征属性变量',
                dataIndex: 'address',
                key: '4',
            }, {
                title: '未知KS值',
                dataIndex: 'address',
                key: '5',
            }, {
                title: '拒贷KS值',
                dataIndex: 'address',
                key: '6',
            }, {
                title: '逾期KS值',
                dataIndex: 'address',
                key: '7',
            }, {
                title: '灰名单KS值',
                dataIndex: 'address',
                key: '8',
            }, {
                title: '黑名单KS值',
                dataIndex: 'address',
                key: '9',
            }, {
                title: '好人未知比率',
                dataIndex: 'address',
                key: '10',
            }, {
                title: '好人拒贷比率',
                dataIndex: 'address',
                key: '11',
            }, {
                title: '好人逾期比率',
                dataIndex: 'address',
                key: '12',
            }, {
                title: '好人可疑比率',
                dataIndex: 'address',
                key: '13',
            }, {
                title: '好人坏人比率',
                dataIndex: 'address',
                key: '14',
            }, {
                title: '逾期信息值',
                dataIndex: 'address',
                key: '15',
            }, {
                title: '可疑信息值',
                dataIndex: 'address',
                key: '16',
            }, {
                title: '坏人信息值',
                dataIndex: 'address',
                key: '17',
            }, {
                title: '稳定性系数%',
                dataIndex: 'address',
                key: '18',
            }, {
                title: '证据权重%',
                dataIndex: 'address',
                key: '19',
            }, {
                title: '贡献值%',
                dataIndex: 'address',
                key: '19',
            },
        ];

        return (
          <PageHeaderLayout title="累积与近1个月特征指标报告">
            <Card bordered={false}>
              <div>
                  <Row className={styles.analysisReportTop}>
                      <Col offset={20} span={4}>
                          <span className="text-red">最后更新时间</span>
                        </Col>
                    </Row>
                  <Table columns={columns} bordered />
                </div>

            </Card>
          </PageHeaderLayout>
        )
    }
}
