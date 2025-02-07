import { Link } from 'react-router-dom';
const Nav = () => {
    const currentPage = window.location.pathname;
    return (<nav className="w-full py-4 bg-gray-50">
      <div className="container mx-auto px-4 flex gap-8">
        <Link to="/" className={`text-xl transition-colors ${currentPage === '/'
            ? 'text-blue-900 font-bold'
            : 'text-gray-500 hover:text-blue-700'}`}>
          Home
        </Link>
        <Link to="/dashboard" className={`text-xl transition-colors ${currentPage === '/dashboard'
            ? 'text-blue-900 font-bold'
            : 'text-gray-500 hover:text-blue-700'}`}>
          Recipes
        </Link>
      
        <Link to="/profile" className={`text-xl transition-colors ${currentPage === '/profile'
            ? 'text-blue-900 font-bold'
            : 'text-gray-500 hover:text-blue-700'}`}>
          Profile
        </Link>
        <a href="./" className="btn btn-primary btn-sm active" role="button" aria-pressed="true">Log out</a>

        
        <a href='./' className="btn btn-primary btn-sm active" role="button" aria-pressed="true">Log in</a>

      <div>
    </div>
    <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"/>
      <span className="input-group-text border-0" id="search-addon">
        <i className="fas fa-search"></i>
        
        <a href='./Dashboard' className="btn btn-primary btn-small active text-teal-500 font bold " role="button" aria-pressed="true">Search</a>


       </span>
      </div>
    </nav>);
};
export default Nav;
