import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";
import { orderStatusColor } from "../dashboard-page-content";
import { StatusPercentage } from "../../../../../../../next-type-models";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g direction={"ltr"}>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {`${payload.status}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(% ${(percent * 100).toFixed(2)})`}
      </text>
    </g>
  );
};

type Props = {
  data: StatusPercentage[];
};

class OrdersStatusPieChart extends PureComponent<
  Props,
  { activeIndex: number }
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  onPieEnter = (_: any, index: number) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { data } = this.props;
    return (
      <div className="p-3 mb-8">
        <h3 className="text-bodyMain mb-2">وضعیت سفارش‌ها</h3>
        {data.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  activeIndex={this.state.activeIndex}
                  activeShape={renderActiveShape}
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                  onMouseEnter={this.onPieEnter}
                >
                  {data.map((entry, index) => {
                    // Determine the fill color based on the status
                    const fillColor = (() => {
                      switch (entry.status) {
                        case "جاری":
                          return "#f59e0b"; // Yellow for "جاری"
                        case "تحویل شده":
                          return "#10b981"; // Green for "تحویل شده"
                        case "مرجوع شده":
                          return "#ef4444"; // Red for "مرجوع شده"
                        default:
                          return "#8884d8"; // Default color
                      }
                    })();

                    return <Cell key={`cell-${index}`} fill={fillColor} />;
                  })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-between text-sm text-customGray-500">
              {data.map((status) => (
                <div key={status.status} className="flex items-center gap-1">
                  <span
                    className={`w-3 h-3 inline-block rounded-full bg-state-${orderStatusColor(
                      status.status
                    )}`}
                  />
                  <span className="text-customGray-500 text-bodySmall">
                    {status.status}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex-center bg-state-error-200 rounded-xl text-center text-bodySmall text-state-error py-5 px-3">
            سفارشی موجود نیست.
          </div>
        )}
      </div>
    );
  }
}

export default OrdersStatusPieChart;
