export function pick(value, lang) {
  if (value && typeof value === 'object' && !Array.isArray(value) && ('en' in value || 'ar' in value)) {
    return value[lang] ?? value.en ?? '';
  }
  return value;
}

export function pickList(list, lang) {
  return (list || []).map((item) => pick(item, lang));
}
