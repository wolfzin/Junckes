/* Status de horário no fuso de Gaspar (America/Sao_Paulo).
   Fonte: Google Maps (08/10/2026): seg–sex 5h30–20h, sáb 5h30–19h, dom fechado. */
(function(){
  var HOR={Mon:[330,1200],Tue:[330,1200],Wed:[330,1200],Thu:[330,1200],Fri:[330,1200],Sat:[330,1140]};
  var ORDEM=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var el=document.getElementById('status'); if(!el) return;
  function hm(m){var h=Math.floor(m/60),mi=m%60;return h+'h'+(mi?String(mi).padStart(2,'0'):'');}
  function agora(){
    var p={};new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',weekday:'short',hour:'numeric',minute:'numeric',month:'numeric',day:'numeric',hourCycle:'h23'}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value;});
    return {dia:p.weekday,min:(+p.hour)*60+(+p.minute),mes:+p.month,d:+p.day};
  }
  function atualiza(){
    var a=agora(),h=HOR[a.dia],t,aberto=false;
    if(a.mes===10&&a.d===12){t='Feriado: confirme o horário';}
    else if(h&&a.min>=h[0]&&a.min<h[1]){t='Aberto agora · até '+hm(h[1]);aberto=true;}
    else if(h&&a.min<h[0]){t='Abre hoje às '+hm(h[0]);}
    else{var i=ORDEM.indexOf(a.dia),k=1;while(!HOR[ORDEM[(i+k)%7]])k++;t='Fechado · abre '+(k===1?'amanhã':'segunda')+' às 5h30';}
    el.textContent=t;el.setAttribute('data-aberto',aberto?'sim':'nao');
  }
  atualiza();setInterval(atualiza,60000);
})();
