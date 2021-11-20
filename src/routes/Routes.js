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
    userPlantCount,
    getPlantsToWater, 
    login, 
    signup, 
    handleEdit, 
    handleDelete,
    handleUpdateSchedule,
    getHistory }) => {

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
                />
            </ProtectedRoute>

            <ProtectedRoute exact path='/water-manager'>
                <WaterManager 
                    userPlantCount={userPlantCount}
                    getPlantsToWater={getPlantsToWater} 
                    handleUpdateSchedule={handleUpdateSchedule}
                    handleRequest={handleRequest}
                />
            </ProtectedRoute>

            <ProtectedRoute exact path='/profile'>
                <Profile 
                    collections={collections}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete} 
                    handleRequest={handleRequest}
                />
            </ProtectedRoute>
            
            <ProtectedRoute exact path='/plant/:id'>
                <PlantDetails
                    collections={collections}
                    handleEdit={handleEdit}
                    getHistory={getHistory}
                    handleRequest={handleRequest}
                />
            </ProtectedRoute>

            <Redirect to='/' />

        </Switch>
    );
}

export default Routes;