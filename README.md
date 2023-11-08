## Project title
JavaScript Widget Script for CoinGecko Token

## Motivation
This is a JavaScript script for a widget that, when added to a web page, retrieves and shows information from CoinGecko about a particular cryptocurrency token.

## Screenshots
![Demo Image](/coinGecko_token.js "Demo Image")

## Tech/framework used
<b>Built with</b>
- [Javascript](https://www.javascript.com/)

## Features
**Token Parameter**: 
The widget script accepts a token name as a parameter when embedded in the script tag, allowing you to specify which token's details to display.

**API Integration**: 
The script makes an API request to CoinGecko to fetch comprehensive token details for the specified token.

**Display Token Information**: 
The following token details are displayed within the embedded script's container on the web page:
-Token name
-Market cap
-Current price
-24-hour trading volume


**User-Friendly Rendering**: 
The widget script renders the token details in a user-friendly format, making it easy for website visitors to access and understand the information.

## Code Example
<script src="coingecko_token.js"></script>
<div class="coingecko-widget" data-widget-name="bitcoin"></div>


## Installation
1. Download the *'coinGecko_token.js'* script.
2. Embed the script in your HTML page, passing the token name as a parameter using the *'data-widget-name'* attribute in the script tag.


## Requirements
1. A web page where you want to embed the widget.
2. An internet connection to fetch data from the CoinGecko API.

## Credits
I used the styling of this widget for building this script.
https://coinmarketcap.com/widget/ticker/

## Author
Dhrutisundar Sahoo

## Acknowledgements
This project relies on data provided by the CoinGecko API.
