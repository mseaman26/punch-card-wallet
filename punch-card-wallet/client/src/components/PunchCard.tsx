type PunchCardProps = {
    businessName: string;
    punches: number;
    totalPunches: number;
  };
  
  export default function PunchCard({ businessName, punches, totalPunches }: PunchCardProps) {
    return (
      <div className="border rounded-lg p-4 bg-white shadow w-64 text-center">
        <h2 className="text-xl font-bold mb-2">{businessName}</h2>
        <p>Punches: {punches} / {totalPunches}</p>
        <div className="h-2 bg-gray-200 rounded mt-2">
          <div
            className="h-2 bg-blue-500 rounded"
            style={{ width: `${(punches / totalPunches) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  }
  
  