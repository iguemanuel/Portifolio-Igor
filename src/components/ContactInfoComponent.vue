<script setup lang="ts"></script>

<template>
  <div class="container mt-5">
    <div
      class="card shadow-lg p-4 mx-auto text-white p-3 rounded-3"
      style="max-width: 500px; background-color: var(--skeleton-color)"
    >
      <h2 class="text-center mb-4">Informações de Contato</h2>

      <div class="info">
        <div class="email">
          <h3>
            <font-awesome-icon :icon="['fas', 'envelope']" />
            E-mail
          </h3>
          <p>igor17emanuel@gmail.com</p>
        </div>
        <div class="phone">
          <h3>
            <font-awesome-icon :icon="['fas', 'phone']" />
            Telefone / WhatsApp
          </h3>
          <p>(42) 99158-3814</p>
        </div>
        <div class="address">
          <h3>
            <font-awesome-icon :icon="['fas', 'earth-americas']" />
            Endereço
          </h3>
          <p>Guarapuava - PR - Brasil</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
  font-family: var(--font-family-secondary);
}
p {
  color: var(--primary-color);
}
</style>
