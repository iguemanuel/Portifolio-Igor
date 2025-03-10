<template>
  <nav class="navbar mt-3 ms-5 me-5">
    <div class="navbar-brand">
      <a href="#">
        <img src="@/assets/logo.svg" alt="" />
      </a>
    </div>
    <ul class="navbar-links">
      <li><a href="#home" @click.prevent="scrollTo('home')">Home</a></li>
      <li><a href="#about" @click.prevent="scrollTo('about')">Sobre</a></li>
      <li><a href="#projects" @click.prevent="scrollTo('projects')">Projetos</a></li>
      <li><a href="#contact" @click.prevent="scrollTo('contact')">Contato</a></li>
    </ul>
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
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: var(--skeleton-color);
  border-radius: 4rem;

  img {
    width: 4rem;
  }

  .navbar-links {
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  .navbar-links li {
    list-style: none;
  }

  .navbar-links a {
    text-decoration: none;
    font-weight: bold;
    color: var(--text-color);
  }

  .navbar-links a:hover {
    color: var(--tertiary-color);
  }
}
</style>
