document.addEventListener('DOMContentLoaded', () => {
    const register1Form = document.getElementById('register1Form');
    const register2Form = document.getElementById('register2Form');
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const resetPasswordForm = document.getElementById('resetPasswordForm');

    if (register1Form) {
        register1Form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(register1Form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('http://localhost:8080/api/register1', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    localStorage.setItem('userId', result.id); // Armazene o ID do usuário
                    window.location.href = 'register2.html';
                } else {
                    document.getElementById('message').textContent = result.error;
                }
            } catch (error) {
                console.error('Erro ao enviar o formulário (register1):', error);
                document.getElementById('message').textContent = 'Erro ao enviar o formulário';
            }
        });
    }

    if (register2Form) {
        register2Form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(register2Form);
            const data = Object.fromEntries(formData.entries());
            const userId = localStorage.getItem('userId');

            data.id = userId; // Adiciona o ID do usuário ao payload

            try {
                const response = await fetch('http://localhost:8080/api/register2', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    window.location.href = 'login.html';
                } else {
                    document.getElementById('message').textContent = result.error;
                }
            } catch (error) {
                console.error('Erro ao enviar o formulário (register2):', error);
                document.getElementById('message').textContent = 'Erro ao enviar o formulário';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('http://localhost:8080/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', result.token);
                    window.location.href = 'home.html';
                } else {
                    document.getElementById('message').textContent = result.error;
                }
            } catch (error) {
                console.error('Erro ao enviar o formulário (login):', error);
                document.getElementById('message').textContent = 'Erro ao enviar o formulário';
            }
        });
    }

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(forgotPasswordForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('http://localhost:8080/api/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    document.getElementById('message').textContent = 'E-mail de recuperação enviado';
                } else {
                    document.getElementById('message').textContent = result.error;
                }
            } catch (error) {
                console.error('Erro ao enviar o formulário (forgotPassword):', error);
                document.getElementById('message').textContent = 'Erro ao enviar o formulário';
            }
        });
    }

    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(resetPasswordForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('http://localhost:8080/api/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    document.getElementById('message').textContent = 'Senha redefinida com sucesso';
                } else {
                    document.getElementById('message').textContent = result.error;
                }
            } catch (error) {
                console.error('Erro ao enviar o formulário (resetPassword):', error);
                document.getElementById('message').textContent = 'Erro ao enviar o formulário';
            }
        });
    }
});
