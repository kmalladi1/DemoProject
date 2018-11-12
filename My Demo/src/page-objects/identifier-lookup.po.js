'use strict';

var IdentifierLookup = function() {
};

/**
 * @function getAllRowNamesFromSelectedSection
 * @description This function is used to get reference of all the row names in the selected section.
 * @returns {promise} Promise which resolve to array of references representing Row names.
 */
IdentifierLookup.prototype.getAllRowNamesFromSelectedSection = function() {
  // Variable(s)
  var xpathRowNames = '//*[@data-qa-id="selection-pane"]//td[1]';
  return element.all(by.xpath(xpathRowNames));
};

module.exports = new IdentifierLookup();
