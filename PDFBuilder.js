// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const axios = require('axios')

// class PDFBuilder {
//   constructor(outputPath , fontPath = './Amiri-Regular.ttf') {
//     this.doc = new PDFDocument();
//     this.doc.pipe(fs.createWriteStream(outputPath));

//     // _________Add Arabic :
//     this.doc.registerFont('ArabicFont', fontPath);
//     this.doc.font('ArabicFont'); 
//   }

  
//    renderContent(contentArray) {
//     contentArray.forEach(item => {
//       switch (item.type) {
//         case 'h1':
//           this.addH1(item.text, item.options);
//           break;
//         case 'h2':
//           this.addH2(item.text, item.options);
//           break;
//         case 'paragraph':
//           this.addParagraph(item.text, item.options);
//           break;
//           case 'table':
//             this.addTable(item.data, item.options);
//             break;
//             case 'image':
//                this.addImage(item);
//               break;
//         // future: table, image, diagram...
//         default:
//           console.log(`Type ${item.type} not supported.`);
//       }
//     });
//   }

//   addH1(text, options = {}) {
//     this.doc
//       .fontSize(options.fontSize || 24)
//       .fillColor(options.color || 'black')
//       .text(text, {
//         align: options.align || 'left',
//         underline: options.underline || false,
//       });
//     this.doc.moveDown();
//   }

//   addH2(text, options = {}) {
//     this.doc
//       .fontSize(options.fontSize || 18)
//       .fillColor(options.color || 'black')
//       .text(text, {
//         align: options.align || 'left',
//         underline: options.underline || false,
//       });
//     this.doc.moveDown();
//   }

//   addParagraph(text, options = {}) {
//     this.doc
//       .fontSize(options.fontSize || 12)
//       .fillColor(options.color || 'black')
//       .text(text, {
//         align: options.align || 'left',
//       });
//     this.doc.moveDown();
//   }


   
//    addTable(data, options = {}) {
//     const { columnWidths = [], rowHeight = 20, borderColor = 'black' } = options;
//     const margin = 50; 
//     const startY = this.doc.y;

//     // رسم الأعمدة
//     data.forEach((row, rowIndex) => {
//       row.forEach((cell, colIndex) => {
//         const x = margin + (colIndex === 0 ? 0 : columnWidths.slice(0, colIndex).reduce((acc, width) => acc + width, 0));
//         const width = columnWidths[colIndex] || 100; 
//         const y = startY + rowIndex * rowHeight;
        
        
//         this.doc
//           .rect(x, y, width, rowHeight)
//           .strokeColor(borderColor)
//           .stroke();

        
//         this.doc
//           .fontSize(12)
//           .fillColor('black')
//           .text(cell, x + 5, y + 5, { width: width - 10, align: 'center' });
//       });
//     });

//     this.doc.moveDown();
//   }

//   // ________________Add image : 

//   // ✅ تعديل دالة addImage لدعم URL
//   async addImage({ path, x = 50, y = this.doc.y, width = 200, height }) {
//     try {
//       let imageSource = path;

//       if (path.startsWith('http')) {
//         // جلب الصورة من الإنترنت
//         const response = await axios.get(path, { responseType: 'arraybuffer' });
//         imageSource = Buffer.from(response.data, 'binary');
//       }

//       this.doc.image(imageSource, x, y, {
//         width,
//         height,
//       });
//       this.doc.moveDown();
//     } catch (error) {
//       console.error('Errore handeling image', error);
//     }
//   }
//   save() {
//     this.doc.end();
//   }
// }

// module.exports = PDFBuilder;




// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const axios = require('axios');

// class PDFBuilder {
//   constructor(outputPath, fontPath = './Amiri-Regular.ttf') {
//     this.doc = new PDFDocument();
//     this.doc.pipe(fs.createWriteStream(outputPath));

//     this.doc.registerFont('ArabicFont', fontPath);
//     this.doc.font('ArabicFont');
//   }

//   renderContent(contentArray) {
//     contentArray.forEach(async (item) => {
//       switch (item.type) {
//         case 'h1':
//           this.addH1(item.text, item.options);
//           break;
//         case 'h2':
//           this.addH2(item.text, item.options);
//           break;
//         case 'paragraph':
//           this.addParagraph(item.text, item.options);
//           break;
//         case 'table':
//           this.addTable(item.data, item.options);
//           break;
//         case 'image':
//           await this.addImage(item);
//           break;
//         default:
//           console.log(`Type ${item.type} not supported.`);
//       }
//     });
//   }

//   addH1(text, options = {}) {
//     this.doc
//       .fontSize(options.fontSize || 24)
//       .fillColor(options.color || 'black')
//       .text(text, { align: options.align || 'left', underline: options.underline || false });
//     this.doc.moveDown();
//   }

//   addH2(text, options = {}) {
//     this.doc
//       .fontSize(options.fontSize || 18)
//       .fillColor(options.color || 'black')
//       .text(text, { align: options.align || 'left', underline: options.underline || false });
//     this.doc.moveDown();
//   }

