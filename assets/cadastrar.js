const API_KEY = 'patNlMmnXwVhT8DuT.bd6cceca7944cbff2706268131ffdcad7806006c874f31f97d21c003263e7253';
const BASE_ID = 'appoOKQkOyibUc1Tg';
const TABLE_NAME = 'ListaPresenca';

const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

// Função para abrir modais
const openModal = (modalId) => {
    document.getElementById(modalId).classList.remove('hidden');
};

// Função para fechar modais
const closeModal = (modalId) => {
    document.getElementById(modalId).classList.add('hidden');
};

// Função para mostrar o spinner
const showLoading = () => {
    const spinner = document.getElementById('loadingSpinner');
    spinner.classList.remove('hidden');  // Exibe o spinner
};

// Função para esconder o spinner
const hideLoading = () => {
    const spinner = document.getElementById('loadingSpinner');
    spinner.classList.add('hidden');  // Esconde o spinner
};

// Função para enviar os dados ao Airtable
const enviarPresenca = async (nome, quantidadeDePessoas, confirmar) => {
    showLoading();  // Exibe o spinner de carregamento
    try {
        await axios.post(url, {
            fields: {
                Nome: nome,
                "Quantidade de pessoas": quantidadeDePessoas,
                "Confirma presença?": confirmar,
            }
        }, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        
        hideLoading();  // Esconde o spinner
        openModal('modalSuccess'); // Mostra o modal de sucesso
    } catch (error) {
        hideLoading();  // Esconde o spinner
        console.log(quantidadeDePessoas);
        console.error('Erro ao enviar os dados:', error);
        openModal('modalError'); // Mostra o modal de erro
    }
};

// Evento de envio do formulário
document.getElementById('presencaForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const quantidadeDePessoas = document.getElementById('quantidade').value;
    const confirmar = document.getElementById('confirmar').value;

    if( ! quantidadeDePessoas <= 0) {
        // Chama a função para enviar os dados para o Airtable
        enviarPresenca(nome, quantidadeDePessoas, confirmar);
    } else {
        openModal('modalError')
    }
});
