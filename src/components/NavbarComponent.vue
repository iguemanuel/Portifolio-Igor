<template>
  <nav class="navbar-container">
    <div class="navbar">
      <div class="navbar-brand">
        <a href="#">
          <img src="@/assets/logo.svg" alt="Logo" />
        </a>
      </div>
      <ul class="navbar-links">
        <li><a href="#home" @click.prevent="scrollTo('home')">Home</a></li>
        <li><a href="#about" @click.prevent="scrollTo('about')">Sobre</a></li>
        <li><a href="#projects" @click.prevent="scrollTo('projects')">Projetos</a></li>
        <li><a href="#contact" @click.prevent="scrollTo('contact')">Contato</a></li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
const scrollTo = (sectionId: string) => {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.navbar-container {
  display: flex;
  justify-content: center;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--skeleton-color);
  padding: 2rem 3rem;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.navbar-brand img {
  width: 4rem;
}

.navbar-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.2rem;
}

.navbar-links a {
  text-decoration: none;
  font-weight: bold;
  color: var(--text-color);
  transition: color 0.3s ease;
  font-size: 1.3rem;
}

.navbar-links a:hover {
  color: var(--tertiary-color);
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
    justify-items: center;
  }

  .navbar-links {
    gap: 1rem;
    display: none;
  }

  .navbar-brand img {
    width: 3rem;
  }
}
</style>
