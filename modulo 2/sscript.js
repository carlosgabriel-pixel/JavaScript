// 1. Função Soma
const Soma = (num1, num2) => num1 + num2;

// 2. Função Subtrai
const Subtrai = (num1, num2) => num1 - num2;

// 3. Função Multiplica
const Multiplica = (num1, num2) => num1 * num2;

// 4. Função Divide
const Divide = (num1, num2) => num1 / num2;

// 5. Função MostraResultado
const MostraResultado = (num1, num2) => {
    console.log(`Soma entre ${num1} e ${num2}: ${Soma(num1, num2)}`);
    console.log(`Subtrai entre ${num1} e ${num2}: ${Subtrai(num1, num2)}`);
    console.log(`Multiplica entre ${num1} e ${num2}: ${Multiplica(num1, num2)}`);
    console.log(`Divide entre ${num1} e ${num2}: ${Divide(num1, num2)}`);
};