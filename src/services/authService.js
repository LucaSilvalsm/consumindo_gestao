import api from "./api";

export const login = (dados) => {
  return api.post("/auth/login", dados);
};

export const esqueciSenha = (email) => {
  return api.post("/auth/esqueci-senha", email);
};

export const validarToken = (token) => {
  return api.get(`/auth/redefinir-senha/${token}`);
};

export const redefinirSenha = (token, dados) => {
  return api.patch(`/auth/redefinir-senha/${token}`, dados);
};
