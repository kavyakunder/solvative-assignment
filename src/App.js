import logo from "./logo.svg";
import "./App.css";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function App() {
  const [places, setPlaces] = useState([]);
  const [inputPlace, setInputPlace] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchAPICall = () => {
    var options = {
      method: "GET",
      url: process.env.REACT_APP_GET_CITIES_URL,
      params: { countryIds: "IN", namePrefix: inputPlace, limit: "3" },
      headers: {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log("Ress", response);
        setPlaces(response?.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log("Err", error);
        console.error(error);
      });
  };

  const handleKeydown = (e) => {
    if (e.keyCode === 13) {
      setInputPlace("");
      setLoading(true);
      handleFetchAPICall();
    }
  };
  return (
    <div className="App">
      <h1>Search Places</h1>
      <input
        className="input-field"
        onChange={(e) => setInputPlace(e.target.value)}
        value={inputPlace}
        onKeyDown={(e) => handleKeydown(e)}
        placeholder="Search places..."
      />
      <p>{loading && "Loading..."}</p>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Place</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {places.length > 0 ? (
              places.map((place) => {
                const url = `https://flagsapi.com/${place.countryCode}/shiny/64.png`;
                return (
                  <Fragment key={place.id}>
                    <tr>
                      <td>{place.id}</td>
                      <td>{place.name}</td>
                      <td>
                        <img src={url} alt={place.name} />
                      </td>
                    </tr>
                  </Fragment>
                );
              })
            ) : (
              <tr>
                <td>No places found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
