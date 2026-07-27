/* ==========================================================================
   SAIMAN SAH PORTFOLIO — HIGH-PERFORMANCE SYNTHESIZED CYBER SOUND ENGINE
   ========================================================================== */

const CyberAudio = (() => {
  let audioCtx = null;
  // Default to unmuted unless explicitly set to muted by user
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

  // Force unlock Web Audio API context on any user interaction gesture
  function unlockAudio() {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }

  // Register user gesture unlocks
  ['pointerdown', 'click', 'touchstart', 'keydown', 'mousedown'].forEach(evt => {
    window.addEventListener(evt, unlockAudio, { passive: true });
  });

  function playClick() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      console.warn("CyberAudio error:", e);
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
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch (e) {
      console.warn("CyberAudio error:", e);
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
      osc.frequency.setValueAtTime(700 + Math.random() * 300, ctx.currentTime);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch (e) {
      console.warn("CyberAudio error:", e);
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

        gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.3);
      });
    } catch (e) {
      console.warn("CyberAudio error:", e);
    }
  }

  function playUnlockSuccess() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume();

      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
      });
    } catch (e) {
      console.warn("CyberAudio error:", e);
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
      btn.title = "Unmute Audio SFX";
      btn.classList.add('muted');
    } else {
      btn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
      btn.title = "Mute Audio SFX";
      btn.classList.remove('muted');
    }
  }

  function bindInteractiveSounds() {
    document.body.addEventListener('click', (e) => {
      unlockAudio();
      const target = e.target.closest('button, a, input, textarea, .cyber-btn, .social-chip, .whatsapp-float-btn, .gateway-option-card, .spec-tab-btn, .filter-pill, .close-btn, .stat-counter-card');
      if (target) {
        playClick();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('cyber_audio_muted') === null) {
      isMuted = false;
      localStorage.setItem('cyber_audio_muted', 'false');
    }
    updateAudioBtnUI();
    bindInteractiveSounds();

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
    playUnlockSuccess,
    toggleMute,
    isAudioMuted
  };
})();