//   addParagraph(text, options = {}) {
//     this.doc
//       .fontSize(options.fontSize || 12)
//       .fillColor(options.color || 'black')
//       .text(text, { align: options.align || 'left' });
//     this.doc.moveDown();
//   }

//   addTable(data, options = {}) {
//     const { columnWidths = [], rowHeight = 20, borderColor = 'black' } = options;
//     const margin = 50;
//     const startY = this.doc.y;

//     data.forEach((row, rowIndex) => {
//       row.forEach((cell, colIndex) => {
//         const x = margin + (colIndex === 0 ? 0 : columnWidths.slice(0, colIndex).reduce((acc, width) => acc + width, 0));
//         const width = columnWidths[colIndex] || 100;
//         const y = startY + rowIndex * rowHeight;

//         this.doc
//           .rect(x, y, width, rowHeight)
//           .strokeColor(borderColor)
//           .stroke();

//         this.doc
//           .fontSize(12)
//           .fillColor('black')
//           .text(cell, x + 5, y + 5, { width: width - 10, align: 'center' });
//       });
//     });

//     this.doc.moveDown();
//   }

//   async addImage({ path, x = 50, y = this.doc.y, width = 200, height }) {
//     try {
//       let imageSource = path;
//       if (path.startsWith('http')) {
//         const response = await axios.get(path, { responseType: 'arraybuffer' });
//         imageSource = Buffer.from(response.data, 'binary');
//       }
//       this.doc.image(imageSource, x, y, { width, height });
//       this.doc.moveDown();
//     } catch (error) {
//       console.error('Error handling image:', error.message);
//     }
//   }

//   save() {
//     this.doc.end();
//   }
// }

// module.exports = PDFBuilder;


const PDFDocument = require('pdfkit');
const fs = require('fs');
const axios = require('axios');
const createChart = require('./createChart'); 

class PDFBuilder {
  constructor(outputPath, fontPath = './Amiri-Regular.ttf') {
    this.doc = new PDFDocument();
    this.doc.pipe(fs.createWriteStream(outputPath));

    this.doc.registerFont('ArabicFont', fontPath);
    this.doc.font('ArabicFont');
  }

  async renderContent(contentArray) {
    for (const item of contentArray) {
      switch (item.type) {
        case 'h1':
          this.addH1(item.text, item.options);
          break;
        case 'h2':
          this.addH2(item.text, item.options);
          break;
        case 'paragraph':
          this.addParagraph(item.text, item.options);
          break;
        case 'table':
          this.addTable(item.data, item.options);
          break;
        case 'image':
          await this.addImage(item);
          break;
          case 'chart':
            await this.addChart(item);
            break;
        default:
          console.log(`Type ${item.type} not supported.`);
      }
    }
  }

  addH1(text, options = {}) {
    this.doc
      .fontSize(options.fontSize || 24)
      .fillColor(options.color || 'black')
      .text(text, { align: options.align || 'left', underline: options.underline || false });
    this.doc.moveDown();
  }

  addH2(text, options = {}) {
    this.doc
      .fontSize(options.fontSize || 18)
      .fillColor(options.color || 'black')
      .text(text, { align: options.align || 'left', underline: options.underline || false });
    this.doc.moveDown();
  }

  addParagraph(text, options = {}) {
    this.doc
      .fontSize(options.fontSize || 12)
      .fillColor(options.color || 'black')
      .text(text, { align: options.align || 'left' });
    this.doc.moveDown();
  }

