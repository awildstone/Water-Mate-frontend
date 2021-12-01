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

/** Renders App */
const App = () => {
  const [ token, setToken ] = useLocalStorage(TOKEN_ID);
  const [ refreshToken, setRefreshToken ] = useRefreshToken(REFRESH_TOKEN_ID);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ plantTypes, handleGetPlantTypes ] = usePlantTypes();
  const [ currentUser, setCurrentUser, handleGetUserData ] = useCurrentUser();
  const [ error, collections, handleCollectionRequest ] = useCollections();

  /** Loads current user data. */
  const loadUserData = useCallback(async (token) => {
    await handleGetUserData(token);
  }, [handleGetUserData]);

  /** Loads App data using an auth token. */
  const loadAppData = useCallback((token) => {
    loadUserData(token);
    handleGetPlantTypes(token);
    handleCollectionRequest(getCollections(token));
  }, [loadUserData, handleGetPlantTypes, handleCollectionRequest]);

  /** Logs out user by resetting all app state. */
  const logout = useCallback(() => {
    setToken(null);
    setRefreshToken(null); 
    setCurrentUser(null);
  }, [setCurrentUser, setRefreshToken, setToken]);

  /** Attempts to get a new auth token for the current user using the refresh token. 
  * If the refresh token request fails, the user will be logged out to force re-authentication. 
  */
  const getAuthToken = useCallback(async (refreshToken) => {
    const headers = { 'content-type': 'application/json', 'x-refresh-token': refreshToken };
    const url = `${BASE_URL}/token/refresh/`;
    const method = 'post';
    try {
      const newToken = await axios({ url, method, headers });
      setToken(newToken.data.token);
      loadAppData(newToken.data.token);
    } catch (err) {
      logout();
    }
  }, [logout, setToken, loadAppData]);

  /** 
  * Loads initial app data if the auth token exists and is valid.
  * Gets a new auth token if auth token is expired (then loads app data).
  * If both auth & refresh tokens are invalid, logs the user out to force reauthentication.
  */
  useEffect(() => {
    if (token && refreshToken) {
      if (token && isValid(token)) {
        loadAppData(token);
      } else if (!isValid(token) && refreshToken && isValid(refreshToken)) {
        getAuthToken(refreshToken);
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
      <UserContext.Provider value={{ currentUser, token, refreshToken, getAuthToken, loadUserData }}>
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
