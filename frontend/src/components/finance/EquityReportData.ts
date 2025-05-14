import { FaShoppingBag, FaSun } from 'react-icons/fa';

// Types for equity report data
export interface EquityReportData {
  company: {
    name: string;
    ticker: string;
    logo?: string;
    sector: string;
    industry: string;
    description: string;
    icon: any; // React icon component
  };
  rating: {
    recommendation: 'Buy' | 'Hold' | 'Sell' | 'Strong Buy' | 'Strong Sell';
    currentPrice: number;
    targetPrice: number;
    priceDate: string;
    analystConsensus: {
      buy: number;
      hold: number;
      sell: number;
    };
  };
  keyMetrics: {
    marketCap: number;
    peRatio: number;
    forwardPe: number;
    pegRatio: number;
    priceToBook: number;
    evToEbitda: number;
    dividendYield: number;
    beta: number;
    revenueGrowth: number;
    epsGrowth: number;
  };
  fundamentalMetrics: {
    returnOnEquity: number;
    returnOnAssets: number;
    returnOnInvestedCapital: number;
    debtToEquity: number;
    currentRatio: number;
    quickRatio: number;
    grossMargin: number;
    operatingMargin: number;
    netMargin: number;
    assetTurnover: number;
    inventoryTurnover: number;
    receivablesTurnover: number;
    payablesTurnover: number;
    freeCashFlowYield: number;
    interestCoverage: number;
  };
  investmentThesis: string[];
  financialPerformance: {
    quarterlyRevenue: { date: string; value: number }[];
    quarterlyEps: { date: string; value: number }[];
    margins: {
      gross: number;
      operating: number;
      net: number;
    };
    debtToEquity: number;
    quickRatio: number;
    returnOnEquity: number;
    fiveYearData: {
      eps: { year: string; value: number }[];
      sales: { year: string; value: number }[];
      revenuePerEmployee: { year: string; value: number }[];
    };
  };
  technicalAnalysis: {
    priceAction: {
      trend: 'Uptrend' | 'Downtrend' | 'Sideways' | 'Consolidating';
      signal: 'Buy' | 'Sell' | 'Neutral';
      priceVs50dma: number; // percentage
      priceVs200dma: number; // percentage
    };
    supportResistance: {
      support: number[];
      resistance: number[];
    };
    indicators: {
      rsi: number; // 0-100
      macd: {
        value: number;
        signal: number;
        histogram: number;
      };
      bollingerBands: {
        upper: number;
        middle: number;
        lower: number;
      };
    };
    volumeAnalysis: {
      averageDailyVolume: number;
      volumeTrend: 'Increasing' | 'Decreasing' | 'Stable';
      relativeVolume: number; // ratio to average
    };
    technicalCommentary: string[];
  };
  valuationAnalysis: {
    dcfValue: number;
    peers: {
      name: string;
      ticker: string;
      peRatio: number;
      evToEbitda: number;
      priceToBook: number;
    }[];
  };
  businessSegments: {
    name: string;
    revenuePercentage: number;
    growthRate: number;
  }[];
  riskAssessment: {
    businessRisks: { factor: string; impact: 'High' | 'Medium' | 'Low' }[];
    financialRisks: { factor: string; impact: 'High' | 'Medium' | 'Low' }[];
    marketRisks: { factor: string; impact: 'High' | 'Medium' | 'Low' }[];
  };
  industryPosition: {
    marketSharePercentage: number;
    rankInIndustry: number;
    totalCompetitors: number;
    keyCompetitors: string[];
    industryGrowth: number;
  };
  keyTakeaways: string[];
  analystNotes: string;
}

