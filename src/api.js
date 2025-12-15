// src/api.js

// 1. Detect if we are local or live
// If we set a VITE_API_URL environment variable, use it. Otherwise, use localhost.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const SERVER_URL = BASE_URL;
const API_URL = `${BASE_URL}/api`;

// --- MENU ITEMS ---
export const fetchMenu = async () => {
  const res = await fetch(`${API_URL}/menu`);
  return res.json();
};

export const addItem = async (itemData) => {
  const isFormData = itemData instanceof FormData;
  await fetch(`${API_URL}/menu`, {
    method: 'POST',
    headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    body: isFormData ? itemData : JSON.stringify(itemData)
  });
};

export const deleteItem = async (id) => {
  await fetch(`${API_URL}/menu/${id}`, { method: 'DELETE' });
};

// --- CATEGORIES ---
export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categories`);
  return res.json();
};

export const addCategory = async (catData) => {
  const isFormData = catData instanceof FormData;
  await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    body: isFormData ? catData : JSON.stringify(catData)
  });
};

export const deleteCategory = async (id) => {
  await fetch(`${API_URL}/categories/${id}`, { method: 'DELETE' });
};

// --- SECTIONS ---
export const fetchSections = async () => {
  const res = await fetch(`${API_URL}/sections`);
  return res.json();
};

export const addSection = async (sectionData) => {
  await fetch(`${API_URL}/sections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sectionData)
  });
};

export const deleteSection = async (id) => {
  await fetch(`${API_URL}/sections/${id}`, { method: 'DELETE' });
};

// --- ORDERS & SECURITY ---
export const placeOrder = async (orderData) => {
  const res = await fetch(`${API_URL}/order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return res.json();
};

export const verifyAdminPin = async (pin) => {
  const res = await fetch(`${API_URL}/verify-pin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin })
  });
  return res.json();
};