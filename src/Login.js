import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');

  //const [token, setToken] = useState(null);

  const navigate = useNavigate();

  var token = '';

  const login = () => {
    axios.post('https://aplikaceturistickedestinace.azurewebsites.net/api/User/Login', {
      userName: username,
      password: password
    })
      .then(res => token = res.data.accessToken)
      .catch(err => console.log(err));
  }

  const authorize = () => {
    console.log(token);
    var role;

    if(token !== ''){
      var decodedToken = jwtDecode(token);
      role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }

    if(role === 'Admin'){
      navigate(`/app/${token}`);
    }
    else{
      console.log('K této aplikaci nemáte dostatečná oprávnění.')
    }
  }

  return (
    <div className="App">
      <h1>Admin App (Turistické destinace)</h1>
      <div style={{display: 'flex', flexDirection: 'column', width: '20%', margin: 'auto', marginTop: '20vh'}}>
        <p style={{textAlign: 'left'}}>Username</p>
        <input type={'text'} onChange={e => setUsername(e.target.value)} />
        <p style={{textAlign: 'left'}}>Password</p>
        <input type={'password'} onChange={e => setPassword(e.target.value)} />
        <button style={{marginTop: '20px'}} onClick={() => {login();authorize();}}>Login</button>
      </div>
    </div>
  );
}
 
export default Login;