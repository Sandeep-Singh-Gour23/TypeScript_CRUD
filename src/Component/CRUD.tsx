import React, { useState } from 'react'
import { Row, Col, Table, Card, Form, Button, Input, Modal } from 'antd'
import { DataSource } from '../models/model';
import users from '../models/data';

const CRUD = () => {
  const [taskForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<DataSource[]>(users);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Key",
      dataIndex: "key",
    },
    {
      key: "3",
      title: "Value",
      dataIndex: "value",
    },
    {
      key: "4",
      title: "Action",
      render: (record: { id: any; }) => {
        return (
          <>
            <Button
              type="default"
              onClick={() => {
                onEditClick(record, record.id)
              }}
            >
              Edit
            </Button>
            <Button danger style={{ marginLeft: '0.5rem' }} onClick={() => onDeleteStudent(record)} >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const handleCancel = (): void => {
    setIsModalVisible(false);
    taskForm.resetFields();
  };

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const onEditClick = (record: any, id: number) => {
    taskForm.setFieldsValue({
      id: record.id,
      key: record.key,
      value: record.value,
    });
    setIsModalVisible(true);
  };

  const onFormSubmit = (values: any) => {
    let randomNumber: number;
    randomNumber = (Math.ceil(Math.random() * 100))
    if (values.id === undefined) {
      setDataSource((pre) => {
        const newEntry = {
          id: randomNumber,
          key: values.key,
          value: values.value,
        }
        return [...pre, newEntry];
      })
    } else {
      setDataSource((pre) => {
        return pre.map((data) => {
          if (data.id === values.id) {
            return values;
          } else {
            return data;
          }
        })
      })
    }
    setIsModalVisible(false)
  }

  const onDeleteStudent = (record: { id: number }) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };

  return (
    <React.Fragment>
      <Card title="Table" headStyle={{ textAlign: "center" }} type="inner" extra={
        <Button
          type="primary"
          onClick={() => {
            showModal();
          }}
        >
          Create
        </Button>
      }>
        <Table
          columns={columns}
          dataSource={dataSource}
          className="col-8 mx-auto"
          rowKey="id"
          style={{ width: '50vw', marginLeft: '27%' }}
          pagination={false}
        ></Table>
      </Card>

      <Modal title="Create/Edit" visible={isModalVisible} onCancel={handleCancel} okText="Save"
        footer={
          <div key="userModalFooter">
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              form="taskForm"
            >
              Save
            </Button>
          </div>
        }>
        <Form form={taskForm} name="taskForm" onFinish={onFormSubmit} >
          {/* <Form form={taskForm} name="taskForm"> */}
          <Form.Item name="id">
            <Input type="hidden" />
          </Form.Item>

          <Form.Item label="Key" name="key" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Value" name="value" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

        </Form>
      </Modal>
    </React.Fragment>
  )
}

export default CRUD