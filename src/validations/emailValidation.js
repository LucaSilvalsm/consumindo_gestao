export function validarEmail(email) {

  if (!email.trim()) {
    return "Informe seu e-mail.";
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    return "Informe um e-mail válido.";
  }

  return null;
}
