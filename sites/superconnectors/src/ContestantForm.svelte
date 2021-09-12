<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let newContestant: string = "";
  const addContestant = () => {
    if (newContestant) {
      dispatch("addContestant", {
        name: newContestant,
        score: 0,
      });
      newContestant = "";
    }
  };
</script>

<div class="grid mt-5">
  <form on:submit|preventDefault={addContestant}>
    <input
      class="appearance-none block w-full 
        border border-accent rounded py-3 px-4 mb-3 leading-tight
        focus:outline-none focus:bg-accent focus:text-background font-mono font-medium"
      bind:value={newContestant}
      id="contestant"
      type="text"
      placeholder="Jane Doe" />
    <p
      class="text-red-500 text-xs font-mono"
      class:hidden={newContestant !== ""}>
      Please fill out this field.
    </p>
    <button class:hidden={!newContestant} type="submit">Add Contestant</button>
  </form>
</div>
