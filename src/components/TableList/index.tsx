import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Chip } from "@mui/material";
import { useAppSelector } from "../../store";
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from "../../store/modules/contact/contact.selector";
import dayjs from "dayjs";

const tableParams: string[] = [
  "Fullname",
  "Birthday",
  "Email",
  "Phone",
  "Location",
  "Национальность",
];

const TableList = () => {
  const contacts = useAppSelector(selectContacts);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            {tableParams.map((param) => (
              <TableCell align='right' key={param}>
                {param}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow
              key={contact.login.uuid}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align='right'>
                <Avatar alt={contact.name.first} src={contact.picture.medium} />
              </TableCell>
              <TableCell align='right'>
                {contact.name.title} {contact.name.first} {contact.name.last}
              </TableCell>
              <TableCell align='right'>
                {dayjs(contact.dob.date).format("dddd, DD/MM/YYYY, H:m")}.{" "}
                {contact.dob.age} years.
              </TableCell>
              <TableCell align='right'>{contact.email}</TableCell>
              <TableCell align='right'>{contact.phone}</TableCell>
              <TableCell align='right'>
                {contact.location.country}.{contact.location.city}.
                {contact.location.street.number}
                {contact.location.street.name}
              </TableCell>
              <TableCell align='right'>
                <Chip label={contact.nat} color='primary' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableList;
