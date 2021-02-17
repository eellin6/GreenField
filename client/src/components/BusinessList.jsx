// import React from 'react';

// const BusinessList = ({businessList = []}) => {
//   return (
//     <div>
//       {
//         businessList.map((data, i) => {
//           if (data) {
//             return (
//               <div>
//                 <div key={String(i)}>

//                   <h2> Name {data.name}</h2>


//                 </div>
//                 <div key={String(i)}>
//                   <h3>Address: {data.location.address1}</h3>
//                 </div>
//                 <div className='rating'>
//                   <h3>rating: {data.rating}</h3>
//                 </div>
//               </div>
//             );
//           }
//           return null;
//         })

//       }
//     </div>
//   );
// };

// export default BusinessList;