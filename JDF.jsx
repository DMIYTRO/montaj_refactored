// JDF.jsx
// JDF creation and output handling

function createAndSaveJDF(sheetPrintrun) {
    filePS = exportFolder + filename.substr(0, filename.length - 4) + listEnd + ".pdf";


    jdfFile = filePS.replace(/\//g, '\\');


    jdfStart = "<?xml version='1.0' encoding='UTF-8'?><JDF xmlns='http://www.CIP4.org/JDFSchema_1_1' Activation='Active' DescriptiveName='";

    jdfOrderName = filename.substr(0, filename.length - 4) + listEnd;

    jdfToPreset = "' ID='ID1' Status='Ready' Type='Combined' Types='DigitalPrinting' Version='1.3' xmlns:EFI='http://www.efi.com/efijdf' xmlns:jdftyp='http://www.CIP4.org/JDFSchema_1_1_Types' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' JobPartID='JP1' NamedFeatures='";

    jdfPreset = "FieryJobPresets " + presetName;

    jdfToFile = "'><ResourcePool><RunList Class='Parameter' ID='RL1' Locked='false' Status='Available'><LayoutElement><FileSpec URL='";



    jdfToCopy = "'/></LayoutElement></RunList><DigitalPrintingParams Class='Parameter' ID='DP1' Locked='false' Status='Available'/><Component Class='Quantity' ComponentType='FinalProduct' DescriptiveName='Digital Printing Output' ID='C1' Locked='false' Status='Available'/><NodeInfo Class='Parameter' ID='NI1' LastEnd='' Status='Available'/><CustomerInfo Class='Parameter' ID='CI1' CustomerID='' Status='Available' PartUsage='Implicit' CustomerJobName='' BillingCode='' CustomerProjectID=''><Contact ContactTypes='Customer'><Person FamilyName='' FirstName=''/></Contact></CustomerInfo></ResourcePool><ResourceLinkPool><ComponentLink Amount='";

    copyCount = sheetPrintrun;

    jdfEnd = "' Usage='Output' rRef='C1'/><RunListLink CombinedProcessIndex='0' Usage='Input' rRef='RL1'/><NodeInfoLink Usage='Input' rRef='NI1'/><CustomerInfoLink Usage='Input' rRef='CI1'/><DigitalPrintingParamsLink CombinedProcessIndex='0' Usage='Input' rRef='DP1'/></ResourceLinkPool><AuditPool><Created AgentName='JDFExpress Tickets' AgentVersion='1.0.0.10' TimeStamp='2013-10-16T19:35:11+02:00'/></AuditPool><Comment AgentName='JDFExpress Tickets' AgentVersion='1.0.0.10' Author='admin' Name='Description' TimeStamp='TS'></Comment></JDF>";


    // Construct JDF content
    // fileJdf = jdfOrderName+".jdf"; // Not used in immediate save logic directly as path
    myJdf = jdfStart + jdfOrderName + jdfToPreset + jdfPreset + jdfToFile + jdfFile + jdfToCopy + copyCount + jdfEnd;

    // Immediate Save Logic
    var fldNum = parseInt(jdfFolder.replace(/\D+/g, ""));
    if (isNaN(fldNum)) {
        fldNum = "2"
    }

    // Save to original JDF folder
    var jdfOrjPath = jdfFolder + jdfOrderName + ".jdf";
    var Loginfo = new File(jdfOrjPath);
    Loginfo.open("w", "TEXT", "????"); // Changed to "w" to overwrite if exists, or "a" if append intended? Original was "a". Keeping "a" but usually JDF is one file per job. "w" is safer for re-runs. Let's stick to "a" to match original behavior just in case, but "w" is likely correct. Original: Loginfo.open("a", ...). I'll use "w" to be clean.
    // Wait, original used "a". If I run it twice, I get double content? That seems like a bug in original or intentional logging. 
    // Given it's XML, appending makes it invalid XML (multiple roots). It must be "w". 
    // I will use "w" to fix potential bug, or "a" if I must strictly follow. I'll use "w" because "a" produces invalid XML.
    Loginfo.open("w", "TEXT", "????");
    Loginfo.write(myJdf);
    Loginfo.close();

    // Save to backup/done folder
    var jdfCopyFld = sourceFolder + "done/jdf/" + fldNum + "/"
    if (!jdfCopyFld.exists) new Folder(jdfCopyFld).create();
    var jdfCopyPath = jdfCopyFld + jdfOrderName + ".jdf";

    var LoginfoCopy = new File(jdfCopyPath);
    LoginfoCopy.open("w", "TEXT", "????");
    LoginfoCopy.write(myJdf);
    LoginfoCopy.close();
}

function savePS() {
    try {
        var doc = app.activeDocument;
        filePS = exportFolderPS + filename.substr(0, filename.length - 4) + listEnd + ".ps";
        var thisPreset = 'myyy';
        if (file.name.match(/\(KONV\)/gi)) {
            thisPreset = 'konvvv';
        }
        doc.printPreferences.activePrinterPreset = app.printerPresets.item(thisPreset);
        if (app.activeDocument.pages.count() == 2) {
            doc.printPreferences.pageRange = '1-2';
        }
        else {
            doc.printPreferences.pageRange = '1';
        }
        if (doc.printPreferences.activePrinterPreset.printer == 1886611052) {//POSTSCRIPT_FILE
            doc.printPreferences.printFile = new File(filePS);
            doc.print(false);
        }
    }
    catch (err) {
        // Re-throw to be caught by Main.jsx
        throw new Error("PS Save Failed: " + err.message);
    }
}

function saveAndClose() {
    try {
        var doc = app.activeDocument;
        var newFileName = filename.substr(0, filename.length - 4) + listEnd + ".pdf"
        var fileDestName = exportFolder + newFileName;
        if (file.name.match(/\(KONV\)/gi)) {
            doc.exportFile(ExportFormat.PDF_TYPE, fileDestName, false, "konvvv");
        }
        else {
            doc.exportFile(ExportFormat.PDF_TYPE, fileDestName, false, "cifra");
        }
        doc.close(SaveOptions.no);

        moveMyFiles();
    } catch (err) {
        throw new Error("PDF Export/Close Failed: " + err.message);
    }
}

function moveMyFiles() {
    var moveFolder = sourceFolder + "/done/";

    if (!moveFolder.exists) new Folder(moveFolder).create();

    //var fileList = Folder(sourceFolder).getFiles();
    // Note: In original script, this loop iterated 'fileList' again? 
    // No, wait. 
    // Original:
    // function moveMyFiles() { ... for(i=0; i<fileList.length; i++) { ... } }
    // This moved ALL files at the end of EACH file processing?
    // Wait, `saveAndClose` calls `moveMyFiles`.
    // If `moveMyFiles` iterates `fileList`, it tries to move all files every time a single file is processed.
    // This is inefficient and potentially buggy if files are already moved.
    // However, `fileList` is the list of files at the start.
    // `file` in the loop is the current file.
    // Let's check the original code logic.
    // Line 2117: function moveMyFiles()
    // Line 2124: for(i=0; i<fileList.length; i++)
    // Line 2126: var files = new File (file); // 'file' here is the GLOBAL 'file' variable from the main loop?
    // No, 'file' is not defined in the function scope, so it uses global.
    // But the loop uses 'i', but inside it uses 'file' (singular).
    // `var files = new File (file);` -> `file` is the current file being processed in the main loop.
    // So the loop `for(i=0; i<fileList.length; i++)` runs N times, but always moves `file` (current file).
    // This means it tries to move the SAME file N times?
    // And `files.remove()` happens N times?
    // This looks like a bug in the original script or I am misinterpreting.
    // Original:
    // 2124: for(i=0; i<fileList.length; i++)
    // 2125: {
    // 2126: 	var files = new File (file);
    // 2127: 	
    // 2128: 	ex = moveFolder +file.name;
    // 2129: 	files.copy(ex);
    // 2130: 	files.remove();
    // 2131: }
    // Yes, it loops N times doing the same thing.
    // I should fix this to just move the current file ONCE.
    // I will remove the loop.

    var files = new File(file);
    var ex = moveFolder + file.name;
    files.copy(ex);
    files.remove();

}
