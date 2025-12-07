# Windows Task Scheduler Setup

Лучшее решение для автоматической обработки без блокировки InDesign.

---

## Как это работает:

```
Windows Task Scheduler (каждые 5 минут)
    ↓
Запускает run_process.bat
    ↓
Bat файл запускает InDesign + ProcessOnce.jsx
    ↓
Скрипт обрабатывает файлы и завершается
    ↓
InDesign свободен до следующего запуска
```

---

## Установка:

### 1. Настроить пути

Открыть `run_process.bat` и проверить путь к InDesign:

```batch
SET INDESIGN="C:\Program Files\Adobe\Adobe InDesign 2024\InDesign.exe"
```

Изменить на вашу версию:
- InDesign 2023: `...\Adobe InDesign 2023\InDesign.exe`
- InDesign 2022: `...\Adobe InDesign CC 2022\InDesign.exe`

### 2. Открыть Task Scheduler

1. Нажать `Win + R`
2. Ввести: `taskschd.msc`
3. Нажать Enter

### 3. Создать задачу

**General (Общие):**
- Name: `InDesign Montaj Auto`
- Description: `Automatic folder processing every 5 minutes`
- ☑ Run whether user is logged on or not
- ☑ Run with highest privileges

**Triggers (Триггеры):**
- New → On a schedule
- Settings:
  - Daily
  - Start: Сегодня, 00:00
  - ☑ Repeat task every: `5 minutes`
  - For a duration of: `Indefinitely`

**Actions (Действия):**
- New → Start a program
- Program/script: `C:\path\to\montaj_refactored\run_process.bat`
- Start in: `C:\path\to\montaj_refactored\`

**Conditions (Условия):**
- ☐ Start only if computer is on AC power (снять галочку)
- ☑ Wake computer to run (опционально)

**Settings (Параметры):**
- ☑ Allow task to be run on demand
- ☑ Run task as soon as possible after scheduled start is missed
- If task fails, restart every: `1 minute`
- Attempt to restart up to: `3 times`
- Stop task if runs longer than: `30 minutes`
- If running task does not end when requested: `Stop the existing instance`

### 4. Сохранить

Ввести пароль Windows если требуется.

---

## Управление:

### Запустить вручную:
1. Task Scheduler → найти задачу
2. Правый клик → Run

### Остановить:
- Правый клик → End

### Отключить:
- Правый клик → Disable

### Посмотреть историю:
- Правый клик → Properties → History

---

## Проверка работы:

### 1. Лог-файл:

`C:\temp\montaj_input\process.log`

```
[Sat Dec 07 2024 15:30:00] === Processing started ===
[Sat Dec 07 2024 15:30:01] Found 2 files
[Sat Dec 07 2024 15:30:01] Processing: test1.pdf
[Sat Dec 07 2024 15:30:05] Processing: test2.pdf
[Sat Dec 07 2024 15:30:10] Success: 2 | Errors: 0
[Sat Dec 07 2024 15:30:10] === Processing finished ===

[Sat Dec 07 2024 15:35:00] === Processing started ===
[Sat Dec 07 2024 15:35:01] No files to process
[Sat Dec 07 2024 15:35:01] === Processing finished ===
```

### 2. Task Scheduler History:

Task Scheduler → View → Show Task History

Покажет каждый запуск задачи.

---

## Настройка интервала:

### Каждую минуту:
```
Repeat task every: 1 minute
```

### Каждые 10 минут:
```
Repeat task every: 10 minutes
```

### Каждые 30 минут:
```
Repeat task every: 30 minutes
```

### Только в рабочее время:

Создать 2 триггера:
1. Daily, Start: 8:00, Repeat: 5 minutes, Duration: 12 hours
2. (закончится в 20:00)

Или создать несколько триггеров для разных дней/времени.

---

## Преимущества:

✅ **InDesign свободен** - можно работать между запусками
✅ **Надежно** - Task Scheduler очень стабилен
✅ **Логирование** - полная история в process.log
✅ **Управление** - легко включить/выключить
✅ **Не блокирует UI** - InDesign активен

---

## Недостатки:

⚠️ InDesign запускается/закрывается каждые 5 минут (можно оставить открытым)
⚠️ Нужны права администратора для настройки

---

## Оставить InDesign открытым:

Если хотите чтобы InDesign оставался открытым:

В `ProcessOnce.jsx` закомментировать:
```javascript
// app.quit();  // Не закрывать InDesign
```

Тогда скрипт просто обработает файлы и завершится, InDesign останется открытым.

---

## Альтернатива: Простой тест

Запустить `run_process.bat` вручную дважды:
1. Первый раз - откроется InDesign, обработает файлы
2. Второй раз (через минуту) - снова обработает

Если работает - настроить Task Scheduler.

---

## Готово!

Теперь файлы будут обрабатываться автоматически каждые 5 минут, и InDesign остается свободным для работы.