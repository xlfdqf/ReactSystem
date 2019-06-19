import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
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
import ListModal from '@/components/ListModal';
import SearchFormList from '@/components/SearchFormList';
import { isArray } from 'lodash';
import Detail from './Detail';
import PageHeaderLayout from '@/components/PageHeaderWrapper';
import styles from './TableList.less';
import { filter_attr, ad } from '@/utils/utils';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const isReturn1 = (text, record, index) => {
  //拒贷记录 000300 只要包含3 就有
  if(record.flag.indexOf("3") != -1) {
    return '有';
  } else {
    return '无';
  }
};
const isReturn2 = (text, record, index) => {
  //还款记录 010000 
  if(record.flag.indexOf("1") != -1) {
    return '有';
  } else {
    return '无';
  }
};
const isReturn3 = (text, record, index) => {
  //逾期记录 002000
  if(record.flag.indexOf("2") != -1) {
    return '有';
  } else {
    return '无';
  }
};
const isReturn4 = (text, record, index) => {
  //是否灰名单 000040
  if(record.flag.indexOf("4") != -1) {
    return '有';
  } else {
    return '无';
  }
};
const isReturn5 = (text, record, index) => {
  //是否黑名单 000005
  if(record.flag.indexOf("5") != -1) {
    return '有';
  } else {
    return '无';
  }
};