// Updated data for FSLR with latest from FinViz
export const FSLR_DATA: EquityReportData = {
  company: {
    name: 'First Solar, Inc.',
    ticker: 'FSLR',
    sector: 'Technology',
    industry: 'Solar Energy Equipment & Materials',
    description: "First Solar designs and manufactures solar photovoltaic panels, modules, and systems for use in utility-scale development projects. The company's integrated power plant solutions deliver an economically attractive alternative to fossil-fuel electricity generation today.",
    icon: FaSun
  },
  rating: {
    recommendation: 'Buy',
    currentPrice: 191.60,
    targetPrice: 196.78,
    priceDate: new Date().toLocaleDateString(),
    analystConsensus: {
      buy: 18,
      hold: 8,
      sell: 1
    }
  },
  keyMetrics: {
    marketCap: 20550000000, // 20.55B from screenshot
    peRatio: 16.29,
    forwardPe: 8.54,
    pegRatio: 0.52,
    priceToBook: 2.51,
    evToEbitda: 11.76,
    dividendYield: 0,
    beta: 1.51,
    revenueGrowth: 26.79,
    epsGrowth: 31.59
  },
  fundamentalMetrics: {
    returnOnEquity: 16.77,
    returnOnAssets: 11.06,
    returnOnInvestedCapital: 14.70,
    debtToEquity: 0.08,
    currentRatio: 1.93,
    quickRatio: 1.39,
    grossMargin: 43.76,
    operatingMargin: 34.63,
    netMargin: 28.72,
    assetTurnover: 0.52,
    inventoryTurnover: 4.8,
    receivablesTurnover: 6.2,
    payablesTurnover: 5.1,
    freeCashFlowYield: 4.2,
    interestCoverage: 25.3
  },
  investmentThesis: [
    'Industry-leading thin-film technology provides competitive advantage and better performance in harsh conditions',
    'Continued production capacity expansion with new state-of-the-art manufacturing facilities in the U.S. and India',
    'Strong beneficiary of the Inflation Reduction Act (IRA) with significant tax credits for U.S. manufacturing',
    'Robust backlog extending through 2026 provides revenue visibility and stability',
    'Vertically integrated business model insulates from supply chain disruptions affecting competitors'
  ],
  financialPerformance: {
    quarterlyRevenue: [
      { date: '2022-Q2', value: 621 },
      { date: '2022-Q3', value: 629 },
      { date: '2022-Q4', value: 1005 },
      { date: '2023-Q1', value: 548 },
      { date: '2023-Q2', value: 811 }
    ],
    quarterlyEps: [
      { date: '2022-Q2', value: 0.52 },
      { date: '2022-Q3', value: 0.60 },
      { date: '2022-Q4', value: 1.59 },
      { date: '2023-Q1', value: 0.40 },
      { date: '2023-Q2', value: 1.85 }
    ],
    margins: {
      gross: 43.76,
      operating: 34.63, 
      net: 28.72
    },
    debtToEquity: 0.08,
    quickRatio: 1.39,
    returnOnEquity: 16.77,
    fiveYearData: {
      eps: [
        { year: '2020', value: 3.73 },
        { year: '2021', value: 4.38 },
        { year: '2022', value: 5.65 },
        { year: '2023', value: 7.74 },
        { year: '2024E', value: 12.02 }
      ],
      sales: [
        { year: '2020', value: 2711 },
        { year: '2021', value: 2923 },
        { year: '2022', value: 2620 },
        { year: '2023', value: 3330 },
        { year: '2024E', value: 4210 }
      ],
      revenuePerEmployee: [
        { year: '2020', value: 492000 },
        { year: '2021', value: 506000 },
        { year: '2022', value: 525000 },
        { year: '2023', value: 550000 },
        { year: '2024E', value: 580000 }
      ]
    }
  },
  technicalAnalysis: {
    priceAction: {
      trend: 'Uptrend',
      signal: 'Buy',
      priceVs50dma: 44.77, // SMA50 from screenshot
      priceVs200dma: 4.92 // SMA200 from screenshot
    },
    supportResistance: {
      support: [175.5, 165.5, 158.2],
      resistance: [200.0, 210.0, 225.0]
    },
    indicators: {
      rsi: 78.16, // RSI value from screenshot
      macd: {
        value: 3.85,
        signal: 2.12,
        histogram: 1.73
      },
      bollingerBands: {
        upper: 205.0,
        middle: 185.0,
        lower: 165.0
      }
    },
    volumeAnalysis: {
      averageDailyVolume: 20211151, // Volume from screenshot
      volumeTrend: 'Increasing',
      relativeVolume: 1.25
    },
    technicalCommentary: [
      "FSLR is trading in a strong uptrend, with price significantly above both the 50-day (44.77%) and 200-day (4.92%) moving averages.",
      "RSI reading of 78.16 indicates overbought conditions, suggesting potential for a short-term pullback.",
      "Technical indicators show bullish momentum with the stock up 22.66% from recent lows.",
      "MACD remains positive with histogram expanding, signaling continued buying pressure.",
      "Key resistance at $200 should be watched as a breakout point for continued upside."
    ]
  },
  valuationAnalysis: {
    dcfValue: 225.80,
    peers: [
      { name: 'Canadian Solar', ticker: 'CSIQ', peRatio: 5.8, evToEbitda: 6.2, priceToBook: 0.8 },
      { name: 'SunPower', ticker: 'SPWR', peRatio: 26.4, evToEbitda: 14.8, priceToBook: 3.5 },
      { name: 'Enphase Energy', ticker: 'ENPH', peRatio: 34.2, evToEbitda: 22.5, priceToBook: 12.8 },
      { name: 'JinkoSolar', ticker: 'JKS', peRatio: 3.5, evToEbitda: 5.8, priceToBook: 0.5 }
    ]
  },
  businessSegments: [
    { name: 'Modules', revenuePercentage: 85, growthRate: 32 },
    { name: 'Systems', revenuePercentage: 15, growthRate: 14 }
  ],
  riskAssessment: {
    businessRisks: [
      { factor: 'Technology obsolescence risk', impact: 'Medium' },
      { factor: 'Manufacturing scale-up execution', impact: 'Medium' },
      { factor: 'Competition from Chinese manufacturers', impact: 'High' }
    ],
    financialRisks: [
      { factor: 'Input cost inflation', impact: 'Medium' },
      { factor: 'Capital expenditure overruns', impact: 'Low' },
      { factor: 'Foreign exchange exposure', impact: 'Low' }
    ],
    marketRisks: [
      { factor: 'Government incentive changes', impact: 'High' },
      { factor: 'Energy price volatility', impact: 'Medium' },
      { factor: 'Interest rate sensitivity', impact: 'Medium' }
    ]
  },
  industryPosition: {
    marketSharePercentage: 8.3,
    rankInIndustry: 3,
    totalCompetitors: 15,
    keyCompetitors: ['JinkoSolar', 'Trina Solar', 'Canadian Solar', 'LONGi Green Energy'],
    industryGrowth: 14.5
  },
  keyTakeaways: [
    'First Solar represents a high-quality exposure to the growing solar industry with technology differentiation',
    'Strong balance sheet and manufacturing expansion position the company for substantial growth',
    'Favorable policy environment and shift to renewable energy provide multi-year tailwinds',
    'Technical indicators suggest strong momentum but watch for short-term overbought conditions'
  ],
  analystNotes: "As a CFA analyst, FSLR shows strong fundamental metrics with industry-leading margins (43.76% gross, 34.63% operating). With a forward P/E of 8.54 compared to the current 16.29, the market anticipates significant earnings growth. The company's robust ROE of 16.77% and minimal debt (D/E ratio of 0.08) position it well for the planned capacity expansion. IRA tax credits substantially improve investment economics for new manufacturing facilities, supporting the bullish outlook."
};

