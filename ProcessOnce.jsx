// ProcessOnce.jsx
// Simple one-time processing script
// Designed to be called by Windows Task Scheduler repeatedly

#target indesign

var CONFIG = {
    sourceFolder: "C:/temp/montaj_input/",
    maxFilesPerRun: 50
};

// ===============================================
// LOGGING
// ===============================================

function log(message) {
    var logFile = new File(CONFIG.sourceFolder + "process.log");
    logFile.encoding = "UTF-8";
    logFile.open("a");
    logFile.writeln("[" + new Date().toString() + "] " + message);
    logFile.close();

    $.writeln(message);
}

// ===============================================
// PROCESSING
// ===============================================

log("=== Processing started ===");

try {
    var folder = new Folder(CONFIG.sourceFolder);

    if (!folder.exists) {
        log("ERROR: Folder not found: " + CONFIG.sourceFolder);
        // Don't exit - just finish
    } else {
        var files = folder.getFiles("*.pdf");

        if (files.length === 0) {
            log("No files to process");
        } else {
            log("Found " + files.length + " files");

            var successCount = 0;
            var errorCount = 0;

            for (var i = 0; i < Math.min(files.length, CONFIG.maxFilesPerRun); i++) {
                try {
                    var file = files[i];
                    log("Processing: " + file.name);

                    var processedFolder = CONFIG.sourceFolder + "auto_processed/";
                    if (!new Folder(processedFolder).exists) {
                        new Folder(processedFolder).create();
                    }

                    file.copy(processedFolder + file.name);
                    file.remove();
                    successCount++;

                } catch (e) {
                    log("ERROR: " + e.message);
                    errorCount++;
                }

                // Close documents
                while (app.documents.length > 0) {
                    app.documents[0].close(SaveOptions.NO);
                }
            }

            log("Success: " + successCount + " | Errors: " + errorCount);
        }
    }
} catch (e) {
    log("CRITICAL ERROR: " + e.message);
}

log("=== Processing finished ===");

// Optional: Close InDesign after processing
// app.quit();
