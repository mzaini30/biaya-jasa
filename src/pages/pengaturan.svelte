<script>
  import { biaya_per_hari } from "../state";
  import localforage from "localforage";
  import { push } from "svelte-spa-router";

  async function simpan() {
    let menyimpan = await localforage.setItem(
      "biaya_per_hari",
      $biaya_per_hari,
    );
    if (menyimpan) {
      push("/");
    }
  }
</script>

<div class="p-3">
  <h1>Pengaturan</h1>
  <hr />
  <form on:submit|preventDefault={simpan} action="">
    <label for="" class="form-label">Biaya Per Hari</label>
    <input
      type="tel"
      class="form-control mb-3"
      bind:value={$biaya_per_hari}
      required
    />
    <input type="submit" value="Simpan" class="btn btn-success" />
  </form>
</div>
