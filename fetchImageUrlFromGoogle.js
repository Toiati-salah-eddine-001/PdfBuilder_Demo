// const axios = require('axios');

// async function fetchImageUrlFromGoogle(query) {
//   const apiKey = 'AIzaSyB57QlhvIhdtXBGHTukHmRn-gq3GUgmLD8';
//   const cx = '84d8ff9c383cb4ba7';
//   const searchType = 'image';
//   const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}&searchType=${searchType}`;

//   try {
//     const response = await axios.get(url);
//     const items = response.data.items;
//     if (items && items.length > 0) {
//       return items[0].link;  
//     } else {
//       console.error('Not Found');
//       return null;
//     }
//   } catch (error) {
//     console.error('Errore handling Image ', error.message);
//     return null;
//   }
// }
// module.exports = fetchImageUrlFromGoogle;

// const axios = require('axios');

// async function fetchImageUrlFromGoogle(query) {
//   const apiKey = 'AIzaSyB57QlhvIhdtXBGHTukHmRn-gq3GUgmLD8';
//   const cx = '84d8ff9c383cb4ba7';
//   const searchType = 'image';
//   const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}&searchType=${searchType}`;

//   try {
//     const response = await axios.get(url);
//     const items = response.data.items;
//     if (items && items.length > 0) {
//       return items[0].link;
//     } else {
//       console.error('Image not found.');
//       return null;
//     }
//   } catch (error) {
//     if (error.response && error.response.status === 429) {
//       console.error('Request limit exceeded (Error 429). Try later!');
//     } else {
//       console.error('Error fetching image:', error.message);
//     }
//     return null;
//   }
// }

// module.exports = fetchImageUrlFromGoogle;

// const axios = require('axios');

// async function fetchImageUrlFromGoogle(query, retries = 3) {
//   const apiKey = 'AIzaSyB57QlhvIhdtXBGHTukHmRn-gq3GUgmLD8';
//   const cx = '84d8ff9c383cb4ba7';
//   const searchType = 'image';
//   const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}&searchType=${searchType}`;

//   try {
//     const response = await axios.get(url);
//     const items = response.data.items;
//     if (items && items.length > 0) {
//       return items[0].link;
//     } else {
//       console.error('Image not found.');
//       return null;
//     }
//   } catch (error) {
//     if (error.response && error.response.status === 429 && retries > 0) {
//       console.warn('Request limit hit, retrying after 5 seconds...');
//       await new Promise(resolve => setTimeout(resolve, 5000)); // انتظار 5 ثواني
//       return fetchImageUrlFromGoogle(query, retries - 1);
//     } else {
//       console.error('Error fetching image:', error.message);
//       return null;
//     }
//   }
// }

// module.exports = fetchImageUrlFromGoogle;



const axios = require('axios');

async function fetchImageUrlFromGoogle(query, retries = 3, delayMs = 5000) {
  const apiKey = 'AIzaSyB57QlhvIhdtXBGHTukHmRn-gq3GUgmLD8';
  const cx = '84d8ff9c383cb4ba7';
  const searchType = 'image';
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}&searchType=${searchType}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await axios.get(url);
      const items = response.data.items;
      if (items && items.length > 0) {
        return items[0].link; 
      } else {
        console.error('Not found');
        return null;
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        if (attempt < retries) {
          console.warn(`Request limit hit, retrying after ${delayMs / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          delayMs *= 2; // Exponential backoff
        } else {
          console.error('Limite');
          return null;
        }
      } else {
        console.error('Error', error.message);
        return null;
      }
    }
  }
}

module.exports = fetchImageUrlFromGoogle;


