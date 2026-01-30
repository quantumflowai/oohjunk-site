import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Truck,
  Clock,
  ShieldCheck,
  Calculator,
  ChevronRight,
  Check,
  Building2,
  Home,
  Sparkles,
  Trash2,
  Recycle,
  BadgeDollarSign,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

/**
 * Front-end only landing site for OohJunk.
 * - Replace placeholders: phone, email, service areas, pricing numbers.
 * - Hook the form to your backend later (GoHighLevel, Webflow forms, Next API, etc.).
 */

const BRAND = {
  name: "OohJunk",
  tagline: "Your trusted Out Of Hours junk collections company",
  accent: "#25B36A", // brand green
  highlight: "#F59E0B", // brand orange
  phoneRaw: "7867204546",
  phoneDisplay: "(786) 720-4546",
  email: "snewolf@icloud.com",
  serviceAreas: ["Miami", "Brickell", "Downtown", "Edgewater", "Wynwood"],
};

const RES_TIERS = [
  { label: "Single Item / Minimum Pickup", desc: "One bulky item or quick curb pickup", price: "$129" },
  { label: "Small Pickup", desc: "~1/8 truck (a few items)", price: "$189" },
  { label: "Light Load", desc: "~1/6 truck", price: "$249" },
  { label: "Quarter Load", desc: "~1/4 truck (small room)", price: "$329" },
  { label: "Room Cleanup", desc: "~1/3 truck", price: "$399" },
  { label: "Half Load", desc: "~1/2 truck (multiple areas)", price: "$499" },
  { label: "Large Load", desc: "~2/3 truck", price: "$629" },
  { label: "Full Truck", desc: "Max volume — best value", price: "$749" },
];

const COM_OFFERS = [
  {
    title: "Per-Haul",
    desc: "Best for one-off jobs. Simple minimum + labor increments.",
    bullets: ["Minimum haul fee", "Additional labor billed per 15 min", "Disposal can be included or itemized"],
  },
  {
    title: "Per Cubic Yard",
    desc: "Best for contractors and consistent materials.",
    bullets: ["Rate per cubic yard", "Minimum yardage", "Great for remodel debris"],
  },
  {
    title: "Monthly Retainer",
    desc: "Best for property managers. Predictable schedule + priority service.",
    bullets: ["2 / 4 / 8 pickups per month", "Priority scheduling", "Discounted extra pickups"],
  },
];

const ADD_ONS = [
  { label: "Stairs", note: "$25 per flight" },
  { label: "Long Carry", note: "Over 75 ft (+$25)" },
  { label: "Disassembly", note: "Starting at $40" },
  { label: "Wait Time", note: "After 10 min (+$25/15 min)" },
  { label: "Mattress / Box Spring", note: "+$40 handling" },
  { label: "TV / Monitor Recycling", note: "+$30 e-waste" },
  { label: "Appliances", note: "+$50 handling" },
  { label: "Construction Debris", note: "Starting at +$75 (weight-based)" },
  { label: "Same-Day / After Hours", note: "+$75 priority" },
];

function GradientTop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-30"
        style={{ background: `radial-gradient(circle, ${BRAND.accent} 0%, transparent 65%)` }}
      />
      <div
        className="absolute -top-20 right-[-140px] h-[420px] w-[420px] rounded-full blur-3xl opacity-20"
        style={{ background: `radial-gradient(circle, ${BRAND.highlight} 0%, transparent 70%)` }}
      />
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border bg-white/60 p-4 shadow-sm backdrop-blur">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-white">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-base font-semibold">{value}</div>
      </div>
    </div>
  );
}

function PriceRow({ label, desc, price }: { label: string; desc: string; price: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border bg-white p-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{label}</span>
          <Badge variant="secondary" className="shrink-0">
            Starting at
          </Badge>
        </div>
        <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-lg font-semibold">{price}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">{label}</div>
      {children}
    </div>
  );
}

