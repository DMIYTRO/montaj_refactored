// Logger.jsx
// Logging utility

var Logger = {
    logFile: null,
    logPath: "",

    init: function (folderPath) {
        this.logPath = folderPath + "/processing_log.txt";
        this.logFile = new File(this.logPath);
    },

    _write: function (level, message) {
        if (!this.logFile) return;
        var date = new Date();
        var timestamp = date.toLocaleString();
        var line = "[" + timestamp + "] [" + level + "] " + message + "\n";

        this.logFile.encoding = "UTF-8";
        this.logFile.open("a");
        this.logFile.write(line);
        this.logFile.close();
    },

    info: function (message) {
        this._write("INFO", message);
    },

    error: function (filename, errorMsg) {
        this._write("ERROR", "File: " + filename + " - " + errorMsg);
    },

    warn: function (filename, msg) {
        this._write("WARN", "File: " + filename + " - " + msg);
    }
};
