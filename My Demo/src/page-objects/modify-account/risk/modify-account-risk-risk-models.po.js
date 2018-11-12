'use strict';

var ModifyAccountRiskRiskModels = function() {
};

/****************************************************************************************/
/* Function: getValueFromSearchBox                                                      */
/* Description: This function is used to get the reference of risk model drop down.     */
/* Return: Returns the reference of the drop down.                                      */
/****************************************************************************************/
ModifyAccountRiskRiskModels.prototype.getValueFromSearchBox = function() {
  var xpathDropDown = '//*[@data-qa-id="risk-rm-selected-section"]//tf-textbox//input';
  return element(by.xpath(xpathDropDown));
};

/****************************************************************************************/
/* Function: getValueFromMetadata                                                       */
/* Description: This function is used to get the reference of metadata section.         */
/* Return: Returns the reference of the metadata.                                      */
/****************************************************************************************/
ModifyAccountRiskRiskModels.prototype.getValueFromMetadata = function(value) {
  var xpathMetadata = '//*[@class="panel"]//*[@class="panel-header"][normalize-space(.)="' + value + '"]';
  return element(by.xpath(xpathMetadata));
};

/****************************************************************************************/
/* Function: getDropDown                                                      */
/* Description: This function is used to get the reference of risk model drop down.     */
/* Return: Returns the reference of the drop down.                                      */
/****************************************************************************************/
ModifyAccountRiskRiskModels.prototype.getDropDown = function(sectionName) {
  var xpathDropDown;
  if (sectionName.toLowerCase() === 'selected') {
    xpathDropDown = '//*[@data-qa-id="risk-rm-selected-section"]//*[contains(@class,"pa-dropdown-btn")]';
  }

  if (sectionName.toLowerCase() === 'select factor grouping') {
    xpathDropDown = '//*[@data-qa-id="dropdown-risk-rm-select-factor-grouping"]/tf-button';
  }

  return element(by.xpath(xpathDropDown));
};

/*******************************************************************************************/
/* Function: getLabelFromMetadata                                                          */
/* Description: This function is used to get the reference of labels from metadata section.*/
/* Return: Returns the reference of labels from the metadata.                              */
/*******************************************************************************************/
ModifyAccountRiskRiskModels.prototype.getLabelFromMetadata = function(labelName) {
  var xpathMetadata = '//*[@data-qa-id="risk-rm-metadata-section"]//*[@data-qa-id="label-risk-rm-' + labelName.toLowerCase().replace(/\s/g, '-') + '"]';
  return element(by.xpath(xpathMetadata));
};
/********************************************************************************************/
/* Function: getOptionFromDropDown                                                          */
/* Description: This function is used to get the reference of risk model drop down option.  */
/* Return: Returns the reference of the drop down option.                                   */
/********************************************************************************************/
ModifyAccountRiskRiskModels.prototype.getOptionFromDropDown = function(sectionName) {
  var xpathDropDownOption;
  xpathDropDownOption = '//*[contains(.,"' + sectionName + '")]/ancestor::*[@data-qa-class="dropdown-option"]';
  return element(by.xpath(xpathDropDownOption));
};

/****************************************************************************************/
/* Function: getElementInsideTree                                                       */
/* Description: This function is used to get a particular element reference from the    */
/*               Save Account as>Category.                                              */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: CLIENT:PV2                                       */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: TEST                                                   */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
ModifyAccountRiskRiskModels.prototype.getElementInsideTree = function(parentElementPath, elementName) {
  // Variable(s)
  var arrElements;
  var xpathParentElement;
  var xpathElement;
  arrElements = parentElementPath.split('|');
  if (arrElements.length === 1) {
    xpathParentElement = '//*[contains(@ng-model,"dropdownSelected")]/ul/*[contains(@class,"tf-treeview-group")]' + '/*[contains(@class,"tf-treeview-group-content")][normalize-space(.)="' + arrElements[0] + '"]' + '//parent::*[contains(@class,"tf-state")]';
  } else {
    xpathParentElement = '//*[contains(@ng-model,"dropdownSelected")]';
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement += '/ul/*[contains(@class,"tf-treeview-group")]/*[contains(@class,"tf-treeview-group-content")]' + '[normalize-space(.)="' + arrElements[i] + '"]//parent::*[contains(@class,"tf-state")]';
      if (i !== arrElements.length - 1) {
        xpathParentElement += '/ancestor::*/ul/*[contains(@class,"tf-treeview-group")]/following-sibling::*/';
      }
    }
  }

  xpathElement = xpathParentElement + '//*[@class="no-wrap"][normalize-space(.)="' + elementName + '"]';
  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: expandElementTree                                                          */
/* Description: This function is used to expand the tree elements from "DropDown"       */
/*              section.                                                                */
/* Params: elementPath -> Path of element tree which has to be expanded.                */
/* Return: NA                                                                           */
/****************************************************************************************/
ModifyAccountRiskRiskModels.prototype.expandElementTree = function(elementPath, click) {
  // Variable(s)
  var arrElements;
  var xpathExpandButton;
  arrElements = elementPath.split('|');
  xpathExpandButton = '//*[contains(@ng-model, "dropdownSelected")]';
  for (var i = 0; i < arrElements.length; i++) {
    xpathExpandButton += '/ul/*[contains(@class,"tf-treeview-group")]/*[contains(@class,"tf-treeview-group-content")]' + '[normalize-space(.)="' + arrElements[i] + '"]//*[@class="icon-tree-expander"]';
    if (i !== arrElements.length - 1) {
      xpathExpandButton += '/ancestor::*/ul/*[contains(@class,"tf-treeview-group")]/following-sibling::*/';
    }
  }

  if (click) {
    element(by.xpath(xpathExpandButton)).click();
  } else {
    return element(by.xpath(xpathExpandButton));
  }
};

/****************************************************************************************/
/* Function: checkIfExpanded                                                            */
/* Description: This function is used to check if the tree elements from "Available"    */
/*              section are expanded.                                                   */
/* Params: elementPath -> Path of element tree which has to be verified.                */
/* Return: NA                                                                           */
/****************************************************************************************/
ModifyAccountRiskRiskModels.prototype.checkIfExpanded = function(elementPath) {
  // Variable(s)
  var arrElements;
  var xpathParentElement;
  arrElements = elementPath.split('|');
  xpathParentElement = '//*[contains(@ng-model, "dropdownSelected")]';
  for (var i = 0; i < arrElements.length; i++) {
    xpathParentElement += '/ul/*[contains(@class,"tf-treeview-group")]/*[contains(@class,"tf-treeview-group-content")]' + '[normalize-space(.)="' + arrElements[i] + '"]//parent::*[contains(@class,"tf-state")]';

    // Click the expand button for each element
    expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
    if (i !== arrElements.length - 1) {
      xpathParentElement += '/ancestor::*/ul/*[contains(@class,"tf-treeview-group")]/following-sibling::*/';
    }
  }

  return element(by.xpath(xpathParentElement));
};

module.exports = new ModifyAccountRiskRiskModels();
