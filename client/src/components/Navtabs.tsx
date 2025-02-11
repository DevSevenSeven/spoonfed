import { Link } from 'react-router-dom';


const Nav = () => {
  const currentPage = window.location.pathname;

  return (
    <nav className="w-full py-4 bg-gray-50">
      <div className="container mx-auto px-4 flex gap-8">
        <Link
          to="/"
          className={`text-xl transition-colors ${currentPage === '/'
              ? 'text-blue-900 font-bold'
              : 'text-gray-500 hover:text-blue-700'
            }`}
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className={`text-xl transition-colors ${currentPage === '/dashboard'
              ? 'text-blue-900 font-bold'
              : 'text-gray-500 hover:text-blue-700'
            }`}
        >
          Recipes
        </Link>

        <Link
          to="/profile"
          className={`text-xl transition-colors ${currentPage === '/profile'
              ? 'text-blue-900 font-bold'
              : 'text-gray-500 hover:text-blue-700'
            }`}
        >
          Profile
        </Link>
        <Link
          to="/login"
          className={`text-xl transition-colors ${currentPage === '/login'
              ? 'text-blue-900 font-bold'
              : 'text-gray-500 hover:text-blue-700'
            }`}
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Nav;