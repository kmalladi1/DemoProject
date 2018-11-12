'use strict';

var PA3EditMode = function() {
  this.xpathHeaderName = '//*[@data-qa-id="edit-report-mode-banner"]';
  this.xpathOfLibraryItem = '//*[@data-qa-class="library-item"]//*[normalize-space(.)="replacingText"]/parent::tf-library-item';
  this.xpathOfAllSectors = '//*[@data-qa-id="workspace"]//tf-dropdown-select';
  this.xpathOfDocument = '//*[@data-qa-id="workspace"]//*[normalize-space(text())="replacingText"]';
  this.xpathOfLookupIcon = '//*[@data-qa-id="workspace"]//*[contains(@type,"lookup")]/parent::*';
  this.xpathOfLhpReports = '//tf-navpane-item//*[normalize-space(.)="replacingText"]/parent::tf-navpane-item';
};

/********************************************************************************************/
/* Function: isEditMode                                                                     */
/* Description: This function is used to verify if application is in Edit Mode.             */
/* Return: Promise which resolves to boolean value.                                         */
/********************************************************************************************/
PA3EditMode.prototype.isEditMode = function() {
  var xpathEditMode = '//*[@data-qa-id="edit-report-mode-banner"]//*[@id="editModeBanner"]';
  return element(by.xpath(xpathEditMode)).isPresent();
};

/********************************************************************************************/
/* Function: getDialog                                                                      */
/* Description: This function is used to get reference of any dialog box based on its title.*/
/* Params: 1. titleOfDialog -> Pass the title of dialog box to get its reference.           */
/* Return: Promise which resolves to dialog box reference.                                  */
/********************************************************************************************/
PA3EditMode.prototype.getDialog = function(titleOfDialog) {
  var xpathDialog = '//span[.="' + titleOfDialog + '"]/ancestor::div[@role="dialog"]';
  return element(by.xpath(xpathDialog));
};

/****************************************************************************************/
/* Function: getDateHyperLink                                                           */
/* Description: This function is used to get reference of Date link inside Workspace    */
/* Params: 1. tileName (optional) -> Name of the tile in which this hyperlink is present*/
/* Return: Returns the reference of Date Hyperlink.                                     */
/* NOTE: When there are multiple tiles in the workspace and you don't pass "tileName"   */
/*       then you'll get ambiguous reference.                                           */
/****************************************************************************************/
PA3EditMode.prototype.getDateHyperLink = function(tileName) {
  // Variable(s)
  var xpathDateHyperLink;

  if (tileName === undefined) {
    xpathDateHyperLink = '//*[@data-qa-id="workspace"]//*[@ng-click="ctrl.showDatesTab()"]';
  } else {
    xpathDateHyperLink = '//*[@data-qa-class="tile-header" and descendant::*[normalize-space(.)="' + tileName + '"]]' +
      '/following-sibling::*//*[@ng-click="ctrl.showDatesTab()"]';
  }

  return element(by.xpath(xpathDateHyperLink));
};

/****************************************************************************************/
/* Function: getGroupingsHyperLink                                                      */
/* Description: This function is used to get reference of Grouping hyperlink from the   */
/*              top-left corner of report workspace. This is to identify that based on  */
/*              which groupings report is calculated.                                   */
/* Params: 1. tileName -> Name of the tile in which this hyperlink is present.          */
/* Return: Returns the reference of Groupings Hyperlink.                                */
/****************************************************************************************/
PA3EditMode.prototype.getGroupingsHyperLink = function(tileName) {
  var xpathGroupingsHyperLink = '//*[@data-qa-class="tile-header" and descendant::*[normalize-space(.)="' + tileName + '"]]' +
    '/following-sibling::*//*[@ng-click="ctrl.showGroupingsTab()"]';
  return element(by.xpath(xpathGroupingsHyperLink));
};

