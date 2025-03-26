<script setup lang="ts">
import { ref } from 'vue'
import emailjs from 'emailjs-com'
import { useToast } from 'vue-toastification'

const toast = useToast()

const serviceId = import.meta.env.VITE_SERVICE_ID
const templateId = import.meta.env.VITE_TEMPLATE_ID
const apiKey = import.meta.env.VITE_API_KEY

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
    const response = await emailjs.send(
      serviceId,
      templateId,
      {
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message,
      },
      apiKey, // Substitui o antigo userId
    )

    console.log('Email enviado com sucesso:', response)

    // Exibe o alerta de sucesso com Toastification
    toast.success('Mensagem enviada! Obrigado pelo contato. Responderei em breve.')

    form.value = { name: '', email: '', subject: '', message: '' }
  } catch (error: unknown) {
    console.error('Erro ao enviar:', error)

    // Verifica se o erro tem uma mensagem
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    toast.error(`Erro ao enviar: ${errorMessage}`)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="container mt-5">
    <div
      class="card shadow-lg p-4 mx-auto text-white rounded-3"
      style="max-width: 500px; background-color: var(--skeleton-color)"
    >
      <h2 class="text-center mb-4">Envie uma mensagem</h2>

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
  </div>
</template>
