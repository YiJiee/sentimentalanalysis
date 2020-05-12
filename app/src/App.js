import React from 'react';
import './App.css';
import {  Form, Input, Button, Modal } from 'antd';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentTime: 0,
        isModalVisible: false,
        queryResults: null,
        keyword: null,
        location: null
      };
      this.onFinish = this.onFinish.bind(this)
      this.onFinishFailure = this.onFinishFailure.bind(this)
      this.showModal = this.showModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
      this.generateModalContents = this.generateModalContents.bind(this)
    }

    onFinish = (values) => {
      const url = `/identity/${values.keyword}/${values.location}`
      fetch(url).then(res => res.json()).then(data => {
        this.updateState(data.keyword, data.location)
        this.showModal()
      });
      console.log(values)
    }

    onFinishFailure = () => {
      alert("Please fill in both boxes")
    }

    updateState = (keyword, location) => {
      this.setState({
        location: location,
        keyword: keyword
      })
    }

    showModal = () => {
      this.setState({
        isModalVisible: true,
      });
    };

    closeModal = () => {
      this.setState({
        isModalVisible: false,
        queryResults: null,
        keyword: null,
        location: null,
      })
    }

    generateModalContents = () => {
      return (
        <div>
          <p>{this.state.keyword}</p>
          <p>{this.state.location}</p>
        </div>
      )
    }

    render() {
      const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 8,
          span: 16,
        },
      };
      return (
        <div className="App">
          <Modal title="Showing your query results..."
            visible={this.state.isModalVisible}
            onOk={this.closeModal}
            onCancel={this.closeModal}
            cancelButtonProps={{style: {display: 'none'}}}>
            {this.generateModalContents()}
          </Modal>
          <header className="App-header">
            Twitter scraper.
          </header>
          <Form
            className="App-form"
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailure}
          >
            <Form.Item
              label="Keyword"
              name="keyword"
              rules={[
                {
                  required: true,
                  message: 'Please input a keyword!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: 'Please input a location!',
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    }
}

export default App;
