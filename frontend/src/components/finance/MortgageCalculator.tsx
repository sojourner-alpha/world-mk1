import { useState } from 'react';
import { financeApi } from '../../api/finance';

interface MortgageResult {
  monthly_payment: number;
  total_payments: number;
  total_interest: number;
  total_periods: number;
  years_to_payoff: number;
  schedule: Array<{
    period: number;
    payment: number;
    principal: number;
    interest: number;
    remaining_balance: number;
  }>;
}

const MortgageCalculator = () => {
  // Form state
  const [principal, setPrincipal] = useState<number>(300000);
  const [rate, setRate] = useState<number>(4.5);
  const [years, setYears] = useState<number>(30);
  const [additionalPayment, setAdditionalPayment] = useState<number>(0);
  
  // API call state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MortgageResult | null>(null);
  const [apiConnected, setApiConnected] = useState<boolean | null>(null);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Check if API is connected
      if (apiConnected === null) {
        try {
          const response = await fetch('http://localhost:8000/api/finance/test', { 
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
          setApiConnected(response.ok);
          if (!response.ok) {
            throw new Error('API not connected');
          }
        } catch (err) {
          setApiConnected(false);
          throw new Error('Cannot connect to API. This is normal if backend is not running.');
        }
      }
      
      // If API is not connected, use mock data
      if (apiConnected === false) {
        // Create mock data for demonstration
        const monthlyRate = rate / 12 / 100;
        const totalPeriods = years * 12;
        const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPeriods)) / (Math.pow(1 + monthlyRate, totalPeriods) - 1);
        
        const mockResult: MortgageResult = {
          monthly_payment: monthlyPayment,
          total_payments: monthlyPayment * totalPeriods,
          total_interest: (monthlyPayment * totalPeriods) - principal,
          total_periods: totalPeriods,
          years_to_payoff: years,
          schedule: []
        };
        
        // Generate first 12 months of mock schedule
        let balance = principal;
        for (let i = 1; i <= 12; i++) {
          const interest = balance * monthlyRate;
          const principalPayment = monthlyPayment - interest + additionalPayment;
          balance -= principalPayment;
          
          mockResult.schedule.push({
            period: i,
            payment: monthlyPayment + additionalPayment,
            principal: principalPayment,
            interest: interest,
            remaining_balance: balance
          });
        }
        
        setTimeout(() => {
          setResult(mockResult);
          setLoading(false);
        }, 1000); // Simulate API delay
        return;
      }
      
      // Make actual API call if connected
      const data = await financeApi.calculateMortgage({
        principal,
        annual_interest_rate: rate,
        years,
        additional_payment: additionalPayment
      });
      
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/70 backdrop-blur-sm text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4 font-heading">Mortgage Calculator</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-green-400 mb-1">Loan Amount</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
              min="1000"
              step="1000"
            />
          </div>
          
          <div>
            <label className="block text-green-400 mb-1">Interest Rate (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
              min="0.1"
              step="0.1"
            />
          </div>
          
          <div>
            <label className="block text-green-400 mb-1">Loan Term (years)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
              min="1"
              max="40"
              step="1"
            />
          </div>
          
          <div>
            <label className="block text-green-400 mb-1">Additional Monthly Payment</label>
            <input
              type="number"
              value={additionalPayment}
              onChange={(e) => setAdditionalPayment(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
              min="0"
              step="100"
            />
          </div>
        </div>
        
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-green-700 hover:bg-green-600 text-white rounded transition-colors duration-200 font-mono"
            disabled={loading}
          >
            {loading ? "Calculating..." : "Calculate"}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded">
          <p>{error}</p>
          {error.includes('API not connected') && (
            <p className="mt-2 text-sm">Using client-side calculations. For full features, run the Python backend.</p>
          )}
        </div>
      )}
      
      {apiConnected === false && !error && (
        <div className="mt-4 p-3 bg-yellow-900/50 border border-yellow-700 text-yellow-200 rounded text-sm">
          Note: Running in demonstration mode with client-side calculations. For full features, run the Python backend.
        </div>
      )}
      
      {result && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/70 p-4 rounded-lg">
              <h3 className="text-green-400 mb-2 font-heading">Payment Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monthly Payment:</span>
                  <span className="font-mono">{formatCurrency(result.monthly_payment)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Payments:</span>
                  <span className="font-mono">{formatCurrency(result.total_payments)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Interest:</span>
                  <span className="font-mono">{formatCurrency(result.total_interest)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payoff Time:</span>
                  <span className="font-mono">{result.years_to_payoff.toFixed(1)} years</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/70 p-4 rounded-lg">
              <h3 className="text-green-400 mb-2 font-heading">First Year</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-gray-700">
                      <th className="pb-2">Month</th>
                      <th className="pb-2">Payment</th>
                      <th className="pb-2">Principal</th>
                      <th className="pb-2">Interest</th>
                      <th className="pb-2">Remaining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule?.slice(0, 12).map((month) => (
                      <tr key={month.period} className="border-b border-gray-700/30">
                        <td className="py-1">{month.period}</td>
                        <td className="py-1 font-mono">{formatCurrency(month.payment)}</td>
                        <td className="py-1 font-mono">{formatCurrency(month.principal)}</td>
                        <td className="py-1 font-mono">{formatCurrency(month.interest)}</td>
                        <td className="py-1 font-mono">{formatCurrency(month.remaining_balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator; 