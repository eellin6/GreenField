import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { key } from '../../../config'
import { data } from '../sample_data'


class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMarker: {},
      markers: [
        {id: 0,
        latitude: 29.9681,
        longitude: -90.0553,
        desciption: 'It’s a calm, quiet, and comfortable place for folks to come to hang out with some shelter cats and kittens, all of which are available for adoption.',
        imageUrl:'https://scontent-dfw5-1.xx.fbcdn.net/v/t1.0-9/103406900_638160146911535_3127695891080859383_n.jpg?_nc_cat=105&ccb=2&_nc_sid=8024bb&_nc_ohc=Tl0NoVprnZYAX_xYWNe&_nc_ht=scontent-dfw5-1.xx&oh=702aa963912470b9d127c87ccad6f05c&oe=603FE08A'
      },
      {id: 1,
        latitude: 29.9361,
        longitude: -90.1223,
        desciption: 'An interactive installation, designed by @TulaneArch professor Irene Keil and local architect David Gregor.',
        imageUrl: 'https://scontent-dfw5-1.xx.fbcdn.net/v/t1.0-9/86853705_10157030011425920_6965237069098516480_o.jpg?_nc_cat=103&ccb=2&_nc_sid=9e2e56&_nc_ohc=vQVyrcqiK-kAX9gixfl&_nc_ht=scontent-dfw5-1.xx&oh=5ae39198d963ef6f45ac34cdb5d7c0d9&oe=603C16FE'
      },
      {id: 2,
        latitude: 29.9687,
        longitude: -90.0813,
        desciption: 'It is clear this abandoned Art Deco gem was no ordinary cleaners.',
        imageUrl: 'https://bloximages.newyork1.vip.townnews.com/nola.com/content/tncms/assets/v3/editorial/f/57/f572b1a1-dd5f-5ba5-ab00-3245ad292e21/5cde0a88d4703.image.jpg?resize=1200%2C799'
      },
      {id: 3,
        latitude: 29.9765,
        longitude: -90.0905,
        desciption: 'A hurricane-stricken oak tree has been reborn as a beautiful chainsaw artwork.',
        imageUrl: 'https://delgadocommunity.files.wordpress.com/2013/08/tree-pic-3.jpg'
      },
      {id: 4,
        latitude: 29.9590,
        longitude: -90.0712,
        desciption: 'In 2010, Nicolas Cage purchased two plots in this cemetery using one to construct this strange pyramid mausoleum.',
        imageUrl: 'https://www.roadsideamerica.com/attract/images/la/LANORcagetomb_ks02_620x300.jpg'
      },
      {id: 5,
        latitude: 29.9646,
        longitude: -90.0679,
        desciption: 'An artist weaves "wooden quilts" with scraps salvaged from his Katrina-damaged home in Tremé.',
        imageUrl: 'https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvcGxhY2VfaW1hZ2VzL2IzODJjZjZlZmE0MjU3NTc4M18yMDIwMTEyMF8xMzI0NTUuanBnIl0sWyJwIiwiY29udmVydCIsIiJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA4MSAtYXV0by1vcmllbnQiXSxbInAiLCJ0aHVtYiIsIjYwMHg-Il1d/20201120_132455.jpg'
      },
      {id: 6,
        latitude: 29.9653,
        longitude:  -90.0663,
        desciption: 'Tomb of the Unknown Slave',
        imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/8b/a6/fd/tomb-to-the-unknown-slave.jpg'
      },
      {id: 7,
        latitude: 29.9644,
        longitude: -90.0473,
        desciption: "BMike's Studio Be",
        imageUrl: 'https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,g_auto,h_500,q_50,w_1400/https://assets.simpleviewinc.com/simpleview/image/upload/crm/neworleans/NOTMC_527330-f351b32a5056b36_f351b807-5056-b365-abd3388e47dfb129.jpg'
      },
      {id: 8,
        latitude: 29.9558,
        longitude: -90.0217,
        desciption: 'Doullut Steamboat Houses',
        imageUrl: 'https://bloximages.newyork1.vip.townnews.com/nola.com/content/tncms/assets/v3/editorial/e/af/eaf41d90-2cb9-5d3a-b46e-f3d75b82ae14/5d13c4a530ad3.image.jpg'
      },
      {id: 9,
        latitude: 29.9800,
        longitude: -90.0870,
        desciption: 'Oldest fire hydrant in New Orleans',
        imageUrl: 'https://lh3.googleusercontent.com/proxy/duk4Ptkhcspw9y6f7hPdZCXjvTis_Mn09riow-TjQSPYy2Tppwn-kZFQ4eiTYiO_Z0-U2qy_Ks3sjuZr2JjlVc-AocKNt3i5SJK3RevqEDgcgO9zrmMydIiR21yDzzr7mscYk6GlR0W9okTVocbZFWTHncVZ0abotKxBBs9vRT-jN_dB6ki4dTxEvFgW0y6ByOJENwxg'
      }
      ]


    }
  }
   onMarkerDragEnd (coord, index) {
     const { latLng } = coord;
     const lat = latLng.lat();
     const lng = latLng.lng();

     this.setState(prevState => {
       const markers = [...this.state.markers];
       markers[index] = { ...markers[index], position: { lat, lng } };
       return { markers };
     });
   };

 render() {
   const style = {
     width: '96vw',
     height: '85vh'
   }
   console.log(key)
return (
<Map
 google={this.props.google}
 initialCenter={{
  lat: 29.9511,
  lng: -90.081807
}}
 zoom={12}
 style={style}
 onClick={this.handleMapClick}
 >

{this.state.markers.map((marker, index) => (
          <Marker
            position={{lat: marker.latitude,
                     lng: marker.longitude
            }}
            draggable={true}
            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
            name={marker.description}

          />
        ))}
 </Map>
)
 }
}

export default GoogleApiWrapper({
  apiKey: key
})(MapContainer);