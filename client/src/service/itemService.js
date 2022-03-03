const baseUrl = "http://localhost:5555/api";

function getAllItems() {
  return fetch(`${baseUrl}`)
    .then((res) => res.json())
    .catch((err) => console.error(err.message));
}

function getPageItems(page) {
  return fetch(`${baseUrl}/page=${page}`)
    .then((res) => res.json())
    .catch((err) => console.error(err.message));
}

function postItem(data) {
  const token = localStorage.getItem("token");
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
}

function getItem(id) {
  return fetch(`${baseUrl}/${id}`)
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
}

function editItem(id, data) {
  const token = localStorage.getItem("token");
  return fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
}

function deleteItem(id) {
  const token = localStorage.getItem("token");
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
}

function searchByName(string) {
  return fetch(`${baseUrl}/title/${string}`)
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
}

function searchCategory(categoryString) {
  return fetch(`${baseUrl}/category/${categoryString}`)
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
}

function searchSubcategory(categoryString, subcategoryString) {
  return fetch(
    `${baseUrl}/category/${categoryString}/subcategory/${subcategoryString}`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
}

function getAllPurchases() {
  const token = localStorage.getItem("token");
  return fetch(`${baseUrl}/purchases`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err.message));
}

function getPurchaseByTable(table) {
  const token = localStorage.getItem("token");
  return fetch(`${baseUrl}/purchases/${table}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err.message));
}

function purchaseItems(data) {
  const token = localStorage.getItem("token");
  return fetch(`${baseUrl}/purchases`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
}

function deletePurchase(id) {
  const token = localStorage.getItem("token");
  return fetch(`${baseUrl}/purchases/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
}

function deleteByTable(number) {
  const token = localStorage.getItem("token");
  return fetch(`${baseUrl}/purchases/table/${number}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
}

const fetchFunctions = {
  getAllItems,
  getPageItems,
  postItem,
  getItem,
  editItem,
  deleteItem,
  searchByName,
  searchCategory,
  searchSubcategory,
  getAllPurchases,
  purchaseItems,
  getPurchaseByTable,
  deletePurchase,
  deleteByTable,
};

export default fetchFunctions;
