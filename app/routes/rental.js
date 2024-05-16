import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class RentalRoute extends Route {
  @service store;

  @service login;
  @service router;

  beforeModel() {
    this.router.transitionTo('login');
  }
}