// Placeholder data for SHOP
export const SHOP_DATA: EquityReportData = {
  company: {
    name: 'Shopify Inc.',
    ticker: 'SHOP',
    sector: 'Technology',
    industry: 'Software - Application',
    description: "Shopify is a leading global commerce company, providing trusted tools to start, grow, market, and manage a retail business of any size. The platform offers merchants omnichannel commerce solutions to build and customize online stores.",
    icon: FaShoppingBag
  },
  rating: {
    recommendation: 'Hold',
    currentPrice: 76.42,
    targetPrice: 85.00,
    priceDate: new Date().toLocaleDateString(),
    analystConsensus: {
      buy: 15,
      hold: 12,
      sell: 3
    }
  },
  keyMetrics: {
    marketCap: 98000000000,
    peRatio: 75.5,
    forwardPe: 65.2,
    pegRatio: 2.1,
    priceToBook: 8.2,
    evToEbitda: 98.7,
    dividendYield: 0,
    beta: 1.82,
    revenueGrowth: 25.2,
    epsGrowth: 32.1
  },
  fundamentalMetrics: {
    returnOnEquity: 9.8,
    returnOnAssets: 5.5,
    returnOnInvestedCapital: 8.7,
    debtToEquity: 0.12,
    currentRatio: 3.2,
    quickRatio: 3.0,
    grossMargin: 49.5,
    operatingMargin: 7.2,
    netMargin: 6.8,
    assetTurnover: 0.65,
    inventoryTurnover: 0,
    receivablesTurnover: 13.2,
    payablesTurnover: 5.8,
    freeCashFlowYield: 1.2,
    interestCoverage: 15.8
  },
  investmentThesis: [
    'Market leader in e-commerce platform solutions with strong brand recognition',
    'Expanding ecosystem of merchant services including payments, fulfillment, and capital',
    'Continued growth in merchant base across diverse business sizes and geographies',
    'Strategic acquisitions and partnerships enhance platform value proposition',
    'Strong adoption of Shop Pay and other higher-margin service offerings'
  ],
  financialPerformance: {
    quarterlyRevenue: [
      { date: '2022-Q2', value: 1250 },
      { date: '2022-Q3', value: 1366 },
      { date: '2022-Q4', value: 1735 },
      { date: '2023-Q1', value: 1510 },
      { date: '2023-Q2', value: 1689 }
    ],
    quarterlyEps: [
      { date: '2022-Q2', value: 0.03 },
      { date: '2022-Q3', value: -0.02 },
      { date: '2022-Q4', value: 0.07 },
      { date: '2023-Q1', value: 0.05 },
      { date: '2023-Q2', value: 0.14 }
    ],
    margins: {
      gross: 49.5,
      operating: 7.2,
      net: 6.8
    },
    debtToEquity: 0.12,
    quickRatio: 3.0,
    returnOnEquity: 9.8,
    fiveYearData: {
      eps: [
        { year: '2019', value: 0.30 },
        { year: '2020', value: 1.24 },
        { year: '2021', value: 0.64 },
        { year: '2022', value: 0.05 },
        { year: '2023E', value: 0.37 }
      ],
      sales: [
        { year: '2019', value: 1578 },
        { year: '2020', value: 2929 },
        { year: '2021', value: 4612 },
        { year: '2022', value: 5600 },
        { year: '2023E', value: 6900 }
      ],
      revenuePerEmployee: [
        { year: '2019', value: 350000 },
        { year: '2020', value: 420000 },
        { year: '2021', value: 480000 },
        { year: '2022', value: 410000 },
        { year: '2023E', value: 450000 }
      ]
    }
  },
  technicalAnalysis: {
    priceAction: {
      trend: 'Sideways',
      signal: 'Neutral',
      priceVs50dma: 2.5,
      priceVs200dma: -5.8
    },
    supportResistance: {
      support: [70.0, 65.0, 60.0],
      resistance: [80.0, 85.0, 90.0]
    },
    indicators: {
      rsi: 52.5,
      macd: {
        value: 0.25,
        signal: 0.12,
        histogram: 0.13
      },
      bollingerBands: {
        upper: 84.0,
        middle: 75.0,
        lower: 66.0
      }
    },
    volumeAnalysis: {
      averageDailyVolume: 15000000,
      volumeTrend: 'Stable',
      relativeVolume: 0.95
    },
    technicalCommentary: [
      "SHOP is consolidating in a sideways pattern between support at $70 and resistance at $80.",
      "RSI reading of 52.5 indicates neutral momentum with no clear directional bias.",
      "Volume has been average, suggesting a lack of strong conviction from either buyers or sellers.",
      "The stock is slightly above its 50-day moving average but remains below the 200-day moving average.",
      "Watch for a break above $80 with increasing volume as a potential bullish signal."
    ]
  },
  valuationAnalysis: {
    dcfValue: 83.50,
    peers: [
      { name: 'Wix.com', ticker: 'WIX', peRatio: 80.2, evToEbitda: 32.5, priceToBook: 10.2 },
      { name: 'BigCommerce', ticker: 'BIGC', peRatio: 0, evToEbitda: 0, priceToBook: 4.5 },
      { name: 'Adobe', ticker: 'ADBE', peRatio: 44.5, evToEbitda: 26.8, priceToBook: 15.2 },
      { name: 'Squarespace', ticker: 'SQSP', peRatio: 180.2, evToEbitda: 39.5, priceToBook: 12.8 }
    ]
  },
  businessSegments: [
    { name: 'Subscription Solutions', revenuePercentage: 28, growthRate: 12 },
    { name: 'Merchant Solutions', revenuePercentage: 72, growthRate: 31 }
  ],
  riskAssessment: {
    businessRisks: [
      { factor: 'Intensifying competition in e-commerce platforms', impact: 'High' },
      { factor: 'Reliance on SMB customers susceptible to economic downturns', impact: 'High' },
      { factor: 'Customer concentration risk', impact: 'Medium' }
    ],
    financialRisks: [
      { factor: 'High valuation multiple sensitivity', impact: 'High' },
      { factor: 'Currency exposure from international operations', impact: 'Medium' },
      { factor: 'Investments in fulfillment network may compress margins', impact: 'Medium' }
    ],
    marketRisks: [
      { factor: 'E-commerce growth normalization post-pandemic', impact: 'Medium' },
      { factor: 'Rising customer acquisition costs', impact: 'Medium' },
      { factor: 'Regulatory changes affecting e-commerce', impact: 'Low' }
    ]
  },
  industryPosition: {
    marketSharePercentage: 10.4,
    rankInIndustry: 2,
    totalCompetitors: 12,
    keyCompetitors: ['WooCommerce', 'Magento', 'BigCommerce', 'Wix'],
    industryGrowth: 17.2
  },
  keyTakeaways: [
    'Shopify maintains leadership position in e-commerce platform market with expanding service offerings',
    'Transition to profitability following post-pandemic adjustment is progressing',
    'High valuation requires continued strong growth execution',
    'Technical picture suggests consolidation phase with potential for breakout on improving fundamentals'
  ],
  analystNotes: "Shopify's transition to profitable growth remains the key investment consideration. After the post-pandemic e-commerce normalization, the company has right-sized operations and is focusing on higher-margin merchant services. While the valuation remains elevated, the company's leadership position and expansion into fulfillment services provide multiple growth vectors. Investors should monitor gross merchandise volume growth as a leading indicator of platform health."
};

// Export array of available reports
export const AVAILABLE_REPORTS = [
  { ...FSLR_DATA.company, id: 'FSLR' },
  { ...SHOP_DATA.company, id: 'SHOP' },
];

// Function to get report data by ticker
export const getReportByTicker = (ticker: string): EquityReportData => {
  switch (ticker) {
    case 'FSLR':
      return FSLR_DATA;
    case 'SHOP':
      return SHOP_DATA;
    default:
      return FSLR_DATA; // Default to FSLR if ticker not found
  }
}; 