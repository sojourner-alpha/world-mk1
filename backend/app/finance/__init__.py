"""
Financial analysis library for CFA-level calculations and models.
This package provides modular financial analysis tools organized by category.
"""

# Check if modules exist before importing
try:
    from . import fundamentals
    from . import technical
    from . import portfolio
    from . import valuation
    from . import risk
    from . import regression
except ImportError as e:
    # Handle missing modules gracefully
    import warnings
    warnings.warn(f"Some finance modules could not be imported: {e}")

# Export all modules
__all__ = [
    'fundamentals',
    'technical',
    'valuation',
    'portfolio',
    'risk',
    'regression',
] 