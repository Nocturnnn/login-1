import LoginForm from '@/components/LoginForm';

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-zinc-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-90"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=2564&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) brightness(1.1) contrast(1.2) saturate(1.3)',
          transform: 'scale(1.05)' // Prevent blurred edges from showing background color
        }}
      />
      
      {/* Overlay gradient for better readability and warmth */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-orange-500/10 to-amber-900/40 mix-blend-overlay" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <LoginForm />
      </div>
    </main>
  );
}
