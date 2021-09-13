<script lang="ts">
  import LefthoekLogo from "./LefthoekLogo.svelte";
  import type { Contestant } from "../types";
  export let leaderData: Contestant[] = [];
  console.log("XXXXXX");
</script>

<div class="grid grid-cols-3">
  <div class="col-span-3">
    <div class="flex justify-end">
      <LefthoekLogo class="w-16" />
    </div>
  </div>
  {#each leaderData as { first_name, score }}
    <h1 class="font-mono col-span-2 font-normal text-2xl md:text-3xl">
      {first_name}
    </h1>
    <h1 class="font-mono text-right font-semibold text-2xl md:text-3xl">
      {score}
    </h1>
  {/each}
</div>
