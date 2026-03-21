import { Card } from "@/components/ui/card"

interface RiskCategory {
  label: string
  score: number
}

const riskCategories: RiskCategory[] = [
  { label: "Auth", score: 85 },
  { label: "Data", score: 62 },
  { label: "Rate", score: 78 },
  { label: "Input", score: 45 },
  { label: "Encr", score: 92 }
]

const MAX_BLOCKS = 15;

function CompactDiscreteBar({ score }: { score: number }) {
  const filledBlocks = Math.round((score / 100) * MAX_BLOCKS);

  return (
    // Added flex-grow to ensure the bar container expands to fill center space
    <div className="flex gap-[1.5px] h-full w-full  ">
      {[...Array(MAX_BLOCKS)].map((_, i) => {
        const isFilled = i < filledBlocks;
        let fillColor = "bg-gray-100";
        if (isFilled) {
          if (score >= 80) fillColor = "bg-zinc-500";   // High → almost black
          else if (score >= 60) fillColor = "bg-zinc-300"; // Medium → mid gray
          else fillColor = "bg-zinc-200";               // Low → light gray
        }
        return <div key={i} className={`flex-1 rounded-[0.5px] ${fillColor}`} />;
      })}
    </div>
  );
}

export function RiskScoreGauge() {
  return (
    <Card className="bg-white border-none rounded-md p-4 w-full flex flex-col">
      <div className="flex flex-col justify-between h-full space-y-9.25 pb-4">
        {riskCategories.map((category, index) => (
          // flex-grow on the wrapper allows the rows to distribute evenly across the full height
          <div key={index} className="flex items-center justify-between gap-2 flex-grow">
            <span className="text-[12px] font-bold text-gray-600 w-10 shrink-0 truncate">
              {category.label}
            </span>

            {/* Container for the bar now has a fixed height relative to row but full width */}
            <div className="flex-grow h-2.5">
              <CompactDiscreteBar score={category.score} />
            </div>

            <span className={`text-[10px] font-bold w-8 shrink-0 text-right ${category.score >= 80 ? "text-emerald-600" :
              category.score >= 60 ? "text-amber-600" : "text-rose-600"
              }`}>
              {category.score}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}