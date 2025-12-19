<template>
  <ui-container class="space-y-6 py-6">
    <div class="space-y-2">
      <p class="text-xs tracking-[0.18em] text-orange-300 uppercase">Activity</p>
      <h1 class="text-3xl font-semibold text-white">Recent activity</h1>
      <p class="max-w-2xl text-sm text-slate-300">
        Placeholder feed for events, logs, and updates. Replace with your telemetry or audit trail
        data.
      </p>
    </div>

    <div class="space-y-3">
      <div class="rounded-xl border border-white/5 bg-white/5 p-3 shadow-inner shadow-white/5">
        <p class="text-sm font-semibold text-white">No activity yet</p>
        <p class="mt-1 text-sm text-slate-300">
          Hook this up to your data source to populate recent changes.
        </p>
      </div>
      <div class="rounded-xl border border-white/5 bg-white/5 p-3 shadow-inner shadow-white/5">
        <p class="text-sm font-semibold text-white">Deploy notifications</p>
        <p class="mt-1 text-sm text-slate-300">
          Show build times, rollbacks, and environment health.
        </p>
      </div>
    </div>
  </ui-container>
</template>
