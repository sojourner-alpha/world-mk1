"""
Technical analysis module for financial calculations.
Contains functions for calculating technical indicators and identifying patterns.
"""
import numpy as np
import pandas as pd
from typing import Dict, List, Union, Optional, Tuple

# ----- Moving Averages -----

def simple_moving_average(prices: np.ndarray, window: int) -> np.ndarray:
    """
    Calculate Simple Moving Average (SMA)
    
    Args:
        prices: Array of price data
        window: Window size for moving average
        
    Returns:
        np.ndarray: Simple moving average values
    """
    if len(prices) < window:
        raise ValueError(f"Price series length ({len(prices)}) is less than window size ({window})")
    
    sma = np.full_like(prices, np.nan)
    
    for i in range(window - 1, len(prices)):
        sma[i] = np.mean(prices[i - window + 1:i + 1])
    
    return sma

def exponential_moving_average(prices: np.ndarray, window: int, alpha: Optional[float] = None) -> np.ndarray:
    """
    Calculate Exponential Moving Average (EMA)
    
    Args:
        prices: Array of price data
        window: Window size for moving average
        alpha: Smoothing factor (if None, calculated as 2/(window+1))
        
    Returns:
        np.ndarray: Exponential moving average values
    """
    if len(prices) < window:
        raise ValueError(f"Price series length ({len(prices)}) is less than window size ({window})")
    
    if alpha is None:
        alpha = 2 / (window + 1)
    
    ema = np.full_like(prices, np.nan)
    ema[window - 1] = np.mean(prices[:window])  # Initialize with SMA
    
    for i in range(window, len(prices)):
        ema[i] = alpha * prices[i] + (1 - alpha) * ema[i - 1]
    
    return ema

def weighted_moving_average(prices: np.ndarray, window: int) -> np.ndarray:
    """
    Calculate Weighted Moving Average (WMA)
    
    Args:
        prices: Array of price data
        window: Window size for moving average
        
    Returns:
        np.ndarray: Weighted moving average values
    """
    if len(prices) < window:
        raise ValueError(f"Price series length ({len(prices)}) is less than window size ({window})")
    
    # Create weights (linear, higher weight for more recent prices)
    weights = np.arange(1, window + 1)
    weights_sum = np.sum(weights)
    
    wma = np.full_like(prices, np.nan)
    
    for i in range(window - 1, len(prices)):
        wma[i] = np.sum(prices[i - window + 1:i + 1] * weights) / weights_sum
    
    return wma

# ----- Oscillators and Momentum Indicators -----

def relative_strength_index(prices: np.ndarray, window: int = 14) -> np.ndarray:
    """
    Calculate Relative Strength Index (RSI)
    
    Args:
        prices: Array of price data
        window: Window size for RSI calculation
        
    Returns:
        np.ndarray: RSI values
    """
    if len(prices) < window + 1:
        raise ValueError(f"Price series length ({len(prices)}) is less than window size + 1 ({window + 1})")
    
    # Calculate price changes
    delta = np.diff(prices)
    
    # Separate gains and losses
    gains = np.maximum(delta, 0)
    losses = np.abs(np.minimum(delta, 0))
    
    # Initialize arrays
    avg_gain = np.full_like(prices, np.nan)
    avg_loss = np.full_like(prices, np.nan)
    rs = np.full_like(prices, np.nan)
    rsi = np.full_like(prices, np.nan)
    
    # First average gain and loss
    avg_gain[window] = np.mean(gains[:window])
    avg_loss[window] = np.mean(losses[:window])
    
    # Calculate subsequent values
    for i in range(window + 1, len(prices)):
        avg_gain[i] = (avg_gain[i - 1] * (window - 1) + gains[i - 1]) / window
        avg_loss[i] = (avg_loss[i - 1] * (window - 1) + losses[i - 1]) / window
        
        if avg_loss[i] == 0:
            rsi[i] = 100.0
        else:
            rs[i] = avg_gain[i] / avg_loss[i]
            rsi[i] = 100 - (100 / (1 + rs[i]))
    
    return rsi