function SuccessMessage({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-5">
      <div>
        <div className="text-lg font-semibold">✅ Request received — get your quote faster</div>
        <div className="mt-1 text-sm text-muted-foreground">Text us photos right now and we’ll send your estimate ASAP.</div>
      </div>

      <div className="rounded-2xl border bg-zinc-50 p-4">
        <div className="flex items-center gap-2 font-semibold">
          <ImageIcon className="h-4 w-4" style={{ color: BRAND.accent }} />
          Text photos to {BRAND.phoneDisplay}
        </div>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Send 2–6 clear photos (wide + close-up).</li>
          <li>Include your pickup address + what floor you’re on.</li>
          <li>We’ll confirm the final price onsite based on volume/access/special handling.</li>
        </ol>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button className="gap-2" asChild>
            <a href={`sms:${BRAND.phoneRaw}`}>
              <Phone className="h-4 w-4" /> Text Photos Now
            </a>
          </Button>
          <Button variant="outline" className="gap-2" asChild>
            <a href={`tel:${BRAND.phoneRaw}`}>
              <Phone className="h-4 w-4" /> Call
            </a>
          </Button>
          <Button variant="outline" className="gap-2" asChild>
            <a href={`mailto:${BRAND.email}`}>
              <Mail className="h-4 w-4" /> Email
            </a>
          </Button>
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold">To avoid underbidding, reply to these 3 questions:</div>
        <div className="mt-3 grid gap-2">
          <div className="rounded-xl border bg-white p-3 text-sm text-muted-foreground">
            <span className="font-medium text-zinc-950">1) How much volume is it?</span> (Single item / 1⁄8 / 1⁄4 / 1⁄2 / 2⁄3 / Full truck) + list your 3 biggest items.
          </div>
          <div className="rounded-xl border bg-white p-3 text-sm text-muted-foreground">
            <span className="font-medium text-zinc-950">2) What’s the access?</span> Floor, elevator or stairs (how many flights), and how far is the carry/parking?
          </div>
          <div className="rounded-xl border bg-white p-3 text-sm text-muted-foreground">
            <span className="font-medium text-zinc-950">3) Any special/heavy items?</span> Mattresses, appliances, TVs/e-waste, construction debris (tile/concrete/dirt), or anything hazardous.
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-muted-foreground">If you already submitted photos, you're good — we’ll reach out shortly.</div>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          className="w-full max-w-2xl rounded-3xl border bg-white shadow-xl"
        >
          <div className="flex items-start justify-between gap-4 border-b p-5">
            <div className="min-w-0">
              <div className="text-sm font-semibold">{BRAND.name}</div>
              <div className="text-xs text-muted-foreground">Fast quote confirmation</div>
            </div>
            <Button variant="ghost" onClick={onClose} className="h-9 px-3">
              ✕
            </Button>
          </div>
          <div className="p-5">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}

