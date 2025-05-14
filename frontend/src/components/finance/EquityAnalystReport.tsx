import React, { useState } from 'react';
import { FaBalanceScale, FaCalculator, FaChartArea, FaChartBar, FaChartLine, FaExclamationTriangle, FaGlobe, FaShieldAlt } from 'react-icons/fa';
import { AVAILABLE_REPORTS, EquityReportData, getReportByTicker } from './EquityReportData';

// Module components
const CompanyHeader: React.FC<{ company: EquityReportData['company'] }> = ({ company }) => (
  <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-sm border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          {React.createElement(company.icon, { className: "text-yellow-500 mr-2" })}
          {company.name} <span className="ml-2 text-blue-600">({company.ticker})</span>
        </h1>
        <p className="text-sm text-gray-600">{company.sector} • {company.industry}</p>
      </div>
      <div className="bg-blue-50 px-3 py-1 rounded-full text-xs font-medium text-blue-800 border border-blue-100">
        CFA Equity Analysis
      </div>
    </div>
    <p className="mt-3 text-sm text-gray-700 line-clamp-2">{company.description}</p>
  </div>
);

const RatingSection: React.FC<{ rating: EquityReportData['rating'] }> = ({ rating }) => {
  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'Strong Buy':
      case 'Buy':
        return 'bg-green-100 text-green-800';
      case 'Hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Sell':
      case 'Strong Sell':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const priceChange = ((rating.targetPrice - rating.currentPrice) / rating.currentPrice) * 100;
  const isPositive = priceChange > 0;

  return (
    <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold mb-2">Rating</h2>
          <div className={`inline-block px-3 py-1 rounded-full ${getRecommendationColor(rating.recommendation)}`}>
            {rating.recommendation}
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <div>Price: <span className="font-medium">${rating.currentPrice.toFixed(2)}</span></div>
            <div>Target: <span className="font-medium">${rating.targetPrice.toFixed(2)}</span></div>
            <div>Date: <span className="font-medium">{rating.priceDate}</span></div>
          </div>
        </div>
        
        <div className="text-center">
          <div className={`text-3xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{priceChange.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-500">Upside Potential</div>
          <div className="mt-3 flex items-center justify-center gap-1">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${rating.analystConsensus.buy * 3}px` }}></div>
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${rating.analystConsensus.hold * 3}px` }}></div>
            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${rating.analystConsensus.sell * 3}px` }}></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">Analyst Consensus</div>
        </div>
      </div>
    </div>
  );
};

