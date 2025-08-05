import api from './api';

export const addSubscription = (data) => api.post('/subscriptions', data);
export const getSubscriptions = () => api.get('/subscriptions');
