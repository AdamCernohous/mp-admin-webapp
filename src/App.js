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
      userName: "adam",
      password: "adam"
    })
      .then(res => {
        setUserToken(res.data.accessToken);
        console.log(res.data.accessToken);
      });
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
  var pictureUrl = 'http://localhost:8080/api/Castle/Picture/Upload';
  const [postUrl, setPostUrl] = useState('http://localhost:8080/api/Castle/CastleCreate');
  const [updateUrl, setUpdateUrl] = useState('http://localhost:8080/api/Castle/AllCastles');
  const [deleteUrl, setDeleteUrl] = useState('http://localhost:8080/api/');

  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedValue, setSelectedValue] = useState('');
  const [editedLocation, setEditedLocation] = useState(null);
  const [postLocation, setPostLocation] = useState({
    name: "",
    description: "",
    latitude: "",
    longitude: ""
  });

  //const [imageBytes, setImageBytes] = useState();
  var image;

  axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

  const getData = () => {
    setIsLoading(true);
    switch(selected){
      case 0:
        url = 'http://localhost:8080/api/Castle/AllCastles';
        setPostUrl('http://localhost:8080/api/Castle/CastleCreate');
        setUpdateUrl('http://localhost:8080/api/Castle/Castle/Update');
        break;
      case 1:
        url = 'http://localhost:8080/api/Church/AllChurches';
        setPostUrl('http://localhost:8080/api/Church/ChurchCreate');
        setUpdateUrl('http://localhost:8080/api/Church/Church/Update');
        break;
      case 2:
        url = 'http://localhost:8080/api/Museum/AllMuseums';
        setPostUrl('http://localhost:8080/api/Museum/MuseumCreate');
        setUpdateUrl('http://localhost:8080/api/Museum/Museum/Update');
        break;
      case 3:
        url = 'http://localhost:8080/api/Outlook/AllOutlooks';
        setPostUrl('http://localhost:8080/api/Outlook/OutlookCreate');
        setUpdateUrl('http://localhost:8080/api/Outlook/Outlook/Update');
        break;
      case 4:
        url = 'http://localhost:8080/api/Park/AllParks';
        setPostUrl('http://localhost:8080/api/Park/ParkCreate');
        setUpdateUrl('http://localhost:8080/api/Park/Park/Update');
        break;
      case 5:
        url = 'http://localhost:8080/api/Restaurant/AllRestaurants';
        setPostUrl('http://localhost:8080/api/Restaurant/RestaurantCreate');
        setUpdateUrl('http://localhost:8080/api/Restaurant/Restaurant/Update');
        break;
      default:
        url = 'http://localhost:8080/api/Castle/AllCastles';
        setPostUrl('http://localhost:8080/api/Castle/CastleCreate');
        setUpdateUrl('http://localhost:8080/api/Castle/Castle/Update');
        break;
    }

    console.log(postUrl);
  
    fetch(url)
      .then(response => response.json())
      .then(data => setResponse(Object.values(data)[0]))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getData();
  },[selected, postUrl, updateUrl]);

  useEffect(() => {
    response.map(location => {
      if(Object.values(location)[0] === selectedValue){
        setEditedLocation(location);
        console.log(location)
      }
    })
  }, [selectedValue]);

  const postData = () => {
    console.log(postUrl);
    axios.post(postUrl, postLocation)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  const updateData = () => {
    switch(selected){
      case 0:
        axios.put(updateUrl, {
          castleID: Object.values(editedLocation)[0],
          name: editedLocation.name,
          description: editedLocation.description,
          latitude: editedLocation.latitude,
          longitude: editedLocation.longitude
        })
          .then(res => console.log(res))
          .catch(err => console.error(err));
        break;
      case 1:
        axios.put(updateUrl, {
          churchID: Object.values(editedLocation)[0],
          name: editedLocation.name,
          description: editedLocation.description,
          latitude: editedLocation.latitude,
          longitude: editedLocation.longitude
        })
          .then(res => console.log(res))
          .catch(err => console.error(err));
        break;
      case 2:
        axios.put(updateUrl, {
          museumID: Object.values(editedLocation)[0],
          name: editedLocation.name,
          description: editedLocation.description,
          latitude: editedLocation.latitude,
          longitude: editedLocation.longitude
        })
          .then(res => console.log(res))
          .catch(err => console.error(err));
        break;
      case 3:
        axios.put(updateUrl, {
          outlookID: Object.values(editedLocation)[0],
          name: editedLocation.name,
          description: editedLocation.description,
          latitude: editedLocation.latitude,
          longitude: editedLocation.longitude
        })
          .then(res => console.log(res))
          .catch(err => console.error(err));
        break;
      case 4:
        axios.put(updateUrl, {
          parkID: Object.values(editedLocation)[0],
          name: editedLocation.name,
          description: editedLocation.description,
          latitude: editedLocation.latitude,
          longitude: editedLocation.longitude
        })
          .then(res => console.log(res))
          .catch(err => console.error(err));
        break;
      case 5:
        axios.put(updateUrl, {
          restaurantID: Object.values(editedLocation)[0],
          name: editedLocation.name,
          description: editedLocation.description,
          latitude: editedLocation.latitude,
          longitude: editedLocation.longitude
        })
          .then(res => console.log(res))
          .catch(err => console.error(err));
        break;
      default:
        axios.put(updateUrl, {
          castleID: Object.values(editedLocation)[0],
          name: editedLocation.name,
          description: editedLocation.description,
          latitude: editedLocation.latitude,
          longitude: editedLocation.longitude
        })
          .then(res => console.log(res))
          .catch(err => console.error(err));
        break;
    }
  }

  // const handleFileChange = (file) => {
  //   const reader = new FileReader();
  
  //   reader.readAsDataURL(file);
  
  //   reader.onloadend = () => {
  //     const imageData = reader.result.split(',')[1];
  //     const imageBytes = new Uint8Array(imageData.length);
  //     var len = imageData.length;
  //     for (let i = 0; i < imageData.length; i++) {
  //       imageBytes[i] = imageData.charCodeAt(i);
  //       console.log(len);
  //       len--;
  //     }
  //     image = imageBytes;
  //   };
  // };

  // const uploadImage = () => {
  //   console.log(image);
  //   axios.post('http://localhost:8080/api/Castle/Picture/Upload', {
  //     castleId: Object.values(editedLocation)[0],
  //     picture: image
  //   }, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(res => console.log(res))
  //     .catch(err => console.error(err));
  // }

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const imageData = reader.result.split(',')[1];
      image = imageData;
    };
  };

  const uploadImage = () => {
    console.log(image);

    axios.post("http://localhost:8080/api/Castle/Picture/Upload", {
      castleId: Object.values(editedLocation)[0],
      picture: image,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
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
          <h3 style={{color: "green"}}>POST</h3>
          <p>Name</p>
          <input
            onChange={e => setPostLocation({...postLocation, name: e.target.value})}
          />
          <p>Description</p>
          <textarea
            onChange={e => setPostLocation({...postLocation, description: e.target.value})}
          />
          <p>Latitude</p>
          <input
            type={'number'}
            onChange={e => setPostLocation({...postLocation, latitude: parseFloat(e.target.value)})}
          />
          <p>Longtitude</p>
          <input
            type={'number'}
            onChange={e => setPostLocation({...postLocation, longitude: parseFloat(e.target.value)})}
          />
          <button onClick={() => postData(postUrl)}>POST</button>
        </div>
        <div className="form-request">
          <h3 style={{color: 'green'}}>PICTURE UPLOAD</h3>
          <p>Access Token</p>
          <p>{userToken}</p>
          <p>ID</p>
          <p style={{marginTop: 0}}>{editedLocation && Object.values(editedLocation)[0]}</p>
          <p>Soubor</p>
          <input type="file" onChange={(e) => handleFileChange(e.target.files[0])} />
          <p>{image}</p>
          <button onClick={() => uploadImage()}>UPLOAD</button>
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
