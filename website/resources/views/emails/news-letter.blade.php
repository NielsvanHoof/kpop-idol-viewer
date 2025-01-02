@component('mail::message')
# Latest Updates from {{ config('app.name') }}

Hello!

We're excited to bring you the latest updates from the K-pop universe. Here's what's trending:

## Latest Releases
- **New Album: "Dynamite"** - Experience the explosive new tracks
- **Fresh Single: "Moonlight"** - A mesmerizing melody you can't resist

@component('mail::panel')
### Upcoming Events
- **World Tour 2024** - Starting March 15th
- **Fan Meeting** - Virtual Meet & Greet on April 1st
- **Album Showcase** - Live Stream on March 30th
@endcomponent

## Artist Spotlight
Don't miss our exclusive interviews and behind-the-scenes content with your favorite artists!

@component('mail::button', ['url' => route('welcome')])
Read More
@endcomponent

## Chart Updates
- Top Song of the Week
- Rising Stars
- Fan Favorites

@component('mail::table')
| Event | Date | Location |
|-------|------|-----------|
| Concert | March 15 | Seoul |
| Fan Meet | April 1 | Online |
| Showcase | March 30 | Tokyo |
@endcomponent

Stay connected with us on social media for real-time updates!

Thanks,<br>
{{ config('app.name') }}

<small>
    If you wish to unsubscribe, click the unsubscribe button below.
</small>
@endcomponent