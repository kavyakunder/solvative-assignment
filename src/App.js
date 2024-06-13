import logo from "./logo.svg";
import "./App.css";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Pagination from "./component/Pagination";
function App() {
  const [places, setPlaces] = useState([]);
  const [inputPlace, setInputPlace] = useState("");
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [perPagePost, setPostsPerPage] = useState(3);
  const [paginationLimit, setPaginatonLimit] = useState(5);
  const handleFetchAPICall = () => {
    var options = {
      method: "GET",
      url: process.env.REACT_APP_GET_CITIES_URL,
      params: {
        countryIds: "IN",
        namePrefix: inputPlace,
        limit: paginationLimit,
      },
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
    if (e.keyCode === 13 && paginationLimit <= 10) {
      setInputPlace("");
      setLoading(true);
      handleFetchAPICall();
    }
  };

  const handlePagination = (pageNumber) => {
    setActivePage(pageNumber);
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
      {loading && <div className="loader"></div>}
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
              places
                .slice((activePage - 1) * perPagePost, activePage * perPagePost)
                .map((place, index) => {
                  const pageIndex = (activePage - 1) * perPagePost + index + 1;
                  const url = `https://flagsapi.com/${place.countryCode}/shiny/64.png`;
                  return (
                    <Fragment key={place.id}>
                      <tr>
                        <td>{pageIndex}</td>
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
      <Pagination
        length={places.length}
        perPagePost={perPagePost}
        activePage={activePage}
        handlePagination={handlePagination}
      />
      <input
        className="pagination-limit"
        name="pagination-limit"
        id="pagination-limit"
        type="number"
        min="5"
        max="10"
        onChange={(e) => setPaginatonLimit(e.target.value)}
      />
    </div>
  );
}

export default App;
