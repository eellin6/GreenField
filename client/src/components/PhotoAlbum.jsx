import React, {useState, useEffect } from 'react';
import axios from 'axios';

const getPhotos = () => {
  const [ photos, setPhotos ] = useState([]);
  const [ test, setTest ] = useState([]);

  useEffect(() => {

  }, []);


  return (
    <div className="photo">

      <form>
        <div>
          <label className="photos">Add Picture
            <input type="file" placeholder="insert picture" name='picture' id="imagepath" onChange={(event) => { setPhotos(event.target.files[0]); }}/>
          </label>
        </div>
        <span><button className="modal-btn" type='submit' onClick={(e) => {
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
        <button className="modal-btn" >See Saved Photos </button>
      </form>
    </div>
  );
};

export default getPhotos;
