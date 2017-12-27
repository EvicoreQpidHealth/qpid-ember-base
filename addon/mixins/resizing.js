import Mixin from '@ember/object/mixin';
import { scheduleOnce } from '@ember/runloop';
import refreshLogic from '../utils/resize';

export default Mixin.create({
  didInsertElement() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, () => refreshLogic());
  }
});
