'use strict';

var Utilities = function() {
};

/****************************************************************************************/
/* Function: isCheckboxSelected                                                         */
/* Description: This function will be used to verify if the given checkbox is selected. */
/* Params: elementReference: Reference of checkbox element.                             */
/* Return: TRUE if checkbox is selected otherwise FALSE.                                */
/****************************************************************************************/
Utilities.prototype.isCheckboxSelected = function(elementReference) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  // Verify if checkbox is selected
  elementReference.getAttribute('class').then(function(value) {
    if (value === null || value === '') {
      defer.fulfill(false);
    } else if (value.indexOf('checked') > -1) {
      defer.fulfill(true);
    }
  });

  return promise;
};

/****************************************************************************************/
/* Function: isElementSelected                                                          */
/* Description: This function will be used to verify if the given element is selected.  */
/* Params: elementReference: Reference of any selectable element.                       */
/* Return: TRUE if selectable element is selected otherwise FALSE.                      */
/****************************************************************************************/
Utilities.prototype.isElementSelected = function(elementReference) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  // Verify if checkbox is selected
  elementReference.getAttribute('class').then(function(text) {
    if (text.indexOf('selected') > 0) {
      defer.fulfill(true);
    } else {
      defer.fulfill(false);
    }
  });

  return promise;
};

/****************************************************************************************/
/* Function: scrollElementToVisibility                                                  */
/* Description: This function will be used to scroll the element so that it is visible  */
/*              on the screen. If the element is already visible it does nothing.       */
/* Params: elementReference: Reference of element that has to get into visibility.      */
/* Return: NA                                                                           */
/****************************************************************************************/
Utilities.prototype.scrollElementToVisibility = function(elementReference) {
  var scrollIntoView = function() {
    arguments[0].scrollIntoView();
  };

  browser.executeScript(scrollIntoView, elementReference.getWebElement()).then(function() {
  }, function(err) {

    expect(false).customError(err);
    CommonFunctions.takeScreenShot();
  });
};

/****************************************************************************************/
/* Function: makeElementVisible                                                         */
/* Description: This function is used to make the given element into visibility.        */
/* Params: elementReference -> Reference of element which needs to be get into          */
/*                             visibility.                                              */
/****************************************************************************************/
Utilities.prototype.makeElementVisible = function(elementReference) {
  // Variable(s)
  var _this = this;

  // Check if element is visible
  elementReference.getWebElement().isDisplayed().then(function(visible) {
    if (!visible) {
      _this.scrollElementToVisibility(elementReference);
    }
  }, function(error) {

    if (error.name === 'StaleElementReferenceError') {
      elementReference.getWebElement().isDisplayed().then(function(visible) {
        if (!visible) {
          _this.scrollElementToVisibility(elementReference);
        }
      });
    } else {
      expect(false).customError(error);
      CommonFunctions.takeScreenShot();
    }
  });
};

/*********************************************************************************************/
/* Function: waitUntilElementDisappears                                                      */
/* Description: Use this function to wait until the particular element get disappear.        */
/* Params: 1. elementReference -> Reference of element for which this function has to wait.  */
/*                                 Ex: 'Report Calculation' dialog reference                 */
/*         2. timeout -> Maximum time to wait for the element to disappear. Default = 20Secs */
/* Return: Returns promise which resolves to TRUE or error message.                          */
/*********************************************************************************************/
Utilities.prototype.waitUntilElementDisappears = function(elementReference, timeout) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  timeout = timeout || 20000;

  // Wait until the element disappear from the web page
  browser.driver.wait(function() {
    return elementReference.isPresent().then(function(isPresent) {
      if (!isPresent) {
        defer.fulfill(true);
      }

      return !isPresent;
    });
  }, timeout, 'Timed out while waiting for element to disappear');

  return promise;
};

/*********************************************************************************************/
/* Function: waitUntilElementAppears                                                         */
/* Description: Use this function to wait until the particular element get appears.          */
/* Params: 1. elementReference -> Reference of element for which this function has to wait.  */
/*                                 Ex: 'Report Calculation' dialog reference                 */
/*         2. timeout -> Maximum time to wait for the element to appear. Default = 20Secs    */
/* Return: Returns promise which resolves to TRUE or error message.                          */
/*********************************************************************************************/
Utilities.prototype.waitUntilElementAppears = function(elementReference, timeout) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  timeout = timeout || 20000;

  // Wait until the element appear in the web page
  browser.driver.wait(function() {
    return elementReference.isPresent().then(function(isPresent) {
      if (isPresent) {
        defer.fulfill(true);
      }

      return isPresent;
    });
  }, timeout, 'Timed out while waiting for element to appear');

  return promise;
};

/*********************************************************************************************/
/* Function: FetchUserName                                                                   */
/* Description: Use this function to get the UserName used for the Tellus run from the       */
/*              T:drive directory mapped.                                                    */
/* Return: Returns promise which resolves to either UserName being used else an error message*/
/*********************************************************************************************/
Utilities.prototype.FetchUserName = function() {
  // Variable(s)
  var exec = require('child_process').exec;
  var cmdString;
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  // Find the UserName from T:drive directory mapped
  exec('net use T:', function(error, stdout, stderr) {
    if (stdout !== null) {
      cmdString = stdout;

      // Check if ".pc.factset.com" is present in the string
      if (cmdString.indexOf('.pc.factset.com') < -1) {
        defer.reject('There was a problem trying to get T: drive name.' + cmdString);
      } else {
        var start = cmdString.indexOf('vms\\appqa_vms\\');
        start += 'vms\\appqa_vms\\'.length;
        var stop = cmdString.indexOf('\n', start);
        var userName = cmdString.substring(start, stop);
        userName = userName.split('-');
        if (userName[0] === '') {
          defer.reject('Cannot find UserName.');
        } else {
          defer.fulfill(userName[0]);
        }
      }

    } else if (stderr !== null) {
      defer.reject('There was an error executing command: ' + stderr);
    } else if (error !== null) {
      defer.reject('Exec error: ' + error);
    }
  });

  return promise;
};

