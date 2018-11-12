'use strict';

var TileOptions = function() {
  this.xpathTileOptionsTitle = '//*[@data-qa-id="tile-options-mode-banner"]//tf-mode-banner-label';
  this.xpathHeaderButton = '//*[@data-qa-id="tile-options-mode-banner"]//tf-button[normalize-space(.)="replacingText"]';
  this.xpathOptionsPane = '//*[@data-qa-id="options-lhp"]//tf-options-pane';
  this.xpathBlastingPannel = '//*[@data-qa-id="blasting-panel"]';
  this.xpathAllChecklistGroup = '//*[@data-qa-id="blast-panel-content"]//tf-checklist-group';
};

/********************************************************************************************/
/* Function: isTileOptionsMode                                                              */
/* Description: This function is used to verify if application is in Tile Options Mode.     */
/* Return: Promise which resolves to boolean value.                                         */
/********************************************************************************************/
TileOptions.prototype.isTileOptionsMode = function() {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var bannerRef = new TestHelpers.ModeBanner(by.xpath('//tf-mode-banner[@data-qa-id="tile-options-mode-banner"]'));
  bannerRef.getContent().getText().then(function(value) {
    if (value.indexOf('Tile Options') === -1) {
      defer.fulfill(false);
    } else {
      defer.fulfill(true);
    }
  }, function() {
    defer.fulfill(false);
  });
  return promise;
};

/****************************************************************************************/
/* Function: getLHPOptionCategoryExpander                                               */
/* Description: This function is used to get the reference of the expander button       */
/*              on an options category                                                  */
/* Params: 1. categoryName -> name of the options category to get the expander for      */
/* Return: Returns the reference of the specified expander button.                      */
/****************************************************************************************/
TileOptions.prototype.getLHPOptionCategoryExpander = function(categoryName) {
  var xpathExpander = '//*[@data-qa-id="options-lhp"]//*[@data-qa-class="options-category"][.//*[normalize-space(.)="' + categoryName + '"]]//tf-options-pane-expander//tf-icon';
  return element(by.xpath(xpathExpander));
};

/****************************************************************************************/
/* Function: getLHPOption                                                               */
/* Description: This function is used to get the reference of an LHP option that is not */
/*             in a category.                                                          */
/* Params: 1. itemName -> name of the options item desired                              */
/* Return: Returns the reference of the specified option item.                          */
/****************************************************************************************/
TileOptions.prototype.getLHPOption = function(itemName) {
  var xpathOption = '//*[@data-qa-id="options-lhp"]//*[@data-qa-class="options-item"][.//*[normalize-space(.)="' + itemName + '"]]';
  return element(by.xpath(xpathOption));
};

/****************************************************************************************/
/* Function: getLHPOptionItemFromCategory                                               */
/* Description: This function is used to get the reference of an options item in a      */
/*              specific category. If the category is collapsed it expands the category */
/*              before returning the options item.  If the category is not collapsed it */
/*              simply returns the option item.                                         */
/* Params: 1. categoryName -> name of the options category that contains the item       */
/* Params: 1. itemName -> name of the options item desired                              */
/* Return: Returns the reference of the specified option item.                          */
/****************************************************************************************/
TileOptions.prototype.getLHPOptionItemFromCategory = function(itemName, categoryName) {
  // Variable(s)
  var isCollapsed;
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  // XPaths
  var xpathExpander = '//*[@data-qa-id="options-lhp"]//*[@data-qa-class="options-category"][.//*[normalize-space(.)="' + categoryName + '"]]//tf-options-pane-expander//tf-icon';
  var xpathOption = '//*[@data-qa-id="options-lhp"]//*[@data-qa-class="options-category"][.//*[normalize-space(.)="' + categoryName + '"]]//*[@data-qa-class="options-item"][.//*[normalize-space(.)="' + itemName + '"]]';

  // Check if the category is collapsed
  element(by.xpath(xpathExpander)).getAttribute('class').then(function(attrValue) {
    if (attrValue.indexOf('closed') > -1) {
      element(by.xpath(xpathExpander)).click().then(function() {
        defer.fulfill(element(by.xpath(xpathOption)));
      });
    } else {
      defer.fulfill(element(by.xpath(xpathOption)));
    }
  });

  return promise;
};