export default function OohJunkLanding() {
  const [tab, setTab] = useState<"res" | "com">("res");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    details: "",
    photos: "",
  });

  const [successOpen, setSuccessOpen] = useState(false);

  const quickEstimateHint = useMemo(() => {
    return tab === "res"
      ? "Tip: Share 2–4 photos + what floor you’re on. You'll get a faster quote."
      : "Tip: Share pickup frequency + access details (dock, elevator, after-hours).";
  }, [tab]);

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [k]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessOpen(true);

    const smsTemplate =
      `Hi OohJunk! Here are photos for my quote.\n\n` +
      `Pickup Address: ${form.address || "(add address)"}\n` +
      `Name: ${form.name || ""}\n\n` +
      `1) Volume: (single / 1⁄8 / 1⁄4 / 1⁄2 / 2⁄3 / full) + 3 biggest items\n` +
      `2) Access: floor + stairs/elevator + parking distance\n` +
      `3) Special/heavy items: mattress/appliance/TV/construction debris?\n`;

    const isMobile =
      typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

    if (isMobile) {
      setTimeout(() => {
        try {
          window.location.href = `sms:${BRAND.phoneRaw}?&body=${encodeURIComponent(smsTemplate)}`;
        } catch {
          // no-op
        }
      }, 250);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border bg-white shadow-sm">
              <Sparkles className="h-5 w-5" style={{ color: BRAND.accent }} />
            </div>
            <div className="leading-tight">
              <div className="text-base font-bold">
                <span style={{ color: BRAND.accent }}>Ooh</span>
                <span>Junk</span>
                <span style={{ color: BRAND.highlight }}>!</span>
              </div>
              <div className="text-xs text-muted-foreground">{BRAND.tagline}</div>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Badge variant="outline" className="gap-2">
              <Clock className="h-3.5 w-3.5" /> Out-of-hours available
            </Badge>
            <Button variant="outline" className="gap-2" asChild>
              <a href={`tel:${BRAND.phoneRaw}`}>
                <Phone className="h-4 w-4" /> Call
              </a>
            </Button>
            <Button className="gap-2" asChild>
              <a href="#quote">
                Get a Quote <ChevronRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="md:hidden">
            <Button size="sm" asChild>
              <a href="#quote">Quote</a>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <GradientTop />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tight md:text-5xl"
            >
              Fast, reliable junk removal — <span style={{ color: BRAND.accent }}>without the hassle</span>.
            </motion.h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
              Residential & commercial pickups. Transparent tiered pricing. Same-day options. Send photos and we’ll quote fast.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="gap-2" asChild>
                <a href="#pricing">
                  View Pricing <Calculator className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <a href="#quote">
                  Get a Fast Quote <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Stat icon={Truck} label="Typical arrival" value="Same-day / Next-day" />
              <Stat icon={ShieldCheck} label="Trusted" value="Insured & professional" />
              <Stat icon={Recycle} label="Disposal" value="Donate / recycle when possible" />
              <Stat icon={MapPin} label="Service area" value={BRAND.serviceAreas.join(", ")} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" /> Upfront estimate
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" /> Final price confirmed onsite
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" /> No hidden surprises
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="rounded-3xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Instant contact</div>
                  <div className="mt-1 text-xl font-semibold">Text photos for a quick quote</div>
                </div>
                <Badge className="gap-2" style={{ backgroundColor: BRAND.accent }}>
                  <BadgeDollarSign className="h-3.5 w-3.5" /> Fast Quotes
                </Badge>
              </div>

              <div className="mt-5 grid gap-3">
                <div className="flex items-center gap-3 rounded-2xl border bg-zinc-50 p-4">
                  <Phone className="h-5 w-5" style={{ color: BRAND.accent }} />
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">Call / Text</div>
                    <div className="font-semibold">{BRAND.phoneDisplay}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border bg-zinc-50 p-4">
                  <Mail className="h-5 w-5" style={{ color: BRAND.accent }} />
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="font-semibold">{BRAND.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border bg-zinc-50 p-4">
                  <ImageIcon className="h-5 w-5" style={{ color: BRAND.accent }} />
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">Send</div>
                    <div className="font-semibold">2–4 photos + address</div>
                  </div>
                </div>
              </div>

              <Separator className="my-5" />

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border bg-white p-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <Home className="h-4 w-4" /> Residential
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">Apartment • House • Storage</div>
                </div>
                <div className="rounded-2xl border bg-white p-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <Building2 className="h-4 w-4" /> Commercial
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">Retail • Offices • Properties</div>
                </div>
              </div>

              <div className="mt-5">
                <Button className="w-full" asChild>
                  <a href="#quote">Get a Quote Now</a>
                </Button>
              </div>
              <div className="mt-2 text-center text-xs text-muted-foreground">
                Final pricing depends on volume, access, and special handling.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Pricing</h2>
            <p className="mt-1 text-muted-foreground">
              Simple, tiered pricing. Use these as starting points — we confirm the final price onsite.
            </p>
          </div>
          <Badge variant="outline" className="w-fit gap-2">
            <Trash2 className="h-4 w-4" /> Transparent tiers
          </Badge>
        </div>

        <div className="mt-6">
          <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="res" className="gap-2">
                <Home className="h-4 w-4" /> Residential
              </TabsTrigger>
              <TabsTrigger value="com" className="gap-2">
                <Building2 className="h-4 w-4" /> Commercial
              </TabsTrigger>
            </TabsList>

            <TabsContent value="res" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {RES_TIERS.map((t) => (
                  <PriceRow key={t.label} label={t.label} desc={t.desc} price={t.price} />
                ))}
              </div>
              <div className="mt-6 rounded-2xl border bg-white p-5">
                <div className="flex items-center gap-2 font-semibold">
                  <Recycle className="h-5 w-5" style={{ color: BRAND.accent }} />
                  What’s included
                </div>
                <div className="mt-2 grid gap-2 text-sm text-muted-foreground md:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" /> Labor & loading
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" /> Transport
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" /> Responsible disposal
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="com" className="mt-6">
              <div className="grid gap-4 md:grid-cols-3">
                {COM_OFFERS.map((o) => (
                  <Card key={o.title} className="rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-lg">{o.title}</CardTitle>
                      <div className="text-sm text-muted-foreground">{o.desc}</div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {o.bullets.map((b) => (
                        <div key={b} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4" style={{ color: BRAND.accent }} />
                          <span className="text-muted-foreground">{b}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border bg-white p-5">
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldCheck className="h-5 w-5" style={{ color: BRAND.accent }} />
                  Commercial notes
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Commercial pricing is customized based on volume type, access (dock/elevator), and pickup frequency. We can structure predictable monthly service for property managers.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg">Add-ons (when applicable)</CardTitle>
              <div className="text-sm text-muted-foreground">These protect fairness when jobs take extra time/effort.</div>
            </CardHeader>
            <CardContent className="grid gap-2">
              {ADD_ONS.map((a) => (
                <div key={a.label} className="flex items-center justify-between rounded-xl border bg-white p-3">
                  <div className="font-medium">{a.label}</div>
                  <div className="text-sm text-muted-foreground">{a.note}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg">Items we typically don’t take</CardTitle>
              <div className="text-sm text-muted-foreground">Avoid surprises. Ask if unsure.</div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-2xl border bg-zinc-50 p-4 text-sm text-muted-foreground">
                Paints, chemicals, oils, asbestos, medical waste, and other hazardous materials.
              </div>
              <div className="rounded-2xl border bg-zinc-50 p-4 text-sm text-muted-foreground">
                For special items (tires, e-waste, appliances), we may charge handling or refer you to a proper facility.
              </div>
              <Button variant="outline" className="w-full" asChild>
                <a href="#quote">Ask about your items</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Get a fast quote</h2>
            <p className="mt-2 text-muted-foreground">
              Fill this out and we’ll reply ASAP. For the fastest estimate, include photos and access info.
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border bg-white p-4">
                <div className="flex items-center gap-2 font-semibold">
                  <Clock className="h-4 w-4" style={{ color: BRAND.accent }} />
                  {quickEstimateHint}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Include: amount of items, any stairs/elevator, parking access, and preferred time window.
                </div>
              </div>

              <div className="rounded-2xl border bg-white p-4">
                <div className="flex items-center gap-2 font-semibold">
                  <MapPin className="h-4 w-4" style={{ color: BRAND.accent }} />
                  Service areas
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {BRAND.serviceAreas.map((a) => (
                    <Badge key={a} variant="secondary">
                      {a}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border bg-white p-4">
                <div className="flex items-center gap-2 font-semibold">
                  <Phone className="h-4 w-4" style={{ color: BRAND.accent }} />
                  Prefer texting?
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Text photos to <span className="font-semibold text-zinc-950">{BRAND.phoneDisplay}</span>.
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="text-lg">Quote request</CardTitle>
                <div className="text-sm text-muted-foreground">Front-end only — connect to your webhook later.</div>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Name">
                      <Input value={form.name} onChange={onChange("name")} placeholder="Your name" />
                    </Field>
                    <Field label="Phone">
                      <Input value={form.phone} onChange={onChange("phone")} placeholder="(###) ###-####" />
                    </Field>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Email">
                      <Input value={form.email} onChange={onChange("email")} placeholder="you@email.com" />
                    </Field>
                    <Field label="Pickup address">
                      <Input value={form.address} onChange={onChange("address")} placeholder="Street, City" />
                    </Field>
                  </div>

                  <Field label="Job details">
                    <Textarea
                      value={form.details}
                      onChange={onChange("details")}
                      placeholder={`1) Volume (single/1⁄8/1⁄4/1⁄2/2⁄3/full) + 3 biggest items\n2) Access (floor, stairs/elevator, parking distance)\n3) Any special/heavy items (mattress, appliance, TV, construction debris?)`}
                      className="min-h-[140px]"
                    />
                  </Field>

                  <Field label="Photo links (optional)">
                    <Input
                      value={form.photos}
                      onChange={onChange("photos")}
                      placeholder="Paste iCloud/Google Photos links, or mention you'll text photos"
                    />
                  </Field>

                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="text-xs text-muted-foreground">By submitting, you agree we may contact you by phone/text/email.</div>
                    <Button type="submit" className="gap-2">
                      Submit Request <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Modal
              open={successOpen}
              onClose={() => {
                setSuccessOpen(false);
                setForm({ name: "", phone: "", email: "", address: "", details: "", photos: "" });
              }}
            >
              <SuccessMessage
                onClose={() => {
                  setSuccessOpen(false);
                  setForm({ name: "", phone: "", email: "", address: "", details: "", photos: "" });
                }}
              />
            </Modal>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
          <div>
            <div className="text-lg font-bold">
              <span style={{ color: BRAND.accent }}>Ooh</span>
              <span>Junk</span>
              <span style={{ color: BRAND.highlight }}>!</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{BRAND.tagline}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-2">
                <ShieldCheck className="h-3.5 w-3.5" /> Insured
              </Badge>
              <Badge variant="outline" className="gap-2">
                <Recycle className="h-3.5 w-3.5" /> Recycle/Donate
              </Badge>
              <Badge variant="outline" className="gap-2">
                <Clock className="h-3.5 w-3.5" /> Out-of-hours
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold">Contact</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" /> {BRAND.phoneDisplay}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" /> {BRAND.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {BRAND.serviceAreas.join(", ")}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Quick links</div>
            <div className="grid gap-2">
              <a className="text-sm text-muted-foreground hover:text-zinc-950" href="#pricing">
                Pricing
              </a>
              <a className="text-sm text-muted-foreground hover:text-zinc-950" href="#quote">
                Get a Quote
              </a>
              <a className="text-sm text-muted-foreground hover:text-zinc-950" href="#">
                Top
              </a>
            </div>
            <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
