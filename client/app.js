import { Outlet } from 'react-router-dom';
import Nav from './src/components/Navtabs';
function App() {
    return (<div>
      <Nav />
      <Outlet />
    </div>);
}
export default App;
