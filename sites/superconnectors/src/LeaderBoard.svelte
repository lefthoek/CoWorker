<script lang="ts">
  export let leaderData: { name: string; score: number }[] = [];
</script>

<div class="grid grid-cols-3">
  {#each leaderData as { name, score }}
    <h1 class="font-mono col-span-2 font-normal text-2xl md:text-3xl">
      {name}
    </h1>
    <h1 class="font-mono text-right font-semibold text-2xl md:text-3xl">
      {score}
    </h1>
  {/each}
</div>
