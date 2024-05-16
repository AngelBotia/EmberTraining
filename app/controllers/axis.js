import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const RECORDS = "records";
const USER_CREDENTIALS = 'user_credential';

export default class AxisController extends Controller {
  @service Axis;
  @service router;

  @tracked records;

  @tracked invoiceData;

  // @action
  // loadRecordsAndSaveInLocalStorage() {
  //   const recordJSON = JSON.stringify(this.Axis.loadItemsTable());
  //   // if (!localStorage.getItem(RECORDS)) {
  //   //   localStorage.setItem(RECORDS, recordJSON);
  //   // }
  //   this.loadRecordsToLocalStore();
  // }

  @action
  logOut(event) {
    const jsonVoidObject = JSON.stringify({})
    localStorage.setItem(USER_CREDENTIALS, jsonVoidObject);
    this.router.transitionTo('login');
  }

  initLocalStorage(){
        const jsonVoidObject = JSON.stringify([]);
        localStorage.setItem(RECORDS, jsonVoidObject);
  }
  @action
  loadRecordsToLocalStore() {
    const localStorageJSON = localStorage.getItem(RECORDS);
    this.records = JSON.parse(localStorageJSON);
  }

  @action
  showInvoice(event) {
    const invoice = document.getElementById('factura');
    const fila = event.target.parentNode.parentNode.parentNode;
    if (!fila) return;
    this.invoiceData = {
      booking_id: fila.cells[0].innerHTML,
      hotelId: fila.cells[1].innerHTML,
      bookingDate: fila.cells[2].innerHTML,
      description: fila.cells[3].innerHTML,
      pax: fila.cells[4].innerHTML,
    };

    // TODO: generar factura con los datos de la fila

    invoice.showModal();
  }

  @action
  setItemsLocalStorage(event, formData) {
    formData = this.getFormData(event);

    if (!formData.bookingId || !formData.hotelId || !formData.bookingDate)
      return;

    if (this.findElementInListByID(formData)) {
      formData = this.updateThisElement(formData);
      return;
    }

    let currentLocalStorage = localStorage.getItem(RECORDS);
    currentLocalStorage = currentLocalStorage
      ? JSON.parse(currentLocalStorage)
      : [{}];

    currentLocalStorage.push(formData);

    const updateData = JSON.stringify(currentLocalStorage);

    localStorage.setItem(RECORDS, updateData);
    this.loadRecordsToLocalStore();
    this.setFormToVoid();
  }

  @action
  getFormData(event) {
    const form = document.getElementById('bookingForm').elements;
    const objectForm = {
      bookingId: form.booking_id.value,
      hotelId: form.b_id.value,
      bookingDate: form.b_date.value,
      description: form.b_desc.value,
      pax: form.b_pax.value,
    };

    return objectForm;
  }

  @action
  onClickDeleteButton(event) {
    const idElement =
      event.target.parentNode.parentNode.firstElementChild.innerHTML;
    let currentLocalStorage = localStorage.getItem(RECORDS);

    const records = JSON.parse(currentLocalStorage);
    const elementToDelete = records.find((item) => item.bookingId == idElement);
    const indexElement = records.indexOf(elementToDelete);
    records.splice(indexElement, 1);
    const recordUpdateJson = JSON.stringify(records);
    localStorage.setItem(RECORDS, recordUpdateJson);
    this.loadRecordsToLocalStore();
  }

  @action
  onClickEditButton(event) {
    const idElement =
      event.target.parentNode.parentNode.firstElementChild.innerHTML;
    let currentLocalStorage = localStorage.getItem(RECORDS);
    const records = JSON.parse(currentLocalStorage);
    const elemenToEdit = records.find((item) => item.bookingId == idElement);
    const indexElement = records.indexOf(elemenToEdit);
    const form = document.getElementById('bookingForm').elements;
    this.setValuesBookingForm(form, elemenToEdit);
  }

  setValuesBookingForm(form, elemenToEdit) {
    const { bookingId, hotelId, bookingDate, description, pax } = elemenToEdit;
    form.booking_id.value = bookingId;
    form.b_id.value = hotelId;
    form.b_date.value = bookingDate;
    form.b_desc.value = description;
    form.b_pax.value = pax;
  }

  findElementInListByID(formData) {
    const { bookingId } = formData;
    const itemMatch = this.records.find((item) => item.bookingId == bookingId);
    return itemMatch;
  }

  updateThisElement(formData) {
    const records = this.records;
    records.map((item, index) => {
      if (item.bookingId == formData.bookingId) {
        records[index] = formData;
      }
    });

    const upadateData = JSON.stringify(records);
    localStorage.setItem(RECORDS, upadateData);

    this.loadRecordsToLocalStore();
    this.setFormToVoid(formData);
  }

  setFormToVoid() {
    const form = document.getElementById('bookingForm').elements;
    form.booking_id.value = '';
    form.b_id.value = '';
    form.b_date.value = '';
    form.b_desc.value = '';
    form.b_pax.value = '';
  }
}




