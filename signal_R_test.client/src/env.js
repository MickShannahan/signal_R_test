export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'https://localhost:5001' : ''
export const useSockets = false
export const useSignalR = true
export const domain = ''
export const clientId = ''
export const audience = ''
