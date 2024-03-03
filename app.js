
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('qr', async (qr) => {
  try {
    // Generar la imagen del código QR y guardarla en un archivo
    const qrCodeImage = await qrcode.toDataURL(qr, { errorCorrectionLevel: 'H' });
    const qrCodeBuffer = Buffer.from(qrCodeImage.split(',')[1], 'base64');
    fs.writeFileSync('codeqr.png', qrCodeBuffer);

    console.log('Código QR generado y guardado como codeqr.png');
  } catch (error) {
    console.error('Error al generar y guardar el código QR:', error);
  }
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', (message) => {
  if (message.body.toLowerCase() === 'oja') {
    message.reply('Hola bienvenid@ a mi tienda, para Ventas escribe ventas, para soporte escribe soporte');
  } else if (message.body.toLowerCase() === 'ventas') {
    message.reply('Tenemos celulares y Tables. escribe celular y te envio catalogo. escribe table y te envio catalogo');
  } else if (message.body.toLowerCase() === 'soporte') {
    message.reply('Llegaste al area de soporte, Escribe uno para celular para soporte de un celular. Escribe dos para table para soporte de una table');
  } else {
    message.reply('Lo siento, no entendí. Por favor, sigue las instrucciones.');
  }
});

client.initialize();


