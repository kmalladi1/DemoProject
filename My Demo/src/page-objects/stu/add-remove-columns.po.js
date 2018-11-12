'use strict';
var AddRemoveColumns = function() {

  this.xpathSearchField = '//*[@data-qa-id="input-available-search"]/input';
  this.xpathAvailableContainer = '//*[@data-qa-id="section-available"]';
  this.xpathSelectedContainer = '//*[@ng-model="selections.selectedTargetColumns"]';
};

/*********************************************************************************************/
/* Function: getRemoveAllOfSelectedSection                                                   */
/* Description: This function is used to get the reference of remove all button from         */
/*              'Selected' section of 'Add/Remove Columns' dialog overlay                    */
/*                                                                                           */
/* Params: NotApplicable                                                                     */
/*                                                                                           */
/* Returns: Returns promise which resolve to reference of 'Remove All' button of 'Selected'  */
/*          section.                                                                         */
/*********************************************************************************************/
AddRemoveColumns.prototype.getRemoveAllOfSelectedSection = function() {
  var xpathRemoveAll = '//*[normalize-space(.)="Selected"]/*[@data-qa-id="button-remove-all"]/button';
  return element(by.xpath(xpathRemoveAll));
};

/*********************************************************************************************/
/* Function: expandElementTree                                                               */
/* Description: This function is used to expand the Tree passed as an argument to the        */
/*              function                                                                     */
/*                                                                                           */
/* Params: elementName -> specifies the name of the element which is need to expand the tree */
/*         Example: 'General', 'Pre and Post' , 'Fixed Income'                               */
/*         excludeElement -> specifies the element which is need to be excluded in expansion */
/*         Example: 'General', 'Pre and Post' , 'Fixed Income'                               */
/*                                                                                           */
/* Returns: NotApplicable.                                                                   */
/*********************************************************************************************/
AddRemoveColumns.prototype.expandElementTree = function(elementName, excludeElement) {
  // Variable(s)
  var xpathExpandButton;
  xpathExpandButton = this.xpathAvailableContainer;

  if (excludeElement === undefined) {
    xpathExpandButton += '//*[normalize-space(.)="' + elementName + '" and @tf-renamable-text]' +
      '/ancestor::*[contains(@class, "selectable-handle")]//*[contains(@class, "icon-tree")]';

    Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

    element(by.xpath(xpathExpandButton)).click();
  } else {
    xpathExpandButton += '//*[normalize-space(.)="' + elementName + '" and @tf-renamable-text]' +
      '/ancestor::*[contains(@class, "selectable-handle")]//*[contains(@class, "icon-tree")]';

    Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));
  }
};

/*********************************************************************************************/
/* Function: checkIfExpanded                                                                 */
/* Description: This function is used to check if given element is expanded.                 */
/*                                                                                           */
/* Params: elementName -> specifies the name of the element which is need to expand the tree */
/*         Example: 'General', 'Pre and Post' , 'Fixed Income'                               */
/*                                                                                           */
/* Return: NotApplicable                                                                     */
/*********************************************************************************************/
AddRemoveColumns.prototype.checkIfExpanded = function(elementName) {
  var xpathParentElement;
  xpathParentElement = this.xpathAvailableContainer +
    '//*[normalize-space(.)="' + elementName + '" and @tf-renamable-text]' +
    '/ancestor::*[@ng-repeat]';
  expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
};

