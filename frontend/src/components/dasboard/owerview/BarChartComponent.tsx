import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {getCurrentFormattedDate} from "@/lib/utils.ts";
// import {BarChartDataType} from "@/types";

type BarChartProps = {
    chartData: any[]
    chartConfig: ChartConfig
    dataKey: string
    subDataKey1: string
    subDataKey2: string
    cardTitle: string
    footerTitle: string
}

export function BarChartComponent({chartData, chartConfig, dataKey, subDataKey1, subDataKey2, footerTitle, cardTitle} : BarChartProps) {
    const formattedDate = getCurrentFormattedDate()
    return (
        <Card>
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
                <CardDescription>{formattedDate}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={dataKey}
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey={subDataKey1}
                            stackId="a"
                            fill="var(--color-desktop)"
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey={subDataKey2}
                            stackId="a"
                            fill="var(--color-mobile)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground text-pretty">
                    {footerTitle}
                </div>
            </CardFooter>
        </Card>
    )
}
