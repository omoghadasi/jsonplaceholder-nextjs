import SingleStat from "./SingleStat";

function StatAll() {
  return (
    <div className="flex justify-center my-5">
      <div className="stats shadow bg-neutral w-full">
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
