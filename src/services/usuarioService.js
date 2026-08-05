import api from "./api";

export const cadastrar = async (usuario) => {
    const response = await api.post("/users", usuario);

    return response.data;
};
export const listar = () => {
    return api.get("/users");
};

export const buscarPorId = (id) => {
    return api.get(`/users/${id}`);
};

export const atualizarCargo = (id, dados) => {
    return api.patch(`/users/${id}`, dados);
};

export const excluir = (id) => {
    return api.delete(`/users/${id}`);
};
