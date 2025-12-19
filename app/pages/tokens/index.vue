<template>
    <ui-container class="space-y-6 py-6">
        <div class="space-y-2">
            <p class="text-xs uppercase tracking-[0.18em] text-indigo-300">Design tokens</p>
            <h1 class="text-3xl font-semibold text-white">Token samples</h1>
            <p class="max-w-2xl text-sm text-slate-300">
                Placeholder for color, typography, spacing, and motion tokens. Wire this up to your own design system
                data.
            </p>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
            <div class="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-inner shadow-white/5">
                <p class="text-xs uppercase tracking-wide text-slate-300">Palette</p>
                <p class="mt-1 text-sm text-white">Swap in your brand gradients, surfaces, and text ramps.</p>
            </div>
            <div class="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-inner shadow-white/5">
                <p class="text-xs uppercase tracking-wide text-slate-300">Type scale</p>
                <p class="mt-1 text-sm text-white">Map headings, body, mono, and UI labels with examples.</p>
            </div>
            <div class="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-inner shadow-white/5">
                <p class="text-xs uppercase tracking-wide text-slate-300">Components</p>
                <p class="mt-1 text-sm text-white">Showcase buttons, chips, and inputs wired to your tokens.</p>
            </div>
        </div>
    </ui-container>
</template>
