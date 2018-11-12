'use strict';

var TileOptionsExclusionsEditGroupingsOptions = function() {
  this.xpathSelectedContainer = '//*[@id="edit-exclusions-grouping"]//*[@data-qa-id="selected-section"]//*[@data-qa-id=' +
    '"groupings-add-remove-selected-tree"]';
  this.xpathOptionsContainer = '//*[@id="edit-exclusions-grouping"]//*[@data-qa-id="options-section"]';

};

/****************************************************************************************/
/* Function: getAllElements                                                             */
/* Description: This function is used to get all the elements from the "Selected"       */
/*              section container.                                                      */
/* Return: Returns the reference of the elements.                                       */
/****************************************************************************************/
TileOptionsExclusionsEditGroupingsOptions.prototype.getAllElements = function() {
  return element.all(by.xpath(this.xpathSelectedContainer + '//*[@data-qa-class="selected-item"]'));
};

/****************************************************************************************/
/* Function: getElementFromSelectedContainer                                            */
/* Description: This function is used to get a particular element's reference from the  */
/*              "Selected" section container.                                           */
/* Params: 1. itemName -> Item of which reference is needed.                            */
/*                                 Ex: Currency                                         */
/* Return: Returns the reference of passed element.                                     */
/****************************************************************************************/
TileOptionsExclusionsEditGroupingsOptions.prototype.getElementFromSelectedContainer = function(itemName) {
  return element(by.xpath(this.xpathSelectedContainer + '//*[@data-qa-class="selected-item" ' +
    'and descendant::*//*[normalize-space(text())="' + itemName + '"]]'));
};

/*******************************************************************************************************/
/* Function: getExpandableSection                                                                      */
/* Description: This function is used to get reference of one of the expandable sections               */
/*                                                                                                     */
/* Params: 1. sectionName -> Expandable section which is needed.                                       */
/*                                 Ex: Definition                                                      */
/* Return: Returns the reference of required Expandable section element.                               */
/*******************************************************************************************************/
TileOptionsExclusionsEditGroupingsOptions.prototype.getExpandableSection = function(sectionName) {
  return element(by.xpath(this.xpathOptionsContainer + '//*[@data-qa-id=' +
    '"groupings-' + sectionName.toLowerCase().replace(/\s/g, '-') + '-section"]/*[contains(@class, "nowrap")]'));
};

/********************************************************************************************************/
/* Function: getSectionCheckBox                                                                         */
/* Description: This function is used to get reference of the checkboxes under expandable sections.     */
/*              It also can perform a click action on the checkbox if click = true.                     */
/*                                                                                                      */
/* Params: 1. sectionName -> Expandable section under which checkbox is.                                */
/*                                 Ex: Definition                                                       */
/*         2. Checkbox -> Name of the checkbox which is needed.                                         */
/*                                 Ex: Cash                                                             */
/*         3. click -> pass 'true' if click action is to be performed on the checkbox.                  */
/* Return: Returns the reference of required Checkbox element.                                          */
/********************************************************************************************************/
TileOptionsExclusionsEditGroupingsOptions.prototype.getSectionCheckBox = function(sectionName, Checkbox, click) {

  // Setting default parameter
  if (click === undefined) {
    click = false;
  }

  // Setting the parameters values in order to create custom XPATH
  sectionName = sectionName.toLowerCase().replace(/\s/g, '-');

  var xpathCheckBox = this.xpathOptionsContainer + '//*[@data-qa-id="groupings-' + sectionName + '-section"]' +
    '//*[contains(@data-qa-id, "checkbox") and ancestor::*[normalize-space(.)="' + Checkbox + '"][1]]';

  if (click) {
    element(by.xpath(xpathCheckBox)).click();
    return element(by.xpath(xpathCheckBox));
  } else {
    return element(by.xpath(xpathCheckBox));
  }
};

