'use strict';

var ChangeSeries = function() {
  var xpathChangeSeries = '//tf-panel//*[normalize-space(.)="Change Series"]/..';
  this.xpathPlusSign = '//tf-panel//tf-button[@icon="add"]';
};

/********************************************************************************************/
/* Function: getDialog                                                                      */
/* Description: This function is used to get reference of ChangeSeries dialog box .         */
/* Params: 1. titleOfDialog -> Pass the title of dialog box to get its reference.           */
/*         2. shouldLogError - > Set this variable to TRUE if you want to log error when    */
/*                          element did not appear on screen within 10 seconds.             */
/* Return: Promise which resolves to dialog box reference.                                  */
/********************************************************************************************/
ChangeSeries.prototype.getDialog = function(titleOfDialog, shouldLogError) {
  var xpathGetDialog = '//tf-dropdown//tf-panel//*[normalize-space(.)="' + titleOfDialog + '"]';

  if (shouldLogError === undefined) {
    ThiefHelpers.buildReference(xpathGetDialog, true);
  } else {
    ThiefHelpers.buildReference(xpathGetDialog, shouldLogError);
  }

  return element(by.xpath(xpathGetDialog));
};

/****************************************************************************************/
/* Function: getElementFromAvailableSection                                             */
/* Description: This function is used to get a particular element reference from the    */
/*              "Available" container.                                                  */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
ChangeSeries.prototype.getElementFromAvailableSection = function(elementName) {
  var xpathAvailableSectionElement = '//tf-transferbox-source//*[@ng-repeat and normalize-space(.)="' + elementName + '"]';
  return element(by.xpath(xpathAvailableSectionElement));
};

/****************************************************************************************/
/* Function: getElementsFromSelectedSection                                             */
/* Description: This function is used to get a particular element reference from the    */
/*              "Selected" container.                                                   */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
ChangeSeries.prototype.getElementsFromSelectedSection = function(elementName) {
  var xpathSelectedSectionElement = '//tf-transferbox-target//*[@ng-repeat and normalize-space(.)="' + elementName + '"]';
  return element(by.xpath(xpathSelectedSectionElement));
};

/**
 * @function getArrowButton
 * @description This function is used to get reference of particular button.
 * @param {string} buttonName Name of button.
 * Example Right/ Left.
 * @return {promise} Promise which resolve the refrence of arrow button.
 */
ChangeSeries.prototype.getArrowButton = function(buttonName) {
  var xpathSelectedSectionElement = '//tf-transferbox//tf-button[@icon="arrow-' + buttonName.toLowerCase() + '-s"]';
  return element(by.xpath(xpathSelectedSectionElement));
};

/************************************************************************************************************/
/* Function: getElementRemoveButton                                                                         */
/* Description: This function is used to get reference 'X' icon for specified element from 'Selected'       */
/*              container.                                                                                  */
/*         1. eleName -> Name of the element for which 'X' icon reference has to be collected.              */
/* Return: Promise which resolves to reference of 'X' icon.                                                 */
/************************************************************************************************************/
ChangeSeries.prototype.getElementRemoveButton = function(eleName) {
  // Variable(s)
  var xpathElementRemoveButton;

  // Hover over the element
  browser.actions().mouseMove(this.getElementsFromSelectedSection(eleName)).perform();

  xpathElementRemoveButton = '//tf-transferbox-target//*[@ng-repeat and normalize-space(.)="' + eleName + '"]' +
    '//tf-actions[contains(@class,remove)]';

  return element(by.xpath(xpathElementRemoveButton));
};

/************************************************************************************************************/
/* Function: isChangeSeries                                                                                 */
/* Description: This function is used to verify if Change Series transfer box is opened.                    */
/*      1. shouldLogError - > Set this variable to TRUE if you want to log error when element did not       */
/*                            appear on screen within 10 seconds.                                           */
/* Return: Returns true or False.                                                                           */
/************************************************************************************************************/
ChangeSeries.prototype.isChangeSeries = function(shouldLogError) {
  var xpathChangeSeriesTitle = '//tf-panel//*[normalize-space(.)="Change Series"]';
  if (shouldLogError === undefined) {
    ThiefHelpers.buildReference(xpathChangeSeriesTitle, true);
  } else {
    ThiefHelpers.buildReference(xpathChangeSeriesTitle, shouldLogError);
  }

  return element(by.xpath(xpathChangeSeriesTitle)).isPresent();
};

module.exports = new ChangeSeries();
