// ju.sijeom 릴스 커버 통일 틀 (2026-11-16)
// node render.js            -> samples/*.png + samples/grid-preview.png
// 다른 릴스에 쓸 땐 아래 COVERS 배열에 한 줄 추가하면 됨.
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const fd=process.env.FONTS||path.join(__dirname,'../generator/fonts');
const font=(w,f)=>`@font-face{font-family:P;font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(path.join(fd,f)).toString('base64')})}`;
const FONTS=font(500,'Pretendard-Medium.woff2')+font(700,'Pretendard-Bold.woff2')+font(800,'Pretendard-ExtraBold.woff2');
// 브랜드 팔레트 (프로필 v2·하이라이트와 같은 색)
const T={navy:'#0F3A4B',navyDeep:'#0A2A37',cream:'#F6F1EA',yellow:'#FFD43B',coral:'#FF4F6D',ink:'#14222A'};
const img=f=>{const b=fs.readFileSync(f);return 'data:image/jpeg;base64,'+b.toString('base64')};
const R=p=>path.join(process.env.REELS||path.join(__dirname,'../reels'),p);

// type: 'photo' (사진형, 기본) | 'navy' (컬러형 남색) | 'cream' (컬러형 크림)
// title: 2줄 배열, [[강조]] 부분이 하이라이트 박스
const COVERS=[
 {file:'01-butter-photo',type:'photo',photo:R('2026-11-16-butter/bt/img/b1.jpg'),pos:'50% 60%',cat:'생활 · 식품 보관',label:'냉장고 속 버터',title:['이 냄새가 나면','[[바로 버리세요]]'],sub:'생각보다 의외의 냄새',credit:'참고 사진 · 버터 · Salicyna · CC BY-SA 4.0'},
 {file:'02-parcel-photo',type:'photo',photo:R('2026-11-15-parcel/pc/img/d1.jpg'),pos:'40% 50%',cat:'생활 · 택배',label:'내 택배인 줄 알았는데…',title:['남의 택배를','실수로 [[뜯었다면?]]'],sub:'이것부터 하래요',credit:'참고 사진 · 문 앞 택배 · Meanwell Packaging · CC BY 2.0'},
 {file:'03-666-navy',type:'navy',photo:R('2026-11-13-666/six/img/m1.jpg'),pos:'50% 50%',cat:'생활 · 정리',label:'해외에서 화제인 정리법',title:['30분이면','방이 [[달라진대요]]'],sub:'비밀은 숫자 6, 딱 세 번',credit:'참고 사진 · 어질러진 방 · Keyah Cheatum · CC BY-SA 3.0'},
 {file:'04-butter-cream',type:'cream',photo:R('2026-11-16-butter/bt/img/b1.jpg'),pos:'50% 60%',cat:'생활 · 식품 보관',label:'냉장고 속 버터',title:['이 냄새가 나면','[[바로 버리세요]]'],sub:'생각보다 의외의 냄새',credit:'참고 사진 · 버터 · Salicyna · CC BY-SA 4.0'},
 {file:'05-666-photo',type:'photo',photo:R('2026-11-13-666/six/img/m1.jpg'),pos:'50% 50%',cat:'생활 · 정리',label:'해외에서 화제인 정리법',title:['30분이면','방이 [[달라진대요]]'],sub:'비밀은 숫자 6, 딱 세 번',credit:'참고 사진 · 어질러진 방 · Keyah Cheatum · CC BY-SA 3.0'},
 {file:'06-parcel-navy',type:'navy',photo:R('2026-11-15-parcel/pc/img/d1.jpg'),pos:'40% 50%',cat:'생활 · 택배',label:'내 택배인 줄 알았는데…',title:['남의 택배를','실수로 [[뜯었다면?]]'],sub:'이것부터 하래요',credit:'참고 사진 · 문 앞 택배 · Meanwell Packaging · CC BY 2.0'},
];
const star=c=>`<svg viewBox="0 0 100 100" class="star"><path fill="${c}" d="M50 0C53 35 65 47 100 50 65 53 53 65 50 100 47 65 35 53 0 50 35 47 47 35 50 0Z"/></svg>`;
function html(c){
 const dark=c.type!=='cream';
 const fg=dark?'#fff':T.ink, boxBg=T.yellow, boxInk=T.ink, subC=dark?T.yellow:T.coral;
 const t=c.title.map(l=>l.replace(/\[\[(.+?)\]\]/g,'<span class="hl">$1</span>')).join('<br>');
 const bg=c.type==='photo'
  ?`<div class="ph" style="background-image:url(${img(c.photo)});background-position:${c.pos}"></div><div class="shade"></div>`
  :`<div class="flat"></div><div class="pill" style="background-image:url(${img(c.photo)});background-position:${c.pos}"></div>`;
 return `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1920px;position:relative;overflow:hidden;font-family:P;background:${T.navy}}
.ph{position:absolute;inset:0;background-size:cover}
.shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,42,55,.78) 0%,rgba(10,42,55,.62) 40%,rgba(10,42,55,.15) 62%,rgba(10,42,55,.25) 80%,rgba(10,42,55,.85) 100%)}
.flat{position:absolute;inset:0;background:${c.type==='navy'?T.navy:T.cream}}
.pill{position:absolute;right:88px;top:1100px;width:400px;height:560px;border-radius:200px;background-size:cover;${c.type==='cream'?'':'box-shadow:0 0 0 10px rgba(255,255,255,.08)'}}
.logo{position:absolute;left:88px;top:290px;background:#fff;color:${T.navy};font-weight:800;font-size:40px;letter-spacing:-1px;padding:10px 22px;border-radius:14px;line-height:1;${dark?'':`box-shadow:inset 0 0 0 3px ${T.navy}`}}
.logo i{font-style:normal;color:${T.coral}}
.cat{position:absolute;right:88px;top:296px;font-weight:700;font-size:30px;color:${dark?'rgba(255,255,255,.9)':T.navy};border:3px solid ${dark?'rgba(255,255,255,.6)':T.navy};padding:8px 20px;border-radius:40px;line-height:1}
.blk{position:absolute;left:88px;right:88px;top:470px}
.label{display:inline-block;background:${dark?T.ink:T.navy};color:#fff;font-weight:700;font-size:40px;letter-spacing:-1px;padding:12px 24px;line-height:1.1}
.title{margin-top:34px;font-weight:800;font-size:112px;line-height:1.24;letter-spacing:-5px;color:${fg};word-break:keep-all}
.hl{background:${boxBg};color:${boxInk};padding:0 18px;margin-left:-4px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
.sub{margin-top:36px;font-weight:800;font-size:50px;letter-spacing:-1.5px;color:${subC}}
.handle{position:absolute;left:88px;top:1590px;font-weight:700;font-size:32px;color:${dark?'rgba(255,255,255,.85)':T.navy}}
.star{position:absolute;width:110px;height:110px;${c.type==='photo'?'right:88px;top:1530px':'left:88px;top:1150px'}}
.credit{position:absolute;left:88px;right:88px;top:1730px;font-weight:500;font-size:24px;color:${dark?'rgba(255,255,255,.7)':'rgba(20,34,42,.6)'}}
</style></head><body>${bg}
<div class="logo">ju<i>.</i>sijeom</div><div class="cat">${c.cat}</div>
<div class="blk"><div class="label">${c.label}</div><div class="title">${t}</div><div class="sub">${c.sub}</div></div>
${star(c.type==='cream'?T.coral:T.yellow)}
<div class="handle">@ju.sijeom</div><div class="credit">${c.credit}</div>
</body></html>`;}
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
 const out=path.join(__dirname,'samples');fs.mkdirSync(out,{recursive:true});
 for(const c of COVERS){await p.setContent(html(c));await p.evaluate(()=>document.fonts.ready);
  const m=await p.evaluate(()=>{const t=document.querySelector('.title'),bl=document.querySelector('.blk').getBoundingClientRect();
   const over=[...document.querySelectorAll('.title,.sub,.label')].some(e=>e.scrollWidth>e.clientWidth+1);
   const lines=Math.round(t.getBoundingClientRect().height/parseFloat(getComputedStyle(t).lineHeight));
   return {bottom:Math.round(bl.bottom),lines,over}});
  console.log(c.file,JSON.stringify(m), m.bottom>1000||m.lines>2||m.over?'  <-- CHECK':'ok');
  await p.screenshot({path:path.join(out,c.file+'.png')});}
 // 프로필 그리드 미리보기 (y240~1680, 3:4)
 const {execFileSync}=require('child_process');
 execFileSync('python3',['-c',`
from PIL import Image
o='${out}';fs=${JSON.stringify(COVERS.map(c=>c.file))}
order=['01-butter-photo','03-666-navy','02-parcel-photo','06-parcel-navy','05-666-photo','04-butter-cream']
fs=[f for f in order if f in fs]
W,H=360,480;g=6
img=Image.new('RGB',(W*3+g*2,(H+g)*((len(fs)+2)//3)-g),'white')
for k,f in enumerate(fs):
  t=Image.open(o+'/'+f+'.png').convert('RGB').crop((0,240,1080,1680)).resize((W,H))
  img.paste(t,((k%3)*(W+g),(k//3)*(H+g)))
img.save(o+'/grid-preview.png')`]);
 await b.close();})();
