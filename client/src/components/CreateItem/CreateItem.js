import itemService from "../../service/itemService";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import { Switch } from "@headlessui/react";

const CreateItem = ({ history }) => {
  const [enabled, setEnabled] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const createPostHandler = (e) => {
    e.preventDefault();

    const { title, imageUrl, price, category, description, subcategory } =
      e.target;

    if (!title.value || !price.value || !category.value || !subcategory.value) {
      return;
    }

    const data = {
      title: title.value,
      imageUrl: imageUrl.value,
      price: price.value,
      category: category.value,
      subcategory: subcategory.value,
      description: description.value,
      isKitchen: enabled,
    };

    itemService.postItem(data).then((data) => {
      history.push(`/item/${data._id}`);
    });
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-center text-2xl text-blue-900 mb-3">
        Add Item
      </h2>
      <form
        onSubmit={createPostHandler}
        className="flex flex-col w-96 mx-auto bg-blue-600 p-5 text-blue-100"
      >
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          placeholder="title"
          name="title"
          id="title"
          className=" bg-gray-100 p-1"
        />
        <label htmlFor="imageURL">Image URL:</label>
        <input
          type="text"
          placeholder="imageURL"
          name="imageUrl"
          id="imageURL"
          className=" bg-gray-100 p-1"
        />
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          placeholder="price"
          name="price"
          id="price"
          className=" bg-gray-100 p-1"
        />
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          placeholder="category"
          name="category"
          id="category"
          className=" bg-gray-100 p-1"
        />
        <label htmlFor="subcategory">Subcategory:</label>
        <input
          type="text"
          placeholder="subcategory"
          name="subcategory"
          id="subcategory"
          className=" bg-gray-100 p-1"
        />
        <label htmlFor="kitchen">Kitchen item:</label>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={classNames(
            enabled ? "bg-indigo-600" : "bg-gray-200",
            "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            className={classNames(
              enabled ? "translate-x-5" : "translate-x-0",
              "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
            )}
          >
            <span
              className={classNames(
                enabled
                  ? "opacity-0 ease-out duration-100"
                  : "opacity-100 ease-in duration-200",
                "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
              )}
              aria-hidden="true"
            >
              <svg
                className="h-3 w-3 text-gray-400"
                fill="none"
                viewBox="0 0 12 12"
              >
                <path
                  d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              className={classNames(
                enabled
                  ? "opacity-100 ease-in duration-200"
                  : "opacity-0 ease-out duration-100",
                "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
              )}
              aria-hidden="true"
            >
              <svg
                className="h-3 w-3 text-indigo-600"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
              </svg>
            </span>
          </span>
        </Switch>
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          placeholder="Description"
          name="description"
          id="description"
          className=" bg-gray-100 p-1"
          rows="5"
        />
        <button className="bg-blue-900 text-blue-100 w-24 rounded mt-5 self-center font-medium">
          Add
        </button>
      </form>
    </div>
  );
};
export default withRouter(CreateItem);
