import { useState } from 'react';
import { financeApi } from '../../api/finance';

interface RatioResults {
  // Profitability
  roe?: number;
  roa?: number;
  net_profit_margin?: number;
  operating_margin?: number;
  gross_margin?: number;
  
  // Liquidity
  current_ratio?: number;
  quick_ratio?: number;
  
  // Solvency
  debt_to_equity?: number;
  interest_coverage?: number;
  
  // DuPont Analysis
  dupont_analysis?: {
    roe: number;
    net_profit_margin: number;
    asset_turnover: number;
    equity_multiplier: number;
  };
}

const FinancialRatioCalculator = () => {
  // Form state - financial statement inputs
  const [netIncome, setNetIncome] = useState<string>('');
  const [revenue, setRevenue] = useState<string>('');
  const [cogs, setCogs] = useState<string>('');
  const [operatingIncome, setOperatingIncome] = useState<string>('');
  const [totalAssets, setTotalAssets] = useState<string>('');
  const [shareholdersEquity, setShareholdersEquity] = useState<string>('');
  const [currentAssets, setCurrentAssets] = useState<string>('');
  const [currentLiabilities, setCurrentLiabilities] = useState<string>('');
  const [inventory, setInventory] = useState<string>('');
  const [totalDebt, setTotalDebt] = useState<string>('');
  const [interestExpense, setInterestExpense] = useState<string>('');

  // Display selection
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // API call state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<RatioResults | null>(null);
  
  // Format percentage
  const formatPercent = (value: number | undefined) => {
    if (value === undefined) return 'N/A';
    return `${(value * 100).toFixed(2)}%`;
  };
  
  // Format decimal
  const formatDecimal = (value: number | undefined, decimals: number = 2) => {
    if (value === undefined) return 'N/A';
    return value.toFixed(decimals);
  };
  
  // Check if we have enough data to calculate ratios
  const canCalculate = () => {
    // At least one input field should have a value
    return [
      netIncome, revenue, cogs, operatingIncome, totalAssets, 
      shareholdersEquity, currentAssets, currentLiabilities, 
      inventory, totalDebt, interestExpense
    ].some(val => val !== '');
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canCalculate()) {
      setError('Please enter at least one financial statement value');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Prepare data for API call
      const data = {
        net_income: netIncome ? parseFloat(netIncome) : undefined,
        revenue: revenue ? parseFloat(revenue) : undefined,
        cost_of_goods_sold: cogs ? parseFloat(cogs) : undefined,
        operating_income: operatingIncome ? parseFloat(operatingIncome) : undefined,
        total_assets: totalAssets ? parseFloat(totalAssets) : undefined,
        shareholders_equity: shareholdersEquity ? parseFloat(shareholdersEquity) : undefined,
        current_assets: currentAssets ? parseFloat(currentAssets) : undefined,
        current_liabilities: currentLiabilities ? parseFloat(currentLiabilities) : undefined,
        inventory: inventory ? parseFloat(inventory) : undefined,
        total_debt: totalDebt ? parseFloat(totalDebt) : undefined,
        interest_expense: interestExpense ? parseFloat(interestExpense) : undefined
      };
      
      // Make API call
      const response = await financeApi.calculateFundamentalRatios(data);
      setResults(response);
    } catch (err) {
      console.error('Error calculating ratios:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while calculating ratios');
      
      // If API is not connected, generate some sample data
      // This is just for demonstration purposes when backend is not running
      if (err instanceof Error && err.message.includes('Failed to fetch')) {
        setError('API connection failed. Using sample data for demonstration.');
        
        // Create sample data based on inputs
        const sampleResults: RatioResults = {};
        
        if (netIncome && shareholdersEquity) {
          sampleResults.roe = parseFloat(netIncome) / parseFloat(shareholdersEquity);
        }
        
        if (netIncome && totalAssets) {
          sampleResults.roa = parseFloat(netIncome) / parseFloat(totalAssets);
        }
        
        if (netIncome && revenue) {
          sampleResults.net_profit_margin = parseFloat(netIncome) / parseFloat(revenue);
        }
        
        if (operatingIncome && revenue) {
          sampleResults.operating_margin = parseFloat(operatingIncome) / parseFloat(revenue);
        }
        
        if (revenue && cogs) {
          sampleResults.gross_margin = (parseFloat(revenue) - parseFloat(cogs)) / parseFloat(revenue);
        }
        
        if (currentAssets && currentLiabilities) {
          sampleResults.current_ratio = parseFloat(currentAssets) / parseFloat(currentLiabilities);
          
          if (inventory) {
            sampleResults.quick_ratio = (parseFloat(currentAssets) - parseFloat(inventory)) / parseFloat(currentLiabilities);
          }
        }
        
        if (totalDebt && shareholdersEquity) {
          sampleResults.debt_to_equity = parseFloat(totalDebt) / parseFloat(shareholdersEquity);
        }
        
        if (operatingIncome && interestExpense) {
          sampleResults.interest_coverage = parseFloat(operatingIncome) / parseFloat(interestExpense);
        }
        
        // DuPont analysis if all required fields are present
        if (netIncome && revenue && totalAssets && shareholdersEquity) {
          const netProfitMargin = parseFloat(netIncome) / parseFloat(revenue);
          const assetTurnover = parseFloat(revenue) / parseFloat(totalAssets);
          const equityMultiplier = parseFloat(totalAssets) / parseFloat(shareholdersEquity);
          
          sampleResults.dupont_analysis = {
            roe: netProfitMargin * assetTurnover * equityMultiplier,
            net_profit_margin: netProfitMargin,
            asset_turnover: assetTurnover,
            equity_multiplier: equityMultiplier
          };
        }
        
        setResults(sampleResults);
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Reset form
  const handleReset = () => {
    setNetIncome('');
    setRevenue('');
    setCogs('');
    setOperatingIncome('');
    setTotalAssets('');
    setShareholdersEquity('');
    setCurrentAssets('');
    setCurrentLiabilities('');
    setInventory('');
    setTotalDebt('');
    setInterestExpense('');
    setResults(null);
    setError(null);
  };
  
  return (
    <div className="bg-black/70 backdrop-blur-sm text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4 font-heading">Financial Ratio Calculator</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Income Statement Inputs */}
          <div className="space-y-4">
            <h3 className="text-lg text-green-400 border-b border-green-800 pb-1">Income Statement</h3>
            
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Revenue</label>
              <input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Cost of Goods Sold</label>
              <input
                type="number"
                value={cogs}
                onChange={(e) => setCogs(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Operating Income (EBIT)</label>
              <input
                type="number"
                value={operatingIncome}
                onChange={(e) => setOperatingIncome(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Net Income</label>
              <input
                type="number"
                value={netIncome}
                onChange={(e) => setNetIncome(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Interest Expense</label>
              <input
                type="number"
                value={interestExpense}
                onChange={(e) => setInterestExpense(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
          </div>
          
          {/* Balance Sheet Inputs */}
          <div className="space-y-4">
            <h3 className="text-lg text-green-400 border-b border-green-800 pb-1">Balance Sheet</h3>
            
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Current Assets</label>
              <input
                type="number"
                value={currentAssets}
                onChange={(e) => setCurrentAssets(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Inventory</label>
              <input
                type="number"
                value={inventory}
                onChange={(e) => setInventory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Current Liabilities</label>
              <input
                type="number"
                value={currentLiabilities}
                onChange={(e) => setCurrentLiabilities(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Total Debt</label>
              <input
                type="number"
                value={totalDebt}
                onChange={(e) => setTotalDebt(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Total Assets</label>
              <input
                type="number"
                value={totalAssets}
                onChange={(e) => setTotalAssets(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Shareholders' Equity</label>
              <input
                type="number"
                value={shareholdersEquity}
                onChange={(e) => setShareholdersEquity(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4 mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-green-700 hover:bg-green-600 text-white rounded transition-colors duration-200 font-mono"
            disabled={loading}
          >
            {loading ? "Calculating..." : "Calculate Ratios"}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors duration-200 font-mono"
          >
            Reset
          </button>
        </div>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded">
          <p>{error}</p>
        </div>
      )}
      
      {results && (
        <div className="mt-6 space-y-4">
          {/* Results Category Selection */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded text-sm ${selectedCategory === 'all' ? 'bg-green-700 text-white' : 'bg-gray-800 text-gray-300'}`}
            >
              All Ratios
            </button>
            <button
              onClick={() => setSelectedCategory('profitability')}
              className={`px-3 py-1 rounded text-sm ${selectedCategory === 'profitability' ? 'bg-green-700 text-white' : 'bg-gray-800 text-gray-300'}`}
            >
              Profitability
            </button>
            <button
              onClick={() => setSelectedCategory('liquidity')}
              className={`px-3 py-1 rounded text-sm ${selectedCategory === 'liquidity' ? 'bg-green-700 text-white' : 'bg-gray-800 text-gray-300'}`}
            >
              Liquidity
            </button>
            <button
              onClick={() => setSelectedCategory('solvency')}
              className={`px-3 py-1 rounded text-sm ${selectedCategory === 'solvency' ? 'bg-green-700 text-white' : 'bg-gray-800 text-gray-300'}`}
            >
              Solvency
            </button>
            <button
              onClick={() => setSelectedCategory('dupont')}
              className={`px-3 py-1 rounded text-sm ${selectedCategory === 'dupont' ? 'bg-green-700 text-white' : 'bg-gray-800 text-gray-300'}`}
            >
              DuPont Analysis
            </button>
          </div>
          
          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Profitability Ratios */}
            {(selectedCategory === 'all' || selectedCategory === 'profitability') && (
              <div className="bg-gray-800/70 p-4 rounded-lg">
                <h3 className="text-green-400 mb-2 border-b border-green-900/50 pb-1">Profitability Ratios</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Return on Equity (ROE):</span>
                    <span className="font-mono">{formatPercent(results.roe)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Return on Assets (ROA):</span>
                    <span className="font-mono">{formatPercent(results.roa)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Net Profit Margin:</span>
                    <span className="font-mono">{formatPercent(results.net_profit_margin)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Operating Margin:</span>
                    <span className="font-mono">{formatPercent(results.operating_margin)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Gross Margin:</span>
                    <span className="font-mono">{formatPercent(results.gross_margin)}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Liquidity Ratios */}
            {(selectedCategory === 'all' || selectedCategory === 'liquidity') && (
              <div className="bg-gray-800/70 p-4 rounded-lg">
                <h3 className="text-green-400 mb-2 border-b border-green-900/50 pb-1">Liquidity Ratios</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Current Ratio:</span>
                    <span className="font-mono">{formatDecimal(results.current_ratio)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Quick Ratio:</span>
                    <span className="font-mono">{formatDecimal(results.quick_ratio)}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Solvency Ratios */}
            {(selectedCategory === 'all' || selectedCategory === 'solvency') && (
              <div className="bg-gray-800/70 p-4 rounded-lg">
                <h3 className="text-green-400 mb-2 border-b border-green-900/50 pb-1">Solvency Ratios</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Debt-to-Equity:</span>
                    <span className="font-mono">{formatDecimal(results.debt_to_equity)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Interest Coverage:</span>
                    <span className="font-mono">{formatDecimal(results.interest_coverage)}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* DuPont Analysis */}
            {(selectedCategory === 'all' || selectedCategory === 'dupont') && results.dupont_analysis && (
              <div className="bg-gray-800/70 p-4 rounded-lg">
                <h3 className="text-green-400 mb-2 border-b border-green-900/50 pb-1">DuPont Analysis</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">ROE (DuPont):</span>
                    <span className="font-mono">{formatPercent(results.dupont_analysis.roe)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Net Profit Margin:</span>
                    <span className="font-mono">{formatPercent(results.dupont_analysis.net_profit_margin)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Asset Turnover:</span>
                    <span className="font-mono">{formatDecimal(results.dupont_analysis.asset_turnover)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Equity Multiplier:</span>
                    <span className="font-mono">{formatDecimal(results.dupont_analysis.equity_multiplier)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialRatioCalculator; 