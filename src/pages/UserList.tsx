import { useState } from 'react';
import { Table, Card, Button, Input, Space, Tag, Modal, Form, Select, Typography, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;
const { confirm } = Modal;

interface UserType {
  key: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

const initialData: UserType[] = [
  {
    key: '1',
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    status: '活跃',
    createdAt: '2023-01-15',
  },
  {
    key: '2',
    name: '李四',
    email: 'lisi@example.com',
    role: '用户',
    status: '活跃',
    createdAt: '2023-02-20',
  },
  {
    key: '3',
    name: '王五',
    email: 'wangwu@example.com',
    role: '编辑',
    status: '禁用',
    createdAt: '2023-03-10',
  },
  {
    key: '4',
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: '用户',
    status: '活跃',
    createdAt: '2023-04-05',
  },
  {
    key: '5',
    name: '钱七',
    email: 'qianqi@example.com',
    role: '用户',
    status: '活跃',
    createdAt: '2023-05-12',
  },
];

const UserList = () => {
  const [data, setData] = useState<UserType[]>(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [searchText, setSearchText] = useState('');

  const showModal = (record?: UserType) => {
    setIsModalVisible(true);
    if (record) {
      setEditingKey(record.key);
      form.setFieldsValue(record);
    } else {
      setEditingKey('');
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (key: string) => {
    confirm({
      title: '确定要删除这个用户吗?',
      icon: <ExclamationCircleOutlined />,
      content: '此操作不可逆',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        setData(data.filter(item => item.key !== key));
        message.success('用户已删除');
      },
    });
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (editingKey) {
        // 编辑现有用户
        setData(
          data.map(item => 
            item.key === editingKey ? { ...item, ...values } : item
          )
        );
        message.success('用户已更新');
      } else {
        // 添加新用户
        const newUser = {
          key: Date.now().toString(),
          ...values,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setData([...data, newUser]);
        message.success('用户已添加');
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredData = data.filter(
    item => 
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<UserType> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        let color = '';
        if (role === '管理员') {
          color = 'red';
        } else if (role === '编辑') {
          color = 'blue';
        } else {
          color = 'green';
        }
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === '活跃' ? 'green' : 'volcano';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '创建日期',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.key)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>用户管理</Title>
      
      <Card>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Input
            placeholder="搜索用户"
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            添加用户
          </Button>
        </div>
        
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          rowKey="key"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingKey ? "编辑用户" : "添加用户"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={editingKey ? "更新" : "添加"}
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select>
              <Option value="管理员">管理员</Option>
              <Option value="编辑">编辑</Option>
              <Option value="用户">用户</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Option value="活跃">活跃</Option>
              <Option value="禁用">禁用</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;