import React, { PureComponent, Fragment } from 'react';
import { Table, Alert } from 'antd';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows  && nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      this.setState({
        selectedRowKeys: [],
        needTotalList,
      });
    }
    if(nextProps.selectedRows  && nextProps.selectedRows.length >0){
      this.setState({
        selectedRowKeys:nextProps.selectedRows, 
        })
     
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const { needTotalList: list } = this.state;
    const { onSelectRow } = this.props;
    let needTotalList = [...list];
    needTotalList = needTotalList.map(item => {
      return {
        ...item,
        total: selectedRows.reduce((sum, val) => {
          return sum + parseFloat(val[item.dataIndex], 10);
        }, 0),
      };
    });

    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    onChange(pagination, filters, sorter);
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const {
      data: { list, pagination },
      loading,
      columns,
      rowKey,
      closeAlert,
      scroll,
      onRow,
      rowClassName,
      tableCalssName,
      rowSelectionClose,
      bordered,
    } = this.props;

    const paginationProps =  pagination ==false ? false :{
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = rowSelectionClose ? null :{
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };
  
    const _rowClassName=(record,index)=>{
          return rowClassName(this.state,record,index)
    };
  
    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          {
             !closeAlert ?
             <Alert
               message={
                 <Fragment>
                   已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                   {needTotalList.map(item => (
                     <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                       {item.title}
                       总计&nbsp;
                       <span style={{ fontWeight: 600 }}>
                         {item.render ? item.render(item.total) : item.total}
                       </span>
                     </span>
                   ))}
                   <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                     清空
                   </a>
                 </Fragment>
               }
               type="info"
               showIcon
             />
             : ''
          }
        </div>
        <Table
          loading={loading}
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          onRow={onRow}
          rowClassName={rowClassName ? _rowClassName: ''}
          scroll={scroll}
          bordered={bordered ? true : false}
          className={tableCalssName}
/*           onSelect={onSelect} */
        />
      </div>
    );
  }
}
StandardTable.defaultProps={
  tableCalssName:'',
  rowSelectionClose:false,
  closeAlert:false,
  scroll:{},
};
export default StandardTable;
