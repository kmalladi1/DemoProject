'use strict';

var DeleteConfirmationDialog = function() {
};

/****************************************************************************************/
/* Function: getButton                                                                  */
/* Description: This function is used to get reference of a button inside Delete        */
/*              Confirmation Dialog                                                     */
/* Params: 1. btnName -> name of the button to be selected                              */
/* Return: Returns the reference of particular button.                                  */
/****************************************************************************************/
DeleteConfirmationDialog.prototype.getButton = function(btnName) {
  // Variable(s)
  var xpathButton;

  if (btnName.toLowerCase() === 'cancel') {
    xpathButton = '//*[@role="dialog"]//button[descendant::*[normalize-space(.)="Cancel"]] | ' +
      '//tf-confirm//tf-button[normalize-space(.)="Cancel"]';
  } else if (btnName.toLowerCase() === 'ok') {
    xpathButton = '//*[@role="dialog"]//button[descendant::*[normalize-space(.)="OK"]] | ' +
      '//tf-confirm//tf-button[normalize-space(.)="OK"]';
  }

  return element(by.xpath(xpathButton));
};

module.exports = new DeleteConfirmationDialog();
