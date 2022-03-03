const PurchaseTemplate = ({ data, onClick }) => {
  return (
    <li className="relative mb-3 bg-blue-600 p-1 border border-b-2 border-blue-800 border-t-0 border-l-0 border-r-2">
      <div className="cursor-pointer close" onClick={() => onClick(data._id)}>
        X
      </div>
      <div className="flex justify-between">
        <div className="flex w-2/3 aspect-w-3 aspect-h-2 pr-1 pb-1">
          <div>
            <img
              src={data.imageUrl || "/images/coco.jpeg"}
              alt="item"
              className="object-cover w-20 h-16"
            />
          </div>
          <div>
            <p className="font-bold text-white pl-2">{data.title}</p>
            <p className="font-bold text-white pl-2">
              Table № {data.numberOfTable}
            </p>
            <p className="font-bold text-white pl-2">{data.comment}</p>
          </div>
        </div>
        <div className="self-center"></div>
        <div className="flex flex-col w-1/3 pr-10">
          <p className="text-white font-bold self-end">
            {data.quantity} x €{data.price}
          </p>
          <p className="text-green-400 font-bold self-end">
            {data.price * data.quantity}€
          </p>
        </div>
      </div>
    </li>
  );
};
export default PurchaseTemplate;
