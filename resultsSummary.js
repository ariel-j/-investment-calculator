import React from 'react';

const ResultsSummary = ({
  finalAmount,
  totalContributions,
  totalReturn,
  finalRealAmount,
  adjustForInflation
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <h3 className="font-bold text-lg mb-2">Results</h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-sm text-gray-600">Final Amount:</p>
          <p className="font-bold text-lg">${finalAmount.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Contributions:</p>
          <p className="font-bold text-lg">${totalContributions.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Growth:</p>
          <p className="font-bold text-lg text-green-600">${totalReturn.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Return Multiplier:</p>
          <p className="font-bold text-lg">{(finalAmount / totalContributions).toFixed(2)}x</p>
        </div>
      </div>
      
      {adjustForInflation && (
        <div className="mt-3 p-2 bg-white rounded">
          <p className="text-sm text-gray-600">Inflation-Adjusted Final Amount:</p>
          <p className="font-bold text-lg">${finalRealAmount.toLocaleString()}</p>
          <p className="text-xs text-gray-500">in today's dollars</p>
        </div>
      )}
    </div>
  );
};

export default ResultsSummary;