/*********************************************************************************************/
/* Function: getElementFromAvailableSection                                                  */
/* Description: This function is used to get a specific element reference from the           */
/*              "Available" section container.                                               */
/*                                                                                           */
/* Params: 1. parentElement -> Parent element in which required element is present.          */
/*         Example: 'General', 'Pre and Post', 'Fixed Income'                                */
/*         2. elementName -> Name of the element whose reference is required.                */
/*         Example: 'Security', 'Pre Qty', 'Duration'                                        */
/*                                                                                           */
/* Return: Returns promise which resolve to the reference of required element from available */
/*          section                                                                          */
/*********************************************************************************************/
AddRemoveColumns.prototype.getElementFromAvailableSection = function(elementName, parentElement) {
  var xpathParentElement;
  var xpathElement;
  xpathParentElement = this.xpathAvailableContainer + '//*[normalize-space(.)="' + parentElement + '" and @tf-renamable-text]' +
    '/ancestor::*[@ng-repeat][1]';

  xpathElement = xpathParentElement + '//*[normalize-space(.)="' + elementName + '" and @tf-renamable-text]' +
    '/ancestor::*[@ng-repeat][1]';

  if (parentElement === undefined) {
    xpathElement = this.xpathAvailableContainer + '//*[normalize-space(.)="' + elementName + '" and @tf-renamable-text]' +
      '/ancestor::*[@ng-repeat][1]';
  }

  // Scroll the element into visibility
  Utilities.makeElementVisible(element.all(by.xpath(xpathElement)).last());

  return element.all(by.xpath(xpathElement)).last();
};

/*********************************************************************************************/
/* Function: getAvailableSearchInput                                                         */
/* Description: This function is used to get the reference of search input box from          */
/*              "Available" section                                                          */
/*                                                                                           */
/* Params: Not Applicable                                                                    */
/*                                                                                           */
/* Return: Returns promise which resolve to the reference of search input field from         */
/*          "Available" section                                                              */
/*********************************************************************************************/
AddRemoveColumns.prototype.getAvailableSearchInput = function() {
  var xpathSearchInput = this.xpathSearchField;
  return element(by.xpath(xpathSearchInput));
};

/*********************************************************************************************/
/* Function: setSearchKeyword                                                                */
/* Description: This function is used to set specified search keyword in available section   */
/*              input search field.                                                          */
/*                                                                                           */
/* Params: 1. searchKeyword -> specifies the search keyword through which search operation is*/
/*         performed.                                                                        */
/*                                                                                           */
/* Return: Not Applicable                                                                    */
/*********************************************************************************************/
AddRemoveColumns.prototype.setSearchKeyword = function(searchKeyword) {
  // Clear the search field
  element(by.xpath(this.xpathSearchField)).sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a',
    protractor.Key.DELETE), protractor.Key.ENTER);

  // Enter the keyword into the search field
  element(by.xpath(this.xpathSearchField)).sendKeys(searchKeyword);
};

/*********************************************************************************************/
/* Function: getSearchClearButton                                                            */
/* Description: This function returns the reference of Clear button from Available           */
/*              Search field.                                                                */
/*                                                                                           */
/* Params: Not Applicable                                                                    */
/*                                                                                           */
/* Return: Returns promise which resolve to the reference of search clear button of available */
/*          search field.                                                                     */
/*********************************************************************************************/
AddRemoveColumns.prototype.getSearchBoxClearButton = function() {
  var xpathSearchClearButton = '//*[@data-qa-id="input-available-search" and contains(@class,"tf-clearable-textbox-show")]' +
    '/*[contains(@class, "clearable")]';
  return (element(by.xpath(xpathSearchClearButton)));
};

/*********************************************************************************************/
/* Function: getArrowButton                                                                  */
/* Description: This function is used to get the reference of specified arrow button from    */
/*              "Add/Remove Columns" dialog.                                                 */
/*                                                                                           */
/* Params: 1. arrowName -> specifies the name of the arrow button whose reference is needed. */
/*         Example: 'Left', 'Right', 'Up', 'Down'                                            */
/*                                                                                           */
/* Return: Returns promise which resolve to the reference of specified arrow button          */
/*********************************************************************************************/
AddRemoveColumns.prototype.getArrowButton = function(arrowName) {
  var xpathArrow;
  xpathArrow = '//*[contains(@dialog-title, "\'Add/Remove Columns\'")]//*[contains(@class,"icon-arrow-' + arrowName.toLowerCase() + '")]';
  return element(by.xpath(xpathArrow));
};

