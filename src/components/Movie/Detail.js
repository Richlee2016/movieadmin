import React, { Component } from 'react'
import { Modal, Form, Button } from 'antd'
import css from './Movie.less'
const FormItem = Form.Item;

class userDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false
        }
    }
    showModal = () => {
        this.setState({
        visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
        visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    render() {

        const { children, record} = this.props;
        
        if(record.name == 'none'){
            return <a>none</a>
        };

        if(record.name == 'subject'){
            return <a>subject</a>
        };


        return (
        <span>
            <a type="primary" onClick={this.showModal}>{ children }</a>
            <Modal 
            title="Basic Modal" 
            visible={this.state.visible}
            onOk={this.handleOk} 
            onCancel={this.handleCancel}
            width="1000px"
            >
                <ul className={ css.detail }>
                    <li className={ css.title }>
                        <span>{ record.id }</span>
                        <span>{ record.name }</span>
                    </li>
                    <li className={ css.box }>
                        <div className={ css.boxImg }>
                            <img src={ record.details.img }/>
                        </div>
                        <div className={ css.boxMain }>
                            <div>
                                <span><label>上映年代:</label>{ record.year }</span>
                                <span><label>地区:</label>{ record.details.area}</span>
                            </div>
                            <div>
                                <span><label>导演:</label>{ record.director }</span>
                            </div>
                            <div>
                                <label>演员:</label>
                                <ol>
                                    {
                                        record.actor.map( o => <li key={o}>{ o }</li> )
                                    }
                                </ol>
                            </div>
                            <div>
                                <label>分类:</label>
                                <ol>
                                    {
                                        record.catalog.map( (o,i) => {
                                            if(i>0){
                                                return <li key={o}>{ o }</li>
                                            };
                                        })
                                    }
                                </ol>
                            </div>
                            <div>
                                <label>分类类型</label>
                                <ol>
                                    {
                                        record.catalog.map( o => <li key={o}>{ o }</li> )
                                    }
                                </ol>
                            </div>
                        </div>
                    </li>
                    <li className={css.url}>
                        <h3>下载链接</h3>
                        {
                            record.url.map( (o,i) => {
                                return (<div key={i}>
                                    {
                                        o.map( item => <div key={ item.num }><span title={ item.url }>{ item.title }</span></div> )
                                    }
                                </div>)
                            })
                        }
                    </li>
                    <li className={css.info}>
                        <h3>简介</h3>
                        <p>{ record.details.intro }</p>
                    </li>
                </ul>
            </Modal>
        </span>
        );
    }
}

export default Form.create()(userDetailModal);