type PunchCardProps = {
    businessName: string;
    punches: number;
    totalPunches: number;
  };
  
  export default function PunchCard({ businessName, punches, totalPunches }: PunchCardProps) {
    return (
      <div className="border rounded-lg p-4 bg-white shadow">
        <h2 className="text-xl font-bold">{businessName}</h2>
        <p>
          Punches: {punches} / {totalPunches}
        </p>
      </div>
    );
  }
  