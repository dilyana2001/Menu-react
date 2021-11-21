import { NavLink } from "react-router-dom";
import { useEffect } from "react";

import itemService from "../../service/itemService";

const DeleteItem = ({ match }) => {

    useEffect(() => {
        itemService.deleteItem(match.params.itemId)
    }, [match.params.itemId]);

    return (
        <div className="conteiner text-center text-5xl text-green-700 font-medium">
            <div className="mt-56">
                <p>You Deleted The Item!</p>
                <NavLink className="underline" to='/'>Go back to Menu</NavLink>
            </div>


        </div>
    );
}
export default DeleteItem;