let btn = document.querySelector("button");

function isPrivateIp(ip) {
  let flag = false;
  let values = ip.split(".").map((value) => parseInt(value));

  if (
    values[0] == 10 &&
    (values[1] >= 0 || values[1] <= 255) &&
    (values[2] >= 0 || values[2] <= 255) &&
    (values[3] >= 0 || values[3] <= 255)
  ) {
    flag = true;
  } else if (
    values[0] == 172 &&
    (values[1] >= 16 || values[1] <= 31) &&
    (values[2] >= 0 || values[2] <= 255) &&
    (values[3] >= 0 || values[3] <= 255)
  ) {
    flag = true;
  } else if (
    values[0] == 192 &&
    values[1] == 168 &&
    (values[2] >= 0 || values[2] <= 255) &&
    (values[3] >= 0 || values[3] <= 255)
  ) {
    flag = true;
  }

  return flag;
}

function startIpPosition() {
  let ip = prompt("Inserisci il tuo IP");

  if (isPrivateIp(ip)) {
    document.getElementById("position").innerText =
      "L'ip è di classe privato, dati non reperibili!!";
    document.getElementById("owner").innerText = "Ricerca fallita :(";
  } else {
    let query = `http://ip-api.com/json/${ip}`;

    async function getResponse() {
      let request = await fetch(query).then((response) => response.json());
      return request;
    }

    async function updatePage() {
      try {
        let response = await getResponse();
        console.log(response.city);
        document.getElementById(
          "position"
        ).innerText = `${response.country}, ${response.city}, ${response.regionName}`;
        document.getElementById(
          "owner"
        ).innerText = `${response.as}, ${response.query}`;
      } catch (error) {
        console.error("Errore nella richiesta:", error);
      }
    }

    updatePage();
  }
}

startIpPosition();
