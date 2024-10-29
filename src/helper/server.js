export default async function server(path, data) {
  let path_sebenarnya = "";
  // jika masih di mode dev vite, path_sebenarnya adalah path yang kemudian regex dari awal substring sampai "/server", dihapus aja
  if (import.meta.env.PROD) {
    path_sebenarnya = path.replace(
      /^(.*\/server\/)(.*)$/,
      import.meta.env.VITE_HOST_BACKEND + "/server/$2",
    );
  } else if (import.meta.env.DEV) {
    path_sebenarnya = path.replace(
      /^(.*\/server\/)(.*)$/,
      "http://localhost:7878/$2",
    );
  }
  if (!data) {
    // console.log("metode get");
    const res = await fetch(path_sebenarnya);
    return res.json();
  } else {
    // console.log("metode post");
    // const res = await fetch(path_sebenarnya, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: JSON.stringify(body),
    // });
    // return res.json();
    const body = new FormData();
    for (let n in data) {
      body.append(n, data[n]);
    }

    let proses = await fetch(
      path_sebenarnya,
      {
        method: "post",
        body,
      },
      {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    );
    return proses.json();
  }
  //   return { path_sebenarnya };
}