/****************************************************************************************/
/* Function: getExclusionsHyperLink                                                     */
/* Description: This function is used to get reference of Exclusions hyperlink from the */
/*              top-left corner of report workspace.                                    */
/* Params: 1. tileName -> Name of the tile in which this hyperlink is present.          */
/* Return: Returns the reference of Exclusions Hyperlink.                               */
/****************************************************************************************/
PA3EditMode.prototype.getExclusionsHyperLink = function(tileName) {
  var xpathExclusionsHyperLink = '//*[@data-qa-class="tile-header" and descendant::*[normalize-space(.)="' + tileName + '"]]' +
    '/following-sibling::*//pa-quick-links-exclusions//tf-infobox-link';

  return element(by.xpath(xpathExclusionsHyperLink));
};

/****************************************************************************************/
/* Function: isElementsClickable                                                        */
/* Description: This function is used to check if elements in the workspace is clickable*/
/*               or not.                                                                */
/* Return: Returns promise which resolves to the boolean value.                         */
/****************************************************************************************/
PA3EditMode.prototype.isElementsClickable = function() {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathWorspace = '//*[@data-qa-class="tile"]//*[contains(@class, "no-pointer-events")]';

  var ref = element(by.xpath(xpathWorspace));

  ref.isPresent().then(function(isClikable) {
    if (isClikable) {
      defer.fulfill(false);
    } else {
      defer.fulfill(true);
    }
  });

  return promise;
};

/****************************************************************************************/
/* Function: getButton                                                                  */
/* Description: This function is used to get the reference of either OK or Cancel button*/
/* Params: btnName -> Name of the button whose reference is required.                   */
/*                          Ex: OK or Cancel                                            */
/* Return: Promise which resolves to reference of button.                               */
/****************************************************************************************/
PA3EditMode.prototype.getButton = function(btnName) {
  var xpathButton = '//*[@data-qa-id="edit-report-mode-' + btnName.toLowerCase() + '"]';
  return element(by.xpath(xpathButton));
};

// Return the reference of COG WHEEL button
PA3EditMode.prototype.getCogWheelBtn = function() {
  var xpathCogWheel = '//*[@id="layout-wrapper"]//i[contains(@class, "icon-options")]';
  return element(by.xpath(xpathCogWheel));
};

/****************************************************************************************/
/* Function: getReportViewIcon                                                          */
/* Description: This function is used to get the reference of the report view icon from */
/*              the toolbar.                                                            */
/* Params: 1. viewName -> Name of the report view.                                      */
/*                          Ex: Thumbnail or List                                       */
/* Return: Returns the reference of report view icon from the toolbar.                  */
/****************************************************************************************/
PA3EditMode.prototype.getReportViewIcon = function(viewName) {
  var xpathView = '//*[@data-qa-id="workspace"]//*[contains(@class,"' + viewName.toLowerCase() + '")]';
  return element(by.xpath(xpathView));
};

/****************************************************************************************/
/* Function: isToolTipAppeared                                                          */
/* Description: This function is used to get the reference of the tooltip displayed.    */
/* Params: 1. visibleText -> Expected tooltip text.                                     */
/*                          Ex: Thumbnail view or List View                             */
/* Return: Promise which resolves to boolean value.                                     */
/****************************************************************************************/
PA3EditMode.prototype.isToolTipAppeared = function(visibleText) {
  var xpathTooltip = '//tf-tooltip[contains(text(),"' + visibleText + '")]';

  // Wait for the tooltip to appear
  browser.sleep(2000);

  return element(by.xpath(xpathTooltip)).isPresent();
};

/****************************************************************************************/
/* Function: reportsViewedIn                                                            */
/* Description: This function is used to verify the reports view.                       */
/* Params: 1. viewName -> Name of the report view.                                      */
/*                          Ex: Thumbnail or List                                       */
/* Return: Promise which resolves the TRUE or error message.                            */
/****************************************************************************************/
PA3EditMode.prototype.reportsViewedIn = function(viewName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathView = '//*[@data-qa-id="workspace"]//tf-library-item[contains(@class,"' + viewName.toLowerCase() + '")]';
  var ref = element.all(by.xpath(xpathView));

  // Check the count of elements (it should be greater than 0)
  ref.count().then(function(noOfElements) {
    if (noOfElements > 0) {
      defer.fulfill(true);
    } else {
      defer.reject('Reports are not shown in ' + viewName + 'view.');
    }
  });

  return promise;
};