  addTable(data, options = {}) {
    const { columnWidths = [], rowHeight = 20, borderColor = 'black' } = options;
    const margin = 50;
    const startY = this.doc.y;

    data.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const x = margin + (colIndex === 0 ? 0 : columnWidths.slice(0, colIndex).reduce((acc, width) => acc + width, 0));
        const width = columnWidths[colIndex] || 100;
        const y = startY + rowIndex * rowHeight;

        this.doc
          .rect(x, y, width, rowHeight)
          .strokeColor(borderColor)
          .stroke();

        this.doc
          .fontSize(12)
          .fillColor('black')
          .text(cell, x + 5, y + 5, { width: width - 10, align: 'center' });
      });
    });

    this.doc.moveDown();
  }

  async addImage({ path, x = 50, y = this.doc.y, width = 200, height }) {
    try {
      let imageSource = path;
      if (path.startsWith('http')) {
        const response = await axios.get(path, { responseType: 'arraybuffer' });
        imageSource = Buffer.from(response.data, 'binary');
      }
      this.doc.image(imageSource, x, y, { width, height });
      this.doc.moveDown();
    } catch (error) {
      console.error('Error handling image:', error.message);
    }
  };

  ///diagrames :
  // addBarChart(data, options = {}) {
  //   const {
  //     x = 50,
  //     y = this.doc.y,
  //     width = 400,
  //     height = 300,
  //     barWidth = 20,
  //     gap = 20,
  //     userColor = 'blue',
  //     revenueColor = 'orange',
  //   } = options;

  //   const labels = data.map(item => item.label);
  //   const users = data.map(item => item.users);
  //   const revenues = data.map(item => item.revenue);

  //   const maxValue = Math.max(...users, ...revenues);

  //   const chartBottom = y + height;
  //   const unitHeight = height / maxValue;

  //   data.forEach((item, index) => {
  //     const groupX = x + index * (2 * barWidth + gap);

  //     // رسم عمود Users
  //     const userBarHeight = item.users * unitHeight;
  //     this.doc
  //       .rect(groupX, chartBottom - userBarHeight, barWidth, userBarHeight)
  //       .fill(userColor);

  //     // رسم عمود Revenue
  //     const revenueBarHeight = item.revenue * unitHeight;
  //     this.doc
  //       .rect(groupX + barWidth, chartBottom - revenueBarHeight, barWidth, revenueBarHeight)
  //       .fill(revenueColor);

  //     // كتابة Label تحت الأعمدة
  //     this.doc
  //       .fontSize(10)
  //       .fillColor('black')
  //       .text(item.label, groupX, chartBottom + 5, {
  //         width: 2 * barWidth,
  //         align: 'center',
  //       });
  //   });

  //   this.doc.moveDown(4);
  // }
  // async addChart({ data, options = {} }) {
  //   const { x = 50, y = this.doc.y, width = 400, height = 300, userColor = 'blue', revenueColor = 'orange' } = options;
  
  //   const chartX = x;
  //   const chartY = y;
  //   const chartWidth = width;
  //   const chartHeight = height;
  
  //   const labels = data.map(item => item.label);
  //   const users = data.map(item => item.users);
  //   const revenues = data.map(item => item.revenue);
  
  //   const maxYValue = Math.max(...users, ...revenues);
  
  //   const barWidth = chartWidth / (labels.length * 3);
  //   const spacing = barWidth;
  
  //   let currentX = chartX;
  
  //   // رسم الأعمدة
  //   labels.forEach((label, index) => {
  //     const userHeight = (users[index] / maxYValue) * chartHeight;
  //     const revenueHeight = (revenues[index] / maxYValue) * chartHeight;
  
  //     // عمود المستخدمين
  //     this.doc
  //       .fillColor(userColor)
  //       .rect(currentX, chartY + chartHeight - userHeight, barWidth, userHeight)
  //       .fill();
  
  //     // عمود الإيرادات
  //     this.doc
  //       .fillColor(revenueColor)
  //       .rect(currentX + barWidth + spacing, chartY + chartHeight - revenueHeight, barWidth, revenueHeight)
  //       .fill();
  
  //     // كتابة اسم التصنيف تحت الأعمدة
  //     this.doc
  //       .fillColor('black')
  //       .fontSize(10)
  //       .text(label, currentX, chartY + chartHeight + 5, {
  //         width: barWidth * 2 + spacing,
  //         align: 'center'
  //       });
  
  //     currentX += (barWidth * 2) + (spacing * 2);
  //   });
  
  //   // رسم المحور Y
  //   this.doc
  //     .moveTo(chartX - 10, chartY)
  //     .lineTo(chartX - 10, chartY + chartHeight)
  //     .stroke();
  
  //   // رسم المحور X
  //   this.doc
  //     .moveTo(chartX - 10, chartY + chartHeight)
  //     .lineTo(chartX + chartWidth + 20, chartY + chartHeight)
  //     .stroke();
  
  //   // عناوين المحاور
  //   this.doc
  //     .fontSize(12)
  //     .fillColor('black')
  //     .text('الزمن (الأرباع)', chartX + chartWidth / 2 - 30, chartY + chartHeight + 40);
  
  //   this.doc
  //     .rotate(-90, { origin: [chartX - 40, chartY + chartHeight / 2] })
  //     .fontSize(12)
  //     .text('عدد المستخدمين / الإيرادات', chartX - 40, chartY + chartHeight / 2, {
  //       align: 'center'
  //     })
  //     .rotate(90, { origin: [chartX - 40, chartY + chartHeight / 2] });
  
  //   // كتابة القيم على محور Y
  //   const steps = 5;
  //   for (let i = 0; i <= steps; i++) {
  //     const value = Math.round((maxYValue / steps) * i);
  //     const yPosition = chartY + chartHeight - (chartHeight / steps) * i;
  
  //     this.doc
  //       .fontSize(8)
  //       .fillColor('black')
  //       .text(value.toString(), chartX - 30, yPosition - 5, { width: 20, align: 'right' });
  //   }
  
  //   this.doc.moveDown();
  // }

  async addChart({ data, options = {} }) {
    const chartImageBuffer = await createChart(data, options);

    const x = options.x || 50;
    const y = options.y || this.doc.y;
    const width = options.width || 400;
    const height = options.height || 300;

    // إضافة الرسم البياني إلى الـ PDF
    this.doc.image(chartImageBuffer, x, y, { width, height });
    this.doc.moveDown();
  }
  ////
  save() {
    this.doc.end();
  }
}

module.exports = PDFBuilder;
