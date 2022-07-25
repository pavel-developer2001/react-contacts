import instance from "../configs/axios.config";
import { FiltersTypes } from "../store/modules/contact/contact.types";

export default class ContactApi {
  static async getContacts(payload: FiltersTypes) {
    return await instance.get(
      `?nat=${payload.nat}&results=${payload.limit}&page=${payload.page}&gender=${payload.gender}&name=${payload.name}`
    );
  }
}
