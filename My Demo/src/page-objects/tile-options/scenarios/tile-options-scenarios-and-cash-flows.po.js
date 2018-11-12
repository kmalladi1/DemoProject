'use strict';

var TileOptionsScenariosAndCashFlows = function() {

  // Variables
  this.xpathAvailableContainer = '//*[@data-qa-id="fi-scenario-section"]/*[contains(@class,"source")]';
  this.xpathSelectedContainer = '//*[@data-qa-id="fi-scenario-section"]/*[contains(@class,"target")]';
  this.xpathFrequenciesSection = '//*[@data-qa-id="fi-pcf-frequencies-section"]';
  this.xpathFrequenciesTextbox = '//*[normalize-space(.)="replacingText"]//ancestor::tf-textbox';
  this.xpathHorizonListBox = '//*[@data-qa-id="fi-scenario-analysis-section"]//*[contains(@id,"horizon-listbox")]';
};

/****************************************************************************************/
/* Function: getReinvestmentAssumptionDropDown                                          */
/* Description: This function is used to get the reference of Reinvestment Assumption   */
/*                drop down                                                             */
/* Return: Returns the reference of Reinvestment Assumption element.                    */
/****************************************************************************************/

// Return the reference of "Reinvestment Assumption" drop down element from 'Projected Cash Flows'
TileOptionsScenariosAndCashFlows.prototype.getReinvestementAssumptionDropDown = function() {
  var xpathReinvestementAssumptionDropDown;
  xpathReinvestementAssumptionDropDown = '//*[@data-qa-id="dropdown-fi-pcf-reinvestment-assumption"]//tf-button';
  return element(by.xpath(xpathReinvestementAssumptionDropDown));
};

