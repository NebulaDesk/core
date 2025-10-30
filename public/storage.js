// Tiny helper for local encrypted storage using IndexedDB + WebCrypto
// If no passphrase is provided, data is stored as plain text.
export const storage = (()=>{
  const DB_NAME = 'local-dashboard';
  const STORE = 'kv';

  function openDB(){
    return new Promise((resolve,reject)=>{
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = ()=> req.result.createObjectStore(STORE);
      req.onsuccess = ()=> resolve(req.result);
      req.onerror = ()=> reject(req.error);
    });
  }
  async function idbGet(key){
    const db = await openDB();
    return new Promise((resolve,reject)=>{
      const tx = db.transaction(STORE,'readonly');
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = ()=> resolve(req.result);
      req.onerror = ()=> reject(req.error);
    });
  }
  async function idbSet(key, val){
    const db = await openDB();
    return new Promise((resolve,reject)=>{
      const tx = db.transaction(STORE,'readwrite');
      tx.objectStore(STORE).put(val, key);
      tx.oncomplete = ()=> resolve();
      tx.onerror = ()=> reject(tx.error);
    });
  }

  // --- Crypto helpers ---
  async function deriveKey(pass, salt){
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(pass), {name:'PBKDF2'}, false, ['deriveKey']);
    return crypto.subtle.deriveKey({name:'PBKDF2', salt, iterations:120000, hash:'SHA-256'}, keyMaterial, {name:'AES-GCM', length:256}, false, ['encrypt','decrypt']);
  }
  const rand = (n)=> crypto.getRandomValues(new Uint8Array(n));

  async function encrypt(plain, pass){
    const enc = new TextEncoder();
    const iv = rand(12); const salt = rand(16);
    const key = await deriveKey(pass, salt);
    const ct = await crypto.subtle.encrypt({name:'AES-GCM', iv}, key, enc.encode(plain));
    return {iv: Array.from(iv), salt: Array.from(salt), ct: Array.from(new Uint8Array(ct))};
  }
  async function decrypt(payload, pass){
    const dec = new TextDecoder();
    const iv = new Uint8Array(payload.iv); const salt = new Uint8Array(payload.salt); const ct = new Uint8Array(payload.ct);
    const key = await deriveKey(pass, salt);
    const pt = await crypto.subtle.decrypt({name:'AES-GCM', iv}, key, ct);
    return dec.decode(pt);
  }

  return {
    async get(key, pass=''){
      const raw = await idbGet(key);
      if(!raw) return '';
      if(!pass) return typeof raw==='string' ? raw : '';
      // expect encrypted payload
      return await decrypt(raw, pass);
    },
    async set(key, value, pass=''){
      if(!pass){ await idbSet(key, String(value)); return; }
      const payload = await encrypt(String(value), pass);
      await idbSet(key, payload);
    }
  };
})();
