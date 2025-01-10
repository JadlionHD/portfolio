<script setup lang="ts">
import anime from "animejs";
import { RouterLink } from "vue-router";
const bday = new Date(1108270800000);
const curDate = new Date();

let yearsOld = curDate.getFullYear() - bday.getFullYear();
const monthDiff = curDate.getMonth() - bday.getMonth();
const dayDiff = curDate.getDate() - bday.getDate();

if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
  yearsOld--;
}

console.log(anime);
</script>

<template>
  <main class="mt-32 mx-64">
    <div class="flex items-center justify-center flex-wrap gap-8">
      <div class="p-4">
        <h1 class="font-bold text-4xl">Hello world 🌧️</h1>
        <div class="text-gray-400">
          Hello! I'm Hendra Gunawan, {{ yearsOld }} years old and self-taught Fullstacks
          Developer.<br />I like making Website & Desktop apps, especially apps related to
          networking such as multiplayer games
        </div>

        <div class="flex flex-col flex-wrap p-4 gap-2">
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/socials">Socials</RouterLink>
          <RouterLink to="/projects">Projects</RouterLink>
          <RouterLink to="/tools">Tools & Languages</RouterLink>
        </div>

        <footer>© {{ new Date().getFullYear() }} | Made with love ❤️ by Jadlion</footer>
      </div>
      <img
        src="https://avatars.githubusercontent.com/u/48410066?v=4"
        alt="pfp"
        width="200"
        height="200"
        class="rounded-xl"
      />
    </div>
  </main>
</template>
