// SimpleWatcher.jsx
// Simple infinite loop folder watcher with FULL montaj processing
// Run once and leave InDesign open - it will check folder every 5 minutes

#target indesign

// Include all required modules
#include "Config.jsx"
#include "Utils.jsx"
#include "Imposition.jsx"
#include "JDF.jsx"
#include "Logger.jsx"

// ===============================================
// CONFIGURATION
// ===============================================

var CONFIG = {
    sourceFolder: "c:/dmitry/PDF/PDF_main/",
    logFolder: "c:/dmitry/PDF/PDF_main/id_logs/",
    checkInterval: 300000,  // 300 seconds (5 minutes)
    maxFilesPerRun: 50,
    showStatusWindow: true
};

var stats = {
    totalProcessed: 0,
    totalErrors: 0,
    totalBigPrint: 0,
    iteration: 0,
    startTime: new Date()
};

var statusWindow = null;

// ===============================================
// STATUS FILE
// ===============================================

function updateStatusFile() {
    try {
        // Create log folder if it doesn't exist
        var logFolder = new Folder(CONFIG.logFolder);
        if (!logFolder.exists) {
            logFolder.create();
        }

        var statusFile = new File(CONFIG.logFolder + "watcher_status.txt");
        statusFile.encoding = "UTF-8";
        statusFile.open("w");

        var uptime = Math.floor((new Date() - stats.startTime) / 1000 / 60); // minutes

        statusFile.writeln("=== SimpleWatcher Status ===");
        statusFile.writeln("Last check: " + new Date().toString());
        statusFile.writeln("Iteration: #" + stats.iteration);
        statusFile.writeln("Total processed: " + stats.totalProcessed);
        statusFile.writeln("Total errors: " + stats.totalErrors);
        statusFile.writeln("Total big print: " + stats.totalBigPrint);
        statusFile.writeln("Uptime: " + uptime + " minutes");
        statusFile.writeln("Next check: " + new Date(new Date().getTime() + CONFIG.checkInterval).toLocaleTimeString());
        statusFile.writeln("Status: RUNNING");

        statusFile.close();
    } catch (e) {
        $.writeln("  [Warning] Could not update status file: " + e.message);
    }
}

function updateStatusWindow() {
    if (!statusWindow || !CONFIG.showStatusWindow) return;

    try {
        statusWindow.statusText.text = "Running | Check #" + stats.iteration;
        statusWindow.lastCheckText.text = "Last: " + new Date().toLocaleTimeString();
        statusWindow.statsText.text = "Files: " + stats.totalProcessed + " | Errors: " + stats.totalErrors + " | Big: " + stats.totalBigPrint;
        statusWindow.update();
    } catch (e) {
        // Window might be closed
        statusWindow = null;
    }
}

function createStatusWindow() {
    if (!CONFIG.showStatusWindow) return;

    var win = new Window("palette", "Montaj Watcher", undefined, {closeButton: false});
    win.orientation = "column";
    win.alignChildren = ["fill", "top"];
    win.spacing = 5;
    win.margins = 10;

    win.statusText = win.add("statictext", undefined, "Starting...");
    win.statusText.characters = 40;

    win.lastCheckText = win.add("statictext", undefined, "Last: --");
    win.lastCheckText.characters = 40;

    win.statsText = win.add("statictext", undefined, "Files: 0 | Errors: 0 | Big: 0");
    win.statsText.characters = 40;

    var stopBtn = win.add("button", undefined, "Stop");
    stopBtn.onClick = function() {
        if (confirm("Stop watcher?")) {
            win.close();
            $.writeln("\n[STOPPED BY USER]");
            $.exit();
        }
    };

    win.show();
    return win;
}

// ===============================================
// PROCESSING (FULL LOGIC FROM MAIN.JSX)
// ===============================================

