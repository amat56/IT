# Setup Supabase - MyUnit Calendar v6

1. Create a Supabase project.
2. Open SQL Editor and run `schema.sql`.
3. Authentication > Users > Add user for the first admin.
4. In SQL Editor, promote that account to admin:
   `update public.profiles set role='admin', full_name='Admin Sistem' where email='YOUR_EMAIL';`
5. Project Settings/API: copy Project URL and anon/publishable key.
6. Open app > Supabase Setup and paste both values.
7. Login using the admin email/password.
8. For each staff member: Authentication > Users > Add user. The trigger creates a profile automatically. In app Admin > Staf, set full name, unit and role.

Security note: Never place the service_role key inside the APK. Use only the anon/publishable key; Row Level Security enforces access.


## v6.1 - Edit/Delete pergerakan
Selepas schema asas siap, run fail:

`migration_v6_1_edit_delete.sql`

Polisi:
- Admin boleh edit/delete semua rekod.
- Staff boleh edit/delete rekod sendiri sahaja.
- Kawalan dibuat oleh Supabase RLS, bukan UI semata-mata.

Dalam app:
- Tekan rekod pada kalendar untuk buka editor.
- Betulkan status/tarikh/masa/lokasi/catatan.
- Tekan `Padam Rekod` jika key-in salah.


## v6.1d - Senarai status baharu
Run `migration_v6_1d_status_list.sql`.

Status:
- Mesyuarat/Kursus/Bengkel di Luar Pejabat
- Kursus/Bengkel di Dalam Pejabat
- Bekerja di Pejabat/Mesyuarat di Pejabat
- Keluar Pejabat
- Cuti Rehat
- Cuti Sakit
- Cuti Umum
- Cuti Sekolah
- Kuarantin / Cuti Menjaga Anak Dikuarantin
- Cuti Tanpa Gaji

`NOTA` tidak digunakan sebagai status.


## v6.2 - Cuti Umum dalam kalendar
Run:
`migration_v6_2_public_holidays.sql`

Fungsi:
- Semua pengguna boleh lihat Cuti Umum.
- Tarikh Cuti Umum diwarnakan kuning.
- Admin boleh tambah/edit/padam Cuti Umum.
- Struktur ini sesuai untuk auto-import cuti Malaysia pada masa akan datang.

Cadangan penggunaan:
- `scope=federal` untuk cuti Persekutuan.
- `scope=state` untuk cuti negeri.
- `scope=internal` untuk cuti khas jabatan/organisasi.


## v6.3 - Tambah Staf dari APK

Run:
`migration_v6_3_add_staff.sql`

Kemudian deploy Edge Function:
`supabase/functions/admin-create-user/index.ts`

Function secrets yang diperlukan:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

PENTING:
- Jangan letak service-role key dalam APK.
- Edge Function menyemak bahawa pengguna semasa mempunyai `profiles.role = 'admin'`.

Demo mode:
- Butang `+ Tambah Staf` berfungsi terus menggunakan data local.


## v6.4
Run `migration_v6_4_admin_full_control.sql`.
Deploy Edge Functions:
- `admin-create-user`
- `admin-delete-user`
Service role hanya disimpan sebagai Edge Function secret, bukan dalam APK.
