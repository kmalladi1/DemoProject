'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: expand-collapse-levels', function() {

  var level2GroupingsArr = [];
  var xpathAvailableVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');
  var xpathSelectedVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 678915', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:;expand_col_level" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('expand-col-level');
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report is not calculated');
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
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the header title with "SPN_AP50_ACCT vs Russell 1000"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'SPN_SP50_ACCT vs Russell 1000') {
          expect(false).customError('Header title did not displayed as "SPN_SP50_ACCT vs Russell 1000"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 678918', function() {

    var checkOptions = ['All', 'Level 1', 'Level 2'];

    it('Should right click on "Commercial Services" grouping from calculated report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services', 'grid-canvas grid-canvas-bottom grid-canvas-left');
      Utilities.scrollElementToVisibility(reference);
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
        // Wait for report menu to appear
        browser.wait(function() {
          return Utilities.waitUntilElementAppears(PA3MainPage.getOptionFromCustomMenu('Expand')).then(function(bool) {
            return bool;
          });
        }, 30000, 'Time out while waiting for right click menu to appear').then(function() {
        }, function() {
        });
      }, function(value) {
        if (!value) {
          expect(value).customError('Menu list did not appear after performing right click on "Commercial Services".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    checkOptions.forEach(function(optionName) {
      it('Hovering and verifying if "' + optionName + '" option is present in the "Expand" menu list and enabled', function() {
        var temp = 'Expand|' + optionName;
        PA3MainPage.getOptionFromCustomMenu(temp).isPresent().then(function(bool) {
          if (bool) {
            PA3MainPage.getOptionFromCustomMenu(temp).getAttribute('data-disabled').then(function(flag) {
              if (flag !== null) {
                expect(false).customError(optionName + ' option is not enabled');
                CommonFunctions.takeScreenShot();
              }
            });
          } else {
            expect(false).customError(optionName + ' is not seen in the "Expand" menu');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 678928', function() {

    it('Should select "All" option from Expand menu', function() {
      PA3MainPage.getOptionFromCustomMenu('Expand|All').click().then(function() {
        Utilities.waitUntilElementDisappears(element(by.xpath(SlickGridFunctions.xpathSlickGridLoadingSpinner)), 40000);

        // Waiting for grid elements to load
        browser.sleep(2000);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if all groupings are expanded in the report', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (eleRef.metadata.type === 'group') {
            if (eleRef.expanded !== true) {
              SlickGridFunctions.scrollRowToTop('Weights', rowIndex - 1);
              CommonFunctions.takeScreenShot();
              expect(false).customError(eleRef[0] + ' grouping is not expanded which is at index(row) ' + rowIndex);
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 678929', function() {

    var checkOptions = ['All', 'Level 1', 'Level 2'];

    it('Should right click on "Commercial Services" from calculated report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services', 'grid-canvas grid-canvas-bottom grid-canvas-left');
      Utilities.scrollElementToVisibility(reference);
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
      }, function(value) {
        if (!value) {
          expect(value).customError('Menu list did not appear after performing right click on "Commercial Services".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    checkOptions.forEach(function(optionName) {
      it('Hovering and verifying that "' + optionName + '" option is present in the "Expand" menu list', function() {
        var temp = 'Expand|' + optionName;
        PA3MainPage.getOptionFromCustomMenu(temp).isPresent().then(function(bool) {
          if (bool) {
            PA3MainPage.getOptionFromCustomMenu(temp).getAttribute('data-disabled').then(function(flag) {
              if (flag === null) {
                expect(false).customError(optionName + ' option is not disabled');
                CommonFunctions.takeScreenShot();
              }
            });
          } else {
            expect(false).customError(optionName + ' is not seen in the "Expand" menu');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 678930', function() {

    it('Should right click on "Commercial Services" from calculated report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services', 'grid-canvas grid-canvas-bottom grid-canvas-left');
      Utilities.scrollElementToVisibility(reference);
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
      }, function(value) {
        if (!value) {
          expect(value).customError('Menu list did not appear after performing right click on "Commercial Services".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hovering on "Collapse" and select "Level 2" option from Collapse menu', function() {
      PA3MainPage.getOptionFromCustomMenu('Collapse|Level 2').click().then(function() {
        Utilities.waitUntilElementDisappears(element(by.xpath(SlickGridFunctions.xpathSlickGridLoadingSpinner)), 40000);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Level 2" groupings are collapsed in the report', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (eleRef.metadata.type === 'group' && eleRef.level === 1) {
            if (eleRef.expanded !== false) {
              SlickGridFunctions.scrollRowToTop('Weights', rowIndex - 1);
              CommonFunctions.takeScreenShot();
              expect(false).customError(eleRef[0] + ' grouping in level 2 is not collapsed which is at index(row) ' + rowIndex);
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 678931', function() {

    var checkOptions = ['All', 'Level 2'];

    it('Should right click on "Commercial Services" from calculated report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services', 'grid-canvas grid-canvas-bottom grid-canvas-left');
      Utilities.scrollElementToVisibility(reference);
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
      }, function(value) {
        if (!value) {
          expect(value).customError('Menu list did not appear after performing right click on "Commercial Services".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    checkOptions.forEach(function(optionName) {
      it('Hovering on "Expand" and verifying that "' + optionName + '" option present in the menu list and is enabled', function() {
        var temp = 'Expand|' + optionName;
        PA3MainPage.getOptionFromCustomMenu(temp).isPresent().then(function(bool) {
          if (bool) {
            PA3MainPage.getOptionFromCustomMenu(temp).getAttribute('data-disabled').then(function(flag) {
              if (flag !== null) {
                expect(false).customError(optionName + ' option is not enabled');
                CommonFunctions.takeScreenShot();
              }
            });
          } else {
            expect(false).customError(optionName + ' is not seen in the "Expand" menu');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying that "Level 1" option present in the menu list is appear and is disabled', function() {
      PA3MainPage.getOptionFromCustomMenu('Expand|Level 1').isPresent().then(function(bool) {
        if (bool) {
          PA3MainPage.getOptionFromCustomMenu('Expand|Level 1').getAttribute('data-disabled').then(function(flag) {
            if (flag === null) {
              expect(false).customError('"Expand|Level 1" option is not disabled');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Level 1" is not seen in the "Expand" menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 678941', function() {

    it('Should right click on "Commercial Services" from calculated report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services', 'grid-canvas grid-canvas-bottom grid-canvas-left');
      Utilities.scrollElementToVisibility(reference);
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
      }, function(value) {
        if (!value) {
          expect(value).customError('Menu list did not appear after performing right click on "Commercial Services".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hovering and verifying that "Level 1" option present in the "Collapse" menu list is enabled', function() {
      PA3MainPage.getOptionFromCustomMenu('Collapse|Level 1').isPresent().then(function(bool) {
        if (bool) {
          PA3MainPage.getOptionFromCustomMenu('Collapse|Level 1').getAttribute('data-disabled').then(function(flag) {
            if (flag !== null) {
              expect(false).customError('"Collapse|Level 1" option is not enabled');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Level 1" is not seen in the "Collapse" menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hovering and verifying that "Level 2" option present in the "Collapse" menu list is disabled', function() {
      PA3MainPage.getOptionFromCustomMenu('Collapse|Level 2').isPresent().then(function(bool) {
        if (bool) {
          PA3MainPage.getOptionFromCustomMenu('Collapse|Level 2').getAttribute('data-disabled').then(function(flag) {
            if (flag === null) {
              expect(false).customError('"Collapse|Level 2" option is not disabled');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Level 2" is not seen in the "Collapse" menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 678942', function() {

    it('Should right click on "Commercial Services" from calculated report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services', 'grid-canvas grid-canvas-bottom grid-canvas-left');
      Utilities.scrollElementToVisibility(reference);
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
      }, function(value) {
        if (!value) {
          expect(value).customError('Menu list did not appear after performing right click on "Commercial Services".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hover on "Collapse" and should select "Level 1" option from Collapse menu', function() {
      PA3MainPage.getOptionFromCustomMenu('Collapse|Level 1').click().then(function() {
        Utilities.waitUntilElementDisappears(element(by.xpath(SlickGridFunctions.xpathSlickGridLoadingSpinner)), 40000);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if all groupings are collapsed in the report', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (eleRef.metadata.type === 'group') {
            if (eleRef.expanded === true) {
              SlickGridFunctions.scrollRowToTop('Weights', rowIndex - 1);
              CommonFunctions.takeScreenShot();
              expect(false).customError(eleRef[0] + ' grouping is not collapsed which is at index(row) ' + rowIndex);
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 678975', function() {

    var checkOptions = ['Level 1', 'Level 2'];
    var rowIndexArr = [];

    it('Should right click on "Commercial Services" from calculated report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services', 'grid-canvas grid-canvas-bottom grid-canvas-left');
      Utilities.scrollElementToVisibility(reference);
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
      }, function(value) {
        if (!value) {
          expect(value).customError('Menu list did not appear after performing right click on "Commercial Services".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hover on "Expand" and select "Level 1" option from Expand menu', function() {
      PA3MainPage.getOptionFromCustomMenu('Expand|Level 1').click().then(function() {
        Utilities.waitUntilElementDisappears(element(by.xpath(SlickGridFunctions.xpathSlickGridLoadingSpinner)), 40000);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click any where outside to dismiss the menu', function() {
      // Click anywhere to close the drop down
      PA3MainPage.getReports('Weights').click();
    });

    it('Fetching all "level 2" groupings under "Commercial Services" grouping', function() {
      var groupFound = false;
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef[0] === 'Commercial Services' && rowRef.metadata.type === 'group') {
            groupFound = true;
            var parentID = rowRef.id;
            dataView.forEach(function(element, rowIndex) {
              if (parentID === element.parentId) {
                rowIndexArr.push(rowIndex);
                level2GroupingsArr.push(element[0]);
              }
            });
          }
        });
      }).then(function() {
        if (groupFound === false) {
          expect(false).customError('No group found with "Commercial Services"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on + next to all "Level 2" groupings under "Commercial Services" grouping', function() {
      level2GroupingsArr.forEach(function(element, index) {
        SlickGridFunctions.scrollRowToTop('Weights', rowIndexArr[index - 1]);
        PA3MainPage.expandTreeInCalculatedReport('Weights', element, 'Commercial Services');
      });
    });

    it('Verifying if all "Level 2" groupings under "Commercial Services" grouping are expanded', function() {
      level2GroupingsArr.forEach(function(element, index) {
        SlickGridFunctions.scrollRowToTop('Weights', rowIndexArr[index - 1]);
        PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', element);
      });
    });

    it('Should right click on "Commercial Services" from calculated report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services', 'grid-canvas grid-canvas-bottom grid-canvas-left');
      Utilities.scrollElementToVisibility(reference);
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
      }, function(value) {
        if (!value) {
          expect(value).customError('Menu list did not appear after performing right click on "Commercial Services".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    checkOptions.forEach(function(optionName) {
      it('Hovering on "Collapse" and verifying that "' + optionName + '" option present in the "Collapse" menu list is enabled', function() {
        var temp = 'Collapse|' + optionName;
        PA3MainPage.getOptionFromCustomMenu(temp).isPresent().then(function(bool) {
          if (bool) {
            PA3MainPage.getOptionFromCustomMenu(temp).getAttribute('data-disabled').then(function(flag) {
              if (flag !== null) {
                expect(false).customError(optionName + ' option is not enabled');
                CommonFunctions.takeScreenShot();
              }
            });
          } else {
            expect(false).customError(optionName + ' is not seen in the "Collapse" menu');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 678978', function() {

    it('Should click on - next to all "Level 2" groupings under "Commercial Services" grouping', function() {
      level2GroupingsArr.forEach(function(element) {
        PA3MainPage.expandTreeInCalculatedReport('Weights', element, 'Commercial Services');
      });
    });

    it('Verifying if all "Level 2" groupings under "Commercial Services" grouping are collapsed', function() {
      level2GroupingsArr.forEach(function(element) {
        SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
          dataView.forEach(function(rowRef) {
            if (rowRef[0] === 'Commercial Services' && rowRef.metadata.type === 'group') {
              var parentID = rowRef.id;
              dataView.forEach(function(elementRef) {
                if (parentID === elementRef.parentId) {
                  if (rowRef[0] === element) {
                    if (elementRef.expanded === true) {
                      expect(false).customError(element + ' is still expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  }
                }
              });
            }
          });
        });
      });
    });

    it('Should right click on "Commercial Services" from calculated report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services', 'grid-canvas grid-canvas-bottom grid-canvas-left');
      Utilities.scrollElementToVisibility(reference);
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
      }, function(value) {
        if (!value) {
          expect(value).customError('Menu list did not appear after performing right click on "Commercial Services".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hovering on "Collapse" and verifying that "Level 1" option present in the menu list is enabled', function() {
      PA3MainPage.getOptionFromCustomMenu('Collapse|Level 1').isPresent().then(function(bool) {
        if (bool) {
          PA3MainPage.getOptionFromCustomMenu('Collapse|Level 1').getAttribute('data-disabled').then(function(flag) {
            if (flag !== null) {
              expect(false).customError('"Collapse|Level 1" option is not enabled');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Level 1" is not seen in the "Collapse" menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hovering on "Collapse" and verifying that "Level 2" option present in the menu list is disabled', function() {
      PA3MainPage.getOptionFromCustomMenu('Collapse|Level 2').isPresent().then(function(bool) {
        if (bool) {
          PA3MainPage.getOptionFromCustomMenu('Collapse|Level 2').getAttribute('data-disabled').then(function(flag) {
            if (flag === null) {
              expect(false).customError('"Collapse|Level 2" option is not disabled');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Level 2" is not seen in the "Collapse" menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 678980', function() {

    var arrOptions = ['Commercial Printing/Forms', 'Financial Publishing/Services', 'Miscellaneous Commercial Services', 'Personnel Services'];
    var childElementsArr = [];

    it('Should click on the "Wrench" icon in the "Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Exclusions" from LHP in "Tile Options" view', function() {
      TileOptions.getLHPOption('Exclusions').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Exclusions"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Exclusions') {
          expect(false).customError('"Exclusions" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    it('Should expand "Commercial Services" from available container', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getGroupByText('Commercial Services');
      group.expand();

      group.isExpanded().then(function(bool) {
        if (bool !== true) {
          expect(false).customError('"Commercial Services" is not expanded in the available container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Commercial Printing/Forms", "Financial Publishing/Services", "Miscellaneous Commercial Services",' + ' "Personnel Services" under "Commercial Services" holding control key', function() {
      var parentGroup = ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getGroupByText('Commercial Services');
      parentGroup.getChildrenText().then(function(ele) {
        ele.forEach(function(childName) {
          if (arrOptions.indexOf(childName.text) !== -1) {
            parentGroup.getGroupByText(childName.text).then(function(childGroup) {
              childGroup.select(true, false);

              childGroup.isSelected().then(function(selected) {
                if (!selected) {
                  expect(false).customError('"' + childName + '" did not selected from "Available" section');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          }
        });
      });
    });

    it('Should click "Right" arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "' + arrOptions + '" are present under "Economic Sector > Industry" tree of "Selected" container', function() {
      var count = 0;
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(eleNames) {
        arrOptions.forEach(function(element, index) {
          if (eleNames[index].text.indexOf('Commercial Services > ' + element) === -1) {
            expect(false).customError('"' + element + '" is not added to "Selected" section');
            count = 1;
          }
        });
      }).then(function() {
        if (count === 1) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on the OK button to close Tile Options Mode
    it('Should click on the "OK" Button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verifying if mode is closed.
    it('Should verify "Tile Options" mode is closed', function() {
      expect(TileOptions.isTileOptionsMode()).toBeFalsy();
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Weights" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });

      //Wait for Web element to Load
      browser.sleep(3000);
    });

    it('Verifying if "Commercial Services" is still expanded', function() {
      var groupFound = false;
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (eleRef[0] === 'Commercial Services' && eleRef.metadata.type === 'group') {
            groupFound = true;
            if (eleRef.expanded !== true) {
              SlickGridFunctions.scrollRowToTop('Weights', rowIndex - 1);
              CommonFunctions.takeScreenShot();
              expect(false).customError(eleRef[0] + ' grouping is not expanded which is at index(row) ' + rowIndex);
            }
          }
        });
      }).then(function() {
        if (groupFound === false) {
          expect(false).customError('No group found with "Commercial Services"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Fetching all groupings under "Commercial Services" grouping', function() {
      var groupFound = false;
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef[0] === 'Commercial Services' && rowRef.metadata.type === 'group') {
            groupFound = true;
            var parentID = rowRef.id;
            dataView.forEach(function(element) {
              if (parentID === element.parentId) {
                childElementsArr.push(element[0]);
              }
            });
          }
        });
      }).then(function() {
        if (groupFound === false) {
          expect(false).customError('No group found with "Commercial Services"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Commercial Services" grouping is displayed with "Advertising/Marketing Services" as only child', function() {
      if (childElementsArr.length === 1) {
        if (childElementsArr[0] !== 'Advertising/Marketing Services') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Commercial Services" grouping does not have "Advertising/Marketing Services" as child');
        }
      } else {
        CommonFunctions.takeScreenShot();
        expect(false).customError('"Commercial Services" grouping does not have only one child');
      }
    });
  });

  describe('Test Step ID: 678982', function() {

    it('Should right click on "Commercial Services" from calculated report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services', 'grid-canvas grid-canvas-bottom grid-canvas-left');
      Utilities.scrollElementToVisibility(reference);
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
      }, function(value) {
        if (!value) {
          expect(value).customError('Menu list did not appear after performing right click on "Commercial Services".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hovering on "Collapse" and verifying that "Level 1" option present in the menu list is enabled', function() {
      PA3MainPage.getOptionFromCustomMenu('Collapse|Level 1').isPresent().then(function(bool) {
        if (bool) {
          PA3MainPage.getOptionFromCustomMenu('Collapse|Level 1').getAttribute('data-disabled').then(function(flag) {
            if (flag !== null) {
              expect(false).customError('"Collapse|Level 1" option is not enabled');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Level 1" is not seen in the "Collapse" menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hovering on "Collapse" and verifying that "Level 2" option present in the menu list is disabled', function() {
      PA3MainPage.getOptionFromCustomMenu('Collapse|Level 2').isPresent().then(function(bool) {
        if (bool) {
          PA3MainPage.getOptionFromCustomMenu('Collapse|Level 2').getAttribute('data-disabled').then(function(flag) {
            if (flag === null) {
              expect(false).customError('"Collapse|Level 2" option is not disabled');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Level 2" is not seen in the "Collapse" menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 678984', function() {

    var checkOptions = ['Level 1', 'Level 2'];

    it('Should click on + next to "Advertising/Marketing Services" grouping under "Commercial Services" grouping', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Advertising/Marketing Services', 'Commercial Services');
    });

    it('Verifying if all "Advertising/Marketing Services" grouping under "Commercial Services" grouping', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Advertising/Marketing Services');
    });

    it('Should right click on "Advertising/Marketing Services" from calculated report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 2, 'Advertising/Marketing Services', 'grid-canvas grid-canvas-bottom grid-canvas-left');
      Utilities.scrollElementToVisibility(reference);
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
      }, function(value) {
        if (!value) {
          expect(value).customError('Menu list did not appear after performing right click on "Advertising/Marketing Services".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    checkOptions.forEach(function(optionName) {
      it('Hovering on "Collapse" and verifying if "' + optionName + '" option present in the "Collapse" menu list is enabled', function() {
        var temp = 'Collapse|' + optionName;
        PA3MainPage.getOptionFromCustomMenu(temp).isPresent().then(function(bool) {
          if (bool) {
            PA3MainPage.getOptionFromCustomMenu(temp).getAttribute('data-disabled').then(function(flag) {
              if (flag !== null) {
                expect(false).customError(optionName + ' option is not enabled');
                CommonFunctions.takeScreenShot();
              }
            });
          } else {
            expect(false).customError(optionName + ' is not seen in the "Collapse" menu');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 678985', function() {

    var childElementsArr = [];

    it('Should click on - next to "Advertising/Marketing Services" grouping under "Commercial Services" grouping', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Advertising/Marketing Services', 'Commercial Services');

      Utilities.waitUntilElementDisappears(element(by.xpath(SlickGridFunctions.xpathSlickGridLoadingSpinner)), 10000);
    });

    it('Should click on - next to "Commercial Services" grouping', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Commercial Services');

      Utilities.waitUntilElementDisappears(element(by.xpath(SlickGridFunctions.xpathSlickGridLoadingSpinner)), 10000);
    });

    it('Verifying if "Commercial Services" grouping is collapsed in the report', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (eleRef[0] === 'Commercial Services' && eleRef.metadata.type === 'group') {
            if (eleRef.expanded !== false) {
              SlickGridFunctions.scrollRowToTop('Weights', rowIndex - 1);
              CommonFunctions.takeScreenShot();
              expect(false).customError('"Commercial Services" grouping is not collapsed which is at index(row) ' + rowIndex);
            }
          }
        });
      });
    });

    it('Should click on the "Wrench" icon in the "Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Hidden" from LHP in "Tile Options" view', function() {
      TileOptions.getLHPOption('Hidden').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Hidden"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Hidden') {
          expect(false).customError('"Hidden" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Communications" and select "Major Telecommunications" from "Communications" in the "Available" container', function() {

      var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Available');

      var group = ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Communications');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Major Telecommunications').then(function(subGroup) {
            subGroup.select();

            // Check if 'Major Telecommunications' is selected
            subGroup.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Major Telecommunications" did not selected from "Available" section');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Communications" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Right" arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying that "Major Telecommunications" is added to the "Selected" container', function() {
      var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Selected');

      ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(columnName) {
        if (columnName[0].text !== 'Communications > Major Telecommunications') {
          expect(false).customError('"Communications > Major Telecommunications" is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on the OK button to close Tile Options Mode
    it('Should click on the "OK" Button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verifying if mode is closed.
    it('Should verify "Tile Options" mode is closed', function() {
      expect(TileOptions.isTileOptionsMode()).toBeFalsy();
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Weights" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for Web element to Load
      browser.sleep(3000);
    });

    it('Fetching all groupings under "Communications" grouping', function() {
      var groupFound = false;
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef, rowIndex) {
          if (rowRef[0] === 'Communications' && rowRef.metadata.type === 'group') {
            groupFound = true;
            var parentID = rowRef.id;
            SlickGridFunctions.scrollRowToTop('Weights', rowIndex - 1);
            dataView.forEach(function(element) {
              if (parentID === element.parentId) {
                childElementsArr.push(element[0]);
              }
            });
          }
        });
      }).then(function() {
        if (groupFound === false) {
          expect(false).customError('No group found with "Communications"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Communications" grouping is not displayed with "Major Telecommunications" as child', function() {
      if (childElementsArr.indexOf('Major Telecommunications') !== -1) {
        CommonFunctions.takeScreenShot();
        expect(false).customError('"Commercial Services" grouping is displayed with "Major Telecommunications" as child');
      }
    });
  });

  describe('Test Step ID: 678986', function() {

    it('Should perform right click on "Communications" from calculated report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Communications', 'grid-canvas grid-canvas-bottom grid-canvas-left');
      Utilities.scrollElementToVisibility(reference);
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
      }, function(value) {
        if (!value) {
          expect(value).customError('Menu list did not appear after performing right click on "Communications".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hovering on "Collapse" and verifying that "Level 1" option present in the menu list is enabled', function() {
      PA3MainPage.getOptionFromCustomMenu('Collapse|Level 1').isPresent().then(function(bool) {
        if (bool) {
          PA3MainPage.getOptionFromCustomMenu('Collapse|Level 1').getAttribute('data-disabled').then(function(flag) {
            if (flag !== null) {
              expect(false).customError('"Collapse|Level 1" option is not enabled');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Level 1" is not seen in the "Collapse" menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hovering on "Collapse" and verifying that "Level 2" option present in the menu list is disabled', function() {
      PA3MainPage.getOptionFromCustomMenu('Collapse|Level 2').isPresent().then(function(bool) {
        if (bool) {
          PA3MainPage.getOptionFromCustomMenu('Collapse|Level 2').getAttribute('data-disabled').then(function(flag) {
            if (flag === null) {
              expect(false).customError('"Collapse|Level 2" option is not disabled');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Level 2" is not seen in the "Collapse" menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
