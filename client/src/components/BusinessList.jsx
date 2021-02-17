import React from 'react';

const BusinessList = ({businessList = []}) => {
  return (
    <div>
      {
        businessList.map((data, i) => {
          if (data) {
            return (
              <div>
                <div key={String(i)}>
                  <h2>{data[0].name}</h2>
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
  );
};

export default BusinessList;