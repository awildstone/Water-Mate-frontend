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
      // loadCollections();
      handleCollectionRequest(getCollections());
    }
    setIsLoading(false);
  }, [token]);

  // async function handleRequest(request) {
  //   const data = request.data ? request.data : {};
  //   const params = request.params ? request.params : {};
  //   const method = request.method;
  //   const url = request.url;
  //   const headers = request.headers ? request.headers : {};
  //   try {
  //     let response = await axios({ method, url, data, headers, params});
  //     return { success: true, data: response.data }
  //   } catch (err) {
  //     const message = err.response.data.msg;
  //     console.error('API ERROR:', err);
  //     return { success: false, message };
  //   }
  // };

  async function loadUserData() {
      try {
        const payload = jwt.decode(token);
        const userId = payload['wm_user_id'];

        const userData = await axios.get(`${BASE_URL}/user/${userId}/`, { headers: {
          'content-type': 'application/json',
          'x-access-token': token
        }});

        console.log('LOAD USER DATA')
        console.log(userData);
        setCurrentUser(userData.data.user);
        loadUserPlantCount(userData.data.user.id);

      } catch (err) {
        console.error('Error', err);
        setCurrentUser(null);
      }
  }

  async function loadUserPlantCount(userId) {
    try {
      const plantCount = await axios.get(`${BASE_URL}/plant/count/${userId}/`, { headers: {
        'content-type': 'application/json',
        'x-access-token': token
      }});
      console.log('GET USER PLANT COUNT')
      console.log(plantCount.data.user_plant_count);
      setUserPlantCount(plantCount.data.user_plant_count);

    } catch (err) {
      console.error('Error', err);
      setUserPlantCount(null);
    }
  }

  // async function loadCollections() {
  //     try {
  //       let collectionsData = await handleGetFilteredResources('collection');
  //       setCollections(collectionsData.collections);
  //       setUserCollectionCount(collectionsData.collections.length);

  //       console.log('LOAD COLLECTIONS DATA & COUNT');
  //       console.log(collectionsData);
  //       console.log(collectionsData.collections.length);

  //       return collectionsData;
  //     } catch (err) {
  //       console.error('Error', err);
  //     }
  // }

  async function loadPlantData() {
    try {
      const plantTypes = await axios.get(`${BASE_URL}/plant/types/`, { headers: {
        'content-type': 'application/json',
        'x-access-token': token
      }});
      console.log('LOAD PLANT TYPES');
      console.log(plantTypes);
      setPlantTypes(plantTypes.data.plant_types);

    } catch (err) {
      console.error('Error', err);
    }
}

  // async function getRooms(query) {
  //     try {
  //       const roomsData = await handleGetFilteredResources('room', query);
  //       console.log('LOAD ROOMS DATA')
  //       console.log(roomsData);
  //       return roomsData.rooms
  //     } catch (err) {
  //       console.error('Error', err);
  //       return []
  //     }
  // }

  // async function getPlants(query) {
  //     try {
  //       const plantsData = await handleGetFilteredResources('plant', query);
  //       console.log('LOAD PLANTS DATA')
  //       console.log(plantsData);
  //       return plantsData.plants
  //     } catch (err) {
  //       console.error('Error', err);
  //     }
  // }

  // async function getPlantsToWater(page, query) {
  //     try {
  //       const plantsToWaterData = await handleGetFilteredResources(`plant/water-schedule/${page}`, query);
  //       console.log('GET PLANTS TO WATER')
  //       console.log(plantsToWaterData);
  //       return plantsToWaterData
  //     } catch (err) {
  //       console.error('Error', err);
  //     }
  // }

  // async function getPlant(id) {
  //     try {
  //       const plantData = await axios.get(`${BASE_URL}/plant/${id}/`, { headers: {
  //         'content-type': 'application/json',
  //         'x-access-token': token
  //       }});
  //       console.log('GET PLANT DATA')
  //       console.log(plantData);
  //       return plantData.data.plant
  //     } catch (err) {
  //       console.error('Error', err);
  //     }
  // }

  // async function getHistory(plant_id, page) {
  //     try {
  //       const history = await axios.get(`${BASE_URL}/plant/history/${plant_id}/${page}/`, { headers: {
  //         'content-type': 'application/json',
  //         'x-access-token': token
  //       }});
  //       console.log('GET HISTORY')
  //       console.log(history);
  //       return history.data;
  //     } catch (err) {
  //       console.error('Error', err);
  //     }
  // }

  async function signup(signupData) {
    const { city, state, country, name, username, email, password } = signupData;
    try {
      let userToken = await axios.post(`${BASE_URL}/signup/`, { city, state, country, name, username, email, password });
      setToken(userToken.data.token);
      return { success: true }
    } catch (err) {
      const message = err.response.data.msg;
      return { success: false, message };
    }
  };

  async function login(loginData) {
    const { username, password } = loginData;
    try {
      let userToken = await axios.post(`${BASE_URL}/login/`, { username, password });
      setToken(userToken.data.token);
      return { success: true }
    } catch (err) {
      const message = err.response.data.msg;
      return { success: false, message };
    }
  };

  async function handleUpdateSchedule(action, schedule_id, data) {
    const headers = {
      'content-type': 'application/json',
      'x-access-token': token
    };

      try {
        let response = await axios.post(`${BASE_URL}/schedule/${schedule_id}/${action}/`, data, { headers });
        if (response) loadUserData();
        return { success: true }
      } catch (err) {
        const message = err.response.data.msg;
        return { success: false, message };
      }
  }

  // async function handleGetFilteredResources(resource, query) {
  //   const headers = {
  //     'content-type': 'application/json',
  //     'x-access-token': token
  //   };

  //   const params = query ? query : '';

  //   try {
  //     let response = await axios({
  //       method: 'get',
  //       url: `${BASE_URL}/${resource}/`,
  //       headers: headers,
  //       params: params
  //     });
  //     return response.data
  //   } catch (err) {
  //     const message = err.response.data.msg;
  //     return { success: false, message };
  //   }
  // }

  // async function handleAddResource(resource, data, file) {
  //   const headers = {
  //     'content-type': (file ? file : 'application/json'),
  //     'x-access-token': token
  //   };
  //   try {
  //     let response = await axios.post(`${BASE_URL}/${resource}/`, data, { headers });
  //     // if (response) loadCollections();
  //     return { success: true }
  //   } catch (err) {
  //     const message = err.response.data.msg;
  //     return { success: false, message };
  //   }
  // }

  // async function handleEditResource(resource, id, data, file) {
  //   const headers = {
  //     'content-type': (file ? file : 'application/json'),
  //     'x-access-token': token
  //   };
  //   try {
  //     let response = await axios.patch(`${BASE_URL}/${resource}/${id}/`, data, { headers });
  //     // if (response) loadCollections();
  //     return { success: true }
  //   } catch (err) {
  //     const message = err.response.data.msg;
  //     return { success: false, message };
  //   }
  // }

  // async function handleDeleteResource(resource, id) {
  //   const headers = {
  //     'content-type': 'application/json',
  //     'x-access-token': token
  //   };
  //   try {
  //     let response = await axios.delete(`${BASE_URL}/${resource}/${id}/`, { headers });
  //     // if (response) loadCollections();
  //     return { success: true }
  //   } catch (err) {
  //     const message = err.response.data.msg;
  //     return { success: false, message };
  //   }
  // }

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
            login={login} 
            signup={signup}
          />
        </ThemeProvider>
        </PlantContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