/*********************************************************************************************/
/* Function: getEleFromAvailAfterSearch                                                      */
/* Description: This function is used to get a particular element from the 'available'       */
/*              list after the search keyword is entered into the search field.              */
/*                                                                                           */
/* Params: elementName -> Name of the element whose reference is needed.                     */
/*         Example: 'Security', 'Pre Qty', 'Duration'                                        */
/*                                                                                           */
/* Return: Returns promise which resolve to the reference of required element.                */
/*********************************************************************************************/
AddRemoveColumns.prototype.getEleFromAvailAfterSearch = function(elementName) {
  var xpathElement;
  xpathElement = this.xpathAvailableContainer + '//*[@ng-repeat]//*[normalize-space(text() )="' + elementName + '" ]' +
    '/ancestor::*[@ng-repeat][1]/*[contains(@class,"selectable-handle")]';
  return element(by.xpath(xpathElement));
};

/*********************************************************************************************/
/* Function: getEleFromSelectedList                                                          */
/* Description: This function is used to get reference of specific element from the          */
/*              "Selected" section.                                                          */
/*                                                                                           */
/* Params: elementName -> Name of the element whose reference is required.                   */
/*         Example: 'As of', 'ISO'                                                           */
/*                                                                                           */
/* Return: Returns promise which resolves to the reference of required element from          */
/*          "Selected" section.                                                             */
/*********************************************************************************************/
AddRemoveColumns.prototype.getEleFromSelectedList = function(elementName) {
  var xpathElement = this.xpathSelectedContainer + '//*[@data-qa-id="section-selected" and descendant::*' +
    '//*[normalize-space(.)="' + elementName + '"]]/*[contains(@class,"selectable-handle")]';
  return element(by.xpath(xpathElement));
};

/*********************************************************************************************/
/* Function: expandAllCollapsedButtons                                                     */
/* Description: This function is used to make the given element into visibility.             */
/*                                                                                           */
/* Params: elementReference -> Reference of element which needs to be get into               */
/*                             visibility.                                                   */
/*********************************************************************************************/
AddRemoveColumns.prototype.expandAllCollapsedButtons = function() {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathExpandButton;
  var buttonStatus = [];
  xpathExpandButton = this.xpathAvailableContainer;
  xpathExpandButton += '//*[@tf-renamable-text]/ancestor::*[contains(@class, "selectable-handle")]//*[contains(@class, "icon-tree")]';

  buttonStatus = element.all(by.xpath(xpathExpandButton));
  buttonStatus.each(function(btnStatusRef) {
    btnStatusRef.getAttribute('class').then(function(attrValue) {
      if (attrValue.indexOf('closed') > -1) {
        btnStatusRef.click();
      }
    });
  });
  return promise;
};

/*********************************************************************************************/
/* Function: addNewColumnInTradePreview                                                      */
/* Description: This function is used to add a New column in TradePreview report.            */
/*                                                                                           */
/* Params: elementName -> Name of the element whose reference is required.                   */
/*         Example: 'As of', 'ISO'                                                           */
/*********************************************************************************************/
AddRemoveColumns.prototype.addNewColumnInTradePreview = function(colName) {
  var _this = this;
  var colRef = STUMainPage.getColumnFromTradePreview(colName);
  colRef.isPresent().then(function(isColPresent) {
    if (!isColPresent) {
      STUSolverPage.getButton('Add/Remove Columns').click().then(function() {
        _this.expandAllCollapsedButtons();
      }).then(function() {
        _this.getElementFromAvailableSection(colName).click();

        expect(_this.getElementFromAvailableSection(colName).getAttribute('class')).toContain('selected');
      }).then(function() {
        _this.getArrowButton('Right').click();

        expect(_this.getEleFromSelectedList(colName).isPresent()).toBeTruthy();
      }).then(function() {
        STUSolverPage.getButton('Save').click();
      });
    }

  });
};

module.exports = new AddRemoveColumns();
