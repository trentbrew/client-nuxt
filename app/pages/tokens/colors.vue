<template>
    <ui-container class="space-y-6 py-6">
        <div class="space-y-2">
            <p class="text-xs uppercase tracking-[0.18em] text-pink-300">Design tokens</p>
            <h1 class="text-3xl font-semibold text-white">Color palette</h1>
            <p class="max-w-2xl text-sm text-slate-300">
                Placeholder color chips. Connect this grid to your real tailwind config or Token Studio exports.
            </p>
        </div>

        <div class="grid gap-4 md:grid-cols-4">
            <div v-for="swatch in 4" :key="swatch" class="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <div class="mx-auto h-16 w-16 rounded-full bg-linear-to-br from-slate-800 via-slate-700 to-slate-600" />
                <p class="mt-2 text-xs uppercase tracking-wide text-slate-300">Token {{ swatch }}</p>
            </div>
        </div>
    </ui-container>
</template>
