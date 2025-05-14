import { useState, useEffect } from 'react';
import { FaChartLine, FaCode, FaGithub, FaRobot, FaPython, FaCalculator, FaBook, FaCodeBranch, FaClock, FaServer } from 'react-icons/fa';
import { SiJupyter, SiPandas, SiNumpy } from 'react-icons/si';

// Custom components
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import { ProjectCardProps } from '../components/ProjectCard';
import MortgageCalculator from '../components/finance/MortgageCalculator';
import FinancialRatioCalculator from '../components/finance/FinancialRatioCalculator';
import EquityAnalystReportContainer from '../components/finance/EquityAnalystReport';

// API client
import { financeApi } from '../api/finance';

// Custom hooks
import { useAnimations } from '../hooks/useAnimations';

// Interface for our project cards
interface FinanceProjectProps extends ProjectCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  status: 'Completed' | 'In Progress' | 'Planned' | 'Available';
  categories: string[];
}

// Define section types
type ExpandedSection = 'libraries' | 'regression' | 'opensource' | 'calculators' | 'equityReport' | null;
type CalculatorType = 'mortgage' | 'financialRatios' | null;
type LibraryType = 'fundamentals' | 'technical' | 'valuation' | 'portfolio' | 'risk' | null;
type RegressionModelType = 'ols' | 'robust' | 'ridge' | 'lasso' | 'elastic_net' | 'quantile' | 'garch' | null;

// Define interfaces for regression state
interface RegressionInput {
  xTicker: string;
  yTicker: string;
  startDate: string;
  endDate: string;
  interval: string;
  modelType: RegressionModelType;
  addFeatures: boolean;
  testSize: number;
}

interface RegressionModels {
  [key: string]: string;
}

interface RecentSearch {
  id: number;
  regression_id: number;
  x_ticker: string;
  y_ticker: string;
  searched_at: string;
}

