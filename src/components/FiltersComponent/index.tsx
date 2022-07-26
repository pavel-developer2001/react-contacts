import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectFilters } from "../../store/modules/contact/contact.selector";
import {
  clearFilters,
  getContacts,
  setGender,
  setLimit,
  setName,
  setNat,
} from "../../store/modules/contact/contact.slice";
import styles from "./FiltersComponent.module.scss";

const FiltersComponent = () => {
  const filters = useAppSelector(selectFilters);
  const debouncedNat = useDebounce(filters.nat, 500);
  const debouncedName = useDebounce(filters.name, 500);
  const debouncedLimit = useDebounce(filters.limit, 500);
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setGender(event.target.value as string));
  };
  useEffect(() => {
    const payload = {
      limit: filters.limit,
      page: filters.page,
      gender: filters.gender,
    };
    dispatch(getContacts(payload));
  }, [filters.gender]);
  useEffect(() => {
    if (debouncedNat) {
      const payload = {
        limit: filters.limit,
        page: filters.page,
        nat: debouncedNat.toLocaleLowerCase(),
      };
      dispatch(getContacts(payload));
    }
  }, [debouncedNat]);
  useEffect(() => {
    if (debouncedName) {
      const payload = {
        limit: filters.limit,
        page: filters.page,
        name: debouncedName,
      };
      dispatch(getContacts(payload));
    }
  }, [debouncedName]);
  useEffect(() => {
    if (debouncedLimit) {
      const payload = {
        limit: debouncedLimit,
        page: filters.page,
        name: filters.name,
        nat: filters.nat,
      };
      dispatch(getContacts(payload));
    }
  }, [debouncedLimit]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <Paper
          component='form'
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder='Search by name'
            value={filters.name}
            onChange={(e) => dispatch(setName(e.target.value))}
            inputProps={{ "aria-label": "aearch by full name" }}
          />
          <IconButton type='submit' sx={{ p: "10px" }} aria-label='search'>
            <SearchIcon />
          </IconButton>
        </Paper>
        <FormControl sx={{ minWidth: 150, margin: "0 15px" }}>
          <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={filters.gender}
            label='Gender'
            onChange={handleChange}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
          </Select>
        </FormControl>
        <TextField
          value={filters.nat}
          onChange={(e) => dispatch(setNat(e.target.value))}
          id='outlined-basic'
          label='Nationality'
          variant='outlined'
        />
        <TextField
          type='number'
          value={filters.limit}
          onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
          sx={{ minWidth: 100, margin: "0 15px" }}
          label='Кол-во элементов'
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
      </div>
      <Button
        startIcon={<ClearIcon />}
        onClick={() => dispatch(clearFilters())}
      >
        Clear
      </Button>
    </div>
  );
};

export default FiltersComponent;
