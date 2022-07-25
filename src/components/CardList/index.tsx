import { Avatar, Chip, Grid, Paper } from "@mui/material";
import { FC } from "react";
import { useAppSelector } from "../../store";
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from "../../store/modules/contact/contact.selector";
import { IContact } from "../../store/modules/contact/contact.types";
import styles from "./CardList.module.scss";
import dayjs from "dayjs";

const CardList = () => {
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
    <section className={styles.wrapper}>
      <Grid container spacing={2}>
        {contacts.map((contact) => (
          <Grid item xs={6} md={4} key={contact.login.uuid}>
            <CardListItem contact={contact} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};
const CardListItem: FC<{ contact: IContact }> = ({ contact }) => {
  return (
    <Paper className={styles.wrapper_item}>
      <div className={styles.header}>
        <Avatar alt={contact.name.first} src={contact.picture.medium} />
        <div className={styles.data}>
          <strong>
            {contact.name.title} {contact.name.first} {contact.name.last}
          </strong>
          <span>{contact.phone}</span>
        </div>
        <Chip
          className={styles.national}
          label={contact.nat}
          variant='outlined'
        />
      </div>
      <div className={styles.info}>
        <div>
          Email: <span>{contact.email}</span>
        </div>
        <div>
          Location:
          <span>
            {contact.location.country}.{contact.location.city}.
            {contact.location.street.number}
            {contact.location.street.name}
          </span>
        </div>
        <div>
          Birthday:
          <span>
            {dayjs(contact.dob.date).format("dddd, DD/MM/YYYY, H:m")}.
            {contact.dob.age} years.
          </span>
        </div>
      </div>
    </Paper>
  );
};

export default CardList;
