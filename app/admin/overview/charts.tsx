'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const Charts = ({
  data: { salesData },
}: {
  data: { salesData: { month: string; totalSales: number }[] };
}) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart
        data={salesData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          <linearGradient id='colorSales' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#6366f1' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#6366f1' stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' opacity={0.3} />
        <XAxis
          dataKey='month'
          stroke='#6b7280'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#6b7280' }}
        />
        <YAxis
          stroke='#6b7280'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#6b7280' }}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          }}
          labelStyle={{ color: '#374151', fontWeight: '600' }}
          formatter={(value: number) => [`$${value}`, 'Sales']}
        />
        <Bar
          dataKey='totalSales'
          fill='url(#colorSales)'
          radius={[6, 6, 0, 0]}
          className='hover:opacity-80 transition-opacity'
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Charts;
