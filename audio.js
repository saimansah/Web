/* ==========================================================================
   SAIMAN SAH PORTFOLIO — HIGH-PERFORMANCE SYNTHESIZED CYBER SOUND ENGINE v2.0
   Features: EV motor acceleration pitch-whine, hover micro-ticks,
   combustion engine rev, climb wind, summit chimes, glitch errors,
   and interactive audio triggers.
   ========================================================================== */

const CyberAudio = (() => {
  let audioCtx = null;
  let isMuted = localStorage.getItem('cyber_audio_muted') === 'true';
  let lastHoverTime = 0;

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

  // --- 1. BUTTON CLICK SFX ---
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

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      console.warn("CyberAudio error:", e);
    }
  }

  // --- 2. HOVER MICRO-TICK SFX ---
  function playHoverTick() {
    if (isMuted) return;
    const now = Date.now();
    if (now - lastHoverTime < 50) return; // Debounce rapid hover ticks
    lastHoverTime = now;

    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.012);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.012);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.012);
    } catch (e) {}
  }

  // --- 3. SWITCH MODE / PAGE TRANSITION SFX ---
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

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch (e) {
      console.warn("CyberAudio error:", e);
    }
  }

  // --- 4. TERMINAL CLI KEYPRESS SFX ---
  function playTerminalKey() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(750 + Math.random() * 250, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {}
  }

  // --- 5. CHIME SFX ---
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

        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.3);
      });
    } catch (e) {}
  }

  // --- 6. UNLOCK SUCCESS SFX ---
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

        gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
      });
    } catch (e) {}
  }

  // --- 7. GLITCH ERROR SFX ---
  function playGlitchError() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.setValueAtTime(110, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  }

  // --- 8. ELECTRIC VEHICLE MOTOR ACCELERATION SOUND ENGINE ---
  let evOsc1 = null;
  let evOsc2 = null;
  let evGain = null;

  function playEVMotorRev(ratio, isTopSpeed) {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume();

      const clampedRatio = Math.max(0, Math.min(1, ratio));
      // Futuristic EV harmonic pitch sweep (220Hz base -> 2200Hz max, 2.2x upper harmonic)
      const baseFreq = 220 + (clampedRatio * 1980) + (isTopSpeed ? 120 : 0);
      const harmonicFreq = baseFreq * 2.2;
      const targetVolume = clampedRatio > 0.01 ? 0.04 + (clampedRatio * 0.22) : 0;

      if (!evOsc1) {
        evOsc1 = ctx.createOscillator();
        evOsc2 = ctx.createOscillator();
        evGain = ctx.createGain();

        evOsc1.type = 'sine';
        evOsc2.type = 'triangle';

        evOsc1.frequency.setValueAtTime(220, ctx.currentTime);
        evOsc2.frequency.setValueAtTime(484, ctx.currentTime);
        evGain.gain.setValueAtTime(0, ctx.currentTime);

        evOsc1.connect(evGain);
        evOsc2.connect(evGain);
        evGain.connect(ctx.destination);

        evOsc1.start();
        evOsc2.start();
      }

      evOsc1.frequency.cancelScheduledValues(ctx.currentTime);
      evOsc2.frequency.cancelScheduledValues(ctx.currentTime);
      evGain.gain.cancelScheduledValues(ctx.currentTime);

      evOsc1.frequency.setTargetAtTime(baseFreq, ctx.currentTime, 0.04);
      evOsc2.frequency.setTargetAtTime(harmonicFreq, ctx.currentTime, 0.04);
      evGain.gain.setTargetAtTime(targetVolume, ctx.currentTime, 0.04);

    } catch (e) {
      console.warn("EV motor sound error:", e);
    }
  }

  function stopEVMotorRev() {
    if (evGain && audioCtx) {
      try {
        evGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.08);
      } catch (e) {}
    }
  }

  // --- 9. COMBUSTION ENGINE REV SOUND ENGINE ---
  let revOsc = null;
  let revGain = null;

  function playCombustionEngineRev(ratio, isTopSpeed) {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume();

      const clampedRatio = Math.max(0, Math.min(1, ratio));
      const targetFreq = 110 + (clampedRatio * 740) + (isTopSpeed ? 40 : 0);
      const targetVolume = clampedRatio > 0.02 ? 0.05 + (clampedRatio * 0.18) : 0;

      if (!revOsc) {
        revOsc = ctx.createOscillator();
        revGain = ctx.createGain();

        revOsc.type = 'sawtooth';
        revOsc.frequency.setValueAtTime(110, ctx.currentTime);
        revGain.gain.setValueAtTime(0, ctx.currentTime);

        revOsc.connect(revGain);
        revGain.connect(ctx.destination);
        revOsc.start();
      }

      revOsc.frequency.cancelScheduledValues(ctx.currentTime);
      revGain.gain.cancelScheduledValues(ctx.currentTime);

      revOsc.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.05);
      revGain.gain.setTargetAtTime(targetVolume, ctx.currentTime, 0.05);

    } catch (e) {
      console.warn("Engine sound error:", e);
    }
  }

  function stopCombustionEngineRev() {
    if (revGain && audioCtx) {
      try {
        revGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
      } catch (e) {}
    }
  }

  // Unified engine rev switcher (EV vs Combustion)
  function playEngineRev(ratio, isTopSpeed, vehicleType = 'atto3') {
    if (vehicleType === 'defender') {
      stopEVMotorRev();
      playCombustionEngineRev(ratio, isTopSpeed);
    } else {
      stopCombustionEngineRev();
      playEVMotorRev(ratio, isTopSpeed);
    }
  }

  function stopEngineRev() {
    stopEVMotorRev();
    stopCombustionEngineRev();
  }

  // --- 10. TOP SPEED & SUMMIT CHIMES ---
  function playTopSpeedChime() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume();

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.28, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.4);
      });
    } catch (e) {}
  }

  let windOsc = null;
  let windGain = null;

  function playClimbWind(ratio, isPeak) {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume();

      const clampedRatio = Math.max(0, Math.min(1, ratio));
      const targetFreq = 180 + (clampedRatio * 480) + (isPeak ? 50 : 0);
      const targetVolume = clampedRatio > 0.02 ? 0.04 + (clampedRatio * 0.16) : 0;

      if (!windOsc) {
        windOsc = ctx.createOscillator();
        windGain = ctx.createGain();

        windOsc.type = 'triangle';
        windOsc.frequency.setValueAtTime(180, ctx.currentTime);
        windGain.gain.setValueAtTime(0, ctx.currentTime);

        windOsc.connect(windGain);
        windGain.connect(ctx.destination);
        windOsc.start();
      }

      windOsc.frequency.cancelScheduledValues(ctx.currentTime);
      windGain.gain.cancelScheduledValues(ctx.currentTime);

      windOsc.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.08);
      windGain.gain.setTargetAtTime(targetVolume, ctx.currentTime, 0.08);

    } catch (e) {}
  }

  function stopClimbWind() {
    if (windGain && audioCtx) {
      try {
        windGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.12);
      } catch (e) {}
    }
  }

  function playPeakSummitChime() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume();

      const notes = [293.66, 369.99, 440.00, 587.33, 739.99, 880.00]; // D4, F#4, A4, D5, F#5, A5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.28, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.5);
      });
    } catch (e) {}
  }

  // --- 11. MUTE CONTROLLER & BINDINGS ---
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
    // Click sound binding
    document.body.addEventListener('click', (e) => {
      unlockAudio();
      const target = e.target.closest('button, a, input, textarea, .cyber-btn, .social-chip, .whatsapp-float-btn, .gateway-option-card, .spec-tab-btn, .filter-pill, .close-btn, .stat-counter-card, .pedal-btn, .quick-alt-btn');
      if (target) {
        playClick();
      }
    });

    // Hover micro-tick sound binding
    document.body.addEventListener('mouseover', (e) => {
      const hoverTarget = e.target.closest('.cyber-btn, .nav-links a, .gateway-option-card, .dni-feature-card, .skill-box, .game-item, .c-item, .social-chip, .spec-tab-btn, .filter-pill, .stat-counter-card, .quick-alt-btn');
      if (hoverTarget) {
        playHoverTick();
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
    playHoverTick,
    playSwitch,
    playTerminalKey,
    playChime,
    playUnlockSuccess,
    playGlitchError,
    playEVMotorRev,
    stopEVMotorRev,
    playEngineRev,
    stopEngineRev,
    playTopSpeedChime,
    playClimbWind,
    stopClimbWind,
    playPeakSummitChime,
    toggleMute,
    isAudioMuted
  };
})();
