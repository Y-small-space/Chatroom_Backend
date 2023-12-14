const maxProfit = (prices)=>{
  let maxProfit = 0;
  let minPrices = prices[0];

  for(let i = 0;i<prices.length;i++){
    minPrices = Math.min(minPrices,prices[i]);
    maxProfit = Math.max(maxProfit,prices[i]-minPrices);
  }

  return maxProfit;
}

console.log(maxProfit([7,1,5,3,6,4]))