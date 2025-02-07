import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../styles/dropdown.css";
const ProfileDropdown = () => {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };
    return (<Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-vertical">
      Spoonfed      
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleNavigation('/mainPage')}>Spoon fed</Dropdown.Item>
        <Dropdown.Item onClick={() => handleNavigation('/Dashboard')}>Recipes</Dropdown.Item>
        <Dropdown.Item onClick={() => handleNavigation('/UserProfilePage')}>My Profile</Dropdown.Item>
        <Dropdown.Item onClick={() => handleNavigation('/mainPage')}>Log out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>);
};
export default ProfileDropdown;
