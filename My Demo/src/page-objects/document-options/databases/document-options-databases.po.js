'use strict';

var DocumentOptionsDatabases = function() {
  // Xpaths for Fundamental and Estimates section containers.
  this.xpathFundamentalAvailableContainer = '//*[@data-qa-id="databases-fundamental-section"]//*[@data-qa-class="available-tree"]';
  this.xpathFundamentalSelectedContainer = '//*[@data-qa-id="databases-fundamental-section"]//*[@data-qa-class="selected-tree"]';
  this.xpathEstimatesAvailableContainer = '//*[@data-qa-id="databases-estimates-section"]//*[@data-qa-class="available-tree"]';
  this.xpathEstimatesSelectedContainer = '//*[@data-qa-id="databases-estimates-section"]//*[@data-qa-class="selected-tree"]';

};

/************************************************************************************************************/
/* Function: getAllListElements                                                                             */
/* Description: This function is used to reference of all item from the mentioned section and container.    */
/*                                                                                                          */
/* Params: 1. sectionName -> Pass the sectionName from which the item reference are needed.                 */
/*                                 Ex: Fundamental                                                          */
/* Params: 1. containerName -> Pass the containerName from which the item reference are needed.             */
/*                                 Ex: Selected                                                             */
/* Return: Returns a promise which resolves to reference of all elements as per passed parameters.          */
/************************************************************************************************************/
DocumentOptionsDatabases.prototype.getAllListElements = function(sectionName, containerName) {
  // Variable(s)
  var xpathElements;

  if (sectionName.toLowerCase() === 'fundamental') {
    if (containerName.toLowerCase() === 'available') {
      xpathElements = this.xpathFundamentalAvailableContainer;
    } else if (containerName.toLowerCase() === 'selected') {
      xpathElements = this.xpathFundamentalSelectedContainer;
    }
  }

  if (sectionName.toLowerCase() === 'estimates') {
    if (containerName.toLowerCase() === 'available') {
      xpathElements = this.xpathEstimatesAvailableContainer;
    } else if (containerName.toLowerCase() === 'selected') {
      xpathElements = this.xpathEstimatesSelectedContainer;
    }
  }

  xpathElements += '//*[@ng-repeat]//tf-listbox-item[not(contains(@class, "ng-hide"))]';

  return element.all(by.xpath(xpathElements));
};

/************************************************************************************************************/
/* Function: getElement                                                                                     */
/* Description: This function is used to reference of specific element from the mentioned section and       */
/*              container.                                                                                  */
/*                                                                                                          */
/* Params: 1. elementName -> Name of the element whose reference is required.                               */
/*                                 Ex: NRI, Worldscope                                                      */
/*         2. sectionName -> Pass the sectionName from which the item reference are needed.                 */
/*                                 Ex: Fundamental                                                          */
/*         3. containerName -> Pass the containerName from which the item reference are needed.             */
/*                                 Ex: Selected                                                             */
/* Return: Returns a promise which resolves to reference of required element.                               */
/************************************************************************************************************/
DocumentOptionsDatabases.prototype.getElement = function(elementName, sectionName, containerName) {
  // Variable(s)
  var xpathElement;

  if (sectionName.toLowerCase() === 'fundamental') {
    if (containerName.toLowerCase() === 'available') {
      xpathElement = this.xpathFundamentalAvailableContainer;
    } else if (containerName.toLowerCase() === 'selected') {
      xpathElement = this.xpathFundamentalSelectedContainer;
    }
  }

  if (sectionName.toLowerCase() === 'estimates') {
    if (containerName.toLowerCase() === 'available') {
      xpathElement = this.xpathEstimatesAvailableContainer;
    } else if (containerName.toLowerCase() === 'selected') {
      xpathElement = this.xpathEstimatesSelectedContainer;
    }
  }

  xpathElement += '//*[@ng-repeat]//tf-listbox-item[not(contains(@class, "ng-hide"))][normalize-space(.)="' + elementName + '"]';

  return element(by.xpath(xpathElement));
};

/************************************************************************************************************/
/* Function: getRestoreDefaultsButton                                                                       */
/* Description: This function is used to get the reference of 'Restore Defaults' button.                    */
/************************************************************************************************************/
DocumentOptionsDatabases.prototype.getRestoreDefaultsButton = function() {
  var xpathButton = '//*[@data-qa-id="databases-restore-manager"]//span[.="Restore Defaults"]' +
    '/ancestor::*[@data-qa-class="button-restore-defaults"]/button';
  return element(by.xpath(xpathButton));
};

/************************************************************************************************************/
/* Function: getDefaultsApplied                                                                             */
/* Description: This function is used to get the reference of 'Defaults Applied' note.                      */
/************************************************************************************************************/
DocumentOptionsDatabases.prototype.getDefaultsApplied = function() {
  var xpathButton = '//*[@data-qa-id="databases-restore-manager"]//*[normalize-space(.)="Defaults Applied"]/i/..';
  return element(by.xpath(xpathButton));
};

/************************************************************************************************************/
/* Function: getTransferBoxArrowButton                                                                      */
/* Description: This function is used to reference of all item from the mentioned section and container.    */
/*                                                                                                          */
/* Params: 1. sectionName -> Pass the sectionName from which the item reference are needed.                 */
/*                                 Ex: Fundamental                                                          */
/* Params: 1. arrowName -> Pass the arrowName for which the item reference are needed.                      */
/*                                 Ex: Right                                                                */
/* Return: Returns a promise which resolves to reference of arrow icon as per passed parameters.            */
/************************************************************************************************************/
DocumentOptionsDatabases.prototype.getTransferBoxArrowButton = function(sectionName, arrowName) {
  var xpathArrowButton = '//*[@data-qa-id="databases-' + sectionName.toLowerCase() + '-section"]//*[@icon="arrow-' + arrowName.toLowerCase() + '-s"]';

  return element(by.xpath(xpathArrowButton));
};

module.exports = new DocumentOptionsDatabases();