/*********************************************************************************************/
/* Function: FetchSerialNumber                                                               */
/* Description: Use this function to get the SerialNumber used for the Tellus run from the   */
/*              T:drive directory mapped.                                                    */
/* Return: Returns promise which resolves to either SerialNumber being used else an error    */
/*         message.                                                                          */
/*********************************************************************************************/
Utilities.prototype.FetchSerialNumber = function() {
  // Variable(s)
  var exec = require('child_process').exec;
  var cmdString;
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  // Find the Serial Number from T:drive directory mapped
  exec('net use T:', function(error, stdout, stderr) {
    if (stdout !== null) {
      cmdString = stdout;

      // Check if ".pc.factset.com" is present in the string
      if (cmdString.indexOf('.pc.factset.com') < -1) {
        defer.reject('There was a problem trying to get T: drive name.' + cmdString);
      } else {
        var start = cmdString.indexOf('vms\\appqa_vms\\');
        start += 'vms\\appqa_vms\\'.length;
        var stop = cmdString.indexOf('\n', start);
        var serialNumber = cmdString.substring(start, stop);
        serialNumber = serialNumber.split('-');
        if (serialNumber[1] === '') {
          defer.reject('Cannot find Serial Number.');
        } else {
          defer.fulfill(serialNumber[1].trim());
        }
      }

    } else if (stderr !== null) {
      defer.reject('There was an error executing command: ' + stderr);
    } else if (error !== null) {
      defer.reject('Exec error: ' + error);
    }
  });

  return promise;
};

/*********************************************************************************************/
/* Function: checkForConsoleMessage                                                          */
/* Description: Use this function to wait until the a message is                             */
/*              logged in the browser console containing the specified string.               */
/* Params: 1. textString -> Text string to match.                                            */
/* Return: Returns promise which resolves to TRUE or error message.                          */
/*********************************************************************************************/
Utilities.prototype.checkForConsoleMessage = function(textString) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  //get browser logs
  browser.manage().logs().get('browser').then(function(browserLogArray) {
    var messageFound = false;
    var i = browserLogArray.length - 1;

    //Look at logs from most recent to least recent
    for (; i >= 0; i--) {

      var lastLogMessageObject = browserLogArray[i];
      var lastLogMessage = lastLogMessageObject.message;

      //If the text string is found, fulfill the promise
      if (lastLogMessage.indexOf(textString) >= 0) {
        messageFound = true;

        //sleep long enough to make sure the log goes through
        browser.driver.sleep(5000);
        defer.fulfill(true);
        break;
      }
    }

    //If the text string is not found, return the error
    if (messageFound === false) {
      defer.reject('Logs did not include ' + textString + '.');
    }

    return browserLogArray;
  });

  return promise;
};

/************************************************************************************************************/
/* Function: isSortedArray                                                                                  */
/* Description: This function is used to check whether given array is in alphabetical order.                */
/*                                                                                                          */
/* Params: 1) stringArray -> Pass the String array.                                                         */
/*                                                                                                          */
/* Return: Returns true if the given array is in alphabetical order.                                        */
/************************************************************************************************************/
Utilities.prototype.isSortedArray = function(stringArray) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var sortArr = stringArray;
  defer.fulfill(true);

  // Sorting in order.
  sortArr.sort();

  // Comparing arrays.
  sortArr.forEach(function(element, index) {
    if (stringArray[index] !== element) {
      defer.fulfill(false);
    }
  });

  return promise;
};

/*********************************************************************************************/
/* Function: getFontColor                                                                    */
/* Description: This function is used to get the font color of the element.                  */
/*                                                                                           */
/* Params: 1. reference -> Reference of the element.                                         */
/*                                                                                           */
/* Return: Returns promise which resolves to RGB color value in the format rgba(0, 0, 0, 0). */
/*         Ex:  Red -> rgba(255, 0, 0, 0.3)                                                  */
/*              Green -> rgba(0, 255, 0, 0.3)                                                */
/*				Blue -> rgba(0, 0, 255, 0.3)           						                 */
/*				Grey -> rgba(192, 192, 192, 0.3)        						             */
/*				Yellow -> rgba(255, 255, 0, 0.3)        						             */
/*				Cerise -> rgba(255, 0, 255, 0.3)        						             */
/*********************************************************************************************/
Utilities.prototype.getFontColor = function(reference) {
  return reference.getCssValue('color');
};

// This function is used to pad a single digit number with a preceding '0'
Utilities.prototype.pad = function(n) {
  return n < 10 ? '0' + n : n;
};

/****************************************************************************************/
/* Function: getWeekAgoDate                                                             */
/* Description: This function is use for get the one week ago date                      */
/* Params: sevenDay -> true/ false                                                      */
/*         if "false" only business days are included                                   */
/*          if "true" all days are included "Sunday" and "Saturday"                     */
/*                                                                                      */
/* Return: Returns a promise which resolves to date.                                    */
/****************************************************************************************/
Utilities.prototype.getWeekAgoDate = function(sevenDay) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var date = new Date();
  var time = date.getHours();
  var day = date.getDate();

  // Getting previous business day
  day = day - 1;

  var date1 = new Date();
  date1.setDate(day - 7);
  var year = date1.getFullYear();

  var month = date1.getMonth() + 1;

  // Get date,month,and year from new date
  var noOfDay = date1.getDay();

  // If week day start from Sunday
  if (noOfDay === 0) {
    noOfDay = 7;
  }

  var day1 = date1.getDate();
  var weekAgoDate;
  if (sevenDay !== true) {
    if (noOfDay === 6) {
      day1 = day1 - 1;
    } else if (noOfDay === 7) {
      day1 = day1 - 2;
    }
  }

  weekAgoDate = month + '/' + this.pad(day1) + '/' + year.toString();

  defer.fulfill(weekAgoDate);
  return promise;
};
/**
 * @function getNumberOfDayAgoDateExcludeWeekend
 * @description This function is used to return number of day ago Date exclude Saturday and Sunday.
 * @param {string} numberOfDay Enter number of day.
 * @param {boolean} [sevenDay] Pass true if calendar is seven day.
 * @return {promise} Promise which resolve the number of day ago date exclude Saturday and Sunday.
 */
