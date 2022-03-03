import { Fragment, useEffect, useState } from "react";

function PrintPage({ items, handler, isKitchen }) {
  const [bill, setBill] = useState(0);

  useEffect(() => {
    let sum = 0;
    if (isKitchen) {
      for (const x of items) {
        sum += Number(x.quantity) * Number(x.price);
      }
      setBill(sum);
    }
  }, [items, isKitchen]);

  return (
    <div className="modalDialog">
      <div>
        <div onClick={handler} className="close">
          X
        </div>
        <button className="pointer" onClick={() => window.print()}>
          print
        </button>
        <div>
          {items.map((x) => (
            <Fragment key={x._id}>
              <li>
                {x.quantity} x {x.title}
                <br />
                {isKitchen ? (
                  <span>{Number(x.quantity) * Number(x.price)}€</span>
                ) : (
                  ""
                )}
              </li>
            </Fragment>
          ))}
          <hr />
          {isKitchen ? <span>sum:{bill}€</span> : ""}
          <br />
        </div>
      </div>
    </div>
  );
}
export default PrintPage;
