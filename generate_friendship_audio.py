import wave
import struct
import math
import os

sample_rate = 44100

def get_freq(note_name):
    notes = {'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11}
    name = note_name[:-1]
    octave = int(note_name[-1])
    semitones = notes[name] + (octave - 4) * 12 - 9
    return 440.0 * (2.0 ** (semitones / 12.0))

# Synthesis helper for acoustic plucked string / bell / piano
def render_track(total_seconds):
    total_samples = int(sample_rate * total_seconds)
    buffer = [0.0] * total_samples

    def add_note(start_time, duration, freq, volume=0.3, instrument='guitar'):
        start_idx = int(start_time * sample_rate)
        note_samples = int(duration * sample_rate)
        if start_idx >= total_samples:
            return

        end_idx = min(start_idx + note_samples, total_samples)
        length = end_idx - start_idx

        for i in range(length):
            t = i / sample_rate
            if instrument == 'guitar':
                # Plucked acoustic tone with harmonics and decay
                env = math.exp(-3.5 * t / max(duration, 0.4))
                wave_val = (
                    0.55 * math.sin(2 * math.pi * freq * t) +
                    0.25 * math.sin(2 * math.pi * 2 * freq * t) * math.exp(-t * 2) +
                    0.15 * math.sin(2 * math.pi * 3 * freq * t) * math.exp(-t * 4) +
                    0.05 * math.sin(2 * math.pi * 4 * freq * t) * math.exp(-t * 6)
                )
            elif instrument == 'piano':
                # Warm piano tone
                env = math.exp(-2.2 * t / max(duration, 0.5))
                wave_val = (
                    0.6 * math.sin(2 * math.pi * freq * t) +
                    0.25 * math.sin(2 * math.pi * 2 * freq * t) +
                    0.15 * math.sin(2 * math.pi * 3 * freq * t)
                )
            elif instrument == 'melody':
                # Sweet lead whistle / flute / acoustic lead
                attack = min(1.0, t / 0.04)
                release = math.exp(-1.8 * (t / max(duration, 0.4)))
                env = attack * release
                # Slight vibrato
                vib = 1.0 + 0.006 * math.sin(2 * math.pi * 5.2 * t)
                wave_val = (
                    0.7 * math.sin(2 * math.pi * freq * vib * t) +
                    0.22 * math.sin(2 * math.pi * 2 * freq * vib * t) +
                    0.08 * math.sin(2 * math.pi * 3 * freq * vib * t)
                )
            elif instrument == 'bass':
                env = math.exp(-1.5 * t / max(duration, 0.8))
                wave_val = (
                    0.8 * math.sin(2 * math.pi * freq * t) +
                    0.2 * math.sin(2 * math.pi * 2 * freq * t)
                )
            else:
                env = math.exp(-3.0 * t)
                wave_val = math.sin(2 * math.pi * freq * t)

            sample_val = wave_val * env * volume
            buffer[start_idx + i] += sample_val

    # Structure of "Tera Yaar Hoon Main":
    # BPM ~ 86, beat = 60 / 86 = ~0.697 seconds
    beat = 0.70

    # Chords for Tera Yaar Hoon Main (in D Major):
    # D major: D, F#, A, D
    # B minor: B, D, F#, B
    # G major: G, B, D, G
    # A major: A, C#, E, A
    chords_data = [
        ('D', ['D3', 'A3', 'D4', 'F#4', 'A4'], 'D2'),
        ('Bm', ['B2', 'F#3', 'B3', 'D4', 'F#4'], 'B1'),
        ('G', ['G2', 'D3', 'G3', 'B3', 'D4'], 'G1'),
        ('A', ['A2', 'E3', 'A3', 'C#4', 'E4'], 'A1'),
    ]

    # Let's loop the chord progression across the track
    num_bars = 28 # ~ 78 seconds
    bar_duration = beat * 4 # 2.8s per chord

    for bar_idx in range(num_bars):
        chord_info = chords_data[bar_idx % 4]
        bar_start = bar_idx * bar_duration

        # Bass note on beat 1 and beat 3
        bass_freq = get_freq(chord_info[2])
        add_note(bar_start, bar_duration * 0.9, bass_freq, volume=0.28, instrument='bass')
        add_note(bar_start + beat * 2, bar_duration * 0.45, bass_freq, volume=0.22, instrument='bass')

        # Acoustic guitar arpeggio (fingerstyle picking pattern)
        # Root -> 5th -> 3rd -> High -> 3rd -> 5th
        string_notes = chord_info[1]
        pattern = [0, 1, 2, 3, 4, 3, 2, 1]
        for step, p_idx in enumerate(pattern):
            note_time = bar_start + step * (beat * 0.5)
            n_freq = get_freq(string_notes[p_idx % len(string_notes)])
            vol = 0.16 if step == 0 else 0.12
            add_note(note_time, beat * 0.8, n_freq, volume=vol, instrument='guitar')

        # Soft piano chord layer for emotional warmth
        for n_str in string_notes[1:4]:
            add_note(bar_start, bar_duration * 0.75, get_freq(n_str), volume=0.08, instrument='piano')

    # Lead Melody: "Tera Yaar Hoon Main"
    # Verse 1 (starts at bar 2 ~ 5.6s):
    # "Tu jo rootha toh kaun hansega"
    # A4, B4, C#5, C#5, B4, A4, F#4
    # "Tu jo chhoota toh kaun rahega"
    # A4, B4, C#5, C#5, B4, A4, G4, F#4, E4
    # "Tu chup hai toh yeh darr lagta hai"
    # F#4, G4, A4, A4, G4, F#4, D4
    # "Apna mujhko ab kaun kahega"
    # E4, F#4, G4, G4, F#4, E4, C#4, D4

    melody_sections = [
        # Verse 1: "Tu jo rootha..."
        (5.6, [
            ('A4', 0.4), ('B4', 0.4), ('C#5', 0.6), ('C#5', 0.4), ('B4', 0.4), ('A4', 0.5), ('F#4', 0.8),
        ]),
        # "Tu jo chhoota toh kaun rahega"
        (8.4, [
            ('A4', 0.4), ('B4', 0.4), ('C#5', 0.6), ('C#5', 0.4), ('B4', 0.4), ('A4', 0.4), ('G4', 0.35), ('F#4', 0.35), ('E4', 0.9),
        ]),
        # "Tu chup hai toh yeh darr lagta hai"
        (11.2, [
            ('F#4', 0.4), ('G4', 0.4), ('A4', 0.6), ('A4', 0.4), ('G4', 0.4), ('F#4', 0.5), ('D4', 0.8),
        ]),
        # "Apna mujhko ab kaun kahega"
        (14.0, [
            ('E4', 0.4), ('F#4', 0.4), ('G4', 0.6), ('G4', 0.4), ('F#4', 0.4), ('E4', 0.4), ('C#4', 0.5), ('D4', 1.2),
        ]),

        # Pre-Chorus: "Tu hi wajah... tere bina yaara meri..."
        (16.8, [
            ('F#4', 0.4), ('G4', 0.4), ('A4', 0.5), ('B4', 0.5), ('A4', 0.4), ('G4', 0.4), ('F#4', 0.5), ('E4', 0.8),
        ]),
        (19.6, [
            ('E4', 0.4), ('F#4', 0.4), ('G4', 0.5), ('A4', 0.5), ('G4', 0.4), ('F#4', 0.4), ('E4', 0.5), ('D4', 1.0),
        ]),

        # Chorus: "O yaara... tere jaisa yaar kahan..."
        (22.4, [
            ('D5', 0.7), ('C#5', 0.4), ('B4', 0.6), ('A4', 1.0),
        ]),
        (25.2, [
            ('F#4', 0.35), ('G4', 0.35), ('A4', 0.5), ('B4', 0.5), ('A4', 1.2),
        ]),
        (28.0, [
            ('D5', 0.6), ('C#5', 0.4), ('B4', 0.6), ('A4', 0.7), ('G4', 0.5), ('F#4', 1.3),
        ]),
        (30.8, [
            ('E4', 0.35), ('F#4', 0.35), ('G4', 0.5), ('F#4', 0.5), ('E4', 0.4), ('D4', 1.5),
        ]),

        # Bridge / Instrumental Interlude with flute & piano
        (33.6, [
            ('A4', 0.35), ('D5', 0.5), ('F#5', 0.7), ('E5', 0.5), ('D5', 0.5), ('C#5', 0.4), ('B4', 0.6), ('A4', 1.0),
        ]),
        (36.4, [
            ('B4', 0.4), ('C#5', 0.4), ('D5', 0.6), ('E5', 0.6), ('F#5', 0.8), ('E5', 1.2),
        ]),

        # Verse 2 Reprise (Emotional crescendo)
        (39.2, [
            ('A4', 0.4), ('B4', 0.4), ('C#5', 0.6), ('C#5', 0.4), ('B4', 0.4), ('A4', 0.5), ('F#4', 0.8),
        ]),
        (42.0, [
            ('A4', 0.4), ('B4', 0.4), ('C#5', 0.6), ('C#5', 0.4), ('B4', 0.4), ('A4', 0.4), ('G4', 0.35), ('F#4', 0.35), ('E4', 0.9),
        ]),
        (44.8, [
            ('F#4', 0.4), ('G4', 0.4), ('A4', 0.6), ('A4', 0.4), ('G4', 0.4), ('F#4', 0.5), ('D4', 0.8),
        ]),
        (47.6, [
            ('E4', 0.4), ('F#4', 0.4), ('G4', 0.6), ('G4', 0.4), ('F#4', 0.4), ('E4', 0.4), ('C#4', 0.5), ('D4', 1.2),
        ]),

        # Grand Chorus Finale
        (50.4, [
            ('D5', 0.7), ('C#5', 0.4), ('B4', 0.6), ('A4', 1.0),
        ]),
        (53.2, [
            ('F#4', 0.35), ('G4', 0.35), ('A4', 0.5), ('B4', 0.5), ('A4', 1.2),
        ]),
        (56.0, [
            ('D5', 0.6), ('C#5', 0.4), ('B4', 0.6), ('A4', 0.7), ('G4', 0.5), ('F#4', 1.3),
        ]),
        (58.8, [
            ('E4', 0.35), ('F#4', 0.35), ('G4', 0.5), ('F#4', 0.5), ('E4', 0.4), ('D4', 1.8),
        ]),
        (61.6, [
            ('F#4', 0.4), ('A4', 0.5), ('D5', 1.2),
        ])
    ]

    for section_start, notes_list in melody_sections:
        curr_t = section_start
        for n_str, n_dur in notes_list:
            add_note(curr_t, n_dur * 1.05, get_freq(n_str), volume=0.34, instrument='melody')
            # Soft octave harmony
            add_note(curr_t, n_dur * 0.9, get_freq(n_str) * 0.5, volume=0.12, instrument='piano')
            curr_t += n_dur

    # Soft delay/reverb feedback
    delay_samples = int(0.24 * sample_rate)
    delay_gain = 0.22
    for i in range(delay_samples, total_samples):
        buffer[i] += buffer[i - delay_samples] * delay_gain

    # Normalize audio to prevent clipping
    max_val = max(abs(x) for x in buffer) or 1.0
    scale = 0.88 / max_val
    normalized = [x * scale for x in buffer]

    return normalized

def save_wav(filename, samples):
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(2) # Stereo
        wav_file.setsampwidth(2) # 16-bit
        wav_file.setframerate(sample_rate)

        # Write stereo interleaved samples
        out_bytes = bytearray()
        for sample in samples:
            # Slight stereo panning effect
            int_val = int(max(-32767, min(32767, sample * 32767)))
            # Left & Right
            out_bytes += struct.pack('<hh', int_val, int_val)
        wav_file.writeframes(out_bytes)

print('Rendering Tera Yaar Hoon Main track (68 seconds)...')
audio_samples = render_track(68.0)

dest_dir = r'C:\Users\amnra\.gemini\antigravity\scratch\dhruv-birthday\public\audio'
os.makedirs(dest_dir, exist_ok=True)

wav_path = os.path.join(dest_dir, 'tera-yaar-hoon-main.wav')
save_wav(wav_path, audio_samples)
print('Saved:', wav_path, 'Size:', os.path.getsize(wav_path))

# Also copy as fallback names so all players find it immediately
import shutil
shutil.copyfile(wav_path, os.path.join(dest_dir, 'tera-yaar-hoon-main.mp3'))
shutil.copyfile(wav_path, os.path.join(dest_dir, 'friendship-song.mp3'))
shutil.copyfile(wav_path, os.path.join(dest_dir, 'birthday.mp3'))
print('Copied to tera-yaar-hoon-main.mp3, friendship-song.mp3, birthday.mp3!')