/********************************************************************************************************/
/* Function: getElementFromDefinitionSectionForHighLow                                                  */
/* Description: This function is used to get reference of elements under 'Definition' section           */
/*                                                                                                      */
/* Params: 1. elementName -> Element reference to be fetched.                                           */
/*                          example:    'select high / low column', 'frequency' etc.                    */
/*                                                                                                      */
/* Return: Returns the reference of required element.                                                   */
/********************************************************************************************************/
TileOptionsExclusionsEditGroupingsOptions.prototype.getElementFromDefinitionSectionForHighLow = function(elementName) {
  if (elementName.toLowerCase() === 'select high / low column') {
    return element(by.xpath('//*[@id="edit-exclusions-grouping"]//*[@data-qa-id="options-section"]' +
      '//*[@data-qa-id="dropdown-hi-low-col"]//tf-button'));
  }

  if (elementName.toLowerCase() === 'frequency') {
    return element(by.xpath('//*[@id="edit-exclusions-grouping"]//*[@data-qa-id="dropdwon-groupings-def-frequency"]//button'));
  }

  if (elementName.toLowerCase() === 'number') {
    return element(by.xpath('//*[@id="edit-exclusions-grouping"]//*[@data-qa-id="label-groupings-def-number"]' +
      '/following-sibling::*//input'));
  }

  if (elementName.toLowerCase() === 'up arrow button') {
    return element(by.xpath('//*[@id="edit-exclusions-grouping"]//*[@data-qa-id="label-groupings-def-number"]' +
      '/following-sibling::*//*[contains(@class, "spin-up")]'));
  }

  if (elementName.toLowerCase() === 'down arrow button') {
    return element(by.xpath('//*[@id="edit-exclusions-grouping"]//*[@data-qa-id="label-groupings-def-number"]' +
      '/following-sibling::*//*[contains(@class, "spin-down")]'));
  }
};

/*******************************************************************************************************/
/* Function: getAllDropDownOptions                                                                     */
/* Description: This function is used to get reference of all elements under a dropdown box.           */
/*                                                                                                     */
/* Return: Returns reference of items listed under any dropdown.                                       */
/*******************************************************************************************************/
TileOptionsExclusionsEditGroupingsOptions.prototype.getAllDropDownOptions = function() {
  // Variable(s)
  var xpathOptions = '//tf-dropdown//*[@data-qa-class="dropdown-option"]';

  return element.all(by.xpath(xpathOptions));
};

/*******************************************************************************************************/
/* Function: getDropDownItem                                                                           */
/* Description: This function is used to get reference of passed item from dropdown list.              */
/*                                                                                                     */
/* Return: Returns the reference of required item.                                                     */
/*******************************************************************************************************/
TileOptionsExclusionsEditGroupingsOptions.prototype.getDropDownItem = function(itemName) {
  var xpathOption = '//*[contains(@class, "dd-position") and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-class="dropdown-option" and normalize-space(.)="' + itemName + '"]';

  return element(by.xpath(xpathOption));
};

/****************************************************************************************/
/* Function: expandSectionInOptionsPane                                                 */
/* Description: This function is used expand the given section in 'Options' pane.       */
/* Params: sectionName -> Name of the section to be expanded.                           */
/* Return: Promise which resolves to boolean value                                      */
/****************************************************************************************/
TileOptionsExclusionsEditGroupingsOptions.prototype.expandSectionInOptionsPane = function(sectionName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;

  // Check if  section is already expanded, if  not, expand the section
  this.getExpandableSection(sectionName).getAttribute('class').then(function(attrValue) {
    if (attrValue.indexOf('collapsed') > -1) {
      _this.getExpandableSection(sectionName).click();

      // Check if  section is expanded
      _this.getExpandableSection(sectionName).getAttribute('class').then(function(attrValue) {
        if (attrValue.indexOf('collapsed') > -1) {
          defer.reject(false);
        } else {
          defer.fulfill(true);
        }
      });
    } else {
      defer.fulfill(true);
    }
  });

  return promise;
};