/****************************************************************************************/
/* Function: getOptionTitle                                                             */
/* Description: This function is used to reference the title of the current option      */
/* Return: Returns the reference of the title element.                                  */
/****************************************************************************************/
TileOptions.prototype.getOptionTitle = function() {
  var xpathTitle = '//*[@data-qa-id="options-header"]//*[@data-qa-id="options-title"]';
  return element(by.xpath(xpathTitle));
};

/************************************************************************************************************/
/* Function: getDefaultsApplied                                                                             */
/* Description: This function is used to get the reference of 'Defaults Applied' text.                      */
/************************************************************************************************************/
TileOptions.prototype.getDefaultsApplied = function() {
  var xpathText = '//*[@data-qa-id="options-header"]//*[@data-qa-id="icon-defaults-applied"]' + '/ancestor::*[normalize-space(.)="Defaults Applied"][1]';

  return element(by.xpath(xpathText));
};

/************************************************************************************************************/
/* Function: getRestoreDefaultsButton                                                                       */
/* Description: This function is used to get the reference of 'Restore Defaults' button.                    */
/************************************************************************************************************/
TileOptions.prototype.getRestoreDefaultsButton = function() {
  var xpathButton = '//*[@data-qa-id="options-header"]//*[@data-qa-id="button-restore-defaults"]';

  return element(by.xpath(xpathButton));
};

/******************************************************************************************/
/* Function: getConfirmationDialogWithText                                                */
/* Description: This function is used to get reference of confirmation dialog box.        */
/* Params: text -> Text displayed inside the confirmation dialog box.                     */
/* Return: Promise which resolves to the reference of confirmation dialog.                */
/******************************************************************************************/
TileOptions.prototype.getConfirmationDialogWithText = function(text) {
  var xpathDialog = '//*[@role="dialog" and descendant::*[normalize-space(.)="' + text + '"]]';
  return element(by.xpath(xpathDialog));
};

/******************************************************************************************/
/* Function: getButtonFromConfirmationDialog                                              */
/* Description: This function is used to get reference of button from confirmation dialog.*/
/* Params: btnName -> Name of the button from confirmation dialog.                        */
/* Return: Promise which resolves to the reference of button from confirmation dialog.    */
/******************************************************************************************/
TileOptions.prototype.getButtonFromConfirmationDialog = function(btnName) {
  var xpathButton = '//*[normalize-space(.)="FactSet Research Systems"]/ancestor::*[@role="dialog"]' + '/descendant::button[normalize-space(.)="' + btnName + '"] | //*[normalize-space(.)="\u00a0"]/ancestor::*[@role="dialog"]' + '/descendant::button[normalize-space(.)="' + btnName + '"]';

  return element(by.xpath(xpathButton));
};

/************************************************************************************************************/
/* Function: getOnlineAssistantButton                                                                       */
/* Description: This function is used to get the reference of 'Online Assistant' question mark button.      */
/************************************************************************************************************/
TileOptions.prototype.getOnlineAssistantButton = function() {
  var xpathButton = '//*[@data-qa-id="options-header"]//*[@data-qa-id="online-assistant-button"]';

  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getHeaderButton                                                            */
/* Description: This function is used to reference 'OK' or 'Cancel' buttons from        */
/*              'Tile Options' header.                                                  */
/* Params: 1. btnName -> pass the required button.                                      */
/*                                 Ex: OK                                               */
/* Return: Returns the reference of required button.                                    */
/****************************************************************************************/
TileOptions.prototype.getHeaderButton = function(btnName) {
  // Variable( s )
  var xpathButton;

  if (btnName.toLowerCase() === 'ok') {
    xpathButton = '//*[@data-qa-id="tile-options-mode-banner"]//tf-button[normalize-space(.)="OK"]';
  } else if (btnName.toLowerCase() === 'cancel') {
    xpathButton = '//*[@data-qa-id="tile-options-mode-banner"]//tf-button[normalize-space(.)="Cancel"]';
  }

  return element(by.xpath(xpathButton));
};

module.exports = new TileOptions();
