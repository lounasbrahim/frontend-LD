# Legal Doctrine front-end challenge

## Installation and usage

Clone the repo :

```
~ git clone https://github.com/lounasbrahim/frontend-LD.git
```

Install dependencies :

```
~ cd frontend-LD
~ npm/yarn/pnpm install
```

Runing the project :

```
~ npm/yarn/pnpm run dev
```

## Improvements

I refrained from utilizing a search library with fuzzy search capabilities (like Fusejs). This decision was influenced by uncertainties surrounding the permissibility of integrating a third-party searching library within the context of this coding challenge.

Using Fuse.js or a similar library can significantly optimize the performance of search functionality, especially when dealing with large datasets.

## Troubleshooting

If there is an error running the project with your version of nodejs, try to run the project with node version `v18.7.0`
by using nvm (nvm should be already installed) :

```
~ cd frontend-LD
~ nvm install
~ nvm use
```
