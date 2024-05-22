import React from "react";
import { createSupabaseServerComponentClient } from "@/app/utils/supabaseServer";
interface UserScore {
  username: string;
  score: number;
}

const Leaderboard: React.FC = async () => {
  const supabase = createSupabaseServerComponentClient();

  const { data } = await supabase
    .from("users")
    .select("*")
    .not("score", "is", null)
    .order("score", { ascending: false })
    .limit(5);

  const users = data?.map((user: any) => ({
    username: user.username,
    score: user.score,
  }));

  return (
    <div className="max-w-full mx-auto p-4 text-black">
      <h1 className="text-xl font-bold text-center mb-4">Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <tr>
              <th className="p-2">
                <div className="font-semibold text-left">Username</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-left">Score</div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {users?.map((user, index) => (
              <tr key={index} className="bg-white">
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Leaderboard;
