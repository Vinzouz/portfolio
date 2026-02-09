// Layout racine minimal requis par Next.js
// Le vrai layout avec i18n est dans [locale]/layout.js
// Ce layout ne sera jamais utilisé car toutes les routes passent par [locale]
export default function RootLayout({ children }) {
  return children;
}
