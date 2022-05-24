import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import UserIndex from './components/users/userIndex';
import Frontpage from './components/frontpage';
const App = () => {
  const user = useSelector(selectUser);
  return (
    <div className="App">
     {user ? <UserIndex/> : <Frontpage/> }
    </div>
  );
}

export default App;
