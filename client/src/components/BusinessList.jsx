import React from 'react';

const BusinessList = ({businessList = []}) => {
  return (
    <div>
      {
        businessList.map((data, i) => {
          if (data) {
            return (
              <div>
                <div key={data.name}></div>
                <h2>{data.name}</h2>
                <div key={data.location.address1}></div>
                <h2>{data.location.address1}</h2>
                <div key={data.rating}></div>
                <h2>{data.rating}</h2>
              </div>
            );
          }
          return null;
        })

      }
    </div>
  );
};

export default BusinessList;