import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [stock, setStock] = useState("");
  const [APIData, setAPIData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:4000/NotionAPIPost", {
      Fullname: title,
      StockQuant: stock,
    }).catch((error) => {
      console.log(error);
    });

    Axios.get("http://localhost:4000/NotionAPIGet")
      .then((response) => {
        setAPIData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title of the Product"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Stock Quantity"
              onChange={(e) => {
                setStock(e.target.value);
              }}
            />
            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="Data">
          <p>API DATA</p>

          {APIData.map((data) => {
            return (
              <div key={data.id}>
                 <p>Product: {data.properties.Name.title[0].text.content}</p> 
                <p>Stock: {data.properties.Stock.number}</p>   
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
