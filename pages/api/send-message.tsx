import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default function sendMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phone, message } = req.body;

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })
    .then(message => {
      res.status(200).json({ message });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
}