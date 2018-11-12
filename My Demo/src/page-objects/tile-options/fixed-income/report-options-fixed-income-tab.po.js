'use strict';

var ReportOptionsFixedIncomeTab = function() {
};

/********************************************************************************************/
/* Function: getPill                                                                        */
/* Description: This function is used to get reference of specified pill from "Exclusions"  */
/*              tab.                                                                        */
/* Params: 1. pillName -> Name of the pill whose reference has to be collected.             */
/* Return: Promise which resolves to reference of given pill.                               */
/********************************************************************************************/
ReportOptionsFixedIncomeTab.prototype.getPill = function(pillName) {
  var xpathPill;
  if (pillName.toLowerCase() === 'scenario analysis') {
    xpathPill = '//*[@aria-controls="fixed-income-scenario-tab"]';
  } else if (pillName.toLowerCase() === 'projected cash flows') {
    xpathPill = '//*[@aria-controls="fixed-income-projected-cash-flows-tab"]';
  }

  return element(by.xpath(xpathPill));
};

//Getting the reference of the content panel of any pill in Document Options dialog
ReportOptionsFixedIncomeTab.prototype.getPillContentPanel = function(pillPanelName) {
  var xpathPillPanel;

  if (pillPanelName.toLowerCase() === 'scenario analysis') {
    xpathPillPanel = '//*[@id="fixed-income-scenario-tab" and contains( @class, "ui-tabs-panel" )]';
  } else if (pillPanelName.toLowerCase() === 'projected cash flows') {
    xpathPillPanel = '//*[@id="fixed-income-projected-cash-flows-tab" and contains( @class, "ui-tabs-panel" )]';
  }

  return element(by.xpath(xpathPillPanel));
};

module.exports = new ReportOptionsFixedIncomeTab();
