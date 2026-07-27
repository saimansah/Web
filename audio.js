/* ==========================================================================
   SAIMAN SAH PORTFOLIO — SYNTHESIZED WEB AUDIO API CYBER SOUND ENGINE
   ========================================================================== */

const CyberAudio = (() => {
  let audioCtx = null;
  // Default to unmuted unless explicitly muted by user
  let isMuted = localStorage.getItem('cyber_audio_muted') === 'true';

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  // Unlock Audio Context on any user interaction gesture (Browser autoplay security policy)
  function unlockAudio() {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }

  window.addEventListener('pointerdown', unlockAudio, { passive: true });
  window.addEventListener('keydown', unlockAudio, { passive: true });
  window.addEventListener('click', unlockAudio, { passive: true });

  function playClick() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio play error:", e);
    }
  }

  function playSwitch() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      console.warn("Audio play error:", e);
    }
  }

  function playTerminalKey() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(650 + Math.random() * 250, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {
      console.warn("Audio play error:", e);
    }
  }

  function playChime() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume();

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.28);
      });
    } catch (e) {
      console.warn("Audio play error:", e);
    }
  }

  function toggleMute() {
    unlockAudio();
    isMuted = !isMuted;
    localStorage.setItem('cyber_audio_muted', isMuted);
    updateAudioBtnUI();
    if (!isMuted) playClick();
    return isMuted;
  }

  function isAudioMuted() {
    return isMuted;
  }

  function updateAudioBtnUI() {
    const btn = document.getElementById('btn-audio-toggle');
    if (!btn) return;

    if (isMuted) {
      btn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
      btn.title = "Unmute Audio Sfx";
      btn.classList.add('muted');
    } else {
      btn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
      btn.title = "Mute Audio Sfx";
      btn.classList.remove('muted');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Reset any muted localStorage state to unmuted default if not explicitly set
    if (localStorage.getItem('cyber_audio_muted') === null) {
      isMuted = false;
      localStorage.setItem('cyber_audio_muted', 'false');
    }
    updateAudioBtnUI();
    const btn = document.getElementById('btn-audio-toggle');
    if (btn) {
      btn.addEventListener('click', toggleMute);
    }
  });

  return {
    playClick,
    playSwitch,
    playTerminalKey,
    playChime,
    toggleMute,
    isAudioMuted
  };
})();
