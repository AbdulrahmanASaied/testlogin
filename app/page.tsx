import { redirect } from 'next/navigation'
// Import el redirect function mn Next.js 3shan t-handle el client-side routing.

export default function Home() {
// Define el Home component, da el default landing page lel application.

  redirect('/login')
  // El redirect function b-tewad el user 3ala `/login` page automatically.
  // El mafhom hena en el `/` page mafhoush UI w y7awel el user lel login page directly.
}
