import { IconButton } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import TocIcon from "@mui/icons-material/Toc";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import styles from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "../../store";
import { getContacts } from "../../store/modules/contact/contact.slice";
import { selectView, setView } from "../../store/modules/view/view.slice";
import { StateTable } from "../../constans";
import { selectFilters } from "../../store/modules/contact/contact.selector";

const Header = () => {
  const view = useAppSelector(selectView);
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();
  const handleSelectTable = () => {
    dispatch(setView(StateTable.TABLE));
  };
  const handleSelectColumn = () => {
    dispatch(setView(StateTable.COLUMN));
  };
  const reboot = () => {
    const payload = { limit: filters.limit, page: filters.page };
    dispatch(getContacts(payload));
  };
  return (
    <header className={styles.header}>
      <strong className={styles.title}>Contacts</strong>
      <div className={styles.params}>
        <IconButton
          onClick={reboot}
          color='secondary'
          aria-label='add an alarm'
        >
          <AutorenewIcon />
        </IconButton>
        <IconButton
          color={view === StateTable.COLUMN ? "default" : "secondary"}
          onClick={handleSelectColumn}
          aria-label='add an alarm'
        >
          <ViewColumnIcon />
        </IconButton>
        <IconButton
          onClick={handleSelectTable}
          color={view === StateTable.TABLE ? "default" : "secondary"}
          aria-label='add an alarm'
        >
          <TocIcon />
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