Utilities.prototype.getNumberOfDayAgoDateExcludeWeekend = function(numberOfDay, sevenDay) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var date = new Date();
  var time = date.getHours();

  // Declaring variable
  var endDate;
  var count = 0;

  // Taking number of ago date
  while (count < parseInt(numberOfDay)) {
    endDate = new Date(date.setDate(date.getDate() - 1));
    if (endDate.getDay() !== 0 && endDate.getDay() !== 6) {
      count++;
    }
  }

  var day1 = endDate.getDate();

  // Adding logic to start market
  if (time < 18) {
    day1 = day1 - 1;
  }

  // Storing month, year, and noOfDay in a variable
  var date1 = new Date();
  date1.setMonth(endDate.getMonth());
  date1.setDate(day1);
  date1.setYear(endDate.getFullYear());

  //date1.setYear( endDate.getFullYear() );
  var month = date1.getMonth() + 1;
  var year = date1.getFullYear();
  var noOfDay = date1.getDay();
  var day2 = date1.getDate();

  // Applying logic for five day calender
  if (sevenDay !== true) {
    if (noOfDay === 0 || noOfDay === 7) {
      day2 = day2 - 2;
    } else if (noOfDay === 6) {
      day2 = day2 - 1;
    }
  }

  // Added logic to get the last working date of previous month
  date1.setMonth(endDate.getMonth());
  date1.setDate(day2);
  var month1 = date1.getMonth() + 1;
  var date2 = date1.getDate();
  var year1 = date1.getFullYear();

  var startDate = month1 + '/' + this.pad(date2) + '/' + year1.toString();
  defer.fulfill(startDate);

  return promise;
};

/**
 * @function getEndDateYearsAgo
 * @description This function computes the end date to years ago from current system date.
 * @param {number} noOfYearsAgo Enter number of years.
 * @param {boolean} [sevenDay] Pass true if calendar is seven day.
 * @return {promise} Returns a promise which resolves to date.
 */
Utilities.prototype.getEndDateYearsAgo = function(noOfYearsAgo) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var date = new Date();
  var date1 = new Date();
  var year = date.getFullYear() - noOfYearsAgo;

  date1.setYear(year);
  date1.setMonth(12);
  date1.setDate(0);

  var day = date1.getDate();
  var year1 = date1.getFullYear();
  var month1 = date1.getMonth() + 1;
  var noOfDay = date1.getDay();

  // Applying logic for Saturday
  if (noOfDay === 6) {
    day = day - 1;
  }

  // Applying logic for Sunday
  if (noOfDay === 7 || noOfDay === 0) {
    day = day - 2;
  }

  var startDate;
  startDate = month1 + '/' + day + '/' + year1.toString();
  defer.fulfill(startDate);
  return promise;
};

/**
 * @function getEndDateMonthsAgo
 * @description This function computes the end date to months ago from current system date.
 * @param {number} noOfMonthsAgo Enter number of months.
 * @param {boolean} [sevenDay] Pass true if calendar is seven day.
 * @return {promise} Returns a promise which resolves to date.
 */
Utilities.prototype.getEndDateMonthsAgo = function(noOfMonths) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var date = new Date();
  var date1 = new Date();
  date1.setMonth(date.getMonth() - noOfMonths);
  var month = date1.getMonth() + 1;
  var year = date1.getFullYear();
  var startDate;
  var day = date.getDate();
  var hour = date.getHours();
  var previousDay = day;

  // Applying logic to start the business
  if (hour < 18) {
    day = previousDay - 1;
  }

  // setting previous day
  date1.setDate(previousDay);

  var noOfDay = date1.getDay();

  // Applying logic for Saturday
  if (noOfDay === 6) {
    day = day - 1;
  }

  // Applying logic for Sunday
  if (noOfDay === 7 || noOfDay === 0) {
    day = day - 2;
  }

  startDate = month + '/' + day + '/' + year.toString();
  defer.fulfill(startDate);
  return promise;
};

/****************************************************************************************/
/* Function: getPreviousDate                                                            */
/* Description: This function is use for get the previous business date                 */
/*                                                                                      */
/* Return: Returns a promise which resolves to date.                                    */
/****************************************************************************************/
Utilities.prototype.getPreviousDate = function() {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var date = new Date();
  var time = date.getHours();
  var day = date.getDate();

  // Getting previous business day

  var date1 = new Date();
  date1.setDate(day - 1);
  var year = date1.getFullYear();

  var month = date1.getMonth() + 1;

  // Get date,month,and year from new date
  var noOfDay = date1.getDay();

  // If week day start from Sunday
  if (noOfDay === 0) {
    noOfDay = 7;
  }

  var day1 = date1.getDate();
  var weekAgoDate;

  if (noOfDay === 6) {
    day1 = day1 - 1;
  } else if (noOfDay === 7) {
    day1 = day1 - 2;
    if (day1 <= 0) {
      date1.setDate(day1);
      day1 = date1.getDate();
      month = date1.getMonth() + 1;
    }
  }

  weekAgoDate = month + '/' + this.pad(day1) + '/' + year.toString();

  defer.fulfill(weekAgoDate);
  return promise;
};
/**
 * @function getCurrentDate
 * @description This function is use for get the Current date.
 * @Param format {String} Format of the date in which you expect the date to be.
 * @param separator {Symbol} The symbol by which the month,date and year are separated.
 * @return Returns a promise which resolves to date.
 */
Utilities.prototype.getCurrentDate = function(format, separator, monthInNumbers) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var todayDate;
  var month;
  var year;
  var currentDate;
  var date = new Date();
  var arrMonthNames;
  if (monthInNumbers === undefined) {
    arrMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  } else {
    arrMonthNames = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  }

  var arrOfMonthInFullName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December',];
  todayDate = date.getDate().toString().length < 2 ? '0' + date.getDate().toString() : date.getDate().toString();

  // Getting current year
  year = date.getFullYear().toString();

  // Store all indexes of character
  function findAllIndexes(string, character) {
    var indexes = [];
    var i;
    for (i = 0; i < string.length; i++) {
      if (string.toLowerCase().charAt(i) === character.toLowerCase()) {
        indexes.push(i);
      }
    }

    return indexes;
  }

  if (format !== undefined) {

    // Store lenghts of "Y", "M"
    var lenY = findAllIndexes(format, 'Y').length;
    var lenM = findAllIndexes(format, 'M').length;

    if (lenM === 2) {
      // Get current Month in number format
      month = date.getMonth() + 1;
    } else if (lenM === 3) {
      // Get current Month in name format( first three letters of month )
      month = arrMonthNames[date.getMonth()];
    } else if (lenM === 4) {
      // Get current Month in name format( full name )
      month = arrOfMonthInFullName[date.getMonth()];
    }

    if (lenY === 2) {
      var y = date.getFullYear().toString();

      // Get current year in two digits
      year = y.substring(2);
    } else if (lenY === 4 || format === undefined) {
      // Get current year in four digits
      year = date.getFullYear().toString();
    }
  } else if (format === undefined) {
    // Get current Month in name format( first three letters of month )
    month = arrMonthNames[date.getMonth()];

    // Get current year in four digits
    year = date.getFullYear().toString();
  }

  if (separator === undefined) {
    currentDate = todayDate + '-' + month + '-' + year;
  } else {

    if (format === 'DD MM YYYY' || format === 'DDMMYYYY' || format === 'DDMMYY' || format === 'DDMMMYYYY' || format === 'DDMMMYY' ||
      format === 'DDMMMMYYYY' || format === 'DDMMMMYYYY') {
      currentDate = todayDate + separator + month + separator + year;
    } else if (format === 'MM DD YYYY' || format === 'MMDDYYYY' || format === 'MMDDYY' || format === 'MMMDDYYYY' ||
      format === 'MMMDDYY' || format === 'MMMMDDYY' || format === 'MMMMDDYYYY' || format === 'MDDYYYY') {
      currentDate = month + separator + todayDate + separator + year;
    } else if (format === 'YYYY MM DD' || format === 'YYYYMMDD' || format === 'YYMMDD' || format === 'YYYYMMMDD' ||
      format === 'YYMMMDD' || format === 'YYYYMMMMDD' || format === 'YYMMMMDD') {
      currentDate = year + separator + month + separator + todayDate;
    } else if (format === 'MM DD' || format === 'MMDD' || format === 'MMDD' || format === 'MMMDD' ||
      format === 'MMMDD' || format === 'MMMMDD' || format === 'MMMMDD') {
      currentDate = month + separator + todayDate;
    } else if (format === 'DD MM' || format === 'DDMM' || format === 'DDMM' || format === 'DDMMM' || format === 'DDMMM' ||
      format === 'DDMMMM' || format === 'DDMMMM') {
      currentDate = todayDate + separator + month;
    }
  }

  defer.fulfill(currentDate);
  return promise;
};

