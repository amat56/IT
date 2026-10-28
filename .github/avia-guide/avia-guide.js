/* AVIA authenticated read-only menu tour. No demo records, API calls or storage. */
(function(){
  'use strict';
  const topics=[
    {id:'today',title:'🏠 Hari Ini',kind:'main',about:'Ringkasan kehadiran dan pergerakan staf pada hari yang dipilih.',sample:['Paparan: Keseluruhan Bahagian','Di Pejabat 4  •  Luar Pejabat 1','Cuti Rehat 1  •  Cuti Sakit 0','Klik jumlah untuk lihat nama; angka ini hanya contoh.'],how:'Pilih Bahagian/Unit, kemudian tekan kategori Status Hari Ini untuk melihat senarai. Quick Status digunakan untuk kemas kini pantas.'},
    {id:'calendar',title:'📅 Kalendar',kind:'main',about:'Semak pergerakan, tarikh cuti dan rekod yang telah dimasukkan.',sample:['Oktober 2026   ‹   ›','28 Okt: Staf A — Cuti Rehat','29 Okt: Staf B — Kursus','Hari cuti umum boleh dipaparkan pada kalendar.'],how:'Tukar bulan dengan anak panah. Pilih rekod untuk melihat butiran dan pilihan sunting/padam jika dibenarkan oleh peranan.'},
    {id:'update',title:'➕ Update',kind:'main',about:'Masukkan status/pergerakan mengikut akses yang diberikan.',sample:['Staf: Staf Contoh','Jenis: Mesyuarat/Kursus/Bengkel di Luar Pejabat','Tarikh Mula: 28/10/2026','Tarikh Tamat: 28/10/2026','Catatan: Mesyuarat projek (contoh)','[Simpan] — simulasi ini tidak menyimpan.'],how:'Pilih staf (jika anda diberi akses), jenis status, tarikh dan catatan. Semak sebelum tekan Simpan pada menu sebenar; rekod terus disegerakkan tanpa proses kelulusan.'},
    {id:'staffView',title:'👥 Staf',kind:'main',about:'Cari staf dan lihat maklumat yang dibenarkan.',sample:['Cari nama / unit...','Staf Contoh A  •  Unit A','Staf Contoh B  •  Unit B','Senarai bergantung pada akses pengguna.'],how:'Gunakan ruang carian mengikut nama atau unit. Paparan arkib hanya tersedia jika dibenarkan.'},
    {id:'inbox',title:'🔔 Inbox',kind:'main',about:'Terima dan baca pengumuman rasmi daripada Admin.',sample:['Pemberitahuan rasmi','Contoh: Mesyuarat bulanan Unit IT','Status: Belum dibaca','[Tanda Semua Dibaca]'],how:'Buka mesej untuk membaca kandungan. Admin mempunyai fungsi tambahan menghantar pemberitahuan.'},
    {id:'report',title:'📊 Laporan',kind:'main',about:'Laporan bulanan berdasarkan data pergerakan yang dibenarkan.',sample:['Bulan: Oktober 2026','Unit: Semua Bahagian/Unit','Status: Semua Status','Ringkasan & senarai rekod','[Export CSV]'],how:'Pilih bulan, unit dan jenis status. Semak ringkasan, kemudian eksport CSV jika diperlukan.'},
    {id:'profile',title:'👤 Profil',kind:'main',about:'Maklumat akaun, versi aplikasi dan tindakan pengguna.',sample:['Nama / Email / Unit / Role','Status Aplikasi • Semak Versi','Sinkronisasi • status kali terakhir','📲 Pasang AVIA (PWA selepas login)','Login Biometrik (APK Android sahaja)','[Log Keluar]'],how:'Semak maklumat profil dan versi. Pemasangan PWA melalui Pasang AVIA; biometrik hanya disokong APK Android yang mempunyai bridge native.'},
    {id:'adminStaff',title:'🛠️ Admin — Staf',kind:'admin',about:'Urus akaun dan profil staf.',sample:['+ Tambah Staf','Import Staf CSV / Tukar Unit Pukal','Arkib Staf / Cari staf','Edit profil, aktif/nyahaktif mengikut kebenaran.'],how:'Admin boleh tambah, kemas kini dan urus staf. Semak identiti dan peranan sebelum menyimpan.'},
    {id:'adminUnits',title:'🛠️ Admin — Unit',kind:'admin',about:'Urus Bahagian/Unit.',sample:['Nama Unit Baru: Unit Contoh','[Tambah]','Unit A  •  Unit B','Edit nama unit / padam unit kosong.'],how:'Tambah unit, ubah nama atau padam jika kosong dan tidak menjejaskan rekod sedia ada.'},
    {id:'adminAudit',title:'🛠️ Admin — Audit',kind:'admin',about:'Semak sejarah tindakan dalam sistem.',sample:['Log Aktiviti (contoh)','28 Okt 09:10 — UPDATE_STATUS','28 Okt 10:30 — ADD_STAFF'],how:'Semak jenis tindakan dan butiran untuk siasatan atau pengesahan perubahan.'},
    {id:'adminAnnouncements',title:'🛠️ Admin — Pemberitahuan',kind:'admin',about:'Hantar pengumuman kepada penerima yang dipilih.',sample:['Tajuk: Mesyuarat Unit IT','Penerima: Semua Staf / Unit / Staf tertentu','Mesej: Sila hadir...','[Hantar Pemberitahuan]','Sejarah Pemberitahuan'],how:'Pilih kumpulan penerima, isi tajuk dan mesej, kemudian hantar. Penerima melihatnya dalam Inbox.'},
    {id:'adminHolidays',title:'🛠️ Admin — Cuti Umum',kind:'admin',about:'Urus tarikh cuti yang muncul pada kalendar.',sample:['Tarikh: 31/08/2027','Nama: Hari Kebangsaan','Skop: Persekutuan / Negeri / Dalaman','[Tambah Cuti Umum]'],how:'Semak tarikh dan skop supaya paparan cuti staf tidak tersilap.'},
    {id:'adminStatusConfig',title:'🛠️ Admin — Status',kind:'admin',about:'Tambah atau ubah jenis status/pergerakan.',sample:['Nama: Tugasan Rasmi','Kategori: Luar Pejabat','Perlu Masa: Ya / Tidak','Perlu Lokasi: Ya / Tidak','[+ Tambah Status]'],how:'Gunakan kategori yang sesuai dan kekalkan kod status sedia ada untuk sejarah rekod.'},
    {id:'adminBulk',title:'🛠️ Admin — Bulk Update',kind:'admin',about:'Kemas kini beberapa staf dalam satu tindakan.',sample:['Pilih staf: Staf A, Staf B','Jenis: Kursus','Tarikh Mula: 28/10/2026','Tarikh Tamat: 29/10/2026','[Simpan Untuk Staf Dipilih]'],how:'Semak penerima, tarikh dan status dengan teliti. Pada menu sebenar tindakan ini boleh mengubah banyak rekod.'},
    {id:'adminBackup',title:'🛠️ Admin — Backup',kind:'admin',about:'Fungsi backup/restore yang tersedia dalam aplikasi.',sample:['Backup Semua Data','Backup Konfigurasi','Restore Semua Data','Restore Konfigurasi'],how:'Bezakan backup demo dengan data Supabase sebenar. Jangan buat restore tanpa memahami kesan terhadap rekod.'},
    {id:'adminSettings',title:'🛠️ Admin — Tetapan',kind:'admin',about:'Tetapan identiti AVIA, waktu solat dan sinkronisasi.',sample:['Organisasi: UNIT IT','Subtitle AVIA','Waktu Solat JAKIM: Auto / Manual','[Simpan Tetapan]','[Sync Sekarang]'],how:'Ubah tetapan yang dibenarkan, simpan, kemudian semak hasil pada dashboard.'}
  ];
  function mount(){
    const app=document.getElementById('appView');
    const panel=document.querySelector('#drawer .drawerPanel');
    if(!app||!panel||document.getElementById('aviaGuide'))return;
    const css=document.createElement('style');
    css.id='aviaGuideStyles';
    css.textContent='#aviaGuide .ag-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}#aviaGuide .ag-select{flex:1;min-width:150px}#aviaGuide .ag-preview{border:1px dashed #b9cbe0;background:#f8fbff;border-radius:12px;padding:12px;margin:12px 0}#aviaGuide .ag-line{padding:7px 0;border-bottom:1px solid #e7edf6;font-size:13px}#aviaGuide .ag-line:last-child{border:0}#aviaGuide .ag-safe{font-weight:700;color:#1c6a3a}#aviaGuide .ag-muted{color:#697386;font-size:12px}#aviaGuide button{max-width:100%}#aviaGuide .ag-actions{display:flex;flex-wrap:wrap;gap:8px}';
    document.head.appendChild(css);
    const menu=document.createElement('button');
    menu.type='button';
    menu.className='drawerItem';
    menu.id='aviaGuideMenu';
    menu.textContent='🧭 Panduan & Simulasi';
    const profileItem=panel.querySelector('[data-view="profile"]');
    if(profileItem)panel.insertBefore(menu,profileItem);else panel.appendChild(menu);
    const view=document.createElement('section');
    view.id='aviaGuide';
    view.className='view hidden';
    view.innerHTML='<div class="card"><h2 style="margin-top:0">🧭 Panduan & Simulasi AVIA</h2><p class="note"><b>Latihan sahaja.</b> Semua nama, tarikh, nombor dan status yang ditunjukkan di sini ialah contoh. Tiada data Supabase ditambah, diubah atau dipadam.</p><div class="ag-row" style="margin:14px 0"><label class="ag-select">Simulasi peranan<select id="aviaGuideRole" class="field"><option value="staff">Staf</option><option value="lead">Ketua Unit</option><option value="admin">Admin</option></select></label><label class="ag-select">Menu untuk dilihat<select id="aviaGuideTopic" class="field"></select></label></div><div id="aviaGuideContent"></div><div class="ag-actions"><button type="button" class="light" id="aviaGuidePrev">‹ Sebelum</button><button type="button" class="light" id="aviaGuideNext">Seterusnya ›</button><button type="button" id="aviaGuideReal">Buka Menu Sebenar</button></div><p id="aviaGuideNotice" class="ag-muted" role="status" aria-live="polite" style="margin-top:10px"></p></div>';
    app.appendChild(view);
    let visible=topics.filter(t=>t.kind==='main');
    function render(){
      const topic=topics.find(t=>t.id===document.getElementById('aviaGuideTopic').value)||visible[0];
      const area=document.getElementById('aviaGuideContent');
      if(!topic)return;
      area.replaceChildren();
      const h=document.createElement('h3');h.textContent=topic.title;h.style.marginBottom='7px';area.appendChild(h);
      const p=document.createElement('p');p.textContent=topic.about;area.appendChild(p);
      const box=document.createElement('div');box.className='ag-preview';
      const label=document.createElement('div');label.className='ag-muted';label.textContent='CONTOH PAPARAN (bukan data sebenar)';box.appendChild(label);
      topic.sample.forEach(line=>{const div=document.createElement('div');div.className='ag-line';div.textContent=line;box.appendChild(div)});
      area.appendChild(box);
      const h4=document.createElement('h4');h4.textContent='Cara guna menu sebenar';area.appendChild(h4);
      const details=document.createElement('p');details.textContent=topic.how;area.appendChild(details);
      const notice=document.getElementById('aviaGuideNotice');
      const isAdmin=topic.kind==='admin';
      const hasAdminAccess=!!document.getElementById('adminMenu')&&!document.getElementById('adminMenu').classList.contains('hidden');
      const real=document.getElementById('aviaGuideReal');
      real.disabled=isAdmin&&!hasAdminAccess;
      notice.textContent=isAdmin&&!hasAdminAccess?'Ini simulasi Admin sahaja. Akaun anda tiada akses Admin untuk membuka menu sebenar.':'Butang “Buka Menu Sebenar” akan membawa anda ke fungsi sebenar. Perubahan di sana akan disimpan seperti biasa.';
    }
    function roleChanged(){
      const role=document.getElementById('aviaGuideRole').value;
      visible=topics.filter(t=>t.kind==='main'||role==='admin');
      const select=document.getElementById('aviaGuideTopic');
      select.replaceChildren();
      visible.forEach(t=>{const op=document.createElement('option');op.value=t.id;op.textContent=t.title;select.appendChild(op)});
      document.getElementById('aviaGuideNotice').textContent='';
      render();
    }
    document.getElementById('aviaGuideRole').addEventListener('change',roleChanged);
    document.getElementById('aviaGuideTopic').addEventListener('change',render);
    const step=delta=>{const select=document.getElementById('aviaGuideTopic');const i=Math.max(0,visible.findIndex(t=>t.id===select.value));select.value=visible[(i+delta+visible.length)%visible.length].id;render();};
    document.getElementById('aviaGuidePrev').addEventListener('click',()=>step(-1));
    document.getElementById('aviaGuideNext').addEventListener('click',()=>step(1));
    document.getElementById('aviaGuideReal').addEventListener('click',()=>{
      const item=topics.find(t=>t.id===document.getElementById('aviaGuideTopic').value);
      if(!item)return;
      if(item.kind==='admin'&&document.getElementById('adminMenu')?.classList.contains('hidden'))return;
      if(typeof show!=='function')return;
      if(item.kind==='admin'){
        show('admin');
        const tab=document.querySelector('.adminTab[data-tab="'+item.id+'"]');
        if(tab)tab.click();
      }else show(item.id);
    });
    menu.addEventListener('click',()=>{if(typeof show==='function')show('aviaGuide');else{document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'));view.classList.remove('hidden');document.getElementById('drawer')?.classList.add('hidden')}render();});
    roleChanged();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();