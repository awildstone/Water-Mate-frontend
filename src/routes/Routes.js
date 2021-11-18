import { Route, Switch, Redirect } from 'react-router-dom';
import Landing from '../pages/Landing';
import About from '../pages/About';
import GetStarted from '../pages/GetStarted';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Profile from '../profile/Profile';
import WaterManager from '../pages/WaterManager';
import PlantDetails from '../plant/PlantDetails';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';


const Routes = ({
    collections,
    handleCollectionRequest,
    handleRequest,
    plantTypes,
    userPlantCount,
    getPlants,
    getPlantsToWater, 
    getPlant, 
    login, 
    signup, 
    handleAdd, 
    handleEdit, 
    handleDelete,
    handleUpdateSchedule,
    getHistory}) => {

    return (
        <Switch>
            <Route exact path='/'>
                <Landing />
            </Route>

            <Route exact path='/login/'>
                <Login login={login} />
            </Route>

            <Route exact path='/signup/'>
                <Signup signup={signup} />
            </Route>

            <Route exact path='/about/'>
                <About />
            </Route>

            <ProtectedRoute exact path='/get-started/'>
                <GetStarted />
            </ProtectedRoute>

            <ProtectedRoute exact path='/dashboard'>
                <Dashboard
                    collections={collections}
                    handleCollectionRequest={handleCollectionRequest}
                    getPlants={getPlants}
                    getPlant={getPlant}
                    handleAdd={handleAdd} 
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete} 
                />
            </ProtectedRoute>

            <ProtectedRoute exact path='/water-manager'>
                <WaterManager 
                    userPlantCount={userPlantCount}
                    getPlantsToWater={getPlantsToWater} 
                    getPlants={getPlants}
                    handleUpdateSchedule={handleUpdateSchedule}
                    handleRequest={handleRequest}
                />
            </ProtectedRoute>

            <ProtectedRoute exact path='/profile'>
                <Profile 
                    // collections={collections}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete} 
                    handleRequest={handleRequest}
                />
            </ProtectedRoute>
            
            <ProtectedRoute exact path='/plant/:id'>
                <PlantDetails
                    plantTypes={plantTypes}
                    getPlant={getPlant} 
                    // collections={collections}
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete} 
                    getHistory={getHistory}
                    handleRequest={handleRequest}
                />
            </ProtectedRoute>

            <Redirect to='/' />

        </Switch>
    );
}

export default Routes;