/**
 * @function getMonthAsPerNumber
 * @description This function is use for get the month in text.
 * @Param month {Number} Enter month no.
 * @return Returns a promise which resolves to month.
 */
Utilities.prototype.getMonthAsPerNumber = function(month) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  month = parseInt(month);
  var arrOfMonthInFullName = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May',
    6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November',
    12: 'December',
  };
  var finalMonth = arrOfMonthInFullName[month];

  defer.fulfill(finalMonth);
  return promise;

};

/*********************************************************************************************/
/* Function: getBgColor                                                                      */
/* Description: This function is used to get the background color of the element.            */
/*                                                                                           */
/* Params: 1. reference -> Reference of the element.                                         */
/*                                                                                           */
/* Return: Returns promise which resolves to RGB color value in the format rgba(0, 0, 0, 0). */
/*         Ex:  Red -> rgba(255, 0, 0, 0.3)                                                  */
/*              Green -> rgba(0, 255, 0, 0.3)                                                */
/*				Blue -> rgba(0, 0, 255, 0.3)           						                 */
/*				Grey -> rgba(192, 192, 192, 0.3)        						             */
/*				Yellow -> rgba(255, 255, 0, 0.3)        						             */
/*				Cerise -> rgba(255, 0, 255, 0.3)        						             */
/*********************************************************************************************/
Utilities.prototype.getBgColor = function(reference) {
  return reference.getCssValue('background-color');
};

/*********************************************************************************************/
/* Function: isDate                                                                          */
/* Description: This function is used to verify whether the given value is a valid date.     */
/*                                                                                           */
/* Params: 1. dateStr -> date that need to verify.                                            */
/*                                                                                           */
/* Return: Returns promise which resolves to true for valid date else false.                 */
/*********************************************************************************************/
Utilities.prototype.isDate = function(dateStr) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var datePat = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
  var matchArray = dateStr.match(datePat);

  if (matchArray === null) {
    defer.fulfill(false);
  }

  var month = matchArray[1];
  var day = matchArray[3];
  var year = matchArray[5];

  if (month < 1 || month > 12) {
    defer.fulfill(false);
  } else if (day < 1 || day > 31) {
    defer.fulfill(false);
  } else if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
    defer.fulfill(false);
  } else if (month === 2) {
    var isleap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    if (day > 29 || (day === 29 && !isleap)) {
      defer.fulfill(false);
    }
  } else {
    defer.fulfill(true);
  }

  return promise;

};

/**
 * @function getAllIndexesOfElementFromArray
 * @description This function is used to get all the indexes of given element from array
 * @param array Array in which given element indexes has to be searched.
 * @param element Element value which has to be searched into array
 * @returns {ElementArrayFinder} Promise which resolves to the array of indexes for given element
 */
Utilities.prototype.getAllIndexesOfElementFromArray = function(array, element) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var indexes = [];
  var i;
  for (i = 0; i < array.length; i++) {
    if (array[i] === element) {
      indexes.push(i);
    }
  }

  // Fulfill the promise with required indexes
  defer.fulfill(indexes);

  return promise;

};

/**
 * @function verifyDialogTitle
 * @description This function is used verify the title of any dialog box.
 * @param titleName {String} Title of required dialog
 * @param {number} [referenceNumber] Default value is set to 1. If multiple dialog box with same title exists
 *                                            pass this parameter to verify required dialog title.
 * @returns {*} NA
 */
Utilities.prototype.verifyDialogTitle = function(titleName, referenceNumber) {
  // Variable(s)
  var xpathDialogBox;
  var dialogBox;

  // Setting default value of "referenceNumber"
  if (referenceNumber === undefined) {
    referenceNumber = 1;
  }

  xpathDialogBox = '//tf-dialog[@style][' + referenceNumber + ']';

  // Creating object of "Dialog" class
  dialogBox = new TestHelpers.Dialog(by.xpath(xpathDialogBox));

  dialogBox.getTitleText().then(function(title) {
    if (title !== titleName) {
      expect(false).customError('Dialog box title is not equal to "' + titleName + '".');
      CommonFunctions.takeScreenShot();
    }
  });

};

/**
 * @function isDialogOpen
 * @description This function is used to verify if dialog box is open
 * @param dialogTitle {String} Dialog title
 * @param referenceNumber use this variable when you find multiple references with same XPATH
 * @returns {Promise} Promise which resolves to boolean value
 */
Utilities.prototype.isDialogOpen = function(dialogTitle, referenceNumber) {
  // Variable(s)
  var xpathDialog;
  var dialogBox;

  // Setting default value of "referenceNumber"
  if (referenceNumber === undefined) {
    referenceNumber = 1;
  }

  xpathDialog = '//tf-dialog[@style and descendant::*' +
    '//*[normalize-space(text())="' + dialogTitle + '" or normalize-space(.)="' + dialogTitle + '"]][' + referenceNumber + ']';

  // Creating object of "Dialog" class
  dialogBox = new TestHelpers.Dialog(by.xpath(xpathDialog));

  return dialogBox.isOpen();
};

