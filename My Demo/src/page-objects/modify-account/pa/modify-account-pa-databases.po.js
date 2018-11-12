'use strict';

var ModifyAccountPaDatabases = function() {
  // Xpaths for Fundamental and Estimates section containers.
  this.xpathFundamentalSection = '//*[@data-qa-id="databases-fundamental-section"]';
  this.xpathEstimatesSection = '//*[@data-qa-id="databases-estimates-section"]';
  this.xpathFundamentalAvailableContainer = '//*[@data-qa-id="databases-fundamental-section"]' +
    '//*[@data-qa-class="available-tree"]';
  this.xpathFundamentalSelectedContainer = '//*[@data-qa-id="databases-fundamental-section"]' +
    '//*[@data-qa-class="selected-tree"]';
  this.xpathEstimatesAvailableContainer = '//*[@data-qa-id="databases-estimates-section"]' +
    '//*[@data-qa-class="available-tree"]';
  this.xpathEstimatesSelectedContainer = '//*[@data-qa-id="databases-estimates-section"]' +
    '//*[@data-qa-class="selected-tree"]';
  this.xpathFundamentalTransferBoxButton = this.xpathFundamentalSection + '//tf-transferbox-transfer-buttons';
  this.xpathEstimateTransferBoxButton = this.xpathEstimatesSection + '//tf-transferbox-transfer-buttons';
  this.xpathFundamentalTransferbox = this.xpathFundamentalSection + '//tf-transferbox';
  this.xpathEstimateTransferbox = this.xpathEstimatesSection + '//tf-transferbox';
  this.xpathAvailableSearchBox = this.xpathFundamentalSection + '//tf-textbox';
};

/************************************************************************************************************/
/* Function: getAllListElements                                                                             */
/* Description: This function is used to reference of all item from the mentioned section and container.    */
/*                                                                                                          */
/* Params: 1. sectionName -> Pass the sectionName from which the item reference are needed.                 */
/*                                 Ex: Fundamental                                                          */
/* Params: 1. containerName -> Pass the containerName from which the item reference are needed.             */
/*                                 Ex: Selected                                                             */
/* Return: results a promise which resolves to reference of all elements as per passed parameters.          */
/************************************************************************************************************/
ModifyAccountPaDatabases.prototype.getAllListElements = function(sectionName, containerName) {
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

  xpathElements += '//tf-listbox-item[not(contains(@class, "ng-hide"))]';

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
/* Return: results a promise which resolves to reference of required element.                               */
/************************************************************************************************************/
ModifyAccountPaDatabases.prototype.getElement = function(elementName, sectionName, containerName) {
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

  xpathElement += '//*[@ng-repeat]//tf-listbox-item[not(contains(@class,"ng-hide"))]' +
    '[normalize-space(.)="' + elementName + '"]';

  return element(by.xpath(xpathElement));
};

/************************************************************************************************************/
/* Function: getArrowButton                                                                                 */
/* Description: This function is used to get reference of arrow button either from Portfolio or EXCHANGE RATES */
/*              section.                                                                                    */
/* Params: 1. btnName -> Name of the button for which reference has to be collected.                        */
/*                       Ex: Right, Left, Up, Down.                                                         */
/*         2. sectionName -> Name of the section in which button exists. Default section name is 'Portfolio'.  */
/*                           Ex: Portfolio, Benchmark.                                                    */
/* Return: Promise which resolves to reference of button.                                                   */
/************************************************************************************************************/
ModifyAccountPaDatabases.prototype.getArrowButton = function(btnName, sectionName) {
  // Variable(s)
  var xpathArrowButton;

  if (sectionName.toLowerCase() === 'fundamental') {
    xpathArrowButton = this.xpathFundamentalSection + '//*[@icon="arrow-' + btnName.toLowerCase() + '-s"]';
  } else if (sectionName.toLowerCase() === 'estimates') {
    xpathArrowButton = this.xpathEstimatesSection + '//*[@icon="arrow-' + btnName.toLowerCase() + '-s"]';
  }

  return element(by.xpath(xpathArrowButton));
};

module.exports = new ModifyAccountPaDatabases();

