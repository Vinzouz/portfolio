import { NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';

export async function POST(request) {
  const { locale } = await request.json();

  // Vérifier que la locale est valide
  if (!routing.locales.includes(locale)) {
    return NextResponse.json(
      { error: 'Invalid locale' },
      { status: 400 }
    );
  }

  // Créer la réponse avec le cookie
  const response = NextResponse.json({ success: true });
  
  // Définir le cookie pour la locale
  // next-intl utilise le cookie 'NEXT_LOCALE' par défaut avec la stratégie 'never'
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 an
    sameSite: 'lax',
    httpOnly: false, // Doit être accessible côté client pour next-intl
  });

  return response;
}

