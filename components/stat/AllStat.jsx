import SingleStat from "./SingleStat";

function StatAll() {
  const entities = ["posts", "comments", "users", "todos", "photos", "albums"];

  const stats = entities.map((entitie) => (
    <SingleStat entitie={entitie} key={entitie} />
  ));
  return (
    <div className="flex justify-center my-5">
      <div className="stats shadow bg-neutral w-full">{stats}</div>
    </div>
  );
}

export default StatAll;
