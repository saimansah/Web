import React from "react";

export function AmbientMesh() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      {/* Top primary glow orb */}
      <div className="absolute -top-[20%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-500/10 via-purple-600/10 to-transparent blur-[120px]" />
      
      {/* Mid secondary ambient violet glow */}
      <div className="absolute top-[40%] -left-[15%] h-[500px] w-[600px] rounded-full bg-violet-600/10 blur-[140px]" />
      
      {/* Bottom ambient amber accent glow */}
      <div className="absolute -bottom-[10%] -right-[10%] h-[550px] w-[700px] rounded-full bg-amber-500/8 blur-[150px]" />
      
      {/* Fine cyber grid texture overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />
    </div>
  );
}