const KeyMetricsDashboard: React.FC<{ metrics: EquityReportData['keyMetrics'] }> = ({ metrics }) => {
  const formatLargeNumber = (num: number) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(1)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    } else {
      return `$${num.toFixed(0)}`;
    }
  };
  
  return (
    <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-3">Key Metrics</h2>
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-xs text-gray-500">Market Cap</div>
          <div className="text-sm font-medium">{formatLargeNumber(metrics.marketCap)}</div>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-xs text-gray-500">P/E Ratio</div>
          <div className="text-sm font-medium">{metrics.peRatio.toFixed(1)}x</div>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-xs text-gray-500">Forward P/E</div>
          <div className="text-sm font-medium">{metrics.forwardPe.toFixed(1)}x</div>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-xs text-gray-500">PEG Ratio</div>
          <div className="text-sm font-medium">{metrics.pegRatio.toFixed(2)}</div>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-xs text-gray-500">P/B Ratio</div>
          <div className="text-sm font-medium">{metrics.priceToBook.toFixed(1)}x</div>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-xs text-gray-500">EV/EBITDA</div>
          <div className="text-sm font-medium">{metrics.evToEbitda.toFixed(1)}x</div>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-xs text-gray-500">Revenue Growth</div>
          <div className={`text-sm font-medium ${metrics.revenueGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {metrics.revenueGrowth > 0 ? '+' : ''}{metrics.revenueGrowth.toFixed(1)}%
          </div>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-xs text-gray-500">EPS Growth</div>
          <div className={`text-sm font-medium ${metrics.epsGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {metrics.epsGrowth > 0 ? '+' : ''}{metrics.epsGrowth.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

const InvestmentThesis: React.FC<{ thesis: string[] }> = ({ thesis }) => (
  <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-sm border border-gray-200">
    <h2 className="text-lg font-semibold mb-3 flex items-center">
      <FaChartLine className="text-blue-500 mr-2" />
      Investment Thesis
    </h2>
    <ul className="list-disc pl-5 space-y-2">
      {thesis.map((point, index) => (
        <li key={index} className="text-sm text-gray-700">{point}</li>
      ))}
    </ul>
  </div>
);

const FundamentalMetrics: React.FC<{ data: EquityReportData['fundamentalMetrics'] }> = ({ data }) => {
  const renderMetric = (name: string, value: number, isPercentage: boolean = false) => (
    <div className="bg-gray-50 p-2 rounded">
      <div className="text-xs text-gray-500">{name}</div>
      <div className="text-sm font-medium">
        {isPercentage ? `${value.toFixed(1)}%` : value.toFixed(2)}
      </div>
    </div>
  );
  
  return (
    <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-3 flex items-center">
        <FaCalculator className="text-blue-500 mr-2" />
        Fundamental Metrics
      </h2>
      
      <div className="mb-3">
        <h3 className="text-sm font-medium mb-2">Profitability</h3>
        <div className="grid grid-cols-4 gap-2">
          {renderMetric('Return on Equity', data.returnOnEquity, true)}
          {renderMetric('Return on Assets', data.returnOnAssets, true)}
          {renderMetric('ROIC', data.returnOnInvestedCapital, true)}
          {renderMetric('Gross Margin', data.grossMargin, true)}
        </div>
      </div>
      
      <div className="mb-3">
        <h3 className="text-sm font-medium mb-2">Liquidity & Solvency</h3>
        <div className="grid grid-cols-4 gap-2">
          {renderMetric('Current Ratio', data.currentRatio)}
          {renderMetric('Quick Ratio', data.quickRatio)}
          {renderMetric('Debt/Equity', data.debtToEquity)}
          {renderMetric('Interest Coverage', data.interestCoverage)}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Efficiency</h3>
        <div className="grid grid-cols-4 gap-2">
          {renderMetric('Asset Turnover', data.assetTurnover)}
          {renderMetric('Inventory Turnover', data.inventoryTurnover)}
          {renderMetric('Receivables Turnover', data.receivablesTurnover)}
          {renderMetric('FCF Yield', data.freeCashFlowYield, true)}
        </div>
      </div>
    </div>
  );
};

const TechnicalAnalysis: React.FC<{ data: EquityReportData['technicalAnalysis'] }> = ({ data }) => {
  const getTrendColor = (trend: string) => {
    if (trend === 'Uptrend') return 'text-green-600';
    if (trend === 'Downtrend') return 'text-red-600';
    return 'text-yellow-600';
  };
  
  const getSignalColor = (signal: string) => {
    if (signal === 'Buy') return 'text-green-600';
    if (signal === 'Sell') return 'text-red-600';
    return 'text-yellow-600';
  };
  
  const getRSIColor = (rsi: number) => {
    if (rsi > 70) return 'text-red-600';
    if (rsi < 30) return 'text-green-600';
    return 'text-blue-600';
  };
  
  return (
    <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-3 flex items-center">
        <FaChartArea className="text-blue-500 mr-2" />
        Technical Analysis
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Price Action</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Trend:</span>
              <span className={`text-sm font-medium ${getTrendColor(data.priceAction.trend)}`}>
                {data.priceAction.trend}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Signal:</span>
              <span className={`text-sm font-medium ${getSignalColor(data.priceAction.signal)}`}>
                {data.priceAction.signal}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">vs 50-day MA:</span>
              <span className={`text-sm font-medium ${data.priceAction.priceVs50dma > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {data.priceAction.priceVs50dma > 0 ? '+' : ''}{data.priceAction.priceVs50dma.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">vs 200-day MA:</span>
              <span className={`text-sm font-medium ${data.priceAction.priceVs200dma > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {data.priceAction.priceVs200dma > 0 ? '+' : ''}{data.priceAction.priceVs200dma.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Key Indicators</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">RSI (14):</span>
              <span className={`text-sm font-medium ${getRSIColor(data.indicators.rsi)}`}>
                {data.indicators.rsi.toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">MACD:</span>
              <span className={`text-sm font-medium ${data.indicators.macd.histogram > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {data.indicators.macd.value.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Volume Trend:</span>
              <span className="text-sm font-medium">
                {data.volumeAnalysis.volumeTrend}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Relative Volume:</span>
              <span className={`text-sm font-medium ${data.volumeAnalysis.relativeVolume > 1 ? 'text-green-600' : 'text-gray-600'}`}>
                {data.volumeAnalysis.relativeVolume.toFixed(2)}x
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Support & Resistance</h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">Support Levels</div>
            <div className="flex flex-col gap-1">
              {data.supportResistance.support.map((level, i) => (
                <div key={i} className="text-sm text-green-700 flex justify-between">
                  <span className="text-xs">S{i+1}:</span>
                  <span>${level.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">Resistance Levels</div>
            <div className="flex flex-col gap-1">
              {data.supportResistance.resistance.map((level, i) => (
                <div key={i} className="text-sm text-red-700 flex justify-between">
                  <span className="text-xs">R{i+1}:</span>
                  <span>${level.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Technical Commentary</h3>
        <ul className="list-disc pl-5 space-y-1">
          {data.technicalCommentary.map((comment, index) => (
            <li key={index} className="text-xs text-gray-700">{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const FinancialPerformance: React.FC<{ data: EquityReportData['financialPerformance'] }> = ({ data }) => {
  const [chartView, setChartView] = useState<'eps' | 'sales' | 'revenuePerEmployee'>('eps');
  
  const renderChart = () => {
    let chartData: { year: string; value: number }[] = [];
    let yAxisLabel = '';
    let valueFormatter: (val: number) => string = (val) => val.toString();
    
    switch(chartView) {
      case 'eps':
        chartData = data.fiveYearData.eps;
        yAxisLabel = 'EPS ($)';
        valueFormatter = (val) => `$${val.toFixed(2)}`;
        break;
      case 'sales':
        chartData = data.fiveYearData.sales;
        yAxisLabel = 'Sales ($M)';
        valueFormatter = (val) => `$${val}M`;
        break;
      case 'revenuePerEmployee':
        chartData = data.fiveYearData.revenuePerEmployee;
        yAxisLabel = 'Rev/Employee ($)';
        valueFormatter = (val) => `$${Math.round(val / 1000)}K`;
        break;
    }
    
    // Get max value for scaling
    const maxValue = Math.max(...chartData.map(d => d.value));
    
    return (
      <div className="h-64 bg-gray-50 rounded border border-gray-200 p-4 relative">
        {/* Y-axis label */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 -rotate-90 text-xs text-gray-500">
          {yAxisLabel}
        </div>
        
        {/* Chart container */}
        <div className="h-full flex flex-col">
          {/* Data values at top */}
          <div className="flex justify-between mb-2 px-4">
            {chartData.map((item, i) => (
              <div key={`value-${i}`} className="text-xs font-medium text-gray-700">
                {valueFormatter(item.value)}
              </div>
            ))}
          </div>
          
          {/* Chart bars */}
          <div className="flex-1 flex justify-between items-end">
            {chartData.map((item, i) => (
              <div key={i} className="flex flex-col items-center h-full justify-end w-16">
                <div 
                  className={`w-12 rounded-t ${chartView === 'eps' ? 'bg-blue-500' : chartView === 'sales' ? 'bg-green-500' : 'bg-purple-500'}`} 
                  style={{ height: `${(item.value / maxValue) * 80}%` }}
                ></div>
                <div className="text-xs mt-2 text-gray-600 font-medium">{item.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-3 flex items-center">
        <FaBalanceScale className="text-blue-500 mr-2" />
        Financial Performance
      </h2>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium">5-Year Trend</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setChartView('eps')}
              className={`text-xs px-2 py-1 rounded ${chartView === 'eps' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              EPS
            </button>
            <button 
              onClick={() => setChartView('sales')}
              className={`text-xs px-2 py-1 rounded ${chartView === 'sales' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Sales
            </button>
            <button 
              onClick={() => setChartView('revenuePerEmployee')}
              className={`text-xs px-2 py-1 rounded ${chartView === 'revenuePerEmployee' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Rev/Employee
            </button>
          </div>
        </div>
        {renderChart()}
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <h3 className="text-xs text-gray-500">Gross Margin</h3>
          <div className="text-sm font-medium">{data.margins.gross.toFixed(1)}%</div>
        </div>
        <div>
          <h3 className="text-xs text-gray-500">Operating Margin</h3>
          <div className="text-sm font-medium">{data.margins.operating.toFixed(1)}%</div>
        </div>
        <div>
          <h3 className="text-xs text-gray-500">Net Margin</h3>
          <div className="text-sm font-medium">{data.margins.net.toFixed(1)}%</div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <div>
          <h3 className="text-xs text-gray-500">Debt/Equity</h3>
          <div className="text-sm font-medium">{data.debtToEquity.toFixed(2)}</div>
        </div>
        <div>
          <h3 className="text-xs text-gray-500">Quick Ratio</h3>
          <div className="text-sm font-medium">{data.quickRatio.toFixed(1)}</div>
        </div>
        <div>
          <h3 className="text-xs text-gray-500">Return on Equity</h3>
          <div className="text-sm font-medium">{data.returnOnEquity.toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
};

const RiskAssessment: React.FC<{ risks: EquityReportData['riskAssessment'] }> = ({ risks }) => {
  const getRiskColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-3 flex items-center">
        <FaShieldAlt className="text-blue-500 mr-2" />
        Risk Assessment
      </h2>
      
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium mb-1">Business Risks</h3>
          <div className="space-y-1">
            {risks.businessRisks.map((risk, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span>{risk.factor}</span>
                <span className={`px-2 py-0.5 rounded text-xs ${getRiskColor(risk.impact)}`}>
                  {risk.impact}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1">Market Risks</h3>
          <div className="space-y-1">
            {risks.marketRisks.map((risk, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span>{risk.factor}</span>
                <span className={`px-2 py-0.5 rounded text-xs ${getRiskColor(risk.impact)}`}>
                  {risk.impact}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const IndustryPosition: React.FC<{ data: EquityReportData['industryPosition'] }> = ({ data }) => (
  <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-sm border border-gray-200">
    <h2 className="text-lg font-semibold mb-3 flex items-center">
      <FaGlobe className="text-blue-500 mr-2" />
      Industry Position
    </h2>
    
    <div className="flex mb-3">
      <div className="flex-1">
        <div className="text-xs text-gray-500">Market Share</div>
        <div className="text-lg font-semibold">{data.marketSharePercentage.toFixed(1)}%</div>
        <div className="h-2 w-full bg-gray-200 rounded-full mt-1">
          <div 
            className="h-2 bg-blue-500 rounded-full" 
            style={{ width: `${data.marketSharePercentage * 3}%` }}
          ></div>
        </div>
      </div>
      <div className="flex-1">
        <div className="text-xs text-gray-500">Industry Rank</div>
        <div className="text-lg font-semibold">#{data.rankInIndustry} of {data.totalCompetitors}</div>
      </div>
    </div>
    
    <div>
      <div className="text-xs text-gray-500">Industry Growth Rate</div>
      <div className="text-sm font-medium">{data.industryGrowth.toFixed(1)}% per year</div>
    </div>
    
    <div className="mt-3">
      <div className="text-xs text-gray-500 mb-1">Key Competitors</div>
      <div className="flex flex-wrap gap-2">
        {data.keyCompetitors.map((competitor, index) => (
          <span 
            key={index} 
            className="inline-block bg-gray-100 text-xs px-2 py-1 rounded"
          >
            {competitor}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const KeyTakeaways: React.FC<{ takeaways: string[], notes: string }> = ({ takeaways, notes }) => (
  <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-sm border border-gray-200">
    <h2 className="text-lg font-semibold mb-2 flex items-center">
      <FaChartBar className="text-blue-500 mr-2" />
      Key Takeaways
    </h2>
    
    <ul className="list-disc pl-5 mb-3">
      {takeaways.map((point, index) => (
        <li key={index} className="text-sm text-gray-700 mb-1">{point}</li>
      ))}
    </ul>
    
    <div className="mt-4 pt-2 border-t border-gray-200">
      <h3 className="text-sm font-medium mb-2">Analyst Notes (CFA Perspective)</h3>
      <p className="text-xs text-gray-700 italic">{notes}</p>
    </div>
  </div>
);

// Company card for selection
const CompanyCard: React.FC<{ 
  company: typeof AVAILABLE_REPORTS[0], 
  isSelected: boolean,
  onSelect: () => void
}> = ({ company, isSelected, onSelect }) => (
  <div 
    className={`p-3 mb-2 rounded-lg cursor-pointer transition-all ${
      isSelected ? 'bg-blue-100 border-l-4 border-blue-500' : 'bg-white hover:bg-gray-50'
    }`}
    onClick={onSelect}
  >
    <div className="flex items-center">
      {React.createElement(company.icon, { 
        className: `${isSelected ? 'text-blue-500' : 'text-gray-400'} mr-2` 
      })}
      <div>
        <div className="font-medium text-gray-800">{company.ticker}</div>
        <div className="text-xs text-gray-500 truncate">{company.name}</div>
      </div>
    </div>
  </div>
);

// Main component
const EquityAnalystReportContainer: React.FC = () => {
  const [selectedTicker, setSelectedTicker] = useState<string>('FSLR');
  const [showSelector, setShowSelector] = useState<boolean>(true);
  
  // Get data for the selected company
  const data = getReportByTicker(selectedTicker);
  
  // Format current date for last updated tag
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // State for module selection
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'financialPerformance', 'technicalAnalysis', 'fundamentalMetrics', 'riskAssessment'
  ]);
  
  // Toggle module selection (for customization)
  const toggleModule = (module: string) => {
    if (selectedModules.includes(module)) {
      setSelectedModules(selectedModules.filter(m => m !== module));
    } else {
      setSelectedModules([...selectedModules, module]);
    }
  };
  
  return (
    <div className="flex justify-center mx-auto animate-fadeIn">
      {/* Company Selector */}
      <div className={`${showSelector ? 'w-48' : 'w-12'} bg-gray-800 bg-opacity-60 p-3 rounded-l-lg transition-all duration-200 flex flex-col border-r border-gray-700`}>
        <div className="flex justify-between items-center mb-3">
          <h3 className={`font-semibold text-gray-200 ${showSelector ? 'block' : 'hidden'}`}>Companies</h3>
          <button 
            onClick={() => setShowSelector(!showSelector)}
            className="text-gray-400 hover:text-gray-200 p-1"
          >
            {showSelector ? '◀' : '▶'}
          </button>
        </div>
        
        <div className={`${showSelector ? 'block' : 'hidden'}`}>
          {AVAILABLE_REPORTS.map(company => (
            <CompanyCard 
              key={company.id}
              company={company}
              isSelected={selectedTicker === company.id}
              onSelect={() => setSelectedTicker(company.id)}
            />
          ))}
        </div>
        
        <div className={`${showSelector ? 'hidden' : 'flex flex-col items-center'}`}>
          {AVAILABLE_REPORTS.map(company => (
            <div 
              key={company.id}
              className={`p-2 mb-2 rounded-full cursor-pointer ${
                selectedTicker === company.id ? 'bg-blue-900 bg-opacity-50 text-blue-300' : 'text-gray-400 hover:text-gray-200'
              }`}
              onClick={() => setSelectedTicker(company.id)}
              title={company.name}
            >
              {React.createElement(company.icon)}
            </div>
          ))}
        </div>
      </div>
      
      {/* Report Content */}
      <div className="flex-1 bg-gray-900 bg-opacity-70 p-4 rounded-r-lg max-w-4xl border-t border-r border-b border-gray-700">
        <div className="flex justify-between items-center mb-3">
          <div className="text-xs text-gray-300 flex items-center">
            <FaExclamationTriangle className="text-amber-500 mr-1" />
            Equity Analyst Report - Customizable Modules
          </div>
          <div className="text-xs text-gray-300 flex items-center bg-gray-800 bg-opacity-80 px-2 py-1 rounded border border-gray-700">
            <span className="font-medium mr-1">Last Updated:</span> {formatDate()}
          </div>
        </div>
        
        {/* Module Selector (for demo purposes) */}
        <div className="bg-gray-800 bg-opacity-75 p-2 rounded mb-3 flex gap-2 flex-wrap border border-gray-700">
          <div className="text-xs text-gray-300 w-full">Select Analysis Modules:</div>
          {[
            'financialPerformance', 
            'fundamentalMetrics', 
            'technicalAnalysis', 
            'riskAssessment', 
            'industryPosition'
          ].map(module => (
            <button
              key={module}
              onClick={() => toggleModule(module)}
              className={`text-xs px-2 py-1 rounded-full ${
                selectedModules.includes(module)
                  ? 'bg-blue-900 bg-opacity-60 text-blue-200 border border-blue-700'
                  : 'bg-gray-700 bg-opacity-50 text-gray-300 border border-gray-600'
              }`}
            >
              {module.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>
        
        {/* Core Modules - Always Present */}
        <div className="space-y-4">
          <CompanyHeader company={data.company} />
          <div className="grid grid-cols-2 gap-4">
            <RatingSection rating={data.rating} />
            <KeyMetricsDashboard metrics={data.keyMetrics} />
          </div>
          <InvestmentThesis thesis={data.investmentThesis} />
        </div>
        
        {/* Flexible Modules - Based on Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {selectedModules.includes('fundamentalMetrics') && (
            <FundamentalMetrics data={data.fundamentalMetrics} />
          )}
          
          {selectedModules.includes('financialPerformance') && (
            <FinancialPerformance data={data.financialPerformance} />
          )}
          
          {selectedModules.includes('technicalAnalysis') && (
            <TechnicalAnalysis data={data.technicalAnalysis} />
          )}
          
          {selectedModules.includes('riskAssessment') && (
            <RiskAssessment risks={data.riskAssessment} />
          )}
          
          {selectedModules.includes('industryPosition') && (
            <IndustryPosition data={data.industryPosition} />
          )}
        </div>
        
        {/* Bottom Modules - Always Present */}
        <div className="mt-4">
          <KeyTakeaways takeaways={data.keyTakeaways} notes={data.analystNotes} />
        </div>
        
        <div className="mt-4 text-xs text-gray-400 text-right">
          Report Date: {new Date().toLocaleDateString()} | Data sources: Company filings, Bloomberg, analyst estimates
        </div>
      </div>
    </div>
  );
};

export default EquityAnalystReportContainer; 