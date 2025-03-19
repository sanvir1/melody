const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Папка с HTML-файлами
const VERS_FOLDER = path.join(__dirname, 'vers');

// Маршрут для получения списка файлов
app.get('/files', (req, res) => {
    fs.readdir(VERS_FOLDER, (err, files) => {
        if (err) {
            return res.status(500).send('Ошибка при чтении папки');
        }
        // Фильтруем только HTML-файлы
        const htmlFiles = files.filter(file => file.endsWith('.html'));
        res.json(htmlFiles);
    });
});

// Статическая папка для HTML-файлов
app.use('/vers', express.static(VERS_FOLDER));

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
