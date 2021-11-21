import itemService from '../../service/itemService';
import { useState, useEffect } from 'react';

const EditItem = ({ history, match }) => {

    const [item, setItem] = useState({});
    const itemId = match.params.itemId;

    useEffect(() => {
        itemService.getItem(itemId)
            .then(setItem)
    }, [itemId]);


    const editPostHandler = (e) => {
        e.preventDefault();

        const { title, imageUrl, price, category, description } = e.target;

        const itemId = item._id;

        const data = {
            title: title.value,
            imageUrl: imageUrl.value,
            price: price.value,
            category: category.value,
            description: description.value
        }

        itemService.editItem(itemId, data)
            .then(() => {
                history.push(`/item/${item._id}`);
            })
    }

    return (
        <div>
            <div className="conteiner ">
                <form onSubmit={editPostHandler} className="flex flex-col w-96 mx-auto my-10">
                    <h2 className="font-bold text-center text-2xl">Edit Item</h2>
                    <label htmlFor="title">Title:</label>
                    <input type="text" placeholder="title" name="title" id="title" className="rounded bg-gray-100 p-1" defaultValue={item.title}/>
                    <label htmlFor="imageURL">Image URL:</label>
                    <input type="text" placeholder="imageURL" name="imageUrl" id="imageURL" className="rounded bg-gray-100 p-1" defaultValue={item.imageUrl}/>
                    <label htmlFor="price">Price:</label>
                    <input type="text" placeholder="price" name="price" id="price" className="rounded bg-gray-100 p-1" defaultValue={item.price}/>
                    <label htmlFor="category">Category:</label>
                    <input type="text" placeholder="category" name="category" id="category" className="rounded bg-gray-100 p-1" defaultValue={item.category}/>
                    <label htmlFor="description">Description:</label>
                    <textarea type="text" placeholder="Description" name="description" id="description" className="rounded bg-gray-100 p-1" rows="5" defaultValue={item.description}/>
                    <button className="bg-green-500 w-24 rounded mt-5 self-center font-medium">Edit Item!</button>
                </form>
            </div>
        </div>
    )
}
export default EditItem;