export function validarCadastro(form) {
  const errors = {};

  // Nome
  if (!form.nome.trim()) {
    errors.nome = "Informe seu nome.";
  } else if (form.nome.trim().length < 2) {
    errors.nome = "O nome deve possuir pelo menos 2 caracteres.";
  }

  // Sobrenome
  if (!form.sobrenome.trim()) {
    errors.sobrenome = "Informe seu sobrenome.";
  } else if (form.sobrenome.trim().length < 2) {
    errors.sobrenome = "O sobrenome deve possuir pelo menos 2 caracteres.";
  }

  // Email
  if (!form.email.trim()) {
    errors.email = "Informe seu e-mail.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      errors.email = "Informe um e-mail válido.";
    }
  }

  // Senha
  if (!form.senha) {
    errors.senha = "Informe uma senha.";
  } else if (form.senha.length < 8) {
    errors.senha = "A senha deve possuir pelo menos 8 caracteres.";
  }

  // Confirmar senha
  if (!form.confirmarSenha) {
    errors.confirmarSenha = "Confirme sua senha.";
  } else if (form.senha !== form.confirmarSenha) {
    errors.confirmarSenha = "As senhas não coincidem.";
  }

  // Termos
  if (!form.aceite) {
    errors.aceite = "Você deve aceitar os Termos de Uso.";
  }

  return errors;
}
