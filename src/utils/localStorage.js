export function leerLocalStorage(clave, valorInicial) {
  try {
    const datosGuardados = localStorage.getItem(clave);

    if (datosGuardados) {
      return JSON.parse(datosGuardados);
    }

    return valorInicial;
  } catch (error) {
    return valorInicial;
  }
}