def moving_average_convergence_divergence(
    prices: np.ndarray, 
    fast_period: int = 12, 
    slow_period: int = 26, 
    signal_period: int = 9
) -> Dict[str, np.ndarray]:
    """
    Calculate Moving Average Convergence Divergence (MACD)
    
    Args:
        prices: Array of price data
        fast_period: Fast EMA period
        slow_period: Slow EMA period
        signal_period: Signal line EMA period
        
    Returns:
        Dict: MACD line, signal line, and histogram
    """
    # Calculate EMAs
    fast_ema = exponential_moving_average(prices, fast_period)
    slow_ema = exponential_moving_average(prices, slow_period)
    
    # Calculate MACD line
    macd_line = fast_ema - slow_ema
    
    # Calculate signal line
    signal_line = exponential_moving_average(macd_line, signal_period)
    
    # Calculate histogram
    histogram = macd_line - signal_line
    
    return {
        "macd_line": macd_line,
        "signal_line": signal_line,
        "histogram": histogram
    }

def stochastic_oscillator(
    high_prices: np.ndarray, 
    low_prices: np.ndarray, 
    close_prices: np.ndarray, 
    k_period: int = 14, 
    d_period: int = 3
) -> Dict[str, np.ndarray]:
    """
    Calculate Stochastic Oscillator
    
    Args:
        high_prices: Array of high prices
        low_prices: Array of low prices
        close_prices: Array of closing prices
        k_period: K period
        d_period: D period
        
    Returns:
        Dict: %K and %D values
    """
    if len(close_prices) < k_period:
        raise ValueError(f"Price series length ({len(close_prices)}) is less than K period ({k_period})")
    
    # Initialize arrays
    k_values = np.full_like(close_prices, np.nan)
    
    # Calculate %K
    for i in range(k_period - 1, len(close_prices)):
        window_low = np.min(low_prices[i - k_period + 1:i + 1])
        window_high = np.max(high_prices[i - k_period + 1:i + 1])
        
        if window_high - window_low == 0:
            k_values[i] = 50.0  # Default if range is zero
        else:
            k_values[i] = 100.0 * (close_prices[i] - window_low) / (window_high - window_low)
    
    # Calculate %D (SMA of %K)
    d_values = simple_moving_average(k_values, d_period)
    
    return {
        "k_values": k_values,
        "d_values": d_values
    }

def bollinger_bands(
    prices: np.ndarray, 
    window: int = 20, 
    num_std: float = 2.0
) -> Dict[str, np.ndarray]:
    """
    Calculate Bollinger Bands
    
    Args:
        prices: Array of price data
        window: Window size for moving average
        num_std: Number of standard deviations for bands
        
    Returns:
        Dict: Middle band, upper band, and lower band
    """
    if len(prices) < window:
        raise ValueError(f"Price series length ({len(prices)}) is less than window size ({window})")
    
    # Middle band (SMA)
    middle_band = simple_moving_average(prices, window)
    
    # Calculate standard deviation
    rolling_std = np.full_like(prices, np.nan)
    
    for i in range(window - 1, len(prices)):
        rolling_std[i] = np.std(prices[i - window + 1:i + 1])
    
    # Calculate upper and lower bands
    upper_band = middle_band + (rolling_std * num_std)
    lower_band = middle_band - (rolling_std * num_std)
    
    # Calculate bandwidth
    bandwidth = (upper_band - lower_band) / middle_band
    
    # Calculate %B
    percent_b = np.full_like(prices, np.nan)
    valid_idx = ~np.isnan(upper_band) & ~np.isnan(lower_band) & (upper_band != lower_band)
    percent_b[valid_idx] = (prices[valid_idx] - lower_band[valid_idx]) / (upper_band[valid_idx] - lower_band[valid_idx])
    
    return {
        "middle_band": middle_band,
        "upper_band": upper_band,
        "lower_band": lower_band,
        "bandwidth": bandwidth,
        "percent_b": percent_b
    }

# ----- Volume Indicators -----

def on_balance_volume(close_prices: np.ndarray, volume: np.ndarray) -> np.ndarray:
    """
    Calculate On-Balance Volume (OBV)
    
    Args:
        close_prices: Array of closing prices
        volume: Array of volume data
        
    Returns:
        np.ndarray: OBV values
    """
    if len(close_prices) != len(volume):
        raise ValueError("Close prices and volume arrays must have the same length")
    
    obv = np.zeros_like(close_prices)
    
    for i in range(1, len(close_prices)):
        if close_prices[i] > close_prices[i - 1]:
            obv[i] = obv[i - 1] + volume[i]
        elif close_prices[i] < close_prices[i - 1]:
            obv[i] = obv[i - 1] - volume[i]
        else:
            obv[i] = obv[i - 1]
    
    return obv

