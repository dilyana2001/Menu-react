import { NavLink } from 'react-router-dom';

const Header = () => {

    return (
        <div className="bg-green-700 h-20 w-full">
            <nav>
                <ul className="flex justify-between mx-56">
                    <li><NavLink to='/'> <h1 className="text-green-200 font-bold text-5xl center text-center">Menu</h1></NavLink></li>
                    <li className="self-center cursor-pointer"> <NavLink to='/search'> <i className="fas fa-search"></i></NavLink></li>
                    <li className="fixed bottom-0 right-0 text-9xl text-green-600 text-center"><NavLink to='/create'><i className="fas fa-plus"></i></NavLink></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;