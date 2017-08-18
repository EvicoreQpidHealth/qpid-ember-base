/**
 * Created by mshafir on 8/10/15.
 */

module.exports = {
  normalizeEntityName: function() {} ,

  afterInstall: function() {
    return Promise.all([
      this.addBowerPackageToProject('foundation'),
      this.addBowerPackageToProject('colorbrewer')]);
  }
};