/***************************************************************************************************************/
/* Function: getOptionFromReinvestmentAssumptionDropDown                                                       */
/* Description: This function is used to get reference of option from drop down.                               */
/* Params: optionName -> Name of the option whose reference is needed.                                         */
/* Return: Promise which resolves to the reference of required option from drop down.                          */
/***************************************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.getOptionFromReinvestmentAssumptionDropDown = function(optionName) {
  var xpathDropDownItem = '//tf-dropdown//*[@data-qa-class="dropdown-option" and normalize-space(.)= "' + optionName + '"]';
  return element(by.xpath(xpathDropDownItem));
};

/***************************************************************************************************************/
/* Function: getCompleteTextBoxOfReinvestmentAssumption                                                                */
/* Description: This function is used to get reference of text box of Reinvestment Assumption.                 */
/* Params: optionName -> Name of the option from drop down.                                                    */
/* Return: Promise which resolves to the reference of required text box option.                                */
/***************************************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.getCompleteTextBoxOfReinvestmentAssumption = function(optionName) {
  var xpathOfReinvestmentAssumption = '//*[@data-qa-id="fi-pcf-reinvestment-assumption-section"]';
  var xpathTextBoxOfReinvestmentAssumption;
  if (optionName.toLowerCase() === 'flat') {
    xpathTextBoxOfReinvestmentAssumption = xpathOfReinvestmentAssumption + '//*[@id="pa-fi-pcf-flat-text-box"]';
  } else if (optionName.toLowerCase() === 'forwards + spread') {
    xpathTextBoxOfReinvestmentAssumption = xpathOfReinvestmentAssumption + '//*[@id="pa-fi-pcf-bps-text-box"]';
  }

  return element(by.xpath(xpathTextBoxOfReinvestmentAssumption));
};

/***************************************************************************************************************/
/* Function: getTextBoxOfReinvestmentAssumption                                                                */
/* Description: This function is used to get reference of text box of Reinvestment Assumption.                 */
/* Params: optionName -> Name of the option from drop down.                                                    */
/* Return: Promise which resolves to the reference of required text box option.                                */
/***************************************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.getTextBoxOfReinvestmentAssumption = function(optionName) {
  var xpathOfReinvestmentAssumption = '//*[@data-qa-id="fi-pcf-reinvestment-assumption-section"]';
  var xpathTextBoxOfReinvestmentAssumption;
  if (optionName.toLowerCase() === 'flat') {
    xpathTextBoxOfReinvestmentAssumption = xpathOfReinvestmentAssumption + '//*[@id="pa-fi-pcf-flat-text-box"]//input';
  } else if (optionName.toLowerCase() === 'forwards + spread') {
    xpathTextBoxOfReinvestmentAssumption = xpathOfReinvestmentAssumption + '//*[@id="pa-fi-pcf-bps-text-box"]//input';
  }

  return element(by.xpath(xpathTextBoxOfReinvestmentAssumption));
};

/***************************************************************************************************************/
/* Function: getReportLayoutRadioButton                                                                        */
/* Description: This function is used to get reference of Radio button of Report Layout.                       */
/* Params: section -> section name either "Scenario Analysis" or "Projected Cash Flows"                        */
/*         optionName -> Name of the option whose reference is needed.                                         */
/* Return: Promise which resolves to the reference of required Radio Button.                                   */
/***************************************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.getReportLayoutRadioButton = function(section, optionName) {

  var xpathReportLayout;
  var xpathReportLayoutRadioBtn;
  if (section === 'Project Cash Flows') {
    xpathReportLayout = '//*[@data-qa-id="fi-pcf-report-layout-section"]';
    if (optionName.toLowerCase() === 'cash flows columns, then dates') {
      xpathReportLayoutRadioBtn = xpathReportLayout + '//*[@data-qa-id="radio-button-fi-pcf-cash-flow-columns-then-dates"]' +
        '/tf-radio-control';
    } else if (optionName.toLowerCase() === 'cash flows dates, then columns') {
      xpathReportLayoutRadioBtn = xpathReportLayout + '//*[@data-qa-id="radio-button-fi-pcf-cash-flow-dates-then-columns"]' +
        '/tf-radio-control';
    }
  } else if (section === 'Scenario Analysis') {
    xpathReportLayout = '//*[@id="pa-fi-scenario-report-order"]';
    if (optionName === 'Horizons Then Scenarios') {
      xpathReportLayoutRadioBtn = xpathReportLayout + '//*[@data-qa-id="radio-button-horizons-then-scenarios"]/tf-radio-control';
    } else if (optionName === 'Scenarios Then Horizons') {
      xpathReportLayoutRadioBtn = xpathReportLayout + '//*[@data-qa-id="radio-button-scenarios-then-horizons"]/tf-radio-control';
    }
  }

  return element(by.xpath(xpathReportLayoutRadioBtn));
};

/***************************************************************************************************************/
/* Function: getFrequenciesRadioButton                                                                         */
/* Description: This function is used to get reference of Radio button of Frequencies section.                 */
/* Params: optionName -> Name of the option whose reference is needed.                                         */
/* Return: Promise which resolves to the reference of required Radio Button.                                   */
/***************************************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.getFrequenciesRadioButton = function(optionName) {
  var xpathFrequenciesRadioBtn;
  if (optionName.toLowerCase() === 'custom') {
    xpathFrequenciesRadioBtn = this.xpathFrequenciesSection + '//*[@data-qa-id="radio-button-fi-pcf-custom"]' +
      '/*[contains(@class,"tf-radio")]';
  } else if (optionName.toLowerCase() === 'last cash flow') {
    xpathFrequenciesRadioBtn = this.xpathFrequenciesSection + '//*[@data-qa-id="radio-button-fi-pcf-last-cash-flow"]' +
      '/*[contains(@class,"tf-radio")]';
  }

  return element(by.xpath(xpathFrequenciesRadioBtn));
};

/********************************************************************************************************************/
/* Function: isCheckBoxChecked                                                                                      */
/* Description: This function checks whether the given Check box is checked                                         */
/*                                                                                                                  */
/* Params: 1. checkBoxName -> Name of the checkBox                                                                  */
/*                                                                                                                  */
/* Return: Returns promise which refers true if the given checkBox is checked.                                      */
/********************************************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.isCheckBoxChecked = function(checkedBoxName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathCheckBox = this.xpathFrequenciesSection + '//*[normalize-space(.)="' + checkedBoxName + '"]' +
    '[contains(@data-qa-class, "checkbox")]//tf-checkbox-control';

  // If checkBox is checked "data-checked" attribute value contains the text "checked".
  element(by.xpath(xpathCheckBox)).getAttribute('class').then(function(text) {
    if (text === '') {
      defer.fulfill(false);
    } else {
      defer.fulfill(true);
    }
  });

  return promise;
};

/********************************************************************************************************************/
/* Function: getFrequenciesCustomCheckBox                                                                           */
/* Description: This function check the given checkBox of Custom in the Frequencies .                               */
/*                                                                                                                  */
/* Params: 1. checkBoxName -> Name of the checkBox                                                                  */
/*                                                                                                                  */
/* Return: Returns promise which refers true if the given checkBox is checked.                                      */
/********************************************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.getFrequenciesCustomCheckBox = function(checkBoxName) {
  var xpathFrequenciesCustomCheckBox = this.xpathFrequenciesSection + '//*[normalize-space(.)="' + checkBoxName + '"]' +
    '[contains(@data-qa-class, "checkbox")]/tf-checkbox-control';

  return element(by.xpath(xpathFrequenciesCustomCheckBox));
};

/***************************************************************************************************************/
/* Function: getFrequenciesCustomTextBox                                                                       */
/* Description: This function is used to get reference of Text box of Custom in Frequencies section.           */
/* Params: optionName -> Name of the option whose reference is needed.                                         */
/* Return: Promise which resolves to the reference of required Text Box.                                       */
/***************************************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.getFrequenciesCustomTextBox = function(optionName) {
  var xpathFrequenciesCustomCheckBox = this.xpathFrequenciesSection + '//*[normalize-space(.)="' + optionName + '"]' +
    '//following-sibling::*/*[@data-qa-class="input-box-custom-frequencies"]//input';

  return element(by.xpath(xpathFrequenciesCustomCheckBox));
};

