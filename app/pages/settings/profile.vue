<template>
  <ui-container class="space-y-6 py-6">
    <div class="space-y-2">
      <p class="text-xs uppercase tracking-[0.18em] text-sky-300">Profile</p>
      <h1 class="text-3xl font-semibold text-white">Your profile</h1>
      <p class="max-w-2xl text-sm text-slate-300">
        Placeholder for account details. Link this to your auth provider and user settings.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-inner shadow-white/5">
        <p class="text-sm font-semibold text-white">Avatar</p>
        <p class="mt-1 text-sm text-slate-300">Drop in your avatar uploader or identity card.</p>
      </div>
      <div class="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-inner shadow-white/5">
        <p class="text-sm font-semibold text-white">Preferences</p>
        <p class="mt-1 text-sm text-slate-300">Wire toggles for themes, locale, and notification rules.</p>
      </div>
    </div>
  </ui-container>
</template>