function processFolder() {
    try {
        sourceFolder = CONFIG.sourceFolder; // GLOBAL variable for included modules

        $.writeln("[" + new Date().toLocaleTimeString() + "] Checking folder...");

        var folder = new Folder(sourceFolder);

        if (!folder.exists) {
            $.writeln("[" + new Date().toLocaleTimeString() + "] ERROR: Folder not found");
            return;
        }

        // Create log folder if it doesn't exist
        var logFolder = new Folder(CONFIG.logFolder);
        if (!logFolder.exists) {
            logFolder.create();
        }

        // Initialize Logger
        Logger.init(CONFIG.logFolder);
        Logger.info("=== Auto-check started (iteration #" + stats.iteration + ") ===");

        var fileList = folder.getFiles();

        if (fileList.length === 0) {
            $.writeln("[" + new Date().toLocaleTimeString() + "] No files");
            Logger.info("No files to process");
            return;
        }

        $.writeln("[" + new Date().toLocaleTimeString() + "] Found " + fileList.length + " items");

        var successCount = 0;
        var errorCount = 0;
        var bigPrintCount = 0;

        // Process files (same logic as Main.jsx)
        for (var a = 0; a < fileList.length; a++) {
            try {
                // Reset per-file flags
                var p92 = false;
                var diz = false;
                var myPaperH;
                var paperSelect = "";
                var presetName = false;

                file = fileList[a]; // Global
                filename = file.name; // Global

                if (file.constructor.name != "File") continue; // Skip folders

                Logger.info("Processing: " + filename);

                var sra = false;
                var white = false;
                var chb = false;
                var kash = false;
                notkub = false;
                nameL = true;
                var displacement = 2;

                if (file instanceof File && file.name.match(/\.(pdf)$/i)) {
                    if (!file.name.match(/podbor/gi) && !file.name.match(/multipage/gi) && !file.name.match(/Hlam/gi) &&
                        !((file.name.match(/white/gi) || file.name.match(/_wc_/gi)) && file.name.match(/add_lack/gi) && !file.name.match(/\(305x215\)/gi) && !file.name.match(/UFlam/gi) && !file.name.match(/Hlam/gi) && !file.name.match(/Person/gi) && !file.name.match(/Plotter/gi) && !file.name.match(/Planshet/gi))) {

                        folder7200_6 = 'c:/jdf_726/';
                        if ((file.name.match(/_LS/gi) || file.name.match(/_LK/gi)) && (file.name.match(/SRA3/gi) || file.name.match(/!_/gi))) {
                            for (i = 0; i < no_lviv.length; i++) {

                                if (!file.name.match(no_lviv[i])) {
                                    folder7700 = folder9200 = folder7100_L
                                    folder8200 = folderSRA = folderSRA91 = folderKub = folder9200_5 = folderSRA_L

                                }
                                else {
                                    folder8200 = 'c:/jdf_8/';
                                    folder9200_5 = 'c:/jdf_5/';
                                    folder9200 = 'c:/jdf_4/';
                                    folder7700 = folder7200
                                    folderSRA91 = folderKub = folderSRA = folder3;
                                    i = no_lviv.length + 1;
                                }
                            }

                        }
                        else {
                            folderSRA = folder3;
                            folder8200 = 'c:/jdf_8/';
                            folder9200_5 = 'c:/jdf_5/';
                            folder9200 = 'c:/jdf_4/';
                            folder7700 = folder7200
                            folderSRA91 = folderKub = folderSRA
                        }
                        folder8200 = 'c:/jdf_4/';

                        var number = file.name.match(/\([0-9]*-[0-9]*/i)

                        number = number.toString()

                        numberOrder = number.split("-");
                        numberOrder = "*" + numberOrder[1] + "*"

                        var multiPDF = false;
                        checkPlot();
                        getPaper();
                        checkSRA();
                        var sheetPrintrun = Impose(file, paperW, paperH, alternativePaperW, alternativePaperH);

                        if (sheetPrintrun != false) {
                            // Check if printrun exceeds limit
                            if (sheetPrintrun > 500) {
                                // Close any open documents
                                if (app.documents.length > 0) {
                                    app.documents[0].close(SaveOptions.NO);
                                }

                                // Move to big_print folder
                                var bigPrintFolder = sourceFolder + "/big_print/";
                                if (!new Folder(bigPrintFolder).exists) {
                                    new Folder(bigPrintFolder).create();
                                }

                                var destFile = bigPrintFolder + filename;
                                file.copy(destFile);
                                file.remove();

                                bigPrintCount++;
                                Logger.info("Moved to big_print (printrun: " + sheetPrintrun + "): " + filename);
                                continue; // Skip to next file
                            }
                            checkWhite();
                            clearFace();
                            tiraj();
                            if (!file.name.match(/\(KONV\)/gi)) {
                                addMarks();
                                checkImposePaper();
                                checkChb();
                                addListName();
                            }

                            getPresetName();

                            if (!presetName) {
                                checkNotJdf = true;
                                checkNotJdfCount = checkNotJdfCount + filename + '\n';
                                Logger.warn(filename, "Preset not found (Not JDF)");

                            }
                            else {
                                getFolder();
                            }
                            saveAndClose();

                            if (presetName) {
                                createAndSaveJDF();
                            }
                            successCount++;
                        }
                        else {
                            if (multiPDF) {
                                multi = true;
                                folderPDF = sourceFolder + "/multipage/"
                                ex = folderPDF + filename;
                                if (!folderPDF.exists) new Folder(folderPDF).create();

                                file.copy(ex);

                                file.remove();
                                Logger.info("Moved to multipage: " + filename);
                            }
                            else {
                                folderPDF = sourceFolder + "/trubles/"
                                ex = folderPDF + filename;
                                if (!folderPDF.exists) new Folder(folderPDF).create();

                                file.copy(ex);

                                file.remove();
                                trubles = true;
                                Logger.warn(filename, "Imposition failed (moved to trubles)");
                            }
                        }
                    }
                    else {
                        if (file.name.match(/KonvLam/gi) || file.name.match(/Konlam/gi)) {
                            konvlam = true;
                            folderPDF = sourceFolder + "/KonvLam/"
                            ex = folderPDF + filename;
                            if (!folderPDF.exists) new Folder(folderPDF).create();

                            file.copy(ex);

                            file.remove();
                        }
                        if (file.name.match(/podbor/gi)) {
                            konvlam = true;
                            folderPDF = sourceFolder + "/podbor/"
                            ex = folderPDF + filename;
                            if (!folderPDF.exists) new Folder(folderPDF).create();

                            file.copy(ex);

                            file.remove();
                        }
                        if (file.name.match(/KONV/gi)) {
                            konv = true;
                            folderPDF = sourceFolder + "/Konv/"
                            ex = folderPDF + filename;
                            if (!folderPDF.exists) new Folder(folderPDF).create();

                            file.copy(ex);

                            file.remove();
                        }
                        if (file.name.match(/multipage/gi)) {
                            multi = true;
                            folderPDF = sourceFolder + "/multipage/"
                            ex = folderPDF + filename;
                            if (!folderPDF.exists) new Folder(folderPDF).create();

                            file.copy(ex);

                            file.remove();
                        }
                        if (((file.name.match(/white/gi) || file.name.match(/_wc_/gi)) && file.name.match(/_add/gi)) || file.name.match(/_wcl_/gi)) {
                            white_lack = true;
                            folderPDF = sourceFolder + "/white_lack/"
                            ex = folderPDF + filename;
                            if (!folderPDF.exists) new Folder(folderPDF).create();

                            file.copy(ex);

                            file.remove();
                        }
                        if (file.name.match(/\(VUS\)/gi)) {
                            folderPDF = sourceFolder + "/trubles/"
                            ex = folderPDF + filename;
                            if (!folderPDF.exists) new Folder(folderPDF).create();

                            file.copy(ex);

                            file.remove();
                            trubles = true;
                        }
                    }
                }
            } catch (e) {
                errorCount++;
                Logger.error(filename, e.message + " (Line: " + e.line + ")");

                // Move to _ERRORS
                try {
                    var errorFolder = sourceFolder + "/_ERRORS/";
                    if (!new Folder(errorFolder).exists) new Folder(errorFolder).create();
                    var errorFile = new File(errorFolder + filename);
                    file.copy(errorFile);
                    file.remove();
                    Logger.info("Moved failed file to: " + errorFolder);
                } catch (moveErr) {
                    Logger.error(filename, "Could not move failed file: " + moveErr.message);
                }

                // Close document if left open
                if (app.documents.length > 0) {
                    app.documents[0].close(SaveOptions.NO);
                }
            }
        }

        stats.totalProcessed += successCount;
        stats.totalErrors += errorCount;
        stats.totalBigPrint += bigPrintCount;

        $.writeln("  Success: " + successCount + " | Errors: " + errorCount + " | Big print: " + bigPrintCount);
        Logger.info("Finished iteration #" + stats.iteration + ": Success=" + successCount + ", Errors=" + errorCount + ", Big print=" + bigPrintCount);

    } catch (e) {
        $.writeln("[ERROR] " + e.message);
        Logger.error("", "Critical error in processFolder: " + e.message);
    }
}

// ===============================================
// MAIN LOOP
// ===============================================

$.writeln("=================================================");
$.writeln("Montaj Auto Watcher (Full Processing)");
$.writeln("=================================================");
$.writeln("Source folder: " + CONFIG.sourceFolder);
$.writeln("Log folder: " + CONFIG.logFolder);
$.writeln("Interval: " + (CONFIG.checkInterval / 1000) + " seconds");
$.writeln("");
$.writeln("Status file: " + CONFIG.logFolder + "watcher_status.txt");
$.writeln("Log file: " + CONFIG.logFolder + "processing_log.txt");
$.writeln("");
$.writeln("Press ESC in InDesign or click Stop button");
$.writeln("=================================================");
$.writeln("");

// Create status window
statusWindow = createStatusWindow();

// Run forever
while (true) {
    stats.iteration++;

    $.writeln("--- Check #" + stats.iteration + " ---");

    processFolder();
    updateStatusFile();
    updateStatusWindow();

    $.writeln("Total: Processed=" + stats.totalProcessed + ", Errors=" + stats.totalErrors + ", Big print=" + stats.totalBigPrint);
    $.writeln("Next check in " + (CONFIG.checkInterval / 1000) + " seconds...");
    $.writeln("");

    // Sleep for interval
    $.sleep(CONFIG.checkInterval);
}