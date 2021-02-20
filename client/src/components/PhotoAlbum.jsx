import React, {useState, useEffect } from 'react';
import axios from 'axios';

const getPhotos = () => {
  const [ photos, setPhotos ] = useState([]);
  const [ test, setTest ] = useState([]);

  useEffect(() => {
    axios.get('/photos')
      .then(({data}) => setPhotos(data))
      .catch((err) => console.warn(err));
  }, []);


  return (
    <div className="photo">

      <form>
        <div>
          <label className="photos">Add Picture
            <input type="file" placeholder="insert picture" name='picture' id="imagepath" onChange={(event) => { event.target.files[0]; }}/>
          </label>
        </div>
      </form>
    </div>
  );
};

export default getPhotos;
