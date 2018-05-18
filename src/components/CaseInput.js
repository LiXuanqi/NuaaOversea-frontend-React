import React from 'react';
import { Input, Select, Switch, Icon } from 'antd';
import { countriesFromServer } from '../utils/dataFromServer';

const Option = Select.Option;

class CaseInput extends React.Component {
    constructor(props) {
        super(props);
        const value = this.props.value || {};
        this.state = {
        university: value.university || '',
        country_id: value.country_id ,
        major: value.major || '',
        term: value.term ,
        result: value.result ,
        degree: value.degree ,
        is_transfer: value.is_transfer || false
        };
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
        const value = nextProps.value;
        this.setState(value);
        }
    }
    handleUniversityChange = (e) => {

        const university = e.target.value;
        if (!('value' in this.props)) {
        this.setState({ university });
        }
        this.triggerChange({ university });
    }
    handleCountryChange = (country_id) => {
        if (!('value' in this.props)) {
        this.setState({ country_id });
        }
        this.triggerChange({ country_id });
    }
    handleDegreeChange = (degree) => {
        if (!('value' in this.props)) {
        this.setState({ degree });
        }
        this.triggerChange({ degree });
    }
    handleTermChange = (term) => {
        if (!('value' in this.props)) {
        this.setState({ term });
        }
        this.triggerChange({ term });
    }
    handleResultChange = (result) => {
        if (!('value' in this.props)) {
        this.setState({ result });
        }
        this.triggerChange({ result });
    }
    handleMajorChange = (e) => {
        const major = e.target.value;
        if (!('value' in this.props)) {
        this.setState({ major });
        }
        this.triggerChange({ major });
    }
    handleIsTransferChange = (e) => {
        console.log(e);
        this.setState({
            is_transfer: e
        })
        this.triggerChange({ is_transfer: e });
    }
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {

        onChange(Object.assign({}, this.state, changedValue));
        }
    }
    render() {
        const { size } = this.props;
        const state = this.state;

        return (
        <div>
            <Input
            style={{ width: '40%', marginRight: '16px' }}
            type="text"
            value={state.university}
            onChange={this.handleUniversityChange}
            placeholder="申请学校"
            />   
            <Select
            style={{ width: '40%' }}
            value={state.result}
            size={size}
            onChange={this.handleResultChange}
            placeholder="录取结果"
            >
            <Option value="ad">ad</Option>
            <Option value="rej">rej</Option>
            <Option value="offer">offer</Option>
            </Select> 

            {

            React.Children.map(this.props.children, function (child) {
                return <div>{child}</div>;
            })

            }

            <Input 
            style={{ width: '40%', marginRight: '16px' }}
            type="text"
            value={state.major}
            onChange={this.handleMajorChange}
            placeholder="专业"
            />
            <div style={{ width: '40%', display: 'inline-block' }}>
                <span style={{ marginRight: '8px' }}>转专业</span>
                <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} checked={state.is_transfer} onChange={this.handleIsTransferChange}/>
            </div>
           

            <Select
            style={{ width: '40%', marginRight: '16px' }}
            value={state.degree}
            size={size}
            onChange={this.handleDegreeChange}
            placeholder="学位"
            >
            <Option value="Master">Master</Option>
            <Option value="Ph.D">Ph.D</Option>
            </Select>

            <Select
            style={{ width: '40%', marginRight: '16px' }}
            value={state.country_id}
            size={size}
            onChange={this.handleCountryChange}
            placeholder="国家"
            >
            {
                countriesFromServer.map((item) => {
                    return (
                        <Option key={item.id} value={item.id}>{item.name}</Option>
                    );
                })
            }
            </Select>

            <Select
            style={{ width: '40%'}}
            value={state.term}
            size={size}
            onChange={this.handleTermChange}
            placeholder="入学日期"
            >
            <Option value="2018fall">2018FALL</Option>
            <Option value="2018spring">2018SPING</Option>
            </Select>

            
        </div>
        );
    }
}

export default CaseInput;