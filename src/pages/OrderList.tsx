import { useState } from 'react';
import { Table, Card, Button, Input, Space, Tag, DatePicker, Select, Typography, Badge, Drawer, Descriptions, Divider } from 'antd';
import { SearchOutlined, EyeOutlined, FilterOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface OrderType {
  key: string;
  orderNumber: string;
  customer: string;
  amount: number;
  status: string;
  paymentMethod: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  address: string;
  phone: string;
}

const initialData: OrderType[] = [
  {
    key: '1',
    orderNumber: 'ORD-2023-001',
    customer: '张三',
    amount: 2500,
    status: '已完成',
    paymentMethod: '支付宝',
    date: '2023-10-15',
    items: [
      { name: '笔记本电脑', quantity: 1, price: 2500 }
    ],
    address: '北京市海淀区中关村大街1号',
    phone: '13800138000'
  },
  {
    key: '2',
    orderNumber: 'ORD-2023-002',
    customer: '李四',
    amount: 1200,
    status: '处理中',
    paymentMethod: '微信支付',
    date: '2023-10-14',
    items: [
      { name: '办公椅', quantity: 2, price: 600 }
    ],
    address: '上海市浦东新区张江高科技园区',
    phone: '13900139000'
  },
  {
    key: '3',
    orderNumber: 'ORD-2023-003',
    customer: '王五',
    amount: 4500,
    status: '已取消',
    paymentMethod: '银行卡',
    date: '2023-10-13',
    items: [
      { name: '沙发', quantity: 1, price: 3500 },
      { name: '茶几', quantity: 1, price: 1000 }
    ],
    address: '广州市天河区天河路385号',
    phone: '13700137000'
  },
  {
    key: '4',
    orderNumber: 'ORD-2023-004',
    customer: '赵六',
    amount: 800,
    status: '已完成',
    paymentMethod: '支付宝',
    date: '2023-10-12',
    items: [
      { name: '食品套装', quantity: 4, price: 200 }
    ],
    address: '深圳市南山区科技园',
    phone: '13600136000'
  },
  {
    key: '5',
    orderNumber: 'ORD-2023-005',
    customer: '钱七',
    amount: 1800,
    status: '处理中',
    paymentMethod: '微信支付',
    date: '2023-10-11',
    items: [
      { name: '夹克', quantity: 2, price: 600 },
      { name: '牛仔裤', quantity: 2, price: 300 }
    ],
    address: '成都市武侯区人民南路四段',
    phone: '13500135000'
  },
];

const OrderList = () => {
  const [data] = useState<OrderType[]>(initialData);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<OrderType | null>(null);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const showOrderDetails = (order: OrderType) => {
    setCurrentOrder(order);
    setDrawerVisible(true);
  };

  const filteredData = data.filter(
    item => 
      (item.orderNumber.toLowerCase().includes(searchText.toLowerCase()) ||
       item.customer.toLowerCase().includes(searchText.toLowerCase())) &&
      (statusFilter ? item.status === statusFilter : true)
  );

  const columns: ColumnsType<OrderType> = [
    {
      title: '订单号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: '客户',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `¥${amount.toLocaleString()}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        if (status === '已完成') {
          color = 'green';
        } else if (status === '处理中') {
          color = 'blue';
        } else {
          color = 'volcano';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => showOrderDetails(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>订单列表</Title>
      
      <Card>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <Input
              placeholder="搜索订单号或客户"
              prefix={<SearchOutlined />}
              style={{ width: 250 }}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Select
              placeholder="订单状态"
              style={{ width: 120 }}
              allowClear
              onChange={(value) => setStatusFilter(value)}
            >
              <Option value="已完成">已完成</Option>
              <Option value="处理中">处理中</Option>
              <Option value="已取消">已取消</Option>
            </Select>
          </Space>
          <Button 
            icon={<FilterOutlined />}
            onClick={() => setFilterDrawerVisible(true)}
          >
            高级筛选
          </Button>
        </div>
        
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          rowKey="key"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Drawer
        title="订单详情"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={500}
      >
        {currentOrder && (
          <>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="订单号">{currentOrder.orderNumber}</Descriptions.Item>
              <Descriptions.Item label="客户">{currentOrder.customer}</Descriptions.Item>
              <Descriptions.Item label="联系电话">{currentOrder.phone}</Descriptions.Item>
              <Descriptions.Item label="配送地址">{currentOrder.address}</Descriptions.Item>
              <Descriptions.Item label="订单状态">
                <Badge 
                  status={
                    currentOrder.status === '已完成' ? 'success' : 
                    currentOrder.status === '处理中' ? 'processing' : 'error'
                  } 
                  text={currentOrder.status} 
                />
              </Descriptions.Item>
              <Descriptions.Item label="支付方式">{currentOrder.paymentMethod}</Descriptions.Item>
              <Descriptions.Item label="下单日期">{currentOrder.date}</Descriptions.Item>
              <Descriptions.Item label="订单金额">¥{currentOrder.amount.toLocaleString()}</Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">订单商品</Divider>
            
            <Table 
              dataSource={currentOrder.items}
              pagination={false}
              rowKey={(record) => record.name}
              columns={[
                {
                  title: '商品名称',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: '数量',
                  dataIndex: 'quantity',
                  key: 'quantity',
                },
                {
                  title: '单价',
                  dataIndex: 'price',
                  key: 'price',
                  render: (price) => `¥${price.toLocaleString()}`,
                },
                {
                  title: '小计',
                  key: 'subtotal',
                  render: (_, record) => `¥${(record.price * record.quantity).toLocaleString()}`,
                },
              ]}
            />
          </>
        )}
      </Drawer>

      <Drawer
        title="高级筛选"
        placement="right"
        onClose={() => setFilterDrawerVisible(false)}
        open={filterDrawerVisible}
        width={360}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button style={{ marginRight: 8 }}>重置</Button>
            <Button type="primary" onClick={() => setFilterDrawerVisible(false)}>
              应用筛选
            </Button>
          </div>
        }
      >
        <Form layout="vertical">
          <Form.Item label="订单日期范围">
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="订单状态">
            <Select
              placeholder="选择订单状态"
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="已完成">已完成</Option>
              <Option value="处理中">处理中</Option>
              <Option value="已取消">已取消</Option>
            </Select>
          </Form.Item>
          <Form.Item label="支付方式">
            <Select
              placeholder="选择支付方式"
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="支付宝">支付宝</Option>
              <Option value="微信支付">微信支付</Option>
              <Option value="银行卡">银行卡</Option>
            </Select>
          </Form.Item>
          <Form.Item label="金额范围">
            <Space>
              <Input placeholder="最小金额" />
              <Input placeholder="最大金额" />
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

// 添加Form组件的导入
import { Form } from 'antd';

export default OrderList;