const Finance = () => {
  // Track which section is expanded
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorType>(null);
  const [selectedLibrary, setSelectedLibrary] = useState<LibraryType>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Additional state for regression tool
  const [regressionModels, setRegressionModels] = useState<RegressionModels>({});
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [isLoadingSearches, setIsLoadingSearches] = useState(false);
  const [isRunningRegression, setIsRunningRegression] = useState(false);
  const [regressionError, setRegressionError] = useState<string | null>(null);
  const [regressionInput, setRegressionInput] = useState<RegressionInput>({
    xTicker: '',
    yTicker: '',
    startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString().split('T')[0], // 5 years ago
    endDate: new Date().toISOString().split('T')[0], // Today
    interval: '1mo',
    modelType: 'ols',
    addFeatures: false,
    testSize: 0.2,
  });
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [regressionResults, setRegressionResults] = useState<any>(null);
  
  // Add state for the equity report section
  const [showEquityReport, setShowEquityReport] = useState(false);
  
  // Use shared animations
  useAnimations();

  // Effect for the typing animation
  useEffect(() => {
    // Add the CSS for typing animation
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      .card-typing-animation {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        width: 0;
        animation: typing 1.5s steps(20, end) forwards;
      }
      
      @keyframes typing {
        from { width: 0 }
        to { width: 100% }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.8s ease-in-out forwards;
        opacity: 0;
      }
      
      .content-fade-in {
        opacity: 0;
        animation: fadeIn 1.2s ease-in-out forwards;
        animation-delay: 0.5s;
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Load regression models and recent searches on mount
  useEffect(() => {
    const loadRegressionData = async () => {
      setIsLoadingModels(true);
      setIsLoadingSearches(true);
      
      try {
        // Load regression models
        const modelsResponse = await financeApi.getRegressionModels();
        setRegressionModels(modelsResponse);
        
        // Load recent searches
        const searchesResponse = await financeApi.getRecentRegressions(5);
        setRecentSearches(searchesResponse);
      } catch (error) {
        console.error('Error loading regression data:', error);
      } finally {
        setIsLoadingModels(false);
        setIsLoadingSearches(false);
      }
    };
    
    loadRegressionData();
  }, []);
  
  // Function to handle input changes for regression tool
  const handleRegressionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setRegressionInput(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked
        : name === 'testSize' 
          ? parseFloat(value) 
          : value
    }));
  };
  
  // Function to run regression analysis
  const runRegressionAnalysis = async () => {
    setIsRunningRegression(true);
    setRegressionError(null);
    
    try {
      // Validate inputs
      if (!regressionInput.xTicker || !regressionInput.yTicker) {
        throw new Error('Both ticker symbols are required');
      }
      
      const response = await financeApi.runRegressionAnalysis({
        x_ticker: regressionInput.xTicker,
        y_ticker: regressionInput.yTicker,
        start_date: regressionInput.startDate,
        end_date: regressionInput.endDate,
        interval: regressionInput.interval,
        model_type: regressionInput.modelType || 'ols',
        add_features: regressionInput.addFeatures,
        test_size: regressionInput.testSize,
        use_cache: true
      });
      
      setRegressionResults(response);
      
      // Refresh recent searches
      const searchesResponse = await financeApi.getRecentRegressions(5);
      setRecentSearches(searchesResponse);
      
    } catch (error) {
      console.error('Error running regression analysis:', error);
      setRegressionError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsRunningRegression(false);
    }
  };
  
  // Function to load a recent search
  const loadRecentSearch = (xTicker: string, yTicker: string) => {
    setRegressionInput(prev => ({
      ...prev,
      xTicker,
      yTicker
    }));
  };

  // Finance background image
  const financeImage = "/assets/images/finance.png";

  // Finance project categories
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'fundamentals', name: 'Fundamental Analysis' },
    { id: 'technical', name: 'Technical Analysis' },
    { id: 'ai', name: 'AI & ML' }
  ];

  // Finance projects data
  const projects: FinanceProjectProps[] = [
    {
      name: "AI Hedge Fund",
      description: "Open source AI-powered hedge fund simulation with multiple investing agents (Buffett, Graham, Munger, etc.) for algorithmic trading decisions.",
      technologies: ["Python", "AI/ML", "Quantitative Finance", "Backtesting"],
      type: "github",
      isPublic: true,
      githubUrl: "https://github.com/virattt/ai-hedge-fund",
      status: "Available",
      icon: FaRobot,
      categories: ["ai", "fundamentals", "technical"]
    },
    {
      name: "Fundamental Analysis Dashboard",
      description: "Interactive dashboard for analyzing company financials, valuation metrics, and growth indicators. Built with Python and Streamlit.",
      technologies: ["Python", "Pandas", "Financial Analysis", "Streamlit"],
      type: "github",
      isPublic: false,
      status: "In Progress",
      icon: FaChartLine,
      categories: ["fundamentals"]
    },
    {
      name: "Technical Analysis Toolkit",
      description: "Library of technical indicators and chart patterns for market analysis. Includes backtesting capabilities and customizable strategies.",
      technologies: ["Python", "NumPy", "Technical Analysis", "Visualization"],
      type: "github",
      isPublic: false,
      status: "Planned",
      icon: FaCode,
      categories: ["technical"]
    },
    {
      name: "Portfolio Optimization Engine",
      description: "Advanced portfolio construction tools based on Modern Portfolio Theory, factor models, and risk management techniques.",
      technologies: ["Python", "Risk Modeling", "Optimization", "Statistics"],
      type: "github",
      isPublic: false,
      status: "Planned",
      icon: FaChartLine,
      categories: ["portfolio"]
    },
    {
      name: "Financial News Sentiment Analyzer",
      description: "NLP-based tool for analyzing sentiment and impact of financial news on market movements and specific securities.",
      technologies: ["Python", "NLP", "Machine Learning", "News API"],
      type: "github",
      isPublic: false,
      status: "Planned",
      icon: FaRobot,
      categories: ["ml", "ai"]
    },
    {
      name: "Data Pipeline for Financial Analysis",
      description: "ETL pipeline for collecting, cleaning, and organizing financial data from various sources for analysis and modeling.",
      technologies: ["Python", "SQL", "APIs", "Data Engineering"],
      type: "github",
      isPublic: false,
      status: "Planned",
      icon: FaPython,
      categories: ["fundamentals", "technical", "ml"]
    }
  ];

  // Library documentation data
  const libraries = [
    {
      id: 'fundamentals',
      name: 'Fundamental Analysis',
      description: 'Functions for calculating financial ratios, growth rates, and analyzing financial statements.',
      functions: [
        { name: 'return_on_equity', description: 'Calculate Return on Equity (ROE)' },
        { name: 'return_on_assets', description: 'Calculate Return on Assets (ROA)' },
        { name: 'gross_margin', description: 'Calculate Gross Margin' },
        { name: 'operating_margin', description: 'Calculate Operating Margin' },
        { name: 'net_profit_margin', description: 'Calculate Net Profit Margin' },
        { name: 'current_ratio', description: 'Calculate Current Ratio' },
        { name: 'quick_ratio', description: 'Calculate Quick Ratio (Acid-Test Ratio)' },
        { name: 'debt_to_equity', description: 'Calculate Debt-to-Equity Ratio' },
        { name: 'dupont_analysis', description: 'Perform DuPont Analysis to break down ROE into components' }
      ]
    },
    {
      id: 'technical',
      name: 'Technical Analysis',
      description: 'Tools for calculating technical indicators and identifying patterns in price data.',
      functions: [
        { name: 'simple_moving_average', description: 'Calculate Simple Moving Average (SMA)' },
        { name: 'exponential_moving_average', description: 'Calculate Exponential Moving Average (EMA)' },
        { name: 'relative_strength_index', description: 'Calculate Relative Strength Index (RSI)' },
        { name: 'moving_average_convergence_divergence', description: 'Calculate MACD indicator' },
        { name: 'bollinger_bands', description: 'Calculate Bollinger Bands' },
        { name: 'stochastic_oscillator', description: 'Calculate Stochastic Oscillator' },
        { name: 'on_balance_volume', description: 'Calculate On-Balance Volume (OBV)' }
      ]
    },
    {
      id: 'valuation',
      name: 'Valuation',
      description: 'Methods for valuing companies and investments including DCF analysis and valuation ratios.',
      functions: [
        { name: 'price_to_earnings', description: 'Calculate Price-to-Earnings (P/E) Ratio' },
        { name: 'price_to_book', description: 'Calculate Price-to-Book (P/B) Ratio' },
        { name: 'price_to_sales', description: 'Calculate Price-to-Sales (P/S) Ratio' },
        { name: 'ev_to_ebitda', description: 'Calculate Enterprise Value to EBITDA Ratio' },
        { name: 'calculate_wacc', description: 'Calculate Weighted Average Cost of Capital' },
        { name: 'dcf_valuation', description: 'Perform Discounted Cash Flow Valuation' },
        { name: 'calculate_npv', description: 'Calculate Net Present Value' },
        { name: 'calculate_irr', description: 'Calculate Internal Rate of Return' }
      ]
    },
    {
      id: 'portfolio',
      name: 'Portfolio Management',
      description: 'Portfolio construction, optimization, and performance analysis tools.',
      functions: [
        { name: 'portfolio_return', description: 'Calculate expected portfolio return' },
        { name: 'portfolio_volatility', description: 'Calculate portfolio volatility' },
        { name: 'portfolio_sharpe_ratio', description: 'Calculate portfolio Sharpe ratio' },
        { name: 'optimize_portfolio', description: 'Optimize portfolio weights for maximum Sharpe ratio' },
        { name: 'efficient_frontier', description: 'Generate efficient frontier for portfolio optimization' },
        { name: 'calculate_beta', description: 'Calculate portfolio beta relative to market' },
        { name: 'calculate_alpha', description: 'Calculate portfolio alpha (Jensen\'s alpha)' }
      ]
    },
    {
      id: 'risk',
      name: 'Risk Analysis',
      description: 'Risk management tools including VaR, stress testing, and risk decomposition.',
      functions: [
        { name: 'value_at_risk', description: 'Calculate Value at Risk (VaR) using historical method' },
        { name: 'conditional_value_at_risk', description: 'Calculate Conditional Value at Risk (CVaR)' },
        { name: 'parametric_var', description: 'Calculate parametric Value at Risk assuming normal distribution' },
        { name: 'monte_carlo_var', description: 'Calculate Value at Risk using Monte Carlo simulation' },
        { name: 'stress_test_scenario', description: 'Perform stress testing using predefined scenarios' },
        { name: 'risk_contribution', description: 'Calculate risk contribution of each asset to portfolio risk' },
        { name: 'risk_parity_optimization', description: 'Perform risk parity portfolio optimization' }
      ]
    }
  ];

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.categories?.includes(activeCategory));
  
  // Functions to handle section expansion and selection
  const toggleSection = (section: ExpandedSection) => {
    if (expandedSection === section) {
      setExpandedSection(null);
      if (section === 'calculators') {
        setSelectedCalculator(null);
      } else if (section === 'libraries') {
        setSelectedLibrary(null);
      }
    } else {
      setExpandedSection(section);
    }
  };
  
  const selectCalculator = (calculator: CalculatorType) => {
    setSelectedCalculator(calculator);
  };

  const selectLibrary = (library: LibraryType) => {
    setSelectedLibrary(library);
  };

  // Shared tab styling function
  const getTabStyle = (isActive: boolean) => {
    return `px-2 md:px-3 py-1 rounded font-mono text-xs md:text-sm ${
      isActive 
        ? 'bg-green-900/50 text-green-400 border border-green-600' 
        : 'bg-black/70 text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-300'
    } transition-all duration-300`;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background image - darken for terminal feel */}
      <div className="fixed inset-0 z-0">
        <img 
          src={financeImage} 
          alt="Finance Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Header */}
      <PageHeader pageName="Finance" />
      
      {/* Main content area - full height and scrollable */}
      <div className="relative z-10 pt-24 md:pt-28 pb-12">
        <div className="container mx-auto px-8 md:px-12 flex flex-col min-h-[calc(100vh-4rem)]">
          {/* Terminal Title Container */}
          <div className="mb-8 pl-1 md:pl-2">
            {/* Command Prompt Container - Make fully transparent */}
            <div className="bg-transparent">
              {/* Command Prompt */}
              <div className={`font-mono text-white flex items-center text-base md:text-lg`}>
                <span className="text-gray-500 mr-2">$</span>
                <span>finance_lab</span>
              </div>
              
              {/* Comment Line */}
              <div className="font-mono text-xs text-gray-500 mt-1 animate-fadeIn text-left">
                <span>// quantitative & fundamental analysis toolbox</span>
              </div>
            </div>
          </div>

          {/* Main content sections - fade in after typing */}
          <div className="content-fade-in relative z-20">
            {/* Public Equity Analysis Reports Section (renamed from Equity Analyst Report) */}
            <div className="mb-6 w-full">
              <button 
                onClick={() => {
                  toggleSection('equityReport');
                  setShowEquityReport(!showEquityReport);
                }}
                className="w-full bg-green-900/30 hover:bg-green-900/40 border border-green-800/50 text-white py-3 px-4 rounded-md font-mono mb-4 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center">
                  <FaChartLine className="mr-2" />
                  <span>Public Equity Analysis</span>
                </div>
                <span>{showEquityReport ? '[-]' : '[+]'}</span>
              </button>
              
              {showEquityReport && (
                <div className="w-full">
                  {/* Section subtitle notes - left justified */}
                  <div className="text-gray-300 text-sm mb-4 text-left">
                    <p className="mb-2">Professional-grade equity analysis reports with comprehensive financial metrics, industry positioning, and CFA-level insights. Future updates will include for richer financial data presentation.</p>
                  </div>
                  
                  {/* Report container - centered */}
                  <div className="flex justify-center">
                    <EquityAnalystReportContainer />
                  </div>
                </div>
              )}
            </div>

            {/* Regression Analysis Tool Section */}
            <div className="mb-6 w-full">
              <button 
                onClick={() => toggleSection('regression')}
                className="w-full bg-green-900/30 hover:bg-green-900/40 border border-green-800/50 text-white py-3 px-4 rounded-md font-mono mb-4 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center">
                  <FaChartLine className="mr-2" />
                  <span>Regression Analysis Bot</span>
                </div>
                <span>{expandedSection === 'regression' ? '[-]' : '[+]'}</span>
              </button>
              
              {expandedSection === 'regression' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-black/70 backdrop-blur-sm text-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-heading text-green-400 mb-3">Stock Regression Analysis</h3>
                    <p className="text-slate-300 mb-6">
                      Analyze the relationship between two stocks using sophisticated regression methods. This tool collects historical data,
                      performs statistical analysis, and provides detailed regression diagnostics and interpretation.
                    </p>
                    
                    {/* Stock Input Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-3">
                        <label className="block text-green-400 font-mono text-sm">Independent Variable (X)</label>
                        <div className="flex">
                          <span className="bg-green-900/30 text-green-400 px-3 py-2 border border-green-800 rounded-l-md font-mono">$</span>
                          <input 
                            type="text" 
                            name="xTicker"
                            value={regressionInput.xTicker}
                            onChange={handleRegressionInputChange}
                            placeholder="Enter ticker (e.g. AAPL)" 
                            className="bg-black/50 text-white font-mono px-3 py-2 border border-green-800 rounded-r-md w-full focus:outline-none focus:ring-1 focus:ring-green-600"
                          />
                        </div>
                        <p className="text-xs text-gray-500">Base stock for comparison (X variable)</p>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="block text-green-400 font-mono text-sm">Dependent Variable (Y)</label>
                        <div className="flex">
                          <span className="bg-green-900/30 text-green-400 px-3 py-2 border border-green-800 rounded-l-md font-mono">$</span>
                          <input 
                            type="text"
                            name="yTicker"
                            value={regressionInput.yTicker}
                            onChange={handleRegressionInputChange}
                            placeholder="Enter ticker (e.g. MSFT)" 
                            className="bg-black/50 text-white font-mono px-3 py-2 border border-green-800 rounded-r-md w-full focus:outline-none focus:ring-1 focus:ring-green-600"
                          />
                        </div>
                        <p className="text-xs text-gray-500">Target stock to analyze (Y variable)</p>
                      </div>
                    </div>
                    
                    {/* Date Range & Model Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="space-y-3">
                        <label className="block text-green-400 font-mono text-sm">Start Date</label>
                        <input 
                          type="date"
                          name="startDate"
                          value={regressionInput.startDate}
                          onChange={handleRegressionInputChange}
                          className="bg-black/50 text-white font-mono px-3 py-2 border border-green-800 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <label className="block text-green-400 font-mono text-sm">End Date</label>
                        <input 
                          type="date"
                          name="endDate"
                          value={regressionInput.endDate}
                          onChange={handleRegressionInputChange}
                          className="bg-black/50 text-white font-mono px-3 py-2 border border-green-800 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <label className="block text-green-400 font-mono text-sm">Model Type</label>
                        <select
                          name="modelType"
                          value={regressionInput.modelType || 'ols'}
                          onChange={handleRegressionInputChange}
                          className="bg-black/50 text-white font-mono px-3 py-2 border border-green-800 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-600"
                        >
                          {isLoadingModels ? (
                            <option value="ols">Loading models...</option>
                          ) : (
                            Object.entries(regressionModels).map(([key, name]) => (
                              <option key={key} value={key}>{name}</option>
                            ))
                          )}
                        </select>
                        <p className="text-xs text-gray-500">Statistical model for analysis</p>
                      </div>
                    </div>
                    
                    {/* Advanced Options Toggle */}
                    <div className="mb-6">
                      <button
                        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                        className="text-green-400 hover:text-green-300 text-sm font-mono flex items-center"
                      >
                        {showAdvancedOptions ? '▼' : '▶'} Advanced Options
                      </button>
                      
                      {showAdvancedOptions && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 p-4 border border-gray-800 rounded-md bg-black/30">
                          <div className="space-y-3">
                            <label className="block text-green-400 font-mono text-sm">Interval</label>
                            <select
                              name="interval"
                              value={regressionInput.interval}
                              onChange={handleRegressionInputChange}
                              className="bg-black/50 text-white font-mono px-3 py-2 border border-green-800 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-600"
                            >
                              <option value="1d">Daily</option>
                              <option value="1wk">Weekly</option>
                              <option value="1mo">Monthly</option>
                              <option value="3mo">Quarterly</option>
                            </select>
                          </div>
                          
                          <div className="space-y-3">
                            <label className="block text-green-400 font-mono text-sm">Test Size (%)</label>
                            <input 
                              type="range"
                              name="testSize"
                              value={regressionInput.testSize}
                              min="0"
                              max="0.5"
                              step="0.05"
                              onChange={handleRegressionInputChange}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>0%</span>
                              <span>{(regressionInput.testSize * 100).toFixed(0)}%</span>
                              <span>50%</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3 flex items-center">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                name="addFeatures"
                                checked={regressionInput.addFeatures}
                                onChange={handleRegressionInputChange}
                                className="form-checkbox rounded h-4 w-4 text-green-500 bg-black border-green-800 focus:ring-0"
                              />
                              <span className="ml-2 text-sm text-green-400 font-mono">Add engineered features</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Recent Searches Section */}
                    <div className="mb-6">
                      <h4 className="text-md font-mono text-green-400 border-b border-green-900/50 pb-1 mb-3 flex items-center">
                        <FaClock className="mr-2" /> Recent Searches
                      </h4>
                      
                      {isLoadingSearches ? (
                        <p className="text-gray-400 text-sm">Loading recent searches...</p>
                      ) : recentSearches.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {recentSearches.map(search => (
                            <button
                              key={search.id}
                              onClick={() => loadRecentSearch(search.x_ticker, search.y_ticker)}
                              className="text-left p-2 border border-gray-800 rounded bg-black/20 hover:bg-gray-900/30 transition-colors text-gray-400 text-sm"
                            >
                              <span className="font-mono">{search.x_ticker}</span> vs <span className="font-mono">{search.y_ticker}</span>
                              <span className="text-xs text-gray-500 block">{new Date(search.searched_at).toLocaleString()}</span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm">No recent searches found</p>
                      )}
                    </div>
                    
                    {/* Run Analysis Button */}
                    <div className="space-y-4">
                      <button 
                        onClick={runRegressionAnalysis}
                        disabled={isRunningRegression || !regressionInput.xTicker || !regressionInput.yTicker}
                        className={`flex items-center justify-center px-4 py-3 rounded bg-green-900/40 text-green-400 border border-green-800 hover:bg-green-900/60 transition-all font-mono w-full text-sm ${
                          isRunningRegression || !regressionInput.xTicker || !regressionInput.yTicker 
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }`}
                      >
                        <FaChartLine size={16} className="mr-2" /> 
                        {isRunningRegression ? 'Processing...' : 'Run Analysis'}
                      </button>
                      
                      {regressionError && (
                        <div className="bg-red-900/30 text-red-400 p-3 rounded-md border border-red-800 text-sm">
                          {regressionError}
                        </div>
                      )}
                      
                      {/* Results Preview */}
                      <div className="border border-gray-800 rounded-md p-4 bg-black/50">
                        <h4 className="text-md font-mono text-green-400 border-b border-green-900/50 pb-1 mb-3">Regression Results</h4>
                        
                        {regressionResults ? (
                          <div className="space-y-4">
                            <div className="bg-black/40 p-3 rounded border border-gray-800">
                              <p className="text-green-400 font-mono text-sm mb-2">Analysis Summary</p>
                              <p className="text-gray-300 text-sm whitespace-pre-line">{regressionResults.summary}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-black/40 p-3 rounded border border-gray-800">
                                <p className="text-green-400 font-mono text-sm mb-2">Correlation</p>
                                <p className="text-gray-300 text-sm">Pearson r: <span className="text-green-400">{regressionResults.correlation?.pearson?.r.toFixed(4)}</span></p>
                                <p className="text-gray-300 text-sm">Spearman r: <span className="text-green-400">{regressionResults.correlation?.spearman?.r.toFixed(4)}</span></p>
                                <p className="text-gray-300 text-sm">p-value: <span className="text-green-400">{regressionResults.correlation?.pearson?.["p-value"].toFixed(6)}</span></p>
                              </div>
                              
                              <div className="bg-black/40 p-3 rounded border border-gray-800">
                                <p className="text-green-400 font-mono text-sm mb-2">Model Statistics</p>
                                <p className="text-gray-300 text-sm">Model: <span className="text-green-400">{regressionResults.model_type}</span></p>
                                <p className="text-gray-300 text-sm">Data Points: <span className="text-green-400">{regressionResults.data_points}</span></p>
                                {regressionResults.statistics?.r_squared !== undefined && (
                                  <p className="text-gray-300 text-sm">R²: <span className="text-green-400">{regressionResults.statistics.r_squared.toFixed(4)}</span></p>
                                )}
                                {regressionResults.statistics?.test_metrics?.r2 !== undefined && (
                                  <p className="text-gray-300 text-sm">Test R²: <span className="text-green-400">{regressionResults.statistics.test_metrics.r2.toFixed(4)}</span></p>
                                )}
                              </div>
                            </div>
                            
                            <div className="text-gray-400 text-xs text-right">
                              Analysis date: {new Date(regressionResults.created_at).toLocaleString()}
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-400 text-sm">
                            Enter stock tickers and run analysis to see results.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Open Source Libraries Section */}
            <div className="mb-6 w-full">
              <button 
                onClick={() => toggleSection('opensource')}
                className="w-full bg-green-900/30 hover:bg-green-900/40 border border-green-800/50 text-white py-3 px-4 rounded-md font-mono mb-4 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center">
                  <FaCodeBranch className="mr-2" />
                  <span>Open Source Repositories</span>
                </div>
                <span>{expandedSection === 'opensource' ? '[-]' : '[+]'}</span>
              </button>
              
              {expandedSection === 'opensource' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Project Category Tabs */}
                  <div className="flex flex-wrap justify-start gap-1.5 md:gap-2">
                    {categories.map((category) => (
                      <button 
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={getTabStyle(activeCategory === category.id)}
                      >
                        {activeCategory === category.id ? '>' : '--'} {category.name}
                      </button>
                    ))}
                  </div>
                  
                  {/* Projects Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredProjects.map((project, index) => (
                      <div key={index} 
                        className="bg-black/80 backdrop-blur-sm rounded-md shadow-md border border-gray-700 hover:border-green-600/50 transition-all duration-300 flex flex-col h-full"
                      >
                        {/* Card Header - Terminal Style */}
                        <div className="border-b border-gray-800 px-3 md:px-4 py-2.5 md:py-3 flex justify-between items-start">
                          <div className="flex items-center overflow-hidden">
                            <project.icon size={16} className="text-green-500 mr-2 md:mr-3 flex-shrink-0" />
                            <h3 className="text-sm md:text-base font-mono font-medium text-gray-300 truncate">
                              <span className="card-typing-animation">{project.name}</span>
                            </h3>
                          </div>
                          <span className={`text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm font-mono flex-shrink-0 ml-2 ${
                            project.status === 'Completed' ? 'bg-green-900/30 text-green-500 border border-green-800' :
                            project.status === 'In Progress' ? 'bg-yellow-900/30 text-yellow-500 border border-yellow-800' :
                            project.status === 'Available' ? 'bg-purple-900/30 text-purple-400 border border-purple-800' :
                            'bg-blue-900/30 text-blue-400 border border-blue-800'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 p-3 md:p-4 pb-1 md:pb-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="bg-gray-900 text-gray-400 px-1.5 md:px-2 py-0.5 rounded text-[10px] md:text-xs border border-gray-800 font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        {/* Description - Terminal Style */}
                        <div className="p-3 md:p-4 pt-1 md:pt-2 flex-grow">
                          <p className="text-gray-300 text-xs md:text-sm font-mono leading-relaxed">{project.description}</p>
                        </div>
                        
                        {/* Action Button - Terminal Style */}
                        <div className="p-3 md:p-4 pt-0 border-t border-gray-800">
                          {project.isPublic ? (
                            <a 
                              href={project.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-center px-3 md:px-4 py-2 rounded bg-green-900/40 text-green-400 border border-green-800 hover:bg-green-900/60 transition-all font-mono w-full text-sm"
                            >
                              <FaGithub size={16} className="mr-2" /> git clone
                            </a>
                          ) : (
                            <span className="flex items-center justify-center px-3 md:px-4 py-2 rounded bg-gray-900/40 text-gray-500 border border-gray-800 cursor-not-allowed font-mono w-full text-sm">
                              <FaGithub size={16} className="mr-2" /> coming_soon
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Financial Calculators Section */}
            <div className="mb-6 w-full">
              <button 
                onClick={() => toggleSection('calculators')}
                className="w-full bg-green-900/30 hover:bg-green-900/40 border border-green-800/50 text-white py-3 px-4 rounded-md font-mono mb-4 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center">
                  <FaCalculator className="mr-2" />
                  <span>Financial Calculators</span>
                </div>
                <span>{expandedSection === 'calculators' ? '[-]' : '[+]'}</span>
              </button>
              
              {expandedSection === 'calculators' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Tabs for different calculators */}
                  <div className="flex flex-wrap justify-start gap-1.5 md:gap-2">
                    <button 
                      onClick={() => selectCalculator('mortgage')}
                      className={getTabStyle(selectedCalculator === 'mortgage')}
                    >
                      {selectedCalculator === 'mortgage' ? '>' : '--'} Mortgage Calculator
                    </button>
                    
                    <button 
                      onClick={() => selectCalculator('financialRatios')}
                      className={getTabStyle(selectedCalculator === 'financialRatios')}
                    >
                      {selectedCalculator === 'financialRatios' ? '>' : '--'} Financial Ratios
                    </button>
                  </div>
                  
                  {/* Display selected calculator */}
                  {selectedCalculator === 'mortgage' && <MortgageCalculator />}
                  {selectedCalculator === 'financialRatios' && <FinancialRatioCalculator />}
                  
                  {(!selectedCalculator) && (
                    <div className="bg-black/70 backdrop-blur-sm text-white p-6 rounded-lg shadow-lg">
                      <p className="text-slate-300">Select a calculator from the tabs above</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Financial Libraries Documentation Section */}
            <div className="mb-6 w-full">
              <button 
                onClick={() => toggleSection('libraries')}
                className="w-full bg-green-900/30 hover:bg-green-900/40 border border-green-800/50 text-white py-3 px-4 rounded-md font-mono mb-4 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center">
                  <FaBook className="mr-2" />
                  <span>Python Code Library</span>
                </div>
                <span>{expandedSection === 'libraries' ? '[-]' : '[+]'}</span>
              </button>
              
              {expandedSection === 'libraries' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Tabs for different libraries */}
                  <div className="flex flex-wrap justify-start gap-1.5 md:gap-2">
                    {libraries.map(lib => (
                      <button 
                        key={lib.id}
                        onClick={() => selectLibrary(lib.id as LibraryType)}
                        className={getTabStyle(selectedLibrary === lib.id)}
                      >
                        {selectedLibrary === lib.id ? '>' : '--'} {lib.name}
                      </button>
                    ))}
                  </div>
                  
                  {/* Display selected library documentation */}
                  {selectedLibrary && (
                    <div className="bg-black/70 backdrop-blur-sm text-white p-6 rounded-lg shadow-lg">
                      {libraries.filter(lib => lib.id === selectedLibrary).map(library => (
                        <div key={library.id}>
                          <h3 className="text-xl font-heading text-green-400 mb-3">{library.name} Library</h3>
                          <p className="text-slate-300 mb-6">{library.description}</p>
                          
                          <div className="space-y-4">
                            <h4 className="text-md font-mono text-green-400 border-b border-green-900/50 pb-1">Available Functions</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {library.functions.map((func, idx) => (
                                <div key={idx} className="bg-gray-900/40 p-3 rounded border border-gray-800">
                                  <p className="font-mono text-green-300">{func.name}()</p>
                                  <p className="text-sm text-gray-400 mt-1">{func.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-6 pt-4 border-t border-gray-800">
                            <p className="text-gray-400 text-sm">
                              These functions are available through our Python API. Frontend integration via React components is in progress.
                            </p>
                            <div className="mt-4 flex items-center">
                              <a 
                                href="https://github.com/sojourner-alpha/world-mk1/blob/main/backend/app/finance/README.md" 
                                target="_blank"
                                rel="noopener noreferrer" 
                                className="flex items-center text-gray-400 hover:text-green-400 transition-colors"
                              >
                                <FaGithub size={16} className="mr-2" />
                                <span className="text-sm font-mono">View full documentation on GitHub</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {(!selectedLibrary) && (
                    <div className="bg-black/70 backdrop-blur-sm text-white p-6 rounded-lg shadow-lg">
                      <p className="text-slate-300">Select a library from the tabs above to view documentation</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer - adjust z-index to ensure it stays behind content */}
      <footer className="relative z-0">
        <PageFooter />
      </footer>
    </div>
  );
};

export default Finance; 