def accumulation_distribution_line(
    high_prices: np.ndarray,
    low_prices: np.ndarray,
    close_prices: np.ndarray,
    volume: np.ndarray
) -> np.ndarray:
    """
    Calculate Accumulation/Distribution Line
    
    Args:
        high_prices: Array of high prices
        low_prices: Array of low prices
        close_prices: Array of closing prices
        volume: Array of volume data
        
    Returns:
        np.ndarray: A/D Line values
    """
    if not (len(high_prices) == len(low_prices) == len(close_prices) == len(volume)):
        raise ValueError("All arrays must have the same length")
    
    # Money Flow Multiplier
    mfm = np.zeros_like(close_prices)
    
    for i in range(len(close_prices)):
        if high_prices[i] == low_prices[i]:
            mfm[i] = 0
        else:
            mfm[i] = ((close_prices[i] - low_prices[i]) - (high_prices[i] - close_prices[i])) / (high_prices[i] - low_prices[i])
    
    # Money Flow Volume
    mfv = mfm * volume
    
    # A/D Line
    ad_line = np.zeros_like(close_prices)
    ad_line[0] = mfv[0]
    
    for i in range(1, len(close_prices)):
        ad_line[i] = ad_line[i - 1] + mfv[i]
    
    return ad_line

# ----- Trend Indicators -----

def average_directional_index(
    high_prices: np.ndarray,
    low_prices: np.ndarray,
    close_prices: np.ndarray,
    window: int = 14
) -> Dict[str, np.ndarray]:
    """
    Calculate Average Directional Index (ADX)
    
    Args:
        high_prices: Array of high prices
        low_prices: Array of low prices
        close_prices: Array of closing prices
        window: Window size for calculations
        
    Returns:
        Dict: ADX, +DI, and -DI values
    """
    if not (len(high_prices) == len(low_prices) == len(close_prices)):
        raise ValueError("All price arrays must have the same length")
    
    if len(close_prices) < window + 1:
        raise ValueError(f"Price series length ({len(close_prices)}) is less than window size + 1 ({window + 1})")
    
    # Initialize arrays
    tr = np.zeros_like(close_prices)
    plus_dm = np.zeros_like(close_prices)
    minus_dm = np.zeros_like(close_prices)
    
    # Calculate True Range (TR), +DM, and -DM
    for i in range(1, len(close_prices)):
        # True Range
        tr[i] = max(
            high_prices[i] - low_prices[i],
            abs(high_prices[i] - close_prices[i - 1]),
            abs(low_prices[i] - close_prices[i - 1])
        )
        
        # Directional Movement
        up_move = high_prices[i] - high_prices[i - 1]
        down_move = low_prices[i - 1] - low_prices[i]
        
        if up_move > down_move and up_move > 0:
            plus_dm[i] = up_move
        else:
            plus_dm[i] = 0
        
        if down_move > up_move and down_move > 0:
            minus_dm[i] = down_move
        else:
            minus_dm[i] = 0
    
    # Calculate smoothed values
    atr = exponential_moving_average(tr, window)
    plus_di = np.zeros_like(close_prices)
    minus_di = np.zeros_like(close_prices)
    
    # Calculate +DI and -DI
    valid_idx = ~np.isnan(atr) & (atr != 0)
    plus_di[valid_idx] = 100 * exponential_moving_average(plus_dm, window)[valid_idx] / atr[valid_idx]
    minus_di[valid_idx] = 100 * exponential_moving_average(minus_dm, window)[valid_idx] / atr[valid_idx]
    
    # Calculate DX
    dx = np.zeros_like(close_prices)
    valid_idx = (plus_di + minus_di != 0)
    dx[valid_idx] = 100 * np.abs(plus_di[valid_idx] - minus_di[valid_idx]) / (plus_di[valid_idx] + minus_di[valid_idx])
    
    # Calculate ADX
    adx = exponential_moving_average(dx, window)
    
    return {
        "adx": adx,
        "plus_di": plus_di,
        "minus_di": minus_di
    } 