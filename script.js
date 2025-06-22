document.addEventListener('DOMContentLoaded', () => {
  const CalculadorLabel = document.getElementById('CalculadorLabel');
  const operadores = ['+', '-', '*', '/', '%'];

  function valor(value) {
    const actual = CalculadorLabel.value;

    // No permitir operadores al inicio o paréntesis de cierre
    if (actual === '' && (operadores.includes(value))) return;
    const ultimo = actual.slice(-1);
    // No permitir dos operadores seguidos
    if (operadores.includes(ultimo) && operadores.includes(value)) return;
    // No permitir '.' repetido directamente
    if (value === '.' && ultimo === '.') return;
    // No permitir '%' al inicio o tras operador
    if (value === '%' && (actual === '' || operadores.includes(ultimo))) return;
   

    CalculadorLabel.value += value;
  }

  function limpiarTodo() {
    CalculadorLabel.value = '';
  }

  function calcular() {
    let expression = CalculadorLabel.value;
    // Validar que no inicie con '='
    if (expression === '') {    
      return;
    }
    try {
      // Validar división por cero
      if (/\/0(?!\d)/.test(expression)) {
        CalculadorLabel.value = 'Error: División por 0';
        return;
      }
      expression = expression.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
      const result = eval(expression);
      CalculadorLabel.value = result;
    } catch (e) {
      CalculadorLabel.value = 'Error';
    }
  }

  function borrar() {
    CalculadorLabel.value = CalculadorLabel.value.slice(0, -1);
  }

  // objectos globales del navegador
  window.valor = valor;
  window.limpiarTodo = limpiarTodo;
  window.calcular = calcular;
  window.borrar = borrar;
});
