import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function App() {
  const [country, setCountry] = useState("fin");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then((response) => {
        const data = response.data;
        console.log(data);

        setCountries(data);
      });
  }, [country]);

  if (country === undefined) {
    return (
      <>
        <p>No information to display</p>
      </>
    );
  }

  return (
    <>
      find countries:{" "}
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <div>
          {countries.map((country) => {
            <p key={country.name.common}>{country.name.common}</p>;
          })}
        </div>
      )}
    </>
  );
}

export default App;
