'use strict';
var DocumentOptionsFixedIncomeAnalyticsSources = function() {
  this.xpathPortfolioSection = '//*[@data-qa-id="fi-as-portfolio-section"]';
  this.xpathBenchmarkSection = '//*[@data-qa-id="fi-as-benchmark-section"]';
  this.xpathAvailableSection = '//*[@data-qa-id="analytics-sources-sources-available"]';
  this.xpathSelectedSection = '//*[@data-qa-id="analytics-sources-sources-selected"]';
  this.xpathPortfolioTransferbox = this.xpathPortfolioSection + '//tf-transferbox';
  this.xpathBenchmarkTransferbox = this.xpathBenchmarkSection + '//tf-transferbox';
  this.xpathPortfolioAvailableOrSelectedSection = this.xpathPortfolioSection + '//*[@data-qa-id="analytics-sources-sources-replacingText"]';
  this.xpathBenchmarkAvailableOrSelectedSection = this.xpathBenchmarkSection + '//*[@data-qa-id="analytics-sources-sources-replacingText"]';
  this.xpathPortfolioOrBenchmarkSearchBox = '//*[@data-qa-id="fi-as-replacingText-section"]//tf-textbox';
  this.xpathPortfolioOrBenchmarkAvailableSection = '//*[@data-qa-id="fi-as-replacingText-section"]' +
    '//*[@data-qa-id="analytics-sources-sources-available"]';
  this.xpathOfRequiredDisabledTransferBox = '//*[@data-qa-id="fi-analytics-source-section"]//*[@data-qa-id="fi-as-replacingText-section"]//tf-disabled-shield';

};

/************************************************************************************************************/
/* Function: getRestoreDefaultsButton                                                                       */
/* Description: This function is used to get the reference of 'Restore Defaults' button.                    */
/************************************************************************************************************/
DocumentOptionsFixedIncomeAnalyticsSources.prototype.getRestoreDefaultsButton = function() {
  return element(by.xpath('//div[@id="fixed-income-analytics-source-tab"]//*[@data-qa-class="button-restore-defaults"]/button'));
};

