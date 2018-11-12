'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: inception_date', function() {

  describe('Test Step ID: 644489', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:;Pa3;dates;inception_date" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('inception-date');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if report opens and calculates showing "Alt_Inception vs Russell 1000"', function() {
      PA3MainPage.getHeader().getText().then(function(reportHeader) {
        if (reportHeader !== 'Alt_Inception vs Russell 1000') {
          expect(false).customError('Report did not match. ' +
            'Expected: "Alt_Inception vs Russell 1000", Found: "' + reportHeader + '"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Weights" tile shows date from "09-FEB-2016 - 07-SEP-2016"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(date) {
        if (date !== '09-FEB-2016 - 07-SEP-2016') {
          expect(false).customError('Expected date: "09-FEB-2016 - 07-SEP-2016", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights 2');

    it('Verifying if "Weights 2" tile shows date from "05-FEB-2016 - 31-AUG-2016"', function() {
      PA3MainPage.getDateHyperLink('Weights 2').getText().then(function(date) {
        if (date !== '05-FEB-2016 - 31-AUG-2016') {
          expect(false).customError('Expected date: "05-FEB-2016 - 31-AUG-2016", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Contribution Bubble" chart displayed with out any errors', function() {
      PA3MainPage.isInChartFormat('Contribution Bubble').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Contribution Bubble" chart is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Contribution Bubble" tile shows date from "05-FEB-2016 - 31-AUG-2016"', function() {
      PA3MainPage.getDateHyperLink('Contribution Bubble').getText().then(function(date) {
        if (date !== '05-FEB-2016 - 31-AUG-2016') {
          expect(false).customError('Expected date: "05-FEB-2016 - 31-AUG-2016", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Valuation - Detail');

    it('Verifying if "Valuation - Detail" tile shows date from "05-FEB-2016"', function() {
      PA3MainPage.getDateHyperLink('Valuation - Detail').getText().then(function(date) {
        if (date !== '05-FEB-2016') {
          expect(false).customError('Expected date: "05-FEB-2016", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 644490', function() {

    it('Should click on "Hamburger" icon next to portfolio lookup', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Hamburger" icon next to portfolio lookup');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Inception_Test" in the account list menu', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'Inception_Test').click().then(function() {
        },
        function() {
          expect(false).customError('Unable to select "Inception_Test" account ');
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should click on "OK" button', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if report opens and calculates showing "Inception_Test vs Russell 1000"', function() {
      PA3MainPage.getHeader().getText().then(function(reportHeader) {
        if (reportHeader !== 'Inception_Test vs Russell 1000') {
          expect(false).customError('Report did not match. ' +
            'Expected: "Inception_Test vs Russell 1000", Found: "' + reportHeader + '"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Weights" report calculated with out any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Weights" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Weights" tile shows date from "09-FEB-2016 - 07-SEP-2016"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(date) {
        if (date !== '09-FEB-2016 - 07-SEP-2016') {
          expect(false).customError('Expected date: "09-FEB-2016 - 07-SEP-2016", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights 2');

    it('Verifying if "Weights 2" tile shows date from "01-FEB-2016 - 31-AUG-2016"', function() {
      PA3MainPage.getDateHyperLink('Weights 2').getText().then(function(date) {
        if (date !== '01-FEB-2016 - 31-AUG-2016') {
          expect(false).customError('Expected date: "01-FEB-2016 - 31-AUG-2016", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Contribution Bubble" chart displayed with out any errors', function() {
      PA3MainPage.isInChartFormat('Contribution Bubble').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Contribution Bubble" chart is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Contribution Bubble" tile shows date from "01-FEB-2016 - 31-AUG-2016"', function() {
      PA3MainPage.getDateHyperLink('Contribution Bubble').getText().then(function(date) {
        if (date !== '01-FEB-2016 - 31-AUG-2016') {
          expect(false).customError('Expected date: "01-FEB-2016 - 31-AUG-2016", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Valuation - Detail');

    it('Verifying if "Valuation - Detail" tile shows date from "01-FEB-2016"', function() {
      PA3MainPage.getDateHyperLink('Valuation - Detail').getText().then(function(date) {
        if (date !== '01-FEB-2016') {
          expect(false).customError('Expected date: "01-FEB-2016", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 644491', function() {

    // Select Date Options from Document Options dialog
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'Document Options');

    it('Should uncheck "Force Start Date After Inception option" check box', function() {
      ThiefHelpers.getCheckBoxClassReference('Force Start Date After Inception').isChecked().then(function(checkBox) {
        if (checkBox === true) {
          ThiefHelpers.getCheckBoxClassReference('Force Start Date After Inception').uncheck();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    it('Verifying if report opens and calculates showing "Inception_Test vs Russell 1000"', function() {
      PA3MainPage.getHeader().getText().then(function(reportHeader) {
        if (reportHeader !== 'Inception_Test vs Russell 1000') {
          expect(false).customError('Report did not match. ' +
            'Expected: "Inception_Test vs Russell 1000", Found: "' + reportHeader + '"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if "Weights" tile shows date from "09-FEB-2016 - 07-SEP-2016"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(date) {
        if (date !== '09-FEB-2016 - 07-SEP-2016') {
          expect(false).customError('Expected date: "09-FEB-2016 - 07-SEP-2016", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights 2');

    it('Verifying if "Weights 2" tile shows date from "01-FEB-2016 - 31-AUG-2016"', function() {
      PA3MainPage.getDateHyperLink('Weights 2').getText().then(function(date) {
        if (date !== '01-FEB-2016 - 31-AUG-2016') {
          expect(false).customError('Expected date: "01-FEB-2016 - 31-AUG-2016", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Contribution Bubble" chart displayed with out any errors', function() {
      PA3MainPage.isInChartFormat('Contribution Bubble').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Contribution Bubble" chart is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Contribution Bubble" tile shows date from "04-FEB-2015 - 31-AUG-2016"', function() {
      PA3MainPage.getDateHyperLink('Contribution Bubble').getText().then(function(date) {
        if (date !== '04-FEB-2015 - 31-AUG-2016') {
          expect(false).customError('Expected date: "04-FEB-2015 - 31-AUG-2016", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Valuation - Detail');

    it('Verifying if "Valuation - Detail" tile shows date from "01-FEB-2016"', function() {
      PA3MainPage.getDateHyperLink('Valuation - Detail').getText().then(function(date) {
        if (date !== '01-FEB-2016') {
          expect(false).customError('Expected date: "01-FEB-2016", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 644492', function() {

    it('Should click the "Portfolio" widget search box and type "SPN:OEX" and hit enter', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, '//*[@data-qa-id="application-header-lookup-sectio' +
        'n"]//*[@tab="portfolio"]//tf-textbox').setText('SPN:OEX');
    });

    it('Verifying if "Calculation Error" dialog displayed', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', 2).getTitleText().then(function(title) {
        if (title !== 'Calculation Error') {
          expect(false).customError('Title of the dialog did not match expected "Calculation Error", ' +
            'instead displayed' + title);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Calculation Error" pop up stating "Calculation Service: The current portfolio does not have' +
      ' an inception date.  Please create an account for this portfolio within Portfolio Viewer and supply an inception' +
      ' date in the account attributes tab."', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', 2).getContent().getText().then(function(content) {
        if (content !== 'Calculation Service: The current portfolio does not have an inception date.' +
          ' Please create an account for this portfolio within Portfolio Viewer and supply an inception' +
          ' date in the account attributes tab.') {
          expect(false).customError('Expected dialog box content not matched' +
            'but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 644493', function() {

    it('Should click on "OK" button in "Calculation Error" pop up', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK', 2).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Calculation Error" pop up');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button in "Calculation Error" pop up', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK', 1).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Calculation Error" pop up');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Weights" report calculated with out any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Weights" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Weights" tile shows date from "09-FEB-2016 - 07-SEP-2016"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(date) {
        if (date !== '09-FEB-2016 - 07-SEP-2016') {
          expect(false).customError('Expected date: "09-FEB-2016 - 07-SEP-2016", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Weights 2" remains blank', function() {
      PA3MainPage.isReportCalculated('Weights 2', true).then(function(displayed) {
        if (displayed) {
          expect(false).customError('"Weights 2" report is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights 2" tile shows date from "@NA - 31-AUG-2016"', function() {
      PA3MainPage.getDateHyperLink('Weights 2').getText().then(function(date) {
        if (date !== '@NA - 31-AUG-2016') {
          expect(false).customError('Expected date: "@NA - 31-AUG-2016", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Contribution Bubble" chart displayed with out any errors', function() {
      PA3MainPage.isInChartFormat('Contribution Bubble').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Contribution Bubble" chart is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Contribution Bubble" tile shows date from "04-FEB-2015 - 31-AUG-2016"', function() {
      PA3MainPage.getDateHyperLink('Contribution Bubble').getText().then(function(date) {
        if (date !== '04-FEB-2015 - 31-AUG-2016') {
          expect(false).customError('Expected date: "04-FEB-2015 - 31-AUG-2016", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Valuation - Detail" remains blank', function() {
      PA3MainPage.isReportCalculated('Valuation - Detail', true).then(function(displayed) {
        if (displayed) {
          expect(false).customError('"Valuation - Detail" report is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Valuation - Detail" tile shows date from "@NA"', function() {
      PA3MainPage.getDateHyperLink('Valuation - Detail').getText().then(function(date) {
        if (date !== '@NA') {
          expect(false).customError('Expected date: "@NA", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 644520', function() {

    // Select and verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Weights', 'Multi-Horizon Returns', true, 'isSelected');

    it('Verifying if "Calculation Error" dialog displayed', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', 1).getTitleText().then(function(title) {
        if (title !== 'Calculation Error') {
          expect(false).customError('Title of the dialog did not match expected "Calculation Error", ' +
            'instead displayed ' + title);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Calculation Error" pop up stating "Calculation Service: The report has an invalid start date ' +
      'and/or end date."', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', 1).getContent().getText().then(function(content) {
        if (content !== 'Calculation Service: The report has an invalid start date and/or end date.') {
          expect(false).customError('Expected dialog box content not matched' +
            'but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 644543', function() {

    it('Should click on "OK" button in "Calculation Error" pop up', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK', 1).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Calculation Error" pop up');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "As of: 07-SEP-2016" date hyperlink in "Multi-Horizon Returns" report', function() {
      var xpathInfobox = PA3MainPage.getDateHyperLink('Multi-Horizon Returns');
      ThiefHelpers.getInfoboxLinkClassReference(xpathInfobox).press().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Verifying if infobox drop down is opened', function() {
      element(by.xpath('//tf-infobox[contains(@open,"opened")]')).isPresent().then(function(opened) {
        if (!opened) {
          expect(false).customError('Infobox dropdown is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "All Date Options" hyper link from dates pop-up', function() {
      PA3MainPage.getOptionsHyperlink('All Date Options').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "All Date Options" hyper link');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Tile Options" page not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on "Inception Date" and click on "X"', function() {
      TileOptionsDates.getRemoveButtonOfMultiHorizonListElement('Inception Date').click().then(function() {
        },
        function() {
          expect(false).customError('Unable to click on "X"');
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should click the drop down in the "Start Date Section"', function() {
      TileOptionsDates.getMultiHorizonDateDropDown().click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on drop down in "Start Date Section"');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Inception Date" from the drop down list', function() {
      TileOptionsDates.getOption('Inception Date').click().then(function() {
      }, function() {
        expect(false).customError('Unable to select "Inception Date" from drop down list');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Error" dialog displayed', function() {
      ThiefHelpers.getDialogClassReference('Error', 1).getTitleText().then(function(title) {
        if (title !== 'Error') {
          expect(false).customError('Title of the dialog did not match expected "Error", ' +
            'instead displayed' + title);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Error pop up stating "The current portfolio does not have an inception date. Please' +
      ' create an account for this portfolio within Portfolio Viewer and supply an inception date in the' +
      ' account attributes tab."', function() {
      ThiefHelpers.getDialogClassReference('Error', 1).getContent().getText().then(function(content) {
        if (content !== 'The current portfolio does not have an inception date. Please create an account' +
          ' for this portfolio within Portfolio Viewer and supply an inception date in the account' +
          ' attributes tab.') {
          expect(false).customError('Expected dialog box content not matched but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 644548', function() {

    var columnHeadersArray = ['One Day', 'Month to Date', 'One Week', 'One Month', '05-FEB-2016 to 07-SEP-2016'];
    var print = 0;

    it('Should click on "OK" button in "Error" pop up', function() {
      ThiefHelpers.getDialogButton('Error', 'OK', 1).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in  Error pop up');
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

    it('Should click on "Hamburger" icon next to portfolio lookup', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Hamburger" icon next to portfolio lookup');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Alt_Inception" in the account list menu', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'Alt_Inception').click().then(function() {
        },
        function() {
          expect(false).customError('Unable to select "Alt_Inception" account');
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should click on "OK" button', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Multi-Horizon Returns" report calculated with out any errors', function() {
      PA3MainPage.isReportCalculated('Multi-Horizon Returns').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Multi-Horizon Returns" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying count of columns', function() {
      SlickGridFunctions.getMultiHeaderNames('Multi-Horizon Returns').then(function(arrOfColumnHeaders) {
        if (arrOfColumnHeaders.length !== 5) {
          expect(false).customError('Column count did not match expected: "5", instead displayed ' +
            arrOfColumnHeaders.length + ' columns');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if columns "One Day, "Month to Date", "One Week", "One Month", "05-FEB-2016 to 07-SEP-2016" are displayed',
      function() {
        SlickGridFunctions.getMultiHeaderNames('Multi-Horizon Returns').then(function(arrOfColumnHeaders) {
          columnHeadersArray.forEach(function(column) {
            var count = 0;
            for (var i = 0; i < columnHeadersArray.length; i++) {
              if (column === arrOfColumnHeaders[i]) {
                count++;
              }
            }

            if (count === 0) {
              print++;
              expect(false).customError(column + ' is not available in the drop down list ');
              if (print === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });

        });
      });

  });

});
