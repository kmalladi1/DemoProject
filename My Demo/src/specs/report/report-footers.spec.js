require(__dirname + '/../../index.js');

describe('Test Case: report-footers', () => {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  var arrFootnotes = [];

  // This function will select pencil icon and verifies the dialog box appeares in the web page
  var selectPencil = () => {
    it('Should click on footnotes edit pencil', () => {
      element(by.xpath(Footnotes.xpathEditButton)).isPresent().then((bool) => {
        if (!bool) {
          ThiefHelpers.getFootnotesClassReference().edit();
        } else {
          ThiefHelpers.getButtonClassReference(undefined, Footnotes.xpathEditButton).press().then(() => {
          }, () => {

            expect(false).customError('Unable to click on "Edit" button.');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Verifying that "Footnotes" dialog box appears', () => {
      ThiefHelpers.isDialogOpen('Footnotes').then((bool) => {
        if (!bool) {
          expect(false).customError('"Footnotes" dialog does not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  // This function will clicks on the footnote and stores text in an array (arrFootnotes) and clicks on footnote button again
  var storeFootnotesText = () => {
    it('Should click on "Footnotes" and store the text"', () => {
      arrFootnotes.length = 0;
      ThiefHelpers.getFootnotesClassReference().withFootnotes((footnotesRef1) => {
        footnotesRef1.forEach(function(footnoteRef, index) {
          footnoteRef.getText().then(function(text) {
            arrFootnotes[index] = text;
          });
        });
      });

    });

    it('Should click on "Footnotes" button', () => {
      ThiefHelpers.getButtonClassReference('Footnotes').press().then(() => {
      }, () => {

        expect(false).customError('Unable to click on "Footnotes" button');
        CommonFunctions.takeScreenShot();
      });
    });
  };

  // name: Name of the portfolio or Benchmark
  // index: In which line the text is present in footnote pop up
  // firstIndex: Index of first date after splitting the sentence
  // secondIndex: Index of second date after splitting the sentence
  var verifyCurrentMonthAndYear = (name, index, firstIndex, secondIndex) => {
    it('Verifying if first date of "' + name + '" will have dates for the current month and year', () => {
      if (arrFootnotes[index].indexOf(name) === -1) {
        expect(false).customError('"' + name + '" is not present in Footnotes pop up. Found ' + arrFootnotes[index]);
        CommonFunctions.takeScreenShot();
      } else {
        var tempDate = arrFootnotes[index].split(':')[1].split(' ')[firstIndex];
        Utilities.getCurrentDate('MMDDYYYY', '/').then((todaysDate) => {
          Utilities.getBusinessDate(todaysDate, '/').then((currentDate) => {
            if (currentDate.split('/')[1] === '01') {
              // If current date is 5/01/2018 the date ranges would display as Russell Top 200 4/02/2018 through 5/01/2018
              UtilitiesDate.getYesterdayDate('MM DD YYYY', 'numbers', '/').then(function(yesterdayDate) {
                if (tempDate.split('/')[0].trim() !== yesterdayDate.split('/')[0] || tempDate.split('/')[2].trim() !== yesterdayDate.split('/')[2]) {
                  expect(false).customError('"' + name + '" is not having dates for the current month and year. ' +
                    'Expected month ' + yesterdayDate + ', found month ' + tempDate);
                  CommonFunctions.takeScreenShot();
                }
              });
            } else {
              if (tempDate.split('/')[0].trim() !== currentDate.split('/')[0] || tempDate.split('/')[2].trim() !== currentDate.split('/')[2]) {
                expect(false).customError('"' + name + '" is not having dates for the current month and year. ' +
                  'Expected month ' + currentDate + ', found month ' + arrFootnotes[index]);
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      }
    });

    it('Verifying if second date of "' + name + '" will have dates for the current month and year', () => {
      var tempDate = arrFootnotes[index].split(':')[1].split(' ')[secondIndex];
      Utilities.getCurrentDate('MMDDYYYY', '/').then((todaysDate) => {
        Utilities.getBusinessDate(todaysDate, '/').then((currentDate) => {
          if (tempDate.split('/')[0].trim() !== currentDate.split('/')[0] || tempDate.split('/')[2].trim() !== currentDate.split('/')[2]) {
            expect(false).customError('"' + name + '" is not having dates for the current month and year. ' +
              'Expected month ' + currentDate + ', found month ' + arrFootnotes[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  };

  // name: Name of the portfolio or Benchmark
  // index: In which line the text is present in footnote pop up
  // firstIndex: Index of first date after splitting the sentence
  // secondIndex: Index of second date after splitting the sentence
  var verifyPreviousMonth = (name, index, firstIndex, secondIndex) => {
    it('Verifying if first date of "' + name + '" will have dates for the previous month and year', () => {
      if (arrFootnotes[index].indexOf(name) === -1) {
        expect(false).customError('"' + name + '" is not present in Footnotes pop up. Found ' + arrFootnotes[index]);
        CommonFunctions.takeScreenShot();
      } else {
        var tempDate = arrFootnotes[index].split(':')[1].split(' ')[firstIndex];
        Utilities.getCurrentDate('MMDDYYYY', '/').then((todaysDate) => {
          Utilities.getBusinessDate(todaysDate, '/').then((currentDate) => {
            if (currentDate.split('/')[1] === '01') {
              // If current date is 5/01/2018 the date ranges would display as S&P 500 3/29/2018 through 4/30/2018
              Utilities.getEndDateOfMonthsAgo(-2).then(function(endDateTwoMonthsAgo) {
                if (tempDate.split('/')[0].trim() !== endDateTwoMonthsAgo.split('/')[0] || tempDate.split('/')[2].trim() !== endDateTwoMonthsAgo.split('/')[2]) {
                  expect(false).customError('"' + name + '" is not having dates for the current month and year. ' +
                    'Expected ' + endDateTwoMonthsAgo + ', found ' + tempDate);
                  CommonFunctions.takeScreenShot();
                }
              });
            } else {
              Utilities.getFirstDateOfPreviousMonth().then(function(date) {
                if (tempDate.split('/')[0].trim() !== date.split('/')[0] || tempDate.split('/')[2].trim() !== date.split('/')[2]) {
                  expect(false).customError('"' + name + '" is not having dates for the current month and year. ' +
                    'Expected ' + date + ', found ' + arrFootnotes[index]);
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          });
        });
      }
    });

    it('Verifying if second date of "' + name + '" will have dates for the previous month and year', () => {
      var tempDate = arrFootnotes[index].split(':')[1].split(' ')[secondIndex];
      Utilities.getFirstDateOfPreviousMonth().then((date) => {
        if (tempDate.split('/')[0].trim() !== date.split('/')[0] || tempDate.split('/')[2].trim() !== date.split('/')[2]) {
          expect(false).customError('"' + name + '" is not having dates for the current month and year. ' +
            'Expected ' + date + ', found ' + arrFootnotes[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  // This function will verifies the data by given text and line number
  var verifyData = (text, index) => {
    it('Verifying "' + text + '" is shown in the pop up', () => {
      if (arrFootnotes[index].trim() !== text) {
        expect(false).customError('"' + text + '" is not shown in the pop up at index "' + index + '". Found ' + arrFootnotes[index]);
        CommonFunctions.takeScreenShot();
      }
    });
  };

  // This function will type text in Custom Footnote textarea and text box and clicks on ok buttons
  // textAreaText: Text to be send in text area
  // textBoxText: Text to be send in Textbox
  var sendTextAndSave = (textAreaText, textboxText) => {
    it('Verifying that "Custom Footnote" dialog box appears', () => {
      ThiefHelpers.isDialogOpen('Custom Footnote').then((bool) => {
        if (!bool) {
          expect(false).customError('"Custom Footnote" dialog does not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "' + textAreaText + '" in Custom Footnote textarea', () => {
      // Clearing text box before entering the text
      Footnotes.getTextArea().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));

      Footnotes.getTextArea().sendKeys(textAreaText);
    });

    it('Should type "' + textboxText + '" in "Custom Footnote Name:" textbox', () => {
      ThiefHelpers.getTextBoxClassReference(undefined, Footnotes.xpathCustomFootnoteTextbox).setText(textboxText);

      // Verifying if "Name" field contains given text
      ThiefHelpers.getTextBoxClassReference(undefined, Footnotes.xpathCustomFootnoteTextbox).getText().then((text) => {
        if (text !== textboxText) {
          expect(false).customError('"' + textboxText + '" is not shown in "Custom Footnote Name:" textbox. Found ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button', () => {
      var saveButton = CommonFunctions.replaceStringInXpath(Footnotes.xpathCustomFootnoteButton, 'Save');
      ThiefHelpers.getButtonClassReference(undefined, saveButton).press().then(() => {
      }, () => {

        expect(false).customError('Unable to click on "Save" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "' + textboxText + '" is added to selected section', () => {
      ThiefHelpers.getListBoxItem(Footnotes.xpathSelectedSection, textboxText).getText().then((text) => {
        if (text !== textboxText) {
          expect(false).customError('"' + textboxText + '" is not shown in the "Selected" container;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, (err) => {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"' + textboxText + '" is not found in the "Selected" container');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "OK" on the "Footnotes" dialog', () => {
      ThiefHelpers.getDialogButton('Footnotes', 'OK').click().then(() => {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    storeFootnotesText();

  };

  // This function is used to verify the current business date
  // verifyLength:
  var verifyCurrentDate = (verifyLength) => {

    it('Verifying if current date is displayed in footnote', () => {
      var date = new Date();

      var time = date.getHours();

      if (verifyLength) {
        if (arrFootnotes.length !== 1) {
          expect(false).customError('There is more than one footnote is present in footnote pop up.');
          CommonFunctions.takeScreenShot();
        }
      } else {
        if (time < 4) {
          Utilities.getPreviousDate().then((previousDate) => {
            if (previousDate.split('/')[0].length === 1) {
              previousDate = 0 + previousDate;
            }

            if (previousDate !== arrFootnotes[0].trim()) {
              expect(false).customError('Date is not today\'s date or previous close date. Found ' + arrFootnotes[0] + ', expected ' + previousDate);
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          Utilities.getCurrentDate('MMDDYYYY', '/').then(function(date) {
            Utilities.getBusinessDate(date, '/').then((currentDate) => {
              if (currentDate.split('/')[0].length === 1) {
                currentDate = 0 + currentDate;
              }

              expect(currentDate).toBe(arrFootnotes[0]);
            });

          });
        }
      }

    });
  };

  describe('Test Step ID: 508359', () => {
    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:;Pa3;General;REPORT FOOTERS" document', () => {
      PA3MainPage.launchHtmlDialogAndOpenDocument('report-footers');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Portfolio', PA3MainPage.xpathPortfolioWidget, 'RUSSELL:TOP200');

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'SPN:SP50');
  });

  describe('Test Step ID: 508361', () => {

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Uncategorized', 'Attribution', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    selectPencil();

    var arrListItems = ['Document Name', 'Grouping Frequency'];
    it('Should double click on "' + arrListItems + '" in Available section', () => {
      arrListItems.forEach((element) => {
        ThiefHelpers.getListBoxItem(Footnotes.xpathAvailableSection, element).getText().then(function(text) {
          if (text !== element) {
            expect(false).customError('"' + element + '" is not shown in the "Available" container;Found: ' + text);
            CommonFunctions.takeScreenShot();
          } else {
            ThiefHelpers.getListBoxItem(Footnotes.xpathAvailableSection, element).then(function(ref) {
              browser.actions().doubleClick(ref).perform();
            });
          }
        }, (err) => {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + element + '" is not found in the "Available" container');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "' + arrListItems + '" are added to selected section', () => {
      arrListItems.forEach((element) => {
        ThiefHelpers.getListBoxItem(Footnotes.xpathSelectedSection, element).getText().then(function(text) {
          if (text !== element) {
            expect(false).customError('"' + element + '" is not shown in the "Selected" container;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, (err) => {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + element + '" is not found in the "Selected" container');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Click "OK" on the "Footnotes" dialog', () => {
      ThiefHelpers.getDialogButton('Footnotes', 'OK').click().then(() => {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    it('Verifying if report header contains "Russell Top 200 vs S&P 500"', () => {
      PA3MainPage.getHeader().getText().then(function(reportHeader) {
        if (reportHeader !== 'Russell Top 200 vs S&P 500') {
          expect(false).customError('Report did not match. ' + 'Expected: "Russell Top 200 vs S&P 500", Found: "' + reportHeader + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    storeFootnotesText();

    verifyCurrentMonthAndYear('Russell Top 200', 0, 4, 6);

    verifyPreviousMonth('S&P 500', 1, 3, 5);

    verifyData('Document Name: Client:/pa3/general/REPORT FOOTERS', 2);

    verifyData('Grouping Frequency: Economic Sector - Beginning of Period', 3);

  });

  describe('Test Step ID: 508362', () => {

    selectPencil();

    var arrListItems = ['Pricing Source(s) - Portfolio', 'Pricing Source(s) - Benchmark'];
    it('Should click on "' + arrListItems + '" in Available section and click on right arrow', () => {
      arrListItems.forEach((element) => {
        ThiefHelpers.getListBoxItem(Footnotes.xpathAvailableSection, element).getText().then(function(text) {
          if (text !== element) {
            expect(false).customError('"' + element + '" is not shown in the "Available" container;Found: ' + text);
            CommonFunctions.takeScreenShot();
          } else {
            ThiefHelpers.getListBoxItem(Footnotes.xpathAvailableSection, element).select();

            ThiefHelpers.getTransferBoxReference().transferToTarget();
          }
        }, (err) => {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + element + '" is not found in the "Available" container');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "' + arrListItems + '" are added to selected section', () => {
      arrListItems.forEach((element) => {
        ThiefHelpers.getListBoxItem(Footnotes.xpathSelectedSection, element).getText().then(function(text) {
          if (text !== element) {
            expect(false).customError('"' + element + '" is not shown in the "Selected" container;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, (err) => {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + element + '" is not found in the "Selected" container');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Click "OK" on the "Footnotes" dialog', () => {
      ThiefHelpers.getDialogButton('Footnotes', 'OK').click().then(() => {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    storeFootnotesText();

    verifyCurrentMonthAndYear('Portfolio Holdings As Of Date', 0, 4, 6);

    verifyPreviousMonth('Benchmark Holdings As Of Date', 1, 3, 5);

    verifyData('Document Name: Client:/pa3/general/REPORT FOOTERS', 2);

    verifyData('Grouping Frequency: Economic Sector - Beginning of Period', 3);

    verifyData('Portfolio Pricing Sources: MSCI - Net|FactSet - Equity|Client Portfolio', 4);

    verifyData('Benchmark Pricing Sources: MSCI - Net|FactSet - Equity|Client Portfolio', 5);

  });

  describe('Test Step ID: 508363', () => {

    selectPencil();

    it('Should select "Document Name" and click on down arrow button twice', () => {
      ThiefHelpers.getListBoxItem(Footnotes.xpathSelectedSection, 'Document Name').select();

      ThiefHelpers.getTransferBoxReference().target.down();

      ThiefHelpers.getTransferBoxReference().target.down().then(() => {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Holdings Date - Benchmark" and click on up arrow button once', () => {
      ThiefHelpers.getListBoxItem(Footnotes.xpathSelectedSection, 'Holdings Date - Benchmark').select();

      ThiefHelpers.getTransferBoxReference().target.up();
    });

    it('Should select "Holdings Date - Portfolio" and click on left arrow button once', () => {
      ThiefHelpers.getListBoxItem(Footnotes.xpathSelectedSection, 'Holdings Date - Portfolio').select();

      ThiefHelpers.sendElementToAvailableSection();
    });

    // Click on "OK" button in Footnotes dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('OK', 'Footnotes');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    storeFootnotesText();

    verifyPreviousMonth('Benchmark Holdings As Of Date', 0, 3, 5);

    verifyData('Grouping Frequency: Economic Sector - Beginning of Period', 1);

    verifyData('Portfolio Pricing Sources: MSCI - Net|FactSet - Equity|Client Portfolio', 2);

    verifyData('Document Name: Client:/pa3/general/REPORT FOOTERS', 3);

    verifyData('Benchmark Pricing Sources: MSCI - Net|FactSet - Equity|Client Portfolio', 4);

  });

  describe('Test Step ID: 508364', () => {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Portfolio', 'Prices', 'document options');

    it('Should select "MSCI - Net" "Prices Selected" section ', () => {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'MSCI - Net').select();
    });

    it('Should click on down arrow button twice', () => {
      ThiefHelpers.getTransferBoxReference().target.down();

      ThiefHelpers.getTransferBoxReference().target.down().then(() => {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "MSCI - Net" is moved down to last position', () => {
      DocumentOptionsPricesPortfolio.getAllListElements('Prices', 'Selected').last().getText().then(function(value) {
        expect(value).toBe('MSCI - Net');
      });
    });

    it('Should click on the "Prices > Benchmark" tab on the LHP of document options view', () => {
      ThiefHelpers.getOptionspaneItem(undefined, 'Benchmark', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(undefined, 'Benchmark', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Prices > Benchmark" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should uncheck "Use Portfolio Pricing Sources for Benchmark" checkbox under "Prices" section', () => {
      DocumentOptionsPricesBenchmark.getUsePortPricingForBenchCheckBox().click();

      // Verifying if Use Portfolio Pricing Sources for Benchmark" checkbox is unchecked
      ThiefHelpers.getCheckBoxClassReference(undefined, DocumentOptionsPricesBenchmark.getUsePortPricingForBenchCheckBox()).isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Portfolio Pricing Sources for Benchmark" checkbox is checked off ' +
            'under "Prices" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "S&P/ASX" from the expanded tree of "Equity > S&P" ', () => {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer, 'S&P/ASX', 'Equity|S&P').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Should verify if "S&P/ASX" is displayed in the "Selected" section', () => {
      var children = ThiefHelpers.getListboxClassReference(DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer).getChildrenText();
      var arrOfColumns = [];

      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrOfColumns.push(childArr[i].text);
        }
      }).then(() => {
        if (arrOfColumns[0] !== 'S&P/ASX') {
          expect(false).customError('"S&P/ASX" is not present in the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Document options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    storeFootnotesText();

    verifyData('Document Name: Client:/pa3/general/REPORT FOOTERS', 3);

    verifyData('Benchmark Pricing Sources: S&P/ASX', 4);

  });

  describe('Test Step ID: 508366', () => {

    selectPencil();

    var arrListItems = ['Pricing Source(s) - Benchmark', 'Grouping Frequency'];

    it('Should on the "X" icon next to "' + arrListItems + '" from "Selected" section', () => {
      arrListItems.forEach((element) => {
        var item = ThiefHelpers.getListBoxItem(Footnotes.xpathSelectedSection, element);
        item.getText().then(function(text) {
          if (text !== element) {
            expect(false).customError('"' + element + '" is not shown in the "Selected" container;Found: ' + text);
            CommonFunctions.takeScreenShot();
          } else {
            item.getActions().then(function(actions) {
              actions.triggerAction('remove');
            });
          }
        }, (err) => {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + element + '" is not found in the "Selected" container');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "' + arrListItems + '" are removed from selected section', () => {
      arrListItems.forEach((element) => {
        ThiefHelpers.getListBoxItem(Footnotes.xpathSelectedSection, element).getText().then(function(text) {
          if (text === element) {
            expect(false).customError('"' + element + '" is shown in the "Selected" container');
            CommonFunctions.takeScreenShot();
          }
        }, (err) => {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(true).toBeTruthy();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Apply To Attribution" button ', () => {
      ThiefHelpers.getButtonClassReference('Apply To Attribution').press();
    });

    it('Verifying if "Blasting" widget is opened', () => {
      ThiefHelpers.isPresent(undefined, undefined, Footnotes.xpathBlastingMenu).then(function(blastWindow) {
        if (!blastWindow) {
          expect(false).customError('"Blasting" widget is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check the "Contribution" checkbox', () => {
      ThiefHelpers.getCheckBoxClassReference('Contribution').check();

      // Verifying if the "Contribution" check box is checked
      ThiefHelpers.getCheckBoxClassReference('Contribution').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Contribution" check box did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Ok" on blasting menu', () => {
      var xpath = CommonFunctions.replaceStringInXpath(Footnotes.xpathBlastingButton, 'OK');
      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Click "OK" on the "Footnotes" dialog', () => {
      ThiefHelpers.getDialogButton('Footnotes', 'OK').click().then(() => {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Uncategorized', 'Contribution', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    storeFootnotesText();

    verifyData('Portfolio Pricing Sources: FactSet - Equity|Client Portfolio|MSCI - Net', 0);

    verifyData('Document Name: Client:/pa3/general/REPORT FOOTERS', 1);

  });

  describe('Test Step ID: 524415', () => {

    selectPencil();

    var arrListboxItem = ['Hidden Securities/Groups', 'Pricing Source(s) - Portfolio', 'Document Name'];

    it('Should hold "CONTROL" key,', () => {
      browser.actions().keyDown(protractor.Key.CONTROL).perform();
    });

    it('Should hold CTRL key and select "' + arrListboxItem + '" from selected section', () => {
      arrListboxItem.forEach((itemName) => {
        ThiefHelpers.getListBoxItem(Footnotes.xpathSelectedSection, itemName).select();

        ThiefHelpers.getListBoxItem(Footnotes.xpathSelectedSection, itemName).isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError(itemName + 'is not selected even after clicking on it.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should un press "Control" key from the keyboard', () => {
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

    it('Should click "Left" arrow to move the elements to Available section', () => {
      ThiefHelpers.getTransferBoxReference().transferToSource();
    });

    it('Verifying if "' + arrListboxItem + '" is displayed in the "Available" section', () => {
      var children = ThiefHelpers.getListboxClassReference(Footnotes.xpathAvailableSection).getChildrenText();
      var arrOfColumns = [];

      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrOfColumns.push(childArr[i].text);
        }
      }).then(() => {
        var screenshot = 0;
        arrListboxItem.forEach((itemName) => {
          if (arrOfColumns.indexOf(itemName) < 0) {
            expect(false).customError(itemName + ' is not present in the "Available" section');
            screenshot++;
          }
        });

        if (screenshot > 0) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "OK" on the "Footnotes" dialog', () => {
      ThiefHelpers.getDialogButton('Footnotes', 'OK').click().then(() => {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    storeFootnotesText();

    verifyData('No footnotes selected.  Click on \'Edit\' icon to add footnotes.', 0);

  });

  describe('Test Step ID: 524990', () => {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Databases', undefined, 'document options');

    var arrListItems = ['FactSet', 'MSCI'];

    arrListItems.forEach((itemName) => {
      it('Should double click on "' + itemName + '" from the "Fundamental > Available" section', () => {
        ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsDatabases.xpathFundamentalAvailableContainer, itemName).select();

        ThiefHelpers.getListBoxItem(DocumentOptionsDatabases.xpathFundamentalAvailableContainer, itemName).then(function(ref) {
          browser.actions().doubleClick(ref).perform();
        });
      });

      it('Verifying that "' + itemName + '" is listed in the "Fundamental > Selected" container ', () => {
        ThiefHelpers.getListBoxItem(DocumentOptionsDatabases.xpathFundamentalSelectedContainer, itemName).getText().then(function(text) {
          expect(text !== itemName).toBe(false, '"' + itemName + '" is not shown in the "Selected" container;Found: ' + text);
        }, (err) => {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + itemName + '" is not found in the "Selected" container');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Click on "Ok" button of header and verify if "Document options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

  });

  describe('Test Step ID: 524983', () => {

    selectPencil();

    it('Should click on "Fundamental Database Source(s)" in Available section and click on right arrow', () => {
      ThiefHelpers.getListBoxItem(Footnotes.xpathAvailableSection, 'Fundamental Database Source(s)').getText().then(function(text) {
        if (text !== 'Fundamental Database Source(s)') {
          expect(false).customError('"Fundamental Database Source(s)" is not shown in the "Available" container;Found: ' + text);
          CommonFunctions.takeScreenShot();
        } else {
          ThiefHelpers.getListBoxItem(Footnotes.xpathAvailableSection, 'Fundamental Database Source(s)').select();

          ThiefHelpers.getTransferBoxReference().transferToTarget();
        }
      }, (err) => {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Fundamental Database Source(s)" is not found in the "Available" container');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Fundamental Database Source(s)" is added to selected section', () => {
      var arrSelectedElements = [];
      ThiefHelpers.getListboxClassReference(Footnotes.xpathSelectedSection).getChildrenText().then((children) => {
        children.forEach((child) => {
          arrSelectedElements.push(child.text);
        });
      }).then(() => {
        expect(arrSelectedElements.indexOf('Fundamental Database Source(s)')).toBeGreaterThan(-1);
      });
    });

    it('Click "OK" on the "Footnotes" dialog', () => {
      ThiefHelpers.getDialogButton('Footnotes', 'OK').click().then(() => {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    selectPencil();

  });

  describe('Test Step ID: 525151', () => {

    it('Click "Cancel" on the "Footnotes" dialog', () => {
      ThiefHelpers.getDialogButton('Footnotes', 'Cancel').click().then(() => {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Columns');

    it('Should expand "FactSet > Valuation" and double click on "Price to Earnings"', () => {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.expand();
      group.getGroupByText('Valuation').then((childGroup) => {
        childGroup.expand();
        childGroup.getItemByText('Price to Earnings').then((listItem) => {
          listItem.select();
          listItem.doubleClick();
        });
      });
    });

    var arrSelectedSection = [];
    it('Verifying if "Price to Earnings" is added to the selected section', () => {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText().then((children) => {
        if (children.length === 0) {
          expect(false).customError('Selected section is empty');
          CommonFunctions.takeScreenShot();
        } else {
          children.forEach((element) => {
            arrSelectedSection.push(element.text);
          });
        }
      }).then(() => {
        if (arrSelectedSection.indexOf('Price to Earnings') < 0) {
          expect(false).customError('"Price to Earnings" is not present in selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    storeFootnotesText();

    verifyData('Fundamental DB Sources: FactSet|MSCI', 0);

  });

  describe('Test Step ID: 525155', () => {

    selectPencil();

    it('Should click on "Apply To Contribution" button ', () => {
      ThiefHelpers.getButtonClassReference('Apply To Contribution').press();
    });

    it('Verifying if "Blasting" widget is opened', () => {
      ThiefHelpers.isPresent(undefined, undefined, Footnotes.xpathBlastingMenu).then((blastWindow) => {
        if (!blastWindow) {
          expect(false).customError('"Blasting" widget is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check the "Weights" checkbox', () => {
      ThiefHelpers.getCheckBoxClassReference('Weights').check();

      // Verifying if the "Weights" check box is checked
      ThiefHelpers.getCheckBoxClassReference('Weights').isChecked().then((checked) => {
        if (!checked) {
          expect(false).customError('"Weights" check box did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Ok" on blasting menu', () => {
      var xpath = CommonFunctions.replaceStringInXpath(Footnotes.xpathBlastingButton, 'OK');
      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Click "OK" on the "Footnotes" dialog', () => {
      ThiefHelpers.getDialogButton('Footnotes', 'OK').click().then(() => {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Uncategorized', 'Weights', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    storeFootnotesText();

    verifyData('Benchmark Holdings As Of Date: S&P 500 5/31/2017', 0);

  });

  describe('Test Step ID: 508367', () => {

    selectPencil();

    it('Should remove all elements in selected section', () => {
      var children = ThiefHelpers.getListboxClassReference(Footnotes.xpathSelectedSection).getChildrenText();
      var arrOfColumns = [];

      children.then((childArr) => {
        for (var i = 0; i < childArr.length; ++i) {
          arrOfColumns.push(childArr[i].text);
        }
      }).then(() => {
        arrOfColumns.forEach((element) => {
          var item = ThiefHelpers.getListBoxItem(Footnotes.xpathSelectedSection, element);
          return item.getActions().then((actions) => {
            return actions.triggerAction('remove');
          }, () => {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        });
      });
    });

    it('Verifying if selected section is empty', () => {
      ThiefHelpers.getListboxClassReference(Footnotes.xpathSelectedSection).getChildrenText().then((children) => {
        expect(children.length).toBe(0);
      });
    });

    it('Should click on + icon in the Footnote dialog box', () => {
      ThiefHelpers.getButtonClassReference(undefined, Footnotes.xpathAddButton).press().then(() => {
      }, () => {

        expect(false).customError('Unable to click on button');
        CommonFunctions.takeScreenShot();
      });
    });

    sendTextAndSave('<!SET_SYMBOL("sp50");"#PR";!>', 'Test');

    it('Verifying if only one footnote "RUSSELL:TOP200" is present in Footnote pop up', () => {
      if (arrFootnotes.length !== 1) {
        expect(false).customError('One footnote is not present in footnote pop up. Found length ' + arrFootnotes.length);
        CommonFunctions.takeScreenShot();
      } else {
        if (arrFootnotes[0] !== 'RUSSELL:TOP200') {
          expect(false).customError('"RUSSELL:TOP200" is not present in the pop up. Found ' + arrFootnotes[0]);
          CommonFunctions.takeScreenShot();
        }
      }
    });

  });

  describe('Test Step ID: 524820', () => {

    selectPencil();

    it('Should click on pencil icon next to "Test"', () => {
      var item = ThiefHelpers.getListBoxItem(Footnotes.xpathSelectedSection, 'Test');
      item.getActions().then(function(actions) {
        actions.triggerAction('edit');
      });
    });

    sendTextAndSave('<!CONVERT_DATE(DATE_YYYYMMDD(NOW),"MM/DD/YYYY");!>', 'Date');

    it('Verifying if only one footnote MM/DD/YYYY format is present in Footnote pop up', () => {
      if (arrFootnotes.length !== 1) {
        expect(false).customError('One footnote is not present in footnote pop up. Found length ' + arrFootnotes.length);
        CommonFunctions.takeScreenShot();
      } else {
        Utilities.isValidMDDYYYY(arrFootnotes[0]);
      }
    });
  });

  describe('Test Step ID: 524440', () => {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Exclusions');

    it('Wait for data in "Available" container to load', () => {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    var xpathAvailableVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');
    var xpathSelectedVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');

    it('Should expand "Commercial Services > Financial Publishing/Services" and double click on "Thomson Reuters Corporation"', () => {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getGroupByText('Commercial Services');
      group.expand();
      group.getGroupByText('Financial Publishing/Services').then(function(childGroup) {
        childGroup.expand();
        childGroup.getItemByText('Thomson Reuters Corporation').then(function(listItem) {
          listItem.select();
          listItem.doubleClick();
        });
      });
    });

    var arrSelectedSection = [];
    it('Verifying if "Thomson Reuters Corporation" is added to the selected section', () => {
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(children) {
        children.forEach((element) => {
          arrSelectedSection.push(element.text);
        });
      }).then(() => {
        if (arrSelectedSection[0] !== 'Commercial Services > Financial Publishing/Services > Thomson Reuters Corporation') {
          expect(false).customError('"Commercial Services > Financial Publishing/Services > Thomson Reuters Corporation" is not present in selected section. Found ' + arrSelectedSection[0]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "TRC" in the "Exclusion Name:" textbox', () => {
      // Typing the Text in the box
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsExclusions.xpathExclusionNameTextbox).setText('TRC');

      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsExclusions.xpathExclusionNameTextbox).getText().then(function(attr) {
        if (attr !== 'TRC') {
          expect(false).customError('"Exclusion Name:" textbox does not contains TRC. Found ' + attr);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Hidden LHP item to select.
    it('Should click on Hidden LHP item to select', () => {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Hidden" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', () => {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsHidden.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    it('Should expand "Communications > Major Telecommunications" and double click on "AT&T Inc."', () => {
      // Getting the xpath of the Available section
      var xpathOfHiddenAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Available');

      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfHiddenAvailableSection).getGroupByText('Communications');
      group.expand();
      group.getGroupByText('Major Telecommunications').then(function(childGroup) {
        childGroup.expand();
        childGroup.getItemByText('AT&T Inc.').then(function(listItem) {
          listItem.select();
          listItem.doubleClick();
        });
      });
    });

    it('Verifying if "AT&T Inc." is added to the selected section', () => {
      // Getting the xpath of the Available section
      var xpathOfHiddenSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Selected');

      arrSelectedSection.length = 0;
      ThiefHelpers.getVirtualListboxClassReference(xpathOfHiddenSelectedSection).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(children) {
        children.forEach((element) => {
          arrSelectedSection.push(element.text);
        });
      }).then(() => {
        if (arrSelectedSection[0] !== 'Communications > Major Telecommunications > AT&T Inc.') {
          expect(false).customError('"Communications > Major Telecommunications > AT&T Inc." is not present in selected section. Found ' + arrSelectedSection[0]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "ATT" in the "Hidden Name:" textbox', () => {
      // Typing the Text in the box
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsHidden.xpathHiddenNameTextbox).setText('ATT');

      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsHidden.xpathHiddenNameTextbox).getText().then(function(attr) {
        if (attr !== 'ATT') {
          expect(false).customError('"Hidden Name:" textbox does not contains ATT. Found ' + attr);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    storeFootnotesText();

    verifyCurrentDate(true);

  });

  describe('Test Step ID: 524439', () => {

    selectPencil();

    var arrListItems = ['Hidden Securities/Groups', 'Excluded Securities'];
    it('Should double click on "' + arrListItems + '" in Available section', () => {
      arrListItems.forEach((element) => {
        ThiefHelpers.getListBoxItem(Footnotes.xpathAvailableSection, element).getText().then(function(text) {
          if (text !== element) {
            expect(false).customError('"' + element + '" is not shown in the "Available" container;Found: ' + text);
            CommonFunctions.takeScreenShot();
          } else {
            ThiefHelpers.getListBoxItem(Footnotes.xpathAvailableSection, element).then(function(ref) {
              browser.actions().doubleClick(ref).perform();
            });
          }
        }, (err) => {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + element + '" is not found in the "Available" container');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "' + arrListItems + '" are added to selected section', () => {
      arrListItems.forEach((element) => {
        ThiefHelpers.getListBoxItem(Footnotes.xpathSelectedSection, element).getText().then(function(text) {
          if (text !== element) {
            expect(false).customError('"' + element + '" is not shown in the "Selected" container;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, (err) => {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + element + '" is not found in the "Selected" container');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Click "OK" on the "Footnotes" dialog', () => {
      ThiefHelpers.getDialogButton('Footnotes', 'OK').click().then(() => {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    storeFootnotesText();

    verifyCurrentDate();

    verifyData('Hidden: ATT', 1);

    verifyData('Excluded Securities: TRC', 2);

  });

  describe('Test Step ID: 611051', () => {

    it('Should launch the PA3 application with "Client:default_doc_OLD" document', () => {
      PA3MainPage.switchToDocument('default-doc-old');
    });

    it('Should enter "LFS:LHMN0038" in Portfolio widget', () => {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).setText('LFS:LHMN0038');

      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(text) {
        if (text !== 'LFS:LHMN0038') {
          expect(false).customError('Portfolio widget is not populated with "LFS:LHMN0038". Found ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "LHMN0038" into Benchmark widget and select "Bloomberg Barclays Global Aggregate" ' + 'from type ahead', () => {
      PA3MainPage.setBenchmark('LHMN0038', true, false, 'Bloomberg Barclays Global Aggregate', 'BENCH:LHMN0038').then(() => {
      }, (error) => {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    storeFootnotesText();

    it('Verifying if "Portfolio Holdings As Of Date: Bloomberg Barclays Global Aggregate Statistics Universe M/DD/YYYY" is displayed', () => {
      if (arrFootnotes[0].indexOf('Portfolio Holdings As Of Date: Bloomberg Barclays Global Aggregate Statistics Universe') < -1) {
        expect(false).customError('"Portfolio Holdings As Of Date: Bloomberg Barclays Global Aggregate Statistics Universe" is not present in the footnotes');
        CommonFunctions.takeScreenShot();
      } else {
        var tempDate = arrFootnotes[0].split(':')[1].split(' ')[7];
        Utilities.getCurrentDate('MDDYYYY', '/').then(function(date) {
          Utilities.getBusinessDate(date, '/').then((currentDate) => {
            if (currentDate !== tempDate) {
              Utilities.getPreviousDate().then((previousDate) => {
                if (previousDate !== tempDate) {
                  expect(false).customError('Date is not today\'s date or previous close date. Found ' + arrFootnotes[0]);
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          });

        });
      }

    });

    it('Verifying if "Benchmark Holdings As of Date: Bloomberg Barclays Global Aggregate M/DD/YYYY" is displayed', () => {
      if (arrFootnotes[1].indexOf('Benchmark Holdings As of Date: Bloomberg Barclays Global Aggregate') < -1) {
        expect(false).customError('"Benchmark Holdings As of Date: Bloomberg Barclays Global Aggregate M/DD/YYYY" is not present in the footnotes');
        CommonFunctions.takeScreenShot();
      } else {
        var tempDate = arrFootnotes[1].split(':')[1].split(' ')[5];
        Utilities.getCurrentDate('MDDYYYY', '/').then(function(date) {
          Utilities.getBusinessDate(date, '/').then((currentDate) => {
            if (currentDate !== tempDate) {
              Utilities.getPreviousDate().then((previousDate) => {
                if (previousDate !== tempDate) {
                  expect(false).customError('Date is not today\'s date or previous close date. Found ' + arrFootnotes[1]);
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          });

        });
      }

    });

  });

  describe('Test Step ID: 777408', () => {

    it('Should enter "Client:/pa3/test.acct" in Portfolio widget', () => {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).setText('Client:/pa3/test.acct');

      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathPortfolioWidget).getText().then(function(text) {
        if (text !== 'CLIENT:/PA3/TEST.ACCT') {
          expect(false).customError('Portfolio widget is not populated with "CLIENT:/PA3/TEST.ACCT". Found ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should enter "RUSSELL:3000" in Benchmark widget', () => {
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).setText('RUSSELL:3000');

      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathBenchmarkWidget).getText().then(function(text) {
        if (text !== 'RUSSELL:3000') {
          expect(false).customError('Benchmark widget is not populated with "RUSSELL:3000". Found ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    selectPencil();

    var arrListItems = ['Composite Assets', 'Excluded Securities'];
    it('Should double click on "' + arrListItems + '" in Available section', () => {
      arrListItems.forEach((element) => {
        ThiefHelpers.getListBoxItem(Footnotes.xpathAvailableSection, element).getText().then(function(text) {
          if (text !== element) {
            expect(false).customError('"' + element + '" is not shown in the "Available" container;Found: ' + text);
            CommonFunctions.takeScreenShot();
          } else {
            ThiefHelpers.getListBoxItem(Footnotes.xpathAvailableSection, element).then(function(ref) {
              browser.actions().doubleClick(ref).perform();
            });
          }
        }, (err) => {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + element + '" is not found in the "Available" container');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "' + arrListItems + '" are added to selected section', () => {
      arrListItems.forEach((element) => {
        ThiefHelpers.getListBoxItem(Footnotes.xpathSelectedSection, element).getText().then(function(text) {
          if (text !== element) {
            expect(false).customError('"' + element + '" is not shown in the "Selected" container;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, (err) => {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + element + '" is not found in the "Selected" container');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Click "Cancel" on the "Footnotes" dialog', () => {
      ThiefHelpers.getDialogButton('Footnotes', 'Cancel').click().then(() => {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if the loading icon does not appear', () => {
      ThiefHelpers.getProgressIndicatorClassReference().getProgress().then(() => {
        expect(false).customError('Report is recalculated.');
        CommonFunctions.takeScreenShot();
      }, () => {

        expect(true).toBeTruthy();
      });
    });

  });

});
