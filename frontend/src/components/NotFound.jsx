import { Link } from 'react-router-dom';
import appRoutes from '../core/routes/routes.js';

const NotFound = () => {

    return (

        <section className='not-found'>
            <div className="not-found-text">
                <h1>Llike unicorns, this page does not exist... or at least not anymore</h1>
                <h2>But just like them, it's magic and can take you wherever you want</h2>
                <Link to={appRoutes.HOME}>Return to the Home page</Link>
                <div className="404">
                    <span>error</span>
                    <span>404</span>
                </div>

            </div>
            <div className="unicorn"></div>

        </section>


    )
};

export default NotFound;