/*******************************************************************************************************/
/* Function: verifyDropdownList                                                                        */
/* Description: This function is used to verify the list under any dropdown.                           */
/*                                                                                                     */
/* Params: 1. arrListItems -> An array containing the list of items.                                   */
/*                                                                                                     */
/*         2. dropdownReference -> Object reference of dropdown button.                                */
/*                                                                                                     */
/* Return: None.                                                                                       */
/*******************************************************************************************************/
TileOptionsExclusionsEditGroupingsOptions.prototype.verifyDropdownList = function(arrListItems, dropdownReference) {
  var i = 0;

  // Clicking on the dropdown to get the list.
  dropdownReference.click();
  expect(this.getAllDropDownOptions().count()).not.toEqual(0);
  this.getAllDropDownOptions().each(function(element) {
    expect(element.getText()).toEqual(arrListItems[i]);
    i++;
  });

  // Clicking on the dropdown to close the dropdown list.
  dropdownReference.click();
};

/*******************************************************************************************************/
/* Function: getSectionRadioBtn                                                                        */
/* Description: This function is used to get reference of the Radio buttons under expandable sections. */
/*              It also can perform a click action on the Radio button if 'true' is passed to 'click'. */
/*                                                                                                     */
/* Params: 1. sectionName -> Expandable section under which Radio button is.                           */
/*                                 Ex: Definition                                                      */
/*         2. RadioBtn -> Name of the Radio button which is needed.                                    */
/*                                 Ex: Cash                                                            */
/*         3. click -> pass 'true' if click action is to be performed on the Radio button.             */
/* Return: Returns the reference of required Radio button element.                                     */
/*******************************************************************************************************/
TileOptionsExclusionsEditGroupingsOptions.prototype.getSectionRadioBtn = function(sectionName, radioBtn, click) {
  // Setting default parameter
  if (click === undefined) {
    click = false;
  }

  var xpathRadioButton = this.xpathOptionsContainer + '//*[@data-qa-id=' +
    '"groupings-' + sectionName.toLowerCase().replace(/\s/g, '-') + '-section"]//*[normalize-space(.)="' + radioBtn + '"]' +
    '//*[contains(@data-qa-id, "radio")]';

  if (click) {
    element(by.xpath(xpathRadioButton)).click();
    return element(by.xpath(xpathRadioButton));
  } else {
    return element(by.xpath(xpathRadioButton));
  }
};

/*******************************************************************************************************/
/* Function: getEleFromDefinitionSectionForCompositeGroupings                                          */
/* Description: This function is used to get reference of elements under 'Definition' section for      */
/*              'Composite Assets' and 'Composite Components'.                                         */
/* Params: 1. elementName -> Element reference to be fetched.                                          */
/*                          example:    'advanced benchmark options', 'frequency' etc                  */
/*                                                                                                     */
/* Return: Returns the reference of required element.                                                  */
/*******************************************************************************************************/
TileOptionsExclusionsEditGroupingsOptions.prototype.getEleFromDefinitionSectionForCompositeGroupings = function(elementName) {
  if (elementName.toLowerCase() === 'advanced benchmark options') {
    return element(by.xpath('//*[@data-qa-id="dropdwon-groupings-def-advanced-benchmark-options"]//button'));
  }

  if (elementName.toLowerCase() === 'frequency') {
    return element(by.model('currentGroup.Attribs.freq'));
  }
};

