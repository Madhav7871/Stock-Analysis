from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import pandas as pd

app = FastAPI()

# Allow React to talk to this Python server securely
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/stock/{ticker}")
def get_stock_data(ticker: str):
    # Fetch 1 year of historical data
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1y")
    
    # Format the data so React can read it easily
    hist.reset_index(inplace=True)
    hist['Date'] = hist['Date'].dt.strftime('%Y-%m-%d')
    
    # Send Date, Close price, and Volume back to the frontend
    data = hist[['Date', 'Close', 'Volume']].to_dict(orient="records")
    return {"ticker": ticker, "data": data}