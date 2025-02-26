// Market indices data (historical average annual returns)
export const marketIndices = {
  none: { name: 'Custom', return: 8, description: 'Enter your own expected return rate' },
  sp500: { name: 'S&P 500', return: 10.5, description: 'Large-cap U.S. stocks (1990-2023 avg)' },
  nasdaq: { name: 'NASDAQ Composite', return: 12.5, description: 'Tech-heavy U.S. index (1990-2023 avg)' },
  djia: { name: 'Dow Jones', return: 8.3, description: 'Blue-chip U.S. stocks (1990-2023 avg)' },
  russell2000: { name: 'Russell 2000', return: 9.3, description: 'Small-cap U.S. stocks (1990-2023 avg)' },
  msciEAFE: { name: 'MSCI EAFE', return: 6.7, description: 'Developed markets excluding U.S. & Canada (1990-2023 avg)' },
  msciEM: { name: 'MSCI Emerging Markets', return: 8.9, description: 'Emerging market stocks (1990-2023 avg)' },
  bonds: { name: 'U.S. Bonds (Aggregate)', return: 3.8, description: 'U.S. investment-grade bonds (1990-2023 avg)' },
};

// Format currency function
export const formatCurrency = (value) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  } else {
    return `$${value}`;
  }
};

// Calculate investment growth
export const calculateInvestment = (
  initialInvestment,
  monthlyContribution,
  years,
  annualReturn,
  adjustForInflation,
  inflationRate
) => {
  const monthlyRate = annualReturn / 100 / 12;
  const monthlyInflationRate = adjustForInflation ? inflationRate / 100 / 12 : 0;
  const totalMonths = years * 12;
  
  let balance = initialInvestment;
  const data = [];
  const yearData = [];
  
  data.push({
    month: 0,
    balance: balance,
    contribution: initialInvestment,
    growth: 0,
    realBalance: balance
  });
  
  let cumulativeInflationFactor = 1;
  
  for (let month = 1; month <= totalMonths; month++) {
    // Update inflation factor
    if (adjustForInflation) {
      cumulativeInflationFactor *= (1 + monthlyInflationRate);
    }
    
    // Add monthly contribution
    balance += monthlyContribution;
    
    // Calculate interest for this month
    const interestEarned = balance * monthlyRate;
    
    // Add interest to balance
    balance += interestEarned;
    
    // Calculate real (inflation-adjusted) value
    const realBalance = adjustForInflation ? balance / cumulativeInflationFactor : balance;
    
    // Only add data points for the beginning of each year to keep the chart clean
    if (month % 12 === 0) {
      const year = month / 12;
      const yearContributions = year === 1 
        ? initialInvestment + (monthlyContribution * 12) 
        : monthlyContribution * 12;
        
      const prevYearBalance = year === 1 ? initialInvestment : data[data.length - 1].balance;
      const yearGrowth = balance - prevYearBalance - (monthlyContribution * 12);
      
      data.push({
        month,
        balance: Math.round(balance),
        contribution: initialInvestment + (monthlyContribution * month),
        growth: Math.round(balance - (initialInvestment + (monthlyContribution * month))),
        realBalance: Math.round(realBalance)
      });
      
      yearData.push({
        year,
        yearlyContribution: monthlyContribution * 12,
        startBalance: Math.round(prevYearBalance),
        endBalance: Math.round(balance),
        growth: Math.round(yearGrowth),
        growthPercent: ((yearGrowth / prevYearBalance) * 100).toFixed(2),
        realEndBalance: Math.round(realBalance)
      });
    }
  }
  
  // Add final month if not a complete year
  if (totalMonths % 12 !== 0) {
    const realBalance = adjustForInflation ? balance / cumulativeInflationFactor : balance;
    
    data.push({
      month: totalMonths,
      balance: Math.round(balance),
      contribution: initialInvestment + (monthlyContribution * totalMonths),
      growth: Math.round(balance - (initialInvestment + (monthlyContribution * totalMonths))),
      realBalance: Math.round(realBalance)
    });
  }
  
  return {
    results: data,
    yearlyResults: yearData,
    finalAmount: Math.round(balance),
    finalRealAmount: Math.round(adjustForInflation ? balance / cumulativeInflationFactor : balance),
    totalContributions: initialInvestment + (monthlyContribution * totalMonths),
    totalReturn: Math.round(balance - (initialInvestment + (monthlyContribution * totalMonths)))
  };
};