const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('test2.pdf'));
// __________text
doc.fontSize(25).text('Image',100,100);
// _________________image
doc.image('test.png',{
    fit:[100,200],
    align:'center',
    valign:"center",
    x:100, //ihedatyat men liser fhal align/
    y:100 //ihedatyat men lefou9 == valign/
})
// _____________________Shape
doc
  .moveTo(100, 100)     // x,y نقطة البداية
  .lineTo(300, 100)     // نقطة النهاية
  .stroke();            // يرسم الخط
  
 doc
  .circle(200, 300, 50) // (x المركز, y المركز, نصف القطر)
  .stroke();

  doc
  .rect(100, 150, 200, 100) // (x, y, العرض, الطول)
  .stroke();  

  doc
  .rect(50, 50, 200, 100)
  .fillColor('blue') //change all color like bg
  .fill(); 

//   change storck lone 
  doc
  .lineWidth(3)              // سمك الخط
  .strokeColor('green')      // اللون
  .rect(100, 400, 100, 50)
  .stroke();
//   ___________________________________________________Curves = lmohana :
// ____________________________________la Base 
// doc
//   .moveTo(x1, y1)                  // نقطة البداية
//   .bezierCurveTo(c1x, c1y, c2x, c2y, x2, y2) // المنحنى حتى النقطة النهاية
//   .stroke();
// ____________________________________________________________________
  doc
  .moveTo(100, 300)
  .quadraticCurveTo(250, 100, 400, 300)
  .stroke();

 doc.end()