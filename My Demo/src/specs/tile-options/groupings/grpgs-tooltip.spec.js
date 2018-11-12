'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grpgs-tooltip', function() {

  describe('Test Step ID: 551571', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "#/doc/Client:default_doc_OLD/report/report0" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click();

      // Verifying if drop down menu appear
      expect(PA3MainPage.getWrenchIcon(true).isPresent()).toBeTruthy();
    });

    it('Should select "Automatic Calculation" option', function() {
      // Un-check "Automatic Calculation" to force re-check it
      PA3MainPage.setAutomaticCalculation(false);

      // Click on Wrench button to select "Automatic Calculation"
      PA3MainPage.getWrenchIcon().click();
      expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
    });

    it('Type "Client:/Pa3/Test" in the "Portfolio" widget and select ' + '"CLIENT:/PA3/TEST.ACCT" from type ahead', function() {
      PA3MainPage.setPortfolio('Client:/Pa3/Test', 'Client:/pa3/TEST.ACCT', 'Client:/pa3/TEST.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('"CLIENT:/PA3/TEST.ACCT" is not selected from type ahead.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
    });
  });

  describe('Test Step ID: 551572', function() {

    it('Should click on the "Wrench" icon in the "Weights"\' report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click();
    });

    it('Verifying if Wrench menu list appeared', function() {
      expect(PA3MainPage.getWrenchIconFromReportWorkspace('Weights', true).isPresent()).toBeTruthy();
    });

    it('Select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click();
    });

    // Checking if the 'Tile Options' mode has opened.
    it('Validating if "Tile Options" mode opened', function() {
      expect(TileOptions.isTileOptionsMode()).toBeTruthy();
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click();

      // Checking if 'Groupings' item is opened.
      expect(TileOptions.getOptionTitle().getText()).toEqual('Groupings');
    });

    it('Hover over "Economic Sector - FactSet". It should display tooltip saying "FactSet/Sector & Industry/FactSet"', function() {
      expect(TileOptionsGroupings.verifyToolTip('Selected', 'Economic Sector - FactSet', 'FactSet/Sector & Industry' + '/FactSet')).toBeTruthy();
    });
  });

  describe('Test Step ID: 551573', function() {

    it('Should expand "FactSet > Country & Region > FactSet" from "Available" container', function() {
      TileOptionsGroupings.expandElementTree('FactSet|Country & Region|FactSet', 'FactSet');

      // Verifying that "FactSet > Country & Region > FactSet" tree is expanded
      TileOptionsGroupings.checkIfExpanded('FactSet|Country & Region|FactSet');
    });

    it('Hover over "Region of Domicile" inside "FactSet > Country & Region > FactSet".' + 'It should not display any tooltip.', function() {
      expect(TileOptionsGroupings.verifyToolTip('Available', 'Region of Domicile', undefined, 'FactSet|Country & Region|FactSet', false)).toBeTruthy();
    });
  });

  describe('Test Step ID: 551574', function() {

    it('Should type "Region" in the "Available" search field', function() {
      TileOptionsGroupings.getAvailableSectionSearchBox().sendKeys('Region');

      // verifying that "Region" is typed into the search box
      expect(TileOptionsGroupings.getAvailableSectionSearchBox().getAttribute('value')).toEqual('Region');
    });

    it('Hover over "Region of Domicile" inside "FactSet > Country & Region > FactSet". ' + 'It should not display any tooltip.', function() {
      expect(TileOptionsGroupings.verifyToolTip('Available', 'Region of Domicile', undefined, 'FactSet|Country & Region|FactSet', false)).toBeTruthy();
    });
  });

  describe('Test Step ID: 551576', function() {

    //Known issue with Mapped Country grouping http://is.factset.com/rpd/summary.aspx?messageId=20021629

    it('Click on "X" button in "Available" search field to clear the search', function() {
      TileOptionsGroupings.getSearchBoxClearButton().click();

      // Verifying if search field is cleared
      expect(TileOptionsGroupings.getAvailableSectionSearchBox().getAttribute('value')).toEqual('');
      browser.sleep(3000);
    });

    it('Expand "Client" from "Available" container', function() {
      TileOptionsGroupings.expandElementTree('Client');

      // Verifying that "Client" tree is expanded
      TileOptionsGroupings.checkIfExpanded('Client');
    });

    it('Select "Long/Short" from "Client"', function() {
      TileOptionsGroupings.getElementFromAvailableSection('Client', 'Long/Short').click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Long/Short" is selected
      TileOptionsGroupings.getElementFromAvailableSection('Client', 'Long/Short').getAttribute('class').then(function(value) {
        expect(value.indexOf('selected') > -1).customError('"Long/Short" is not selected.');
        if (value.indexOf('selected') < 0) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Long/Short" to add it to "Selected" container', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('Client', 'Long/Short')).perform();
    });

    it('Verifying if "Long/Short" is added to the "Selected" container', function() {
      expect(TileOptionsGroupings.getElementFromSelectedContainer('Long/Short').isPresent()).toBeTruthy();
    });

    it('Expand "Super_Client" from "Available" container', function() {
      TileOptionsGroupings.expandElementTree('Super_Client');

      // Verifying that "Super_Client" tree is expanded
      TileOptionsGroupings.checkIfExpanded('Super_Client');
    });

    xit('Select "Mapped Country" from "Super_Client"', function() {
      TileOptionsGroupings.getElementFromAvailableSection('Super_Client', 'Mapped Country').click();

      // Verifying if "Mapped Country" is selected
      expect(TileOptionsGroupings.getElementFromAvailableSection('Super_Client', 'Mapped Country').getAttribute('class')).toContain('selected');
    });

    xit('Double click on "Mapped Country" to add it to "Selected" container', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('Super_Client', 'Mapped Country')).perform();
    });

    xit('Verifying if "Mapped Country" is added to the "Selected" container', function() {
      expect(TileOptionsGroupings.getElementFromSelectedContainer('Mapped Country').isPresent()).toBeTruthy();
    });

    it('Expand "FactSet > Fixed Income > Municipals" from "Available" container', function() {
      TileOptionsGroupings.expandElementTree('FactSet|Fixed Income|Municipals', 'FactSet');

      // Verifying that "FactSet > Fixed Income > Municipals" tree is expanded
      TileOptionsGroupings.checkIfExpanded('FactSet|Fixed Income|Municipals');
    });

    it('Select "Sector" from "FactSet > Fixed Income > Municipals"', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Fixed Income|Municipals', 'Sector').click();

      // Verifying if "Sector" is selected
      expect(TileOptionsGroupings.getElementFromAvailableSection('FactSet|Fixed Income|Municipals', 'Sector').getAttribute('class')).toContain('selected');
    });

    it('Double click on "Sector" to add it to "Selected" container', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet|Fixed Income|Municipals', 'Sector')).perform();
    });

    it('Verifying if "Sector" is added to the "Selected" container', function() {
      expect(TileOptionsGroupings.getElementFromSelectedContainer('Sector').isPresent()).toBeTruthy();
    });

    it('Hover over "Long/Short". It should show tooltip saying "Client"', function() {
      expect(TileOptionsGroupings.verifyToolTip('Selected', 'Long/Short', 'Client')).toBeTruthy();
    });

    // Known Issue: RPD:16733740 The tool tip doesn't display as expected for 'Mapped Country'.
    xit('Hover over "Mapped Country". It should show tooltip saying "Super_Client/bfudf"', function() {
      expect(TileOptionsGroupings.verifyToolTip('Selected', 'Mapped Country', 'Super_Client/bfudf')).toBeTruthy();
    });

    // Known Issue: RPD:18386463  tooltip does not display if hover over the last grouping name.
    it('Hover over "Sector". It should show tooltip saying "FactSet/Fixed Income/Municipals"', function() {
      expect(TileOptionsGroupings.verifyToolTip('Selected', 'Sector', 'FactSet/Fixed Income/Municipals')).toBeTruthy();
    });
  });

  describe('Test Step ID: 551575', function() {

    it('Hover over "Economic Sector - FactSet". It should display tooltip saying "FactSet/Sector & Industry/FactSet"', function() {
      expect(TileOptionsGroupings.verifyToolTip('Economic Sector - FactSet', 'FactSet/Sector & Industry/FactSet')).toBeTruthy();
    });

    it('Hover over "Industry - FactSet". It should show tooltip saying "FactSet/Sector & Industry/FactSet".', function() {
      expect(TileOptionsGroupings.verifyToolTip('Industry - FactSet', 'FactSet/Sector & Industry/FactSet')).toBeTruthy();
    });

    it('Hover over "Long/Short". It should show tooltip saying "Client"', function() {
      expect(TileOptionsGroupings.verifyToolTip('Long/Short', 'Client')).toBeTruthy();
    });

    it('Hover over "Mapped Country". It should show tooltip saying "Super_Client"', function() {
      expect(TileOptionsGroupings.verifyToolTip('Mapped Country', 'Super_Client/bfudf')).toBeTruthy();
    });

    // Known Issue: RPD:18386463  tooltip does not display if hover over the last grouping name.
    it('Hover over "Sector". It should show tooltip saying "FactSet/Fixed Income/Municipals"', function() {
      expect(TileOptionsGroupings.verifyToolTip('Sector', 'FactSet/Fixed Income/Municipals')).toBeTruthy();
    });
  });

  describe('Test Step ID: 551577', function() {

    // Clicking on the OK button to close Tile Options Mode
    it('Should click on the "OK" Button', function() {
      TileOptions.getHeaderButton('OK').click();
    });

    // Verifying if mode is closed.
    it('Should verify "Tile Options" mode is closed', function() {
      expect(TileOptions.isTileOptionsMode()).toBeFalsy();
    });

    it('Waiting for "Weights" report to re-calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
    });

    it('Verifying if "Weights" report is calculated based on "Economic Sector" Groupings', function() {
      expect(PA3MainPage.getGroupingsHyperLink('Weights').getText()).toEqual('Economic Sector');
    });
  });
});
