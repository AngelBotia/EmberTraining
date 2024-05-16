import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

import Route from '@ember/routing/route';


export default class LoginController extends Controller {
  USER_CREDENTIALS="user_credential";
  @service login;

  @tracked user = false;

  @service router;

  @action
  onHandleClick(event) {
    const form = document.getElementById('loginForm');
    const credential = {
      user: form.user.value,
      password: form.password.value,
    };


    if (this.login.authUser(credential)) {

      const crendentialJSON = JSON.stringify(credential);
      localStorage.setItem(this.USER_CREDENTIALS, crendentialJSON);
      this.router.transitionTo('axis');
    }
    else{
      window.alert(`las credenciales de ${credential.user} no son correctas`)
    }


  }


}
