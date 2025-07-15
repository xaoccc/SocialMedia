import { Link } from 'react-router-dom';
import appRoutes from '../core/routes/routes.js';

const NotFound = () => {

    return (

        <section className='not-found'>
            <div className="not-found-text">
                <h1>Like unicorns, this page does not exist or is not available at the moment</h1>
                <h2>But just like them, it's magic and can take you wherever you want... Almost anywhere</h2>
                <div className="not-found-nav">
                    <Link to={appRoutes.LOGIN}>Return to the login page</Link>
                    <Link to={appRoutes.REGISTER}>Return to the register page</Link>
                </div>
            </div>
            <div className="unicorn"></div>

        </section>


    )
};

export default NotFound;