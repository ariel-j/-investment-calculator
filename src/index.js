import React, { useState, useEffect } from 'react';
import InvestmentForm from './InvestmentForm';
import ResultsSummary from './ResultsSummary';
import InvestmentChart from './InvestmentChart';
import DetailedResults from './DetailedResults';
import { calculateInvestment, marketIndices } from './calculationUtils';

const InvestmentCalculator = () => {
  // Input state
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(20);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [selectedIndex, setSelectedIndex] = useState('none');
  const [showDetailedResults, setShowDetailedResults] = useState(false);
  const [inflationRate, setInflationRate] = useState(2.5);
  const [adjustForInflation, setAdjustForInflation] = useState(false);
  
  // Results state
  const [results, setResults] = useState([]);
  const [yearlyResults, setYearlyResults] = useState([]);
  const [finalAmount, setFinalAmount] = useState(0);
  const [finalRealAmount, setFinalRealAmount] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalReturn, setTotalReturn] = useState(0);
  
  // Handle index selection
  const handleIndexChange = (e) => {
    const index = e.target.value;
    setSelectedIndex(index);
    setAnnualReturn(marketIndices[index].return);
  };
  
  // Calculate on input change
  useEffect(() => {
    const {
      results,
      yearlyResults,
      finalAmount,
      finalRealAmount,
      totalContributions,
      totalReturn
    } = calculateInvestment(
      initialInvestment,
      monthlyContribution,
      years,
      annualReturn,
      adjustForInflation,
      inflationRate
    );
    
    setResults(results);
    setYearlyResults(yearlyResults);
    setFinalAmount(finalAmount);
    setFinalRealAmount(finalRealAmount);
    setTotalContributions(totalContributions);
    setTotalReturn(totalReturn);
  }, [initialInvestment, monthlyContribution, years, annualReturn, adjustForInflation, inflationRate]);
  
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Investment Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <InvestmentForm 
            initialInvestment={initialInvestment}
            setInitialInvestment={setInitialInvestment}
            monthlyContribution={monthlyContribution}
            setMonthlyContribution={setMonthlyContribution}
            years={years}
            setYears={setYears}
            annualReturn={annualReturn}
            setAnnualReturn={setAnnualReturn}
            selectedIndex={selectedIndex}
            handleIndexChange={handleIndexChange}
            adjustForInflation={adjustForInflation}
            setAdjustForInflation={setAdjustForInflation}
            inflationRate={inflationRate}
            setInflationRate={setInflationRate}
          />

          <ResultsSummary 
            finalAmount={finalAmount}
            totalContributions={totalContributions}
            totalReturn={totalReturn}
            finalRealAmount={finalRealAmount}
            adjustForInflation={adjustForInflation}
          />
        </div>
        
        <div>
          <InvestmentChart 
            results={results}
            totalContributions={totalContributions}
            adjustForInflation={adjustForInflation}
          />
          
          <div className="mb-4">
            <button
              className="text-sm text-blue-600 hover:text-blue-800 underline"
              onClick={() => setShowDetailedResults(!showDetailedResults)}
            >
              {showDetailedResults ? 'Hide Detailed Results' : 'Show Detailed Results'}
            </button>
          </div>

          {showDetailedResults && (
            <DetailedResults 
              yearlyResults={yearlyResults}
              adjustForInflation={adjustForInflation}
            />
          )}
        </div>
      </div>
      
      <div className="mt-6 text-xs text-gray-600">
        <p>Notes:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>Returns are compounded monthly</li>
          <li>Contributions are made at the beginning of each month</li>
          <li>The rate of return is constant (this simplification doesn't account for market volatility)</li>
          <li>Tax implications are not factored into the calculations</li>
          <li>Historical returns for indices are based on approximate average annual returns over the past ~30 years (1990-2023)</li>
          <li>Past performance is not indicative of future results</li>
        </ul>
      </div>
    </div>
  );
};

export default InvestmentCalculator;