import React, {useState, useEffect } from 'react';
import axios from 'axios';

const getPhotos = () => {
  const [ photos, setPhotos ] = useState([]);
  const [ album, setAlbum ] = useState([]);
  const [ seeAlbum, setSeeAlbum ] = useState(false);

  useEffect(() => {
    axios.get('/photos')
      .then(({ data }) => {
        setAlbum(data);
      })
      .catch((err) => console.log(err));

  }, []);


  return (
    <div className="photo">

      <form>
        <div>
          <label className="photos">Add Picture
            <input type="file" placeholder="insert picture" name='picture' id="imagepath" onChange={(event) => { setPhotos(event.target.files[0]); }}/>
          </label>
        </div>
        <span>
          <button className="modal-btn" type='submit' onClick={(e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('picture', photos);
            axios.post('/photos', formData)
              .then(({data}) => console.info(data))
              .catch((err) => console.warn(err));
            console.info('here');
          }
          }>Add Photo</button>
        </span>
        <br></br>
        {
          seeAlbum ? <button className="modal-btn" onClick={(e) => {
            e.preventDefault();
            setSeeAlbum(false);
          }}>Close Album
          </button> : <button className="modal-btn" onClick={(e) => {
            e.preventDefault();
            setSeeAlbum(true);
          }}>Open Album
          </button>
        }
      </form>
      <div>
        {
          seeAlbum ? album.map((img, i) => {
            return (
              <img style={{ height: '200px', width: '300px'}} src={img.imageUrl}/>
            );
          }) : null
        }
      </div>
    </div>
  );
};

export default getPhotos;
