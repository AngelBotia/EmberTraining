import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class LoginService extends Service {
  USER_STORAGE = 'Login';

  @action
  authUser(credential) {
    if(!credential)return false;
    const { user, password } = credential;


    const currentLocalStorageObject = JSON.parse(
      localStorage.getItem(this.USER_STORAGE),
    );

    if(!currentLocalStorageObject) {
      console.log("El local storage esta vacio" ); return;
    }



    return currentLocalStorageObject.find((item) => {
      if (item.user == user && item.password == password) {
        return true;
      }
    });
  }


}
