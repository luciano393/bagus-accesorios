import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className='flex justify-between'>
        <h1>BAGUS</h1>
        <Link href={'/auth/login'}>Login</Link>
        <Link href={'/auth/register'}>Register</Link>
      </header>
      <section>
        <p>Bienvenido a Bagus accesorios</p>
      </section>
    </main>
  )
}
