import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import {RadialChart} from "@/components/dasboard/owerview/RadialChart.tsx";
import {radialChartDataGenerator} from "@/lib/utils.ts";
import {ChartConfig} from "@/components/ui/chart.tsx";

//TODO: data format for the RadialChart
// const chartData = [
//     [{ browser: "safari", average: 100, fill: "var(--color-safari)" }],
//     [{ browser: "safari", average: 70, fill: "var(--color-safari)" }],
//     [{ browser: "safari", average: 80, fill: "var(--color-safari)" }],
//     [{ browser: "safari", average: 50, fill: "var(--color-safari)" }],
//     [{ browser: "safari", average: 20, fill: "var(--color-safari)" }],
//
// ]
const chartConfig = {
    average: {
        label: "average",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const ScoreCard = () => {
    const chartData = radialChartDataGenerator()
    // console.log(chartData)
    return (
        <Card>
            <CardHeader>
                <CardTitle>Subject Scores</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className={"flex"}>
                    <div className={"flex justify-start items-center gap-2 w-full"}>
                    {
                        chartData.map(( chartData, index) => (
                            <RadialChart
                                key={index}
                                chartData={chartData}
                                chartConfig={chartConfig}
                                subject={chartData[0].subject}
                            />
                        ))
                    }
                    </div>
                    <ScrollBar orientation={"horizontal"}/>
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <p>Details of the Subject Scores</p>
            </CardFooter>
        </Card>
    );
};

export default ScoreCard;