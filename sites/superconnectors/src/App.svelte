<script lang="ts">
  import Tailwindcss from "./tailwind.svelte";
  import LeaderBoard from "./LeaderBoard.svelte";
  import ContestantForm from "./ContestantForm.svelte";
  let leaderData = [
    { name: "Constantijn", score: 100 },
    { name: "Ohad", score: 50 },
    { name: "Lars", score: 150 },
    { name: "Lisette", score: 150 },
    { name: "Maurice", score: 300 },
  ].sort((a, b) => b.score - a.score);

  const addContestant = (contestant: any) => {
    if (contestant) {
      leaderData = [...leaderData, contestant];
    }
  };
</script>

<Tailwindcss />

<main class="p-5 flex h-full flex-column items-center">
  <div class="w-full max-w-4xl mx-auto">
    <LeaderBoard {leaderData} />
    <ContestantForm on:addContestant={({ detail }) => addContestant(detail)} />
  </div>
</main>
