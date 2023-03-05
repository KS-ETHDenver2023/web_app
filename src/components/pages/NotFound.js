import { NavLink } from 'react-router-dom';
import './styles/notfound.css';

function NotFound(){
    return (
        <div className='notfound' >
            <text>Oh something went wrong, page not found...</text>
            <div>
                <button className='nfbtn'><NavLink to="/" exact>Go Home</NavLink></button>
            </div>
        </div>
    )
}

export default NotFound; 