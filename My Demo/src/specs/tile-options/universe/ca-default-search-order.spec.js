require(`${__dirname}/../../../index.js`);
describe(`Test Case: ca-default-search-order`, () => {

  let arrOfItemsInCategory = [];
  let arrOfItemsInOrdering = [];
  let arrayOfArras = [arrOfItemsInCategory, arrOfItemsInOrdering];
  let arrayOfXpaths = [AssetOrdering.xpathOfCategoriesContainer, AssetOrdering.xpathOfOrderingContainer];
  let arrOfItemsInOrderingSectionAfterUncheck = [`FactSet:/Mutual_Funds/`, `FactSet:/ETF_INDEX/`, `Personal:`, `Super_client:`,
    `Client:/New_pa_test_suite/Universe/`, `FactSet:/ETF/`,];

  describe(`Test Step ID: 445152`, () => {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it(`Should open "Client:;Pa3;Universe;CA_Order_1" document`, () => {
      PA3MainPage.launchHtmlDialogAndOpenDocument(`ca-order-1`);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Sector Weights`);
  });

  describe(`Test Step ID: 445156`, () => {

    CommonPageObjectsForPA3.clickUniverseAndClickOnSearchOrderButtonAfterClickingOnOptionInWrench(`Sector Weights`);

    arrayOfXpaths.forEach((xpath, index) => {
      it('Storing the items present in the Assert ordering for future use', () => {
        let children = ThiefHelpers.getVirtualListboxClassReference(xpath).getChildrenText();
        children.then(childArr => {
          for (let i = 0; i < childArr.length; ++i) {
            arrayOfArras[index].push(childArr[i].text);
          }
        });
      });
    });
  });

  describe(`Test Step ID: 445157`, () => {

    it(`Should de-select "Use Default Ordering"`, () => {
      ThiefHelpers.setCheckBox(`Use Default Ordering`, undefined, false);
    });

    let arrOfOrderingSectionsButtons = [`up`, `down`, `remove`];
    let arrOfTransferButtons = [`right`, `left`];

    arrOfOrderingSectionsButtons.forEach(buttonName => {

      it(`Verifying if \`"${buttonName}" is displayed next to ordering section`, () => {
        element(by.xpath(CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfButtonNextToOrderingSection, buttonName))).isDisplayed().then((displayed) => {
          if (!displayed) {
            expect(false).customError(`\`"${buttonName}" is not displayed next to ordering section`);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    arrOfTransferButtons.forEach(buttonName => {

      it(`Verifying if \`"${buttonName}" is displayed between category and ordering sections`, () => {
        element(by.xpath(CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfTransferButtons, buttonName))).isDisplayed().then((displayed) => {
          if (!displayed) {
            expect(false).customError(`\`"${buttonName}" is not displayed next to ordering section`);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe(`Test Step ID: 445162`, () => {

    it(`Should select "FactSet:/ETF/" in the ordering section`, () => {
      ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getItemByText(`FactSet:/ETF/`).select();

      // Verifying that "FactSet:/ETF/" is selected
      ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getItemByText(`FactSet:/ETF/`).isSelected().then(bool => {
        if (!bool) {
          expect(false).customError(`"FactSet:/ETF/" is not selected`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on the down arrow button till "FactSet:/ETF/" is moved to bottom of the list', () => {
      const myArray = [];
      const children = ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getChildrenText();
      children.then(childArr => {
        for (let i = 0; i < childArr.length; ++i) {
          if (childArr[i].text === 'FactSet:/ETF/') {
            for (let j = i; j < childArr.length; j++) {
              element(by.xpath(CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfButtonNextToOrderingSection, `down`))).click();
            }
          }
        }
      });
    });

    it(`Should select "FactSet:/ETF_INDEX/" in the ordering section`, () => {
      ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getItemByText(`FactSet:/ETF_INDEX/`).select();

      // Verifying that "FactSet:/ETF_INDEX/" is selected
      ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getItemByText(`FactSet:/ETF_INDEX/`).isSelected().then(selected => {
        if (!selected) {
          expect(false).customError(`"FactSet:/ETF_INDEX/" is not selected`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it(`Should click on the down arrow button`, () => {
      element(by.xpath(CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfButtonNextToOrderingSection, `down`))).click();
    });

    it(`Verifying if items are displayed in the expected order`, () => {
      const children = ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getChildrenText();
      children.then(childArr => {
        for (let i = 0; i < childArr.length - 1; ++i) {
          if (childArr[i + 1].text !== arrOfItemsInOrderingSectionAfterUncheck[i]) {
            expect(false).customError(`Expected \`"${arrOfItemsInOrderingSectionAfterUncheck[i]}" but Found \`"${childArr[i + 1].text}".`);
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });
  });

  describe(`Test Step ID: 445163`, () => {

    it(`Should click on "OK" button in the Asset ordering dialog`, () => {
      ThiefHelpers.getButtonClassReference(undefined, CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfClearAllOrOkOrCancelButton, 'OK'))
        .press().then(() => { }, (err) => {

          expect(false).customError(`Unable to click on "OK" button in the Asset ordering dialog.` + err);
          CommonFunctions.takeScreenShot();
        });
    });

    it(`Verifying if "Asset Ordering" dialog is not displayed after clicking Ok button`, () => {
      ThiefHelpers.isDialogOpen(`Asset Ordering`).then(dialogStatus => {
        if (dialogStatus) {
          expect(false).customError(`"Asset Ordering" dialog is still displayed after clicking OK button.`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it(`Should click "Expand Composite Assets:" drop down and select "All Levels"`, () => {
      ThiefHelpers.selectOptionFromDropDown(`All Levels`, `Expand Composite Assets:`);
    });

    it(`Verifying if "All Levels" drop down displays "Expand Composite Assets:"`, () => {
      ThiefHelpers.getDropDownSelectClassReference(`Expand Composite Assets:`).getSelectedText().then(drpDwnSelectedItem => {
        if (drpDwnSelectedItem !== `All Levels`) {
          expect(false).customError(`"Expand Composite Assets:" drop down should displays "All Levels" instead "${drpDwnSelectedItem}" is displayed.`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader(`OK`, `Tile Options - Sector Weights`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Sector Weights`);

    it(`Verifying if composite asset is in expanded mode`, () => {
      let parentID;
      SlickGridFunctions.getAllRowsFromReport(`Sector Weights`).then(dataView => {
        dataView.forEach((rowRef, index) => {
          if (rowRef.metadata.type === `group`) {
            expect(false).customError(` \`"${rowRef[0]}" group is displayed in report.`);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe(`Test Step ID: 445164`, () => {

    CommonPageObjectsForPA3.clickUniverseAndClickOnSearchOrderButtonAfterClickingOnOptionInWrench(`Sector Weights`);

    it(`Verifying if items are displayed in the expected order`, () => {
      const children = ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getChildrenText();
      children.then(childArr => {
        for (let i = 0; i < childArr.length - 1; ++i) {
          if (childArr[i + 1].text !== arrOfItemsInOrderingSectionAfterUncheck[i]) {
            expect(false).customError(`Expected \`"${arrOfItemsInOrderingSectionAfterUncheck[i]}" but Found \`"${childArr[i + 1].text}".`);
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });
  });

  describe(`Test Step ID: 445369`, () => {

    it(`Should select "Use Default Ordering"`, () => {
      ThiefHelpers.setCheckBox(`Use Default Ordering`, undefined, true);
    });

    arrayOfXpaths.forEach((xpath, index) => {
      it('Storing the items present in the Assert ordering for future use', () => {
        let children = ThiefHelpers.getVirtualListboxClassReference(xpath).getChildrenText();
        var arrOfItems = arrayOfArras[index];
        children.then(childArr => {
          for (let i = 0; i < childArr.length; ++i) {
            if (childArr[i].text !== arrOfItems[i]) {
              expect(false).customError(`Expected: \`"${arrOfItems[i]}" but Found: \`"${childArr[i].text}".`);
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe(`Test Step ID: 445371`, () => {

    it(`Should de-select "Use Default Ordering"`, () => {
      ThiefHelpers.setCheckBox(`Use Default Ordering`, undefined, false);
    });

    it(`Verifying if items are displayed in the expected order`, () => {
      const children = ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getChildrenText();
      children.then(childArr => {
        for (let i = 0; i < childArr.length - 1; ++i) {
          if (childArr[i + 1].text !== arrOfItemsInOrderingSectionAfterUncheck[i]) {
            expect(false).customError(`Expected \`"${arrOfItemsInOrderingSectionAfterUncheck[i]}" but Found \`"${childArr[i + 1].text}".`);
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });
  });

  describe(`Test Step ID: 445372`, () => {

    it(`Should click on "OK" button in the Asset ordering dialog`, () => {
      ThiefHelpers.getButtonClassReference(undefined, CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfClearAllOrOkOrCancelButton, 'OK'))
        .press().then(() => { }, (err) => {

          expect(false).customError(`Unable to click on "OK" button in the Asset ordering dialog.` + err);
          CommonFunctions.takeScreenShot();
        });
    });

    it(`Verifying if "Asset Ordering" dialog is not displayed after clicking Ok button`, () => {
      ThiefHelpers.isDialogOpen(`Asset Ordering`).then(dialogStatus => {
        if (dialogStatus) {
          expect(false).customError(`"Asset Ordering" dialog is still displayed after clicking OK button.`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it(`Disabling wait for angular`, () => {
      browser.ignoreSynchronization = true;
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader(`OK`, `Tile Options - Sector Weights`);

    it(`Verify if the loading icon does not appear`, () => {
      ThiefHelpers.getProgressIndicatorClassReference().getProgress().then(() => {
        expect(false).customError(`Report is recalculated.`);
        CommonFunctions.takeScreenShot();
      }, (error) => {
        expect(true).toBeTruthy();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Sector Weights`);

    it(`Enabling wait for angular`, () => {
      browser.ignoreSynchronization = false;
    });
  });

  describe(`Test Step ID: 445373`, () => {
    CommonPageObjectsForPA3.clickUniverseAndClickOnSearchOrderButtonAfterClickingOnOptionInWrench(`Sector Weights`);
  });

  describe(`Test Step ID: 445374`, () => {

    it(`Expand "FactSet" and select "Index ID to Index holdings"`, () => {
      let group = ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfCategoriesContainer).getGroupByText(`FactSet:`);
      group.expand();

      group.isExpanded().then((expanded) => {
        group.getGroupByText(`Index ID to Index holdings`).then((subGroup) => {
          subGroup.select();
        });
      });
    });

    it(`Should click on the right arrow button`, () => {
      element(by.xpath(CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfTransferButtons, `right`))).click();
    });

    it(`Verifying if items are displayed in the expected order`, () => {
      CommonPageObjectsForPA3.verifyIfElementIsPresentInSelectedSection(`FactSet:/INDEX_IDS/`, AssetOrdering.xpathOfOrderingContainer);
    });
  });

  describe(`Test Step ID: 445375`, () => {

    it(`Expand "FactSet" and select "Index ID to Index holdings"`, () => {
      let group = ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfCategoriesContainer).getGroupByText(`FactSet:`);
      group.isExpanded().then((expanded) => {
        group.getGroupByText(`Index ID to Index holdings`).then((subGroup) => {
          subGroup.isSelected().then(selected => {
            if (!selected) {
              expect(false).customError(`"Index ID to Index holdings" is not selected.`);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it(`Should click on the right arrow button`, () => {
      for (var i = 0; i < 3; i++) {
        element(by.xpath(CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfTransferButtons, `right`))).click();
      }
    });

    it(`Verifying if "FactSet:/INDEX_IDS/" is not displayed more then once`, () => {
      const children = ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getChildrenText();
      let count = 0;
      children.then(childArr => {
        for (let i = 0; i < childArr.length; ++i) {
          if (childArr[i].text === `FactSet:/INDEX_IDS/`) {
            count++;
          }
        }

        if (count > 1) {
          expect(false).customError(`"FactSet:/INDEX_IDS/" is present \'"${count}" times.`);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe(`Test Step ID: 445376`, () => {

    it(`Should click on "Cancel" button in the Asset ordering dialog`, () => {
      ThiefHelpers.getButtonClassReference(undefined, CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfClearAllOrOkOrCancelButton, 'Cancel'))
        .press().then(() => { }, (err) => {

          expect(false).customError(`Unable to click on "Cancel" button in the Asset ordering dialog.` + err);
          CommonFunctions.takeScreenShot();
        });
    });

    it(`Verifying if "Asset Ordering" dialog is not displayed after clicking Cancel button`, () => {
      ThiefHelpers.isDialogOpen(`Asset Ordering`).then(dialogStatus => {
        if (dialogStatus) {
          expect(false).customError(`"Asset Ordering" dialog is still displayed after clicking Cancel button.`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it(`Disabling wait for angular`, () => {
      browser.ignoreSynchronization = true;
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader(`OK`, `Tile Options - Sector Weights`);

    it(`Verify if the loading icon does not appear`, () => {
      ThiefHelpers.getProgressIndicatorClassReference().getProgress().then(() => {
        expect(false).customError(`Report is recalculated.`);
        CommonFunctions.takeScreenShot();
      }, (error) => {
        expect(true).toBeTruthy();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Sector Weights`);

    it(`Enabling wait for angular`, () => {
      browser.ignoreSynchronization = false;
    });
  });
});
