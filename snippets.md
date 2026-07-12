### Init

# The command below will create a new project and dataset within the content lake and scaffold the local files required to develop Sanity Studio.l

achtung:
allowBuilds:
esbuild: true
pnpm blockiert Build-Scripts (z.B. esbuilds postinstall) standardmaessig aus Sicherheitsgruenden -> `pnpm run dev` bricht mit ERR_PNPM_IGNORED_BUILDS ab. Freigabe steht in pnpm-workspace.yaml (allowBuilds), NICHT hier: ab pnpm 10+ wird ein pnpm-Feld in package.json ignoriert.

```
npm create sanity@latest -- --template clean --project-name "Simone Westphal Portfolio" --dataset production --typescript --output-path app/studio

pnpm add @sanity/icons
```

# datenbank importieren inside /apps/studio

sofern backup vorhanden

```
npx sanity@latest dataset import production.tar.gz --dataset production
```

# studio deployen

```

npm run deploy

```

# localization

# Field-Level Localization einrichten

Plugin installieren

```
pnpm add sanity-plugin-internationalized-array
```

# Konfigurieren

```
// sanity.config.ts (Auszug, zu plugins[] hinzufügen)
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

internationalizedArray({
  languages: (client) =>
    client.fetch(`*[_type == "locale"]|order(default desc){ "id": tag, "title": name }`),
  fieldTypes: ['string', 'text'],
}),
```

## locale-Type anlegen + drei Locale-Dokumente (de/en/es) erstellen.

# schema anlegen

```
# monorepo

```

# in the root /day-one directory

pnpm dlx create-next-app@latest apps/web --tailwind --ts --app --src-dir --eslint --import-alias "@/\*" --turbopack --use-pnpm
cd apps/web

```

# port freimachen

```

lsof -ti tcp:3333 | xargs -r kill -9 2>/dev/null; sleep 1; if lsof -ti tcp:3333 >/dev/null 2>&1; then echo "still in use"; else echo "port 3333 free";

kill -9 34542 34517 2>/dev/null; sleep 1; echo "=== remaining next procs ==="; ps aux | grep -iE "next dev|next-server|sanity dev" | grep -v grep | awk '{print $2, $11, $12}' || echo "none"; echo "=== ports free? ==="; for p in 3000 3001 3333; do lsof -ti tcp:$p >/dev/null 2>&1 && echo "$p BUSY" || echo "$p free"; done

```

```
