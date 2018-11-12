require(__dirname + '/../../index.js');

describe('Test Case: georev-columns', () => {

  // Getting the xpath of the Selected section
  let xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  let xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  let rowName;

  describe('Test Step ID: 463787', () => {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;pa3;georev;GeoRev_Columns"', () => {
      PA3MainPage.launchHtmlDialogAndOpenDocument('georev-columns');
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    let arrGroups = ['Africa & Middle East', 'Americas', 'Asia/Pacific', 'Europe', 'Unknown', '[Unassigned]'];

    // Known Issue: RPD:40404576  Extra Grouping 'Unknown' is displayed in contribution report
    it('Verifying if Contribution report calculates with "' + arrGroups + '" rows', () => {
      let takeScreenShot = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', '', '').then((arr) => {

        // arr.length - 1 is done since Total is also counted as row name
        if ((arr.length - 1) !== arrGroups.length) {
          expect(false).customError('There are more than 6 rows present in calculated report. Found length ' + (arr.length - 1));
          CommonFunctions.takeScreenShot();
        } else {
          arrGroups.forEach((groupName, index) => {

            // arr[index + 1] is done since Total is present at index 0
            if (groupName !== arr[index + 1]) {
              expect(false).customError('"' + groupName + '" is not found in the report. Found ' + arr[index]);
              takeScreenShot++;
              if (takeScreenShot === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        }
      });
    });

    let screenShot = 0;
    it('Verifying if all columns are empty except "GeoRev Portfolio Exposure" column in the report', () => {
      SlickGridFunctions.getAllColumnFieldValue('Contribution').then((arrayColumns) => {
        arrayColumns.forEach((columnName, colIndex) => {
          browser.driver.executeScript('return $( ".tf-slick-grid:eq(0)" ).data( "$tfSlickGridController" )' +
            '.grid.scrollCellIntoView( arguments[0], arguments[1] ) ', 0, colIndex);
          if (columnName !== '') {
            if (columnName !== 'GeoRev Portfolio Exposure') {
              SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', columnName).then((cellValues) => {
                cellValues.forEach((value, index) => {
                  if (value !== '') {
                    expect(false).customError('"' + columnName + '" contains data at row ' + index);
                    screenShot++;
                    if (screenShot === 1) {
                      CommonFunctions.takeScreenShot();
                    }
                  }
                });
              });
            } else if (columnName === 'GeoRev Portfolio Exposure') {
              SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', columnName).then((cellValues) => {
                cellValues.forEach((value, index) => {
                  if (value === '') {
                    expect(false).customError('"' + columnName + '" does not contains data at row ' + index);
                    screenShot++;
                    if (screenShot === 1) {
                      CommonFunctions.takeScreenShot();
                    }
                  }
                });
              });
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 463788', () => {

    it('Should expand "Americas|Bahamas" in the contribution report', () => {
      PA3MainPage.expandTreeInCalculatedReport('Contribution', 'Americas|Bahamas');
    });

    it('Verifying if Americas|Bahamas group is expanded', () => {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'Americas|Bahamas');
    });

    it('Verifying the Security level values after expanding Americas|Bahamas for all columns displayed data', () => {
      let needScreenShot = 0;
      SlickGridFunctions.getAllRowsFromReport('Contribution').then((dataView) => {
        dataView.forEach((eleRef) => {
          if (eleRef.metadata.type === 'security') {
            rowName = eleRef[1];
            SlickGridFunctions.getAllColumnFieldValue('Contribution').then((columnNames) => {
              columnNames.forEach((columnName, index) => {
                if (eleRef[index] === '' || eleRef[index] === '--' || eleRef[index] === 'NA') {
                  expect(false).customError('Cell value for "' + columnName + '" column doesn\'t have data. Found ' + eleRef[index]);
                  needScreenShot++;
                  if (needScreenShot === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                }
              });
            });
          }
        });
      });
    });
  });

  describe('Test Step ID: 463789', () => {

    // Click on report wrench icon and select "Options" from the menu
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Columns');

    it('Should expand FactSet|Benchmark|Fixed Income and double click on "Bench. Income"', () => {
      // Getting the xpath of the Available section
      let group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then((expanded) => {
        if (expanded) {
          group.getGroupByText('Benchmark').then((subGroup) => {
            subGroup.expand();
            subGroup.isExpanded().then((expanded) => {
              if (expanded) {
                subGroup.getGroupByText('Fixed Income').then((subGroup1) => {
                  subGroup1.expand();
                  subGroup1.isExpanded().then((expanded) => {
                    if (!expanded) {
                      expect(false).customError('"Fixed Income" is not expanded');
                      CommonFunctions.takeScreenShot();
                    } else {
                      subGroup1.getItemByText('Bench. Income').then((item) => {
                        item.select();

                        item.doubleClick();
                      });
                    }
                  });
                });
              } else {
                expect(false).customError('"Benchmark" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"FactSet" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Bench. Income" is added to Selected section', () => {
      let arrChildren = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText().then((children) => {
        children.forEach((childName) => {
          arrChildren.push(childName);
        });
      }).then(() => {
        if (arrChildren.indexOf('Bench. Income') < -1) {
          expect(false).customError('"Bench. Income" is not found in Selected section');
          CommonFunctions.takeScreenShot();
        }
      });

    });

  });

  describe('Test Step ID: 463790', () => {

    it('Should enter "Port. Average Weight" into the search field of "Available" section', () => {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Port. Average Weight');

      // Verifying that "Port. Average Weight" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then((text) => {
        if (text !== 'Port. Average Weight') {
          expect(false).customError('"Port. Average Weight" is not present in search field of "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Port. Average Weight" in available section', () => {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Port. Average Weight').then((item) => {
        item.select();

        // Verifying if 'Port. Average Weight' is selected
        item.isSelected().then((selected) => {
          if (!selected) {
            expect(false).customError('"Port. Average Weight" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on right arrow button', () => {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying that "Port. Average Weight" is displayed in selected section', () => {
      let arrChildren = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText().then((children) => {
        children.forEach((childName) => {
          arrChildren.push(childName);
        });
      }).then(() => {
        if (arrChildren.indexOf('Port. Average Weight') < -1) {
          expect(false).customError('"Port. Average Weight" is not found in Selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 463791', () => {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it(`Verifying if "Bench. Income" column of Total row contains "--"`, () => {
      SlickGridFunctions.scrollCellIntoView('Contribution', 'Total', '', 'Bench. Income');
      PA3MainPage.getValueFromCalculatedReport('Contribution', 'Total', 'Bench. Income',
        'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right').then((value) => {
          if (value !== '--') {
            expect(false).customError(`"Bench. Income" column of Total row did not contains "--". Found ${value}`);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "Bench. Income" column displays "--"', () => {
      let takeScreenShot = 0;
      PA3MainPage.getAllCellsOfGivenColumn('Contribution', 'Bench. Income', 'slick-pane slick-pane-bottom slick-pane-right').then((arr) => {
        arr.forEach((cellValue, index) => {
          Utilities.makeElementVisible(cellValue);
          cellValue.getText().then((text) => {
            if (text !== '--') {
              expect(false).customError('Cell value of "Bench. Income" did not contain "--". Found ' + text + ' at row ' + index);
              takeScreenShot++;
              if (takeScreenShot === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    it('Verifying if "Port. Average Weight" column displays values', () => {
      let takeScreenShot = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Port. Average Weight', '').then((arr) => {
        arr.forEach((cellValue, index) => {
          browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowIntoView( arguments[ 0 ] )', index);
          if (cellValue === '--' || cellValue === '' || cellValue === 'NA') {
            expect(false).customError('Cell value of "Port. Average Weight" did not contain value. Found ' + cellValue + ' at row ' + index);
            takeScreenShot++;
            if (takeScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 463793', () => {

    // Click on report wrench icon and select "Options" from the menu
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Columns');

    let arrListElemensts = ['GeoRev  Date', 'Bench. Income', 'GeoRev  Confidence  Score'];

    arrListElemensts.forEach((eleName) => {
      it('Should delete "' + eleName + '" in the selected section', () => {
        let item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(eleName);
        item.select();

        item.getActions().then((remove) => {
          remove.triggerAction('remove');
        });
      });

      it('Verifying if "' + eleName + '" is deleted from selected section', () => {
        let arrChildren = [];
        ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText().then((children) => {
          children.forEach((childName) => {
            arrChildren.push(childName);
          });
        }).then(() => {
          if (arrChildren.indexOf(eleName) > -1) {
            expect(false).customError('"' + eleName + '" is found in Selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    let arrColumns = ['Ticker', '', 'GeoRev Revenue', 'GeoRev Company Exposure', 'GeoRev Portfolio Exposure', 'GeoRev Confidence', 'Port. Average Weight'];

    // Known Issue: "Security Name" is not displayed as column name in the Contribution Report which is expected as per RPD:16706349
    it('Verifying if "' + arrColumns + '" are present in calculated report', () => {
      SlickGridFunctions.getAllColumnFieldValue('Contribution').then((columns) => {
        if (columns.length !== 7) {
          expect(false).customError('Columns length is not 7. Found ' + columns.length);
          CommonFunctions.takeScreenShot();
        } else {
          arrColumns.forEach((columnName, index) => {
            if (columnName !== columns[index]) {
              expect(false).customError(`"${columnName}" is not present in the report. Found ${columns[index]}`);
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

  });

  describe('Test Step ID: 463811', () => {

    // Click on report wrench icon and select "Options" from the menu
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Columns');

    // Click on the "+" icon next to available section and select the option from the drop-down
    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('New/Reference', 'Columns');

    it('Should select "Reference" radio button in window', () => {
      ThiefHelpers.getRadioClassReference('Reference').select();

      // Verifying if the "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference').isSelected().then((selected) => {
        if (!selected) {
          expect(false).customError('"Reference" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Col 4: GeoRev Confidence" from the "Formula" tab', () => {
      let xpathOfFormulaTextArea = element(by.xpath(CreateEditCustomColumns.xpathOfFormulaTextArea));
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText(`Col 4: GeoRev Confidence`).doubleClick();
    });

    // Verify if text is present in the formula section after selection option from type-ahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror(`Formula`, undefined, `COL4`, true);

    it('Should enter "Confidence Ref" in the "Name" textbox', () => {
      ThiefHelpers.getTextBoxClassReference('Name:', undefined).setText('Confidence Ref');
    });

    it('Verifying if the "Name" text box is set to "Confidence Ref"', () => {
      ThiefHelpers.getTextBoxClassReference('Name:', undefined).getText().then((text) => {
        if (text !== 'Confidence Ref') {
          expect(false).customError('The "Name" text box is not set to "Confidence Ref"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Save" button of "Columns" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Columns');

    it('Verifying that "Columns" dialog is no more displayed', () => {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then((found) => {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Columns" dialog box is not closed');
        }
      });
    });

    it('Verify if the "Confidence Ref" is present in the selected section', () => {
      let arrColumnNames = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText().then((columnNames) => {
        columnNames.forEach((columnName) => {
          arrColumnNames.push(columnName.text);
        });
      }).then(() => {
        if (arrColumnNames.indexOf('Confidence Ref') === -1) {
          expect(false).customError('"Confidence Ref" is not present in the selected section');
          CommonFunctions.takeScreenShot();
        }

      });
    });
  });

  describe('Test Step ID: 463813', () => {

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);

    it(`Verifying if data in "GeoRev Confidence" and "Confidence Ref" for ${rowName} are same`, () => {
      SlickGridFunctions.getCellReference('Contribution', rowName, '', 'GeoRev Confidence', undefined, 'Americas|Bahamas').then((cellRef1) => {
        cellRef1.getText().then((text1) => {
          SlickGridFunctions.getCellReference('Contribution', rowName, '', 'Confidence Ref', undefined, 'Americas|Bahamas').then((cellRef2) => {
            cellRef2.getText().then((text2) => {
              if (text1 !== text2) {
                expect(false).customError(`Data in "Georev Confidence" ${text1} and "Confidence Ref" ${text2} for ${rowName} are not same`);
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      });
    });

    it('Verifying "GeoRev Portfolio Exposure", "Port. Average Weight" and "Security Name" columns only contains data for groupings', () => {
      let needScreenShot = 0;
      SlickGridFunctions.getAllRowsFromReport('Contribution').then((dataView) => {
        dataView.forEach((eleRef, rowIndex) => {
          if (eleRef.metadata.type === 'group') {
            SlickGridFunctions.getAllColumnFieldValue('Contribution').then((columnNames) => {
              columnNames.forEach((columnName, index) => {
                browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
                  '.grid.scrollCellIntoView( arguments[0], arguments[1])', rowIndex, index);
                if (columnName !== 'GeoRev Portfolio Exposure' && columnName !== 'Port. Average Weight' && columnName !== '') {
                  if (eleRef[index] !== '') {
                    expect(false).customError('Cell value for "' + columnName + '" column have data. Found ' + eleRef[index] + ' at row index ' + index);
                    needScreenShot++;
                    if (needScreenShot === 1) {
                      CommonFunctions.takeScreenShot();
                    }
                  }
                } else {
                  if (eleRef[index] === '') {
                    expect(false).customError('Cell value for "' + columnName + '" column doesn\'t have data. Found ' + eleRef[index] + ' at row index ' + index);
                    needScreenShot++;
                    if (needScreenShot === 1) {
                      CommonFunctions.takeScreenShot();
                    }
                  }
                }
              });
            });
          }
        });
      });
    });
  });

  describe('Test Step ID: 463817', () => {

    // Click on the folder icon and select "Save As..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`Save As…`);

    // Select personal directory and enter the document name
    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog(`Georev Column Test`, undefined, true);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);

    // Click on the Folder icon and click and select "New" from drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`New`);

    it(`Verifying if PA_DOCUMENT:DEFAULT is displayed`, () => {
      browser.getTitle().then((title) => {
        if (title !== `Portfolio Analysis 3.0 - Weights | Exposures [PA_DOCUMENTS:DEFAULT]`) {
          expect(false).customError(`Title of browser did not match. ` +
            `Expected: "Portfolio Analysis 3.0 - Weights | Exposures [PA_DOCUMENTS:DEFAULT]" but Found: "' + title + '".`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 463823', () => {

    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`Open...`);

    // Select the reuqired document from personal directory
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal(`Georev Column Test`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);

    let arrColumns = ['Ticker', '', 'GeoRev Revenue', 'GeoRev Company Exposure', 'GeoRev Portfolio Exposure', 'GeoRev Confidence', 'Port. Average Weight', 'Confidence Ref'];

    let screenShot = 0;
    it('Verifying if all columns are matched with the given array', () => {
      SlickGridFunctions.getAllColumnFieldValue('Contribution').then((arrayColumns) => {
        arrayColumns.forEach((columnName, colIndex) => {
          browser.driver.executeScript('return $( ".tf-slick-grid:eq(0)" ).data( "$tfSlickGridController" )' +
            '.grid.scrollCellIntoView( arguments[0], arguments[1] ) ', 0, colIndex);
          if (columnName !== arrayColumns[colIndex]) {
            expect(false).customError(`${columnName} did not match with ${arrayColumns[colIndex]}`);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should expand "Americas|Bahamas" in the contribution report if not already expanded', () => {
      PA3MainPage.isTreeExpanded('Contribution', 'Americas|Bahamas').then((expanded) => {
        if (!expanded) {
          PA3MainPage.expandTreeInCalculatedReport('Contribution', 'Americas|Bahamas');
        }
      });
    });

    it('Verifying if Americas|Bahamas group is expanded', () => {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'Americas|Bahamas');
    });

    it(`Verifying if data in "GeoRev Confidence" and "Confidence Ref" for ${rowName} are same`, () => {
      SlickGridFunctions.getCellReference('Contribution', rowName, '', 'GeoRev Confidence', undefined, 'Americas|Bahamas').then((cellRef1) => {
        cellRef1.getText().then((text1) => {
          SlickGridFunctions.getCellReference('Contribution', rowName, '', 'Confidence Ref', undefined, 'Americas|Bahamas').then((cellRef2) => {
            cellRef2.getText().then((text2) => {
              if (text1 !== text2) {
                expect(false).customError(`Data in "Georev Confidence" ${text1} and "Confidence Ref" ${text2} for ${rowName} are not same`);
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      });
    });

  });

  describe('Test Step ID: 463824', () => {

    // Click on report wrench icon and select "Options" from the menu
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Columns');

    it('Verify if the "Confidence Ref" is present in the selected section', () => {
      let arrColumnNames = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText().then((columnNames) => {
        columnNames.forEach((columnName) => {
          arrColumnNames.push(columnName.text);
        });
      }).then(() => {
        if (arrColumnNames.indexOf('Confidence Ref') === -1) {
          expect(false).customError('"Confidence Ref" is not present in the selected section');
          CommonFunctions.takeScreenShot();
        }

      });
    });
  });

  describe('Test Step ID: 488488', () => {

    it('Should delete "Confidence Ref" in the selected section', () => {
      let item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Confidence Ref');
      browser.call(() => {
        item.select();
      }).then(() => {
        item.getActions().then((remove) => {
          remove.triggerAction('remove');
        });
      });
    });

    it('Verifying if "Confidence Ref" is deleted from selected section', () => {
      let arrChildren = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText().then((children) => {
        children.forEach((childName) => {
          arrChildren.push(childName);
        });
      }).then(() => {
        if (arrChildren.indexOf('Confidence Ref') > -1) {
          expect(false).customError('"Confidence Ref" is found in Selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`Save`);

    CommonPageObjectsForPA3.saveChanges();

    // Click on report wrench icon and select "Options" from the menu
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Columns');

    it('Verifying if "Confidence Ref" is deleted from selected section', () => {
      let arrChildren = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText().then((children) => {
        children.forEach((childName) => {
          arrChildren.push(childName);
        });
      }).then(() => {
        if (arrChildren.indexOf('Confidence Ref') > -1) {
          expect(false).customError('"Confidence Ref" is found in Selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Contribution');

  });

  describe(`Test Step ID: 494342`, () => {

    it(`Should open new tab with "PA_DOCUMENTS:DEFAULT" document`, () => {
      let url = `https://pa.apps.factset.com/#/doc/PA_DOCUMENTS:DEFAULT/report/report0`;
      return browser.executeScript(`return window.open(arguments[0], \`_blank\`)`, url);
    });

    it(`Verifying if "Portfolio Analysis 3.0" window is displayed`, () => {
      browser.getAllWindowHandles().then(handles => {
        browser.driver.switchTo().window(handles[1]).then(() => {
          browser.driver.wait(() => browser.driver.getTitle().then(title => title.includes(`Portfolio Analysis 3.0`)), 30000,
            `"PA3" application page is not loaded within 30 seconds.`).then(() => {
            }, error => {

              expect(false).customError(error);
              CommonFunctions.takeScreenShot();
            });
        });
      });
    });

    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`Open...`);

    // Select the reuqired document from personal directory
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal(`Georev Column Test`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);

  });

});
