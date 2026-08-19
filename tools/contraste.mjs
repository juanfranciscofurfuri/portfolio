const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const L = (hex) => { const [r,g,b] = hex.replace('#','').match(/\w\w/g).map(h=>parseInt(h,16)); return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b); };
const ratio = (a,b) => { const [x,y]=[L(a),L(b)].sort((m,n)=>n-m); return (x+0.05)/(y+0.05); };
const sets = {
  'portfolio (oscuro)': {
    bgs: { bg:'#060607', raised:'#0d0e11', sunken:'#030304' },
    fgs: { text:'#f2f3f5', muted:'#a6adb8', dim:'#7c8592', accent:'#f0a63f' },
  },
  'posada (papel)': {
    bgs: { paper:'#f4f3ee', deep:'#e9e7df', white:'#ffffff' },
    fgs: { ink:'#191c15', soft:'#4f5c43', brick:'#a8412c' },
  },
  'estudio (plata)': {
    bgs: { silver:'#eef0f4', deep:'#e2e5ec', white:'#ffffff' },
    fgs: { navy:'#101728', slate:'#55607a', cobalt:'#1f4ea8' },
  },
};
let fail = 0;
for (const [name, s] of Object.entries(sets)) {
  console.log('\n== ' + name);
  for (const [fn, fv] of Object.entries(s.fgs)) {
    const cols = Object.entries(s.bgs).map(([bn, bv]) => {
      const r = ratio(fv, bv);
      if (r < 4.5) fail++;
      return `${bn} ${r.toFixed(2)}${r < 4.5 ? ' FALLA' : ''}`;
    });
    console.log('  ' + fn.padEnd(8) + cols.join('  |  '));
  }
}
console.log('\nblanco sobre ladrillo:', ratio('#ffffff','#a8412c').toFixed(2));
console.log('blanco sobre navy:', ratio('#ffffff','#101728').toFixed(2));
console.log('blanco sobre oliva:', ratio('#ffffff','#2b3524').toFixed(2));
console.log('tinta sobre ambar:', ratio('#120b03','#f0a63f').toFixed(2));
process.exit(fail ? 1 : 0);
