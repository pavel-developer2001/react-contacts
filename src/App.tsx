import { useEffect } from "react";
import CardList from "./components/CardList";
import FiltersComponent from "./components/FiltersComponent";
import Header from "./components/Header";
import PaginationComponent from "./components/PaginationComponent";
import TableList from "./components/TableList";
import { StateTable } from "./constans";
import { useAppDispatch, useAppSelector } from "./store";
import { selectFilters } from "./store/modules/contact/contact.selector";
import { getContacts } from "./store/modules/contact/contact.slice";
import { selectView } from "./store/modules/view/view.slice";

function App() {
  const view = useAppSelector(selectView);
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();
  const payload = { limit: filters.limit, page: filters.page };
  useEffect(() => {
    dispatch(getContacts(payload));
  }, []);
  return (
    <div className='App'>
      <Header />
      <FiltersComponent />
      {view === StateTable.TABLE ? <TableList /> : <CardList />}
      <PaginationComponent />
    </div>
  );
}

export default App;
