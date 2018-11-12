'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: split-long-short', function() {

  var arrVal = [];

  describe('Test Step ID: 696946', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "split_long_short" document from "Client/pa3/accounts;"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('split-long-short');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Should click on Portfolio Hamburger icon', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on Portfolio Hamburger icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Portfolio Hamburger drop down is displayed', function() {
      ThiefHelpers.isDropDownOpen(1).then(function(status) {
        if (!status) {
          expect(false).customError('Portfolio Hamburger drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down', function() {
      element(by.xpath(PA3MainPage.xathAddPortfolioVarationButton)).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen(2).then(function(status) {
        if (!status) {
          expect(false).customError('"Portfolio Variation" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should open "Portfolio Variation" drop down', function() {
      element(by.xpath(PA3MainPage.xpathPortfolioVarationButton)).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Add Portfolio Variation" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Split Long/Short" is displayed in Variation Type drop down', function() {
      ThiefHelpers.getAllOptionsFromDropdown(3).then(function(array) {
        if (array.indexOf('Split Long/Short') < 0) {
          expect(false).customError('"Split Long/Short" is not present in the drop down');
          CommonFunctions.takeScreenShot();
        }
      });

      // click to lcose the dropdown
      element(by.xpath(PA3MainPage.xpathPortfolioVarationButton)).click();
    });
  });

  describe('Test Step ID: 696949', function() {

    it('Should select "Split Long/Short" from the Variation Type drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Split Long/Short', 'Variation Type');
    });

    it('Verifying if "Split Long/Short" is set to the Variation Type drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Split Long/Short', 'Variation Type');
    });

    var arrPortfolios = ['LONG_SHORT', 'FUT_SHORT'];
    var flag = 0;
    it('Verify that "LONG_SHORT, FUT_SHORT" is present under the "Portfolios" section in the "Portfolio Variation" dialog', function() {
      PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().getText().then(function(arrayOfValues) {
        arrayOfValues.forEach(function(value, index) {
          if (value !== arrPortfolios[index]) {
            flag = flag + 1;
            expect(false).customError(value + ' is not present in the "Portfolio Variation" dialog');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verifying that "LONG_SHORT" is selected under the "Portfolios" section in the "Portfolio Variation" dialog', function() {
      PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(itemRef) {
          itemRef.getText().then(function(value) {
            if (value === 'LONG_SHORT') {
              itemRef.getAttribute('class').then(function(status) {
                if (status.indexOf('selected') < 0) {
                  expect(false).customError('"LONG_SHORT" is not selected in the "Portfolio Variation" dialog');
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          });
        });
      });
    });

    it('Should click on "OK" button in "Add Portfolio Variation" drop down', function() {
      PA3MainPage.getOkOrCancelButtonInAddPortfolioVaration('OK').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Add Portfolio Variation" drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(2, false).then(function(status) {
        if (status) {
          expect(false).customError('"Portfolio Variation" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrPortfolio = ['LONG_SHORT (Short Only)', 'LONG_SHORT (Long Only)'];
    var flag1 = 0;
    arrPortfolio.forEach(function(portfolio) {
      it('Verifying that "' + portfolio + '" is present in the Portfolio dropdown', function() {
        PA3MainPage.getSingleAccountFromList('Portfolio', portfolio).isPresent().then(function(isExist) {
          if (!isExist) {
            flag1 = flag1 + 1;
            expect(false).customError(portfolio + ' is not present in the drop down');
            if (flag1 === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 696598', function() {

    it('Should select "FUT_SHORT" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'FUT_SHORT').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "FUT_SHORT" account is selected
      expect(PA3MainPage.getSingleAccountFromList('Portfolio', 'FUT_SHORT').getAttribute('class')).toContain('selected');
    });

    it('Should click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down', function() {
      element(by.xpath(PA3MainPage.xathAddPortfolioVarationButton)).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen(2).then(function(status) {
        if (!status) {
          expect(false).customError('"Portfolio Variation" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Split Long/Short" from the Variation Type drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Split Long/Short', 'Variation Type');
    });

    it('Verifying if "Split Long/Short" is set to the Variation Type drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Split Long/Short', 'Variation Type');
    });

    var flag = 0;
    var count;
    it('Verify that "FUT_SHORT" is only present under the "Portfolios" section in the "Portfolio Variation" dialog', function() {
      PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().then(function(arrRef) {
        count = arrRef.length;
        PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().get(0).getText().then(function(value) {
          if (value !== 'FUT_SHORT' || count !== 1) {
            flag = flag + 1;
            expect(false).customError(value + ' is not present in the "Portfolio Variation" dialog');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Should click on "OK" button in "Add Portfolio Variation" drop down', function() {
      PA3MainPage.getOkOrCancelButtonInAddPortfolioVaration('OK').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Add Portfolio Variation" drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(2, false).then(function(status) {
        if (status) {
          expect(false).customError('"Portfolio Variation" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrPortfolio = ['FUT_SHORT (Short Only)', 'FUT_SHORT (Long Only)'];
    var flag1 = 0;
    arrPortfolio.forEach(function(portfolio) {
      it('Verifying that "' + portfolio + '" is present in the Portfolio dropdown', function() {
        PA3MainPage.getSingleAccountFromList('Portfolio', portfolio).isPresent().then(function(isExist) {
          if (!isExist) {
            flag1 = flag1 + 1;
            expect(false).customError(portfolio + ' is not present in the drop down');
            if (flag1 === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verify that "FUT_SHORT (Long Only)" is highlighted in "Portfolio" accounts dropdown', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'FUT_SHORT (Long Only)').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"FUT_SHORT(Long Only)" is not selected in Portfolio drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arrPortfolio.forEach(function(portfolio) {
      it('Verifying if "' + portfolio + '" is not having "Holdings Mode" dropdown', function() {
        element(by.xpath(CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfHodingsModeDropDownOfPortfolioDropdown, portfolio)))
        .isPresent().then(function(present) {
            if (!present) {
              expect(false).customError('"' + portfolio + '" is having "Holdings Mode" dropdown');
              CommonFunctions.takeScreenShot();
            }
          });
      });
    });
  });

  describe('Test Step ID: 696960', function() {

    it('Should select "FUT_SHORT" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'FUT_SHORT').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "FUT_SHORT" account is selected
      expect(PA3MainPage.getSingleAccountFromList('Portfolio', 'FUT_SHORT').getAttribute('class')).toContain('selected');
    });

    it('Should click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down', function() {
      element(by.xpath(PA3MainPage.xathAddPortfolioVarationButton)).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen(2).then(function(status) {
        if (!status) {
          expect(false).customError('"Portfolio Variation" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Split Long/Short" from the Variation Type drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Split Long/Short', 'Variation Type');
    });

    it('Verifying if "Split Long/Short" is set to the Variation Type drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Split Long/Short', 'Variation Type');
    });

    it('Verify that "Portfolio" section displayed blank.', function() {
      PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().then(function(arrRef) {
        if (arrRef.length !== 0) {
          expect(false).customError('"Portfolio" section is not displayed blank');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that In "Portfolio Variation", OK button is disabled', function() {
      PA3MainPage.getOkOrCancelButtonInAddPortfolioVaration('OK').getAttribute('class').then(function(value) {
        if (value.indexOf('disabled') < 0) {
          expect(false).customError('"OK" button in "Add Portfolio Variation"is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 696961', function() {

    it('Should click on "Cancel" button in "Add Portfolio Variation" drop down', function() {
      PA3MainPage.getOkOrCancelButtonInAddPortfolioVaration('Cancel').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click the cross(X) icon next to the Portfolio "FUT_SHORT (Long only)" to delete', function() {
      browser.actions().mouseMove(PA3MainPage.getSingleAccountFromList('Portfolio', 'FUT_SHORT (Long Only)')).perform();

      // Click on delete button
      PA3MainPage.getAccountDeleteButton('Portfolio', 'FUT_SHORT (Long Only)').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Delete" button');
        CommonFunctions.takeScreenShot();
      });

      // Verify if 'FUT_SHORT (Long only)' is deleted from the Account Drop Down
      PA3MainPage.getSingleAccountFromList('Portfolio', 'FUT_SHORT (Long Only)').isPresent().then(function(isExist) {
        if (isExist) {
          expect(false).customError('"FUT_SHORT (Long Only)" is present in the drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "FUT_SHORT" is highlighted in "Portfolio" accounts dropdown', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'FUT_SHORT').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"FUT_SHORT" is not selected in Portfolio drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down', function() {
      element(by.xpath(PA3MainPage.xathAddPortfolioVarationButton)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen(2).then(function(status) {
        if (!status) {
          expect(false).customError('"Portfolio Variation" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Split Long/Short" from the Variation Type drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Split Long/Short', 'Variation Type');
    });

    it('Verifying if "Split Long/Short" is set to the Variation Type drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Split Long/Short', 'Variation Type');
    });

    it('Verifying that "FUT_SHORT" is displaying under the "Portfolios" section in the "Portfolio Variation" dialog', function() {
      PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().getText().then(function(array) {
        if (array.indexOf('FUT_SHORT') < 0) {
          expect(false).customError('"FUT_SHORT" is not present in "Portfolios" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in "Add Portfolio Variation" drop down', function() {
      PA3MainPage.getOkOrCancelButtonInAddPortfolioVaration('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(2, false).then(function(status) {
        if (status) {
          expect(false).customError('"Portfolio Variation" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "FUT_SHORT(Long Only)" is displayed in the Portfolio dropdown.', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'FUT_SHORT (Long Only)').isPresent().then(function(isExist) {
        if (!isExist) {
          expect(false).customError('"FUT_SHORT (Long Only)" is not present in the drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 696962', function() {

    var arrPort = ['FUT_SHORT (Short Only)', 'LONG_SHORT (Short Only)', 'FUT_SHORT (Long Only)', 'LONG_SHORT (Long Only)'];
    arrPort.forEach(function(portfolio) {
      it('Should hover over and Verify that "Edit/Pencil" icon is not displayed beside to "' + portfolio + '"', function() {
        var eleReference = PA3MainPage.getSingleAccountFromList('portfolio', portfolio);
        browser.actions().mouseMove(eleReference).perform();

        // Verifying that Edit button is not displayed
        PA3MainPage.getAccountEditButton('portfolio', portfolio).isPresent().then(function(isExist) {
          if (isExist) {
            expect(false).customError('"Edit/Pencil" icon is displayed beside to' + portfolio);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var flag = 0;
    arrPort.forEach(function(portfolio, index) {
      it('Verify that the account name, path is displayed with a prefix "SO:" for Short Only and "LO:" for Long Only portfolios', function() {
        PA3MainPage.getSingleAccountFromList('portfolio', portfolio).getText().then(function(value) {
          if (index < 2 && value.indexOf('SO:') < 0) {
            flag = flag + 1;
            expect(false).customError('"SO:" is not prefixed for ' + portfolio);
          } else if (index > 1 && value.indexOf('LO:') < 0) {
            flag = flag + 1;
            expect(false).customError('"LO:" is not prefixed for ' + portfolio);
          }
        });
        if (flag === 1) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 697357', function() {

    it('Should select "Cancel" button to close the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'Cancel').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      ThiefHelpers.isDropDownOpen().then(function(status) {
        if (status) {
          expect(false).customError('"Portfolio Variation" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrSecurities = ['Long', 'Short'];
    arrSecurities.forEach(function(security) {
      it('Should note "Port. Ending Market Value" for "' + security + '"', function() {
        SlickGridFunctions.getCellReference('Weights', security, '', 'Port. Ending Market Value').then(function(cellRef) {
          cellRef.getText().then(function(val) {
            arrVal.push(val);
          });
        });
      });
    });

    it('Should click on "Portfolio Hamburger" icon', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Portfolio Hamburger drop down is displayed', function() {
      ThiefHelpers.isDropDownOpen(1).then(function(status) {
        if (!status) {
          expect(false).customError('Portfolio Hamburger drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "FUT_SHORT" is highlighted in "Portfolio" accounts dropdown', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'FUT_SHORT').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"FUT_SHORT" is not selected in Portfolio drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down', function() {
      element(by.xpath(PA3MainPage.xathAddPortfolioVarationButton)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen(2).then(function(status) {
        if (!status) {
          expect(false).customError('"Portfolio Variation" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Split Long/Short" from the Variation Type drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Split Long/Short', 'Variation Type');
    });

    it('Verifying if "Split Long/Short" is set to the Variation Type drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Split Long/Short', 'Variation Type');
    });

    it('Should select "FUT_SHORT" from "Portfolios" section in the "Portfolio Variation" dialog', function() {
      ThiefHelpers.getListBoxItem(PA3MainPage.xpathPortfolioVariationListbox, 'FUT_SHORT').select();
    });

    it('Verifying that "FUT_SHORT" is selected under the "Portfolios" section in the "Portfolio Variation" dialog', function() {
      PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(itemRef) {
          itemRef.getText().then(function(value) {
            if (value === 'FUT_SHORT') {
              itemRef.getAttribute('class').then(function(status) {
                if (status.indexOf('selected') < 0) {
                  expect(false).customError('"FUT_SHORT" is not selected in the "Portfolio Variation" dialog');
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          });
        });
      });
    });

    it('Should click on "OK" button in "Add Portfolio Variation" drop down', function() {
      PA3MainPage.getOkOrCancelButtonInAddPortfolioVaration('OK').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Add Portfolio Variation" drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(2, false).then(function(status) {
        if (status) {
          expect(false).customError('"Portfolio Variation" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "FUT_SHORT (Long Only)" is highlighted in "Portfolio" accounts dropdown', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'FUT_SHORT (Long Only)').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"FUT_SHORT(Long Only)" is not selected in Portfolio drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      ThiefHelpers.isDropDownOpen().then(function(status) {
        if (status) {
          expect(false).customError('"Portfolio Variation" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'),
        180000).then(function(option) {
          if (!option) {
            expect(false).customError('Error while calculating the "Weights" report.');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Weights" report displayed only "Long" grouping.', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(values) {

        //length includes "Total" row also
        if (values.length !== 2 && values[0] !== 'Long') {
          expect(false).customError('"Long" is not the only grouping available in "Weights" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Port. Ending market Value" for "Long" grouping displayed is the same as noted value', function() {
      SlickGridFunctions.getCellReference('Weights', 'Long', '', 'Port. Ending Market Value').then(function(cellRef) {
        cellRef.getText().then(function(val) {
          if (val !== arrVal[0]) {
            expect(false).customError('Value is not matched with previous value : ' + arrVal[0] + ', Found : ' + val);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 697358', function() {

    it('Should click on Portfolio Hamburger icon', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on Portfolio Hamburger icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Portfolio Hamburger drop down is displayed', function() {
      ThiefHelpers.isDropDownOpen(1).then(function(status) {
        if (!status) {
          expect(false).customError('Portfolio Hamburger drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "FUT_SHORT (Short Only)" from "Portfolio" accounts dropdown', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'FUT_SHORT (Short Only)').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      ThiefHelpers.isDropDownOpen().then(function(status) {
        if (status) {
          expect(false).customError('"Portfolio Variation" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'),
        90000).then(function(option) {
          if (!option) {
            expect(false).customError('Error while calculating the "Weights" report.');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Weights" report displayed only "Short" grouping.', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(values) {
        if (values.length !== 2 && values[0] !== 'Short') {
          expect(false).customError('"Short" is not the only grouping available in "Weights" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Port. Ending market Value" for "Short" grouping displayed is same as noted value', function() {
      SlickGridFunctions.getCellReference('Weights', 'Short', '', 'Port. Ending Market Value').then(function(cellRef) {
        cellRef.getText().then(function(val) {
          if (val !== arrVal[1]) {
            expect(false).customError('Value is not matched with previous value : ' + arrVal[1] + ', Found : ' + val);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

});
