const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],WA='5561983758641';
$('#yr').textContent=new Date().getFullYear();
$('#pimg').src=$('#grid img').src;
// Galeria de aplicações: reaproveita imagens já presentes no HTML, sem duplicar arquivos.
[['#gal-img-1',0],['#gal-img-2',1],['#gal-img-3',4],['#gal-img-4',6]].forEach(([id,index])=>{const source=$$('#grid .card img')[index];const target=$(id);if(source&&target)target.src=source.currentSrc||source.src});
// progresso, header, menu
const bar=$('#bar'),hd=$('#top');
addEventListener('scroll',()=>{const h=document.documentElement,range=h.scrollHeight-innerHeight;bar.style.width=(range>0?scrollY/range*100:0)+'%';hd.classList.toggle('on',scrollY>10)},{passive:true});
const bg=$('#bg'),nv=$('#nv');
bg.onclick=()=>{const o=nv.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Fechar menu':'Abrir menu')};
addEventListener('keydown',e=>{if(e.key==='Escape'&&nv.classList.contains('open')){nv.classList.remove('open');bg.setAttribute('aria-expanded','false');bg.setAttribute('aria-label','Abrir menu');bg.focus()}});
$$('a',nv).forEach(a=>a.onclick=()=>{nv.classList.remove('open');bg.setAttribute('aria-expanded','false');bg.setAttribute('aria-label','Abrir menu')});
// link ativo + reveal
const links=$$('.links a[href^="#"]'),io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('act',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(s=>io.observe(s));
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach((e,i)=>{e.style.transitionDelay=(i%3)*80+'ms';rv.observe(e)});
// filtro
$$('.fb').forEach(b=>b.onclick=()=>{$$('.fb').forEach(x=>x.setAttribute('aria-pressed',x===b));const f=b.dataset.f;$$('.card').forEach(c=>c.classList.toggle('hide',f!=='all'&&!c.dataset.c.split(' ').includes(f)))});
// modal
const dg=$('#dg');let cur=null;
$$('.card').forEach(c=>c.onclick=()=>{cur=c;$('#di').src=$('img',c).src;$('#di').alt=$('img',c).alt;$('#dt').textContent=$('.ph span',c).textContent;$('#dh').textContent=$('h3',c).textContent;$('#dp').textContent=c.dataset.d;dg.showModal()});
$('#dx').onclick=()=>dg.close();dg.onclick=e=>{if(e.target===dg)dg.close()};
$('#dq').onclick=()=>{dg.close();$('#srv').value=cur.dataset.sel;$('#det').value='Tenho interesse em: '+$('h3',cur).textContent+'.';$('#contato').scrollIntoView({behavior:'smooth'});setTimeout(()=>$('#nome').focus({preventScroll:true}),700)};
// formulário
const tel=$('#tel');tel.oninput=()=>{let v=tel.value.replace(/\D/g,'').slice(0,11);tel.value=v.length>10?v.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3'):v.length>6?v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3'):v.length>2?v.replace(/(\d{2})(\d*)/,'($1) $2'):v};
const toast=t=>{const e=$('#ts');e.textContent=t;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),3500)};
$('#lf').addEventListener('submit',function(e){e.preventDefault();let ok=true;
 [['nome',v=>v.trim().length>1],['tel',v=>v.replace(/\D/g,'').length>=10],['srv',v=>v]].forEach(([id,t])=>{const el=$('#'+id),good=t(el.value);el.parentElement.classList.toggle('err',!good);if(!good)ok=false});
 if(!ok){toast('Confira os campos destacados.');return}
 const f=new FormData(this),g=k=>f.get(k)||'Não informado';
 const msg=['Olá! Vim pelo site da STRUTEC e gostaria de solicitar um orçamento.','','*Nome:* '+g('nome'),'*Telefone:* '+g('tel'),'*Empresa:* '+g('emp'),'*Serviço:* '+g('srv'),'*Tipo de obra:* '+g('tipoObra'),'*Área aproximada:* '+g('area')+' m²','*Cidade/Estado:* '+g('cid'),'*Prazo:* '+g('prz'),'*Detalhes:* '+g('det')].join('\n');
 window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg),'_blank','noopener');toast('Abrindo o WhatsApp com sua mensagem…')});
$$('.f input,.f select').forEach(i=>i.addEventListener('input',()=>i.parentElement.classList.remove('err')));
// dica do WhatsApp
setTimeout(()=>{$('#tip').classList.add('on');setTimeout(()=>$('#tip').classList.remove('on'),6000)},5000);

// Alternativa por e-mail: abre o aplicativo de e-mail com os dados do formulário.
const emailLead=$('#emailLead');
if(emailLead) emailLead.addEventListener('click',()=>{
 const form=$('#lf');
 const nome=$('#nome').value.trim(), telefone=$('#tel').value.trim(), servico=$('#srv').value;
 if(!nome || telefone.replace(/\D/g,'').length<10 || !servico){
  toast('Preencha nome, telefone e serviço antes de enviar.');
  [['nome',v=>v.trim().length>1],['tel',v=>v.replace(/\D/g,'').length>=10],['srv',v=>!!v]].forEach(([id,test])=>$('#'+id).parentElement.classList.toggle('err',!test($('#'+id).value)));
  return;
 }
 const fd=new FormData(form), val=k=>fd.get(k)||'Não informado';
 const subject='Solicitação de orçamento - STRUTEC';
 const body=['Olá, STRUTEC! Gostaria de solicitar um orçamento.','','Nome: '+val('nome'),'Telefone: '+val('tel'),'E-mail: '+val('email'),'Empresa: '+val('emp'),'Serviço: '+val('srv'),'Tipo de obra: '+val('tipoObra'),'Área aproximada: '+val('area')+' m²','Cidade/Estado: '+val('cid'),'Prazo: '+val('prz'),'Detalhes da obra: '+val('det')].join('\n');
 window.location.href='mailto:CONTATO.STRUTEC@GMAIL.COM?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
});
