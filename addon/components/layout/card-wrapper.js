import Ember from 'ember';
import layout from '../../templates/components/layout/card-wrapper';
import Resizing from '../../mixins/resizing';

export default Ember.Component.extend(Resizing, {
  layout,
  classNames: ['card'],
  classNameBindings: [
    'noHover:no-hover', 'isDisabled:disabled', 'isButton:card-button', 'isRadio:card-radio',
    'hasError:error', 'isTitle:title', 'isSelected:selected', 'transparent:transparent', 'isFaded:faded',
    'smallCard:small:multi-state', 'noPadding:no-padding', 'forceLarge:force-large', 'forceSmall:force-small',
    'fullHeight:full-height', 'isSquare:square', 'inline:inline', 'fullWidth:full-width', 'noMargin:no-margin'],

  click() {
    this.sendAction('action', this.get('param'));
  }
});