/*******************************************************************************************************/
/* Function: getDropDownFromDefinitionSection                                                          */
/* Description: This function is used to get reference of drop down under 'Definition' section.        */
/*                                                                                                     */
/* Params: 1. ddName -> Drop Down name whose reference is needed.                                      */
/*            Ex: Fractiles, Bins Based On, Bins Use Equal etc.                                        */
/*         2. isLabeled (optional) -> Default value is TRUE. If this is set to FALSE it'll get the     */
/*                                    reference of unlabeled drop down from the section.               */
/*                                                                                                     */
/* NOTE: When isLabeled = FALSE, you can pass ddName as "undefined".                                   */
/*                                                                                                     */
/* Return: Returns the reference of required drop down.                                                */
/*******************************************************************************************************/
TileOptionsExclusionsEditGroupingsOptions.prototype.getDropDownFromDefinitionSection = function(ddName, isLabeled) {
  // Variable(s)
  var xpathElement;

  // Setting the default parameter (isLabeled)
  if (isLabeled === undefined) {
    isLabeled = true;
  }

  // Get XPATH of labeled Drop Down
  if (isLabeled) {
    if (ddName.toLowerCase() === 'fractiles') {
      xpathElement = '//*[@id="edit-exclusions-grouping"]//*[@data-qa-id="label-groupings-def-fractiles"]/following-sibling::*' +
        '//*[@ng-model="fracViewModel.name"]';
    } else if (ddName.toLowerCase() === 'frequency') {
      xpathElement = '//*[@id="edit-exclusions-grouping"]//*[contains(@data-qa-id, "groupings-def-frequency") and contains(@class,' +
        ' "dropdown")]//button';
    } else {
      xpathElement = '//*[@id="edit-exclusions-grouping"]//*[@data-qa-id="dropdown-' + ddName.toLowerCase().replace
        (/\s/g, '-') + '"]//button';
    }
  } else {
    xpathElement = '//*[@id="grpDefDropDown"]//button';
  }

  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: verifyToolTip                                                              */
/* Description: This function is used verify the tooltip of the given column name       */
/*              'Selected' container.                                                   */
/* Params: 1. groupingsName -> Name of the groupings to hover over.                     */
/*            Ex: Bench. Ending Weight (from Selected container)                        */
/*         2. tooltipText -> Text of the expected tooltip. If "isTooltipText" variable  */
/*            is set to FALSE set this variable either to "" or "undefined".            */
/*         3. isTooltipExpected (optional) -> By default it is set to TRUE. If set to   */
/*            FALSE it has to verify that tooltip did not appear.                       */
/* Return: Promise which resolves to TRUE if tooltip matches otherwise Error Message.   */
/****************************************************************************************/
TileOptionsExclusionsEditGroupingsOptions.prototype.verifyToolTip = function(groupingsName, tooltipText, isTooltipExpected) {
  var defer = protractor.promise.defer();
  var tooltipRef;
  var promise = defer.promise;
  var _this = this;
  var xpathTooltip = '//tf-tooltip-display';
  if (isTooltipExpected === undefined) {
    isTooltipExpected = true;
  }

  browser.actions().mouseMove(this.getElementFromSelectedContainer(groupingsName)
    .$('tf-listbox2-item-title tf-tooltip2')).perform();
  browser.sleep(2000);

  // Try getting the reference of tooltip
  tooltipRef = element(by.xpath(xpathTooltip));

  if (isTooltipExpected === true) {
    // Get the tooltip text from the web page
    tooltipRef.getText().then(function(actualToolTipText) {
      if (tooltipText !== actualToolTipText) {
        defer.reject('Tool tip text did not match. Expected: ' + tooltipText + ', Found: ' + actualToolTipText);

        // Perform mouse move to hover over other element
        browser.actions().mouseMove(_this.getElementFromSelectedContainer(groupingsName), 100, 100).perform();
      } else {
        defer.fulfill(true);

        // Perform mouse move to hover over other element
        browser.actions().mouseMove(_this.getElementFromSelectedContainer(groupingsName), 100, 100).perform();
      }
    });
  } else if (isTooltipExpected === false) {
    tooltipRef.isPresent().then(function(isFound) {
      if (isFound === true) {
        defer.reject('Tooltip appeared when it is not expected');

        // Perform mouse move to hover over other element
        browser.actions().mouseMove(_this.getElementFromSelectedContainer(groupingsName), 100, 100).perform();
      } else if (isFound === false) {
        defer.fulfill(true);

        // Perform mouse move to hover over other element
        browser.actions().mouseMove(_this.getElementFromSelectedContainer(groupingsName), 100, 100).perform();
      }
    });
  }

  return promise;
};

module.exports = new TileOptionsExclusionsEditGroupingsOptions();
