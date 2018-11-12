'use strict';

var AssetOrdering = function() {
  this.xpathOfOrderingContainer = '//tf-dialog//tf-transferbox-target//tf-transferbox-target-content//tf-virtual-listbox';
  this.xpathOfCategoriesContainer = '//tf-dialog//tf-transferbox-source-list//tf-virtual-listbox';
  this.xpathOfClearAllOrOkOrCancelButton = '//tf-dialog//tf-button[normalize-space(.)="replacingText"]';
  this.xpathOfClearAllButtonFromDialog = '//tf-dialog//span[@tf-button][normalize-space(.)="Clear All"]';
  this.xpathOfButtonNextToOrderingSection = '//tf-dialog//tf-transferbox-target-controls//span[@tf-button][contains(@icon, "replacingText")]';
  this.xpathOfTransferButtons = '//tf-dialog//tf-transferbox-transfer-buttons//span[@tf-button][contains(@icon, "replacingText")]';
};

module.exports = new AssetOrdering();
