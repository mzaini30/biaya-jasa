<script>
  import localforage from "localforage";
  import { biaya_per_hari } from "../state";

  let textarea = "";
  let total = 0;

  async function init() {
    let dapatkan_biaya_per_hari = await localforage.getItem("biaya_per_hari");
    if (!dapatkan_biaya_per_hari) {
      $biaya_per_hari = 100000;
      localforage.setItem("biaya_per_hari", 100000);
    } else {
      $biaya_per_hari = dapatkan_biaya_per_hari;
    }

    let dapatkan_textarea = await localforage.getItem("textarea");
    if (dapatkan_textarea) {
      textarea = dapatkan_textarea;
    }
  }
  init();
  async function simpan() {
    localforage.setItem("textarea", textarea);
  }
  function hitungTotalBiaya(teks, biaya_jasa) {
    const lines = teks.split("\n"); // Memisahkan teks menjadi array berdasarkan baris
    let total = 0;

    for (let line of lines) {
      const parts = line.trim().split(" "); // Memisahkan kata di setiap baris
      const angka = parseFloat(parts[parts.length - 1]); // Mengambil angka terakhir dari baris
      if (!isNaN(angka)) {
        total += angka;
      }
    }

    return total * biaya_jasa; // Mengalikan total dengan biaya_jasa
  }
  $: if (textarea.length > 1) {
    simpan();
    total = hitungTotalBiaya(textarea, $biaya_per_hari);
  } else {
    localforage.setItem("textarea", "");
    total = 0;
  }
</script>

<div class="p-3">
  <label for="" class="form-label">Biaya Pengerjaan</label>
  <div class=" text-3xl bg-orange-500 text-white p-2 text-center rounded">
    Rp {total.toLocaleString("id-ID")}
  </div>
  <div class="my-3">
    <label for="" class="form-label">Rincian Pengerjaan</label>
    <textarea
      bind:value={textarea}
      name=""
      id=""
      rows="10"
      placeholder="Contoh :
    
Biaya perbaikan 3
Jasa ngecek 2
Biaya lainnya 0.5

Jadi, di akhir adalah spasi dan lama mengerjakannya dalam berapa hari"
      class="form-control"
    ></textarea>
  </div>
</div>
<a href="#/pengaturan" class="btn btn-success fixed z-99 bottom-3 left-3"
  >Pengaturan</a
>
