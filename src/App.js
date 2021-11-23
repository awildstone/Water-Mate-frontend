import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import NavBar from './navigation/NavBar';
import Routes from './routes/Routes';
import { styled } from '@mui/material/styles';
import jwt from 'jsonwebtoken';
import useLocalStorage from './hooks/useLocalStorage';
import axios from 'axios';
import UserContext from './context/UserContext';
import PlantContext from './context/PlantContext';
import Loading from './alerts/Loading';
import useCollections from './collection/useCollections';
import { getCollections } from './collection/useCollections';

export const TOKEN_ID = 'watermate-user';
export const BASE_URL = process.env.APP_BASE_URL || 'http://127.0.0.1:5000';

/** Theme colors for App */
const theme = createTheme({
  palette: {
    primary: {
      main: '#F8DFD4'
    },
    secondary: {
      main: '#243246'
    },
    info: {
      main: '#6E7582'
    },
    warning: {
      main: '#F49C12'
    },
    success: {
      main: '#1CBC9B'
    },
    error: {
      main: '#B9423A'
    },
  },
});

/** Offset component so content isn't covered by the Toolbar when position is "fixed". */
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const App = () => {
  const [ token, setToken ] = useLocalStorage(TOKEN_ID);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ plantTypes, setPlantTypes ] = useState(null);
  const [ currentUser, setCurrentUser ] = useState(null);
  const [ error, collections, setCollections, handleCollectionRequest ] = useCollections();
  const [ userPlantCount, setUserPlantCount ] = useState(null);

  useEffect(() => {
    if (token) {
      loadPlantData();
      loadUserData();
      handleCollectionRequest(getCollections());
    }
    setIsLoading(false);
  }, [token]);

  async function loadUserData() {
    try {
      const payload = jwt.decode(token);
      const userId = payload['wm_user_id'];
      const userData = await axios.get(`${BASE_URL}/user/${userId}/`, { headers: {
        'content-type': 'application/json',
        'x-access-token': token
      }});

      setCurrentUser(userData.data.user);
      loadUserPlantCount(userData.data.user.id);
    } catch (err) {
      setCurrentUser(null);
    }
  }

  async function loadUserPlantCount(userId) {
    try {
      const plantCount = await axios.get(`${BASE_URL}/plant/count/${userId}/`, { headers: {
        'content-type': 'application/json',
        'x-access-token': token
      }});

      setUserPlantCount(plantCount.data.user_plant_count);
    } catch (err) {
      setUserPlantCount(null);
    }
  }

  async function loadPlantData() {
    try {
      const plantTypes = await axios.get(`${BASE_URL}/plant/types/`, { headers: {
        'content-type': 'application/json',
        'x-access-token': token
      }});
    
      setPlantTypes(plantTypes.data.plant_types);
    } catch (err) {
      setPlantTypes(null);
    }
  }

  function logout() {
    setToken(null);
    setCurrentUser(null);
    setCollections(null);
    setPlantTypes(null);
    setUserPlantCount(null);
  }

  if (isLoading) {
    return <Loading />
  } 
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, loadUserData, userPlantCount, collections }}>
      <PlantContext.Provider value={{ plantTypes }}>
        <ThemeProvider theme={theme}>
          <NavBar logout={logout} />
          <Offset />
          <Routes
            collections={collections}
            handleCollectionRequest={handleCollectionRequest}
            setToken={setToken}
          />
        </ThemeProvider>
        </PlantContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
