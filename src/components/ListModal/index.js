import React,{Component} from 'react';
import {Modal,Row,Col,Button} from 'antd';
import PropTypes from 'prop-types';
import StandardTable from '@/components/StandardTable';

export default class ListModal extends Component{
    static propTypes={
        columns:PropTypes.array,
        data:PropTypes.array,
        rowKey:PropTypes.string,
        title:PropTypes.string,
        onOkCallBack:PropTypes.func,
        onCancelCallBack:PropTypes.func,
        width:PropTypes.number,
    }

    static defaultProps={
        columns:[],
        data:[],
        rowKey:'key',
        title:' ',
        onOkCallBack:()=>{},
        onCancelCallBack:()=>{},
        width:700,
    }

    state={
        visible:false,
    }

    onOk=()=>{
        this.setState({
            visible:false,
        },()=>{
            this.props.onOkCallBack();
        })
    }

    onCancel=()=>{
        this.setState({
            visible:false,
        },()=>{
            this.props.onCancelCallBack()
        });
    }

    componentWillReceiveProps(nextProps){
        const {visible} = nextProps;
        this.setState({
            visible,
        })
        
       
    }


    render(){
        const {loading,data,columns,title,rowKey,width} = this.props;
        const {visible} = this.state;
        return(
          <Modal visible={visible}  width={width}title={title} onCancel={this.onCancel} onOk={this.onOk}>
            <StandardTable
              loading={loading}
              data={data}
              columns={columns}
              closeAlert
              rowKey={rowKey}
              tableCalssName="table-layout-fixed"
                />
          </Modal>    
        )
    }
}