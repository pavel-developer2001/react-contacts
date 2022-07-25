import { Pagination } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectFilters } from "../../store/modules/contact/contact.selector";
import {
  getContacts,
  setPage,
} from "../../store/modules/contact/contact.slice";
import styles from "./PaginationComponent.module.scss";

const PaginationComponent = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };
  useEffect(() => {
    const payload = { limit: filters.limit, page: filters.page };
    dispatch(getContacts(payload));
  }, [filters.page]);

  return (
    <div className={styles.wrapper}>
      <Pagination
        count={Math.ceil(Number(filters.totalCount) / Number(filters.limit))}
        page={filters.page}
        onChange={handleChange}
        color='primary'
      />
    </div>
  );
};

export default PaginationComponent;
