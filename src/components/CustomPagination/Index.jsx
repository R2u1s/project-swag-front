import Pagination from "@mui/material/Pagination";
import { useEffect, useState, useMemo } from "react";
import { getCatalog, getCountCatalog } from "../../shared/api";
import useStore from "../../shared/store";
import { categoryCatalog } from "../../shared/api";

export default function CustomPagination({activeCategory}) {
  const [pagination, setPagination] = useState(0);
  const { setItems, setLoader, page } = useStore();

  useEffect(() => {
    getCountCatalog().then((data) => {
      setPagination(Math.ceil(data[0].count / 11));
    });
  }, []);

  const content = useMemo(
    () => {
      return <div>
        <Pagination
          count={pagination}
          shape="rounded"
          page={page}
          onClick={(e) => {
            setLoader(true);
            activeCategory ? // если категория есть ищем по категории товары, если нет - то каталог по дефолу - надо поправить
              categoryCatalog(activeCategory,
                10,
                page
              )
                .then((data) => {
                  setItems(data);
                  setLoader(false);
                })
                .finally(() => setLoader(false))
              :
              getCatalog(
                +e.target.textContent * 11 - 11,
                +e.target.textContent * 11
              )
                .then((data) => {
                  setItems(data);
                  setLoader(false);
                })
                .finally(() => setLoader(false))
          }}
        />
      </div>
    },
    [activeCategory, page]
  );

  return (
    <>
      {content}
    </>
  );
}
