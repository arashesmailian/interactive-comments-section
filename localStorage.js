let dataaaaaa;
fetch("http://localhost:5500/data.json")
  .then((res) => res.json())
  .then((d) => {
    console.log(d);
    localStorage.setItem("data", JSON.stringify(d));
    dataaaaaa = d;
  });
