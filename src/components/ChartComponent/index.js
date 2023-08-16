import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    pv: 2400,
    amt: 2400,
    barColor: '#82ca9d'
  },
  {
    name: 'Feb',
    pv: 1398,
    amt: 2210,
    barColor: '#82ca9d'
  },
  {
    name: 'Mar',
    pv: 9800,
    amt: 2290,
    barColor: '#82ca9d'
  },
  {
    name: 'Apr',
    pv: 3908,
    amt: 2000,
    barColor: '#82ca9d'
  },
  {
    name: 'May',
    pv: 4800,
    amt: 2181,
    barColor: '#82ca9d'
  },
  {
    name: 'June',
    pv: 3800,
    amt: 2500,
    barColor: '#82ca9d'
  },
  {
    name: 'July',
    pv: 4300,
    amt: 2100,
    barColor: '#82ca9d'
  },
  {
    name: 'Aug',
    pv: 4300,
    amt: 2100,
    barColor: '#82ca9d'
  },
  {
    name: 'Sep',
    pv: 4300,
    amt: 2100,
    barColor: '#82ca9d'
  },
  {
    name: 'Oct',
    pv: 4300,
    amt: 2100,
    barColor: '#8884d8'
  },
  {
    name: 'Nov',
    pv: 4300,
    amt: 2100,
    barColor: '#8884d8'
  },
  {
    name: 'Dec',
    pv: 4300,
    amt: 2100,
    barColor: '#82ca9d'
  },
];

const ChartComponent = () => {
  return (
    <ResponsiveContainer width={600} height={350}>
      <BarChart

        data={data}
        margin={{
          top: 5,
          right: 60,
          left: 20,
          bottom: 150,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickCount={6} interval={0}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
