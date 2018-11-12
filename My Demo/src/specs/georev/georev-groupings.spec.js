require(`${__dirname}/../../index.js`);
describe(`Test Case: georev-groupings`, () => {

  // Getting the xpath of the Selected section of groupings tab
  let xpathOfSelectedSectionOfGroupings = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathOfAvailableOrSelectedContainer, 'Selected');

  describe(`Test Step ID: 463842`, () => {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it(`Should open "Client:/Pa3/Georev/GeoRev_Groupings" document`, () => {
      PA3MainPage.launchHtmlDialogAndOpenDocument(`georev-groupings`);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    let arrOfGroups = [`Africa & Middle East`, `Afghanistan`, `Consumer Non-Durables`, `Food: Major Diversified`];
    arrOfGroups.forEach((val, index) => {

      //verify the factors are in collapsed state in the group
      CommonPageObjectsForPA3.verifyExpandedOrCollapsedStateOfGroupInReport(`Weights`, val, `is expanded`, undefined);
    });

    it(`Expand "Africa & Middle East > Afghanistan > Consumer Non-Durables >Household/Personal Care" group in the caluclated report`, () => {
      PA3MainPage.expandTreeInCalculatedReport(`Weights`, `Africa & Middle East|Afghanistan|Consumer Non-Durables|Household/Personal Care`,
        `Africa & Middle East|Afghanistan|Consumer Non-Durables`, `grid-canvas grid-canvas-bottom grid-canvas-left`);
    });

    CommonPageObjectsForPA3.verifyExpandedOrCollapsedStateOfGroupInReport(`Weights`, `Household/Personal Care`, `is expanded`, undefined);

    let indexOfColumnsTOHaveValues = [];
    it(`Getting all index of columns under "Food: Major Diversified" and "Household/Personal Care"`, () => {
      SlickGridFunctions.getAllCellValuesFromSingleColumn(`Weights`, ``, ``).then((rowData) => {
        rowData.forEach((columnName, index) => {
          if ((columnName === 'Nestle S.A.') || (columnName === 'Procter & Gamble Company')) {
            indexOfColumnsTOHaveValues.push(index);
          }
        });

      });
    });

    let arrOfColumnNames1 = [];
    let arrOfColumnNames2 = [];
    it(`Getting the all the column names in the report`, () => {
      SlickGridFunctions.getColumnNames(`Weights`).then(arr => {
        arr.forEach((colName, index) => {
          if (index !== 0) {
            if ((colName === `GeoRev Portfolio Exposure`) || (colName === `GeoRev Benchmark Exposure`) || (colName === `GeoRev Active Exposure`)) {
              arrOfColumnNames2.push(colName);
            } else {
              arrOfColumnNames1.push(colName);
            }
          }

        });
      });
    });

    it(`Verifying if values are displayed in all the columns under "Food: Major Diversified" and "Household/Personal Care"`, () => {
      arrOfColumnNames1.forEach((colName) => {
        SlickGridFunctions.getAllCellValuesFromSingleColumn(`Weights`, colName, ``).then((rowData) => {
          rowData.forEach((columnValue, index) => {
            if (!indexOfColumnsTOHaveValues.includes(index)) {
              if (columnValue !== '') {
                expect(false).customError(`Expected: "" but Found \`"${columnValue}" at \`"${index}".`);
                CommonFunctions.takeScreenShot();
              }
            } else {
              if (columnValue === '') {
                expect(false).customError(`Expected: value but Found \`"${columnValue}" at \`"${index}".`);
                CommonFunctions.takeScreenShot();
              }
            }
          });

        });
      });

    });

    it(`Verifying if values are displayed in "GeoRev Portfolio Exposure", "GeoRev Benchmark Exposure" and "GeoRev Active Exposure" for the rest`, () => {
      arrOfColumnNames2.forEach((colName) => {
        SlickGridFunctions.getAllCellValuesFromSingleColumn(`Weights`, colName, ``).then((rowData) => {
          rowData.forEach((columnValue, index) => {
            if (columnValue === '') {
              expect(false).customError(`Expected: value but Found \`"${columnValue}" at \`"${index}".`);
              CommonFunctions.takeScreenShot();
            }
          });

        });
      });

    });

  });

  describe(`Test Step ID: 463843`, () => {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab(`Weights`, `Groupings`);

    it(`Select "Economic Sector - FactSet" in selected section`, () => {
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, `Economic Sector - FactSet`).select();

      // Verifying if the item is selected
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, `Economic Sector - FactSet`).isSelected().then(selected => {
        if (!selected) {
          expect(false).customError(`"Economic Sector - FactSet" is not selected from the Selected section.`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    let valIndex;

    it(`Click on the UP arrow till "Economic Sector - FactSet" is displayed in the top in selected section`, () => {
      let needScreenShot = 0;
      let group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer);
      let arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(childArr => {
        for (let i = 0; i < childArr.length; ++i) {
          if (childArr[i].text === 'Economic Sector - FactSet') {
            for (let j = i; j > 0; j--) {
              ThiefHelpers.getTransferBoxReference().target.up();
            }
          }
        }

      });

    });

    it(`Select "Industry - FactSet" in selected section`, () => {
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, `Industry - FactSet`).select();

      // Verifying if the item is selected
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, `Industry - FactSet`).isSelected().then(selected => {
        if (!selected) {
          expect(false).customError(`"Industry - FactSet" is not selected from the Selected section.`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it(`Should click on the up arrow`, () => {
      ThiefHelpers.getTransferBoxReference().target.up();
    });

    let arrOfColumnInSelectedsection = [`Economic Sector - FactSet`, `GeoRev Region - FactSet`, `Industry - FactSet`, `GeoRev Country - FactSet`];

    it(`Verifying if column names are displayed in the given order in selected section`, () => {
      TileOptionsGroupings.getAllElements('Selected').then(arrRef => {
        arrRef.forEach((ref, index) => {
          ref.getText().then(element => {
            if (element !== arrOfColumnInSelectedsection[index]) {
              expect(false).customError(`Expected: \`"${element}" but Found \`"${arrOfColumnInSelectedsection[index]}".`);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });
  });

  describe(`Test Step ID: 463844`, () => {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader(`OK`, `Tile Options - Weights`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it(`Expand "Consumer Durables > Africa & Middle East > Motor Vehicles > Egypt" group in the caluclated report`, () => {
      PA3MainPage.expandTreeInCalculatedReport(`Weights`, `Consumer Durables|Africa & Middle East|Motor Vehicles|Egypt`, undefined,
        `grid-canvas grid-canvas-bottom grid-canvas-left`);
    });

    it(`Verifying if only "General morters" is displayed under "Consumer Durables > Africa & Middle East > Motor Vehicles > Egypt"`, () => {
      let allRef = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport(`Weights`, 5);
      allRef.count().then(function(value) {
        if (value === 1) {
          allRef.each(ref => {
            Utilities.scrollElementToVisibility(ref);
            ref.getText().then(text => {
              if (text !== `General Motors Company`) {
                expect(false).customError(`Expected "General Motors Company" but found \`"${text}". `);
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError(`Expected: "1" but Found \`"${value}".`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it(`Verifying if values are dislayed in all the columns for "General Motors Company"`, () => {
      SlickGridFunctions.getRowData(`Weights`, `General Motors Company`, ``).then((rowData) => {
        rowData.forEach((data, index) => {
          if (index !== 0) {
            if (data === '') {
              expect(false).customError(`Expected "values" but Found \`"${data}".`);
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe(`Test Step ID: 463845`, () => {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab(`Weights`, `Groupings`);

    let arrOfColumnToDeleteInSelectedsection = [`GeoRev Region - FactSet`, `GeoRev Country - FactSet`];

    arrOfColumnToDeleteInSelectedsection.forEach(colName => {
      it(`Click on the remove icon next to \`"${colName}"`, () => {
        ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, colName).getActions().then(item => {
          item.triggerAction('remove');
        });
      });
    });

    let arrOfColumnInSelectedsection = [`Economic Sector - FactSet`, `Industry - FactSet`];
    it(`Verify if only "Economic Sector - FactSet" and "Industry - FactSet" is displayed in selected section`, () => {
      let needScreenShot = 0;
      let group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer);
      let arrOfChildren;
      let arrOfItems = [];
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(childArr => {
        if (childArr.length === 2) {
          for (let i = 0; i < childArr.length; ++i) {
            if (childArr[i].text !== arrOfColumnInSelectedsection[i]) {
              expect(false).customError(`Expected \`"${arrOfColumnInSelectedsection[i]}" but Found: \`"${childArr[i].text}".`);
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });

    });
  });

  describe(`Test Step ID: 463846`, () => {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader(`OK`, `Tile Options - Weights`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it(`Expand "Consumer Durables > Motor Vehicles" group in the caluclated report`, () => {
      PA3MainPage.expandTreeInCalculatedReport(`Weights`, `Consumer Durables|Motor Vehicles`, `Consumer Durables`,
        `grid-canvas grid-canvas-bottom grid-canvas-left`);
    });

    let arrOfExpectedSecurities = [`General Motors Company`, `Honda Motor Co., Ltd.`];
    it(`Verifying if only "General Motors Company" and "Honda Motor Co., Ltd." is displayed expanded group`, () => {
      let allRef = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport(`Weights`, 3);
      allRef.count().then(function(value) {
        if (value === 2) {
          allRef.each((ref, index) => {
            Utilities.scrollElementToVisibility(ref);
            ref.getText().then(text => {
              if (text !== arrOfExpectedSecurities[index]) {
                expect(false).customError(`Expected \`"${arrOfExpectedSecurities[index]}" but found \`"${text}". `);
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError(`Expected: "2" but Found \`"${value}".`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    let columnsWithDiffNA = ['GeoRev Confidence', 'GeoRev Date'];

    arrOfExpectedSecurities.forEach(securityName => {
      it(`Verifying if values are displayed in all the columns for \`"${securityName}"`, () => {
        SlickGridFunctions.getColumnNames('Weights').then(function(column) {
          SlickGridFunctions.getRowData('Weights', securityName, '').then((rowData) => {
            rowData.forEach((val, index) => {
              if (index !== 0) {
                if (columnsWithDiffNA.indexOf(column[index]) === -1) {
                  if (val !== `NA`) {
                    expect(false).customError(`Expected: "NA" but Found: \`"${val}".`);
                    CommonFunctions.takeScreenShot();
                  }
                }else {
                  if (val !== `@NA`) {
                    expect(false).customError(`Expected: "@NA" but Found: \`"${val}".`);
                    CommonFunctions.takeScreenShot();
                  }
                }
              }
            });
          });
        });
      });
    });

  });

  describe(`Test Step ID: 463848`, () => {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab(`Weights`, `Groupings`);

    it(`Should type "GeoRev" into the "Search" field of "Available" section`, () => {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).setText(`GeoRev`);

      // Verifying that "GeoRev" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).getText().then(text => {
        if (text !== `GeoRev`) {
          expect(false).customError(`Expected "GeoRev" but Found \`"${text}".`);
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for search to happen
      browser.sleep(4000);
    });

    let arrOfColumnsToDoubleClick = [`GeoRev Region`, `GeoRev Country`];

    arrOfColumnsToDoubleClick.forEach(itemName => {
      it(`Double click on "Price to Book" from "FactSet|Country & Region|FactSet" directory`, () => {
        TileOptionsGroupings.getElementFromAvailableSection(`FactSet|Country & Region|FactSet`, itemName).isPresent().then(present => {
          if (present) {
            browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection(`FactSet|Country & Region|FactSet`, itemName)).perform();
          } else {
            expect(false).customError(`\`${itemName} is not present under "FactSet|Country & Region|FactSet" directory`);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    let arrOfColumnInSelectedsection = [`Economic Sector - FactSet`, `GeoRev Region - FactSet`, `Industry - FactSet`, `GeoRev Country - FactSet`];

    it(`Verify if given columns are present in selected section`, () => {
      let needScreenShot = 0;
      let group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer);
      let arrOfChildren;
      let arrOfItems = [];
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(childArr => {
        if (childArr.length === 4) {
          for (let i = 0; i < childArr.length; ++i) {
            if (!arrOfColumnInSelectedsection.includes(childArr[i].text)) {
              expect(false).customError(`\`"${childArr[i].text}" is not present in the given column array.`);
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });

    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader(`OK`, `Tile Options - Weights`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);
  });

  describe(`Test Step ID: 463849`, () => {

    let arrOfElementPaths = [`Consumer Durables`, `Consumer Durables|Motor Vehicles`, `Consumer Durables|Motor Vehicles|Africa & Middle East`,
      `Consumer Durables|Motor Vehicles|Africa & Middle East|Egypt`,];

    arrOfElementPaths.forEach((elementPath, index) => {
      it(`Expaned \`"${elementPath}" if it is not expanded`, () => {
        PA3MainPage.isTreeExpanded(`Weights`, elementPath).then(function() {
        }, function(expanded) {
          if (!expanded) {
            if (index === 0) {
              PA3MainPage.expandTreeInCalculatedReport(`Weights`, elementPath, undefined);
            } else {
              PA3MainPage.expandTreeInCalculatedReport(`Weights`, elementPath, elementPath[index - 1]);
            }
          }
        });
      });
    });

    it('Getting the required column values from the report with respect to other columns', () => {
      let parentID;
      SlickGridFunctions.getAllRowsFromReport('Weights').then(dataView => {
        dataView.forEach((rowRef, index) => {
          if (rowRef[0] === 'Egypt' && rowRef.metadata.type === 'group') {
            SlickGridFunctions.scrollRowToTop('Weights', index);
            parentID = rowRef.id;
            if (rowRef.expanded) {
              dataView.forEach(element => {
                if (parentID === element.parentId && element.metadata.type !== 'group') {
                  if (element[0] !== `General Motors Company`) {
                    expect(false).customError(`Expected: "General Motors Company" but Found: \`"${element[0]}"`);
                    CommonFunctions.takeScreenShot();
                  }
                }
              });
            } else {
              expect(false).customError('"Egypt" grouping is not expanded by default');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it(`Verifying if values are dislayed in all the columns for "General Motors Company"`, () => {
      SlickGridFunctions.getRowData(`Weights`, `General Motors Company`, ``).then((rowData) => {
        rowData.forEach((data, index) => {
          if (index !== 0) {
            if (data === '') {
              expect(false).customError(`Expected "values" but Found \`"${data}".`);
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe(`Test Step ID: 463851`, () => {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab(`Weights`, `Groupings`);

    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown(`New/Reference`, `Groupings`);

    it(`Verifying if the "Reference" radio button is selected`, () => {
      ThiefHelpers.getRadioClassReference(`Reference`).select();

      ThiefHelpers.getRadioClassReference(`Reference`).isSelected().then(selected => {
        if (!selected) {
          expect(false).customError(`"Reference" radio button did not get selected`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    let xpathOfFormulaTextArea = element(by.xpath(CreateEditCustomGroupings.xpathOfFormulaTextArea));

    it(`Double click on "Col 3: Port. Ending Weight" from the "Formula" tab`, () => {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText(`Col 4: GeoRev  Active  Exposure`).doubleClick();
    });

    // Verify if text is present in the formula section after selection option from type-ahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror(`Formula`, undefined, `COL4`, true);

    it(`Should check "Allow Fractiling" checkbox`, () => {
      ThiefHelpers.setCheckBox(`Allow Fractiling`, undefined, true);
    });

    it(`Type "Ref help" into the "Name" field`, function() {
      ThiefHelpers.getTextBoxClassReference(`Name`).setText(`Active Ref`);

      // Verifying that "Active Ref" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference(`Name`).getText().then(function(text) {
        if (text !== `Active Ref`) {
          expect(false).customError(`"Active Ref" is not present in the "Name" field`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Save" button of "Groupings" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify(`Save`, `Groupings`);

    it(`Verifying if "Active Ref" item is added to selected section`, () => {
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, `Active Ref`).getText().then(name => {
        if (name !== `Active Ref`) {
          expect(false).customError(`"Active Ref" is not present in the selected section. Found: "${name}".`);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe(`Test Step ID: 463852`, () => {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader(`OK`, `Tile Options - Weights`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it(`Getting the required column values from the report with respect to other columns`, () => {
      let parentID;
      SlickGridFunctions.getAllRowsFromReport(`Weights`).then(dataView => {
        dataView.forEach((rowRef, index) => {
          if (rowRef[0] === `Egypt` && rowRef.metadata.type === `group`) {
            SlickGridFunctions.scrollRowToTop(`Weights`, index);
            parentID = rowRef.id;
            if (rowRef.expanded) {
              dataView.forEach(element => {
                let count = 0;
                if (parentID === element.parentId && element.metadata.type === `group`) {
                  count++;
                  if (count > 1) {
                    expect(false).customError(`More then one group is found`);
                    CommonFunctions.takeScreenShot();
                  } else {
                    if (element[0] !== `Active Ref Decile  1: 0.0 - 0.0`) {
                      expect(false).customError(`Expected: "Active Ref Decile  1: 0.0 - 0.0" but Found: \`"${element[0]}"`);
                      CommonFunctions.takeScreenShot();
                    }
                  }
                }
              });
            } else {
              expect(false).customError(`"Egypt" grouping is present in the report but it is not expanded by default`);
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it(`Scrolling report to the top`, () => {
      SlickGridFunctions.scrollRowToTop(`Weights`, 0);
    });
  });

  describe(`Test Step ID: 463856`, () => {

    // Click on the folder icon and select "Save As..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`Save As…`);

    // Select personal directory and enter the document name
    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog(`Georev Grouping`, undefined, true);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    // Click on the Folder icon and click and select "New" from drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`New`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it(`Verifying if PA_DOCUMENT:DEFAULT is displayed`, () => {
      browser.getTitle().then(function(title) {
        if (title !== `Portfolio Analysis 3.0 - Weights | Exposures [PA_DOCUMENTS:DEFAULT]`) {
          expect(false).customError(`Title of browser did not match. ` +
            `Expected: "Portfolio Analysis 3.0 - Weights | Exposures [PA_DOCUMENTS:DEFAULT]" but Found: "' + title + '".`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe(`Test Step ID: 463857`, () => {

    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`Open...`);

    // Select the reuqired document from personal directory
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal(`Georev Grouping`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    let arrOfGroups = [`Consumer Durables`, `Motor Vehicles`, `Africa & Middle East`, `Egypt`, `Active Ref Decile 1: 0.0 - 0.0`];
    arrOfGroups.forEach((groupName, index) => {

      //verify the factors are in collapsed state in the group
      CommonPageObjectsForPA3.verifyExpandedOrCollapsedStateOfGroupInReport(`Weights`, groupName, `is expanded`, undefined);
    });
  });

  describe(`Test Step ID: 463859`, () => {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab(`Weights`, `Groupings`);

    it(`Click on the remove icon next to "Economic Sector - FactSet"`, () => {
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, `Economic Sector - FactSet`).getActions().then(item => {
        item.triggerAction('remove');
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader(`OK`, `Tile Options - Weights`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it(`Load the report elements`, () => {
      SlickGridFunctions.scrollGridElements();
    });

    it(`Getting all index of columns under "Food: Major Diversified" and "Household/Personal Care"`, () => {
      SlickGridFunctions.getAllCellValuesFromSingleColumn(`Weights`, ``, ``).then((rowData) => {
        rowData.forEach((columnName, index) => {
          if ((columnName === `Motor Vehicles`)) {
            SlickGridFunctions.scrollRowToTop(`Weights`, index);
          }
        });

      });
    });

    it(`Verify if "Motor Vehicles > Africa & Middle East > Egypt" is expanded in the calculated report`, () => {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport(`Weights`, `Motor Vehicles|Africa & Middle East|Egypt`);
    });

    it(`Getting the required column values from the report with respect to other columns`, () => {
      let parentID1;
      let parentID2;
      let parentID3;
      SlickGridFunctions.getAllRowsFromReport(`Weights`).then(dataView => {
        dataView.forEach((rowRef, index) => {
          if (rowRef[0] === `Motor Vehicles` && rowRef.metadata.type === `group`) {
            SlickGridFunctions.scrollRowToTop('Weights', index);
            parentID1 = rowRef.id;
            if (rowRef.expanded) {
              dataView.forEach(element => {
                if (parentID1 === element.parentId) {
                  if (element[0] === `Africa &amp; Middle East` && element.metadata.type === `group`) {
                    parentID2 = element.id;
                    if (element.expanded) {
                      dataView.forEach(element2 => {
                        if (parentID2 === element2.parentId) {
                          if (element2[0] === `Egypt` && element2.metadata.type === `group`) {
                            parentID3 = element2.id;
                            if (element2.expanded) {
                              dataView.forEach(element3 => {
                                if (parentID3 === element3.parentId) {
                                  if (element3[0] !== `Active Ref Decile  1: 0.0 - 0.0`) {
                                    expect(false).customError(`Expected: "Active Ref Decile  1: 0.0 - 0.0" but Found: \`"${element3[0]}"`);
                                    CommonFunctions.takeScreenShot();
                                  }
                                }
                              });
                            }
                          }
                        }
                      });
                    }

                  }
                }
              });
            } else {
              expect(false).customError('"Egypt" grouping is not expanded by default');
              CommonFunctions.takeScreenShot();
            }

          }
        });
      });
    });
  });

  describe(`Test Step ID: 492145`, () => {

    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`Save`);

    CommonPageObjectsForPA3.saveChanges();

    it(`Should open new tab with "PA_DOCUMENTS:DEFAULT" document`, () => {
      let url = `https://pa.apps.factset.com/#/doc/PA_DOCUMENTS:DEFAULT/report/report0`;
      return browser.executeScript(`return window.open(arguments[0], \`_blank\`)`, url);
    });

    it(`Verifying if "Portfolio window" is displayed`, () => {
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
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal(`Georev Grouping`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink(`Weights`, `Industry`);

    let arrOfColumnInSelectedsection = [`Industry - FactSet`, `GeoRev Region - FactSet`, `GeoRev Country - FactSet`, `Active Ref`];
    it(`Verify if given columns are present in selected section`, () => {
      let needScreenShot = 0;
      let group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer);
      let arrOfChildren;
      let arrOfItems = [];
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(childArr => {
        if (childArr.length === 4) {
          for (let i = 0; i < childArr.length; ++i) {
            if (childArr[i].text !== arrOfColumnInSelectedsection[i]) {
              expect(false).customError(`Expected \`"${arrOfColumnInSelectedsection[i]}" but Found\`"${childArr[i].text}".`);
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });

    });
  });
});