/**
 * @function getDialogClassReference
 * @description This function is used to get object reference of "Dialog" class from thief-helper library
 * @param dialogTitle {String} Dialog title
 * @param referenceNumber use this variable when you find multiple references with same XPATH
 * @returns {obj} Object for "Dialog" class
 */
Utilities.prototype.getDialogClassReference = function(dialogTitle, referenceNumber) {
  // Variable(s)
  var xpathDialog;
  var dialogBox;

  // Setting default value of "referenceNumber"
  if (referenceNumber === undefined) {
    referenceNumber = 1;
  }

  xpathDialog = '//tf-dialog[@style and descendant::*' +
    '//*[normalize-space(text())="' + dialogTitle + '" or normalize-space(.)="' + dialogTitle + '"]][' + referenceNumber + ']';

  // Creating object of "Dialog" class
  dialogBox = new TestHelpers.Dialog(by.xpath(xpathDialog));

  return dialogBox;
};

/****************************************************************************************/
/* Function: getOptionFromDropDown                                                      */
/* Description: This function is used to get reference option from drop down.           */
/* Return: Returns the reference of required option from drop down.                     */
/****************************************************************************************/
Utilities.prototype.getOptionFromDropDown = function(optionName) {
  var xpathOption = '//tf-dropdown[//*[@ng-repeat] or //*[@data-qa-class]]//*[normalize-space(text())="' + optionName + '"]';
  return element(by.xpath(xpathOption));
};

/**
 * @function getAllOptionsFromDropDown
 * @description This function is used to get references of all the options from drop down
 * @returns {ElementArrayFinder} Promise which resolves to the array of option references
 */
Utilities.prototype.getAllOptionsFromDropDown = function() {
  var xpathOption = '//tf-dropdown[//*[@ng-repeat] or //*[@data-qa-class]]';
  return element.all(by.xpath(xpathOption));
};

/**
 * @function isDropDownOpen
 * @description This function is used to identify if drop down is opened
 * @returns {Promise} Promise which resolves to boolean value
 */
Utilities.prototype.isDropDownOpen = function() {
  // Variable(s)
  var xpathDropDown = '//tf-dropdown';

  // Create object for "Dropdown" class
  var objDropdown = new TestHelpers.Dropdown(by.xpath(xpathDropDown));

  return objDropdown.isOpen();
};

/**
 * @function getInfoBoxText
 * @description This function is used to get the InfoBox text
 * @returns {Promise} Promise which resolves to the Infobox text.
 */
Utilities.prototype.getInfoBoxText = function() {

  return element(by.xpath('//tf-infobox//*[@data-qa-class="infobox-tile-content"]')).getText();
};

/**
 *@function arrayCompare
 *@description This function is used to compare array and will generate custom error if there is any difference
 *@param expectedArray {string[]} Expected String array that need to compare
 *@param actualArray {string[]} Actual String array that need to compare
 */
Utilities.prototype.arrayCompare = function(expectedArray, actualArray) {
  var flag = false;
  for (var i = 0; i < actualArray.length; i++) {
    if (expectedArray[i] !== actualArray[i]) {
      expect(false).customError('Expected to have "' + expectedArray[i] + '" at "' + i + '" position but' +
        ' found "' + actualArray[i] + '"');
      flag = true;
    }
  }

  if (flag) {
    CommonFunctions.takeScreenShot();
  }
};

/**
 * @function getBgColorofDialog
 * @description This function is used to get the background color of the dialog.
 * @param {string} dialogTitle Dialog title
 * @param {number} [referenceNumber=1] use this variable when you find multiple references with same XPATH
 * @returns {Promise} Returns promise which resolves to RGB color value in the format rgba(0, 0, 0, 0).
 */
Utilities.prototype.getBgColorofDialog = function(dialogTitle, referenceNumber) {
  // Variable(s)
  var xpathDialog;

  // Setting default value of "referenceNumber"
  if (referenceNumber === undefined) {
    referenceNumber = 1;
  }

  xpathDialog = '//tf-dialog[@style and descendant::*//*[contains(., "' + dialogTitle + '") or ' +
    'normalize-space(text())=normalize-space("' + dialogTitle + '") or ' +
    'normalize-space(.)=normalize-space("' + dialogTitle + '")]][' + referenceNumber + ']//tf-dialog-overlay';

  return element(by.xpath(xpathDialog)).getCssValue('background-color');
};

/****************************************************************************************/
/* Function: getAllLHPOptions                                                           */
/* Description: This function is used to get all LHP options.                           */
/* Params: reportLocation -> Location of the report.                                    */
/*         Ex: Tile Options, Document Options Or Main Page                              */
/*                                                                                      */
/* Return: Returns promise resolved to array of LHP option names.                       */
/****************************************************************************************/
Utilities.prototype.getAllLHPOptions = function(reportLocation) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var allreports = [];
  var reportsXpath;

  if (reportLocation === undefined || reportLocation === 'Main Page') {
    reportsXpath = '//*[@data-qa-id="lhp"]//*[@data-qa-class="accordion-item"]';
  } else if (reportLocation === 'Document Options' || reportLocation === 'Tile Options') {
    reportsXpath = '//*[@data-qa-id="options-lhp"]//*[@data-qa-class="options-item"]';
  }

  element.all(by.xpath(reportsXpath)).each(function(reference) {
    reference.getText().then(function(val) {
      allreports.push(val);
    });
  }).then(function() {
    defer.fulfill(allreports);
  });

  return promise;
};

/**
 * @function isValidYYMMDD
 * @description This function is used to validate if the date in YYMMDD format
 * @param {string} yymmdd String that needs to be compared
 * @returns {Boolean} Returns tue if given string is in YYMMDD format, false if string is not in expected format else throws an error
 */

Utilities.prototype.isValidYYMMDD = function(yymmdd) {
  var month;
  var year;
  var day;
  yymmdd += '';
  if (yymmdd.length !== 6) {
    return false;
  }

  year = yymmdd.substring(0, 2) - 0;
  month = yymmdd.substring(2, 4) - 1;
  day = yymmdd.substring(4, 6) - 0;
  (year < 70) ? year += 2000 : year += 1900;
  var test = new Date(year, month, day);
  var y2k = (test.getYear() < 1000) ? test.getYear() + 1900 : test.getYear();

  if (((y2k === year) && (month === test.getMonth()) && (day === test.getDate())) ||
    yymmdd === 'Previous Close') {
    return true;
  } else {
    expect(false).customError('Error at Not  a valid date format');
    CommonFunctions.takeScreenShot();
  }
};

