import { useEffect, useState } from 'react';

import itemService from '../../service/itemService'
import ItemTemplate from '../ItemTemplate/ItemTemplate';


const HomePage = () => {

    const [items, getItems] = useState([]);

    useEffect(() => {
        itemService.getAllItems()
            .then(getItems)
    }, []);

    return (
        <div className="conteiner">
            <ul>
            {items.map(x => <ItemTemplate
                key={x._id}
                data={x}
            />
            )}
            </ul>
        </div>
    );
}

export default HomePage;