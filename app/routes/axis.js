import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';



export default class AxisRoute extends Route {
  @service axis;
  @service router;
  @service login;

  async beforeModel() {
    const credential = JSON.parse(localStorage.getItem('user_credential'));

    if (this.login.authUser(credential)) {
      this.router.transitionTo('axis');
    }
    else{
      this.router.transitionTo('login');
    }

    let axisController = this.controllerFor('axis');
    axisController.loadRecordsAndSaveInLocalStorage();
  }
}