/**
 * @function roundingArrayValues
 * @description This function is used to Round off decimal values in an array
 * @param {array} arr Array name
 * @param {number} len Length of positions after decimal ( ex : 2 for 1.12)
 * @returns {Promise} Promise which resolves array with rounding array values
 */
Utilities.prototype.roundingArrayValues = function(arr, len) {
  var num;
  var newArr = [];
  for (var x = 0; x < arr.length; x++) {
    num = parseFloat(arr[x]).toFixed(len);
    newArr.push(num);
  }

  return newArr;

};

/**
 * @function isValidMDDYYYY
 * @description This function is used to validate if the date in MDDYYYY format
 * @param {string} MDDYYYY String that needs to be compared
 * @returns {Boolean} Returns tue if given string is in MDDYYYY format, false if string is not in expected format else throws an error
 */
Utilities.prototype.isValidMDDYYYY = function(dateString) {

  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    expect(false).customError('Not a valid date format');
    CommonFunctions.takeScreenShot();
  }

  // Parse the date parts to integers
  var parts = dateString.split('/');
  var day = parseInt(parts[1], 10);
  var month = parseInt(parts[0], 10);
  var year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) {
    expect(false).customError('Not a valid date format');
    CommonFunctions.takeScreenShot();
  } else {
    return true;
  }

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  if (day > 0 && day <= monthLength[month - 1]) {
    expect(false).customError('Not a valid date format');
    CommonFunctions.takeScreenShot();
  } else {
    return true;
  }
};

/**
 * @function isValidDDMMMYYYY
 * @description This function is used to validate if the date in DD-MMM-YYYY format
 * @param {string} MDDYYYY String that needs to be compared
 * @returns {Boolean} Returns tue if given string is in DDMMYYYY format, false if string is not in expected format else throws an error
 */
Utilities.prototype.isValidDDMMMYYYY = function(currVal) {

  if (currVal == '') {
    expect(false).customError('Not a valid date format');
    CommonFunctions.takeScreenShot();
  }

  var rxDatePattern = /^(\d{1,2})(\/|-)([a-zA-Z]{3})(\/|-)(\d{4})$/;
  var dtArray = currVal.match(rxDatePattern);

  if (dtArray == null) {
    expect(false).customError('Not a valid date format');
    CommonFunctions.takeScreenShot();
  }

  var dtDay = parseInt(dtArray[1]);
  var dtMonth = dtArray[3];
  var dtYear = parseInt(dtArray[4]);

  switch (dtMonth.toLowerCase()) {
    case 'jan':
      dtMonth = '01';
      break;
    case 'feb':
      dtMonth = '02';
      break;
    case 'mar':
      dtMonth = '03';
      break;
    case 'apr':
      dtMonth = '04';
      break;
    case 'may':
      dtMonth = '05';
      break;
    case 'jun':
      dtMonth = '06';
      break;
    case 'jul':
      dtMonth = '07';
      break;
    case 'aug':
      dtMonth = '08';
      break;
    case 'sep':
      dtMonth = '09';
      break;
    case 'oct':
      dtMonth = '10';
      break;
    case 'nov':
      dtMonth = '11';
      break;
    case 'dec':
      dtMonth = '12';
      break;
  }

  dtMonth = parseInt(dtMonth);
  if (isNaN(dtMonth)) {
    expect(false).customError('Not a valid date format');
    CommonFunctions.takeScreenShot();
  } else if (dtMonth < 1 || dtMonth > 12) {
    expect(false).customError('Not a valid date format');
    CommonFunctions.takeScreenShot();
  } else if (dtDay < 1 || dtDay > 31) {
    expect(false).customError('Not a valid date format');
    CommonFunctions.takeScreenShot();
  } else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31) {
    expect(false).customError('Not a valid date format');
    CommonFunctions.takeScreenShot();
  } else if (dtMonth == 2) {
    var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
    if (dtDay > 29 || (dtDay == 29 && !isleap)) {
      expect(false).customError('Not a valid date format');
      CommonFunctions.takeScreenShot();
    }
  }

  return true;
};

/**
 * @function getFirstDateOfPreviousMonth
 * @description This function computes the first business date of previous month.
 * @return {promise} Returns a promise which resolves to date.
 */
Utilities.prototype.getFirstDateOfPreviousMonth = function() {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var date = new Date();
  var date1 = new Date();

  // Taking current month
  var month1 = date.getMonth();

  // Taking current date
  var day1 = date.getDate();

  // Taking current date
  var year1 = date.getFullYear();

  // Applying logic for taking February month first date if March month date is more than February month end date
  if (year1 % 4 === 0) {
    if (month1 === 2 && day1 > 29) {
      date1.setMonth(1);
      date1.setDate(1);
    }
  } else {
    if (month1 === 2 && day1 > 28) {
      date1.setMonth(1);
      date1.setDate(1);
    }
  }

  date1.setMonth(date.getMonth() - 1);
  var startDate;
  date1.setDate(1);

  // Getting month name as per setted date
  var month = date1.getMonth() + 1;

  // Getting year as per setted date
  var year = date1.getFullYear();

  // Getting date as per setted date
  var day = date1.getDate();

  var noOfDay = date1.getDay();

  // Applying logic for Saturday
  if (noOfDay === 6) {
    day = day + 2;
  }

  // Applying logic for Sunday
  if (noOfDay === 7 || noOfDay === 0) {
    day = day + 1;
  }

  startDate = month + '/' + day + '/' + year.toString();
  defer.fulfill(startDate);
  return promise;
};

/**
 * @function waitUntilDropdownAppears
 * @description This function is used to wait until S dropdown appears.
 * @param {number} [dropdownIndex] use this variable when you find multiple references with tf-dropdown
 * @return {promise} Returns promise which resolves to TRUE or error message.
 */
Utilities.prototype.waitUntilDropdownAppears = function(dropdownIndex) {
  browser.wait(function() {
    return ThiefHelpers.getDropDownClassReference(dropdownIndex).isDisplayed().then(function(found) {
      return found;
    }, function() {
      return false;
    });
  }, 5000, 'Dropdown was not opended').then(function() {
  }, function(err) {
    expect(false).customError(err);
    CommonFunctions.takeScreenShot();
  });
};

