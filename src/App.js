import { useEffect, useState } from "react";
import './assets/styles/sliderMenu.css';
import './assets/styles/form.css';
import './App.css';
import axios from "axios";

function App() {
  const [selected, setSelected] = useState(0);
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    axios.post('http://localhost:8080/api/User/Login', {
      userName: "admin",
      password: "admin"
    })
      .then(res => setUserToken(res.data.accessToken));
  },[]);

  return (
    <div className="App">
      <h1>Terrorist App admin console.</h1>
      <SliderMenu
        selected={selected}
        setSelected={setSelected}
      />
      <EditForm
        selected={selected}
        userToken={userToken}
      />
    </div>
  );
}

const EditForm = ({selected, userToken}) => {
  var url = 'http://localhost:8080/api/Castle/AllCastles';
  var updateUrl = 'http://localhost:8080/api/Castle/AllCastles';
  var pictureUrl = 'http://localhost:8080/api/Castle/Picture/Upload';

  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedValue, setSelectedValue] = useState('');
  const [editedLocation, setEditedLocation] = useState(null);

  const getData = () => {
    setIsLoading(true);
    switch(selected){
      case 0:
        url = 'http://localhost:8080/api/Castle/AllCastles';
        break;
      case 1:
        url = 'http://localhost:8080/api/Church/AllChurches';
        break;
      case 2:
        url = 'http://localhost:8080/api/Museum/AllMuseums';
        break;
      case 3:
        url = 'http://localhost:8080/api/Outlook/AllOutlooks';
        break;
      case 4:
        url = 'http://localhost:8080/api/Park/AllParks';
        break;
      case 5:
        url = 'http://localhost:8080/api/Restaurant/AllRestaurants';
        break;
      default:
        url = 'http://localhost:8080/api/Castle/AllCastles';
        break;
    }
  
    fetch(url)
      .then(response => response.json())
      .then(data => setResponse(Object.values(data)[0]))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getData();
  },[selected]);

  useEffect(() => {
    response.map(location => {
      if(Object.values(location)[0] === selectedValue){
        setEditedLocation(location);
        console.log(location)
      }
    })
  }, [selectedValue]);

  useEffect(() => {

  },[editedLocation, selected])

  const updateData = () => {
    switch(selected){
      case 0:
        url = 'http://localhost:8080/api/Castle/AllCastles';
        pictureUrl = 'http://localhost:8080/api/Castle/Picture/Upload';
        break;
      case 1:
        url = 'http://localhost:8080/api/Church/AllChurches';
        pictureUrl = 'http://localhost:8080/api/Church/Picture/Upload';
        break;
      case 2:
        url = 'http://localhost:8080/api/Museum/AllMuseums';
        pictureUrl = 'http://localhost:8080/api/Museum/Picture/Upload';
        break;
      case 3:
        url = 'http://localhost:8080/api/Outlook/AllOutlooks';
        pictureUrl = 'http://localhost:8080/api/Outlook/Picture/Upload';
        break;
      case 4:
        url = 'http://localhost:8080/api/Park/AllParks';
        pictureUrl = 'http://localhost:8080/api/Park/Picture/Upload';
        break;
      case 5:
        url = 'http://localhost:8080/api/Restaurant/AllRestaurants';
        pictureUrl = 'http://localhost:8080/api/Restaurant/Picture/Upload';
        break;
      default:
        url = 'http://localhost:8080/api/Castle/AllCastles';
        pictureUrl = 'http://localhost:8080/api/Castle/Picture/Upload';
        break;
    }
  }

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const byteArray = new Uint8Array(reader.result);

      const encodedString = new TextEncoder().encode(byteArray);

      console.log(encodedString);
    
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
      axios.post(pictureUrl,{
        castleId: Object.values(editedLocation)[0],
        picture: encodedString
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.warn(error)
        });
    };
  };

  return (
    <div className="form-container">
      <div className="form-container-item left">
        <div className="form-select">
          <select onChange={e => setSelectedValue(e.target.value)}>
            <option value={0}>Vyberte lokaci</option>
            {
              response.map((location) => {
                return <option value={Object.values(location)[0]}>{location && location.name}</option>
              })
            }
          </select>
        </div>
        <div className="form-request">
          <h3>UPDATE</h3>
          <p>ID</p>
          <p style={{marginTop: 0}}>{editedLocation && Object.values(editedLocation)[0]}</p>
          <p>Name</p>
          <input
            value={editedLocation && editedLocation.name}
            onChange={e => setEditedLocation({...editedLocation, name: e.target.value})}
          />
          <p>Description</p>
          <textarea
            value={editedLocation && editedLocation.description}
            onChange={e => setEditedLocation({...editedLocation, description: e.target.value})}
          />
          <p>Latitude</p>
          <input
            type='number'
            value={editedLocation && editedLocation.latitude}
            onChange={e => setEditedLocation({...editedLocation, latitude: parseFloat(e.target.value)})}
          />
          <p>Longtitude</p>
          <input
            type='number'
            value={editedLocation && editedLocation.longitude}
            onChange={e => setEditedLocation({...editedLocation, longitude: parseFloat(e.target.value)})}
          />
          <button onClick={updateData}>UPDATE</button>
        </div>
      </div>
      <div className="form-container-item right">
        <div className="form-request">
          <h3 style={{color: 'green'}}>PICTURE UPLOAD</h3>
          <p>Access Token</p>
          <p>{userToken}</p>
          <p>ID</p>
          <p style={{marginTop: 0}}>{editedLocation && Object.values(editedLocation)[0]}</p>
          <p>Soubor</p>
          <input type="file" onChange={(e) => handleFileChange(e.target.files[0])} />
          <button>UPLOAD</button>
        </div>
      </div>
    </div>
  )
}

const SliderMenu = ({selected, setSelected}) => {

  return (
    <div className="menu-container">
      {['Castle', 'Church', 'Museum', 'Outlook', 'Park', 'Restaurant'].map((item, index) => (
        <a
          key={item}
          className={`menu-item${index === selected ? '-selected' : ''}`}
          onClick={() => setSelected(index)}
        >
          {item}
        </a>
      ))}
      <div className="menu-highlight"></div>
    </div>
  );
};

export default App;
