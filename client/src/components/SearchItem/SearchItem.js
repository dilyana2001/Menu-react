import itemService from '../../service/itemService';
import ItemTemplate from '../../components/ItemTemplate/ItemTemplate';
import { useState } from 'react';

const SearchItem = () => {

    const [result, setResult] = useState([]);

    const searchHandler = (e) => {
        const nameOfButton = e.target.textContent;
        const string = e.target.parentNode.parentNode.querySelector('input').value;
        let type = '';

        if (nameOfButton.includes('category')) {
            type = 'category';
        } else if (nameOfButton.includes('title')) {
            type = 'title';
        }

        itemService.searchBy(string, type)
            .then(setResult);
    }
    console.log(result)

    return (
        <div>
            <div className="w-96 flex flex-col mx-auto my-10">
                <p className="font-bold text-3xl text-center mb-10 bg-green-500 w-44 self-center">Search</p>
                <ul className="nav-items flex justify-end items-center flex-col">
                    <li className="mb-10 flex flex-col">
                        <input type="text" placeholder="Search by..." className="p-1 my-1 rounded bg-gray-100 w-96" />
                        <div className="self-center">
                            <button onClick={searchHandler} className="bg-green-500 font-medium mt-1 rounded mr-1 mt-2 w-44">Search by category</button>
                            <button onClick={searchHandler} className="bg-green-500 font-medium mt-1 rounded mr-1 mt-2 w-44">Search by title</button>
                        </div>
                    </li>
                </ul>
            </div>
            <ul>
                {result?.map(x =>
                    <ItemTemplate
                        key={x._id}
                        data={x}
                    />)}
            </ul>
        </div>

    );
}

export default SearchItem;