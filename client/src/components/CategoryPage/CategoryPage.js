import { useEffect, useState } from "react";
import itemService from "../../service/itemService";
import ItemTemplate from "../ItemTemplate/ItemTemplate";
import CategoryTemplate from "../CategoryTemplate/CategoryTemplate";
import SubcategoryTemplate from "../SubcategoryTemplate/SubcategoryTemplate";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const CategoryPage = ({ match }) => {
  const [items, setItems] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isPagination, setIsPagination] = useState(true);
  const [page, setPage] = useState(1);
  const [pagiNumber, setPagiNumber] = useState(1);
  const [pagiMenu, setPagiMenu] = useState([]);

  const filteredCategories = [];
  const allSubcategories = [];

  useEffect(() => {
    itemService.getAllItems().then((data) => {
      setAllCategories(data);
      setPagiNumber(Math.ceil(data.length / 10));
    });
  }, []);

  useEffect(() => {
    itemService.getPageItems(page).then(setPagiMenu);
    setIsPagination(true);
  }, [page]);

  useEffect(() => {
    itemService.searchCategory(match.params.category).then(setItems);
    match.params.category ? setIsPagination(false) : setIsPagination(true);
  }, [match.params.category]);

  useEffect(() => {
    let subcategoryItems = [];
    subcategoryItems = items.filter(
      (x) => x.subcategory === match.params.subcategory
    );
    setSubCategories(subcategoryItems);
  }, [match.params.subcategory, items]);

  allCategories.map((x) => filteredCategories.push(x.category));
  const uniqueCategories = filteredCategories.filter(
    (value, index, self) => self.indexOf(value) === index
  );

  items.map((x) => allSubcategories.push(x.subcategory));
  const uniqueSubcategories = allSubcategories
    .filter((x) => x !== match.params.category)
    .filter((value, index, self) => self.indexOf(value) === index);

  const onChangePaginationHandler = (е, value) => {
    setPage(value);
  };

  return (
    <div className="w-5/5 mx-auto">
      <ul className="w-4/5 mx-auto flex flex-wrap justify-center mt-5">
        {uniqueCategories?.map((x) => (
          <CategoryTemplate key={x} data={x} />
        ))}
      </ul>
      <ul className="w-4/5 mx-auto flex flex-wrap justify-center subcategory-ul">
        <div></div>
        {uniqueSubcategories?.map((x) => (
          <SubcategoryTemplate
            key={x}
            data={x}
            parent={match.params.category}
          />
        ))}
      </ul>
      <ul className="w-9/9 mx-auto mb-10">
        {subCategories.length || items.length
          ? subCategories.length
            ? subCategories?.map((x) => <ItemTemplate key={x._id} data={x} />)
            : items?.map((x) => <ItemTemplate key={x._id} data={x} />)
          : pagiMenu.length
          ? pagiMenu.map((x) => <ItemTemplate key={x._id} data={x} />)
          : ""}
      </ul>
      {isPagination && (
        <Stack spacing={2}>
          <Pagination
            className="pagination mb-5 self-center"
            count={pagiNumber}
            shape="rounded"
            onChange={onChangePaginationHandler}
          />
        </Stack>
      )}
    </div>
  );
};

export default CategoryPage;
