// Main.jsx
// Entry point for the script

#include "Config.jsx"
#include "Utils.jsx"
#include "Imposition.jsx"
#include "JDF.jsx"
#include "Logger.jsx"

// UI and Setup
var myPath = ''
var myTextPath = "c://myPath.txt";
if (myTextPath) {
    var base = new File(myTextPath);
    base.open("r");
    getSettings = base.read().split('\n');
    myPath = sourceFolder = getSettings[0]
    loadDlg = getSettings[1]
}
if (loadDlg != "False") {
    var dlg = new Window('dialog', "Source folder");
    dlg.sourceFolder = dlg.add('edittext', [20, 15, 380, 35], myPath);
    dlg.btnCreate = dlg.add('button', [20, 15, 380, 35], "Go!");

    //event
    dlg.btnCreate.onClick = function () {

        dlg.close();


    }
    dlg.show();


    sourceFolder = dlg.sourceFolder.text;
}
else {
    if (getSettings[2] != "False") {
        compMulti = true
    }
    else {
        compMulti = false
    }
}

Logger.init(sourceFolder);
Logger.info("Script started. Source: " + sourceFolder);

var fileList = Folder(sourceFolder).getFiles();
if (fileList == 0) {
    alert("Алё! Гараж! Файлы где? аааа?");
}

else {
    var successCount = 0;
    var errorCount = 0;
    var bigPrintCount = 0;

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
            nameL = true
            var displacement = 2;

            if (file instanceof File && file.name.match(/\.(pdf)$/i)) {
                if (!file.name.match(/podbor/gi) && !file.name.match(/multipage/gi) /*&& !file.name.match(/Konlam/gi)*/ && !file.name.match(/Hlam/gi) &&
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


                            /*if(!filename.match(/2-([20])_/gi)){ */
                            getFolder();
                            //createAndSaveJDF(); // Moved after saveAndClose
                            //savePS();
                            //}
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
}

Logger.info("Finished. Success: " + successCount + ", Errors: " + errorCount + ", Big print: " + bigPrintCount);

if (fileList != 0) {
    myAlert = "Готово!\nОбработано: " + successCount + "\nОшибок: " + errorCount;
    if (bigPrintCount > 0) {
        myAlert = myAlert + "\n\nБОЛЬШОЙ ТИРАЖ (>500):\n" + bigPrintCount + " файл(ов) в папке big_print/"
    }
    if (konv) {
        myAlert = myAlert + "\n\nКорверты:\nБЫЛИ ЗАМЕЧЕНЫ"
    }
    if (konvlam) {
        myAlert = myAlert + "\n\nКорвертная:\nБЫЛИ ЗАМЕЧЕНЫ"
    }
    if (multi) {
        myAlert = myAlert + "\n\nМногостраничка:\nБЫЛИ ЗАМЕЧЕНЫ"
    }
    if (trubles) {
        myAlert = myAlert + "\n\nБЫЛИ ПРОБЛЕМЫ!!!"
    }
    if (checkNotJdf) {
        myAlert = myAlert + "\n\nБЫЛИ НЕ АВТОМАТЫ!!!" + checkNotJdfCount
    }
    if (white_lack) {
        myAlert = myAlert + "\n\nБЕЛЫЙ - ЛАК!!!"
    }

    // Log detailed statistics
    if (bigPrintCount > 0) {
        Logger.info("Big print files: " + bigPrintCount + " (moved to big_print/)");
    }
    if (konv) {
        Logger.info("Envelopes detected (moved to Konv/)");
    }
    if (konvlam) {
        Logger.info("Envelope lamination detected (moved to KonvLam/)");
    }
    if (multi) {
        Logger.info("Multipage files detected (moved to multipage/)");
    }
    if (trubles) {
        Logger.info("Problem files detected (moved to trubles/)");
    }
    if (white_lack) {
        Logger.info("White + varnish files detected (moved to white_lack/)");
    }
    if (checkNotJdf) {
        Logger.warn("Non-automatic files (no JDF created): " + checkNotJdfCount);
    }

    // saveJDF(); // Removed: JDFs are saved immediately now

    var Alertinfo = new File("c:/myAlert.txt");
    Alertinfo.open("a", "TEXT", "????");
    Alertinfo.write(myAlert);
    Alertinfo.close();

    alert(myAlert);
}

// Preferences : Restore (Optional, original script did this at the end)
// Preferences : Display Performance
app.displayPerformancePreferences.defaultDisplaySettings = ViewDisplaySettings.TYPICAL; // TYPICAL, OPTIMIZED
app.displayPerformancePreferences.persistLocalSettings = false;
app.displaySettings[0].raster = TagRaster.GRAY_OUT; // GRAY_OUT, PROXY, HIGH_RESOLUTION, DEFAULT_VALUE
app.displaySettings[0].vector = TagVector.GRAY_OUT; // GRAY_OUT, PROXY, HIGH_RESOLUTION, DEFAULT_VALUE
app.displaySettings[0].transparency = TagTransparency.OFF; // OFF, LOW_QUALITY, MEDIUM_QUALITY, HIGH_QUALITY, DEFAULT_VALUE
app.displaySettings[0].antialiasing = false;
app.displaySettings[0].greekBelow = 7;
app.displaySettings[1].raster = TagRaster.PROXY; // GRAY_OUT, PROXY, HIGH_RESOLUTION, DEFAULT_VALUE
app.displaySettings[1].vector = TagVector.PROXY; // GRAY_OUT, PROXY, HIGH_RESOLUTION, DEFAULT_VALUE
app.displaySettings[1].transparency = TagTransparency.MEDIUM_QUALITY; // OFF, LOW_QUALITY, MEDIUM_QUALITY, HIGH_QUALITY, DEFAULT_VALUE
app.displaySettings[1].antialiasing = true;
app.displaySettings[1].greekBelow = 0;
app.displaySettings[2].raster = TagRaster.HIGH_RESOLUTION; // GRAY_OUT, PROXY, HIGH_RESOLUTION, DEFAULT_VALUE
app.displaySettings[2].vector = TagVector.HIGH_RESOLUTION; // GRAY_OUT, PROXY, HIGH_RESOLUTION, DEFAULT_VALUE
app.displaySettings[2].transparency = TagTransparency.HIGH_QUALITY; // OFF, LOW_QUALITY, MEDIUM_QUALITY, HIGH_QUALITY, DEFAULT_VALUE
app.displaySettings[2].antialiasing = true;
app.displaySettings[2].greekBelow = 0;
