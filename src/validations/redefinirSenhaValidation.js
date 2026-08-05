export function validarRedefinicao(form) {

    const errors = {};

    if (!form.senha) {
        errors.senha = "Informe uma senha.";
    }
    else if (form.senha.length < 8) {
        errors.senha = "A senha deve possuir pelo menos 8 caracteres.";
    }

    if (!form.confirmarSenha) {
        errors.confirmarSenha = "Confirme sua senha.";
    }
    else if (form.senha !== form.confirmarSenha) {
        errors.confirmarSenha = "As senhas não coincidem.";
    }

    return errors;

}
