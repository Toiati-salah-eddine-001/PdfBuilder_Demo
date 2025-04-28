const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('table1.pdf'));
const startX = 100;
const startY = 100;
const cellWidth = 150;
const cellHeight = 50;

// البيانات
const data = [
  ['خلية 1,1', 'خلية 1,2'],
  ['خلية 2,1', 'خلية 2,2']
];

// رسم الجدول
for (let row = 0; row < 2; row++) {
  for (let col = 0; col < 2; col++) {
    const x = startX + col * cellWidth;
    const y = startY + row * cellHeight;

    // مستطيل الخلية
    doc.rect(x, y, cellWidth, cellHeight).stroke();

    // نص وسط الخلية
    doc.text(data[row][col], x + 10, y + 15);
  }
}
// doc.rect(100, 100, 0, 0).stroke();
doc.end();