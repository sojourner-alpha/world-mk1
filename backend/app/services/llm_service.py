"""
LLM Service for integrating with external LLM models
"""
import os
import json
import httpx
from typing import Dict, Any, List, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LLMService:
    """Service for interacting with LLM models for financial analysis"""
    
    # Default model configurations
    DEFAULT_MODEL = "gpt-3.5-turbo"
    DEFAULT_TEMPERATURE = 0.2
    
    @staticmethod
    async def summarize_regression_analysis(
        analysis_results: Dict[str, Any],
        model: str = DEFAULT_MODEL,
        temperature: float = DEFAULT_TEMPERATURE,
        max_tokens: int = 250
    ) -> str:
        """
        Generate a concise summary of regression analysis results using an LLM
        
        Args:
            analysis_results: The regression analysis results dictionary
            model: The LLM model to use
            temperature: The temperature for generation (0-1)
            max_tokens: Maximum tokens in the response
            
        Returns:
            A summarized text of the regression analysis
        """
        try:
            # Extract key information from analysis results
            model_type = analysis_results.get("model_type", "regression")
            statistics = analysis_results.get("statistics", {})
            correlation = analysis_results.get("correlation", {})
            x_ticker = analysis_results.get("x_ticker", "")
            y_ticker = analysis_results.get("y_ticker", "")
            
            # Create a summary prompt
            prompt = f"""
            Summarize the following regression analysis between {x_ticker} and {y_ticker} stocks:
            
            Model type: {model_type}
            
            Key statistics:
            - R-squared: {statistics.get('r_squared', 'N/A')}
            - Adjusted R-squared: {statistics.get('adjusted_r_squared', 'N/A')}
            - P-value: {statistics.get('f_pvalue', 'N/A')}
            
            Correlation:
            - Pearson correlation: {correlation.get('pearson', {}).get('r', 'N/A')}
            - Spearman correlation: {correlation.get('spearman', {}).get('r', 'N/A')}
            
            Provide a 2-3 sentence summary of what this means for investors considering these stocks.
            Focus on the strength of the relationship and statistical significance.
            """
            
            # Call the LLM API (implementation would depend on the specific LLM provider)
            # This is a placeholder - replace with actual API call
            summary = await LLMService._call_llm_api(prompt, model, temperature, max_tokens)
            
            return summary.strip()
        
        except Exception as e:
            logger.error(f"Error generating regression summary: {e}")
            return "Unable to generate summary due to an error."
    
    @staticmethod
    async def generate_investment_insights(
        analysis_results: Dict[str, Any],
        additional_context: Optional[str] = None,
        model: str = DEFAULT_MODEL,
        temperature: float = DEFAULT_TEMPERATURE,
        max_tokens: int = 350
    ) -> Dict[str, str]:
        """
        Generate investment insights based on regression analysis
        
        Args:
            analysis_results: The regression analysis results dictionary
            additional_context: Additional context or questions from the user
            model: The LLM model to use
            temperature: The temperature for generation (0-1)
            max_tokens: Maximum tokens in the response
            
        Returns:
            Dictionary with different insight categories
        """
        try:
            # Extract key information
            x_ticker = analysis_results.get("x_ticker", "")
            y_ticker = analysis_results.get("y_ticker", "")
            statistics = analysis_results.get("statistics", {})
            r_squared = statistics.get("r_squared", 0)
            
            # Context for the prompt
            prompt = f"""
            Based on regression analysis between {x_ticker} (independent) and {y_ticker} (dependent) stocks:
            
            R-squared: {r_squared}
            Model type: {analysis_results.get("model_type", "regression")}
            
            Generate three concise insights:
            1. Risk implications
            2. Portfolio diversification perspective
            3. Trading strategy considerations
            
            {additional_context or ""}
            
            Format your response as a JSON object with keys: "risk", "diversification", "strategy"
            """
            
            # Call the LLM API
            insights_text = await LLMService._call_llm_api(prompt, model, temperature, max_tokens)
            
            # Parse the JSON response
            try:
                insights = json.loads(insights_text)
            except json.JSONDecodeError:
                # Fallback if response isn't proper JSON
                logger.warning("LLM response wasn't valid JSON, using text extraction")
                insights = {
                    "risk": LLMService._extract_section(insights_text, "Risk implications"),
                    "diversification": LLMService._extract_section(insights_text, "Portfolio diversification"),
                    "strategy": LLMService._extract_section(insights_text, "Trading strategy")
                }
            
            return insights
        
        except Exception as e:
            logger.error(f"Error generating investment insights: {e}")
            return {
                "risk": "Unable to generate risk insights.",
                "diversification": "Unable to generate diversification insights.",
                "strategy": "Unable to generate strategy insights."
            }
    
    @staticmethod
    async def _call_llm_api(
        prompt: str,
        model: str = DEFAULT_MODEL,
        temperature: float = DEFAULT_TEMPERATURE,
        max_tokens: int = 250
    ) -> str:
        """
        Call the LLM API with the given prompt
        
        Args:
            prompt: The text prompt for the LLM
            model: The LLM model to use
            temperature: The temperature parameter (0-1)
            max_tokens: Maximum tokens in the response
            
        Returns:
            The LLM response text
        
        Notes:
            This is a placeholder implementation. Replace with your actual LLM API integration.
            Currently supports OpenAI and Anthropic formats, but can be adapted for others.
        """
        # Get API key and provider from environment
        api_key = os.environ.get("LLM_API_KEY")
        provider = os.environ.get("LLM_PROVIDER", "openai").lower()
        
        if not api_key:
            logger.warning("No LLM API key found in environment, using mock response")
            return f"This is a mock LLM response. In production, we would analyze {prompt[:50]}..."
        
        # Handle different LLM providers
        if provider == "openai":
            return await LLMService._call_openai(prompt, model, temperature, max_tokens, api_key)
        elif provider == "anthropic":
            return await LLMService._call_anthropic(prompt, model, temperature, max_tokens, api_key)
        else:
            logger.warning(f"Unsupported LLM provider: {provider}, using mock response")
            return f"Unsupported LLM provider: {provider}. Using mock response for: {prompt[:50]}..."
    
    @staticmethod
    async def _call_openai(
        prompt: str,
        model: str,
        temperature: float,
        max_tokens: int,
        api_key: str
    ) -> str:
        """Call OpenAI API"""
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": model,
                        "messages": [{"role": "user", "content": prompt}],
                        "temperature": temperature,
                        "max_tokens": max_tokens
                    }
                )
                
                if response.status_code == 200:
                    result = response.json()
                    return result["choices"][0]["message"]["content"]
                else:
                    logger.error(f"OpenAI API error: {response.status_code} - {response.text}")
                    return f"Error calling OpenAI API: {response.status_code}"
        
        except Exception as e:
            logger.error(f"Error calling OpenAI API: {e}")
            return f"Error: {str(e)}"

    @staticmethod
    async def _call_anthropic(
        prompt: str,
        model: str,
        temperature: float,
        max_tokens: int,
        api_key: str
    ) -> str:
        """Call Anthropic API"""
        try:
            # Map OpenAI model names to Anthropic if needed
            if model.startswith("gpt"):
                model = "claude-2"
                
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    "https://api.anthropic.com/v1/complete",
                    headers={
                        "x-api-key": api_key,
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": model,
                        "prompt": f"\n\nHuman: {prompt}\n\nAssistant:",
                        "max_tokens_to_sample": max_tokens,
                        "temperature": temperature
                    }
                )
                
                if response.status_code == 200:
                    result = response.json()
                    return result["completion"]
                else:
                    logger.error(f"Anthropic API error: {response.status_code} - {response.text}")
                    return f"Error calling Anthropic API: {response.status_code}"
        
        except Exception as e:
            logger.error(f"Error calling Anthropic API: {e}")
            return f"Error: {str(e)}"
    
    @staticmethod
    def _extract_section(text: str, section_name: str) -> str:
        """Extract a section from text based on a heading"""
        try:
            lines = text.split('\n')
            for i, line in enumerate(lines):
                if section_name.lower() in line.lower():
                    # Found section, now extract content until next section or end
                    section_content = []
                    j = i + 1
                    while j < len(lines) and not any(heading in lines[j].lower() for heading in ["risk", "diversification", "strategy"]):
                        section_content.append(lines[j])
                        j += 1
                    return "\n".join(section_content).strip()
            
            # Fallback: return empty string if section not found
            return ""
        
        except Exception:
            return "" 