
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { performanceData } from '@/data/performance-data';
import { Algorithm } from '@/types';

interface EnergyConsumptionChartProps {
  selectedAlgorithms: Algorithm[];
}

const EnergyConsumptionChart = ({ selectedAlgorithms }: EnergyConsumptionChartProps) => {
  const data = performanceData.energyConsumption;
  
  const getBarColor = (algorithm: Algorithm) => {
    switch (algorithm) {
      case 'binpacking':
        return '#ECC94B';
      case 'drf':
        return '#326CE5';
      case 'fuse':
        return '#38A169';
      default:
        return '#CBD5E0';
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: 'watts', position: 'insideLeft', angle: -90 }} />
        <Tooltip formatter={(value) => [`${value}W`, '']} />
        <Legend />
        {selectedAlgorithms.includes('binpacking') && (
          <Bar dataKey="binpacking" name="BinPacking" fill={getBarColor('binpacking')} />
        )}
        {selectedAlgorithms.includes('drf') && (
          <Bar dataKey="drf" name="DRF" fill={getBarColor('drf')} />
        )}
        {selectedAlgorithms.includes('fuse') && (
          <Bar dataKey="fuse" name="FUSE" fill={getBarColor('fuse')} />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EnergyConsumptionChart;