@connect(({ dynamicPortrait, loading }) => ({
  dynamicPortrait,
  loading: loading.models.dynamicPortrait,
}))
@Form.create()
export default class DynamicPortrait extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
    detailModalVisible: false,
    recordModalVisible: false,
    currentTabType: 'all',
    isDetail: false,
    detailData: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { currentTabType } = this.state;
    dispatch({ type: 'dynamicPortrait/iniLoad', payload: { tabType: currentTabType } });
  }

  /**
   *分页切换
   *
   * @param {*} pagination
   * @param {*} filtersArg
   * @param {*} sorter
   */
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { currentTabType } = this.state;

    const params = {
      pageIndex: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({
      type: 'dynamicPortrait/fetch',
      payload: {
        ...this.createTabQuery(currentTabType),
        ...params,
      },
    });
  };

  handleFormReset = () => {
    this.props.form.resetFields();
  };

  /**
   *查询
   *
   * @param {*} values
   */
  handleSearch = (values, rest) => {
    const { dispatch, form } = this.props;
    let params = filter_attr(values);
    const { update, ...o } = params;
    if (isArray(update)) {
      const startTime = moment(update[0]).format('YYYYMMDD');
      const endTime = moment(update[1]).format('YYYYMMDD');
      params = {
        startTime,
        endTime,
        ...o,
      };
    }

    const currentTabType = this.hasType(params);
    this.setState(
      {
        currentTabType,
      },
      () => {
        dispatch({
          type: 'dynamicPortrait/fetch',
          payload: {
            pageIndex: 1,
            pageSize: 10,
            tabType: currentTabType,
            ...params,
          },
        });
      }
    );
  };

  /**
   *切换tab
   *
   * @param {*} activeKey
   */
  tabChange = activeKey => {
    const { dispatch } = this.props;
    this.setState({ currentTabType: activeKey }, () => {
      dispatch({
        type: 'dynamicPortrait/fetch',
        payload: this.createTabQuery(activeKey),
      });
    });
  };

  hasType = ({ isBlack, isGray, isOverdue, isRefused, isRepayment }) => {
    const list = [];
    if (isBlack === 1) {
      list.push({ value: 'bad' });
    }

    if (isGray === 1) {
      list.push({ value: 'unknown' });
    }
    if (isOverdue === 1) {
      list.push({ value: 'overdue' });
    }
    if (isRefused === 1) {
      list.push({ value: 'refused' });
    }

    if (isRepayment === 1) {
      list.push({ value: 'good' });
    }
    if (list.length == 1) {
      return list[0].value;
    } else {
      return 'all';
    }
  };

  closeDetail = bol => {
    this.setState({
      isDetail: false,
    });
  };

  createTabQuery(activeKey) {
    let payload = { tabType: activeKey };
    switch (activeKey) {
      case 'all':
        payload = { ...payload };
        break;
      case 'good':
        payload = { ...payload, isRepayment: 1 };
        break;
      case 'unknown':
        payload = {
          ...payload,
          isBlack: -1,
          isGray: -1,
          isOverdue: -1,
          isRepayment: -1,
          isRefused: -1,
        };
        break;
      case 'refused':
        payload = { ...payload, isRefused: 1 };
        break;
      case 'overdue':
        payload = { ...payload, isOverdue: 1 };
        break;
      case 'suspicious':
        payload = { ...payload, isGray: 1 };
        break;
      case 'bad':
        payload = { ...payload, isBlack: 1 };
        break;
    }

    return payload;
  }

  /**
   *货币详情
   *
   */
  renderCurrencyDetail = () => {
    const { detailModalVisible } = this.state;
    const listprops = {
      title: '获币详情',
      columns: [
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
          title: '剩余个数',
          dataIndex: 'tel3',
        },
        {
          title: '获取平台',
          dataIndex: 'tel4',
        },
      ],
      onOkCallBack: () => {
        this.setState({ detailModalVisible: false });
      },
      onCancelCallBack: () => {
        this.setState({ detailModalVisible: false });
      },
    };

    return <ListModal visible={detailModalVisible} {...listprops} />;
  };

  renderCurrencyRecord = () => {
    const { recordModalVisible } = this.state;
    const listprops = {
      title: '货币记录',
      columns: [
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
          title: '获取平台',
          dataIndex: 'tel3',
        },
      ],
      onOkCallBack: () => {
        this.setState({ recordModalVisible: false });
      },
      onCancelCallBack: () => {
        this.setState({ recordModalVisible: false });
      },
    };
    return <ListModal visible={recordModalVisible} {...listprops} />;
  };

  renderTop = () => {
    const { dynamicPortrait } = this.props;

    return (
      <Row
        style={{
          padding: '15px 0px',
        }}
      >
        <Col
          span={12}
          style={{
            color: 'red',
          }}
        >
          当前样本总量：
          {dynamicPortrait.allToatal}
        </Col>
        <Col
          span={12}
          style={{
            color: 'red',
            textAlign: 'right',
          }}
        >
          最后更新时间:
        </Col>
      </Row>
    );
  };

  render() {
    const _self = this;
    const {
      dynamicPortrait: { tabTypes },
      loading,
      dispatch,
    } = this.props;
    const {
      selectedRows,
      modalVisible,
      tabList,
      isDetail,
      currentTabType,
      detailData,
    } = this.state;
    const columns = [
      {
        title: '身份证号码',
        dataIndex: 'idcard',
      },
      {
        title: '有无拒贷记录',
        dataIndex: 'isRefused',
        render: isReturn1,
      },
      {
        title: '有无还款记录',
        dataIndex: 'isRepayment',
        render: isReturn2,
      },
      {
        title: '有无逾期记录',
        dataIndex: 'isOverdue',
        render: isReturn3,
      },
      {
        title: '是否灰名单',
        dataIndex: 'isGray',
        render: isReturn4,
      },
      {
        title: '是否黑名单',
        dataIndex: 'isBlack5',
        render: isReturn5,
      },
      {
        title: '入库时间',
        dataIndex: 'insertDate',
        render: insertDate => {
          return moment(insertDate).format('YYYY-MM-DD');
        },
        /*  sorter:(a,b)=>{
                    return moment(a).format("X")- moment(b).format("X");
                } */
      },
      {
        title: '最后更新时间',
        dataIndex: 'updateDate',
        render: updateDate => {
          return moment(updateDate).format('YYYY-MM-DD');
        },
        sorter: (a, b) => {
          return moment(a).format('X') - moment(b).format('X');
        },
      },

      {
        title: '样本完整度%',
        dataIndex: '7',
      },
      {
        title: '操作',

        render: (text, record) => (
          <Fragment>
            <a
              onClick={() => {
                // console.log(record)
                this.setState({ isDetail: true }, () => {
                  dispatch({
                    type: 'dynamicPortrait/loadDetail',
                    payload: {
                      idCard: record.idcard, //record.idcard'612325196406010011'
                    },
                    callBack: ({ state, data }) => {
                      // console.log('后端返回的详情数据：')
                      // console.log(data)
                      this.setState({
                        detailData: {
                          ...record, //每条记录数据
                          tabType: currentTabType,
                          list: data,
                        },
                      });
                    },
                  });
                });
              }}
            >
              详情
            </a>
          </Fragment>
        ),
      },
    ];

    const formItemList = [
      {
        type: 'select',
        label: '是否黑名单',
        name: 'isBlack',
        key: '1',
        formItemLayout: {
          col: {
            span: 8,
          },
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
        },
        data: [
          {
            label: '是',
            value: 1,
          },
          {
            label: '否',
            value: -1,
          },
        ],
      },
      {
        type: 'select',
        label: '是否灰名单',
        name: 'isGray',
        formItemLayout: {
          col: {
            span: 8,
          },
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
        },
        data: [
          {
            label: '是',
            value: 1,
          },
          {
            label: '否',
            value: -1,
          },
        ],
      },
      {
        type: 'select',
        label: '有无逾期记录',
        name: 'isOverdue',
        formItemLayout: {
          col: {
            span: 8,
          },
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
        },
        data: [
          {
            label: '是',
            value: 1,
          },
          {
            label: '否',
            value: -1,
          },
        ],
      },
      {
        type: 'select',
        label: '有无拒贷记录',
        name: 'isRefused',
        formItemLayout: {
          col: {
            span: 8,
          },
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
        },
        data: [
          {
            label: '有',
            value: 1,
          },
          {
            label: '无',
            value: -1,
          },
        ],
      },
      {
        type: 'select',
        label: '有无还款记录',
        name: 'isRepayment',
        formItemLayout: {
          col: {
            span: 8,
          },
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
        },
        data: [
          {
            label: '有',
            value: 1,
          },
          {
            label: '无',
            value: -1,
          },
        ],
      },
      {
        type: 'input',
        label: '身份证号码',
        name: 'idCard',
        formItemLayout: {
          col: {
            span: 8,
          },
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
        },
      },
      {
        type: 'rangePicker',
        label: '最后更新时间',
        name: 'update',
        formItemLayout: {
          col: {
            span: 8,
          },

          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
        },
      },
      {
        formItemLayout: {
          col: { span: 8 },
        },

        render: getFieldDecorator => {
          return (
            <Row>
              <Col span={8}>
                <FormItem label="样本完整度%" style={{ float: 'right' }} />
              </Col>
              <Col span={6}>
                <FormItem label="">{getFieldDecorator('a')(<Input />)}</FormItem>
              </Col>
              <Col span={2}>
                <div
                  style={{
                    textAlign: 'center',
                    lineHeight: '32px',
                    height: '32px',
                  }}
                >
                  --
                </div>
              </Col>
              <Col span={6}>
                <FormItem label="">{getFieldDecorator('b')(<Input />)}</FormItem>
              </Col>
            </Row>
          );
        },
      },
    ];

    return (
      <div>
        {!isDetail ? (
          <PageHeaderLayout title="动态画像管理">
            <Card bordered={false}>
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>
                  <SearchFormList onSubmit={this.handleSearch} formItemList={formItemList} />
                </div>
                {this.renderTop()}
                <Tabs
                  defaultActiveKey={tabTypes[0].name}
                  activeKey={this.state.currentTabType}
                  onChange={this.tabChange}
                >
                  {/* console.log(tabTypes); */}
                  {tabTypes.map(({ list, name, label, pagination }) => {
                    return (
                      <TabPane tab={label} key={name}>
                        <StandardTable
                          loading={loading}
                          data={{ list, pagination }}
                          columns={columns}
                          rowKey="idcard"
                          onChange={this.handleStandardTableChange}
                          closeAlert
                        />
                      </TabPane>
                    );
                  })}
                </Tabs>
              </div>
            </Card>
            {this.renderCurrencyDetail()}
            {this.renderCurrencyRecord()}
          </PageHeaderLayout>
        ) : (
          <Detail
            style={{ display: isDetail ? 'block' : 'none' }}
            data={detailData}
            backCallback={this.closeDetail}
          />
        )}
      </div>
    );
  }
}
