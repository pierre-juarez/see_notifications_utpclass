const notifications = require("./notifications.json");
const token = "token_usuario";

async function seeNotification() {
  console.log("Iniciando notificación");
  for (const notification of notifications) {
    if (!notification.seen) {
      await toSeenBD(notification.id);
    }
  }
  await allNotifications();
}

async function toSeenBD(id) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api-pao.utpxpedition.com/communication/student/notifications/${id}/to-seen`,
      {
        headers: {
          accept: "*/*",
          "accept-language":
            "es-PE,es;q=0.9,en-US;q=0.8,en;q=0.7,es-ES;q=0.6,es-419;q=0.5",
          authorization: `Bearer ${token}`,
          priority: "u=1, i",
          "sec-ch-ua":
            '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "transaction-id": "18ab8e50-ece2-42ce-b208-ed38e6eab67c",
          "user-id": "4ca21cf2-d5b2-55db-97e4-c9c8252361a8",
          "user-id-to-access": "",
          "user-role": "STUDENT",
          "user-role-to-access": "",
          Referer: "https://class.utp.edu.pe/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: null,
        method: "PATCH",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        console.log(`Notificación ${id} leida`);
        resolve(data);
      })
      .catch((error) => {
        console.error(`Error al procesar notificación ${id}:`, error);
        reject(error);
      });
  });
}

async function allNotifications() {
  return new Promise((resolve, reject) => {
    fetch(
      "https://api-pao.utpxpedition.com/communication/student/notifications/total/user/4ca21cf2-d5b2-55db-97e4-c9c8252361a8",
      {
        headers: {
          accept: "*/*",
          "accept-language":
            "es-PE,es;q=0.9,en-US;q=0.8,en;q=0.7,es-ES;q=0.6,es-419;q=0.5",
          authorization: `Bearer ${token}`,
          priority: "u=1, i",
          "sec-ch-ua":
            '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "transaction-id": "1da5d024-f0f3-48f0-8616-0540331bfe07",
          "user-id": "4ca21cf2-d5b2-55db-97e4-c9c8252361a8",
          "user-id-to-access": "",
          "user-role": "STUDENT",
          "user-role-to-access": "",
          Referer: "https://class.utp.edu.pe/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: null,
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data);
        console.log(`Aún quedan ${data.data.count} notificaciones sin leer`);
        resolve(data);
      })
      .catch((error) => {
        console.log("Error al visualizar cantidad de notificaciones: ", error);
        reject(error);
      });
  });
}

function demo() {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Respuesta del servidor:", data);
    })
    .catch((error) => {
      console.error("Error en la solicitud - catch:", error);
    });
}

seeNotification();
