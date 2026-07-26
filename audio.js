/* ==========================================================================
   SAIMAN SAH PORTFOLIO — SYNTHESIZED WEB AUDIO API CYBER SOUND ENGINE
   ========================================================================== */

const CyberAudio = (() => {
  let audioCtx = null;
  let isMuted = localStorage.getItem('cyber_audio_muted') === 'true';

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playClick() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  function playSwitch() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(250, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  function playTerminalKey() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(600 + Math.random() * 200, ctx.currentTime);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  function playChime() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.25);
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  function toggleMute() {
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
