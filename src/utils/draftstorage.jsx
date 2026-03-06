const LOCAL_STORAGE_KEY = "legal_intake_draft";

function saveDraft(data) {
  try { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function loadDraft() {
  try { return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}; } catch { return {}; }
}

function clearDraft() {
  try { localStorage.removeItem(LOCAL_STORAGE_KEY); } catch {}
}

export { saveDraft, loadDraft, clearDraft };