/****************************************************************************************/
/* Function: getReport                                                                  */
/* Description: This function is used to get the reference of the report from the       */
/*              library.                                                                */
/* Params: 1. reportName -> Name of the report.                                         */
/*                          Ex: Weights                                                 */
/* Return: Returns the reference of report description.                                 */
/****************************************************************************************/
PA3EditMode.prototype.getReport = function(reportName) {
  var xpathReport = '//tf-tile//*[normalize-space(.)="' + reportName + '"]//ancestor::*[contains(@ng-repeat, "item")]';
  return element(by.xpath(xpathReport));
};

/****************************************************************************************/
/* Function: getReportDescription                                                       */
/* Description: This function is used to get the reference of the report description.   */
/* Params: 1. reportName -> Name of the report.                                         */
/*                          Ex: Weights                                                 */
/* Return: Returns the reference of report description.                                 */
/****************************************************************************************/
PA3EditMode.prototype.getReportDescription = function(reportName) {
  var xpathReport = '//tf-library-item-title[descendant::*[normalize-space(.)="' + reportName + '"]]' +
    '/following-sibling::*//tf-editable-text-text';

  return element(by.xpath(xpathReport));
};

/****************************************************************************************/
/* Function: getReportPencilIcon                                                        */
/* Description: This function is used to get the reference of pencil icon of report in  */
/*              the library.                                                            */
/* Params: reportName -> Name of the report.                                            */
/*                          Ex: Weights                                                 */
/* Return: Returns the reference pencil icon of report in the library.                  */
/****************************************************************************************/
PA3EditMode.prototype.getReportPencilIcon = function(reportName) {
  var xpathPencil = '//tf-library-item-title[.="' + reportName + '"]//ancestor::tf-library-item//*[contains[@icon="edit"]]';
  return element(by.xpath(xpathPencil));
};

/**
 * @function getChartImageFromGroup
 * @description This function is used to get the reference of chart image.
 * @param {string} group Name of group.
 * @param {string} chartName Name of chart.
 * @returns {promise} Promise which resolves to reference chart from RHP.
 */
PA3EditMode.prototype.getChartImageFromGroup = function(group, chartName) {
  return element(by.xpath('//*[@data-qa-id="workspace"]//*[normalize-space(.)="' + group + '"]//parent::*' +
    '//*[@data-qa-class="library-section"]//tf-library-item[normalize-space(.)="' + chartName + '"]'));
};

/****************************************************************************************/
/* Function: getTileDeleteButton                                                        */
/* Description: This function is used to get the reference of X( tile delete ) button.  */
/* Params: 1. tileName -> Name of the tile to which the X button reference required.    */
/* Return: Promise which resolves to reference of button.                               */
/****************************************************************************************/
PA3EditMode.prototype.getTileDeleteButton = function(tileName) {
  var xpathButton = '//*[@data-qa-class="tile"]//*[@data-qa-class="tile-header" and descendant::*' +
    '[normalize-space(.)="' + tileName + '"]]/ancestor::*[@data-qa-class="tile"]//*[@data-qa-class="tile-delete-button"]';
  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getTileHeader                                                              */
/* Description: This function is used to get the reference of tile header.              */
/* Params: 1. tileName -> Name of the tile to which the header reference is required.   */
/* Return: Promise which resolves to reference of tile header.                          */
/****************************************************************************************/
PA3EditMode.prototype.getTileHeader = function(tileName) {
  var xpathButton = '//*[@data-qa-class="tile"]//*[@data-qa-class="tile-header" and descendant::*[normalize-space(.)="' + tileName + '"]]';
  return element(by.xpath(xpathButton));
};

module.exports = new PA3EditMode();
