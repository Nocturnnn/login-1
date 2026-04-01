'use client';

import { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[420px] mx-auto mt-12"
    >
      {/* Glass Card */}
      <div className="bg-white/20 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/30 text-gray-900 relative overflow-hidden">
        
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-[2.5rem]" />

        {/* Top Icon */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[88px] h-[88px] bg-white rounded-full flex items-center justify-center shadow-xl border border-white/50 z-10">
          <User size={44} className="text-black" strokeWidth={2.5} />
        </div>

        <div className="mt-10 text-center relative z-10">
          <h1 className="text-[22px] font-extrabold tracking-widest text-black mb-2 uppercase">Login</h1>
          <p className="text-green-800 font-bold text-sm mb-8 drop-shadow-sm">Great! Now you can proceed</p>
        </div>

        <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
          {/* Username */}
          <div className="relative border-b border-black/30 focus-within:border-black transition-colors group">
            <input 
              type="text" 
              placeholder="Username" 
              className="w-full bg-transparent pb-2 outline-none text-black placeholder:text-black/60 font-bold text-lg"
              defaultValue="abc"
            />
            <User size={20} className="absolute right-2 top-1/2 -translate-y-1/2 text-black/70 group-focus-within:text-black transition-colors" strokeWidth={2.5} />
          </div>

          {/* Password */}
          <div className="relative border-b border-black/30 focus-within:border-black transition-colors group">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className="w-full bg-transparent pb-2 outline-none text-black placeholder:text-black/60 font-bold text-lg pr-16 tracking-widest"
              defaultValue="123"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-3">
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-black/70 hover:text-black transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} strokeWidth={2.5} /> : <Eye size={20} strokeWidth={2.5} />}
              </button>
              <Lock size={18} className="text-black/70 group-focus-within:text-black transition-colors" strokeWidth={2.5} />
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-black/80 pt-2">
            <label className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded-sm border-black/50 text-black focus:ring-black accent-black cursor-pointer" 
                defaultChecked 
              />
              Remember me
            </label>
            <a href="#" className="hover:text-black hover:underline transition-all">Forget Password ?</a>
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-6">
            <button 
              type="submit" 
              className="bg-black text-white px-10 py-2.5 rounded-full font-bold tracking-wide hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 active:translate-y-0"
            >
              Login
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center text-sm font-semibold text-black/80 relative z-10">
          Don't have an Account? <a href="#" className="text-black font-extrabold hover:underline ml-1">Sign up</a>
        </div>
      </div>
    </motion.div>
  );
}
