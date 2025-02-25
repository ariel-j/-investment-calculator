import React from 'react';
import { marketIndices } from './calculationUtils';

const InvestmentForm = ({
  initialInvestment,
  setInitialInvestment,
  monthlyContribution,
  setMonthlyContribution,
  years,
  setYears,
  annualReturn,
  setAnnualReturn,
  selectedIndex,
  handleIndexChange,
  adjustForInflation,
  setAdjustForInflation,
  inflationRate,
  setInflationRate
}) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Market Index</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedIndex}
          onChange={handleIndexChange}
        >
          {Object.keys(marketIndices).map(index => (
            <option key={index} value={index}>
              {marketIndices[index].name} {index !== 'none' ? `(${marketIndices[index].return}%)` : ''}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">{marketIndices[selectedIndex].description}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Initial Investment ($)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(Number(e.target.value))}
            min="0"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Monthly Contribution ($)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            min="0"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Time Period (Years)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            min="1"
            max="50"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Annual Return (%)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(Number(e.target.value))}
            step="0.1"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="adjustInflation"
            className="mr-2"
            checked={adjustForInflation}
            onChange={(e) => setAdjustForInflation(e.target.checked)}
          />
          <label htmlFor="adjustInflation" className="text-sm font-medium">Adjust for Inflation</label>
        </div>
        
        {adjustForInflation && (
          <div className="mt-2">
            <label className="block text-xs font-medium mb-1">Annual Inflation Rate (%)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              step="0.1"
              min="0"
              max="20"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default InvestmentForm;