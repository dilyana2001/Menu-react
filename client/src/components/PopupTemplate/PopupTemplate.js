import { useState } from "react";
import itemService from "../../service/itemService";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";

const PopupTemplate = ({ item, handler }) => {
  const { isAuthenticated, numberOfTable } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(0);
  const [purchased, setPurchased] = useState(false);
  const [purchaseMeassage, setPurchaseMessage] = useState("");
  const [orderComment, setOrderComment] = useState("");

  if (quantity < 0) {
    setQuantity(0);
  }

  const purchaseHandler = () => {
    const data = {
      title: item.title,
      price: item.price,
      quantity: quantity,
      imageUrl: item.imageUrl,
      comment: orderComment,
      isKitchen: item.isKitchen,
      numberOfTable,
    };
    if (quantity === 0) return;

    itemService.purchaseItems(data).then(() => {
      setTimeout(() => {
        setPurchased(false);
        setPurchaseMessage("");
        setOrderComment("");
      }, 4000);
      setPurchased(quantity);
      setPurchaseMessage(
        `You added ${quantity} quantity of ${item.title}` +
          (orderComment && ` with note: "${orderComment}"!`)
      );
    });
  };

  const ReadyTemp = () => {
    return (
      <span className="fixed ml-2 p-1 rounded-3xl bg-green-500 text-white">
        <svg
          width={15}
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="check"
          className="svg-inline--fa fa-check fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
          ></path>
        </svg>
      </span>
    );
  };

  return (
    <div className="modalDialog">
      <div>
        <div onClick={handler} className="close">
          X
        </div>
        <div className="text-center">
          <div className="my-2">
            {isAuthenticated ? (
              <p className="font-bold text-center text-2xl mb-3">
                {item.title} <span className="text-red-500">{item.price}</span>€
              </p>
            ) : (
              <p className="font-bold text-center text-2xl mb-3">
                {item.title}
              </p>
            )}
          </div>
          <div className="aspect-w-3 aspect-h-2 mb-4">
            <img
              src={item.imageUrl || "/images/coco.jpeg"}
              alt="item"
              className="object-cover mx-auto"
              width={350}
            />
            {isAuthenticated ? (
              <>
                <div className="fixed -mt-6 left-0 right-0 rounded mx-auto">
                  <span
                    onClick={() => setQuantity(quantity - 1)}
                    className="bg-blue-400 text-blue-100 px-1.5 rounded py-0 cursor-pointer"
                  >
                    -
                  </span>
                  <span className="mx-1.5 px-1 text-blue-100 bg-blue-900">
                    {quantity}
                  </span>
                  <span
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-blue-400 text-blue-100 px-1 rounded py-0 cursor-pointer"
                  >
                    +
                  </span>
                  <span
                    onClick={purchaseHandler}
                    className="bg-blue-400 text-blue-100 px-1 rounded py-0 ml-4 cursor-pointer"
                  >
                    Purchase
                  </span>
                  <span>{purchased ? <ReadyTemp /> : ""}</span>
                  <br />
                </div>
                <div>
                  <input
                    className="border rounded mt-1 border-blue-300"
                    placeholder="White a note..."
                    type="text"
                    value={orderComment}
                    onChange={(e) => setOrderComment(e.target.value)}
                  />
                </div>
              </>
            ) : (
              ""
            )}
            <div>
              {purchased ? (
                <span className="text-xs  italic text-green-500">
                  {purchaseMeassage}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupTemplate;
