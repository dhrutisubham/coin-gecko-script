

function initCoinGeckoWidget(container) {

    const tokenName = container.getAttribute("data-widget-name");

    if (!tokenName) {
        console.error("Token name not specified for the widget.");
        return;
    }

    // styling rules for the widget
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400;1,500;1,700&display=swap');


        /* main container styling */
        .container{
            border: solid rgb(226, 226, 226) 2px;
            font-family: 'Roboto', sans-serif ;
            font-weight: 400;
            border-radius: 10px;
            min-width: 250px;
            min-height: 100px;
            overflow: hidden;
        }

        /* top section styling */
        .top-bar{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1em;
            padding: 1em;
            border-bottom: 1px rgb(224, 224, 224) solid;
        }
        .price-title{
            display: flex;
            flex-direction: column;
            gap: 2px;
            flex-grow: 2;
        }

        .widget-title{
            color: rgb(90, 90, 235);
            font-weight: 400;
        }

        .logo{
            max-width: 45px;
            aspect-ratio: 1;
            padding: max(10px, 5%);
            padding-top: 0;
            padding-bottom: 0;
        }
        .widget-short{
            text-transform: uppercase;
        }

        h2{
            margin: 0;
            font-weight: 400;
            font-size: large;
        }

        .widget-price .widget-title{
            padding: 0px;
            margin: 0px;
            font-weight: 400;
        }

        .widget-price{
            font-size: x-large;
        }

        .currency-unit1{
            font-size: medium;
            font-weight: 400;
        }

        /* bottom section styling */

        .bottom-bar{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: stretch;

        }

        h3{
            margin: 0;
            font-weight: 400;
            font-size: small;

        }

        .market-details{
            display: flex;
            flex-direction: column;
            font-size: smaller;
            justify-content: center;
            align-items: center;
            gap: 8px;
            padding: 1em;
            flex-grow: 1;
            outline: 0.5px rgb(224, 224, 224) solid;
        }

        .market-detail-title{
            text-transform: uppercase;
        }

        .widget-market-cap{
            font-size: medium;
        }

        .currency-unit2{
            font-size: small;
            font-weight: 400;
        }

    `;
    document.head.appendChild(styleElement);


    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    const apiEndpoints = {
        bitcoin: {
            url: 'https://api.coingecko.com/api/v3/coins/bitcoin',
        },
        ethereum: {
            url: 'https://api.coingecko.com/api/v3/coins/ethereum',
        },
        tether:{
            url: 'https://api.coingecko.com/api/v3/coins/tether',
        },
        usd_coin:{
            url: 'https://api.coingecko.com/api/v3/coins/usd-coin',
        }
    };

    fetch(apiEndpoints[tokenName].url)
        .then(res => {
        return res.json()
            })
            .then(data=>{
                if(data){
                    let tokenID= data['name'];
                    let tokenShort= data['symbol'];
                    let price=parseFloat(data['market_data']['current_price']['usd']).toLocaleString("en-US");
                    let cap=convertToInternationalCurrencySystem(parseFloat(data['market_data']['market_cap']['usd']));
                    let vol=convertToInternationalCurrencySystem(parseFloat(data['market_data']['total_volume']['usd']));
                    let img_url=data['image']['large'];

                    let widgetHTML=`
                        <div class="container">
                            <div class="top-bar">
                                <img class="logo" src=${img_url}/>
                                <div class="price-title">
                                    <h2 class="widget-title">${tokenID} <span class="widget-short">(${tokenShort})</span></h2>
                                    <h2 class="widget-price">${price} <span class="currency-unit1">USD</span></h2>
                                </div>
                            </div>
                            <div class="bottom-bar">
                                <div class="market-details">
                                    <h3 class="market-detail-title">Market Cap</h3>
                                    <h3 class="widget-market-cap">$${cap} <span class="currency-unit2">USD</span></h3>
                                </div>
                                <div class="market-details">
                                    <h3 class="market-detail-title">Volume</h3>
                                    <h3 class="widget-market-cap">$${vol} <span class="currency-unit2">USD</span></h3>
                                </div>
                                
                            </div<
                            
                        </div>
                    `;
                    container.innerHTML=widgetHTML;
                }
            })
            .catch(error => console.log(error));

}

function convertToInternationalCurrencySystem (labelValue) {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

    : Math.abs(Number(labelValue));

}

document.addEventListener("DOMContentLoaded", function () {
    const widgetElements = document.querySelectorAll(".coingecko-widget");

    widgetElements.forEach(function (widgetElement) {
        initCoinGeckoWidget(widgetElement);
    });
});