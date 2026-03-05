interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  {
    value: "10M+",
    label: "Links Shortened",
  },
  {
    value: "1B+",
    label: "Total Clicks",
  },
  {
    value: "150+",
    label: "Countries",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 px-4 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</p>
              <p className="text-primary-foreground/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
