import { Card, Row, Col, Statistic, Table, Typography, Progress } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, ShoppingCartOutlined, DollarOutlined, LineChartOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface DataType {
  key: string;
  name: string;
  amount: number;
  status: string;
  date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '订单名称',
    dataIndex: 'name',
    key: 'name',
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
      return <span style={{ color }}>{status}</span>;
    },
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: '电子产品订单',
    amount: 2500,
    status: '已完成',
    date: '2023-10-15',
  },
  {
    key: '2',
    name: '办公用品订单',
    amount: 1200,
    status: '处理中',
    date: '2023-10-14',
  },
  {
    key: '3',
    name: '家具订单',
    amount: 4500,
    status: '已取消',
    date: '2023-10-13',
  },
  {
    key: '4',
    name: '食品订单',
    amount: 800,
    status: '已完成',
    date: '2023-10-12',
  },
  {
    key: '5',
    name: '服装订单',
    amount: 1800,
    status: '处理中',
    date: '2023-10-11',
  },
];

const Dashboard = () => {
  return (
    <div>
      <Title level={2}>仪表盘</Title>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="总用户"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ color: '#3f8600' }}>
                <ArrowUpOutlined /> 12% 
              </span>
              <span style={{ marginLeft: 8 }}>较上月</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="订单数"
              value={93}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ color: '#1890ff' }}>
                <ArrowUpOutlined /> 5% 
              </span>
              <span style={{ marginLeft: 8 }}>较上月</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="收入"
              value={25600}
              prefix={<DollarOutlined />}
              suffix="¥"
              valueStyle={{ color: '#3f8600' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ color: '#3f8600' }}>
                <ArrowUpOutlined /> 8% 
              </span>
              <span style={{ marginLeft: 8 }}>较上月</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="退款"
              value={1200}
              prefix={<DollarOutlined />}
              suffix="¥"
              valueStyle={{ color: '#cf1322' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ color: '#cf1322' }}>
                <ArrowDownOutlined /> 3% 
              </span>
              <span style={{ marginLeft: 8 }}>较上月</span>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="最近订单">
            <Table 
              columns={columns} 
              dataSource={data} 
              pagination={false} 
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="销售目标完成情况">
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>电子产品</span>
                <span>78%</span>
              </div>
              <Progress percent={78} status="active" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>办公用品</span>
                <span>65%</span>
              </div>
              <Progress percent={65} status="active" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>家具</span>
                <span>92%</span>
              </div>
              <Progress percent={92} status="active" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>食品</span>
                <span>45%</span>
              </div>
              <Progress percent={45} status="active" />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>服装</span>
                <span>58%</span>
              </div>
              <Progress percent={58} status="active" />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;