import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { formatCurrency } from './calculationUtils';

const InvestmentChart = ({ results, totalContributions, adjustForInflation }) => {
  return (
    <div className="h-64 mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={results}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
            tickFormatter={(month) => month/12}
          />
          <YAxis 
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip 
            formatter={(value) => [`$${value.toLocaleString()}`, '']}
            labelFormatter={(month) => `Year ${(month/12).toFixed(1)}`}
          />
          <Legend verticalAlign="top" height={36}/>
          <ReferenceLine y={totalContributions} stroke="#9ca3af" strokeDasharray="3 3" label="Total Invested" />
          <Line 
            type="monotone" 
            dataKey="balance" 
            name="Total Balance" 
            stroke="#4f46e5" 
            strokeWidth={2} 
            dot={false} 
            activeDot={{ r: 5 }}
          />
          {adjustForInflation && (
            <Line 
              type="monotone" 
              dataKey="realBalance" 
              name="Inflation-Adjusted" 
              stroke="#ef4444" 
              strokeWidth={2} 
              dot={false} 
              activeDot={{ r: 5 }}
            />
          )}
          <Line 
            type="monotone" 
            dataKey="contribution" 
            name="Contributions" 
            stroke="#9ca3af" 
            strokeWidth={1}
            strokeDasharray="5 5"
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InvestmentChart;