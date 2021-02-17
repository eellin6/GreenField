import React, {useEffect, useState} from 'react';
import axios from 'axios';



const SearchBar = () => {
  const [keyword, setKeyword] = useState([]);
  const [results, setResults] = useState([]);

  const BarStyling = {width: '20rem', background: '#F2F1F9', border: 'none', padding: '0.5rem'};

  return (
    <div>
      <input
        value={keyword}
        style={BarStyling}
        //key="random1"

        onChange={(e) => setKeyword(e.target.value)}
        placeholder='search a business'
      />
      <button type="submit"
        onClick={() => {
          //console.log('line 24', keyword);
          axios.get(`http://localhost:3000/api/search?term=${keyword} `)
            .then(({data}) => {

              setResults(data.businesses);

            }).catch((err) => console.error(err));

        }}
      >Search</button>

      <div>

        {
          results.map((data, i) => {
            if (data) {
              return (
                <div>
                  <div key={String(i)}>
                    <h2>{data.name}</h2>
                  </div>
                  {/* <div>
                  <h2>{data[0].location.address1}</h2>
                </div>
                <div>
                  <h2>{data.businesses.rating}</h2>
                </div> */}
                </div>
              );
            }
            return null;
          })

        }
      </div>


    </div>


  );
};

export default SearchBar;