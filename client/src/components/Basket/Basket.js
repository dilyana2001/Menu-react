import { useState, useEffect, Fragment } from "react";
import itemService from "../../service/itemService";
import PurchaseTemplate from "../PurchaseTemplate/PurchaseTemplate";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";
import { withRouter } from "react-router-dom";
import PrintPage from "../PrintPage/PrintPage";

const Basket = () => {
  const { isAdmin, isAuthenticated, numberOfTable } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [itemsByTable, setItemsByTable] = useState([]);
  const [popup, setPopup] = useState(false);
  const [popupBill, setPopupBill] = useState(false);
  const [popupItems, setPopupItems] = useState([]);
  const [bill, setBill] = useState(0);

  let numberOfTablesArr = [];
  let dataByTables = {};

  useEffect(() => {
    itemService.getAllPurchases().then(setItems);
  }, []);

  useEffect(() => {
    itemService.getPurchaseByTable(numberOfTable).then(setItemsByTable);
  }, [numberOfTable]);

  useEffect(() => {
    let sum = 0;
    if (!itemsByTable || !itemsByTable.length) {
      return;
    }
    itemsByTable.map((x) => (sum += Number(x.quantity) * Number(x.price)));
    setBill(sum);
  }, [itemsByTable]);

  function deleteItemHandler(id) {
    const ifDelete = window.confirm("Are u sure?");
    if (ifDelete) {
      itemService.deletePurchase(id);
      setItems(items.filter((x) => x._id !== id));
    }
  }

  function deleteTableHandler(num) {
    const ifDelete = window.confirm("Are u sure?");
    if (ifDelete) {
      itemService.deleteByTable(num);
      setItems(items.filter((x) => x.numberOfTable !== num));
    }
  }

  if (!items || !items.length) {
    return <p>no purchases</p>;
  }

  items.map((x) => numberOfTablesArr.push(x.numberOfTable));
  const uniqueTables = numberOfTablesArr
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b);

  items.map((x) => {
    if (!dataByTables.hasOwnProperty(x.numberOfTable)) {
      dataByTables[x.numberOfTable] = [];
    }
    return dataByTables[x.numberOfTable].push(x);
  });

  function printTableHandler(num) {
    setPopup(true);
    setPopupItems(
      items.filter((x) => x.numberOfTable === num).filter((x) => x.isKitchen)
    );
  }

  function printTableBillHandler(num) {
    setPopupBill(true);
    setPopupItems(items.filter((x) => x.numberOfTable === num));
  }

  const DeleteTableTemplate = ({ data, onClick }) => {
    return (
      <li
        className="cursor-pointer underline my-1"
        onClick={() => onClick(data)}
      >
        delete Table № {data}
      </li>
    );
  };

  const PrintTableTemplate = ({ data, onClick }) => {
    return (
      <li
        className="cursor-pointer underline my-1"
        onClick={() => onClick(data)}
      >
        print Table № {data}
      </li>
    );
  };

  return (
    <div className="w-5/5 mx-auto mb-10">
      <p className="text-blue-900 font-bold text-2xl text-center my-5">
        My Purchase
      </p>
      {isAuthenticated && isAdmin ? (
        <p>
          Table № {numberOfTable}: Sum:{bill}€
        </p>
      ) : (
        ""
      )}
      <div className="flex mx-10">
        {isAuthenticated && isAdmin ? (
          <ul className="w-1/9 mx-auto">
            {uniqueTables?.map((x) => (
              <DeleteTableTemplate
                data={x}
                key={x}
                onClick={() => deleteTableHandler(x)}
              />
            ))}{" "}
          </ul>
        ) : (
          ""
        )}

        <ul className="w-2/3 mx-auto">
          {popup && (
            <PrintPage
              items={popupItems}
              handler={() => setPopup(false)}
              isKitchen={false}
            />
          )}
          {popupBill && (
            <PrintPage
              items={popupItems}
              handler={() => setPopupBill(false)}
              isKitchen={true}
            />
          )}
          {isAuthenticated && isAdmin && items.length !== 0
            ? Object.entries(dataByTables).map((x) => (
                <Fragment key={x[0]}>
                  <p>Table № {x[0]}</p>
                  {x[1].map((y) => (
                    <PurchaseTemplate
                      key={y._id}
                      data={y}
                      onClick={() => deleteItemHandler(y._id)}
                    />
                  ))}
                </Fragment>
              ))
            : ""}
          {isAuthenticated && !isAdmin && itemsByTable.length !== 0 ? (
            <>
              {itemsByTable.map((x) => (
                <PurchaseTemplate
                  key={x._id}
                  data={x}
                  onClick={() => deleteItemHandler(x._id)}
                />
              ))}
              <span className="bg-blue-500 text-white px-2 py-1 font-bold">
                Sum:{bill}€
              </span>
            </>
          ) : (
            ""
          )}
        </ul>

        {isAuthenticated && isAdmin ? (
          <ul className="w-1/9 mx-auto">
            {uniqueTables?.map((x) => (
              <PrintTableTemplate
                data={x}
                key={x}
                onClick={() => printTableHandler(x)}
              />
            ))}
          </ul>
        ) : (
          ""
        )}
        {isAuthenticated && isAdmin ? (
          <ul className="w-1/9 mx-auto">
            {uniqueTables?.map((x) => (
              <PrintTableTemplate
                data={x}
                key={x}
                onClick={() => printTableBillHandler(x)}
              />
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default withRouter(Basket);
