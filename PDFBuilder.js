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


// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const axios = require('axios');
// const createChart = require('./createChart'); 

// class PDFBuilder {
//   constructor(outputPath, fontPath = './Amiri-Regular.ttf') {
//     this.doc = new PDFDocument();
//     this.doc.pipe(fs.createWriteStream(outputPath));

//     this.doc.registerFont('ArabicFont', fontPath);
//     this.doc.font('ArabicFont');
//   }

//   async renderContent(contentArray) {
//     for (const item of contentArray) {
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
//           case 'chart':
//             await this.addChart(item);
//             break;
//         default:
//           console.log(`Type ${item.type} not supported.`);
//       }
//     }
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
//   };


//   async addChart({ data, options = {} }) {
//     const chartImageBuffer = await createChart(data, options);

//     const x = options.x || 50;
//     const y = options.y || this.doc.y;
//     const width = options.width || 400;
//     const height = options.height || 300;

//     // إضافة الرسم البياني إلى الـ PDF
//     this.doc.image(chartImageBuffer, x, y, { width, height });
//     this.doc.moveDown();
//   }
//   ////
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


  async addImage({ path, x = 50, y = this.doc.y, width = 200, height , block = true }) {
    try {
      let imageSource = path;
  
      if (path.startsWith('http')) {
        const response = await axios.get(path, { responseType: 'arraybuffer' });
        imageSource = Buffer.from(response.data, 'binary');
      }
  
      if (block) {
        this.doc.image(imageSource, x, y, { width, height });
        this.doc.moveDown(5);
      } else {
        this.doc.image(imageSource, x, y, { width, height });
      }
    } catch (error) {
      console.error('Error handling image:', error.message);
    }
  };


  async addChart({ data, options = {} }) {
    const chartImageBuffer = await createChart(data, options);

    const x = options.x || 50;
    const y = options.y || this.doc.y;
    const width = options.width || 400;
    const height = options.height || 300;

    this.doc.image(chartImageBuffer, x, y, { width, height });
    this.doc.moveDown(20);
  }


  save() {
    this.doc.end();
  }
}

module.exports = PDFBuilder;