/**
 * @function getEndOrStartDateOfMonthInAYear
 * @description This function is used to fetch the first or last date of the given month and year.
 * @param {number} [year] Year in which you want to fetch date.
 * @param {number} [month] Month in which you want to fetch first/last date of that month.
 * @param {boolean} [firstOrLastDay] default = false will get last date of month, set true to get first date of month.
 * @return {promise} Returns promise which resolves the reference of start or date.
 */
Utilities.prototype.getEndOrStartDateOfMonthInAYear = function(year, month, firstOrLastDay) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var y = year;
  var m = month - 1;
  var date;
  if (firstOrLastDay === undefined) {
    firstOrLastDay = false;
  }

  if (firstOrLastDay) {
    // first date of the month
    date = new Date(y, m, 1);
  } else {
    // last date of the month
    date = new Date(y, m + 1, 0);
  }

  defer.fulfill((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());

  return promise;
};

/**
 * @function getBusinessDate
 * @description This function is use to get the Business Date of the given date.
 * @param date {String} Date of which you need to get the business date.
 * @param separator {Symbol} The symbol by which the month,date and year are separated.
 * @return Returns a promise which resolves to date.
 */
Utilities.prototype.getBusinessDate = function(date, separator) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var d = new Date(date);
  var day = d.getDay();
  var _this = this;

  if (day === 0 || day === 7) {
    d.setDate(d.getDate() - 2);
  } else if (day === 6) {
    d.setDate(d.getDate() - 1);
  }

  if (d.getDate < 1) {
    date = _this.getEndOrStartDateOfMonthInAYear(d.getFullYear(), (d.getMonth() + 1), false);
  }

  date = d.getDate().toString().length < 2 ? '0' + d.getDate().toString() : d.getDate().toString();

  defer.fulfill((d.getMonth() + 1) + separator + date + separator + d.getFullYear());

  return promise;
};

/**
 * @function convertObjectArrayToStringArray
 * @description This function is use to get the string array for the given object array.
 * @param objectArray Array consists of set of objects.
 * @param {number} [count] Pass this parameter when you need only few number of objects to be converted to strings.
 * Example: If you want only first 30 items to be converted to string, pass count as 30.
 * @return Returns a promise which resolves to string array.
 */

Utilities.prototype.convertObjectArrayToStringArray = function(objectArray, count) {

  var stringArray = [];
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  var stringArrayFunction = function(object) {
    object.getText().then(function(text) {
      stringArray.push(text);
    });
  };

  if (count !== undefined) {
    for (var i = 0; i < count; i++) {
      stringArrayFunction(objectArray[i]);
    }
  } else {
    objectArray.forEach(function(object) {
      stringArrayFunction(object);
    });
  }

  defer.fulfill(stringArray);

  return promise;

};

/**
 * @function sortDates
 * @description TThis function is used to sort dates either in ascending or descending order.
 * @param {array} array Array of dates.
 * @param {string} sort Style of sorting.
 * @return Returns an array containing sorted dates.
 */
Utilities.prototype.sortDates = function(array, sort) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  if (sort.toLowerCase() === 'ascending') {
    array.sort(function(a, b) {
      return new Date(a) - new Date(b);
    });
  } else if (sort.toLowerCase() === 'descending') {
    array.sort(function(a, b) {
      return new Date(a) - new Date(b);
    });
    array.reverse();
  }

  defer.fulfill(array);

  return promise;
};

/**
 * @function verifyDatesOrder
 * @description TThis function is used to verify the dates are in ascending or descending order.
 * @param {array} dateArr Array of dates.
 * @param {string} order Style of sorting.
 * @return NA.
 */
Utilities.prototype.verifyDatesOrder = function(dateArr, order) {
  var count = 0;
  for (var i = 0; i < dateArr.length; i++) {
    if (i === (dateArr.length - 1)) {
      break;
    }

    var date1 = new Date(dateArr[i]);
    var date2 = new Date(dateArr[i + 1]);
    if (order.toLowerCase() === 'ascending') {
      var temp = date1 > date2;
      if (temp === false) {
        count = count + 1;
      }
    } else if (order.toLowerCase() === 'descending') {
      var temp1 = date1 < date2;
      if (temp1 === false) {
        count = count + 1;
      }
    }
  }

  if (count > 0) {
    expect(false).customError('Dates are not in ' + order + ' order');
    CommonFunctions.takeScreenShot();
  }
};

/**
 * @function verifyDatesOrder
 * @description This function is used to get the date of mentioned(previous/after) no. of days from the given date.
 * @param {noOfDays} Number of days.
 * @param {fromDate} Date.
 * @param {format} Format of date that it should return.
 * @param {separator} Separator.
 * @return Returns a promise which resolves to date.
 */
Utilities.prototype.getPreviousOrAfterDateFromADate = function(noOfDays, fromDate, format, separator) {
  var _this = this;
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  browser.call(function() {

    if (fromDate === undefined) {
      _this.getCurrentDate('MMDDYYYY', '/').then(function(val) {
        _this.getBusinessDate(val, '/').then(function(currentBusinessDate) {
          fromDate = currentBusinessDate;
        });
      });
    }
  }).then(function() {

    // Current bussiness date
    var date1 = new Date(fromDate);

    // No. of days ago
    if (noOfDays < 0) {
      if (date1.getDay() === 1) {
        noOfDays = noOfDays - 2;
      }
    }else {
      // No. of days after
      if (date1.getDay() === 5) {
        noOfDays = noOfDays + 2;
      }
    }

    // Date after number of ago/after date
    date1.setDate((date1.getDate() + noOfDays));

    _this.getBusinessDate(date1, '/').then(function(businessDate) {
      _this.getFormattedDate(businessDate, format, separator).then(function(expectedDate) {
        defer.fulfill(expectedDate);
      });
    });

  });
  return promise;
};

/**
 * @function getEndDateOfMonthsAgo
 * @description This function is used to get the end date of a mentioned months ago from current month.
 * @param {noOfMonths} Number of months.
 * @return Returns a promise which resolves to date.
 */
Utilities.prototype.getEndDateOfMonthsAgo = function(noOfMonths) {
  var _this = this;
  var d = new Date();
  var currentYear = d.getFullYear();
  var month = d.getMonth() + 1;
  return _this.getEndOrStartDateOfMonthInAYear(currentYear, month + noOfMonths, false).then(function(date1) {
    return _this.getBusinessDate(date1, '/').then(function(date2) {
      return date2;
    });
  });
};

