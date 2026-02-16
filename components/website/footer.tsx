import Link from "next/link"
import { Bike, Car, Truck, Package } from "lucide-react"

const footerLinks = {
  services: [
    { name: "Bike Taxi", href: "/booking?service=bike" },
    { name: "Car Taxi", href: "/booking?service=car" },
    { name: "Loading Vehicle", href: "/booking?service=loading" },
    { name: "Parcel Delivery", href: "/parcel" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Safety", href: "/safety" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">M</span>
              </div>
              <span className="text-xl font-semibold tracking-tight">MoveX</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Move anything, anywhere. Your all-in-one platform for rides, logistics, and deliveries.
            </p>
            <div className="mt-6 flex gap-3">
              {[Bike, Car, Truck, Package].map((Icon, index) => (
                <div key={index} className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Services</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Company</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Support</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Legal</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MoveX Technologies. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Twitter", "LinkedIn", "Instagram", "Facebook"].map((social) => (
              <Link
                key={social}
                href={`https://${social.toLowerCase()}.com`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
