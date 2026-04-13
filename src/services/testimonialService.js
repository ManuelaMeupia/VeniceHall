import axios from 'axios';

const API_KEY = '$2a$10$ZN9CenkQtjxn9o55Y0JKa.9uKvk9INIHZs4pbrtBTnaVFVlZuh62G';
const BIN_ID = '69dcd76236566621a8aa7917';

const api = axios.create({
  baseURL: 'https://api.jsonbin.io/v3',
  headers: {
    'X-Master-Key': API_KEY,
    'Content-Type': 'application/json'
  }
});

// Créer un nouveau bin (à faire une seule fois)
export const createBin = async () => {
  const initialData = { testimonials: [] };
  const response = await api.post('/b', initialData);
  return response.data;
};

// Récupérer tous les avis
export const getTestimonials = async () => {
  try {
    const response = await api.get(`/b/${BIN_ID}/latest`);
    return response.data.record.testimonials || [];
  } catch (error) {
    console.error('Erreur de chargement:', error);
    return [];
  }
};

// Ajouter un avis
export const addTestimonial = async (testimonial) => {
  try {
    const current = await getTestimonials();
    const updated = [testimonial, ...current];
    await api.put(`/b/${BIN_ID}`, { testimonials: updated });
    return testimonial;
  } catch (error) {
    console.error('Erreur d\'ajout:', error);
    throw error;
  }
};

// Mettre à jour un avis
export const updateTestimonial = async (id, data) => {
  try {
    const current = await getTestimonials();
    const updated = current.map(t => t.id === id ? { ...t, ...data } : t);
    await api.put(`/b/${BIN_ID}`, { testimonials: updated });
  } catch (error) {
    console.error('Erreur de mise à jour:', error);
    throw error;
  }
};

// Supprimer un avis
export const deleteTestimonial = async (id) => {
  try {
    const current = await getTestimonials();
    const updated = current.filter(t => t.id !== id);
    await api.put(`/b/${BIN_ID}`, { testimonials: updated });
  } catch (error) {
    console.error('Erreur de suppression:', error);
    throw error;
  }
};