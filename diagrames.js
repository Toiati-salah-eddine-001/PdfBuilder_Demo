const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('diagram_axes.pdf'));

// 🎯 إعدادات المحاور
const originX = 100;
const originY = 400;
const lengthX = 300;
const lengthY = 300;

// 🟩 رسم المحور X
doc
  .moveTo(originX, originY)
  .lineTo(originX + lengthX, originY)
  .strokeColor('black')
  .stroke();

// 🟩 رسم المحور Y
doc
  .moveTo(originX, originY)
  .lineTo(originX, originY - lengthY)
  .strokeColor('black')
  .stroke();

// ✍️ وضع أسماء على المحاور
doc.fontSize(10).text('X', originX + lengthX + 5, originY - 10);
doc.fontSize(10).text('Y', originX - 15, originY - lengthY - 10);

// 🟥 نقاط نرسموها فالرسم (x, y)
const points = [
  [20, 30],
  [50, 100],
  [120, 150],
];

// 🖊️ رسم النقاط فوق الرسم البياني
points.forEach(([x, y]) => {
  const plotX = originX + x;
  const plotY = originY - y;

  // دائرة صغيرة في النقطة
  doc.circle(plotX, plotY, 3).fillColor('red').fill();

  // قيمة النقطة
  doc.fontSize(8).fillColor('black').text(`(${x},${y})`, plotX + 5, plotY - 10);
});

doc.end();
