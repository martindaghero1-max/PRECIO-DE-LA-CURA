(function(){
var K='tlou',S,b=document.body,pg=location.pathname.split('/').pop()||'index.html';
try{S=JSON.parse(localStorage.getItem(K))||{}}catch(e){S={}}
S.min=S.min||0;S.it=S.it||[];S.fin=S.fin||[];S.snd=!!S.snd;S.mus=S.mus===undefined?true:!!S.mus;
if(pg==='index.html'){S.min=0;S.it=[];S.last=''}
if(!b.dataset.aux&&S.last!==pg){S.min+=+(b.dataset.min||0);var i0=b.dataset.item,f0=b.dataset.final;if(i0&&S.it.indexOf(i0)<0)S.it.push(i0);if(f0&&S.fin.indexOf(f0)<0)S.fin.push(f0);S.last=pg}
function sv(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}sv();
var T=850+S.min,H=Math.floor(T/60)+':'+('0'+T%60).slice(-2),$=function(s){return document.querySelector(s)};
$('#hora').textContent=b.dataset.hora||H;if(T>=870&&!b.dataset.hora)$('.hora').classList.add('tarde');
[].forEach.call(document.querySelectorAll('.slot'),function(e){if(S.it.indexOf(e.dataset.i)>-1)e.classList.add('on')});
$('#fins').textContent='Finales '+S.fin.length+'/4';
[].forEach.call(document.querySelectorAll('#reg li'),function(e){if(S.fin.indexOf(e.dataset.f)>-1)e.classList.add('on')});
[].forEach.call(document.querySelectorAll('[data-tarde]'),function(a){if(T>=870){a.removeAttribute('href');a.setAttribute('aria-disabled','true');a.className='lock';a.textContent+=' (Bloqueado: la incisión ya empezó.)'}});
var ac;function A(){if(!ac){try{ac=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(ac&&ac.state==='suspended')ac.resume();return ac}
function tone(f,d,v,t){if(!S.snd)return;var a=A();if(!a)return;var o=a.createOscillator(),g=a.createGain();o.type=t||'square';o.frequency.value=f;g.gain.value=v||.03;g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+d);o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+d)}
function blip(){tone(520+Math.random()*80,.04,.015)}
var m=b.dataset.amb;
if(m==='monitor')setInterval(function(){tone(880,.15,.03,'sine')},1400);
if(m==='alarma')setInterval(function(){tone(760,.2,.03);setTimeout(function(){tone(520,.2,.03)},250)},900);
if(m==='motor')setInterval(function(){tone(62,.35,.05,'sawtooth')},380);
if(m==='plano')setTimeout(function(){tone(880,4,.03,'sine')},500);
var sb=$('#snd');function lab(){sb.textContent='Sonido: '+(S.snd?'sí':'no')}lab();
sb.onclick=function(){S.snd=!S.snd;sv();lab();vm();if(S.snd){A();tone(660,.1,.04)}};
[].forEach.call(document.querySelectorAll('.op a'),function(a){a.addEventListener('mouseenter',function(){tone(400,.05,.02)});a.addEventListener('click',function(){tone(800,.08,.04)})});
var tp=[].slice.call(document.querySelectorAll('.t p')),rest=[].slice.call(document.querySelectorAll('.fin,.q,.op,#reg')),
tx=tp.map(function(p){return p.textContent.replace('{{hora}}',H)}),i=0,skip=false;
function done(){rest.forEach(function(e){e.classList.add('on')})}
function all(){skip=true;tp.forEach(function(p,k){p.textContent=tx[k];p.classList.add('on')});done()}
function nxt(){if(skip)return;if(i>=tp.length)return done();var p=tp[i],t=tx[i],n=0;p.textContent='';p.classList.add('on');(function s(){if(skip)return;n++;p.textContent=t.slice(0,n);if(n%3==0)blip();if(n<t.length)setTimeout(s,22);else{i++;setTimeout(nxt,380)}})()}
if(matchMedia('(prefers-reduced-motion:reduce)').matches)all();else{nxt();
addEventListener('click',function(e){if(!skip&&!/^(A|BUTTON)$/.test(e.target.tagName))all()});
addEventListener('keydown',function(e){if(!skip&&(e.key===' '||e.key==='Escape')){e.preventDefault();all()}})}
var M=null,CH={n:[110,164.8,220,261.6],t:[110,164.8,233.1,277.2],f:[73.4,110,146.8,174.6],d:[130.8,196,329.6,392]},SC={n:[440,523.3,587.3,659.3,784],t:[440,466.2,523.3,622.3],f:[293.7,349.2,440,523.3],d:[523.3,659.3,784,880]};
function mood(){return b.classList.contains('final')?'f':b.classList.contains('despertar')?'d':m==='alarma'?'t':'n'}
function mstart(){if(M||!S.mus)return;var a=A();if(!a)return;var mg=a.createGain();mg.gain.value=0;mg.gain.linearRampToValueAtTime(.7,a.currentTime+4);var lp=a.createBiquadFilter();lp.type='lowpass';lp.frequency.value=700;var dl=a.createDelay(1);dl.delayTime.value=.45;var fb=a.createGain();fb.gain.value=.4;dl.connect(fb);fb.connect(dl);var wet=a.createGain();wet.gain.value=.5;wet.connect(dl);dl.connect(mg);lp.connect(mg);mg.connect(a.destination);var k=mood(),os=[];
CH[k].forEach(function(f){[-4,4].forEach(function(d){var o=a.createOscillator(),g=a.createGain();o.type='triangle';o.frequency.value=f;o.detune.value=d;g.gain.value=.025;o.connect(g);g.connect(lp);o.start();os.push(o)})});
var lf=a.createOscillator(),lg=a.createGain();lf.frequency.value=.07;lg.gain.value=250;lf.connect(lg);lg.connect(lp.frequency);lf.start();os.push(lf);
var iv=setInterval(function(){if(!M)return;var o=a.createOscillator(),g=a.createGain(),t=a.currentTime;o.type='sine';o.frequency.value=SC[k][Math.floor(Math.random()*SC[k].length)];g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.06,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+3);o.connect(g);g.connect(mg);g.connect(wet);o.start();o.stop(t+3.1)},k==='t'?1800:4200);
M={mg:mg,os:os,iv:iv,a:a}}
function mstop(){if(!M)return;var x=M,t=x.a.currentTime;M=null;clearInterval(x.iv);x.mg.gain.cancelScheduledValues(t);x.mg.gain.setValueAtTime(x.mg.gain.value,t);x.mg.gain.linearRampToValueAtTime(0,t+1);setTimeout(function(){x.os.forEach(function(o){try{o.stop()}catch(e){}})},1100)}
var mb=$('#mus');function ml(){mb.textContent='Música: '+(S.mus?'sí':'no')}ml();
mb.onclick=function(){S.mus=!S.mus;sv();ml();if(S.mus){A();mstart()}else mstop()};
function go(){A();mstart()}addEventListener('pointerdown',go,{once:true});addEventListener('keydown',go,{once:true});mstart();
var vs=[].slice.call(document.querySelectorAll('.escena video')),rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
function vm(){vs.forEach(function(v){v.muted=!S.snd;if(rm)return;var p=v.play();if(p&&p.catch)p.catch(function(){v.muted=true;v.play().catch(function(){})})})}vm();
})();
