import { NavLink } from "react-router-dom";

const ItemTemplate = ({ data }) => {

    return (
        <li className="my-10 bg-green-600 p-10">
            <p className="font-bold text-center">{data.title}</p>
            <div className="flex w-auto mx-auto my-10 place-content-center">
              <NavLink to={`/item/${data._id}`}> <img src={data.imageUrl} alt="item" className="object-cover w-56 h-56" /> </NavLink>
                <div className="flex flex-col justify-between">
                    <p className="w-56 my-5 mx-5">{data.description}</p>
                    <p className="font-medium my-5 mx-5">Category: {data.category}</p>
                    <p className="font-bold my-5 mx-5">Price: {data.price}</p>
                </div>
            </div>
        </li>
    )
}
export default ItemTemplate;