import { createSlice } from '@reduxjs/toolkit';
import { cryptoData } from './cryptoData';

const initialState = {
  assets: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: '../../assets/bit.jpg',
      price: 30000,
      change1h: 0.5,
      change24h: 1.2,
      change7d: 4.1,
      marketCap: '580B',
      volume24h: '25B',
      circulatingSupply: '19M',
      maxSupply: '21M',
      sparkline: [25000, 29500, 29800, 30200, 30100, 30500, 30000]
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: '../../assets/ethe.png',
      price: 1802.46,
      change1h: 0.60,
      change24h: 3.21,
      change7d: 13.68,
      marketCap: '217,581,279,327',
      volume24h: '23,547,469,307',
      volumeToken: '13.05M ETH',
      circulatingSupply: '120.71M ETH',
      maxSupply: null,
      sparkline: [30000, 30500, 30100, 29000, 29500, 30500, 55000]
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      logo: '../../assets/tether.png',
      price: 1.0,
      change1h: -0.0,
      change24h: 0.0,
      change7d: 0.04,
      marketCap: '145,320,022,085',
      volume24h: '92,288,882,007',
      volumeToken: '92.25B USDT',
      circulatingSupply: '145.27B USDT',
      maxSupply: null,
      sparkline: [28000, 29600, 20000, 30300, 30200, 30600, 31000]
    },
    {
      id: 4,
      name: 'XRP',
      symbol: 'XRP',
      logo: '../../assets/xrp.png',
      price: 2.22,
      change1h: 0.46,
      change24h: 0.54,
      change7d: 6.18,
      marketCap: '130,073,814,966',
      volume24h: '5,131,481,491',
      volumeToken: '2.30B XRP',
      circulatingSupply: '58.39B XRP',
      maxSupply: null,
      sparkline: [19000, 19500, 19800, 20200, 23100, 20500, 20000]
    },
    {
      id: 5,
      name: 'BNB',
      symbol: 'BNB',
      logo: '../../assets/bnb.png',
      price: 606.65,
      change1h: 0.09,
      change24h: -1.20,
      change7d: 3.73,
      marketCap: '85,471,956,947',
      volume24h: '1,874,281,784',
      volumeToken: '3.08M BNB',
      circulatingSupply: '140.89M BNB',
      maxSupply: null,
      sparkline: [15600, 29540, 29850, 35200, 38100, 36500, 31000]
    },
    {
      id: 6,
      name: 'Solana',
      symbol: 'SOL',
      logo: '../../assets/sol.jpeg',
      price: 151.51,
      change1h: 0.53,
      change24h: 1.26,
      change7d: 14.74,
      marketCap: '78,381,958,631',
      volume24h: '4,881,674,486',
      volumeToken: '32.25M SOL',
      circulatingSupply: '517.31M SOL',
      maxSupply: null,
      sparkline: [28000, 27000, 29000, 26000, 35000, 28500, 29500]
    },
  ],
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {updatePrices: (state) => {
    state.assets = state.assets.map((asset) => {
      const randomChange = (Math.random() * 2 - 1).toFixed(2); // -1.00 to +1.00
      const newPrice = (asset.price * (1 + randomChange / 100)).toFixed(2);

      return {
        ...asset,
        price: parseFloat(newPrice),
        change1h: parseFloat(randomChange),
      };
    });
  },
},
});

export default cryptoSlice.reducer;
export const { updatePrices } = cryptoSlice.actions;
