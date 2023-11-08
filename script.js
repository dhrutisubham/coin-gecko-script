// import './styles.css'; 


export function initCoinGeckoWidget(tokenName, containerId) {

    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    const widgets = document.querySelectorAll('[data-token]');
    console.log(widgets);

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
                console.log(data);
                if(data){
                    let tokenID= data['name'];
                    let tokenShort= data['symbol'];
                    let price=parseInt(data['market_data']['current_price']['usd']).toLocaleString("en-US");
                    let cap=convertToInternationalCurrencySystem(parseInt(data['market_data']['market_cap']['usd']));
                    let vol=convertToInternationalCurrencySystem(parseInt(data['market_data']['total_volume']['usd']));
                    let img_url=data['image']['large'];
                    console.log(img_url);
                    
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
                                    <h3 class="market-detail-title">Market Cap</h2>
                                    <h3 class="widget-market-cap">$${cap} <span class="currency-unit2">USD</span></h2>
                                </div>
                                <div class="market-details">
                                    <h3 class="market-detail-title">Volume</h2>
                                    <h3 class="widget-market-cap">$${vol} <span class="currency-unit2">USD</span></h2>
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