/**
 * @function getFormattedDate
 * @description This function is used to get the given date in required fromat.
 * @param {dateToFormat} Date that to be format.
 * @param {format} Required format of date.
 * @param {separator} Separator.
 * @return Returns a promise which resolves to date in required format.
 */
Utilities.prototype.getFormattedDate = function(dateToFormat, format, separator) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var todayDate;
  var month;
  var year;
  var currentDate;
  var date = new Date(dateToFormat);
  var arrMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var arrOfMonthInFullName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December',];
  todayDate = date.getDate().toString().length < 2 ? '0' + date.getDate().toString() : date.getDate().toString();

  // Getting current year
  year = date.getFullYear().toString();

  // Store all indexes of character
  function findAllIndexes(string, character) {
    var indexes = [];
    for (var i = 0; i < string.length; i++) {
      if (string.toLowerCase().charAt(i) === character.toLowerCase()) {
        indexes.push(i);
      }
    }

    return indexes;
  }

  if (format !== undefined) {

    // Store lengths of "Y", "M"
    var lenY = findAllIndexes(format, 'Y').length;
    var lenM = findAllIndexes(format, 'M').length;

    if (lenM === 2) {
      // Get current Month in number format
      month = date.getMonth() + 1;
      month = month.toString().length < 2 ? '0' + month.toString() : month.toString();
    } else if (lenM === 3) {
      // Get current Month in name format( first three letters of month )
      month = arrMonthNames[date.getMonth()];
    } else if (lenM === 4) {
      // Get current Month in name format( full name )
      month = arrOfMonthInFullName[date.getMonth()];
    }

    if (lenY === 2) {
      var y = date.getFullYear().toString();

      // Get current year in two digits
      year = y.substring(2);
    } else if (lenY === 4 || format === undefined) {
      // Get current year in four digits
      year = date.getFullYear().toString();
    }
  } else if (format === undefined) {
    // Get current Month in name format( first three letters of month )
    month = arrMonthNames[date.getMonth()];

    // Get current year in four digits
    year = date.getFullYear().toString();
  }

  if (separator === undefined) {
    currentDate = todayDate + '-' + month + '-' + year;
  } else {

    if (format === 'DD MM YYYY' || format === 'DDMMYYYY' || format === 'DDMMYY' || format === 'DDMMMYYYY' || format === 'DDMMMYY' ||
      format === 'DDMMMMYYYY' || format === 'DDMMMMYYYY') {
      currentDate = todayDate + separator + month + separator + year;
    } else if (format === 'MM DD YYYY' || format === 'MMDDYYYY' || format === 'MMDDYY' || format === 'MMMDDYYYY' ||
      format === 'MMMDDYY' || format === 'MMMMDDYY' || format === 'MMMMDDYYYY') {
      currentDate = month + separator + todayDate + separator + year;
    } else if (format === 'YYYY MM DD' || format === 'YYYYMMDD' || format === 'YYMMDD' || format === 'YYYYMMMDD' ||
      format === 'YYMMMDD' || format === 'YYYYMMMMDD' || format === 'YYMMMMDD') {
      currentDate = year + separator + month + separator + todayDate;
    }
  }

  defer.fulfill(currentDate);
  return promise;
};

/**
 * @function getCurrentTimeOfGivenOffset
 * @description This function is used to get the time of given city offset.
 * @param {offset} Offset of the required city.
 * @return Returns a promise which resolves to time in hours and minutes.
 */
Utilities.prototype.getCurrentTimeOfGivenOffset = function(offset) {
  // create Date object for current location
  var d = new Date();

  // convert to msec
  // add local time zone offset
  // get UTC time in msec
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

  // create new Date object for different city
  // using supplied offset
  var nd = new Date(utc + (3600000 * offset));
  var min = nd.getMinutes();

  // return time as a string
  return nd.getHours() + ':' + min;
};

/**
 @function ObjectArrayCompare
 @description This function is used to compare array and will generate cusotm error if there is any difference
 @param expectedArray: it is array or object
 @param actualArray: it is array or object
 @param keys: array of key in objects to be verified
 @return NA.
 */
Utilities.prototype.ObjectArrayCompare = function(actualArray, expectedArray, keys) {
  var flag = false;
  var underGroup;
  if (expectedArray.length === actualArray.length) {
    _.map(expectedArray, function(ele, index) {

      if (keys !== undefined && _.isObject(actualArray) && _.isObject(expectedArray)) {
        _.map(keys, function(key) {
          if (ele.group) {
            underGroup = ele.text;
          }

          if (_.toString(ele[key]) !== _.toString(actualArray[index][key])) {
            expect(false).customError('Expected to have "' + key + '" as: "' + ele[key] + '" in position: ' + index + ' but found "' + key + '" as: "' + actualArray[index][key] + '"  ');
            flag = true;
          }
        });
      } else {
        if (ele !== actualArray[index]) {
          expect(false).customError('Expected to have "' + ele + '" in position: ' + index + ' but found "' + actualArray[index] + '"');
          flag = true;
        }
      }
    });
    if (flag) {
      CommonFunctions.takeScreenShot();
    }
  } else {
    expect(false).customError('Expected to have "' + expectedArray.length + '" length but found "' + actualArray.length + '"');
    CommonFunctions.takeScreenShot();
  }
};

/**
 * @function getInfoBoxClassReference
 * @description This function returns reference of "InfoBox" class.
 * @param {string} [xpathOrReferenceOfInfoBox] Pass the XPATH or Reference of required info-box or just the reference.
 * @param {boolean} [shouldLogError] Set this variable to TRUE if you want to log error when element did not appear on screen within 10 seconds
 * @returns {obj} "InfoBox" class object.
 * {@link https://github.factset.com/FactSet/thief-angular-testing/blob/master/src/infobox-link/index.js Methods Applicable}
 */
Utilities.prototype.getInfoBoxClassReference = function(xpathOrReferenceOfInfobox, shouldLogError) {
  // Variable(s)
  var xpathInfobox;
  var infoboxClassRef;

  if (shouldLogError === undefined) {
    shouldLogError = true;
  }

  if (xpathOrReferenceOfInfobox === undefined) {
    xpathInfobox = '//tf-infobox';
  }else {
    xpathInfobox = xpathOrReferenceOfInfobox;
  }

  //Creating reference using the xpath
  var ref = ThiefHelpers.buildReference(xpathInfobox, shouldLogError);

  // Creating class reference
  infoboxClassRef = new TestHelpers.Infobox(ref);

  // Returning class reference
  return infoboxClassRef;
};

module.exports = new Utilities();
