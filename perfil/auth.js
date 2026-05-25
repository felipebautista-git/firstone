// ============================================================
// AUTH — Perfil Personal · Los Elegidos Colombia
// Autenticación con SHA-256 via Web Crypto API
// ============================================================

const AUTH = {
  USERNAME:    'felipe',
  PASS_HASH:   'f5f7c396596e8d2dc4a019c7d1a9fed6b51b1e8b55fa7ec8bf83404a4ff96198',
  SESSION_KEY: 'perfil_session',
  DURATION_MS: 8 * 60 * 60 * 1000, // 8 horas

  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data    = encoder.encode(password);
    const buffer  = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  },

  async login(username, password) {
    if (username.toLowerCase().trim() !== this.USERNAME) return false;
    const hash = await this.hashPassword(password);
    return hash === this.PASS_HASH;
  },

  setSession() {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify({
      user:    this.USERNAME,
      expires: Date.now() + this.DURATION_MS
    }));
  },

  isAuthenticated() {
    try {
      const raw = localStorage.getItem(this.SESSION_KEY);
      if (!raw) return false;
      const s = JSON.parse(raw);
      if (Date.now() > s.expires) {
        localStorage.removeItem(this.SESSION_KEY);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  },

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    window.location.href = 'login.html';
  },

  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = 'login.html';
    }
  },

  getUser() {
    try {
      const raw = localStorage.getItem(this.SESSION_KEY);
      if (!raw) return null;
      return JSON.parse(raw).user;
    } catch { return null; }
  }
};