/************************************************************************************************************/
/* Function: getButton                                                                                     */
/* Description: This function is used to get reference of specified arrow button                            */
/* Params: 1. btnName -> Name of the button for which reference has to be collected.                        */
/*                       Ex: Right, Left, Up, Down.                                                         */
/* Return: Promise which resolves to reference of button.                                                   */
/************************************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.getButton = function(btnName) {
  var xpathButton;
  if (btnName.toLowerCase() === 'leftarrow') {
    xpathButton = '//*[@data-qa-id="fi-scenario-section"]//*[@class="icon-arrow-left-s"]/..';
  } else if (btnName.toLowerCase() === 'rightarrow') {
    xpathButton = '//*[@data-qa-id="fi-scenario-section"]//*[@class="icon-arrow-right-s"]/..';
  } else if (btnName.toLowerCase() === 'uparrow') {
    xpathButton = '//*[@data-qa-id="fi-scenario-section"]//*[@class="icon-arrow-up"]/..';
  } else if (btnName.toLowerCase() === 'downarrow') {
    xpathButton = '//*[@data-qa-id="fi-scenario-section"]//*[@class="icon-arrow-down"]/..';
  } else if (btnName.toLowerCase() === 'close') {
    xpathButton = '//*[@data-qa-id="fi-scenario-section"]//*[@class="icon-close-s"]/..';
  }

  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getAllElementsFromSelected                                                 */
