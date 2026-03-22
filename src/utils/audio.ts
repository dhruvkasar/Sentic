export class NewsroomAudio {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private typingInterval: number | null = null;
  private paperInterval: number | null = null;
  private gainNode: GainNode | null = null;

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = 0.2; // Overall volume
      this.gainNode.connect(this.ctx.destination);
    }
  }

  play() {
    if (this.isPlaying) return;
    this.init();
    if (this.ctx?.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.startTyping();
    this.startPaperRustle();
  }

  stop() {
    this.isPlaying = false;
    if (this.typingInterval) clearTimeout(this.typingInterval);
    if (this.paperInterval) clearTimeout(this.paperInterval);
    if (this.ctx) {
      this.ctx.suspend();
    }
  }

  private playTypewriterClick() {
    if (!this.ctx || !this.gainNode || !this.isPlaying) return;

    // Create a short burst of noise for the mechanical click
    const bufferSize = this.ctx.sampleRate * 0.05; // 50ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Bandpass filter to shape the noise into a "click" or "clack"
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2000 + Math.random() * 1500; // Vary the pitch slightly
    filter.Q.value = 1.2;

    const clickGain = this.ctx.createGain();
    clickGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    clickGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    noise.connect(filter);
    filter.connect(clickGain);
    clickGain.connect(this.gainNode);

    noise.start();
  }

  private startTyping() {
    let burstCount = 0;
    const type = () => {
      if (!this.isPlaying) return;
      this.playTypewriterClick();

      burstCount++;
      let nextDelay = 0;

      // Simulate human typing patterns: bursts of characters, then pauses
      if (burstCount > Math.random() * 12 + 4) {
        nextDelay = 300 + Math.random() * 600; // Pause between words
        burstCount = 0;
      } else {
        nextDelay = 50 + Math.random() * 70; // Fast typing within a word
      }

      this.typingInterval = window.setTimeout(type, nextDelay);
    };
    type();
  }

  private playPaperRustle() {
    if (!this.ctx || !this.gainNode || !this.isPlaying) return;
    
    const bufferSize = this.ctx.sampleRate * 0.6; // 600ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1);
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;

    // Lowpass filter to make it sound like thick paper, not static hiss
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(800, this.ctx.currentTime + 0.2);
    filter.frequency.linearRampToValueAtTime(200, this.ctx.currentTime + 0.6);

    const rustleGain = this.ctx.createGain();
    rustleGain.gain.setValueAtTime(0, this.ctx.currentTime);
    rustleGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.1);
    rustleGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

    noiseSource.connect(filter);
    filter.connect(rustleGain);
    rustleGain.connect(this.gainNode);

    noiseSource.start();
  }

  private startPaperRustle() {
    const rustle = () => {
      if (!this.isPlaying) return;
      this.playPaperRustle();
      const nextDelay = 4000 + Math.random() * 8000; // Occasional rustling
      this.paperInterval = window.setTimeout(rustle, nextDelay);
    };
    // Don't start immediately, wait a bit
    this.paperInterval = window.setTimeout(rustle, 2000 + Math.random() * 3000);
  }
}

export const audioService = new NewsroomAudio();
