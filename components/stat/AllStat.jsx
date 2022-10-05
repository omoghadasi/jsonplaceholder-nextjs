import SingleStat from "./SingleStat";

function StatAll() {
  return (
    <div className="flex justify-center my-4">
      <div className="stats shadow bg-neutral">
        <SingleStat />
        <SingleStat />
        <SingleStat />
        <SingleStat />
        <SingleStat />
        <SingleStat />
      </div>
    </div>
  );
}

export default StatAll;
