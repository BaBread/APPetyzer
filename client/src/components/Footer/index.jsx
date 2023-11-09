import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div>
        <h2>About Us</h2>
        <Link>
          <h3
            className="m-1 text-red" to="/:github${user}">Charles Chavis
          </h3>
        </Link>
        <Link>
          <h3
            className="m-1 text-red" to="/:github${user}">Donald Leon
          </h3>
        </Link>
        <Link>
          <h3
            className="m-1 text-red" to="/:github${user}">Ricky Carter
          </h3>
        </Link>
        <Link>
          <h3
            className="m-1 text-red" to="/:github${user}">Robert Campbell Van Vliet II
          </h3>
        </Link>
      </div>
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h2>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by the Tech Thoughts team.
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
