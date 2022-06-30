export const setInscriptionStorage = (id, inscription, font) => {
  localStorage.setItem(`ring_id_${id}`, `${inscription}/${font}`);
};

export const getInscriptionStorage = (id) => {
  const localItem = localStorage.getItem(`ring_id_${id}`);
  const inscription = localItem ? localItem.split('/')[0] : null;
  return inscription;
};

export const getInscriptionFontStorage = (id) => {
  const localItem = localStorage.getItem(`ring_id_${id}`);
  const font = localItem ? localItem.split('/')[1] : null;
  return font;
};

export const removeInscriptionStorage = (id) => {
  localStorage.removeItem(`ring_id_${id}`)
};

export const removeAllInscriptionsStorage = () => {
  for (let key in localStorage) {
    if (key.slice(0, 8) === 'ring_id_') {
      localStorage.removeItem(key)
    }
  }
};
