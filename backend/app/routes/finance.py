from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import numpy as np
import numpy_financial as npf

router = APIRouter()

# ---- Models for Financial Calculations ----

class DiscountedCashFlowInput(BaseModel):
    cash_flows: List[float]
    discount_rate: float
    periods: Optional[List[int]] = None

class PortfolioOptimizationInput(BaseModel):
    returns: List[float]
    volatilities: List[float]
    correlations: List[List[float]]
    risk_free_rate: Optional[float] = 0.0

class MortgageCalculatorInput(BaseModel):
    principal: float
    annual_interest_rate: float
    years: int
    monthly_payment: Optional[float] = None
    additional_payment: Optional[float] = 0

# ---- API Routes ----

@router.post("/npv")
async def calculate_npv(input_data: DiscountedCashFlowInput):
    """
    Calculate Net Present Value (NPV) of cash flows
    """
    try:
        # If periods not provided, assume consecutive periods
        if input_data.periods is None:
            input_data.periods = list(range(len(input_data.cash_flows)))
        
        # Validation
        if len(input_data.cash_flows) != len(input_data.periods):
            raise HTTPException(status_code=400, detail="Cash flows and periods must have the same length")
        
        # Calculate NPV
        npv = 0
        for i, cf in enumerate(input_data.cash_flows):
            period = input_data.periods[i]
            npv += cf / ((1 + input_data.discount_rate) ** period)
            
        return {
            "npv": npv,
            "input": input_data.dict()
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/irr")
async def calculate_irr(input_data: DiscountedCashFlowInput):
    """
    Calculate Internal Rate of Return (IRR) for cash flows
    """
    try:
        # Validation
        if len(input_data.cash_flows) < 2:
            raise HTTPException(status_code=400, detail="Need at least two cash flows to calculate IRR")
        
        # Calculate IRR using numpy_financial
        irr = np.irr(input_data.cash_flows)
        
        return {
            "irr": float(irr),
            "input": input_data.dict()
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/mortgage-calculator")
async def mortgage_calculator(input_data: MortgageCalculatorInput):
    """
    Calculate mortgage payment details
    """
    try:
        # Convert annual to monthly interest rate
        monthly_rate = input_data.annual_interest_rate / 12 / 100
        total_periods = input_data.years * 12
        
        # Calculate monthly payment if not provided
        monthly_payment = input_data.monthly_payment
        if monthly_payment is None:
            monthly_payment = input_data.principal * (monthly_rate * (1 + monthly_rate) ** total_periods) / ((1 + monthly_rate) ** total_periods - 1)
        
        # Create amortization schedule
        remaining_balance = input_data.principal
        schedule = []
        total_interest = 0
        
        for period in range(1, total_periods + 1):
            interest_payment = remaining_balance * monthly_rate
            principal_payment = monthly_payment - interest_payment + input_data.additional_payment
            
            total_interest += interest_payment
            remaining_balance -= principal_payment
            
            if remaining_balance < 0:
                principal_payment += remaining_balance  # Adjust final payment
                remaining_balance = 0
            
            schedule.append({
                "period": period,
                "payment": monthly_payment + input_data.additional_payment,
                "principal": principal_payment,
                "interest": interest_payment,
                "remaining_balance": remaining_balance
            })
            
            if remaining_balance <= 0:
                break
        
        return {
            "monthly_payment": monthly_payment,
            "total_payments": sum(payment["payment"] for payment in schedule),
            "total_interest": total_interest,
            "total_periods": len(schedule),
            "years_to_payoff": len(schedule) / 12,
            "schedule": schedule[:12]  # Return first year only to avoid large responses
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) 