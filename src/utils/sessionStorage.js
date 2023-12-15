class SessionStorage {
  setCache(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  getCache(key) {
    const value = window.sessionStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteCache(key) {
    window.sessionStorage.removeItem(key);
  }

  clearCahce() {
    window.sessionStorage.clear();
  }
}

export default new SessionStorage();
