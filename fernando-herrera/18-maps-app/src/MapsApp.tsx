import { PlacesProvider } from './context';
import { HomeScreen } from './screens/';

function MapsApp() {

  return (
    <PlacesProvider>
        <HomeScreen/> 
    </PlacesProvider>
  )
}

export default MapsApp;
