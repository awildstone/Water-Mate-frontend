import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import NavBar from './navigation/NavBar';
import Routes from './routes/Routes';
import { styled } from '@mui/material/styles';
import useLocalStorage from './hooks/useLocalStorage';
import UserContext from './context/UserContext';
import PlantContext from './context/PlantContext';
import Loading from './alerts/Loading';
import useCollections from './collection/useCollections';
import { getCollections } from './collection/useCollections';
import usePlantCount from './hooks/usePlantCount';
import useCurrentUser from './hooks/useCurrentUser';
import usePlantTypes from './hooks/usePlantTypes';

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
  const [plantTypes, setPlantTypes, handleGetPlantTypes] = usePlantTypes();
  const [currentUser, setCurrentUser, handleGetUserData] = useCurrentUser();
  const [ error, collections, setCollections, handleCollectionRequest ] = useCollections();
  const [userPlantCount, setUserPlantCount, handleGetPlantCount] = usePlantCount();

  const loadUserData = useCallback(async() => {
    const { id } = await handleGetUserData(token);
    handleGetPlantCount(id, token);
  }, [handleGetUserData, handleGetPlantCount, token]);

  useEffect(() => {
    if (token) {
      loadUserData();
      handleGetPlantTypes(token);
      handleCollectionRequest(getCollections(token));
    }
    setIsLoading(false);
  }, [token, handleCollectionRequest, handleGetPlantTypes, loadUserData]);

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
      <UserContext.Provider value={{ currentUser, token, loadUserData, userPlantCount }}>
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
