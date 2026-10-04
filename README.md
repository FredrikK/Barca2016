# G2010 Group A

Mobile guide for Football Cup Barcelona, Girls 2010, 17–18 October 2026 in Salou.

It follows the Spånga IS F11-U Gul travel sheet and the [official group page](https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/groups). The ranking is a projection from public matches, common opponents searched three clubs deep, and the domestic leagues. It is not the tournament table.

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173` on a phone, or in a narrow browser window. Add it to the home screen from the browser menu if you want it beside the other apps.

`node tests/check.mjs` checks that the six teams each play the other five once, that Spånga’s five fixtures still match the travel sheet, and that the published index matches the weights.
