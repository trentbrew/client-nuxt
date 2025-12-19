<template>
    <ui-container class="space-y-6 py-6">
        <div class="space-y-2">
            <p class="text-xs uppercase tracking-[0.18em] text-emerald-300">Layouts</p>
            <h1 class="text-3xl font-semibold text-white">Layout playground</h1>
            <p class="max-w-2xl text-sm text-slate-300">
                Placeholder route for layout experiments. Swap in your own sections, grids, and responsive shells here.
            </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-inner shadow-white/5">
                <p class="text-sm font-semibold text-white">Stacked cards</p>
                <p class="mt-1 text-sm text-slate-300">Use this zone to demo cards, split panes, or feature rows.</p>
            </div>
            <div class="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-inner shadow-white/5">
                <p class="text-sm font-semibold text-white">Sidebar shells</p>
                <p class="mt-1 text-sm text-slate-300">Try alternate sidebar widths, sticky headers, or drawers.</p>
            </div>
        </div>
    </ui-container>
</template>
