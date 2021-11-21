import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import itemService from '../../service/itemService'

const DetailsPage = ({ match }) => {

    const [item, setItem] = useState({});
    const itemId = match.params.itemId

    useEffect(() => {
        itemService.getItem(itemId)
            .then(setItem)
    }, [itemId]);

    return (
        <div className="conteiner bg-green-600">
            <div>
                <p className="font-bold text-center">{item.title}</p>
                <div className="flex w-auto mx-auto my-10 place-content-center">
                    <img src={item.imageUrl} alt="item" className="object-cover w-56 h-56" />
                    <div className="flex flex-col justify-between">
                        <p className="w-56 my-5 mx-5">{item.description}</p>
                        <p className="font-medium my-5 mx-5">Category: {item.category}</p>
                        <p className="font-bold my-5 mx-5">Price: {item.price}</p>
                    </div>
                    <div className="flex flex-col">
                        <NavLink to={`/delete/${item._id}`} className="bg-green-700 text-center mt-2 p-2 rounded font-medium">Delete</NavLink>
                        <NavLink to={`/edit/${item._id}`} className="bg-green-700 text-center mt-2 p-2 rounded font-medium">Edit</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;