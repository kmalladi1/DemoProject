'use strict';

var translator = require('nihongo');

var unicodeEscape = require('unicode-escape');

var Japanese = function() {
};

/********************************************************************************************/
/* Function: isJapanese                                                                     */
/* Description: This function is used to verify if given string is in Japanese Language.    */
/********************************************************************************************/
Japanese.prototype.isJapanese = function(string) {
  var arrString = string.split('');
  var count = 0;
  arrString.forEach(function(character) {
    if (!translator.isJapanese(character)) {
      count++;
      if (count === 1) {
        expect(false).customError('Text is not in Japanese. Found:' + string);
        CommonFunctions.takeScreenShot();
      }
    }
  });

};

/************************************************************************************************/
/* Function: checkUnicode                                                                       */
/* Description: This function is used to verify if given string matches with unicode.           */
/************************************************************************************************/
Japanese.prototype.checkUnicode = function(string) {
  var uniCode = JapaneseUnicode[string];
  var code = unicodeEscape(string);
  if (code !== uniCode.japaneseUniCode) {
    expect(false).customError('Unicode of the string did not match with the expected. Name of the string if:' + string + ', ' +
      'found uni code:' + code + ',expected uni code:' + uniCode.japaneseUniCode);
    CommonFunctions.takeScreenShot();
  }
};

module.exports = new Japanese();