/************************************************************************************************************/
/* Function: getDefaultsApplied                                                                             */
/* Description: This function is used to get the reference of 'Defaults Applied' note.                      */
/************************************************************************************************************/
DocumentOptionsFixedIncomeAnalyticsSources.prototype.getDefaultsApplied = function() {
  var xpathButton = '//*[@id="fixed-income-analytics-source-tab"]//*[normalize-space(.)="Defaults Applied"]/i/..';
  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getCheckBox                                                                */
/* Description:  This function is used to get check boxes from 'Analytics Source' pill  */
/*                  under Fixed Income Tab.                                             */
/* Params: 1. checkBoxName -> Name of the check box.                                    */
/* Return: Returns the reference of required check box.                                 */
/****************************************************************************************/
DocumentOptionsFixedIncomeAnalyticsSources.prototype.getCheckBox = function(checkBoxName) {
  // Variable(s)
  var xpathCheckBox;

  xpathCheckBox = '//*[@data-qa-id="checkbox-' + checkBoxName.toLowerCase().replace(/\s/g, '-') + '"]' +
    '/tf-checkbox-control';

  return element(by.xpath(xpathCheckBox));
};

/****************************************************************************************/
/* Function: getPortfolioSection                                                        */
/* Description: This function is used to get Portfolio Section                          */
/* Return: Returns the reference of Portfolio Section.                                  */
/****************************************************************************************/
DocumentOptionsFixedIncomeAnalyticsSources.prototype.getPortfolioSection = function() {
  return element(by.xpath(this.xpathPortfolioSection));
};

/****************************************************************************************/
/* Function: getBenchmarkSection                                                        */
/* Description: This function is used to get Benchmark Section                          */
/* Return: Returns the reference of Benchmark Section.                                  */
/****************************************************************************************/
DocumentOptionsFixedIncomeAnalyticsSources.prototype.getBenchmarkSection = function() {
  return element(by.xpath(this.xpathBenchmarkSection));
};

/****************************************************************************************/
/* Function: getElement                                                                 */
/* Description: This function is used to get any element from Fixed Income Tab          */
/* Params: 1. elementName -> name of the element to be selected                         */
/*         2. elementType -> the type of element either tree or list                    */
/*         3. subSectionName -> sub section name in which element is present            */
/*                              either Available or Selected                            */
/*         4. sectionName -> section name in which element is present                   */
/*                          either Portfolio or Benchmark                               */
/*         5. parentElementPath -> Parent element in which required element is present. */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
DocumentOptionsFixedIncomeAnalyticsSources.prototype.getElement = function(elementName, subSectionName, sectionName,
                                                                           parentElementPath) {
  var xpathElement;

  if (sectionName.toLowerCase() === 'portfolio') {
    xpathElement = this.xpathPortfolioSection;
  } else if (sectionName.toLowerCase() === 'benchmark') {
    xpathElement = this.xpathBenchmarkSection;
  }

  if (subSectionName.toLowerCase() === 'available') {
    xpathElement += this.xpathAvailableSection;
  } else if (subSectionName.toLowerCase() === 'selected') {
    xpathElement += this.xpathSelectedSection;
  }

  if (parentElementPath !== undefined) {
    var arrElements = parentElementPath.split('|');
    for (var i = 0; i < arrElements.length; i++) {
      xpathElement += '//tf-listbox-item[descendant::*//*[normalize-space(.)="' + arrElements[i] + '"]]' +
        '/*[contains(@class, "selectable-handle")]';

      if (i !== arrElements.length - 1) {
        xpathElement += '/following-sibling::*/';
      }
    }
  }

  xpathElement = xpathElement + '/following-sibling::*//tf-listbox-item[descendant::*' +
    '//*[normalize-space(.)="' + elementName + '"]]';

  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: expandElementTree                                                          */
/* Description: This function is used to expand the Tree passed as an argument to the   */
/*              function.                                                               */
/* Params: 1. elementPath -> Path of tree to be expanded.                               */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. sectionName -> section name in which element is present                   */
/*                          either Portfolio or Benchmark                               */
/****************************************************************************************/
DocumentOptionsFixedIncomeAnalyticsSources.prototype.expandElementTree = function(elementPath, sectionName) {
  // Variable( s )
  var arrElements;
  var xpathExpandButton;

  arrElements = elementPath.split('|');

  // based on the sectionName passed make the xpath
  if (sectionName.toLowerCase() === 'portfolio') {
    xpathExpandButton = this.xpathPortfolioSection;
  } else if (sectionName.toLowerCase() === 'benchmark') {
    xpathExpandButton = this.xpathBenchmarkSection;
  }

  // for  each element in elementPath in available section perfor m the expand operation
  xpathExpandButton += this.xpathAvailableSection;
  for (var i = 0; i < arrElements.length; i++) {
    xpathExpandButton += '/div/ul/li/div[.="' + arrElements[i] + '"]//a';

    // Click the expand button for  each element
    element(by.xpath(xpathExpandButton)).click();
    if (i !== arrElements.length - 1) {
      xpathExpandButton += '/ancestor::li';
    }
  }
};

/****************************************************************************************/
/* Function: checkIfExpanded                                                            */
/* Description: This function is used to Check if each element in the "elementPath" is  */
/*              expanded.                                                               */
/* Params: 1. elementPath -> Path of tree to be expanded.                               */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. sectionName -> section name in which element is present                   */
/*                          either Portfolio or Benchmark                               */
/****************************************************************************************/
DocumentOptionsFixedIncomeAnalyticsSources.prototype.checkIfExpanded = function(elementPath, sectionName) {
  // Variable( s )
  var arrElements;
  var xpathExpandButton;

  arrElements = elementPath.split('|');

  // based on the sectionName passed make the xpath
  if (sectionName.toLowerCase() === 'portfolio') {
    xpathExpandButton = this.xpathPortfolioSection;
  } else if (sectionName.toLowerCase() === 'benchmark') {
    xpathExpandButton = this.xpathBenchmarkSection;
  }

  // for each element in elementPath in the available section perform the operation
  xpathExpandButton += this.xpathAvailableSection;
  for (var i = 0; i < arrElements.length; i++) {
    if (i !== arrElements.length - 1) {
      xpathExpandButton += '/div/ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li';
      if (i === 0) {
        expect(element(by.xpath(xpathExpandButton)).getAttribute('class')).toContain('expanded');
      } else {
        expect(element(by.xpath(xpathExpandButton + '[1]')).getAttribute('class')).toContain('expanded');
      }
    } else {
      xpathExpandButton += '/div/ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[1]';
      expect(element(by.xpath(xpathExpandButton)).getAttribute('class')).toContain('expanded');
    }
  }

  return element(by.xpath(xpathExpandButton));
};

/****************************************************************************************/
/* Function: getArrowButton                                                             */
/* Description: This function is used to get reference of arrow buttons.                */
/*                                                                                      */
/* Params: 1. btnName -> The button for which reference is needed.                      */
/*                                 Ex: Right, left, up and Down                         */
/*         2. sectionName -> section name in which element is present                   */
/*                          either Portfolio or Benchmark                               */
/* Return: Return the reference of specified arrow button.                              */
/****************************************************************************************/
DocumentOptionsFixedIncomeAnalyticsSources.prototype.getArrowButton = function(btnName, sectionName) {
  var xpathButton;

  if (sectionName.toLowerCase() === 'portfolio') {
    xpathButton = this.xpathPortfolioSection;
  } else if (sectionName.toLowerCase() === 'benchmark') {
    xpathButton = this.xpathBenchmarkSection;
  }

  if (btnName.toLowerCase() === 'left') {
    xpathButton += '//i[@class="icon-arrow-left-s"]/..';
  } else if (btnName.toLowerCase() === 'right') {
    xpathButton += '//i[@class="icon-arrow-right-s"]/..';
  }

  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getOptionsDeleteIcon                                                       */
/* Description: This function is used to get delete icon of the particular 'elementName */
/*              which is available in Selected section                                  */
/* Params: 1. elementName -> name of the element to be selected                         */
/*         2. sectionName -> section name in which element is present                   */
/*                          either Portfolio or Benchmark                               */
/****************************************************************************************/
DocumentOptionsFixedIncomeAnalyticsSources.prototype.getOptionsDeleteIcon = function(elementName, sectionName) {
  return this.getElement(elementName, 'list', 'selected', sectionName).element(by.xpath('//div[@class="icon-remove-i"]'));
};

/**
 * @function getOverrideHierarchySection
 * @description This function is used to get the reference of "Override Hierarchy" section.
 *              We can use this reference to identify if section is disabled.
 * @returns {promise} Promise which resolves to the reference of "Override Hierarchy" section
 */
DocumentOptionsFixedIncomeAnalyticsSources.prototype.getOverrideHierarchySection = function() {
  // Variable(s)
  var xpathSection = '//*[@data-qa-id="fi-as-override-path-list"]';
  return element(by.xpath(xpathSection));
};

/**
 * @function getCheckBoxFromOverrideHierarchy
 * @description This function is used to get the reference of checkboxes from "Override Hierarchy" section
 * @param checkboxName Name of checkbox whose reference is required
 * @returns {ChecklistItem} Object reference of ChecklistItem class on which you can call functions
 *          available in that class. For example, you can call, toggle(), isChecked(), getText() functions.
 */
DocumentOptionsFixedIncomeAnalyticsSources.prototype.getCheckBoxFromOverrideHierarchy = function(checkboxName) {
  // Variable(s)
  var xpathChecklist = '//*[@data-qa-id="fi-as-override-path-list"]';

  // Create object of "Checklist" class
  var objCheckList = new TestHelpers.Checklist(by.xpath(xpathChecklist));

  return objCheckList.getItemByText(checkboxName);
};

module.exports = new DocumentOptionsFixedIncomeAnalyticsSources();
