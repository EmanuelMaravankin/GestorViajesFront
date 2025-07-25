const TOKEN = "f75b8ddb82e8e5071987100a29dabab0";

export async function obtenerVuelos(origen, destino) {
  try {
    const res = await fetch(
      //`http://localhost:3001/api/vuelos?origin=${origen}&destination=${destino}`,
      `/api/vuelos?origin=${origen}&destination=${destino}`,
      {
        headers: {
          "X-Access-Token": TOKEN,
          Accept: "application/json",
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}