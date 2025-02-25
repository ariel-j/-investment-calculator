# Investment Calculator

## Overview
This Investment Calculator is a React-based tool that helps users visualize and plan their long-term investments. It allows for calculation of compound interest over time with various parameters like initial investment, monthly contributions, and estimated returns based on historical market data.

## Features
- Calculate investment growth over time with compound interest
- Visualize growth with interactive charts
- Select from major market indices with historical average returns
- Adjust for inflation to see real purchasing power
- View detailed year-by-year breakdown of investment growth

## File Structure
```
investment-calculator/
│
├── src/
│   ├── App.js                  # Application entry point
│   ├── index.js                # Main component orchestrating all others
│   ├── calculationUtils.js     # Business logic and market data
│   ├── InvestmentForm.js       # Input form component
│   ├── ResultsSummary.js       # Results summary component
│   ├── InvestmentChart.js      # Visualization chart component
│   └── DetailedResults.js      # Year-by-year breakdown component
│
└── README.md                   # This file
```

## Installation

1. Create a new React app (if needed):
```bash
npx create-react-app investment-calculator
cd investment-calculator
```

2. Install required dependencies:
```bash
npm install recharts lodash
```

3. Copy all the provided files into the `src` directory
4. Run the application:
```bash
npm start
```

## Usage
1. Enter your initial investment amount
2. Set your monthly contribution
3. Choose the number of years for your investment horizon
4. Either select a market index (which will fill in historical return data) or set your own expected annual return rate
5. Optionally, adjust for inflation to see results in today's dollars
6. View the results on the chart and detailed breakdown

## Technical Notes
- The application uses React with hooks for state management
- Recharts is used for visualization
- Calculations use monthly compounding interest
- Returns are simplified to be constant rather than having yearly volatility (for educational purposes)
- The year-by-year breakdown can be toggled for a more detailed view
- Historical returns are approximations based on average annual returns over 30+ years

## Customization
You can modify the market indices and their historical return data in `calculationUtils.js`. The current values are approximations based on historical data from 1990-2023.

## Future Enhancements
Possible improvements:
- Add risk tolerance assessment
- Include tax calculations and different account types
- Add Monte Carlo simulations for more realistic projections
- Enable portfolio allocation across multiple asset classes
- Add data export functionality
- Implement saving/loading of scenarios

## License
This project is open source and available for personal and educational use.
