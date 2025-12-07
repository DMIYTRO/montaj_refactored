# Тестовая установка AutoMontaj

Быстрая инструкция для тестирования автоматического мониторинга.

---

## 1. Создать тестовую папку

### Windows:

```batch
REM Создать тестовую папку
mkdir C:\temp\montaj_input

REM Создать тестовый PDF (скопировать любой существующий)
copy "C:\path\to\test.pdf" "C:\temp\montaj_input\test.pdf"
```

Или вручную:
1. Открыть Проводник
2. Создать папку `C:\temp\montaj_input\`
3. Скопировать в неё несколько тестовых PDF файлов

### macOS:

```bash
# Создать тестовую папку
mkdir -p ~/temp/montaj_input

# Скопировать тестовый PDF
cp ~/Documents/test.pdf ~/temp/montaj_input/
```

И изменить путь в AutoMontaj.jsx:
```javascript
sourceFolder: "/Users/macbook/temp/montaj_input/",
```

---

## 2. Настроить AutoMontaj.jsx

Откройте файл и проверьте настройки:

```javascript
var AUTO_CONFIG = {
    enabled: true,
    checkInterval: 300000,            // 5 минут
    sourceFolder: "C:/temp/montaj_input/",  // Тестовая папка
    runOnStartup: true,
    showNotifications: true,
    autoCloseDocuments: true,
    maxFilesPerRun: 50,

    workingHours: {
        enabled: false                 // 24/7 без ограничений
    }
};
```

**Для быстрого тестирования** измените интервал на 1 минуту:

```javascript
checkInterval: 60000,  // 1 минута (вместо 300000)
```

---

## 3. Установить в InDesign

### Windows:

```
1. Открыть папку Startup Scripts:
   %APPDATA%\Adobe\InDesign\Version XX.0\ru_RU\Scripts\Startup Scripts\

   Быстрый путь:
   - Win + R
   - Ввести: %APPDATA%\Adobe\InDesign
   - Найти нужную версию → Scripts → Startup Scripts

2. Скопировать файлы:
   - AutoMontaj.jsx
   - Config.jsx
   - Utils.jsx
   - Imposition.jsx
   - JDF.jsx
   - Logger.jsx

3. Перезапустить InDesign
```

### macOS:

```
1. Открыть папку:
   ~/Library/Preferences/Adobe InDesign/Version XX.0/ru_RU/Scripts/Startup Scripts/

2. Скопировать все .jsx файлы

3. Перезапустить InDesign
```

---

## 4. Запустить и проверить

### В ExtendScript Toolkit:

```
Window → Utilities → ExtendScript Toolkit
```

Должно появиться:

```
=================================================
AutoMontaj - Automatic Folder Monitor
=================================================
Source: C:/temp/montaj_input/
Interval: 300 seconds
Enabled: true
[AutoMontaj] Idle task created. Checking every 300 seconds
[AutoMontaj] Running initial check...
[AutoMontaj] Checking folder: C:/temp/montaj_input/
[AutoMontaj] Found 3 file(s)
[AutoMontaj] Processing: test1.pdf
[AutoMontaj] Processing: test2.pdf
[AutoMontaj] Finished: Success=2, Errors=0
=================================================
```

### Проверить Idle Task:

В ExtendScript Toolkit выполнить:

```javascript
app.idleTasks.everyItem().name
// Результат: ["AutoMontaj_Monitor"]

app.idleTasks.item(0).sleep
// Результат: 300000
```

---

## 5. Тестирование работы

### Добавить файл вручную:

1. Скопировать PDF в `C:\temp\montaj_input\`
2. Подождать 5 минут (или 1 минуту если изменили интервал)
3. Проверить - файл должен переместиться в `C:\temp\montaj_input\auto_processed\`

### Использовать панель управления:

```
InDesign → Automation → AutoMontaj Control Panel
```

Нажать **"Run Now"** для немедленной проверки.

---

## 6. Проверка логов

### watch_folder.log

```
C:\temp\montaj_input\watch_folder.log
```

Содержит:
```
[2024-12-07 15:00:00] === Folder Watcher Started ===
[2024-12-07 15:00:00] Found 2 file(s)
[2024-12-07 15:00:05] AutoMontaj finished: Success=2, Errors=0
```

### processing_log.txt

```
C:\temp\montaj_input\processing_log.txt
```

Детальный лог обработки каждого файла.

---

## 7. Возможные проблемы

### Папка не найдена

**Ошибка:**
```
[AutoMontaj] ERROR: Source folder does not exist: C:/temp/montaj_input/
```

**Решение:**
- Проверить что папка существует
- Проверить путь (прямые слеши `/` или обратные `\`)
- Создать папку вручную

### Outside working hours

**Ошибка:**
```
[AutoMontaj] Outside working hours. Skipping...
```

**Решение:**
Изменить в AutoMontaj.jsx:
```javascript
workingHours: {
    enabled: false  // Отключить ограничения
}
```

### Idle Task не работает

**Проверка:**
```javascript
// В ExtendScript Toolkit:
app.idleTasks.everyItem().name
```

**Если пусто** - скрипт не загрузился. Проверить:
- Файлы в правильной папке Startup Scripts
- Нет ошибок синтаксиса
- InDesign перезапущен

---

## 8. Переход на рабочую папку

После успешного тестирования изменить путь на реальный:

### Локальная папка:
```javascript
sourceFolder: "C:/work/input/",
```

### Сетевая папка (UNC):
```javascript
sourceFolder: "\\\\10.20.2.60\\work\\input\\",
```

### Сетевой диск:
```javascript
sourceFolder: "Z:/input/",  // Если подключен как диск Z:
```

---

## 9. Настройка для продакшена

```javascript
var AUTO_CONFIG = {
    enabled: true,
    checkInterval: 300000,            // 5 минут
    sourceFolder: "\\\\10.20.2.60\\work\\input\\",  // Рабочая папка
    runOnStartup: true,
    showNotifications: false,         // Отключить уведомления
    autoCloseDocuments: true,
    maxFilesPerRun: 50,

    workingHours: {
        enabled: true,                // Только в рабочее время
        start: 8,                     // 8:00
        end: 20,                      // 20:00
        daysOfWeek: [1, 2, 3, 4, 5]  // Пн-Пт
    }
};
```

---

## 10. Удаление (если нужно)

1. Удалить файлы из Startup Scripts
2. Перезапустить InDesign

Или в ExtendScript Toolkit:
```javascript
app.idleTasks.itemByName("AutoMontaj_Monitor").remove();
```

---

## Готово!

Теперь каждые 5 минут InDesign будет автоматически проверять папку и обрабатывать новые файлы.