import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { getCatalog, getCountCatalog } from "../../shared/api";
import useStore from "../../shared/store";

export default function CustomPagination() {
  const [pagination, setPagination] = useState(0);
  const { setItems, setLoader } = useStore();

  useEffect(() => {
    getCountCatalog().then((data) => {
      setPagination(Math.ceil(data[0].count / 11));
    });
  }, []);
  return (
    <div>
      <Pagination
        count={pagination}
        shape="rounded"
        onClick={(e) => {
          setLoader(true);
          getCatalog(
            +e.target.textContent * 11 - 11,
            +e.target.textContent * 11
          )
            .then((data) => {
              setItems(data);
            })
            .finally(() => setLoader(false));
        }}
      />
    </div>
  );
}
