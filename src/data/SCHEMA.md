# Data schema (Phase 4)

Every item should follow:

- id: string (unique)
- type: "hotels" | "rentals" | "food" | "sights" | "services" | "transport" | "trails"
- title: { hy, ru, en }
- desc: { hy, ru, en }
- address: { hy, ru, en }
- geo: { lat: number|null, lng: number|null }  // map-ready
- phone?: string
- whatsapp?: string
- website?: string
- booking_link?: string
- rating?: number
- price_level?: 1|2|3|4|5
- amenities?: string[]
- tags?: string[]
- gallery?: string[]
