// Config.jsx
// Global configuration and variables

// Preferences : Display Performance
app.displayPerformancePreferences.defaultDisplaySettings = ViewDisplaySettings.OPTIMIZED; // TYPICAL, OPTIMIZED
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

// Global Variables
var exportFolder = "//10.20.2.60/work/output/";
var exportFolder7700 = "//10.20.2.60/work/output/";
var exportFolderPSkub = "//10.20.1.42"; //.42
var exportFolderPSsra = "//10.20.1.43/printPS/";
var exportFolderPS7700 = "//10.20.1.37/printPS/";
var exportFolderPSsra91 = "//10.20.1.39/printPS/";

var folderSRA91 = 'c:/jdf_1/';//_1
var folderSRA = 'c:/jdf_3/';
var folder3 = 'c:/jdf_3/';

var folderKub = 'c:/jdf/'; //jdf
var folderSRA_L=folderKub;
var exportFolder8200 = exportFolder;
var exportFolderPS8200 = "//10.20.1.44/printPS/"; //10.20.1.44/printPS/
var folder8200 = 'c:/jdf_8/';//_8
var exportFolder9200 = exportFolder;
var exportFolderPS9200 = "//10.20.1.45/printPS/"; //10.20.1.45/printPS/
var folder9200 = 'c:/jdf_4/';//_4

var exportFolder9200_5 = exportFolder;
var exportFolderPS9200_5 = "//10.20.1.47/printPS/";//10.20.1.47/printPS/
var folder9200_5 = 'c:/jdf_5/'; //_5
var folder7700 = 'c:/jdf_7/'; //_7
var folder7100_L=folder7700;
var folder7200 = 'c:/jdf_72/'; //_72

// Crash/Fallback assignments
exportFolderPS7700 = exportFolderPS9200_5;
var exportFolderCRASH = "//10.20.2.60/work/"; 
exportFolderPS8200 = exportFolderPS7700 = exportFolderPS9200_5 = exportFolderPS9200 = exportFolderPSsra = exportFolderPSkub = exportFolderCRASH;

folder9200 = folder7700 = folder7200;
folderSRA91 = folderKub = folder9200_5 = folderSRA;

var checkNotJdf = false;
var checkNotJdfCount = "";

// Ensure folders exist
if (!Folder(exportFolder).exists) new Folder(exportFolder).create();
if (!Folder(folderKub).exists) {
    folderKub = "//10.20.1.42/jdf/";
}
if (!Folder(folderSRA).exists) {
    folderSRA = "//10.20.1.39/jdf/";
}
if (!Folder(folder7700).exists) {
    folder7700 = "//10.20.1.37/JDF/";
}

// State Flags
var filename;
var white_lack = false;
var multi = false;
var konvlam = false;
var trubles = false;
var konv = false;
var NamePos = "w";
var filePS;
// var arrayJdf = []; // Removed in favor of immediate saving

// Material Lists
var no_lviv = [
    'Mnogo',
    'KASH',
    '\\(MKL\\)',
    '_curve',
    'fell',
    'KAR',
    'VUS',
    '\\(KONV\\)'
];

var mat_spec_lviv = [
    '/450_mel_(?!gl)/gi',
    '/350_mel_(?!gl)/gi',
    '/300_mel_(?!gl)/gi',
    '/250_mel_(?!gl)/gi'
];

var mat_spec_kyiv = [
    'Raf',
    'mel',
    'barh',
    'IL_2s_toile_m',
    '285_Dali_c',
    '285_SD_crystal',
    '285_SD_diamond',
    '285_SD_opal',
    '285_SD_dolomite',
    '285_SD_quartz',
    '285_Dali_b',
    '350_Flora_350',
    'Flora_anice_100',
    '330_Plike_330',
    '330_Plike_2s_red',
    '330_Plike_2s_grafite',
    '330_Plike_2s_brown',
    '330_Plike_2s_black',
    '330_Plike_2s_blue',
    '300_SG',
    'Iceblink_b',
    '250_Splendorlux_met_arg',
    '300_IL_2s_toile',
    '300_Sirio_White',
    '300_Sirio_Platinum',
    'savvibrite',
    'sinarvanda',
    'craft275',
    'craft300',
    '300_T_gesso',
    '300_T_crema',
    'Ispira_saggezza',
    'Ispira_fascino',
    'lapislazuli',
    'Bohui_m_250',
    'Uniboard_Cream_250',
    'Majes',
    'SD_silver',
    '290_Sirio_color_bruno',
    '280_Monnalisa',
    '80_ofset'
];

var mat_black = [
    '330_Plike_2s_grafite',
    '330_Plike_2s_black',
    '330_Plike_2s_red',
    '330_Plike_2s_brown',
    '240_Stardream_lapislazuli',
    '360_Ispira',
    '330_Plike_2s_blue',
    '300_Wild_black',
    '290_Sirio_tela_dark_blue',
    '300_Notturno_liscia',
    '360_Nettuno_blu_navy',
    '300_Dali_nero',
    'barh'
];

// Variables used in processing
var kubBrack = false;
var compMulti = false;
var sourceFolder = "";
var loadDlg = "";
