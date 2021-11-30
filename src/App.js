import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { REFRESH_TOKEN_ID, TOKEN_ID } from './utils';
import './App.css';
import NavBar from './navigation/NavBar';
import Routes from './routes/Routes';
import { styled } from '@mui/material/styles';
import useLocalStorage from './hooks/useLocalStorage';
import UserContext from './context/UserContext';
import PlantContext from './context/PlantContext';
import Loading from './alerts/Loading';
import useCollections, { getCollections } from './collection/useCollections';
import usePlantCount from './hooks/usePlantCount';
import useCurrentUser from './hooks/useCurrentUser';
import usePlantTypes from './hooks/usePlantTypes';
import useRefreshToken from './hooks/useRefreshToken';
import { isValid, BASE_URL } from './utils';
import axios from 'axios';

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
  const [ refreshToken, setRefreshToken ] = useRefreshToken(REFRESH_TOKEN_ID);
  const [ isLoading, setIsLoading ] = useState(true);
  const [plantTypes, setPlantTypes, handleGetPlantTypes] = usePlantTypes();
  const [currentUser, setCurrentUser, handleGetUserData] = useCurrentUser();
  const [ error, collections, setCollections, handleCollectionRequest ] = useCollections();
  const [userPlantCount, setUserPlantCount, handleGetPlantCount] = usePlantCount();

  /** Loads current user data and gets the current user plant count (if count is null) */
  const loadUserData = useCallback(async (token) => {
    console.log('loading user data')
    const { id } = await handleGetUserData(token);
    if (id && userPlantCount === null) handleGetPlantCount(token, id);
  }, [handleGetUserData, userPlantCount, handleGetPlantCount]);

  /** Loads App data using an auth token. */
  const loadAppData = useCallback((token) => {
    console.log('loading app data')
    loadUserData(token);
    handleGetPlantTypes(token);
    handleCollectionRequest(getCollections(token));
  }, [loadUserData, handleGetPlantTypes, handleCollectionRequest]);

  /** Logs out user by resetting all app state. */
  const logout = useCallback(() => {
    setToken(null);
    setRefreshToken(null); 
    //do I need to null these?
    setCurrentUser(null);
    setCollections(null);
    setPlantTypes(null);
    setUserPlantCount(null);
  }, [setCollections, setCurrentUser, setPlantTypes, setRefreshToken, setToken, setUserPlantCount]);

  /** Attempts to get a new auth token for the current user using the refresh token. If the refresh token request fails, the user will be logged out to force re-authentication. */
  const getAuthToken = useCallback(async (refreshToken) => {
    const headers = { 'content-type': 'application/json', 'x-refresh-token': refreshToken };
    const url = `${BASE_URL}/token/refresh/`;
    const method = 'post';
    try {
      const newToken = await axios({ url, method, headers });
      console.log('got new tokens!', newToken);
      setToken(newToken.data.token);
      loadAppData(newToken.data.token);
    } catch (err) {
      console.log('error getting new auth token', err);
      console.log(err.data);
      logout();
    }
  }, [logout, setToken, loadAppData]);

  useEffect(() => {
    if (token && refreshToken) {
      //load app data if the auth token exists & is valid
      if (token && isValid(token)) {
        console.log('check token status in App useEffect');
        console.log('auth token is valid', token);
        loadAppData(token);
      
      //get a new auth token if the token is expired and refresh token exists & is valid
      } else if (!isValid(token) && refreshToken && isValid(refreshToken)) {
        console.log('check refresh token status in App useEffect');
        console.log('refresh token is valid', refreshToken);
        getAuthToken(refreshToken);
      
      //if both tokens are expired, log the user out to force re-authentication
      } else {
        logout();
      }
    }
    setIsLoading(false);
  }, [token, refreshToken, loadAppData, getAuthToken, logout]);

  if (isLoading) {
    return <Loading />
  } 
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, token, refreshToken, getAuthToken, loadUserData, userPlantCount }}>
      <PlantContext.Provider value={{ plantTypes }}>
        <ThemeProvider theme={theme}>
          <NavBar logout={logout} />
          <Offset />
          <Routes
            collections={collections}
            handleCollectionRequest={handleCollectionRequest}
            setToken={setToken}
            setRefreshToken={setRefreshToken}
          />
        </ThemeProvider>
        </PlantContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
