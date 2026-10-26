"""Original algorithmic arrangements for Shortkit. No recordings, samples, or source melodies are used."""
import numpy as np, wave, pathlib, subprocess
SR=24000
OUT=pathlib.Path(__file__).resolve().parents[1]/'public/music'
OUT.mkdir(parents=True,exist_ok=True)
def compose(name,bpm,roots,melody,mood,seed):
    rng=np.random.default_rng(seed); beat=60/bpm; seconds=32*beat;n=int(seconds*SR);mix=np.zeros((n,2),dtype=np.float64)
    def put(sound,start,pan=.5):
        idx=(np.arange(len(sound))+int(start*SR))%n
        np.add.at(mix[:,0],idx,sound*np.sqrt(1-pan));np.add.at(mix[:,1],idx,sound*np.sqrt(pan))
    def note(midi,start,length,amp,kind='pluck',pan=.5):
        t=np.arange(int(length*SR))/SR;f=440*2**((midi-69)/12)
        if kind=='pad':
            env=np.sin(np.pi*np.minimum(t/length,1))**1.4
            tone=np.sin(2*np.pi*f*t)+.16*np.sin(2*np.pi*f*2.003*t)
        elif kind=='bass':
            env=np.minimum(t/.02,1)*np.exp(-t*3/length)
            tone=np.sin(2*np.pi*f*t)+.12*np.sin(2*np.pi*f*2*t)
        else:
            env=np.minimum(t/.006,1)*np.exp(-t*(4 if mood=='bright' else 2.8)/length)
            tone=np.sin(2*np.pi*f*t)+.25*np.sin(2*np.pi*f*2*t)*np.exp(-t*6)+.08*np.sin(2*np.pi*f*3*t)*np.exp(-t*10)
        sound=amp*tone*env;put(sound,start,pan)
        if kind=='pluck':put(sound*.15,start+beat*.75,1-pan)
    for bar in range(8):
        root=roots[bar%len(roots)];start=bar*4*beat
        chord=[root,root+4 if bar%4!=2 else root+3,root+7,root+11 if mood=='calm' else root+12]
        for j,key in enumerate(chord):
            if mood=='calm':note(key+12,start,4.5*beat,.045,'pad',.2+j*.2)
            else:note(key+12,start+j*beat*.5,2.5*beat,.065,'pluck',.2+j*.2)
        note(root-12,start,2*beat,.17,'bass');note(root-12,start+2*beat,1.7*beat,.12,'bass')
        for j,key in enumerate(melody[bar%len(melody)]):
            if key is not None:note(key,start+(j*.5+.25)*beat,beat*(1.4 if mood=='calm' else .8),.10 if mood=='bright' else .065,'pluck',.5+.2*np.sin(bar+j))
        if mood!='calm':
            for k in range(8):
                t=np.arange(int(.065*SR))/SR;noise=rng.normal(0,1,len(t));noise=np.r_[0,np.diff(noise)];put(noise*np.exp(-t*65)*(.022 if k%2 else .015),start+k*.5*beat,.65)
            for k in [0,2]:
                t=np.arange(int(.20*SR))/SR;freq=48+60*np.exp(-t*30);kick=np.sin(2*np.pi*np.cumsum(freq)/SR)*np.exp(-t*22);put(kick*.15,start+k*beat)
    mix=np.tanh(mix*1.1);mix*=.72/max(.72,np.abs(mix).max());pcm=(mix*32767).astype('<i2');tmp=OUT/(name+'.wav')
    with wave.open(str(tmp),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes(pcm.tobytes())
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',str(tmp),'-codec:a','libmp3lame','-b:a','128k','-metadata','artist=Shortkit','-metadata','comment=Original procedural music, no external samples',str(OUT/(name+'.mp3'))],check=True);tmp.unlink();print(name,round(seconds,2),'seconds')
compose('sunny-step',112,[48,53,57,55],[[76,79,None,74,72,None,79,76],[77,None,81,79,None,76,74,None],[76,81,None,79,76,None,72,74],[74,None,79,83,None,79,76,None]],'bright',132)
compose('soft-review',88,[50,55,59,57],[[74,None,78,None,81,78,None,76],[79,None,78,74,None,None,76,None],[78,None,81,None,83,None,78,None],[76,None,81,78,None,None,74,None]],'warm',289)
compose('quiet-note',76,[48,53,57,55],[[72,None,None,79,None,None,76,None],[77,None,None,81,None,None,79,None],[76,None,None,72,None,None,79,None],[74,None,None,79,None,None,83,None]],'calm',461)
