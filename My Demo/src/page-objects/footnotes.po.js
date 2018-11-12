'use strict';

// Requiring PA3 page object files

require(__dirname + '/../index.js');

var Footnotes = function() {
  this.xpathAvailableSection = '//tf-transferbox//tf-transferbox-source//tf-listbox';
  this.xpathSelectedSection = '//tf-transferbox//tf-transferbox-target//tf-listbox';
  this.xpathEditButton = '//tf-dropdown//*[@icon="edit"]';
  this.xpathBlastingMenu = '//*[@data-qa-id="blasting-panel"]';
  this.xpathBlastingButton = '//*[@data-qa-id="text-button" and normalize-space(.)="replacingText"]';
  this.xpathCustomFootnote = '//tf-dialog[@style and descendant::*//*[contains(., "Custom Footnote")]]';
  this.xpathCustomFootnoteTextbox = this.xpathCustomFootnote + '//tf-textbox';
  this.xpathCustomFootnoteButton = this.xpathCustomFootnote + '//tf-button[normalize-space(.) = "replacingText"]';
  this.xpathAddButton = '//tf-transferbox-source//*[normalize-space(.)="Available"]//ancestor::*//following-sibling::*[@icon="add"]';
};

/************************************************************************************************/
/* Function: getTextArea                                                                        */
/* Description: This function is used to get reference of text area                             */
/* Return: Promise which resolves to reference of text area.                                    */
/************************************************************************************************/
Footnotes.prototype.getTextArea = function() {
  return element(by.xpath(this.xpathCustomFootnote + '//textarea'));
};

module.exports = new Footnotes();
