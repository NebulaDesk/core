// storage.js
// Local-first key/value storage with optional client-side encryption.
// - Stores data in IndexedDB ("local-dashboard" / "kv").
// - If you pass a passphrase, values are encrypted with AES-GCM (256-bit) via Web Crypto.
// - If you omit a passphrase, values are saved as plain strings.
// - Reading gracefully handles both encrypted and plain records.
//
// Usage:
//   import { storage } from './storage.js';
//   await storage.set('notes', 'hello', 'pass123'); // encrypted
//   const text = await storage.get('notes', 'pass123'); // -> 'hello'
//
//   await storage.set('memo', 'plain text'); // unencrypted
//   const memo = await storage.get('memo');  // -> 'plain text'
//
// Notes:
// - If you saved unencrypted and later call get() with a passphrase, you'll still get the plain text.
// - If you saved encrypted and call get() without a passphrase, get() returns '' (no throw).
// - Wrong passphrase when data is encrypted -> throws (catch and show a friendly message in UI).

export const storage = (() => {
  const DB_NAME = 'local-dashboard';
  const STORE = 'kv';

  // ---------- IndexedDB helpers ----------
  function openDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function idbGet(key) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function idbSet(key, val) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(val, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async function idbDel(key) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async function idbHas(key) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).getKey(key);
      req.onsuccess = () => resolve(req.result !== undefined);
      req.onerror = () => reject(req.error);
    });
  }

  // ---------- Crypto helpers ----------
  const enc = new TextEncoder();
  const dec = new TextDecoder();

  const rand = (n) => crypto.getRandomValues(new Uint8Array(n));

  async function deriveKey(pass, salt) {
    // PBKDF2 → AES-GCM 256
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      enc.encode(pass),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 120000, // good balance for browsers
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async function encrypt(plain, pass) {
    const iv = rand(12);
    const salt = rand(16);
    const key = await deriveKey(pass, salt);
    const ct = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      enc.encode(plain)
    );
    return {
      iv: Array.from(iv),
      salt: Array.from(salt),
      ct: Array.from(new Uint8Array(ct)),
      alg: 'AES-GCM',
      kdf: 'PBKDF2-SHA256-120k',
      v: 1,
    };
  }

  async function decrypt(payload, pass) {
    if (
      !payload ||
      !payload.iv ||
      !payload.salt ||
      !payload.ct ||
      payload.alg !== 'AES-GCM'
    ) {
      throw new Error('Invalid payload');
    }
    const iv = new Uint8Array(payload.iv);
    const salt = new Uint8Array(payload.salt);
    const ct = new Uint8Array(payload.ct);
    const key = await deriveKey(pass, salt);
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
    return dec.decode(pt);
  }

  // ---------- Public API ----------
  return {
    /**
     * Get a value by key.
     * - If pass is provided and data is encrypted, returns decrypted string (or throws on wrong pass).
     * - If pass is provided and data is plain, returns the plain string (no throw).
     * - If pass is empty and data is encrypted, returns '' (no throw).
     */
    async get(key, pass = '') {
      const raw = await idbGet(key);
      if (raw === undefined || raw === null) return '';

      // Plain string stored?
      if (typeof raw === 'string') {
        // If caller expects encrypted but value is plain, just return it.
        return raw;
      }

      // Looks like encrypted payload
      if (!pass) {
        // Caller didn't provide a passphrase; don't throw, just return empty
        return '';
      }
      return await decrypt(raw, pass);
    },

    /**
     * Set a value by key.
     * - If pass is provided, stores encrypted payload object.
     * - If pass is empty, stores plain string.
     */
    async set(key, value, pass = '') {
      const str = String(value ?? '');
      if (!pass) {
        await idbSet(key, str);
        return;
      }
      const payload = await encrypt(str, pass);
      await idbSet(key, payload);
    },

    /** Delete a key */
    async del(key) {
      await idbDel(key);
    },

    /** Check if a key exists */
    async has(key) {
      return await idbHas(key);
    },
  };
})();
