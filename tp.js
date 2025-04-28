const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ size: 'A4' });
doc.pipe(fs.createWriteStream('tp7.pdf'));

// ➤ إعدادات عامة
const marginX = 50;
let cursorY = 50;

// ➤ العنوان
doc.fontSize(40).text('LE TITRE DE TP', marginX, cursorY, { align: 'center' });
cursorY += 60; // مسافة بعد العنوان

// ➤ الفقرة
doc.fontSize(12).text(
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta reiciendis iure molestias debitis repellat neque est facilis architecto a nihil. Perspiciatis reiciendis fugiat nisi nihil impedit! Magni dicta nemo accusantium.',
  marginX,
  cursorY,
  { width: 500, align: 'justify' }
);
cursorY += 100; // مسافة بعد الفقرة

// ➤ الصورة داخل إطار
const imageWidth = 200;
const imageHeight = 200;
const imagePath = 'test.png';

// رسم إطار رمزي
doc
  .rect(marginX + 50 - 10, cursorY - 10, imageWidth + 20, imageHeight + 20)
  .strokeColor('#ccc')
  .stroke();

// الصورة
doc.image(imagePath, marginX + 50, cursorY, {
  fit: [imageWidth, imageHeight],
  align: 'center',
  valign: 'center'
});
cursorY += imageHeight + 300; // مسافة بعد الصورة

// ➤ الرسم البياني
const diarrames = () => {
  const originX = marginX;
  const originY = cursorY;
  const lengthX = 300;
  const lengthY = 200;

  // محور X
  doc
    .moveTo(originX, originY)
    .lineTo(originX + lengthX, originY)
    .strokeColor('black')
    .stroke();

  // محور Y
  doc
    .moveTo(originX, originY)
    .lineTo(originX, originY - lengthY)
    .strokeColor('black')
    .stroke();

  // عناوين المحاور
  doc.fontSize(10).text('X', originX + lengthX + 5, originY - 10);
  doc.fontSize(10).text('Y', originX - 15, originY - lengthY - 10);

  // نقاط
  const points = [
    [20, 30],
    [50, 100],
    [120, 150],
  ];

  points.forEach(([x, y]) => {
    const plotX = originX + x;
    const plotY = originY - y;

    doc.circle(plotX, plotY, 3).fillColor('red').fill();
    doc.fontSize(8).fillColor('black').text(`(${x},${y})`, plotX + 5, plotY - 10);
  });
};

diarrames();

doc.end();
