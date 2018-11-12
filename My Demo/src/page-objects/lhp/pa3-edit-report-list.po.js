'use strict';

var PA3EditReportList = function() {
};

/******************************************************************************************/
/* Function: getDialogWithText                                                            */
/* Description: This function is used to get reference of dialog box having the text.     */
/* Params: text -> Text displayed inside the dialog box.                                  */
/* Return: Promise which resolves to the reference of dialog.                             */
/******************************************************************************************/
PA3EditReportList.prototype.getDialogWithText = function(text) {
  var xpathDialog = '//*[@role="dialog" and descendant::*[normalize-space(.)=normalize-space("' + text + '")]] | ' +
    '//tf-confirm//*[normalize-space(text())="' + text + '"]';
  return element(by.xpath(xpathDialog));
};

/****************************************************************************************/
/* Function: getButton                                                                  */
/* Description: This function is used to get the reference of either Done or Cancel     */
/*              button.                                                                 */
/* Params: btnName -> Name of the button whose reference is required.                   */
/*                          Ex: Done or Cancel                                          */
/* Return: Promise which resolves to reference of button.                               */
/****************************************************************************************/
PA3EditReportList.prototype.getButton = function(btnName) {
  var xpathButton = '//*[@data-qa-id="edit-report-mode-' + btnName.toLowerCase() + '"]';
  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getSectionRenameField                                                      */
/* Description: This function is used to get the reference of rename field of a section.*/
/* Return: Returns promise which resolves to reference of text field.                   */
/****************************************************************************************/
PA3EditReportList.prototype.getSectionRenameField = function() {
  var xpathSectionRename = '//*[@data-qa-id="lhp"]//input';

  return element(by.xpath(xpathSectionRename));
};

/****************************************************************************************/
/* Function: getLHPSection                                                              */
/* Description: This function is used to get the reference of a section inside LHP.     */
/* Params: 1. sectionName -> Name of the section for which the reference has to be		*/
/*                           collected.                                                 */
/*                          Ex: Reports                                                 */
/* Return: Promise which resolves to section inside LHP reference                       */
/****************************************************************************************/
PA3EditReportList.prototype.getLHPSection = function(sectionName) {
  var xpathSection = '//*[@data-qa-id="lhp"]//*[@data-qa-class="accordion-category" and ' +
    'descendant::*[normalize-space(.)="' + sectionName + '"]]';

  return element(by.xpath(xpathSection));
};

module.exports = new PA3EditReportList();
