import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { useDispatch } from "react-redux";
import { updatePrices } from "./features/crypto/cryptoSlice";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const App = () => {
  const { assets } = useSelector((state) => state.crypto);
  const dispatch = useDispatch();
  const prevPrices = useRef({});
  const [searchTerm, setSearchTerm] = useState(""); 

  const [flashes, setFlashes] = useState({});

useEffect(() => {
  const interval = setInterval(() => {
    dispatch(updatePrices());
  }, 5000);

  return () => clearInterval(interval); 
}, [dispatch]);

useEffect(() => {
  const newFlashes = {};
  assets.forEach((coin) => {
    const prev = prevPrices.current[coin.id];
    if (prev && coin.price !== prev) {
      newFlashes[coin.id] = coin.price > prev ? "green-flash" : "red-flash";
      setTimeout(() => {
        setFlashes((prev) => ({ ...prev, [coin.id]: "" }));
      }, 1500); // remove flash after 1.5 seconds
    }
    prevPrices.current[coin.id] = coin.price;
  });
  setFlashes((prev) => ({ ...prev, ...newFlashes }));
}, [assets]);

const filteredAssets = assets.filter((coin) =>
  coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="container">
      <h1 className="title">Crypto Price Tracker</h1>
      <input
        type="text"
        placeholder="Search crypto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="table-container">
      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>Volume(24h)</th>
            <th>Circulating Supply</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.map((coin, index) => (
            <tr key={coin.id}>
              <td>{index + 1}</td>
              <td className="name-cell">
                <img src={coin.logo} alt={coin.name} className="coin-logo" />
                <span>
                  <strong>{coin.name}</strong> <span className="symbol">{coin.symbol}</span>
                </span>
              </td>
              <td className={flashes[coin.id]}>${coin.price.toLocaleString()}</td>
              <td className={coin.change1h >= 0 ? "green" : "red"}>{coin.change1h.toFixed(2)}%</td>
              <td className={coin.change24h >= 0 ? "green" : "red"}>{coin.change24h.toFixed(2)}%</td>
              <td className={coin.change7d >= 0 ? "green" : "red"}>{coin.change7d.toFixed(2)}%</td>
              <td>${coin.marketCap}</td>
              <td>
                ${coin.volume24h} <br />
                <span className="sub">{coin.volumeToken}</span>
              </td>
              <td>{coin.circulatingSupply}</td>
              <td><ResponsiveContainer width={100} height={40}>
              <LineChart data={coin.sparkline.map((price, i) => ({ price, i }))}>
              <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} strokeWidth={2} />
              </LineChart>
              </ResponsiveContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default App;