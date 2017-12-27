import Mixin from '@ember/object/mixin';
import { schedule } from '@ember/runloop';
import { on } from '@ember/object/evented';
import refreshLogic from '../utils/resize';

export default Mixin.create({
  transition: on('didTransition', function() {
    schedule('afterRender', this, refreshLogic);
  })
});
