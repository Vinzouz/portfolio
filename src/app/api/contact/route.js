import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { getRequestConfig } from 'next-intl/server';

const nodemailerConfig = process.env.NODEMAILER_CONFIG
  ? JSON.parse(process.env.NODEMAILER_CONFIG)
  : {};

const transporter = nodemailer.createTransport({
  ...nodemailerConfig,
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'development' ? false : true, // Désactive uniquement en développement
  },
});

const messages = {
  fr: {
    invalidRequest: 'Requête invalide',
    success: 'Message envoyé avec succès !',
    error: 'Erreur lors de l\'envoi du message.',
    validationError: 'Tous les champs sont requis.'
  },
  en: {
    invalidRequest: 'Invalid request',
    success: 'Message sent successfully!',
    error: 'Error sending the message.',
    validationError: 'All fields are required.'
  },
};

export async function POST(request) {
  try {
    const locale = request.cookies.get('NEXT_LOCALE').value || 'fr';

    const { email, subject, message, rgpdConsent, honeypot } = await request.json();

    // Vérification du honeypot
    if (honeypot) {
      return NextResponse.json(
        { message: messages[locale].invalidRequest },
        { status: 400 }
      );
    }

    // Validation des champs
    if (!email || !subject || !message || !rgpdConsent) {
      return NextResponse.json(
        { message: messages[locale].validationError },
        { status: 400 }
      );
    }

    // Envoi de l'email
    await transporter.sendMail({
      from: `"Formulaire de contact" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `Nouveau message : ${subject}`,
      text: `
        Email : ${email}
        Objet : ${subject}
        Message : ${message}
      `,
      html: `
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Objet :</strong> ${subject}</p>
        <p><strong>Message :</strong> ${message}</p>
      `,
    });

    return NextResponse.json(
      { message: messages[locale].success },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: messages[locale].error },
      { status: 500 }
    );
  }
}
