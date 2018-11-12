'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: exclu-levels', function() {
  // Variable(s)
  var arrCalculatedReportElementsFromWebPage = [];
  var xpathAvailableVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');
  var xpathSelectedVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');
  var totalNumberOfRows = [];
  var arrSelectedRows = [];

  var scrollGridElementsToTop = function(index) {
    browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowIntoView( arguments[ 0 ] )', index).then(function() {
      browser.sleep(1000);
    });
  };

  var verifyCellIsSelected = function(rowName) {
    var arrNonSelected;
    SlickGridFunctions.getCellReference('Attribution', rowName, '', 'Port. Average Weight').then(function(cellRef) {
      cellRef.getAttribute('class').then(function(value) {
        if (value.indexOf('selected') < -1) {
          expect(false).customError(rowName + 'row which is in between "NEE" and "EOG" is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  describe('Test Step ID: 544901', function() {

    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should verify that "Portfolio" widget shows "CLIENT:/PA3/TEST.ACCT"', function() {
      expect(PA3MainPage.getWidgetBox('Portfolio').getAttribute('value')).toEqual('CLIENT:/PA3/TEST.ACCT');
    });

    it('Should verify that "Benchmark" widget shows "RUSSELL:1000"', function() {
      expect(PA3MainPage.getWidgetBox('Benchmark').getAttribute('value')).toEqual('RUSSELL:1000');
    });

  });

  describe('Test Step ID: 544908', function() {

    it('Collect all the grouping elements into an array', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1).each(function(ele, index) {
        ele.getText().then(function(text) {
          arrCalculatedReportElementsFromWebPage[index] = text;
        });
      });
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Exclusions');

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    var flag = 0;
    it('Elements of "Available" section should match to elements of calculated report from web page', function() {
      var arrEle = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getChildrenText().then(function(ele) {
        ele.forEach(function(element) {
          arrEle.push(element.text);
        });
      }).then(function() {
        arrCalculatedReportElementsFromWebPage.forEach(function(val) {
          if (arrEle.indexOf(val) < 0) {
            flag = flag + 1;
            expect(false).customError(val + ' is not found in the Available section');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });

      });
    });

    it('Verifying if "Finance" present under "Economic Sector > Industry" tree of "Selected" container', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(columnName) {
        if (columnName[0].text !== 'Finance') {
          expect(false).customError('"Finance" is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544909', function() {

    it('Hover over "Economic Sector > Industry" from "Selected" section and click remove icon to delete it', function() {
      var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Selected');
      ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Economic Sector > Industry').select();

      ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Economic Sector > Industry').getActions().then(function(actions) {
        actions.triggerAction('remove');
      });
    });

    it('Verifying if "Economic Sector > Industry" tree is deleted from "Selected" container', function() {
      var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Selected');

      ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function() {
      }, function(err) {

        if (err.message.indexOf('Cannot read property \'nodes\' of undefined') < 0) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying that "Finance" sector is displayed in the calculated report', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Finance').isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('"Finance" sector is not displayed in the calculated report.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Finance').isPresent())
            .toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544905', function() {

    it('Collect all the grouping elements into an array', function() {
      var elementRef = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1);
      elementRef.get(0).getText().then(function() {
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          elementRef = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1);
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      elementRef.each(function(ele, index) {
        ele.getText().then(function(text) {
          arrCalculatedReportElementsFromWebPage[index] = text;
        });
      });
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Exclusions');

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    var flag = 0;
    it('Elements of "Available" section should match to elements of calculated report from web page', function() {
      var arrEle = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getChildrenText().then(function(ele) {
        ele.forEach(function(element) {
          arrEle.push(element.text);
        });
      }).then(function() {
        arrCalculatedReportElementsFromWebPage.forEach(function(val) {
          if (arrEle.indexOf(val) < 0) {
            flag = flag + 1;
            expect(false).customError(val + ' is not found in the Available section');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });

      });
    });

    it('Verifying that "Selected" section is empty', function() {
      expect(TileOptionsExclusions.getElementsListFromSelectedSection().count()).toEqual(0);
    });

  });

  describe('Test Step ID: 544902', function() {

    it('Expand "Finance" and double click on "Savings Banks" to add it to "Selected" container from "Available" container', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getGroupByText('Finance');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Savings Banks').then(function(subGroup) {
            subGroup.select();

            // Check if 'Savings Banks' is selected
            subGroup.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Savings Banks" did not selected from "Available" section');
                CommonFunctions.takeScreenShot();
              }
            });

            subGroup.doubleClick();
          });
        } else {
          expect(false).customError('"Finance" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Finance > Savings Banks" present under "Economic Sector > Industry" tree of "Selected" container', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(columnName) {
        if (columnName[0].text !== 'Finance > Savings Banks') {
          expect(false).customError('"Finance > Savings Banks" is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Energy Minerals" from the "Available" container', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getGroupByText('Energy Minerals');
      group.select();

      // Check if 'Savings Banks' is selected
      group.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Energy Minerals" did not selected from "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should drag "Energy Minerals" from available section and drop it in "Selected" container', function() {
      var source = element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfAvailableSectionListItem, 'Energy Minerals')));
      var target = element(by.xpath(xpathSelectedVirtualListBox));

      ThiefHelpers.dragDrop(source, target, 'into');
    });

    it('Verifying if "Energy Minerals" is added to "Selected" container under "Economic Sector > Industry" tree', function() {
      var arrEle = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(ele) {
        ele.forEach(function(element) {
          arrEle.push(element.text);
        });
      }).then(function() {
        if (arrEle.indexOf('Energy Minerals') < 0) {
          expect(false).customError('"Energy Minerals" is not added to "Selected" container under "Economic Sector > Industry" tree');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Type "Bad groups" into the "Name" field', function() {
      TileOptionsExclusions.getNameField().sendKeys('Bad groups');

      // Verifying if "Bad groups" is entered into the "Name" field
      expect(TileOptionsExclusions.getNameField().getAttribute('value')).toEqual('Bad groups');
    });

  });

  describe('Test Step ID: 544904', function() {

    // Clicking on Hidden LHP item to select.
    it('Should click on Hidden LHP item to select', function() {
      TileOptions.getLHPOption('Hidden').click();

      // Checking if 'Hidden' item is opened.
      expect(TileOptions.getOptionTitle().getText()).toEqual('Hidden');
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsHidden.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    it('Expand "Finance" and double click on "Regional Banks" to add it to "Selected" container from "Available" container', function() {
      var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Available');

      var group = ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Finance');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Regional Banks').then(function(subGroup) {
            subGroup.select();
            subGroup.doubleClick();
          });
        } else {
          expect(false).customError('"Finance" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Finance > Regional Banks" falls under "Economic Sector > Industry" tree of "Selected" container', function() {
      var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Selected');

      ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(columnName) {
        if (columnName[0].text !== 'Finance > Regional Banks') {
          expect(false).customError('"Finance > Regional Banks" is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Consumer Services" from the "Available" container', function() {
      var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Available');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Consumer Services');
      group.select();

      // Check if 'Consumer Services' is selected
      group.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Consumer Services" group is not selected from "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "Right" arrow button to add "Consumer Services" to "Selected" container', function() {
      TileOptionsHidden.getArrowButton('Right').click();
    });

    it('Verifying if "Consumer Services" is added to "Selected" container under "Economic Sector > Industry" tree', function() {
      var arrEle = [];
      var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Selected');
      ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(ele) {
        ele.forEach(function(element) {
          arrEle.push(element.text);
        });
      }).then(function() {
        if (arrEle.indexOf('Consumer Services') < 0) {
          expect(false).customError('"Consumer Services" is not found in the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Type "Hidden groups" into the "Name" field', function() {
      TileOptionsHidden.getNameField().sendKeys('Hidden groups');

      // Verifying if "Hidden groups" is entered into the "Name" field
      expect(TileOptionsHidden.getNameField().getAttribute('value')).toEqual('Hidden groups');
    });

  });

  describe('Test Step ID: 544903', function() {

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying that "Energy Minerals" sector is not displayed in the calculated report', function() {
      expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Energy Minerals').isPresent()).toBeFalsy();
    });

    it('Verifying that "Consumer Services" sector is not displayed in the calculated report', function() {
      expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Consumer Services').isPresent())
        .toBeFalsy();
    });

    it('Expand "Finance" from the calculated report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Finance');

      // Verifying if "Finance" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Finance');
    });

    it('Verifying that "Savings Banks" is not displayed under "Finance"', function() {
      expect(PA3MainPage.getElementFromCalculatedTree('Weights', 'Finance', 'Savings Banks').isPresent()).toBeFalsy();
    });

    it('Verifying that "Regional Banks" is not displayed under "Finance"', function() {
      expect(PA3MainPage.getElementFromCalculatedTree('Weights', 'Finance', 'Regional Banks').isPresent()).toBeFalsy();
    });

    it('Verifying that "Total" value for "Port. Weight" column is "100.00"', function() {
      expect(PA3MainPage.getValueFromCalculatedReport('Weights', 'Total', 'Port. Weight',
        'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right')).toEqual('100.00');
    });

    it('Verifying that "Total" value for "Bench. Weight" column is "100.00"', function() {
      expect(PA3MainPage.getValueFromCalculatedReport('Weights', 'Total', 'Bench. Weight',
        'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right')).toEqual('100.00');
    });

  });

  describe('Test Step ID: 544906', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Exclusions');

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    it('Select "Energy Minerals" from "Selected" container present under "Economic Sector > Industry" tree', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector > Industry');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Energy Minerals').then(function(subGroup) {
            subGroup.select();

            // Check if 'Energy Minerals' is selected
            subGroup.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Energy Minerals" is not selected from "Available" section');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Finance" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "Left" arrow button to remove "Energy Minerals" from "Selected" container', function() {
      TileOptionsExclusions.getArrowButton('left').click();
    });

    it('Verifying if "Energy Minerals" is removed from "Selected" container', function() {
      var arrEle = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(ele) {
        ele.forEach(function(element) {
          arrEle.push(element.text);
        });
      }).then(function() {
        if (arrEle.indexOf('Energy Minerals') >= 0) {
          expect(false).customError('"Energy Minerals" is added to "Selected" container under "Economic Sector > Industry" tree.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Name" field still shows "Bad groups"', function() {
      expect(TileOptionsExclusions.getNameField().getAttribute('value')).toEqual('Bad groups');
    });

  });

  describe('Test Step ID: 544907', function() {

    // Clicking on Hidden LHP item to select.
    it('Should click on Hidden LHP item to select', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').select();

      // Verifying if "Hidden" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Hidden" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsHidden.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    it('Select "Consumer Services" from "Selected" container present under "Economic Sector > Industry" tree', function() {
      var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Selected');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Economic Sector > Industry');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Consumer Services').then(function(subGroup) {
            subGroup.select();

            // Check if 'Consumer Services" is selected
            subGroup.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Consumer Services" is not selected from "Available" section');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Finance" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "Left" arrow button to remove "Consumer Services" from "Selected" container', function() {
      TileOptionsHidden.getArrowButton('left').click();
    });

    it('Verifying if "Consumer Services" is removed from "Selected" container', function() {
      var arrEle = [];
      var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Selected');
      ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(ele) {
        ele.forEach(function(element) {
          arrEle.push(element.text);
        });
      }).then(function() {
        if (arrEle.indexOf('Consumer Services') >= 0) {
          expect(false).customError('"Energy Minerals" is added to "Selected" container under "Economic Sector > Industry" tree.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying that "Energy Minerals" sector is displayed in the calculated report', function() {
      expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Energy Minerals').isPresent())
        .toBeTruthy();
    });

    it('Verifying that "Consumer Services" sector is displayed in the calculated report', function() {
      expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Consumer Services').isPresent())
        .toBeTruthy();
    });

  });

  describe('Test Step ID: 776747', function() {

    it('Should launch the PA3 application with "Client:;Pa3;Exclusions;Exclusions_Custom_Fractile" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('exclusions-custom-fractile');
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    it('Verifying if Header of the report shows "S&P 500 vs S&P 500"', function() {
      PA3MainPage.getHeader().getText().then(function(val) {
        if (val !== 'S&P 500 vs S&P 500') {
          expect(false).customError('Header of the report do not shows "S&P 500 vs S&P 500"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 776748', function() {

    it('Should expand "[N/A]" from the calculated report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Attribution', '[N/A]');

      // Verifying if "[N/A]" tree is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Attribution', '[N/A]');
    });

    it('Should perform double click on "Port. Average Weight" column', function() {
      SlickGridFunctions.getHeaderCellReference('Attribution', 'Port. Average Weight').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying if "Down" arrow button display next to "Port. Average Weight"', function() {
      PA3MainPage.verifyArroButtonDirectionInColumnHeader('Attribution', 'Down').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Down" button did not display next to "Port. Average Weight" column');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      browser.executeScript(function() {
        return $('.tf-slick-grid').data('$tfSlickGridController').grid.getDataLength();
      }).then(function(count) {
        for (var i = 0; i < count - 1; i++) {
          if (i % 20 === 0) {
            scrollGridElementsToTop(i);
          }
        }
      });
    });

    var columnValues1 = [];
    var columnValueAfterSorting = [];
    it('Should copy column value and removing duplicate element', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution', 'Port. Average Weight').then(function(arrCellValues) {
        arrCellValues.forEach(function(cellValue) {
          columnValues1.push(parseFloat(cellValue).toFixed(2));
          columnValueAfterSorting = columnValues1.filter(function(item, index, inputArray) {
            return inputArray.indexOf(item) === index;
          });
        });
      });
    });

    it('Verifying if "Port. Average Weight" column data is sorted in descending order', function() {
      var columnValuesAfterReverse = columnValueAfterSorting.reverse();
      for (var i = 0; i < columnValueAfterSorting.length - 1; i++) {
        if (columnValueAfterSorting[i] !== columnValuesAfterReverse[i]) {
          expect(false).customError('"Port. Average Weight" column is not in descending order" ' +
            'Found : ' + columnValueAfterSorting[i] + ' at row index ' + i);
          CommonFunctions.takeScreenShot();
        }
      }
    });

    it('Should select "EOG" ticker of "Port. Average Weight" column which is 0.25', function() {
      SlickGridFunctions.getCellReference('Attribution', 'EOG', 'Ticker', 'Port. Average Weight').then((cellRef) => {
        cellRef.getText().then(function(value) {
          if (value !== '0.25') {
            expect(false).customError('"EOG" ticker of "Port. Average Weight" column is not 0.25. Found ' + value);
            CommonFunctions.takeScreenShot();
          } else {
            cellRef.click().then(function() {
            }, function(error) {

              expect(false).customError(error);
              CommonFunctions.takeScreenshot();
            });
          }
        });
      });
    });

    it('Should press "Shift" key,', function() {
      browser.actions().keyDown(protractor.Key.SHIFT).perform();
    });

    it('Should select "NEE" ticker of "Port. Average Weight" column which is 0.30', function() {
      SlickGridFunctions.getCellReference('Attribution', 'NEE', 'Ticker', 'Port. Average Weight').then((cellRef) => {
        cellRef.getText().then(function(value) {
          if (value !== '0.30') {
            expect(false).customError('"NEE" ticker of "Port. Average Weight" column is not 0.30. Found ' + value);
            CommonFunctions.takeScreenShot();
          } else {
            cellRef.click().then(function() {
            }, function(error) {

              expect(false).customError(error);
              CommonFunctions.takeScreenshot();
            });
          }
        });
      });

      browser.sleep(3000);
    });

    it('Should release "Shift" key,', function() {
      browser.actions().keyUp(protractor.Key.SHIFT).perform();
    });

    it('Should store all ticker names for future reference', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution', '', '').then(function(arrCellValues) {
        arrCellValues.forEach(function(cellValue) {
          totalNumberOfRows.push(cellValue);
        });
      });
    });

    var i;
    it('Verifying all elements between "NEE" and "EOG" are selected', function() {
      SlickGridFunctions.getRowIndex('Attribution', 'NEE', 'Ticker').then(function(rowIndex1) {
        SlickGridFunctions.getRowIndex('Attribution', 'EOG', 'Ticker').then(function(rowIndex2) {
          for (i = rowIndex1; i <= rowIndex2; i++) {
            arrSelectedRows.push(totalNumberOfRows[i]);
            verifyCellIsSelected(totalNumberOfRows[i]);
          }
        });
      });
    });

  });

  describe('Test Step ID: 776749', function() {

    it('Should right click on any selected ticker (NEE), hower on "Exclusions" and select "Exclude Selected Rows"', function() {
      SlickGridFunctions.getCellReference('Attribution', 'NEE', 'Ticker', '').then(function(cellRef) {
        PA3MainPage.rightClickAndSelectOption(cellRef, 'Exclusions|Exclude Selected Rows');

        // Wait for the report calculation load icon to display.
        browser.sleep(3000);
      });
    });

    it('Should click on "Excluded: Finance" hyperlink in report to display Exclusions Info Box.', function() {
      PA3MainPage.getExclusionsHyperLink('Attribution').getText().then(function(value) {
        expect(value).toEqual('Excluded: Multiple Securities');
        if (value === 'Excluded: Multiple Securities') {
          PA3MainPage.getExclusionsHyperLink('Attribution').click();
        }
      });

      browser.sleep(2000);

      // Verifying if Info Box is displayed.
      expect(PA3MainPage.getAllItemsFromExcludedInfoBox('Attribution').count()).toBeGreaterThan(0);
    });

    var arrInfoBox = [];
    it('Verifying if info box contains excluded tickers', function() {
      ThiefHelpers.getListboxClassReference(PA3MainPage.xpathExclusionsListBox).getChildrenText().then(function(childArr) {
        if (childArr.length === 0) {
          expect(false).customError('Zero elements are present in the info box pop up');
          CommonFunctions.takeScreenShot();
        } else {
          childArr.forEach(function(child) {
            arrInfoBox.push(child.text.split('>')[1].trim());
          });
        }
      }).then(function() {
        for (var i = 0; i < arrSelectedRows.length; i++) {
          if (arrInfoBox.indexOf(arrSelectedRows[i]) === -1) {
            expect(false).customError(arrSelectedRows[i] + ' is not present in the infobox.');
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

  });

  describe('Test Step ID: 776750', function() {

    it('Should click on refresh icon on app toolbar', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      browser.executeScript(function() {
        return $('.tf-slick-grid').data('$tfSlickGridController').grid.getDataLength();
      }).then(function(count) {
        for (var i = 0; i < count - 1; i++) {
          if (i % 20 === 0) {
            scrollGridElementsToTop(i);
          }
        }
      });
    });

    it('Verifying if excluded rows are not seen in the report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution', '').then(function(arrCellValues) {
        if (arrCellValues.length === 0) {
          expect(false).customError('Attribution report is empty');
          CommonFunctions.takeScreenShot();
        } else {
          for (var i = 0; i < arrSelectedRows.length; i++) {
            if (arrCellValues.indexOf(arrSelectedRows[i]) > -1) {
              expect(false).customError(arrSelectedRows[i] + ' row is present in report which is excluded at row index ' + i);
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });

  });

});
