// Web Audio API 音效模块
// 生成简单的合成音效，无需外部音频文件

let audioCtx = null;
let muted = false;

// 懒初始化 AudioContext（需要用户交互后才能创建）
function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// 从 localStorage 读取静音状态
try {
  muted = localStorage.getItem("dabie-muted") === "true";
} catch (e) {
  muted = false;
}

export function isMuted() {
  return muted;
}

export function toggleMute() {
  muted = !muted;
  try {
    localStorage.setItem("dabie-muted", muted);
  } catch (e) { /* ignore */ }
  return muted;
}

export function playClick() {
  if (muted) return;
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = 660;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) { /* audio not available */ }
}

export function playSuccess() {
  if (muted) return;
  try {
    const ctx = getCtx();
    const notes = [523, 659, 784]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.1;
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.start(t);
      osc.stop(t + 0.15);
    });
  } catch (e) { /* audio not available */ }
}

export function playError() {
  if (muted) return;
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "square";
    osc.frequency.value = 200;
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) { /* audio not available */ }
}

export function playCelebration() {
  if (muted) return;
  try {
    const ctx = getCtx();
    // 竖琴风格上行琶音
    const notes = [523, 659, 784, 1047, 1319, 1568]; // C5-G5-C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.start(t);
      osc.stop(t + 0.35);
    });
  } catch (e) { /* audio not available */ }
}

// 初始化音频上下文（在首次用户交互时调用）
export function initAudio() {
  try {
    getCtx();
  } catch (e) { /* audio not available */ }
}

// ===== 环境音效系统（简约版） =====
let _ambienceInterval = null;
let _bgmNodes = [];
let _audioFiles = {};

// 检查音频文件是否存在
function checkAudioFile(path) {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.oncanplaythrough = () => resolve(true);
    audio.onerror = () => resolve(false);
    audio.src = path;
  });
}

// 播放音频文件（带淡入淡出）
function playAudioFile(path, loop = false, volume = 0.3) {
  if (muted) return null;
  try {
    const audio = new Audio(path);
    audio.loop = loop;
    audio.volume = 0;
    audio.play().then(() => {
      audio.gainNode = null;
      // 淡入
      const ctx = getCtx();
      const source = ctx.createMediaElementSource(audio);
      const gain = ctx.createGain();
      source.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.5);
      audio.gainNode = gain;
    }).catch(() => {});
    _bgmNodes.push(audio);
    return audio;
  } catch (e) { return null; }
}

// 停止所有环境音效
export function stopAmbience() {
  if (_ambienceInterval) {
    clearInterval(_ambienceInterval);
    _ambienceInterval = null;
  }
  _bgmNodes.forEach(n => {
    try {
      if (n.pause) { n.pause(); n.currentTime = 0; }
      else if (n.state !== 'closed') { n.stop(); }
    } catch(e) {}
  });
  _bgmNodes = [];
}

// 森林环境音（优先使用音频文件，回退到合成）
export function playForestAmbience() {
  if (muted) return;
  stopAmbience();
  try {
    const ctx = getCtx();

    // 尝试播放音频文件
    const forestAudio = playAudioFile("/audio/forest-ambience.mp3", true, 0.2);
    if (forestAudio) return;

    // 回退：风声 + 鸟鸣
    const bufLen = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1) * 0.02;
    const wind = ctx.createBufferSource();
    wind.buffer = buf; wind.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass"; filter.frequency.value = 400;
    const windG = ctx.createGain(); windG.gain.value = 0.25;
    wind.connect(filter); filter.connect(windG); windG.connect(ctx.destination);
    wind.start();
    _bgmNodes.push(wind);

    // 鸟鸣
    function bird() {
      if (muted) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = "sine";
      const f = 1800 + Math.random() * 1200;
      o.frequency.setValueAtTime(f, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(f * 1.3, ctx.currentTime + 0.05);
      o.frequency.exponentialRampToValueAtTime(f * 0.8, ctx.currentTime + 0.1);
      g.gain.setValueAtTime(0.03, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.12);
    }
    _ambienceInterval = setInterval(() => { if (!muted && Math.random() > 0.5) bird(); }, 2500);
  } catch (e) {}
}

// 拼图页 BGM（优先使用音频文件，回退到和弦）
export function playPuzzleBGM() {
  if (muted) return;
  stopAmbience();
  try {
    const puzzleAudio = playAudioFile("/audio/puzzle-bgm.mp3", true, 0.15);
    if (puzzleAudio) return;

    const ctx = getCtx();
    const chords = [[261,329,392],[220,261,329],[174,220,261],[196,246,293]];
    let i = 0;
    function chord() {
      if (muted) return;
      const c = chords[i % chords.length];
      c.forEach(f => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.025, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
        o.start(ctx.currentTime); o.stop(ctx.currentTime + 1.5);
      });
      i++;
    }
    chord();
    _ambienceInterval = setInterval(chord, 2000);
  } catch (e) {}
}

// 危机页氛围（优先使用音频文件，回退到低频脉冲）
export function playCrisisAmbience() {
  if (muted) return;
  stopAmbience();
  try {
    const crisisAudio = playAudioFile("/audio/crisis-tension.mp3", true, 0.2);
    if (crisisAudio) return;

    const ctx = getCtx();
    function pulse() {
      if (muted) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = "sine"; o.frequency.value = 80;
      g.gain.setValueAtTime(0.05, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.6);
    }
    pulse();
    _ambienceInterval = setInterval(pulse, 1500);
  } catch (e) {}
}

// 证书页音乐（优先使用音频文件，回退到琶音）
export function playCertificateBGM() {
  if (muted) return;
  stopAmbience();
  try {
    const certAudio = playAudioFile("/audio/certificate-music.mp3", false, 0.25);
    if (certAudio) return;

    const ctx = getCtx();
    const melody = [523,659,784,880,1047,1175,1319,1568];
    melody.forEach((f, i) => {
      setTimeout(() => {
        if (muted) return;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.07, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.35);
      }, i * 150);
    });
  } catch (e) {}
}
