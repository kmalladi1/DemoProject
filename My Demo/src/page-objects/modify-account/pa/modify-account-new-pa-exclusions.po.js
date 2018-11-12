'use strict';

var ModifyAccountNewPaExclusions = function() {
  this.xpathAvailableContainer = '//tf-transferbox-source-list//tf-virtual-listbox';
  this.xpathSelectedContainer = '//tf-transferbox-target-list//tf-virtual-listbox';
  this.xpathOfEditGroupingAvailableOrSelectedContainer = '//tf-dialog//*[@data-qa-id="groupings-add-remove-replacingText-section"]//tf-listbox';
  this.xpathOfFactsetResearchSystemDialog = '//div//*[normalize-space(.)= "FactSet Research Systems"]/parent::*';
  this.xpathOfFactsetResearchSystemDialogButtons = this.xpathOfFactsetResearchSystemDialog +
    '//following-sibling::*//*[contains(@class, "dialog-buttonset")]//*[normalize-space(.)= "replacingText"]';
};

module.exports = new ModifyAccountNewPaExclusions();
