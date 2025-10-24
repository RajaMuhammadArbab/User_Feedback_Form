document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const responseMessage = document.getElementById('responseMessage');
    const submitBtn = form.querySelector('.submit-btn');

    document.getElementById('name').addEventListener('blur', validateName);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('message').addEventListener('blur', validateMessage);

    form.addEventListener('submit', handleSubmit);

    function validateName() {
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        const name = nameInput.value.trim();

        if (!name) {
            showError(nameInput, nameError, 'Name is required');
            return false;
        }

        clearError(nameInput, nameError);
        return true;
    }

    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            showError(emailInput, emailError, 'Email is required');
            return false;
        }

        if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        }

        clearError(emailInput, emailError);
        return true;
    }

    function validateMessage() {
        const messageInput = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        const message = messageInput.value.trim();

        if (!message) {
            showError(messageInput, messageError, 'Feedback message is required');
            return false;
        }

        if (message.length < 10) {
            showError(messageInput, messageError, 'Message must be at least 10 characters long');
            return false;
        }

        clearError(messageInput, messageError);
        return true;
    }

    function showError(input, errorElement, message) {
        input.style.borderColor = '#e74c3c';
        errorElement.textContent = message;
    }

    function clearError(input, errorElement) {
        input.style.borderColor = '#e1e1e1';
        errorElement.textContent = '';
    }

    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        return isNameValid && isEmailValid && isMessageValid;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            showResponse('Please fix the errors above', 'error');
            return;
        }

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        try {
            setLoading(true);
            
            const response = await fetch('http://localhost:3000/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                showResponse('Thank you for your feedback!', 'success');
                form.reset();
            } else {
                showResponse(result.error || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showResponse('Network error. Please check if the server is running.', 'error');
        } finally {
            setLoading(false);
        }
    }

    function showResponse(message, type) {
        responseMessage.textContent = message;
        responseMessage.className = `response-message ${type}`;
        
        if (type === 'success') {
            setTimeout(() => {
                responseMessage.style.display = 'none';
            }, 5000);
        }
    }

    function setLoading(loading) {
        submitBtn.disabled = loading;
        submitBtn.textContent = loading ? 'Submitting...' : 'Submit Feedback';
    }
});