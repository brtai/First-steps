import requests

# Set the endpoint for the DEX API
endpoint = "https://api.dex.com"

# Get the current price of an asset
def get_price(symbol):
    response = requests.get(f"{endpoint}/prices/{symbol}")
    if response.status_code == 200:
        return response.json()["price"]
    else:
        raise ValueError("Failed to get price")

# Place an order to buy an asset
def buy(symbol, quantity, price):
    data = {"symbol": symbol, "quantity": quantity, "price": price}
    response = requests.post(f"{endpoint}/orders", json=data)
    if response.status_code == 201:
        return response.json()["order_id"]
    else:
        raise ValueError("Failed to place buy order")

# Place an order to sell an asset
def sell(symbol, quantity, price):
    data = {"symbol": symbol, "quantity": quantity, "price": price}
    response = requests.post(f"{endpoint}/orders", json=data)
    if response.status_code == 201:
        return response.json()["order_id"]
    else:
        raise ValueError("Failed to place sell order")

# Get the status of an order
def get_order_status(order_id):
    response = requests.get(f"{endpoint}/orders/{order_id}")
    if response.status_code == 200:
        return response.json()["status"]
    else:
        raise ValueError("Failed to get order status")

# Example usage
symbol = "ETH-USDT"
price = get_price(symbol)
quantity = 1

# Buy 1 ETH for current market price
order_id = buy(symbol, quantity, price)
print(f"Buy order placed with ID: {order_id}")

# Check the status of the buy order
status = get_order_status(order_id)
print(f"Order status: {status}")

# Sell 1 ETH for current market price + $5
sell_price = price + 5
sell_order_id = sell(symbol, quantity, sell_price)
print(f"Sell order placed with ID: {sell_order_id}")

# Check the status of the sell order
status = get_order_status(sell_order_id)
print(f"Order status: {status}")
