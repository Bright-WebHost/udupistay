const homestays = [
  {
    title: "WHITE HOUSE",
    details: "1 to 35 Capacity · Udupi city center · Luxurious 6BHK Villa Near Malpe Beach",
  },
  {
    title: "GARDEN VILLA",
    details: "1 to 20 Capacity · Udupi city center · 5 BHK spacious bedrooms and fully furnished",
  },
  {
    title: "COTTAGE HOUSE",
    details: "1 to 8 Capacity · Near Udupi (7 km) & Manipal (15 km) · Air-conditioned 3-BHK fully furnished villa",
  },
  {
    title: "HILL TOP VILLA",
    details: "1 to 10 Capacity · Near Udupi (7 km) & Manipal (15 km) · 3-BHK Villa with Air Conditioning",
  },
  {
    title: "SUNRISE HOME",
    details: "1 to 6 Capacity · Near Udupi (7 km) & Manipal (15 km) · 3-BHK Brick House",
  },
  {
    title: "CHALET LA BONNE VIE",
    details: "1 to 5 Capacity · Near Udupi (7 km) & Manipal (15 km) · 2-BHK modern house, bird sanctuary and farm",
  },
  {
    title: "VIEWPOINT OASIS",
    details: "Near Udupi (7 km) & Manipal (15 km) · Jacuzzi, View Point, BBQ Area",
  },
  {
    title: "HILL SIDE COTTAGE",
    details: "1 to 3 Capacity · Near Udupi (8 km) & Manipal (12 km) · Cozy 1-BHK Hillside Retreat",
  },
];

export default function ProjectPage() {
  return (
    <div className="bg-background">
      <section id="hero" className="border-b border-border bg-surface pt-24">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
            Home Stays
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-primary">
            Homestays in Udupi – Whitehouse, Garden Villa, Cottage House &amp; More
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-foreground/70">
            Discover six distinct homestays with unique themes and designs, offering a
            personalized retreat for families, travelers, and business guests.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto grid w-full max-w-6xl gap-6 rounded-3xl border border-border bg-surface px-6 py-8 shadow-sm md:grid-cols-4 mx-6">
          {[
            { label: "Homestays", value: "6" },
            { label: "Families Hosted", value: "2,000+" },
            { label: "Privacy Ensured", value: "100%" },
            { label: "Satisfaction", value: "100%" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-3xl font-semibold text-primary">{item.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-foreground/60">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {homestays.map((stay) => (
            <div
              key={stay.title}
              className="rounded-3xl border border-border bg-surface p-6"
            >
              <div className="h-44 rounded-2xl bg-muted" />
              <h2 className="mt-5 text-xl font-semibold text-primary">{stay.title}</h2>
              <p className="mt-2 text-sm text-foreground/70">{stay.details}</p>
              <a
                href="/contact"
                className="mt-6 inline-block text-sm font-semibold text-secondary"
              >
                Enquire now
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
