import React from 'react';

const DetailedResults = ({ yearlyResults, adjustForInflation }) => {
  return (
    <div className="overflow-x-auto">
      <h3 className="font-bold mb-2">Year-by-Year Breakdown</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
            <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Start</th>
            <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Contrib</th>
            <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
            <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Growth%</th>
            <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">End Balance</th>
            {adjustForInflation && (
              <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Real Value</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {yearlyResults.map((year) => (
            <tr key={year.year}>
              <td className="px-2 py-2 whitespace-nowrap text-sm">{year.year}</td>
              <td className="px-2 py-2 whitespace-nowrap text-sm text-right">${year.startBalance.toLocaleString()}</td>
              <td className="px-2 py-2 whitespace-nowrap text-sm text-right">${year.yearlyContribution.toLocaleString()}</td>
              <td className="px-2 py-2 whitespace-nowrap text-sm text-right text-green-600">${year.growth.toLocaleString()}</td>
              <td className="px-2 py-2 whitespace-nowrap text-sm text-right">{year.growthPercent}%</td>
              <td className="px-2 py-2 whitespace-nowrap text-sm text-right font-medium">${year.endBalance.toLocaleString()}</td>
              {adjustForInflation && (
                <td className="px-2 py-2 whitespace-nowrap text-sm text-right">${year.realEndBalance.toLocaleString()}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailedResults;