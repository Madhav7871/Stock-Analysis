from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import pandas as pd

app = FastAPI()

# This prevents the CORS "Failed to fetch" error
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all frontend ports (like localhost:5173)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/stock/{symbol}")
async def get_stock_data(symbol: str):
    try:
        # Fetch 1 month of data for the requested ticker
        stock = yf.Ticker(symbol)
        hist = stock.history(period="1mo")
        
        # If the dataframe is empty, it means the ticker is invalid
        if hist.empty:
            raise HTTPException(status_code=404, detail=f"Ticker '{symbol}' not found. If it's an Indian stock, try adding .NS (e.g., {symbol}.NS)")

        # Convert the data into a clean JSON format for React
        hist.reset_index(inplace=True)
        
        # Handle timezone formatting cleanly
        if 'Date' in hist.columns:
            hist['Date'] = hist['Date'].dt.strftime('%Y-%m-%d')
        elif 'Datetime' in hist.columns:
            hist['Date'] = hist['Datetime'].dt.strftime('%Y-%m-%d')
            
        data = hist[['Date', 'Close', 'Volume']].to_dict(orient="records")
        
        return {"data": data}

    except Exception as e:
        # If anything goes wrong, catch the error so the server DOES NOT crash!
        raise HTTPException(status_code=400, detail=str(e))