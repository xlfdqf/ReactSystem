import React from "react"
import {Form, Row, Col, Input,Select,DatePicker,Button} from "antd"
import PropTypes from "prop-types"

const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker;
@Form.create()
export default class SearchFormList extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func,
        formItemList: PropTypes.array
    }

    static defaultProps={
        formItemList:[],
    }


    onSubmit=(e)=>{
        const {onSubmit,form} = this.props;
        e && e.preventDefault();

        form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            onSubmit(fieldsValue,this.handleFormReset)
        })
        
    }

    createFormType = (type,list) => {
        let FormComponent = ''
        switch (type) {
            case 'select':
                FormComponent =(
                    <Select>
                    {
                        list.map(({value,label},index)=>{
                            return(
                                <Option key={index} value={value}>{label}</Option>
                            )
                        })
                       
                    }
                </Select>
                )  
                break;
            case 'rangePicker':
                FormComponent=(<RangePicker style={{width:'100%'}} />)
                break;

            default:
                FormComponent = <Input />
                break;
        }

        return FormComponent
    }

    createFormItem = () => {
        const {formItemList, form} = this.props;
        const {getFieldDecorator} = form;
        return formItemList.map(({type, render,label,formItemLayout:{labelCol,wrapperCol,col}={},data,name,config},index) =>{
            return (

                <Col {...col} key={index}>
                    {
                        render ? render(getFieldDecorator) :(
                            <FormItem label={label} labelCol={labelCol} wrapperCol={wrapperCol} key={index} >
                                {
                                    getFieldDecorator(name,config)( this.createFormType(type,data))
                                }

                            </FormItem>
                            )
                    }
                    
                </Col>
            )
            
        })

    }

    handleFormReset=()=>{
        this.props.form.resetFields();
    }

    render() {
     

        return (
          <Form onSubmit={this.onSubmit} >
             <Row
              gutter={{
                    md: 8,
                    lg: 24,
                    xl: 48,
                }}
            >
                {this.createFormItem()}

                <Col span={8} >
                    <Button type="primary" htmlType="submit">查询</Button>
                    <Button
                    style={{
                                marginLeft: 8,
                            }}
                    onClick={this.handleFormReset}
                    >
                                重置
                    </Button>
              </Col>
            </Row>        
          </Form>
        )
    }
}