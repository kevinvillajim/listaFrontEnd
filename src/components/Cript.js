import CryptoJS from "crypto-js";

const SECRET_KEY = "n=w^A0weX-d4LjYgEDMP";

// Función para encriptar datos
export function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

// Función para desencriptar datos
export function decryptData(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

// Función para guardar datos en localStorage
export function saveToLocalStorage(key, data) {
  const encryptedData = encryptData(data);
  localStorage.setItem(key, encryptedData);
}

// Función para obtener datos de localStorage
export function getFromLocalStorage(key) {
  const encryptedData = localStorage.getItem(key);
  if (!encryptedData) {
    return null;
  }
  return decryptData(encryptedData);
}

export default {
  encryptData,
  decryptData,
  saveToLocalStorage,
  getFromLocalStorage,
};
