import itemService from '../../service/itemService'

const CreateItem = ({ history }) => {

    const createPostHandler = (e) => {
        e.preventDefault();

        const { title, imageUrl, price, category, description } = e.target;
        const data = {
            title: title.value,
            imageUrl: imageUrl.value,
            price: price.value,
            category: category.value,
            description: description.value
        }

        itemService.postItem(data)
            .then(() => {
                history.push('/');
            })
    }

    return (
        <div>
            <div className="conteiner ">
                <form onSubmit={createPostHandler} className="flex flex-col w-96 mx-auto my-10">
                    <h2 className="font-bold text-center text-2xl">Create Item</h2>
                    <label htmlFor="title">Title:</label>
                    <input type="text" placeholder="title" name="title" id="title" className="rounded bg-gray-100 p-1"/>
                    <label htmlFor="imageURL">Image URL:</label>
                    <input type="text" placeholder="imageURL" name="imageUrl" id="imageURL" className="rounded bg-gray-100 p-1"/>
                    <label htmlFor="price">Price:</label>
                    <input type="text" placeholder="price" name="price" id="price" className="rounded bg-gray-100 p-1"/>
                    <label htmlFor="category">Category:</label>
                    <input type="text" placeholder="category" name="category" id="category" className="rounded bg-gray-100 p-1"/>
                    <label htmlFor="description">Description:</label>
                    <textarea type="text" placeholder="Description" name="description" id="description" className="rounded bg-gray-100 p-1" rows="5"/>
                    <button className="bg-green-500 w-24 rounded mt-5 self-center font-medium">Add Item!</button>
                </form>
            </div>
        </div>
    )
}
export default CreateItem;