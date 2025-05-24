import dotenv from 'dotenv';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import {format, parseISO} from 'date-fns';

dotenv.config();

const token = process.env.WHATSAPP_TOKEN;
const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
const testPhoneNumber = process.env.WHATSAPP_TEST_PHONE_NUMBER;

if (!token || !phoneNumberId || !testPhoneNumber) {
  throw new Error('Missing required environment variables');
}

const sendHelloWorldTemplateMessage = async (phoneNumber: string) => {
  const response = await axios({
    method: 'POST',
    url: `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: 'template',
      template: {
        name: 'hello_world',
        language: {
          code: 'en_US',
        },
      },
    },
  });

  console.log(response.data);
};

const sendTemplateMessage = async (
  phoneNumber: string,
  firstName: string,
  appointmentDate: Date,
  serviceName: string,
  serviceDuration: number,
  servicePrice: number,
  professionalName: string,
  professionalAddress: string,
  professionalPhone: string,
  appointmentId: string
) => {
  const formattedDate = format(appointmentDate, "EEEE, MMMM d, yyyy 'at' h:mm a");
  const formattedDuration = `${serviceDuration} min`;
  const formattedPrice = `${servicePrice} AED`;

  const response = await axios({
    method: 'POST',
    url: `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: 'template',
      template: {
        name: 'appointment_confirmation',
        language: {
          code: 'en',
        },
        components: [
          {
            type: 'body',
            parameters: [
              {type: 'text', text: firstName}, // {{1}}
              {type: 'text', text: formattedDate}, // {{2}}
              {type: 'text', text: serviceName}, // {{3}}
              {type: 'text', text: formattedDuration}, // {{4}}
              {type: 'text', text: formattedPrice}, // {{5}}
              {type: 'text', text: professionalName}, // {{6}}
              {type: 'text', text: professionalAddress}, // {{7}}
              {type: 'text', text: professionalPhone}, // {{8}}
            ],
          },
          {
            type: 'button',
            sub_type: 'url',
            index: 0,
            parameters: [
              {type: 'text', text: appointmentId}, // {{1}}
            ],
          },
          {
            type: 'button',
            sub_type: 'url',
            index: 1,
            parameters: [
              {type: 'text', text: appointmentId}, // {{1}}
            ],
          },
        ],
      },
    },
  });

  console.log(response.data);
};

const sendDiscountTemplateMessage = async (phoneNumber: string) => {
  const response = await axios({
    method: 'POST',
    url: `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: 'template',
      template: {
        name: 'discount',
        language: {
          code: 'en',
        },
      },
    },
  });

  console.log(response.data);
};

const sendTextMessage = async (phoneNumber: string, message: string) => {
  const response = await axios({
    method: 'POST',
    url: `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    data: {
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: 'text',
      text: {
        body: message,
      },
    },
  });

  console.log(response.data);
};

const sendImageFromURLMessage = async (phoneNumber: string, imageUrl: string, caption: string) => {
  const response = await axios({
    method: 'POST',
    url: `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    data: {
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: 'image',
      image: {
        link: imageUrl,
        caption: caption,
      },
    },
  });

  console.log(response.data);
};

const sendImageFromUploadedMedia = async (phoneNumber: string, mediaId: string, caption: string) => {
  const response = await axios({
    method: 'POST',
    url: `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    data: {
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: 'image',
      image: {
        id: mediaId,
        caption: caption,
      },
    },
  });

  console.log(response.data);
};

const uploadImage = async (imagePath: string) => {
  const data = new FormData();
  data.append('messaging_product', 'whatsapp');
  data.append('file', fs.createReadStream(process.cwd() + '/' + imagePath), {
    contentType: 'image/jpeg',
  });
  data.append('type', 'image/jpeg');

  const response = await axios({
    method: 'POST',
    url: `https://graph.facebook.com/v22.0/${phoneNumberId}/media`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });

  console.log(response.data);

  return response.data.id;
};

// sendTemplateMessage(testPhoneNumber);
// sendTemplateMessage(testPhoneNumber, 'Jane', '2025-05-25', '10:00 AM', '123456');

// sendTextMessage(testPhoneNumber, 'Hello, how are you?');
// sendImageFromURLMessage(testPhoneNumber, 'https://dummyimage.com/600x400/000/fff.png&text=Schedium', 'This is a media message');

// uploadImage('assets/image.jpg');
// sendImageFromUploadedMedia(testPhoneNumber, '1364480238187540', 'This is a media message');

// sendDiscountTemplateMessage(testPhoneNumber);

sendHelloWorldTemplateMessage(testPhoneNumber);

// -------------------------------------------------------
// -------------------------------------------------------

// const formatPostgresTimestamp = (timestamp: string): string => {
//   const date = parseISO(timestamp);
//   return format(date, "EEEE, MMMM d, yyyy 'at' h:mm a");
// };

// const postgresTimestamp = '2025-02-15 10:30:00+00';
// console.log(formatPostgresTimestamp(postgresTimestamp));