/* Description: This function is used to get reference of all the elements either from  */
/*               Selected section.                                                      */
/* Return: Returns the reference of all the elements from the Selected section.         */
/****************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.getAllElementsFromSelected = function() {
  return element.all(by.xpath(this.xpathSelectedContainer + '//li'));
};

/****************************************************************************************/
/* Function: getAllElementsFromAvailableAfterSearch                                     */
/* Description: This function is used to get reference of all the elements either from  */
/*               Selected section.                                                      */
/* Return: Returns the reference of all the elements from the Selected section.         */
/****************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.getAllElementsFromAvailableAfterSearch = function() {
  return element.all(by.xpath(this.xpathAvailableContainer + '//*[@data-value="FactSet"]' +
    '//li[not(contains(@style,"display:none"))]'));
};

/****************************************************************************************/
/* Function: expandElementTree                                                          */
/* Description: This function is used to expand the tree passed as an argument to the   */
/*              function.                                                               */
/* Params: 1. elementPath -> Path of tree to be expanded.                               */
/*            Ex: Commercial Services|Personnel Services                                */
/*         2. excludeElements -> Specify the elements to be excluded from expanding.    */
/*            for Example, to exclude "FactSet and Portfolio" from "FactSet|Portfolio|  */
/*            Position Data" then parameter should be "FactSet|Portfolio".              */
/****************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.expandElementTree = function(elementPath, excludeElements) {
  var arrElements = elementPath.split('|');
  var xpathExpandButton;
  var i;
  var arrFIElements;
  if (excludeElements === undefined) {
    arrFIElements = undefined;
  } else {
    arrFIElements = excludeElements.split('|');
  }

  xpathExpandButton = this.xpathAvailableContainer;

  if (arrElements.length === 1) {
    xpathExpandButton += '//ul/li/div[.="' + arrElements[0] + '"]//a';
    element(by.xpath(xpathExpandButton)).click();
  } else {
    for (i = 0; i < arrElements.length; i++) {
      xpathExpandButton += '//ul/li/div[.="' + arrElements[i] + '"]//a';

      if (arrFIElements === undefined) {
        element(by.xpath(xpathExpandButton)).click();
      } else if (arrFIElements.indexOf(arrElements[i]) < 0) {
        element(by.xpath(xpathExpandButton)).click();
      } else {
        arrFIElements.splice(arrFIElements.indexOf(arrElements[i]), 1);
      }

      if (i !== arrElements.length - 1) {
        xpathExpandButton += '/ancestor::li[1]';
      }
    }
  }
};

/****************************************************************************************/
/* Function: checkIfExpanded                                                            */
/* Description: This function is used to verify if given element(s) is/are expanded or  */
/*              not.                                                                    */
/* Params: 1. elementPath -> Path of tree to be verified.                               */
/*            Ex: Commercial Services|Personnel Services.                               */
/*            In this example, it verifies whether "Commercial Services" and "Personnel */
/*            Services" is expanded. If not, it fails the expectation.                  */
/****************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.checkIfExpanded = function(elementPath) {
  var arrElements = elementPath.split('|');
  var xpathParentElement;
  var i;
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//ul/li/div[.="' + arrElements[0] + '"]//a/ancestor::li[1]';
    expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (i = 0; i < arrElements.length; i++) {
      if (i !== arrElements.length - 1) {
        xpathParentElement += '//ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[1]';
        if (i === 0) {
          expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
        } else {
          expect(element(by.xpath(xpathParentElement + '[1]')).getAttribute('class')).toContain('expanded');
        }
      } else {
        xpathParentElement += '//ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[1]';
        expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
      }
    }
  }

  return element(by.xpath(xpathParentElement));
};

/****************************************************************************************/
/* Function: getElementFromAvailableSection                                             */
/* Description: This function is used to get a particular element reference from the    */
/*              "Available" section container.                                          */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet                                          */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: All Curves Shift down 350 bps                          */
/*         3. isTreeElement(optional) -> It tells whether required element is a tree    */
/*                                       element. Default value is FALSE. If this is set*/
/*                                       to TRUE it gets the reference of tree element. */
/* Return: Returns the reference of required element.                                   */
/* NOTE: Don't specify elementName when you want to get tree element from first level.  */
/****************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.getElementFromAvailableSection = function(parentElementPath, elementName, isTreeElement) {
  var arrElements = parentElementPath.split('|');
  var xpathParentElement;
  var i;
  if (isTreeElement === undefined) {
    isTreeElement = false;
  }

  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//ul/li/div[.="' + arrElements[0] + '"]//a/ancestor::li[1]';
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (i = 0; i < arrElements.length; i++) {
      if (i !== arrElements.length - 1) {
        xpathParentElement += '//ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li';
      } else {
        xpathParentElement += '//ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[1]';
      }
    }
  }

  if (isTreeElement) {
    // If elementName is not passed that means user want reference of parent element
    // This is applicable only for the tree element from 1st level
    if (elementName !== undefined) {
      return element(by.xpath(xpathParentElement + '//ul/li/div[text()="' + elementName + '"]'));
    } else {
      return element(by.xpath(xpathParentElement));
    }
  } else {
    return element(by.xpath(xpathParentElement + '//ul/li[.="' + elementName + '"]'));
  }

};

/****************************************************************************************/
/* Function: getEleFromSelectedList                                                     */
/* Description: This function is used to get reference of particular element from the   */
/*              "Selected" section.                                                     */
/* Params: elementName -> Name of the element whose reference is required.              */
/*                Ex: FactSet All Curves Shift down 205 bps.                            */
/* Return: Returns the reference of required element from "Selected" section.           */
/****************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.getEleFromSelectedList = function(elementName) {
  // Return the reference
  return element(by.xpath(this.xpathSelectedContainer + '//*[@class="listbox tf-buttons-container"]' +
    '/ul/li[.="' + elementName + '"]'));
};

/****************************************************************************************/
/* Function: getInputField                                                              */
/* Description: This function is used to get reference of specified input field         */
/*Param: fieldName ->  Name of field the for which reference has to be collected        */
/*                          Ex: available (or) horizon months                            */
/* Return: Returns the reference of horizon month text field.                           */
/****************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.getInputField = function(fieldName) {
  if (fieldName.toLowerCase() === 'horizon months') {
    // Return the reference
    return element(by.xpath('//*[@data-qa-id="input-box-fi-horizon-months"]/input'));
  } else if (fieldName.toLowerCase() === 'available') {
    // Return the reference
    return element(by.xpath('//*[@data-qa-id="fi-scenario-section"]//input'));
  }
};

/****************************************************************************************/
/* Function: getHorizonMonthsAddbtn                                                     */
/* Description: This function is used to get reference of horizon month Add button      */
/* Return: Returns the reference of horizon month Add button                            */
/****************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.getHorizonMonthsAddbtn = function() {
  // Return the reference
  return element(by.xpath('//*[@data-qa-id="fi-horizon-add"]'));
};

/****************************************************************************************/
/* Function: getOptionsDeleteIcon                                                       */
/* Description: This function is used to get delete icon of the particular 'elementName */
/*              which is available in Selected section                                  */
/* Params: 1. elementName -> name of the element to be selected                         */
/* Return : NA                                                                          */
/****************************************************************************************/
TileOptionsScenariosAndCashFlows.prototype.getOptionsDeleteIcon = function(elementName) {
  return this.getEleFromSelectedList(elementName).element(by.xpath('//div[@class="icon-remove-i"]'));
};

module.exports = new TileOptionsScenariosAndCashFlows();

