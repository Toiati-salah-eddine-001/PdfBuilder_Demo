// // const PDFBuilder = require('./PDFBuilder');

// // const content = [
// //   { type: 'h1', text: 'مرحبا بكم في تقرير PDF', options: { color: 'blue' } },
// //   { type: 'h2', text: 'هذا عنوان فرعي' },
// //   { type: 'paragraph', text: 'هذا نص عادي يمكنك تخصيصه بلون أو حجم مختلف.' },
// //   {
// //     type: 'table',
// //     data: [
// //       ['اسم', 'العمر', 'المدينة'],
// //       ['أحمد', 30, 'الرباط'],
// //       ['سارة', 25, 'فاس'],
// //       ['مريم', 28, 'مراكش'],
// //     ],
// //     options: {
// //       columnWidths: [100, 50, 100], 
// //       rowHeight: 60,
// //       borderColor: 'black',
// //     }
// //   },
// //   { 
// //     type: 'image', 
// //     path: './test.png', 
// //     x: 100, 
// //     y: 200, 
// //     width: 150, 
// //     height: 100 
// //   },
// // ];

// // const builder = new PDFBuilder('output2.pdf');
// // builder.renderContent(content); 
// // builder.save();


















// const PDFBuilder = require('./PDFBuilder');
// const fetchImageUrlFromGoogle = require('./ImageGoogle');
// async function createPDF() {
//   const pdf = new PDFBuilder('output.pdf');
//   const imageUrl = await fetchImageUrlFromGoogle('corgi');
//   const content = [
//     { type: 'h1', text: 'مرحبا بك في PDF Kit' },
//     { type: 'paragraph', text: 'هذه فقرة تجريبية.' },
//     { type: 'image', path: './test.png', width: 100 },
//   ];
//   if(imageUrl){
//     content.push({
//        type: 'image', path: imageUrl, width: 150, height: 150 
//     })
//   }
//   await pdf.renderContent(content);
//   pdf.save();
// }

// createPDF();


const PDFBuilder = require('./PDFBuilder');
const fetchImageUrlFromGoogle = require('./fetchImageUrlFromGoogle');

async function createPDF() {
  const pdf = new PDFBuilder('output555555555555.pdf');

  const imageUrl = await fetchImageUrlFromGoogle('corgi');

  const content = [
    { type: 'h1', text: 'مرحبا بك في PDF Kit' },
    { type: 'paragraph', text: 'هذه فقرة تجريبية.' },
    { type: 'image', path: './test.png', width: 100 },
  ];

  if (imageUrl) {
    content.push({ type: 'image', path: imageUrl, width: 150, height: 150 });
  }

  await pdf.renderContent(content);
  pdf.save();
}

createPDF();
