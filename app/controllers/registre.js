import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';



export default class RegistreController extends Controller {
  USER_CREDENTIALS = 'user_credential';

  @tracked formData;

  @tracked successForm;

  @tracked errorMessage;

  @action
  onHandleClick(event) {
    const form = document.getElementById('registerForm');

    if (!form) return;

    this.formData = {
      user: form.user.value,
      email: form.email.value,
      password: form.password.value,
      rePassword: form.repassword.value,
    };

    //si la contraseñas no son iguales
    if (!this.passwordIsEqual()) {
      this.errorMessage = 'La contraseña deben coincidir ❌';
       this.showSuccesModal(event, false);
      return;
    }
    //el email no este ya en la base de datos
    if (this.emailOrUserIsExist()) {
      this.errorMessage = 'Ese email esta en uso ❌';
      this.showSuccesModal(event,false);
      return;
    }

    //guardar en el local storage
    this.saveAsLocalStorage();

    this.showSuccesModal(event,true);
    this.cleanFormInputs(event);
  }



  passwordIsEqual() {
    const { password, rePassword } = this.formData;
    if (!password || !rePassword) return;
    return password == rePassword;
  }

  emailOrUserIsExist() {
    const { email, user } = this.formData;
    const currentLocalStorage = JSON.parse(localStorage.getItem('Login'));

    if (!currentLocalStorage) return false;

    return currentLocalStorage.find((item) => {
      return item.email == email || item.user == user;
    });
  }

  saveAsLocalStorage() {
    const currentLocalStorage = JSON.parse(localStorage.getItem('Login'));

    const { email, user, password } = this.formData;

    const formData = {
      user: user,
      password: password,
      email: email,
    };

    if (!currentLocalStorage) {
      const arrFormData = [];
      arrFormData.push(formData);
      localStorage.setItem('Login', JSON.stringify(arrFormData));
      return;
    }

    currentLocalStorage.push(formData);
    const newLocalStorage = JSON.stringify(currentLocalStorage);

    localStorage.setItem('Login', newLocalStorage);
  }

  @action
  showSuccesModal(event,success) {
    const dialog = document.querySelector('dialog');
    if(!dialog) return;

    if(success) this.successForm = 'El registro ha sido un exito ✅';
    else this.successForm = this.errorMessage;

    dialog.showModal();


    setTimeout(function(){
      dialog.close();
    },1000)

    console.log('HOLAA CARACOLA');
  }

  cleanFormInputs(event){
      const form = document.getElementById('registerForm');

      if (!form) return;

      form.user.value = "";
      form.email.value = "";
      form.password.value = "";
      form.repassword.value = "";

  }


}
