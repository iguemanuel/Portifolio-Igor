<script setup>
import { ref } from 'vue'
import emailjs from 'emailjs-com'

// Defina as variáveis de ambiente
const serviceId = import.meta.env.VITE_SERVICE_ID
const templateId = import.meta.env.VITE_TEMPLATE_ID
const userId = import.meta.env.VITE_USER_ID

// Estado de submissão do formulário
const isSubmitting = ref(false)
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const handleSubmit = async () => {
  isSubmitting.value = true

  try {
    // Enviar e-mail com o EmailJS
    await emailjs.send(
      serviceId, // Usando a variável de ambiente para o ID do serviço
      templateId, // Usando a variável de ambiente para o ID do template
      {
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message,
      },
      userId, // Usando a variável de ambiente para o ID do usuário
    )

    // Exibir Toast de sucesso do Bootstrap
    const toastEl = document.getElementById('successToast')
    const toast = new bootstrap.Toast(toastEl)
    toast.show()

    // Resetando os campos do formulário
    form.value = { name: '', email: '', subject: '', message: '' }
  } catch (error) {
    alert('Erro ao enviar: ' + error.message)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="container mt-5">
    <div
      class="card shadow-lg p-4 mx-auto text-white"
      style="max-width: 500px; background-color: var(--skeleton-color)"
    >
      <h2 class="text-center mb-4">Entre em Contato</h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="name" class="form-label">Nome</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="form-control"
            placeholder="Seu nome"
            required
          />
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">E-mail</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="form-control"
            placeholder="seu@email.com"
            required
          />
        </div>

        <div class="mb-3">
          <label for="subject" class="form-label">Assunto</label>
          <input
            id="subject"
            v-model="form.subject"
            type="text"
            class="form-control"
            placeholder="Assunto da mensagem"
            required
          />
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">Mensagem</label>
          <textarea
            id="message"
            v-model="form.message"
            class="form-control"
            placeholder="Escreva sua mensagem aqui..."
            required
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          class="btn btn-primary w-100 d-flex align-items-center justify-content-center"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
          {{ isSubmitting ? 'Enviando...' : 'Enviar Mensagem' }}
        </button>
      </form>
    </div>

    <!-- Toast de sucesso -->
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div
        id="successToast"
        class="toast align-items-center text-bg-success border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">
            Mensagem enviada! Obrigado pelo contato. Responderei em breve.
          </div>
          <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>
    </div>
  </div>
</template>
